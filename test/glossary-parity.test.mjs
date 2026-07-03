/**
 * Parity checks for src/glossary-data.mjs.
 * Goal: adding a new language (or editing an existing one) must not silently
 * drop glossary terms. `es` is the reference language. Known historical gaps are
 * whitelisted below; the test fails only on NEW missing keys.
 */
import assert from "node:assert/strict";
import { GLOSSARY, COURSE_GLOSSARY, LANG_NAMES } from "../src/glossary-data.mjs";

/* Languages intentionally shipped without a glossary (translated purely via API). */
const NO_GLOSSARY = new Set(["pl", "el", "tr"]);

/* Pre-existing, accepted gaps vs. `es`. Do not grow this list for new work —
   fill the missing terms instead. */
const ALLOWED_MISSING = {
  GLOSSARY: {
    it: ["private and secure"],
    fr: ["private and secure"],
    de: ["private and secure"],
    pt: ["private and secure"],
    ko: ["DApp", "private and secure"],
    zh: ["DApp", "private and secure"],
    ja: ["DApp", "private and secure"],
  },
  COURSE_GLOSSARY: {},
};

let checks = 0;

/* 1. Every language name maps to a glossary section, or is a documented no-glossary lang. */
for (const lang of Object.keys(LANG_NAMES)) {
  const hasGlossary = Object.prototype.hasOwnProperty.call(GLOSSARY, lang);
  assert.ok(
    hasGlossary || NO_GLOSSARY.has(lang),
    `LANG_NAMES has "${lang}" but no GLOSSARY section and it is not in NO_GLOSSARY`,
  );
  checks++;
}

/* 2. GLOSSARY and COURSE_GLOSSARY must cover the same set of languages. */
assert.deepEqual(
  Object.keys(GLOSSARY).sort(),
  Object.keys(COURSE_GLOSSARY).sort(),
  "GLOSSARY and COURSE_GLOSSARY language sets differ",
);
checks++;

/* 3. Key parity vs. `es` for both maps: no NEW missing keys beyond the whitelist. */
function checkParity(mapName, map) {
  const ref = Object.keys(map.es);
  assert.ok(ref.length > 0, `${mapName}.es must have keys`);
  for (const lang of Object.keys(map)) {
    if (lang === "es") continue;
    const have = new Set(Object.keys(map[lang]));
    const allowed = new Set((ALLOWED_MISSING[mapName] && ALLOWED_MISSING[mapName][lang]) || []);
    const missing = ref.filter((k) => !have.has(k));
    const unexpected = missing.filter((k) => !allowed.has(k));
    assert.deepEqual(
      unexpected,
      [],
      `${mapName}["${lang}"] is missing key(s) present in es: ${unexpected.join(" | ")}`,
    );
    /* Whitelist hygiene: don't keep stale allowances for keys that are now present. */
    const staleAllowances = [...allowed].filter((k) => have.has(k));
    assert.deepEqual(
      staleAllowances,
      [],
      `${mapName} ALLOWED_MISSING["${lang}"] lists key(s) that now exist — remove them: ${staleAllowances.join(" | ")}`,
    );
    checks++;
  }
}
checkParity("GLOSSARY", GLOSSARY);
checkParity("COURSE_GLOSSARY", COURSE_GLOSSARY);

console.log(`glossary-parity.test.mjs: ok (${checks} checks)`);
