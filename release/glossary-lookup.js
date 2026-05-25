"use strict";
var FintechGlossary = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/glossary-lookup.mjs
  var glossary_lookup_exports = {};
  __export(glossary_lookup_exports, {
    glossaryResolve: () => glossaryResolve
  });
  function glossaryResolve(sourceText, glossaryMap, opts) {
    if (!sourceText || !glossaryMap)
      return null;
    const isLocked = opts && opts.isLocked;
    if (isLocked && isLocked(sourceText))
      return sourceText;
    const t = sourceText.trim();
    if (!t)
      return null;
    if (glossaryMap[t] !== void 0)
      return glossaryMap[t];
    const tl = t.toLowerCase();
    if (glossaryMap[tl] !== void 0)
      return glossaryMap[tl];
    for (const k of Object.keys(glossaryMap)) {
      if (k.toLowerCase() === tl)
        return glossaryMap[k];
    }
    const MIN_SUB = 3;
    const keys = Object.keys(glossaryMap).sort(function(a, b) {
      return b.length - a.length;
    });
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (k.length < MIN_SUB)
        continue;
      const kl = k.toLowerCase();
      const idx = tl.indexOf(kl);
      if (idx === -1)
        continue;
      const before = t.slice(0, idx);
      const after = t.slice(idx + k.length);
      const trans = glossaryMap[k];
      return before + trans + after;
    }
    return null;
  }
  return __toCommonJS(glossary_lookup_exports);
})();
