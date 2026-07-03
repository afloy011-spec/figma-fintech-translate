/**
 * Pure text-formatting helpers shared by the Free/Pro translation flow.
 * Inlined into dist/ui.html at build time (esbuild, globalName FintechText)
 * and imported directly by unit tests.
 */
export function stripTags(s) {
  return s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
}

export function looksTranslated(original, translated) {
  if (!translated || !translated.trim()) return false;
  const a = original.toLowerCase().trim();
  const b = translated.toLowerCase().trim();
  if (a === b) return false;
  if (b.includes("<g ") || b.includes("</g>")) return false;
  return true;
}

/**
 * Split trailing sentence punctuation from the last non-whitespace run (mirrors source vs API).
 * Preserves spaces after punctuation in `.after` (unusual in UI but keeps layout faithful).
 */
export function splitTrailingSentencePunct(s) {
  if (!s) return { core: "", punct: "", after: "" };
  let i = s.length - 1;
  while (i >= 0 && /\s/.test(s[i])) i--;
  const after = s.slice(i + 1);
  if (i < 0) return { core: "", punct: "", after: after };
  let j = i;
  while (j >= 0 && /[.!?…:;\u2026\u3002\uFF01\uFF1F\uFF1A\uFF1B\uFF0E\uFE52]/.test(s[j])) j--;
  const punct = s.slice(j + 1, i + 1);
  const core = s.slice(0, j + 1);
  return { core, punct, after };
}

/** If source has no lowercase letters, uppercase the whole translation (e.g. VIP, OK). */
export function mirrorLetterCase(origCore, transCore) {
  if (!transCore) return transCore;
  if (!/\p{L}/u.test(origCore)) return transCore;

  if (!/\p{Ll}/u.test(origCore)) {
    return transCore.toLocaleUpperCase("en-US");
  }

  const tm = transCore.match(/\p{L}/u);
  const om = origCore.match(/\p{L}/u);
  if (!tm || !om) return transCore;

  const tch = tm[0];
  const och = om[0];
  const ti = tm.index;
  const origFirstIsUpper = och !== och.toLowerCase();
  const transFirstIsLower = tch === tch.toLowerCase() && tch !== tch.toUpperCase();

  if (origFirstIsUpper && transFirstIsLower) {
    const up = tch.toLocaleUpperCase("en-US");
    return transCore.slice(0, ti) + up + transCore.slice(ti + tch.length);
  }
  return transCore;
}

/**
 * Restore leading/trailing whitespace from the source and mirror terminal punctuation + casing.
 * Free APIs often drop initial cap on short strings and add/remove final ".".
 */
export function applySourceFormatting(original, translated) {
  if (translated == null || translated === "") return original;

  const lead = (original.match(/^\s*/) || [""])[0];
  const trail = (original.match(/\s*$/) || [""])[0];
  const mid = original.slice(lead.length, original.length - trail.length);

  const t = translated.trim();
  const src = splitTrailingSentencePunct(mid);
  const got = splitTrailingSentencePunct(t);

  const outMirrored = mirrorLetterCase(src.core, got.core);
  /* Drop any terminal punctuation the MT added; keep only what the source had (src.punct + src.after). */
  const tail = splitTrailingSentencePunct(outMirrored);
  const outCore = tail.core + tail.after;

  return lead + outCore + src.punct + src.after + trail;
}

export const DATE_ERA_RE = /^\s*\d{4}s?\s*[~–—\-]\s*(\d{4}s?|\?)\s*$/;
export function isDateEraLabel(text) {
  return DATE_ERA_RE.test(text);
}
