import { mapStylesToNewLength } from "./style-map.mjs";

/** Inlined at build time from `dist/ui.html` (see `build.mjs` `define.__html__`). */
declare const __html__: string;

figma.showUI(__html__, { width: 560, height: 740 });

/* Required when manifest has "documentAccess": "dynamic-page" so that
   PageNode.findAll() and figma.getNodeByIdAsync() see all pages. */
void figma.loadAllPagesAsync();

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

/* ------------------------------------------------------------------ */
/*  Preserve per-character styling across text replacement              */
/* ------------------------------------------------------------------ */

interface CharStyle {
  fontName: FontName;
  fontSize: number;
  letterSpacing: LetterSpacing;
  lineHeight: LineHeight;
  textDecoration: TextDecoration;
  textCase: TextCase;
  fills: ReadonlyArray<Paint> | typeof figma.mixed;
}

function captureCharStyles(node: TextNode): CharStyle[] {
  const len = node.characters.length;
  const styles: CharStyle[] = [];
  for (let i = 0; i < len; i++) {
    styles.push({
      fontName:       node.getRangeFontName(i, i + 1) as FontName,
      fontSize:       node.getRangeFontSize(i, i + 1) as number,
      letterSpacing:  node.getRangeLetterSpacing(i, i + 1) as LetterSpacing,
      lineHeight:     node.getRangeLineHeight(i, i + 1) as LineHeight,
      textDecoration: node.getRangeTextDecoration(i, i + 1) as TextDecoration,
      textCase:       node.getRangeTextCase(i, i + 1) as TextCase,
      fills:          node.getRangeFills(i, i + 1),
    });
  }
  return styles;
}

async function applyCharStyles(node: TextNode, mapped: CharStyle[]): Promise<void> {
  const len = node.characters.length;
  if (!mapped.length || len === 0) return;

  let i = 0;
  while (i < len) {
    const s = mapped[i];
    let j = i + 1;
    while (j < len && j < mapped.length) {
      const n = mapped[j];
      if (n.fontName.family !== s.fontName.family || n.fontName.style !== s.fontName.style
          || n.fontSize !== s.fontSize) break;
      j++;
    }

    try {
      await figma.loadFontAsync(s.fontName);
      node.setRangeFontName(i, j, s.fontName);
      node.setRangeFontSize(i, j, s.fontSize);
      node.setRangeLetterSpacing(i, j, s.letterSpacing);
      node.setRangeLineHeight(i, j, s.lineHeight);
      node.setRangeTextDecoration(i, j, s.textDecoration);
      node.setRangeTextCase(i, j, s.textCase);
      if (s.fills !== figma.mixed) {
        node.setRangeFills(i, j, s.fills as Paint[]);
      }
    } catch (_e) { /* font unavailable — keep Figma default */ }
    i = j;
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
  /** Grow ancestor frames when translated text sticks out (fixed / glass cards). Default on. */
  expandFrames?: boolean;
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
  const canGrowFrame = opts.expandFrames !== false;

  /* ---- WIDTH_AND_HEIGHT: expanding labels / buttons / headings ---- */
  if (node.textAutoResize === "WIDTH_AND_HEIGHT") {
    if (inAutoLayout) {
      // Auto-layout manages the container. Shrink font to stay within
      // the original slot width rather than wrapping the label.
      if (autoScale) {
        await scaleFontToWidth(node, originalWidth, minFont);
      }
      // Without font-scale: leave it — auto-layout expands the button.
    } else if (canGrowFrame && !autoScale) {
      // Preferred path when "Grow frames" is on: keep the label on one line
      // and let relaxFramesForTranslatedText widen the parent. Forcing
      // HEIGHT (wrap) here causes long translations to break onto a second
      // line BEFORE the frame has a chance to grow.
      // No-op: text stays in WIDTH_AND_HEIGHT and grows naturally.
    } else {
      // Fixed frame / group with no growth allowed: lock to original width
      // and let text wrap to keep it inside the card.
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
/*  Expand frames so longer translations stay inside glass / fixed cards   */
/* ------------------------------------------------------------------ */

const EXPAND_FRAME_PAD = 8;
const EXPAND_RELAX_PASSES = 4;

function expandFrameForTextOverflow(textNode: TextNode, frame: FrameNode): boolean {
  const tb = textNode.absoluteBoundingBox;
  const fb = frame.absoluteBoundingBox;
  if (!tb || !fb) return false;
  const overflowW = tb.x + tb.width - (fb.x + fb.width);
  const overflowH = tb.y + tb.height - (fb.y + fb.height);
  if (overflowW <= 0 && overflowH <= 0) return false;
  const addW = overflowW > 0 ? overflowW + EXPAND_FRAME_PAD : 0;
  const addH = overflowH > 0 ? overflowH + EXPAND_FRAME_PAD : 0;
  const w0 = frame.width;
  const h0 = frame.height;
  try {
    frame.resize(w0 + addW, h0 + addH);
    return frame.width !== w0 || frame.height !== h0;
  } catch (_e) {
    return false;
  }
}

/**
 * Walk each text node’s ancestors up to `root` and widen/tall frames when
 * the text’s axis-aligned bounds stick out past the frame (common with
 * fixed-height cards after a longer locale).
 */
function relaxFramesForTranslatedText(textNodes: TextNode[], root: SceneNode): number {
  const resizedIds = new Set<string>();
  for (let pass = 0; pass < EXPAND_RELAX_PASSES; pass++) {
    for (const t of textNodes) {
      let p: BaseNode | null = t.parent;
      while (p) {
        if (p.type === "PAGE") break;
        if (p.type === "FRAME" || p.type === "COMPONENT" || p.type === "INSTANCE") {
          if (expandFrameForTextOverflow(t, p as FrameNode)) resizedIds.add(p.id);
        }
        if (p.id === root.id) break;
        p = p.parent;
      }
    }
  }
  return resizedIds.size;
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
): Promise<{ ok: number; fail: number; framesExpanded: number }> {
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
    expandFrames:  fo.expandFrames,
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
        const savedStyles = captureCharStyles(node);
        const originalText = node.characters;
        node.characters = t.text;
        const mapped = mapStylesToNewLength(savedStyles, originalText, t.text);
        await applyCharStyles(node, mapped);
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

  let framesExpanded = 0;
  const expandOn = fo.expandFrames !== false;
  if (expandOn && records.length) {
    framesExpanded = relaxFramesForTranslatedText(
      records.map((r) => r.node),
      root,
    );
  }

  return { ok, fail, framesExpanded };
}

function stripLangSuffix(name: string): string {
  // 2-letter codes plus regional variants like [PT-BR]
  return name.replace(/\s+\[[A-Za-z]{2}(?:-[A-Za-z]{2})?\]\s*$/, "").trim();
}

function localizedFrameName(base: string, lang: string): string {
  return base + " [" + lang.toUpperCase() + "]";
}

/**
 * Re-arrange every language clone tied to `sourceId` in a row (or column when
 * the user scanned multiple source frames) so that none of them overlap after
 * Grow frames has widened/heightened individual clones.
 *
 * Anchor (sourceX, sourceY) is the absolute position of the original source
 * frame; (sourceW, sourceH) is its size. `gap` is the spacing constant used
 * elsewhere in the file.
 */
function respaceLanguageClones(
  sourceId: string,
  sourceX: number,
  sourceY: number,
  sourceW: number,
  sourceH: number,
  gap: number,
  multiFrame: boolean,
): void {
  const all = figma.currentPage.findAll((n) =>
    n.type === "FRAME" || n.type === "COMPONENT" || n.type === "INSTANCE",
  );
  const siblings: FrameNode[] = [];
  for (const n of all) {
    const f = n as FrameNode;
    if (f.getPluginData("ft_source_id") === sourceId) siblings.push(f);
  }
  if (siblings.length === 0) return;

  /* Stable order by langIndex (stored as plugin data when the clone is
     created). Fallback to current x/y for legacy clones without an index. */
  siblings.sort((a, b) => {
    const ai = parseInt(a.getPluginData("ft_lang_index") || "", 10);
    const bi = parseInt(b.getPluginData("ft_lang_index") || "", 10);
    if (!isNaN(ai) && !isNaN(bi) && ai !== bi) return ai - bi;
    return multiFrame ? a.y - b.y : a.x - b.x;
  });

  if (multiFrame) {
    let nextY = sourceY + sourceH + gap;
    for (const sib of siblings) {
      sib.x = sourceX;
      sib.y = nextY;
      nextY = sib.y + sib.height + gap;
    }
  } else {
    let nextX = sourceX + sourceW + gap;
    for (const sib of siblings) {
      sib.x = nextX;
      sib.y = sourceY;
      nextX = sib.x + sib.width + gap;
    }
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

    const orig = (await figma.getNodeByIdAsync(frameId)) as SceneNode | null;
    if (!orig) {
      figma.ui.postMessage({ type: "frame-error", frameId, langCode, text: "Original frame not found" });
      return;
    }

    const wantName = `${stripLangSuffix(orig.name)} [${langCode.toUpperCase()}]`;

    /* Bind clones to their source frame by id, NOT by name.
       Without this, copy/rename of a source frame would re-target the old
       language clones because the base name still matches. */
    const taggedMatches: FrameNode[] = [];
    const legacyNameMatches: FrameNode[] = [];
    const candidates = figma.currentPage.findAll((n) =>
      n.type === "FRAME" || n.type === "COMPONENT" || n.type === "INSTANCE",
    );
    for (const n of candidates) {
      const f = n as FrameNode;
      const tagId = f.getPluginData("ft_source_id");
      const tagLang = f.getPluginData("ft_lang");
      if (tagId && tagId === frameId && tagLang === langCode) {
        taggedMatches.push(f);
      } else if (!tagId && f.name === wantName) {
        legacyNameMatches.push(f);
      }
    }

    /* Prefer tagged matches; otherwise adopt a legacy name-match only when
       it is unambiguous (exactly one). Several legacy matches → safer to
       create a fresh clone than overwrite the wrong frame. */
    let toReplace: FrameNode | null = null;
    if (taggedMatches.length > 0) {
      toReplace = taggedMatches[0];
    } else if (legacyNameMatches.length === 1) {
      toReplace = legacyNameMatches[0];
    }

    let replaceX: number | null = null;
    let replaceY: number | null = null;
    if (toReplace) {
      replaceX = toReplace.x;
      replaceY = toReplace.y;
      for (const f of taggedMatches) {
        try { f.remove(); } catch (_e) { /* already removed */ }
      }
      if (taggedMatches.length === 0) {
        try { toReplace.remove(); } catch (_e) { /* already removed */ }
      }
    }

    /* Capture position & size BEFORE clone() — cloning into an auto-layout
       shifts siblings, so reading coords after clone gives wrong values.   */
    const gap = 80;
    const origFrame = orig as FrameNode;
    const absX = origFrame.absoluteTransform[0][2];
    const absY = origFrame.absoluteTransform[1][2];
    const ow   = origFrame.width  || 400;
    const oh   = origFrame.height || 400;

    const clone = origFrame.clone();
    clone.name = wantName;
    clone.setPluginData("ft_source_id", frameId);
    clone.setPluginData("ft_lang", langCode);
    clone.setPluginData("ft_lang_index", String(langIndex));
    clone.setPluginData("ft_multi_frame", multiFrame === true ? "1" : "0");

    /* Always move to page root so auto-layouts don't trap the clone. */
    if (clone.parent !== figma.currentPage) {
      figma.currentPage.appendChild(clone);
    }

    if (replaceX !== null && replaceY !== null) {
      clone.x = replaceX;
      clone.y = replaceY;
    } else if (multiFrame === true) {
      clone.x = absX;
      clone.y = absY + (oh + gap) * (langIndex + 1);
    } else {
      clone.x = absX + (ow + gap) * (langIndex + 1);
      clone.y = absY;
    }

    try {
      const fo = fitOptions || {};
      const { ok, fail, framesExpanded } = await applyTranslationsToRoot(clone, translations, fo);

      /* After "Grow frames" may have widened this clone, re-space every
         sibling clone of the same source so they don't overlap. We use
         actual widths/heights, not the source's, because each language
         may have grown to a different size. */
      respaceLanguageClones(frameId, absX, absY, ow, oh, gap, multiFrame === true);

      figma.ui.postMessage({ type: "frame-done", frameId, langCode, ok, fail, framesExpanded });
      let toast = `✓ ${clone.name} — ${ok} translated`;
      if (fail) toast += `, ${fail} skipped`;
      if (framesExpanded) toast += ` · ${framesExpanded} frame(s) enlarged`;
      figma.notify(toast);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      figma.ui.postMessage({ type: "frame-error", frameId, langCode, text: message });
      figma.notify(`✗ ${langCode.toUpperCase()}: ${message}`, { error: true });
    }
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

    const root = (await figma.getNodeByIdAsync(targetFrameId)) as SceneNode | null;
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

    try {
      const fo = fitOptions || {};
      const { ok, fail, framesExpanded } = await applyTranslationsToRoot(root, translations, fo);
      figma.ui.postMessage({ type: "sync-reference-done", langCode, ok, fail, framesExpanded });
      let st = `↻ [${langCode.toUpperCase()}] — ${ok} text layer(s)`;
      if (framesExpanded) st += ` · ${framesExpanded} frame(s) enlarged`;
      figma.notify(st);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      figma.ui.postMessage({
        type: "sync-reference-done",
        langCode,
        ok: 0,
        fail: translations.length,
        err: message,
      });
      figma.notify(`✗ Sync ${langCode.toUpperCase()}: ${message}`, { error: true });
    }
  }

  /* ---------- Close ---------- */
  if (msg.type === "close") {
    figma.closePlugin();
  }
};
