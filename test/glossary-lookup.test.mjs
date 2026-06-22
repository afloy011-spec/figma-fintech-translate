import assert from "node:assert/strict";
import { glossaryResolve } from "../src/glossary-lookup.mjs";

const es = {
  "P2P lending": "préstamos P2P",
  APR: "TAE",
  interest: "interés",
};

assert.equal(glossaryResolve("APR", es, {}), "TAE");
assert.equal(glossaryResolve("apr", es, {}), "TAE");
assert.equal(
  glossaryResolve("P2P lending platform", es, {}),
  "préstamos P2P platform",
);
assert.equal(glossaryResolve("no match here", es, {}), null);

/* Whole-word guard: short keys must not match inside larger words. */
const feeMap = { fee: "comisión", Apr: "TAE" };
assert.equal(glossaryResolve("April", feeMap, {}), null);      // not "TAEil"
assert.equal(glossaryResolve("feedback", feeMap, {}), null);   // not "comisióndback"
assert.equal(glossaryResolve("coffee", feeMap, {}), null);     // not "cofcomisión"
assert.equal(glossaryResolve("monthly fee here", feeMap, {}), "monthly comisión here");

assert.equal(
  glossaryResolve("Annual Percentage Rate", { "Annual Percentage Rate": "TAE equiv" }, {}),
  "TAE equiv",
);

let lockedCalled = false;
assert.equal(
  glossaryResolve("APR", es, {
    isLocked: function () {
      lockedCalled = true;
      return true;
    },
  }),
  "APR",
);
assert.equal(lockedCalled, true);

console.log("glossary-lookup.test.mjs: ok");
