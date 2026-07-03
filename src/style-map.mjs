/**
 * Per-character style remapping used when replacing a text node's characters
 * with a translation of a different length. Extracted from src/code.ts so it
 * can be unit-tested without the Figma runtime. Only fontName/fontSize are read
 * here; callers pass richer CharStyle objects (fills, lineHeight, …) which pass
 * through untouched.
 *
 * @typedef {{ fontName: { family: string, style: string }, fontSize: number }} CharStyleLike
 */

/**
 * @param {CharStyleLike[]} styles
 * @returns {boolean}
 */
export function isUniformStyle(styles) {
  if (styles.length <= 1) return true;
  const f = styles[0];
  for (let i = 1; i < styles.length; i++) {
    const s = styles[i];
    if (s.fontName.family !== f.fontName.family || s.fontName.style !== f.fontName.style
        || s.fontSize !== f.fontSize) return false;
  }
  return true;
}

/**
 * @param {CharStyleLike[]} segStyles
 * @param {string} oldSeg
 * @param {string} newSeg
 * @returns {CharStyleLike[]}
 */
export function mapSegmentStyles(segStyles, oldSeg, newSeg) {
  const newLen = newSeg.length;
  if (!segStyles.length || newLen === 0) return [];
  if (isUniformStyle(segStyles)) {
    const arr = [];
    for (let i = 0; i < newLen; i++) arr.push(segStyles[0]);
    return arr;
  }

  const oldTokens = oldSeg.split(/(\s+)/);
  const newTokens = newSeg.split(/(\s+)/);

  let pos = 0;
  const tokenStyle = [];
  for (const tok of oldTokens) {
    tokenStyle.push(segStyles[Math.min(pos, segStyles.length - 1)]);
    pos += tok.length;
  }

  const result = [];
  if (oldTokens.length === newTokens.length) {
    for (let ti = 0; ti < newTokens.length; ti++) {
      const st = tokenStyle[ti];
      for (let ci = 0; ci < newTokens[ti].length; ci++) result.push(st);
    }
  } else {
    for (let ti = 0; ti < newTokens.length; ti++) {
      const srcTi = Math.min(Math.floor((ti / newTokens.length) * oldTokens.length), oldTokens.length - 1);
      const st = tokenStyle[srcTi];
      for (let ci = 0; ci < newTokens[ti].length; ci++) result.push(st);
    }
  }
  return result;
}

/**
 * @param {CharStyleLike[]} styles
 * @param {string} oldText
 * @param {string} newText
 * @returns {CharStyleLike[]}
 */
export function mapStylesToNewLength(styles, oldText, newText) {
  const newLen = newText.length;
  if (!styles.length || newLen === 0) return [];

  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");

  if (oldLines.length === newLines.length) {
    const mapped = [];
    let oldPos = 0;
    for (let li = 0; li < oldLines.length; li++) {
      const lineStyles = styles.slice(oldPos, oldPos + oldLines[li].length);
      const effective = lineStyles.length ? lineStyles : [styles[Math.min(oldPos, styles.length - 1)]];
      mapped.push(...mapSegmentStyles(effective, oldLines[li], newLines[li]));
      oldPos += oldLines[li].length;

      if (li < oldLines.length - 1) {
        mapped.push(styles[Math.min(oldPos, styles.length - 1)]);
        oldPos += 1;
      }
    }
    while (mapped.length < newLen) mapped.push(styles[styles.length - 1]);
    return mapped.slice(0, newLen);
  }

  return mapSegmentStyles(styles, oldText, newText);
}
