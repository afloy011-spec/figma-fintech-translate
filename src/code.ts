figma.showUI(__html__, { width: 560, height: 740 });

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TextInfo {
  path: number[];
  characters: string;
}

interface FrameInfo {
  id: string;
  name: string;
  width: number;
  texts: TextInfo[];
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function collectTexts(node: SceneNode, path: number[] = []): TextInfo[] {
  const out: TextInfo[] = [];
  if (node.type === "TEXT" && node.characters.trim()) {
    out.push({ path: [...path], characters: node.characters });
  }
  if ("children" in node) {
    const kids = (node as FrameNode).children;
    for (let i = 0; i < kids.length; i++) {
      out.push(...collectTexts(kids[i], [...path, i]));
    }
  }
  return out;
}

function nodeAtPath(root: SceneNode, path: number[]): SceneNode | null {
  let cur: SceneNode = root;
  for (const i of path) {
    if (!("children" in cur)) return null;
    const ch = (cur as FrameNode).children;
    if (i >= ch.length) return null;
    cur = ch[i];
  }
  return cur;
}

async function loadFonts(t: TextNode): Promise<void> {
  if (t.fontName === figma.mixed) {
    const seen = new Set<string>();
    for (let i = 0; i < t.characters.length; i++) {
      const f = t.getRangeFontName(i, i + 1) as FontName;
      const k = `${f.family}|${f.style}`;
      if (!seen.has(k)) {
        seen.add(k);
        await figma.loadFontAsync(f);
      }
    }
  } else {
    await figma.loadFontAsync(t.fontName as FontName);
  }
}

interface FitOptions {
  smartWrap?: boolean;
  sidePadding?: number;
}

function applySmartFit(
  node: TextNode,
  opts: FitOptions,
  originalWidth: number,
): void {
  if (!opts || !opts.smartWrap) return;

  const sidePadding = Math.max(0, Number(
    opts.sidePadding === undefined || opts.sidePadding === null ? 0 : opts.sidePadding
  ));
  let targetWidth = Math.max(24, originalWidth);

  // If text is in a non-auto-layout frame, constrain by side paddings.
  const parent = node.parent;
  if (parent && parent.type === "FRAME" && parent.layoutMode === "NONE") {
    const maxInside = Math.max(24, parent.width - sidePadding * 2);
    targetWidth = Math.min(targetWidth, maxInside);
    if (node.x < sidePadding) node.x = sidePadding;
    if (node.x + targetWidth > parent.width - sidePadding) {
      node.x = Math.max(sidePadding, parent.width - sidePadding - targetWidth);
    }
  }

  // Convert expanding text to wrapped lines for predictable UI.
  if (node.textAutoResize === "WIDTH_AND_HEIGHT") {
    node.textAutoResize = "HEIGHT";
  }

  if (node.textAutoResize === "HEIGHT" || node.textAutoResize === "NONE") {
    node.resize(targetWidth, Math.max(1, node.height));
  }
}

/* ------------------------------------------------------------------ */
/*  Message handler                                                    */
/* ------------------------------------------------------------------ */

figma.ui.onmessage = async (msg: any) => {

  /* ---------- Init: load saved settings + key ---------- */
  if (msg.type === "init") {
    const settings = (await figma.clientStorage.getAsync("ft_settings")) || {};
    const key = (await figma.clientStorage.getAsync("openai_key")) || "";
    figma.ui.postMessage({ type: "init-data", settings, key });
  }

  /* ---------- Save settings ---------- */
  if (msg.type === "save-settings") {
    await figma.clientStorage.setAsync("ft_settings", msg.settings);
  }

  /* ---------- Save API key ---------- */
  if (msg.type === "save-key") {
    await figma.clientStorage.setAsync("openai_key", msg.key);
    figma.ui.postMessage({ type: "key-saved" });
  }

  /* ---------- Scan selection ---------- */
  if (msg.type === "scan") {
    const sel = figma.currentPage.selection;
    if (!sel.length) {
      figma.ui.postMessage({ type: "error", text: "Select at least one frame in Figma" });
      return;
    }

    const frames: FrameInfo[] = [];
    for (const node of sel) {
      const texts = collectTexts(node);
      if (texts.length) {
        frames.push({
          id: node.id,
          name: node.name,
          width: "width" in node ? (node as FrameNode).width : 400,
          texts,
        });
      }
    }

    if (!frames.length) {
      figma.ui.postMessage({ type: "error", text: "No text layers found in the selected frames" });
      return;
    }

    figma.ui.postMessage({ type: "scanned", frames });
  }

  /* ---------- Create translated frame ---------- */
  if (msg.type === "create-frame") {
    const { frameId, langCode, langIndex, translations, fitOptions } = msg as {
      frameId: string;
      langCode: string;
      langIndex: number;
      translations: Array<{ path: number[]; text: string }>;
      fitOptions?: FitOptions;
    };

    const orig = figma.getNodeById(frameId) as SceneNode;
    if (!orig) {
      figma.ui.postMessage({ type: "frame-error", frameId, langCode, text: "Original frame not found" });
      return;
    }

    const clone = (orig as FrameNode).clone();
    clone.name = `${orig.name} [${langCode.toUpperCase()}]`;

    const gap = 80;
    clone.x = orig.x + ((orig as FrameNode).width + gap) * (langIndex + 1);

    let ok = 0;
    let fail = 0;

    for (const t of translations) {
      const node = nodeAtPath(clone, t.path);
      if (node && node.type === "TEXT") {
        try {
          const originalWidth = node.width;
          await loadFonts(node);
          node.characters = t.text;
          applySmartFit(node, fitOptions || {}, originalWidth);
          ok++;
        } catch (_e) {
          fail++;
        }
      } else {
        fail++;
      }
    }

    figma.ui.postMessage({ type: "frame-done", frameId, langCode, ok, fail });
    figma.notify(`✓ ${clone.name}  —  ${ok} translated` + (fail ? `, ${fail} skipped` : ""));
  }

  /* ---------- Close ---------- */
  if (msg.type === "close") {
    figma.closePlugin();
  }
};
