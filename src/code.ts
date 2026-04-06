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

/**
 * Long translations often break awkwardly mid-word (e.g. Italian labels).
 * When the API exposes hyphenation control, turn it off for clearer word wraps.
 */
function tryDisableHyphenation(node: TextNode): void {
  try {
    const n = node as unknown as { hyphenationEnabled?: boolean };
    if (typeof n.hyphenationEnabled === "boolean") {
      n.hyphenationEnabled = false;
    }
  } catch (_e) {
    /* Older Figma builds or read-only nodes */
  }
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
function getMaxFontSize(node: TextNode): number {
  if (node.fontSize !== figma.mixed) return node.fontSize as number;
  let max = 0;
  for (let i = 0; i < node.characters.length; i++) {
    const s = node.getRangeFontSize(i, i + 1);
    if (typeof s === "number" && s > max) max = s;
  }
  return max;
}

async function scaleAllFontsBy(node: TextNode, ratio: number, minSize: number): Promise<void> {
  const len = node.characters.length;
  if (len === 0) return;
  await loadFonts(node);
  if (node.fontSize !== figma.mixed) {
    const cur = node.fontSize as number;
    const ns = Math.max(minSize, Math.round(cur * ratio * 2) / 2);
    node.setRangeFontSize(0, len, ns);
  } else {
    let i = 0;
    while (i < len) {
      const cur = node.getRangeFontSize(i, i + 1) as number;
      let j = i + 1;
      while (j < len) {
        const nxt = node.getRangeFontSize(j, j + 1) as number;
        if (nxt !== cur) break;
        j++;
      }
      const ns = Math.max(minSize, Math.round(cur * ratio * 2) / 2);
      if (ns !== cur) node.setRangeFontSize(i, j, ns);
      i = j;
    }
  }
}

async function scaleFontDown(
  node: TextNode,
  maxHeight: number,
  minSize: number,
): Promise<void> {
  let size = getMaxFontSize(node);
  if (size <= minSize) return;
  while (node.height > maxHeight && size > minSize) {
    const ratio = Math.max(minSize / size, (size - 0.5) / size);
    try {
      await scaleAllFontsBy(node, ratio, minSize);
      size = getMaxFontSize(node);
    } catch (_e) { break; }
  }
}

async function scaleFontToWidth(
  node: TextNode,
  maxWidth: number,
  minSize: number,
): Promise<void> {
  if (node.textAutoResize !== "WIDTH_AND_HEIGHT") return;
  let size = getMaxFontSize(node);
  if (size <= minSize) return;
  while (node.width > maxWidth && size > minSize) {
    const ratio = Math.max(minSize / size, (size - 0.5) / size);
    try {
      await scaleAllFontsBy(node, ratio, minSize);
      size = getMaxFontSize(node);
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
/*  Apply translated strings to an existing subtree (clone or localized frame) */
/* ------------------------------------------------------------------ */

interface NodeRecordFit {
  node: TextNode;
  originalWidth: number;
  originalFontSize: number;
  wasWAH: boolean;
  inAutoLayout: boolean;
}

async function applyTranslationsToRoot(
  root: SceneNode,
  translations: Array<{ path: number[]; text: string }>,
  fo: FitOptions,
): Promise<{ ok: number; fail: number }> {
  const doAutoScale = fo.autoFontScale === true;
  const minFont     = Math.max(6, Number(fo.minFontSize || 8));

  const records: NodeRecordFit[] = [];
  let ok = 0;
  let fail = 0;

  const foNoScale: FitOptions = {
    smartWrap:     fo.smartWrap,
    sidePadding:   fo.sidePadding,
    autoFontScale: false,
    minFontSize:   fo.minFontSize,
  };

  for (const t of translations) {
    const node = nodeAtPath(root, t.path);
    if (node && node.type === "TEXT") {
      try {
        const originalWidth    = node.width;
        const originalFontSize = getMaxFontSize(node);
        const wasWAH           = node.textAutoResize === "WIDTH_AND_HEIGHT";
        const inAL             = parentIsAutoLayout(node);

        await loadFonts(node);
        node.characters = t.text;
        tryDisableHyphenation(node);

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

  if (doAutoScale) {
    const scaleBySize: Record<string, number> = {};
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
    for (let ri = 0; ri < records.length; ri++) {
      const r     = records[ri];
      if (!r.wasWAH || !r.inAutoLayout || r.originalFontSize <= 0) continue;
      const key   = String(r.originalFontSize);
      const scale = scaleBySize[key] !== undefined ? scaleBySize[key] : 1;
      if (scale >= 1) continue;
      try {
        await scaleAllFontsBy(r.node, scale, minFont);
      } catch (_e2) { /* skip */ }
    }
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

  return { ok, fail };
}

function stripLangSuffix(name: string): string {
  return name.replace(/\s+\[[A-Za-z]{2}\]\s*$/, "").trim();
}

function localizedFrameName(base: string, lang: string): string {
  return base + " [" + lang.toUpperCase() + "]";
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

  /* ---------- Init: load saved settings + key + cache ---------- */
  if (msg.type === "init") {
    const settings = (await figma.clientStorage.getAsync("ft_settings")) || {};
    const key = (await figma.clientStorage.getAsync("openai_key")) || "";
    const cached = (await figma.clientStorage.getAsync("ft_cache")) || {};
    figma.ui.postMessage({ type: "init-data", settings, key, cache: cached });
  }

  /* ---------- Save settings ---------- */
  if (msg.type === "save-settings") {
    await figma.clientStorage.setAsync("ft_settings", msg.settings);
  }

  /* ---------- Save translation cache ---------- */
  if (msg.type === "save-cache") {
    await figma.clientStorage.setAsync("ft_cache", msg.data || {});
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

    const wantName = `${stripLangSuffix(orig.name)} [${langCode.toUpperCase()}]`;

    const existing = figma.currentPage.findAll(
      (n) => n.name === wantName &&
        (n.type === "FRAME" || n.type === "COMPONENT" || n.type === "INSTANCE"),
    );
    if (existing.length > 0) {
      const fo = fitOptions || {};
      const { ok, fail } = await applyTranslationsToRoot(existing[0] as SceneNode, translations, fo);
      figma.ui.postMessage({ type: "frame-done", frameId, langCode, ok, fail });
      figma.notify(`↻ ${wantName} updated — ${ok} translated` + (fail ? `, ${fail} skipped` : ""));
      return;
    }

    const clone = (orig as FrameNode).clone();
    clone.name = wantName;

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
    const { ok, fail } = await applyTranslationsToRoot(clone, translations, fo);

    figma.ui.postMessage({ type: "frame-done", frameId, langCode, ok, fail });
    figma.notify(`✓ ${clone.name}  —  ${ok} translated` + (fail ? `, ${fail} skipped` : ""));
  }

  /* ---------- Sync: EN master → existing «Name [ES]» frames on page ---------- */
  if (msg.type === "sync-reference-scan") {
    const langs = msg.langs as string[];
    if (!langs || langs.length === 0) {
      figma.ui.postMessage({ type: "error", text: "Pick target languages in the plugin first" });
      return;
    }

    const sel = figma.currentPage.selection;
    if (sel.length !== 1) {
      figma.ui.postMessage({
        type: "error",
        text: "Select exactly one source frame (edit EN here, then sync to language variants)",
      });
      return;
    }

    const source = sel[0];
    if (!("children" in source)) {
      figma.ui.postMessage({ type: "error", text: "Select a frame, component, or group that contains text" });
      return;
    }

    const texts = collectTexts(source as SceneNode);
    if (texts.length === 0) {
      figma.ui.postMessage({ type: "error", text: "No text layers in the selected frame" });
      return;
    }

    const baseName = stripLangSuffix(source.name);
    const targets: Record<string, string> = {};

    for (let li = 0; li < langs.length; li++) {
      const lang = langs[li];
      const want = localizedFrameName(baseName, lang);
      const found = figma.currentPage.findAll((n) =>
        n.name === want &&
        (n.type === "FRAME" || n.type === "COMPONENT" || n.type === "INSTANCE"),
      );
      if (found.length > 0) targets[lang] = found[0].id;
    }

    figma.ui.postMessage({
      type: "sync-reference-ready",
      baseName,
      sourceId: source.id,
      texts,
      targets,
    });
  }

  if (msg.type === "sync-reference-apply") {
    const {
      targetFrameId, langCode, translations, fitOptions,
    } = msg as {
      targetFrameId: string;
      langCode: string;
      translations: Array<{ path: number[]; text: string }>;
      fitOptions?: FitOptions;
    };

    const root = figma.getNodeById(targetFrameId) as SceneNode | null;
    if (!root || !("children" in root)) {
      figma.ui.postMessage({
        type: "sync-reference-done",
        langCode,
        ok: 0,
        fail: translations.length,
        err: "Target frame missing",
      });
      return;
    }

    const fo = fitOptions || {};
    const { ok, fail } = await applyTranslationsToRoot(root, translations, fo);
    figma.ui.postMessage({ type: "sync-reference-done", langCode, ok, fail });
    figma.notify(`↻ [${langCode.toUpperCase()}] updated — ${ok} text layer(s)`);
  }

  /* ---------- Close ---------- */
  if (msg.type === "close") {
    figma.closePlugin();
  }
};
