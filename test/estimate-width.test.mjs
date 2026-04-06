/**
 * Mirrors src/ui.html estimateWidth + calcDelta (Fit % heuristic).
 * If you change the UI algorithm, update this file.
 */
import assert from "node:assert/strict";

function estimateWidth(s) {
  if (!s) return 0;
  let w = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    const isCJK =
      (c >= 0x3000 && c <= 0x9fff) ||
      (c >= 0xac00 && c <= 0xd7af) ||
      (c >= 0xf900 && c <= 0xfaff) ||
      (c >= 0xff01 && c <= 0xff60);
    w += isCJK ? 1.8 : 1;
  }
  return w;
}

function calcDelta(original, translated) {
  if (!original || !translated) return 0;
  const ow = estimateWidth(original);
  const tw = estimateWidth(translated);
  if (ow === 0) return 0;
  return Math.round(((tw - ow) / ow) * 100);
}

assert.equal(calcDelta("Hi", "Hello"), 150);
assert.equal(calcDelta("test", "test"), 0);
assert.equal(calcDelta("", "x"), 0);
assert.equal(calcDelta("你好", "你好啊") > 0, true);

console.log("estimate-width.test.mjs: ok");
