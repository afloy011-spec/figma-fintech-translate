/**
 * Unit tests for src/style-map.mjs (per-character style remapping across a
 * length change). Uses a lightweight fake CharStyle (only fontName + fontSize
 * matter for the mapping logic).
 */
import assert from "node:assert/strict";
import { isUniformStyle, mapSegmentStyles, mapStylesToNewLength } from "../src/style-map.mjs";

const A = { fontName: { family: "Inter", style: "Bold" }, fontSize: 16 };
const B = { fontName: { family: "Inter", style: "Regular" }, fontSize: 16 };
const rep = (n, s) => Array.from({ length: n }, () => s);

/* --- isUniformStyle --- */
assert.equal(isUniformStyle([]), true);
assert.equal(isUniformStyle([A]), true);
assert.equal(isUniformStyle(rep(4, A)), true);
assert.equal(isUniformStyle([A, A, B]), false);

/* --- mapStylesToNewLength: uniform style stretches to new length --- */
const uni = mapStylesToNewLength(rep(2, A), "Hi", "Hello");
assert.equal(uni.length, 5);
assert.ok(uni.every((s) => s === A));

/* Shorter target keeps the single style. */
const shorter = mapStylesToNewLength(rep(5, A), "Hello", "Hi");
assert.equal(shorter.length, 2);
assert.ok(shorter.every((s) => s === A));

/* --- mixed style, equal token count preserves per-token styling --- */
// "aa bb" → chars: a a (space) b b, with "aa" bold(A), "bb" regular(B)
const mixedStyles = [A, A, A, B, B];
const mixed = mapSegmentStyles(mixedStyles, "aa bb", "xxx yyy");
assert.equal(mixed.length, "xxx yyy".length); // 7
assert.equal(mixed[0], A); // first token → bold
assert.equal(mixed[6], B); // last token → regular

/* --- multiline: newline style is carried, length matches new text --- */
const ml = mapStylesToNewLength(rep(5, A), "ab\ncd", "xy\nzw");
assert.equal(ml.length, 5);
assert.ok(ml.every((s) => s === A));

/* --- boundaries --- */
assert.deepEqual(mapStylesToNewLength([], "x", "y"), []); // no styles
assert.deepEqual(mapStylesToNewLength(rep(3, A), "abc", ""), []); // empty target

console.log("style-map.test.mjs: ok");
