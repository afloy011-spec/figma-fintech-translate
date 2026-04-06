/**
 * Glossary resolution for Free mode (exact + case-insensitive + longest substring).
 * Built to dist/glossary-lookup.js (IIFE); keep in sync with tests.
 *
 * @param {string} sourceText
 * @param {Record<string, string>} glossaryMap merged glossary for target lang
 * @param {{ isLocked?: (s: string) => boolean }} [opts]
 * @returns {string | null} replacement string, or null to fall through to API
 */
export function glossaryResolve(sourceText, glossaryMap, opts) {
  if (!sourceText || !glossaryMap) return null;
  const isLocked = opts && opts.isLocked;
  if (isLocked && isLocked(sourceText)) return sourceText;

  const t = sourceText.trim();
  if (!t) return null;

  if (glossaryMap[t] !== undefined) return glossaryMap[t];

  const tl = t.toLowerCase();
  if (glossaryMap[tl] !== undefined) return glossaryMap[tl];

  for (const k of Object.keys(glossaryMap)) {
    if (k.toLowerCase() === tl) return glossaryMap[k];
  }

  const MIN_SUB = 3;
  const keys = Object.keys(glossaryMap).sort(function(a, b) {
    return b.length - a.length;
  });
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (k.length < MIN_SUB) continue;
    const kl = k.toLowerCase();
    const idx = tl.indexOf(kl);
    if (idx === -1) continue;
    const before = t.slice(0, idx);
    const after = t.slice(idx + k.length);
    const trans = glossaryMap[k];
    return before + trans + after;
  }

  return null;
}
