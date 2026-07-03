/**
 * Unit tests for src/text-format.mjs (case/punctuation/whitespace mirroring and
 * date-era detection). These run without the Figma runtime.
 */
import assert from "node:assert/strict";
import {
  applySourceFormatting,
  isDateEraLabel,
  DATE_ERA_RE,
  splitTrailingSentencePunct,
  mirrorLetterCase,
} from "../src/text-format.mjs";

/* --- splitTrailingSentencePunct --- */
assert.deepEqual(splitTrailingSentencePunct("Hello."), { core: "Hello", punct: ".", after: "" });
assert.deepEqual(splitTrailingSentencePunct("Hello"), { core: "Hello", punct: "", after: "" });
assert.deepEqual(splitTrailingSentencePunct("Hi!!!"), { core: "Hi", punct: "!!!", after: "" });
assert.deepEqual(splitTrailingSentencePunct("Hello. "), { core: "Hello", punct: ".", after: " " });
assert.deepEqual(splitTrailingSentencePunct(""), { core: "", punct: "", after: "" });

/* --- mirrorLetterCase --- */
assert.equal(mirrorLetterCase("Hello", "hola"), "Hola"); // source Title-case → cap first
assert.equal(mirrorLetterCase("VIP", "vip"), "VIP"); // source ALLCAPS → uppercase all
assert.equal(mirrorLetterCase("hello", "Hola"), "Hola"); // source lowercase first → leave as-is
assert.equal(mirrorLetterCase("123", "abc"), "abc"); // source has no letters → unchanged

/* --- applySourceFormatting --- */
assert.equal(applySourceFormatting("VIP", "vip"), "VIP"); // ALLCAPS preserved
assert.equal(applySourceFormatting("Balance.", "Saldo"), "Saldo."); // period from source restored
assert.equal(applySourceFormatting("Balance", "Saldo."), "Saldo"); // MT-added period dropped
assert.equal(applySourceFormatting("  Hello  ", "hola"), "  Hola  "); // leading/trailing ws kept, cap mirrored
assert.equal(applySourceFormatting("123", "123"), "123"); // no letters → untouched
assert.equal(applySourceFormatting("Foo", ""), "Foo"); // empty translation → original
assert.equal(applySourceFormatting("Foo", null), "Foo"); // null translation → original

/* --- isDateEraLabel / DATE_ERA_RE --- */
assert.equal(isDateEraLabel("1900s~2000"), true);
assert.equal(isDateEraLabel("2000s–2020s"), true); // en dash
assert.equal(isDateEraLabel("2020s~?"), true);
assert.equal(isDateEraLabel("2000-2020"), true);
assert.equal(isDateEraLabel("Hello"), false);
assert.equal(isDateEraLabel("2020"), false); // single year, not a range
assert.equal(DATE_ERA_RE instanceof RegExp, true);

console.log("text-format.test.mjs: ok");
