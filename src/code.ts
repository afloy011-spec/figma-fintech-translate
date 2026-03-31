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
  autoFontScale?: boolean;
  minFontSize?: number;
}

/* ------------------------------------------------------------------ */
/*  Parent context helpers                                             */
/* ------------------------------------------------------------------ */

// Returns true only for Frame/Component/Instance with actual auto-layout.
// GroupNode does NOT have layoutMode – avoid casting it as FrameNode.
function parentIsAutoLayout(node: TextNode): boolean {
  const p = node.parent;
  if (!p) return false;
  if (p.type !== "FRAME" && p.type !== "COMPONENT" && p.type !== "INSTANCE") return false;
  return (p as FrameNode).layoutMode !== "NONE";
}

function availableWidth(node: TextNode, sidePadding: number): number {
  const p = node.parent;
  if (!p || !("width" in p)) return node.width;

  const pNode = p as FrameNode;
  // Only Frame/Component/Instance have reliable padding props.
  const hasFrame = p.type === "FRAME" || p.type === "COMPONENT" || p.type === "INSTANCE";
  const padL = hasFrame ? ((pNode.paddingLeft  || 0) + sidePadding) : sidePadding;
  const padR = hasFrame ? ((pNode.paddingRight || 0) + sidePadding) : sidePadding;

  return Math.max(24, pNode.width - padL - padR);
}

function availableHeight(node: TextNode, sidePadding: number): number {
  const p = node.parent;
  if (!p || !("height" in p)) return Infinity;
  // Auto-layout containers grow freely in the primary axis.
  if (parentIsAutoLayout(node)) return Infinity;

  const pNode = p as FrameNode;
  const hasFrame = p.type === "FRAME" || p.type === "COMPONENT" || p.type === "INSTANCE";
  const padB = hasFrame ? (pNode.paddingBottom || 0) : 0;

  return Math.max(16, pNode.height - padB - node.y - sidePadding);
}

/* ------------------------------------------------------------------ */
/*  Font-scaling helpers                                               */
/* ------------------------------------------------------------------ */

// Reduce font size until the wrapping text fits within maxHeight.
async function scaleFontDown(
  node: TextNode,
  maxHeight: number,
  minSize: number,
): Promise<void> {
  if (node.fontSize === figma.mixed) return;
  let size = node.fontSize as number;
  if (size <= minSize) return;
  while (node.height > maxHeight && size > minSize) {
    size = Math.max(minSize, size - 0.5);
    try {
      await figma.loadFontAsync(node.fontName as FontName);
      node.setRangeFontSize(0, node.characters.length, size);
    } catch (_e) { break; }
  }
}

// Reduce font size until a WIDTH_AND_HEIGHT node fits within maxWidth.
async function scaleFontToWidth(
  node: TextNode,
  maxWidth: number,
  minSize: number,
): Promise<void> {
  if (node.fontSize === figma.mixed) return;
  if (node.textAutoResize !== "WIDTH_AND_HEIGHT") return;
  let size = node.fontSize as number;
  if (size <= minSize) return;
  while (node.width > maxWidth && size > minSize) {
    size = Math.max(minSize, size - 0.5);
    try {
      await figma.loadFontAsync(node.fontName as FontName);
      node.setRangeFontSize(0, node.characters.length, size);
    } catch (_e) { break; }
  }
}

/* ------------------------------------------------------------------ */
/*  Main smart-fit entry point                                         */
/* ------------------------------------------------------------------ */

async function applySmartFit(
  node: TextNode,
  opts: FitOptions,
  originalWidth: number,
): Promise<void> {
  if (!opts || !opts.smartWrap) return;

  const sp           = Math.max(0, Number(opts.sidePadding == null ? 0 : opts.sidePadding));
  const autoScale    = opts.autoFontScale === true;
  const minFont      = Math.max(6, Number(opts.minFontSize || 8));
  const inAutoLayout = parentIsAutoLayout(node);

  /* ---- WIDTH_AND_HEIGHT: expanding labels / buttons / headings ---- */
  if (node.textAutoResize === "WIDTH_AND_HEIGHT") {
    if (inAutoLayout) {
      // Auto-layout manages the container. Shrink font to stay within
      // the original slot width rather than wrapping the label.
      if (autoScale) {
        await scaleFontToWidth(node, originalWidth, minFont);
      }
      // Without font-scale: leave it — auto-layout expands the button.
    } else {
      // Fixed frame / group: lock to original width and let text wrap.
      node.textAutoResize = "HEIGHT";
      node.resize(Math.max(24, originalWidth), node.height);
      if (autoScale) {
        const ah = availableHeight(node, sp);
        if (node.height > ah) await scaleFontDown(node, ah, minFont);
      }
    }
    return;
  }

  /* ---- HEIGHT: already wrapping ---- */
  if (node.textAutoResize === "HEIGHT") {
    if (!inAutoLayout) {
      const aw = availableWidth(node, sp);
      if (node.width > aw) node.resize(Math.max(24, aw), node.height);
      if (autoScale) {
        const ah = availableHeight(node, sp);
        if (node.height > ah) await scaleFontDown(node, ah, minFont);
      }
    }
    return;
  }

  /* ---- NONE / TRUNCATE: fixed box ---- */
  if (autoScale) {
    const ah = availableHeight(node, sp);
    if (node.height > ah) await scaleFontDown(node, ah, minFont);
  }
}

/* ------------------------------------------------------------------ */
/*  Message handler                                                    */
/* ------------------------------------------------------------------ */

// Notify UI whenever the Figma canvas selection changes so it can warn the user.
figma.on("selectionchange", () => {
  const ids = figma.currentPage.selection.map(n => n.id);
  figma.ui.postMessage({ type: "selection-changed", ids });
});

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
    const {
      frameId, langCode, langIndex, translations, fitOptions, multiFrame,
    } = msg as {
      frameId: string;
      langCode: string;
      langIndex: number;
      translations: Array<{ path: number[]; text: string }>;
      fitOptions?: FitOptions;
      multiFrame?: boolean;
    };

    const orig = figma.getNodeById(frameId) as SceneNode;
    if (!orig) {
      figma.ui.postMessage({ type: "frame-error", frameId, langCode, text: "Original frame not found" });
      return;
    }

    const clone = (orig as FrameNode).clone();
    clone.name = `${orig.name} [${langCode.toUpperCase()}]`;

    const gap = 80;
    const ow = "width" in orig ? (orig as FrameNode).width : 400;
    const oh = "height" in orig ? (orig as FrameNode).height : 400;
    // Single selection: clones to the right (classic deck). Multiple frames in one scan:
    // horizontal offset would collide with neighbours — stack clones below each source.
    if (multiFrame === true) {
      clone.x = orig.x;
      clone.y = orig.y + (oh + gap) * (langIndex + 1);
    } else {
      clone.x = orig.x + (ow + gap) * (langIndex + 1);
      clone.y = orig.y;
    }

    const fo = fitOptions || {};
    const doAutoScale = fo.autoFontScale === true;
    const minFont     = Math.max(6, Number(fo.minFontSize || 8));

    interface NodeRecord {
      node: TextNode;
      originalWidth: number;
      originalFontSize: number; // 0 if mixed
      wasWAH: boolean;          // was WIDTH_AND_HEIGHT before translation
      inAutoLayout: boolean;
    }
    const records: NodeRecord[] = [];
    let ok = 0;
    let fail = 0;

    /* ---- Phase 1: set translated text + apply wrap (font scale disabled) ---- */
    // Build a fitOptions-without-scale manually to avoid spread operator (not supported in Figma WebView).
    const foNoScale: FitOptions = {
      smartWrap:     fo.smartWrap,
      sidePadding:   fo.sidePadding,
      autoFontScale: false,
      minFontSize:   fo.minFontSize,
    };

    for (const t of translations) {
      const node = nodeAtPath(clone, t.path);
      if (node && node.type === "TEXT") {
        try {
          const originalWidth    = node.width;
          const originalFontSize = node.fontSize === figma.mixed ? 0 : node.fontSize as number;
          const wasWAH           = node.textAutoResize === "WIDTH_AND_HEIGHT";
          const inAL             = parentIsAutoLayout(node);

          await loadFonts(node);
          node.characters = t.text;

          // Apply wrap logic; font-scale pass is done collectively in phase 2.
          await applySmartFit(node, foNoScale, originalWidth);

          records.push({ node, originalWidth, originalFontSize, wasWAH, inAutoLayout: inAL });
          ok++;
        } catch (_e) {
          fail++;
        }
      } else {
        fail++;
      }
    }

    /* ---- Phase 2: uniform font scaling per original-font-size group ---- */
    if (doAutoScale) {
      // Use a plain object as a map (avoids Map API compatibility concerns).
      // Keys are original font sizes (as strings), values are the minimum scale ratio.
      const scaleBySize: Record<string, number> = {};

      // 2a: compute tightest scale ratio per font-size for auto-layout nodes.
      for (let ri = 0; ri < records.length; ri++) {
        const r = records[ri];
        if (!r.wasWAH || !r.inAutoLayout || r.originalFontSize <= 0) continue;
        if (r.node.width > r.originalWidth && r.originalWidth > 0) {
          const ratio = r.originalWidth / r.node.width;
          const key   = String(r.originalFontSize);
          const prev  = scaleBySize[key] !== undefined ? scaleBySize[key] : 1;
          scaleBySize[key] = prev < ratio ? prev : ratio;
        }
      }

      // 2b: apply that uniform scale to every node in each group.
      for (let ri = 0; ri < records.length; ri++) {
        const r     = records[ri];
        if (!r.wasWAH || !r.inAutoLayout || r.originalFontSize <= 0) continue;
        const key   = String(r.originalFontSize);
        const scale = scaleBySize[key] !== undefined ? scaleBySize[key] : 1;
        if (scale >= 1) continue;
        const newSize = Math.max(minFont, Math.round(r.originalFontSize * scale * 2) / 2);
        try {
          await figma.loadFontAsync(r.node.fontName as FontName);
          r.node.setRangeFontSize(0, r.node.characters.length, newSize);
        } catch (_e2) { /* skip if font unavailable */ }
      }

      // 2c: height-overflow scale for non-auto-layout nodes (each independent).
      const spNum = Math.max(0, Number(fo.sidePadding === undefined || fo.sidePadding === null ? 0 : fo.sidePadding));
      for (let ri = 0; ri < records.length; ri++) {
        const r = records[ri];
        if (r.inAutoLayout) continue;
        const ah = availableHeight(r.node, spNum);
        if (r.node.height > ah) {
          try {
            await scaleFontDown(r.node, ah, minFont);
          } catch (_e2) { /* skip */ }
        }
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
