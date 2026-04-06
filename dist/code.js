"use strict";
(() => {
  // src/code.ts
  figma.showUI(__html__, { width: 560, height: 740 });
  function collectTexts(node, path = []) {
    const out = [];
    if (node.type === "TEXT" && node.characters.trim()) {
      out.push({ path: [...path], characters: node.characters });
    }
    if ("children" in node) {
      const kids = node.children;
      for (let i = 0; i < kids.length; i++) {
        out.push(...collectTexts(kids[i], [...path, i]));
      }
    }
    return out;
  }
  function nodeAtPath(root, path) {
    let cur = root;
    for (const i of path) {
      if (!("children" in cur))
        return null;
      const ch = cur.children;
      if (i >= ch.length)
        return null;
      cur = ch[i];
    }
    return cur;
  }
  function tryDisableHyphenation(node) {
    try {
      const n = node;
      if (typeof n.hyphenationEnabled === "boolean") {
        n.hyphenationEnabled = false;
      }
    } catch (_e) {
    }
  }
  async function loadFonts(t) {
    if (t.fontName === figma.mixed) {
      const seen = /* @__PURE__ */ new Set();
      for (let i = 0; i < t.characters.length; i++) {
        const f = t.getRangeFontName(i, i + 1);
        const k = `${f.family}|${f.style}`;
        if (!seen.has(k)) {
          seen.add(k);
          await figma.loadFontAsync(f);
        }
      }
    } else {
      await figma.loadFontAsync(t.fontName);
    }
  }
  function parentIsAutoLayout(node) {
    const p = node.parent;
    if (!p)
      return false;
    if (p.type !== "FRAME" && p.type !== "COMPONENT" && p.type !== "INSTANCE")
      return false;
    return p.layoutMode !== "NONE";
  }
  function availableWidth(node, sidePadding) {
    const p = node.parent;
    if (!p || !("width" in p))
      return node.width;
    const pNode = p;
    const hasFrame = p.type === "FRAME" || p.type === "COMPONENT" || p.type === "INSTANCE";
    const padL = hasFrame ? (pNode.paddingLeft || 0) + sidePadding : sidePadding;
    const padR = hasFrame ? (pNode.paddingRight || 0) + sidePadding : sidePadding;
    return Math.max(24, pNode.width - padL - padR);
  }
  function availableHeight(node, sidePadding) {
    const p = node.parent;
    if (!p || !("height" in p))
      return Infinity;
    if (parentIsAutoLayout(node))
      return Infinity;
    const pNode = p;
    const hasFrame = p.type === "FRAME" || p.type === "COMPONENT" || p.type === "INSTANCE";
    const padB = hasFrame ? pNode.paddingBottom || 0 : 0;
    return Math.max(16, pNode.height - padB - node.y - sidePadding);
  }
  function getMaxFontSize(node) {
    if (node.fontSize !== figma.mixed)
      return node.fontSize;
    let max = 0;
    for (let i = 0; i < node.characters.length; i++) {
      const s = node.getRangeFontSize(i, i + 1);
      if (typeof s === "number" && s > max)
        max = s;
    }
    return max;
  }
  async function scaleAllFontsBy(node, ratio, minSize) {
    const len = node.characters.length;
    if (len === 0)
      return;
    await loadFonts(node);
    if (node.fontSize !== figma.mixed) {
      const cur = node.fontSize;
      const ns = Math.max(minSize, Math.round(cur * ratio * 2) / 2);
      node.setRangeFontSize(0, len, ns);
    } else {
      let i = 0;
      while (i < len) {
        const cur = node.getRangeFontSize(i, i + 1);
        let j = i + 1;
        while (j < len) {
          const nxt = node.getRangeFontSize(j, j + 1);
          if (nxt !== cur)
            break;
          j++;
        }
        const ns = Math.max(minSize, Math.round(cur * ratio * 2) / 2);
        if (ns !== cur)
          node.setRangeFontSize(i, j, ns);
        i = j;
      }
    }
  }
  async function scaleFontDown(node, maxHeight, minSize) {
    let size = getMaxFontSize(node);
    if (size <= minSize)
      return;
    while (node.height > maxHeight && size > minSize) {
      const ratio = Math.max(minSize / size, (size - 0.5) / size);
      try {
        await scaleAllFontsBy(node, ratio, minSize);
        size = getMaxFontSize(node);
      } catch (_e) {
        break;
      }
    }
  }
  async function scaleFontToWidth(node, maxWidth, minSize) {
    if (node.textAutoResize !== "WIDTH_AND_HEIGHT")
      return;
    let size = getMaxFontSize(node);
    if (size <= minSize)
      return;
    while (node.width > maxWidth && size > minSize) {
      const ratio = Math.max(minSize / size, (size - 0.5) / size);
      try {
        await scaleAllFontsBy(node, ratio, minSize);
        size = getMaxFontSize(node);
      } catch (_e) {
        break;
      }
    }
  }
  async function applySmartFit(node, opts, originalWidth) {
    if (!opts || !opts.smartWrap)
      return;
    const sp = Math.max(0, Number(opts.sidePadding == null ? 0 : opts.sidePadding));
    const autoScale = opts.autoFontScale === true;
    const minFont = Math.max(6, Number(opts.minFontSize || 8));
    const inAutoLayout = parentIsAutoLayout(node);
    if (node.textAutoResize === "WIDTH_AND_HEIGHT") {
      if (inAutoLayout) {
        if (autoScale) {
          await scaleFontToWidth(node, originalWidth, minFont);
        }
      } else {
        node.textAutoResize = "HEIGHT";
        node.resize(Math.max(24, originalWidth), node.height);
        if (autoScale) {
          const ah = availableHeight(node, sp);
          if (node.height > ah)
            await scaleFontDown(node, ah, minFont);
        }
      }
      return;
    }
    if (node.textAutoResize === "HEIGHT") {
      if (!inAutoLayout) {
        const aw = availableWidth(node, sp);
        if (node.width > aw)
          node.resize(Math.max(24, aw), node.height);
        if (autoScale) {
          const ah = availableHeight(node, sp);
          if (node.height > ah)
            await scaleFontDown(node, ah, minFont);
        }
      }
      return;
    }
    if (autoScale) {
      const ah = availableHeight(node, sp);
      if (node.height > ah)
        await scaleFontDown(node, ah, minFont);
    }
  }
  async function applyTranslationsToRoot(root, translations, fo) {
    const doAutoScale = fo.autoFontScale === true;
    const minFont = Math.max(6, Number(fo.minFontSize || 8));
    const records = [];
    let ok = 0;
    let fail = 0;
    const foNoScale = {
      smartWrap: fo.smartWrap,
      sidePadding: fo.sidePadding,
      autoFontScale: false,
      minFontSize: fo.minFontSize
    };
    for (const t of translations) {
      const node = nodeAtPath(root, t.path);
      if (node && node.type === "TEXT") {
        try {
          const originalWidth = node.width;
          const originalFontSize = getMaxFontSize(node);
          const wasWAH = node.textAutoResize === "WIDTH_AND_HEIGHT";
          const inAL = parentIsAutoLayout(node);
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
      const scaleBySize = {};
      for (let ri = 0; ri < records.length; ri++) {
        const r = records[ri];
        if (!r.wasWAH || !r.inAutoLayout || r.originalFontSize <= 0)
          continue;
        if (r.node.width > r.originalWidth && r.originalWidth > 0) {
          const ratio = r.originalWidth / r.node.width;
          const key = String(r.originalFontSize);
          const prev = scaleBySize[key] !== void 0 ? scaleBySize[key] : 1;
          scaleBySize[key] = prev < ratio ? prev : ratio;
        }
      }
      for (let ri = 0; ri < records.length; ri++) {
        const r = records[ri];
        if (!r.wasWAH || !r.inAutoLayout || r.originalFontSize <= 0)
          continue;
        const key = String(r.originalFontSize);
        const scale = scaleBySize[key] !== void 0 ? scaleBySize[key] : 1;
        if (scale >= 1)
          continue;
        try {
          await scaleAllFontsBy(r.node, scale, minFont);
        } catch (_e2) {
        }
      }
      const spNum = Math.max(0, Number(fo.sidePadding === void 0 || fo.sidePadding === null ? 0 : fo.sidePadding));
      for (let ri = 0; ri < records.length; ri++) {
        const r = records[ri];
        if (r.inAutoLayout)
          continue;
        const ah = availableHeight(r.node, spNum);
        if (r.node.height > ah) {
          try {
            await scaleFontDown(r.node, ah, minFont);
          } catch (_e2) {
          }
        }
      }
    }
    return { ok, fail };
  }
  function stripLangSuffix(name) {
    return name.replace(/\s+\[[A-Za-z]{2}\]\s*$/, "").trim();
  }
  function localizedFrameName(base, lang) {
    return base + " [" + lang.toUpperCase() + "]";
  }
  figma.on("selectionchange", () => {
    const ids = figma.currentPage.selection.map((n) => n.id);
    figma.ui.postMessage({ type: "selection-changed", ids });
  });
  figma.ui.onmessage = async (msg) => {
    if (msg.type === "init") {
      const settings = await figma.clientStorage.getAsync("ft_settings") || {};
      const key = await figma.clientStorage.getAsync("openai_key") || "";
      const cached = await figma.clientStorage.getAsync("ft_cache") || {};
      figma.ui.postMessage({ type: "init-data", settings, key, cache: cached });
    }
    if (msg.type === "save-settings") {
      await figma.clientStorage.setAsync("ft_settings", msg.settings);
    }
    if (msg.type === "save-cache") {
      await figma.clientStorage.setAsync("ft_cache", msg.data || {});
    }
    if (msg.type === "save-key") {
      await figma.clientStorage.setAsync("openai_key", msg.key);
      figma.ui.postMessage({ type: "key-saved" });
    }
    if (msg.type === "scan") {
      const sel = figma.currentPage.selection;
      if (!sel.length) {
        figma.ui.postMessage({ type: "error", text: "Select at least one frame in Figma" });
        return;
      }
      const frames = [];
      for (const node of sel) {
        const texts = collectTexts(node);
        if (texts.length) {
          frames.push({
            id: node.id,
            name: node.name,
            width: "width" in node ? node.width : 400,
            texts
          });
        }
      }
      if (!frames.length) {
        figma.ui.postMessage({ type: "error", text: "No text layers found in the selected frames" });
        return;
      }
      figma.ui.postMessage({ type: "scanned", frames });
    }
    if (msg.type === "create-frame") {
      const {
        frameId,
        langCode,
        langIndex,
        translations,
        fitOptions,
        multiFrame
      } = msg;
      const orig = figma.getNodeById(frameId);
      if (!orig) {
        figma.ui.postMessage({ type: "frame-error", frameId, langCode, text: "Original frame not found" });
        return;
      }
      const wantName = `${stripLangSuffix(orig.name)} [${langCode.toUpperCase()}]`;
      const existing = figma.currentPage.findAll(
        (n) => n.name === wantName && (n.type === "FRAME" || n.type === "COMPONENT" || n.type === "INSTANCE")
      );
      let replaceX = null;
      let replaceY = null;
      if (existing.length > 0) {
        replaceX = existing[0].x;
        replaceY = existing[0].y;
        existing[0].remove();
      }
      const clone = orig.clone();
      clone.name = wantName;
      const gap = 80;
      const ow = "width" in orig ? orig.width : 400;
      const oh = "height" in orig ? orig.height : 400;
      if (replaceX !== null && replaceY !== null) {
        clone.x = replaceX;
        clone.y = replaceY;
      } else if (multiFrame === true) {
        clone.x = orig.x;
        clone.y = orig.y + (oh + gap) * (langIndex + 1);
      } else {
        clone.x = orig.x + (ow + gap) * (langIndex + 1);
        clone.y = orig.y;
      }
      const fo = fitOptions || {};
      const { ok, fail } = await applyTranslationsToRoot(clone, translations, fo);
      figma.ui.postMessage({ type: "frame-done", frameId, langCode, ok, fail });
      figma.notify(`\u2713 ${clone.name}  \u2014  ${ok} translated` + (fail ? `, ${fail} skipped` : ""));
    }
    if (msg.type === "sync-reference-scan") {
      const langs = msg.langs;
      if (!langs || langs.length === 0) {
        figma.ui.postMessage({ type: "error", text: "Pick target languages in the plugin first" });
        return;
      }
      const sel = figma.currentPage.selection;
      if (sel.length !== 1) {
        figma.ui.postMessage({
          type: "error",
          text: "Select exactly one source frame (edit EN here, then sync to language variants)"
        });
        return;
      }
      const source = sel[0];
      if (!("children" in source)) {
        figma.ui.postMessage({ type: "error", text: "Select a frame, component, or group that contains text" });
        return;
      }
      const texts = collectTexts(source);
      if (texts.length === 0) {
        figma.ui.postMessage({ type: "error", text: "No text layers in the selected frame" });
        return;
      }
      const baseName = stripLangSuffix(source.name);
      const targets = {};
      for (let li = 0; li < langs.length; li++) {
        const lang = langs[li];
        const want = localizedFrameName(baseName, lang);
        const found = figma.currentPage.findAll(
          (n) => n.name === want && (n.type === "FRAME" || n.type === "COMPONENT" || n.type === "INSTANCE")
        );
        if (found.length > 0)
          targets[lang] = found[0].id;
      }
      figma.ui.postMessage({
        type: "sync-reference-ready",
        baseName,
        sourceId: source.id,
        texts,
        targets
      });
    }
    if (msg.type === "sync-reference-apply") {
      const {
        targetFrameId,
        langCode,
        translations,
        fitOptions
      } = msg;
      const root = figma.getNodeById(targetFrameId);
      if (!root || !("children" in root)) {
        figma.ui.postMessage({
          type: "sync-reference-done",
          langCode,
          ok: 0,
          fail: translations.length,
          err: "Target frame missing"
        });
        return;
      }
      const fo = fitOptions || {};
      const { ok, fail } = await applyTranslationsToRoot(root, translations, fo);
      figma.ui.postMessage({ type: "sync-reference-done", langCode, ok, fail });
      figma.notify(`\u21BB [${langCode.toUpperCase()}] updated \u2014 ${ok} text layer(s)`);
    }
    if (msg.type === "close") {
      figma.closePlugin();
    }
  };
})();
