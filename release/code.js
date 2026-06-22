"use strict";
(() => {
  // src/code.ts
  figma.showUI(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="color-scheme" content="dark" />
<style>
/* ================================================================== */
/*  Design Tokens                                                      */
/* ================================================================== */
:root {
  --bg:         #1a1a1a;
  --card:       #242428;
  --card-hover: #2c2c31;
  --elevated:   #333338;
  --border:     #38383d;
  --border-lt:  #2e2e33;

  --primary:    #6366F1;
  --primary-h:  #818CF8;
  --primary-bg: rgba(99,102,241,.10);
  --green:      #34D399;
  --green-bg:   rgba(52,211,153,.10);
  --red:        #F87171;
  --red-bg:     rgba(248,113,113,.10);
  --yellow:     #FBBF24;
  --yellow-bg:  rgba(251,191,36,.10);

  --txt:   #E5E7EB;
  --txt2:  #9CA3AF;
  --txt3:  #6B7280;

  --r:  8px;
  --r2: 12px;
  --transition: .15s ease;
  /* Space for fixed bottom bar: up to 2 stacked buttons + cost hint + safe padding */
  --scroll-pad-bottom: 172px;
}

/* ================================================================== */
/*  Reset & Base                                                       */
/* ================================================================== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body { height: 100%; margin: 0; padding: 0; }
html { background: var(--bg); color-scheme: dark; }
body {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: var(--txt);
  background: var(--bg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ================================================================== */
/*  Layout                                                             */
/* ================================================================== */
header {
  padding: 16px 20px 14px;
  border-bottom: 1px solid var(--border-lt);
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
.logo {
  width: 32px; height: 32px;
  border-radius: var(--r);
  background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A78BFA 100%);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; color: #fff;
  letter-spacing: -.5px;
  flex-shrink: 0;
}
header h1 { font-size: 15px; font-weight: 600; letter-spacing: -.2px; }
header .ver {
  margin-left: auto;
  font-size: 10px;
  color: var(--txt3);
  background: var(--card);
  padding: 2px 8px;
  border-radius: 20px;
}

.scroll {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px var(--scroll-pad-bottom);
  scroll-padding-bottom: var(--scroll-pad-bottom);
}
.scroll::-webkit-scrollbar { width: 4px; }
.scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

/* ================================================================== */
/*  Sections & layout                                                  */
/* ================================================================== */
.section { margin-bottom: 20px; }

/* Used in dynamic panels (preview, cost, review) */
.section-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .8px;
  color: var(--txt3);
  margin-bottom: 10px;
}

/* Static field labels \u2014 engine, languages, lock terms, smart fit */
.field-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .75px;
  color: var(--txt3);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Group title bar \u2014 "Setup" / "Translate" */
/* Logical groups without visible headings \u2014 spacing only */
.workflow-group { margin-bottom: 0; }
.workflow-group + .workflow-group { margin-top: 22px; }

/* \u2500\u2500 Advanced: \u043B\u0438\u043D\u0438\u044F-\u0440\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C; \u0441\u0432\u0435\u0440\u0445\u0443 \u043E\u0442\u0441\u0442\u0443\u043F \u043E\u0442 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0433\u043E \u043F\u043E\u0442\u043E\u043A\u0430, \u0441\u043D\u0438\u0437\u0443 \u043F\u043B\u043E\u0442\u043D\u0435\u0435 \u043A \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u043C \u2500\u2500 */
.section-divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 32px 0 10px;
  color: var(--txt3);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
}
.section-divider::before,
.section-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-lt);
}

/* \u2500\u2500 Scan hero \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.scan-cta {
  min-height: 48px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -.15px;
  box-shadow: 0 4px 20px rgba(99,102,241,.35), 0 1px 3px rgba(0,0,0,.2);
}
.scan-cta:hover:not(:disabled) {
  box-shadow: 0 6px 26px rgba(99,102,241,.45), 0 2px 6px rgba(0,0,0,.25);
}

/* \u2500\u2500 Sync card \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.sync-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--r2);
  padding: 14px 16px;
}
.sync-card-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.sync-card-icon {
  width: 34px; height: 34px;
  border-radius: var(--r);
  background: var(--primary-bg);
  border: 1px solid rgba(99,102,241,.25);
  display: flex; align-items: center; justify-content: center;
  color: var(--primary-h);
  flex-shrink: 0;
}
.sync-card-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--txt);
  line-height: 1.2;
  letter-spacing: -.2px;
}
.sync-card-sub {
  font-size: 10px;
  color: var(--txt3);
  margin-top: 3px;
  line-height: 1.35;
}
.sync-card .hint {
  margin: 0 0 12px;
  padding-top: 10px;
  border-top: 1px solid var(--border-lt);
}

/* \u2500\u2500 Smart Fit inline \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.smartfit-block {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--r2);
  padding: 14px 16px;
}
.smartfit-block .fit-rows-stack {
  margin-top: 0;
}
.smartfit-block .hint {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid var(--border-lt);
  margin-bottom: 0;
}
.smartfit-reset {
  margin-top: 10px;
  font-size: 11px;
}
.smartfit-reset button {
  background: none;
  border: none;
  padding: 0;
  color: var(--primary);
  cursor: pointer;
  text-decoration: underline;
  font-size: inherit;
  font-family: inherit;
}
.designer-tips {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid var(--border-lt);
  font-size: 11px;
  color: var(--txt2);
  line-height: 1.5;
}
.designer-tips summary {
  cursor: pointer;
  color: var(--primary-h);
  font-weight: 600;
  list-style: none;
}
.designer-tips summary::-webkit-details-marker { display: none; }
.designer-tips ul {
  margin: 8px 0 0;
  padding-left: 18px;
}
.designer-tips li { margin-bottom: 6px; }
.designer-tips strong { color: var(--txt); font-weight: 600; }

/* Card surfaces \u2014 Smart Fit / Sync / Scan / Progress */
.panel {
  border-radius: var(--r2);
  border: 1px solid var(--border);
  background: var(--card);
  padding: 15px 16px 16px;
  box-shadow:
    0 1px 0 rgba(255,255,255,.04) inset,
    0 8px 28px rgba(0,0,0,.22);
}
.section > .panel { margin-bottom: 0; }
.panel-head { margin-bottom: 12px; }
.panel-eyebrow {
  display: block;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--primary-h);
  margin-bottom: 4px;
  opacity: .95;
}
.panel-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -.25px;
  color: var(--txt);
  line-height: 1.25;
}
.panel-desc {
  font-size: 11px;
  color: var(--txt2);
  line-height: 1.55;
  margin: 0 0 14px;
}
.panel-hint {
  font-size: 10px;
  color: var(--txt3);
  margin: 14px 0 0;
  padding-top: 12px;
  line-height: 1.45;
  border-top: 1px solid var(--border-lt);
}
.panel--sync {
  border-color: rgba(129,140,248,.42);
  background:
    radial-gradient(120% 80% at 0% 0%, rgba(99,102,241,.14) 0%, transparent 55%),
    var(--card);
  box-shadow:
    0 0 0 1px rgba(99,102,241,.08),
    0 10px 36px rgba(0,0,0,.24);
}
.panel--scan {
  border-color: rgba(99,102,241,.28);
  background:
    linear-gradient(180deg, rgba(99,102,241,.06) 0%, var(--card) 100%);
  padding: 16px;
  box-shadow:
    0 1px 0 rgba(255,255,255,.05) inset,
    0 8px 28px rgba(0,0,0,.2);
}
.panel--scan .btn-primary {
  min-height: 44px;
  border-radius: 10px;
  font-size: 13px;
}
.panel--progress {
  margin-top: 8px;
  padding: 12px 14px 14px;
  border-style: solid;
  border-color: var(--border-lt);
  box-shadow: 0 4px 20px rgba(0,0,0,.18);
}
.fit-rows-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ================================================================== */
/*  Provider Toggle                                                    */
/* ================================================================== */
.toggle-group {
  display: flex;
  background: var(--card);
  border-radius: var(--r);
  padding: 3px;
  gap: 2px;
  border: 1px solid var(--border-lt);
}
.toggle-opt {
  flex: 1;
  padding: 10px 12px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--txt2);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.toggle-opt:hover { color: var(--txt); }
.toggle-opt.active {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 2px 8px rgba(99,102,241,.3);
}
.toggle-opt .badge {
  font-size: 9px;
  padding: 1px 6px;
  border-radius: 20px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .3px;
}
.toggle-opt.active .badge { background: rgba(255,255,255,.2); color: #fff; }
.toggle-opt:not(.active) .badge { background: var(--green-bg); color: var(--green); }

/* ================================================================== */
/*  Inputs                                                             */
/* ================================================================== */
.input-row {
  display: flex;
  gap: 6px;
  align-items: stretch;
}
.input {
  flex: 1;
  background: var(--card);
  border: 1px solid var(--border-lt);
  border-radius: var(--r);
  color: var(--txt);
  padding: 10px 12px;
  font-size: 12px;
  font-family: inherit;
  outline: none;
  transition: border-color var(--transition);
}
.input:focus { border-color: var(--primary); }
.input::placeholder { color: var(--txt3); }

select.input {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
}

/* ================================================================== */
/*  Buttons                                                            */
/* ================================================================== */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 11px 20px;
  border: none; border-radius: var(--r);
  font-size: 12px; font-weight: 600; font-family: inherit;
  cursor: pointer;
  transition: all var(--transition);
  color: #fff;
  position: relative;
  overflow: hidden;
}
.btn:disabled { opacity: .4; cursor: not-allowed; }
.btn:active:not(:disabled) { transform: scale(.98); }

.btn-primary {
  background: var(--primary);
  box-shadow: 0 2px 12px rgba(99,102,241,.25);
}
.btn-primary:hover:not(:disabled) {
  background: var(--primary-h);
  box-shadow: 0 4px 16px rgba(99,102,241,.35);
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--txt2);
  box-shadow: none;
  padding: 9px 14px;
}
.btn-outline:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }

.btn-secondary {
  background: var(--elevated);
  border: 1px solid var(--border);
  color: var(--txt);
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
  padding: 11px 16px;
  min-height: 42px;
}
.btn-secondary:hover:not(:disabled) {
  background: var(--card-hover);
  border-color: var(--primary-h);
  color: #fff;
  box-shadow: 0 0 0 1px rgba(129,140,248,.35), 0 4px 14px rgba(99,102,241,.2);
}
.btn-secondary svg { flex-shrink: 0; opacity: .9; }

.btn-full { width: 100%; }

.btn-icon {
  width: 40px; height: 40px;
  padding: 0;
  background: var(--card);
  border: 1px solid var(--border-lt);
  color: var(--txt2);
  border-radius: var(--r);
  font-size: 14px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: none;
}
.btn-icon:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }

/* ================================================================== */
/*  Language Chips                                                     */
/* ================================================================== */
.chips { display: flex; gap: 8px; flex-wrap: wrap; }
.chip {
  flex: 1 1 calc(33.33% - 6px);
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px 14px;
  background: var(--card);
  border: 1.5px solid var(--border-lt);
  border-radius: var(--r);
  cursor: pointer;
  transition: all var(--transition);
  user-select: none;
}
.chip:hover { border-color: var(--txt3); }
.chip.on {
  border-color: var(--primary);
  background: var(--primary-bg);
}
.chip input { display: none; }
.chip .flag {
  font-size: 18px;
  line-height: 1;
  width: 22px;
  text-align: center;
  flex-shrink: 0;
}
.chip .lang-meta { display: flex; flex-direction: column; gap: 2px; }
.chip .name { font-size: 12px; font-weight: 600; line-height: 1; }
.chip .code {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .5px;
  color: var(--txt3);
  text-transform: uppercase;
  line-height: 1;
}
.chip.on .code { color: var(--primary); }

/* ================================================================== */
/*  Preview                                                            */
/* ================================================================== */
.preview-box {
  background: var(--card);
  border: 1px solid var(--border-lt);
  border-radius: var(--r);
  max-height: 180px;
  overflow-y: auto;
}
.preview-box::-webkit-scrollbar { width: 3px; }
.preview-box::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

.frame-label {
  position: sticky;
  top: 0;
  padding: 10px 14px;
  background: var(--elevated);
  font-size: 10px;
  font-weight: 600;
  color: var(--primary);
  letter-spacing: .3px;
  border-bottom: 1px solid var(--border-lt);
  z-index: 1;
}
.text-row {
  padding: 8px 14px;
  font-size: 11px;
  color: var(--txt);
  display: flex;
  align-items: baseline;
  gap: 10px;
  border-bottom: 1px solid rgba(255,255,255,.03);
}
.text-row:last-child { border-bottom: none; }
.text-row .num {
  font-size: 9px;
  font-weight: 600;
  color: var(--txt3);
  min-width: 16px;
  text-align: right;
  flex-shrink: 0;
}
.text-row .val {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ================================================================== */
/*  Cost Estimate Card                                                 */
/* ================================================================== */
.cost-card {
  background: var(--card);
  border: 1px solid var(--border-lt);
  border-radius: var(--r);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
}
.cost-card .icon {
  width: 36px; height: 36px;
  border-radius: var(--r);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
.cost-card .icon.free { background: var(--green-bg); }
.cost-card .icon.paid { background: var(--primary-bg); }
.cost-card .info { flex: 1; }
.cost-card .price {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -.3px;
}
.cost-card .price.free-price { color: var(--green); }
.cost-card .price.paid-price { color: var(--primary-h); }
.cost-card .detail {
  font-size: 10px;
  color: var(--txt3);
  margin-top: 2px;
}

/* ================================================================== */
/*  Progress                                                           */
/* ================================================================== */
.progress-section { margin-top: 0; margin-bottom: 14px; }
.progress-section .progress-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}
.progress-section .progress-eyebrow {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--txt3);
  opacity: 0.75;
}
.progress-outer {
  height: 6px;
  background: var(--elevated);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--border-lt);
}
.progress-inner {
  height: 100%;
  border-radius: 999px;
  width: 0%;
  transition: width .3s ease;
  background: linear-gradient(90deg, var(--primary), #A78BFA);
  box-shadow: 0 0 12px rgba(99,102,241,.45);
}
.progress-label {
  font-size: 9px;
  font-weight: 400;
  color: var(--txt3);
  text-align: left;
  margin-top: 6px;
  line-height: 1.4;
  opacity: 0.9;
}

/* ================================================================== */
/*  Log                                                                */
/* ================================================================== */
.log {
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid var(--border-lt);
  max-height: 72px;
  overflow-y: auto;
  font-size: 9px;
  color: var(--txt3);
}
.log::-webkit-scrollbar { width: 3px; }
.log::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
.log-line {
  padding: 2px 0;
  color: var(--txt3);
  display: flex;
  align-items: baseline;
  gap: 7px;
  line-height: 1.35;
  opacity: 0.92;
}
.log-line .dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 5px;
  opacity: 0.9;
}
.log-line.ok   { color: var(--txt2); font-size: 9px; }
.log-line.ok   .dot { background: var(--green); }
.log-line.err  { color: var(--red); font-size: 10px; opacity: 1; font-weight: 500; }
.log-line.err  .dot { background: var(--red); }
.log-line.warn { color: var(--yellow); font-size: 9px; opacity: 0.95; }
.log-line.warn .dot { background: var(--yellow); }
.log-line.info { color: var(--txt3); font-size: 9px; opacity: 0.75; }
.log-line.info .dot { background: var(--txt3); opacity: 0.5; }

/* ================================================================== */
/*  Bottom bar                                                         */
/* ================================================================== */
.bottom {
  position: fixed;
  z-index: 50;
  bottom: 0; left: 0; right: 0;
  padding: 12px 20px 16px;
  background: var(--bg);
  border-top: 1px solid var(--border-lt);
  box-shadow: 0 -12px 28px rgba(0,0,0,.45);
  pointer-events: none;
}
.bottom > * { pointer-events: auto; }
/* One primary action at a time: Translate \u2194 Apply in the same slot */
.bottom-primary-slot .btn-full { width: 100%; }
.bottom-primary-slot + .btn { margin-top: 8px; }
.bottom .btn + .btn { margin-top: 8px; }
.bottom .cost-hint {
  text-align: center;
  font-size: 10px;
  color: var(--txt3);
  margin-top: 6px;
}

/* ================================================================== */
/*  Selection-changed warning banner                                   */
/* ================================================================== */
.rescan-warn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  margin-bottom: 12px;
  background: rgba(251,191,36,.10);
  border: 1px solid rgba(251,191,36,.28);
  border-radius: var(--r);
  font-size: 10px;
  color: var(--yellow);
  line-height: 1.4;
  opacity: 0.95;
  animation: fadeIn .2s ease;
}
.rescan-warn svg { flex-shrink: 0; }
.rescan-warn strong { font-weight: 700; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }

/* ================================================================== */
/*  Scan hint (empty state) \u2014 tight to button, same visual group        */
/* ================================================================== */
.workflow-group .section-scan {
  margin-bottom: 16px;
}
#previewSection {
  margin-top: 4px;
}
#previewSection .section-label {
  margin-bottom: 8px;
}
#reviewSection.section {
  margin-top: 12px;
}
#reviewSection .section-label {
  margin-bottom: 10px;
}
.section-scan .scan-hint {
  text-align: center;
  margin: 10px 0 0;
  padding: 0;
  color: var(--txt3);
  font-size: 10px;
  line-height: 1.45;
  font-weight: 400;
  opacity: 0.85;
}
.section-scan .scan-hint strong { color: var(--txt2); font-weight: 600; }
/* ================================================================== */
/*  Utility                                                            */
/* ================================================================== */
/* ================================================================== */
/*  Lock terms                                                         */
/* ================================================================== */
.lock-input {
  width: 100%;
  background: var(--card);
  border: 1px solid var(--border-lt);
  border-radius: var(--r);
  color: var(--txt);
  padding: 10px 12px;
  font-size: 11px;
  font-family: inherit;
  outline: none;
  transition: border-color var(--transition);
  resize: vertical;
  min-height: 36px;
}
.lock-input:focus { border-color: var(--primary); }
.lock-input::placeholder { color: var(--txt3); }

/* ================================================================== */
/*  Review panel                                                       */
/* ================================================================== */
.review-panel {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-lt);
  border-radius: var(--r);
  background: var(--card);
  overflow: hidden;
  min-height: 0;
}
.review-tabs {
  display: flex;
  gap: 4px;
  margin: 0;
  padding: 8px;
  background: var(--elevated);
  border: none;
  border-bottom: 1px solid var(--border-lt);
  border-radius: 0;
}
.review-tab {
  flex: 1;
  padding: 7px 8px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--txt3);
  font-size: 11px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all var(--transition);
  text-transform: uppercase;
  letter-spacing: .5px;
}
.review-tab:hover { color: var(--txt); }
.review-tab.active { background: var(--primary); color: #fff; }
.review-tab .warn-dot {
  display: inline-block;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--yellow);
  margin-left: 4px;
  vertical-align: middle;
}

/* Only the rows scroll \u2014 header stays under tabs (no sticky overlap on main scroll) */
.review-scroll {
  flex: 1 1 auto;
  min-height: 0;
  max-height: 260px;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--card);
}
.review-scroll::-webkit-scrollbar { width: 3px; }
.review-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

.review-row {
  display: grid;
  grid-template-columns: 1fr 1fr 48px;
  gap: 1px;
  border-bottom: 1px solid var(--border-lt);
  font-size: 11px;
  position: relative;
}
.review-row:last-child { border-bottom: none; }
.review-row.overflow-warn { background: var(--yellow-bg); }
.review-row.overflow-danger { background: var(--red-bg); }

.review-cell {
  padding: 8px 10px;
  min-height: 36px;
  word-break: break-word;
  line-height: 1.4;
}
.review-original {
  color: var(--txt3);
  border-right: 1px solid var(--border-lt);
  outline: none;
  cursor: text;
  transition: background var(--transition);
}
.review-original:focus {
  background: rgba(251,191,36,.08);
  box-shadow: inset 0 0 0 1px var(--yellow);
  color: var(--txt);
}
.review-original:hover:not(:focus) {
  background: rgba(255,255,255,.03);
}
.review-original.src-syncing {
  opacity: 0.45;
  pointer-events: none;
}
.review-translated {
  color: var(--txt);
  outline: none;
  cursor: text;
  border-radius: 2px;
  transition: background var(--transition);
}
.review-translated:focus {
  background: rgba(99,102,241,.08);
  box-shadow: inset 0 0 0 1px var(--primary);
}
.review-translated:hover:not(:focus) {
  background: rgba(255,255,255,.03);
}

.review-delta {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .3px;
  color: var(--txt3);
  border-left: 1px solid var(--border-lt);
}
.review-delta.ok { color: var(--green); }
.review-delta.warn { color: var(--yellow); }
.review-delta.danger { color: var(--red); }

.review-header {
  display: grid;
  grid-template-columns: 1fr 1fr 48px;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .6px;
  color: var(--txt3);
  background: var(--elevated);
  border-bottom: 1px solid var(--border-lt);
  flex-shrink: 0;
}
/* Each header cell mirrors .review-cell padding so columns stay aligned */
.review-header > span {
  padding: 6px 10px;
}
.review-header > span:not(:last-child) {
  border-right: 1px solid var(--border-lt);
}
.review-header > span:last-child {
  text-align: center;
}

.review-summary {
  display: flex;
  gap: 16px;
  padding: 10px 0 0;
  font-size: 10px;
  color: var(--txt2);
}
.review-summary .stat { display: flex; align-items: center; gap: 4px; }
.review-summary .dot-sm {
  width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
}

/* ================================================================== */
/*  Bottom bar variants                                                */
/* ================================================================== */
.btn-success {
  background: var(--green);
  box-shadow: 0 2px 12px rgba(52,211,153,.25);
}
.btn-success:hover:not(:disabled) {
  background: #2DD4A0;
  box-shadow: 0 4px 16px rgba(52,211,153,.35);
}

/* ================================================================== */
/*  Smart Fit controls                                                 */
/* ================================================================== */
.fit-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.fit-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  flex: 1;
}
.fit-toggle input { display: none; }
.fit-toggle-track {
  flex-shrink: 0;
  width: 32px;
  height: 18px;
  border-radius: 9px;
  background: var(--elevated);
  border: 1px solid var(--border);
  position: relative;
  transition: background var(--transition), border-color var(--transition);
}
.fit-toggle-track::after {
  content: '';
  position: absolute;
  top: 2px; left: 2px;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: var(--txt3);
  transition: transform var(--transition), background var(--transition);
}
.fit-toggle input:checked + .fit-toggle-track {
  background: var(--primary);
  border-color: var(--primary);
}
.fit-toggle input:checked + .fit-toggle-track::after {
  transform: translateX(14px);
  background: #fff;
}
.fit-toggle-label { font-size: 12px; font-weight: 500; color: var(--txt); }

.fit-control-group {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  transition: opacity var(--transition);
}
.fit-hint-label {
  font-size: 10px;
  font-weight: 500;
  color: var(--txt2);
  white-space: nowrap;
}

/* ================================================================== */
/*  Side padding stepper                                               */
/* ================================================================== */
.stepper {
  display: flex;
  align-items: stretch;
  border: 1px solid var(--border);
  border-radius: var(--r);
  overflow: hidden;
  background: var(--bg);
  min-width: 132px;
}
.stepper-btn {
  width: 34px;
  border: none;
  background: #2f2f36;
  color: var(--txt);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition);
}
.stepper-btn:hover { color: #fff; background: #3d3d47; }
.stepper-btn:active { transform: scale(.98); }
.stepper-input {
  width: 64px;
  border: none;
  border-left: 1px solid var(--border-lt);
  border-right: 1px solid var(--border-lt);
  background: transparent;
  color: var(--txt);
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  outline: none;
}
.stepper-input::-webkit-outer-spin-button,
.stepper-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.stepper-input[type=number] { -moz-appearance: textfield; }

/* ================================================================== */
/*  Utility                                                            */
/* ================================================================== */
.hidden { display: none !important; }
.hint { font-size: 10px; color: var(--txt3); margin-top: 6px; line-height: 1.4; }
.mt-sm { margin-top: 8px; }
.mt { margin-top: 12px; }
.fade-in { animation: fadeIn .2s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
</style>
</head>
<body>

<!-- ================================================================ -->
<!--  Header                                                           -->
<!-- ================================================================ -->
<header>
  <div class="logo">FT</div>
  <h1>Fintech Translator</h1>
  <span class="ver">v2.0</span>
</header>

<!-- ================================================================ -->
<!--  Scrollable body                                                  -->
<!-- ================================================================ -->
<div class="scroll">

  <div class="workflow-group">
    <!-- Engine -->
    <div class="section">
      <div class="field-label">Translation Engine</div>
      <div class="toggle-group">
        <button class="toggle-opt active" data-provider="free" id="provFree">
          <span>Google Translate</span>
          <span class="badge">Free</span>
        </button>
        <button class="toggle-opt" data-provider="openai" id="provPro">
          <span>OpenAI</span>
          <span class="badge">Pro</span>
        </button>
      </div>
    </div>

    <!-- API Key (Pro only) -->
    <div class="section hidden" id="proSettings">
      <div class="field-label">OpenAI API Key</div>
      <div class="input-row">
        <input class="input" id="apiKey" type="password" placeholder="sk-proj-..." />
        <button class="btn btn-icon" id="toggleKey" title="Show/hide">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
        <button class="btn btn-outline" id="saveKey">Save</button>
      </div>
      <p class="hint">Stored locally in Figma. Never sent anywhere except OpenAI.</p>
      <div class="mt">
        <div class="field-label">Model</div>
        <select class="input" id="model">
          <option value="gpt-5.5-nano">GPT-5.5 Nano  \u2014  fastest, ~$0.25/1M</option>
          <option value="gpt-5.5-mini" selected>GPT-5.5 Mini  \u2014  balanced, ~$0.90/1M</option>
          <option value="gpt-5.5">GPT-5.5  \u2014  best quality, ~$3.50/1M</option>
          <option value="gpt-5.4-nano">GPT-5.4 Nano  \u2014  fastest, ~$0.20/1M</option>
          <option value="gpt-5.4-mini">GPT-5.4 Mini  \u2014  balanced, ~$0.75/1M</option>
          <option value="gpt-5.4">GPT-5.4  \u2014  best quality, ~$3/1M</option>
          <option value="gpt-4o-mini">GPT-4o Mini  \u2014  legacy</option>
          <option value="gpt-4o">GPT-4o  \u2014  legacy</option>
        </select>
      </div>
    </div>

    <!-- Languages -->
    <div class="section">
      <div class="field-label">Target Languages</div>
      <div class="chips">
        <label class="chip on" data-lang="es">
          <input type="checkbox" value="es" checked />
          <span class="flag">&#127466;&#127480;</span>
          <div class="lang-meta"><div class="name">Spanish</div><div class="code">ES</div></div>
        </label>
        <label class="chip on" data-lang="it">
          <input type="checkbox" value="it" checked />
          <span class="flag">&#127470;&#127481;</span>
          <div class="lang-meta"><div class="name">Italian</div><div class="code">IT</div></div>
        </label>
        <label class="chip on" data-lang="fr">
          <input type="checkbox" value="fr" checked />
          <span class="flag">&#127467;&#127479;</span>
          <div class="lang-meta"><div class="name">French</div><div class="code">FR</div></div>
        </label>
        <label class="chip on" data-lang="de">
          <input type="checkbox" value="de" checked />
          <span class="flag">&#127465;&#127466;</span>
          <div class="lang-meta"><div class="name">Deutsch</div><div class="code">DE</div></div>
        </label>
        <label class="chip on" data-lang="pt">
          <input type="checkbox" value="pt" checked />
          <span class="flag">&#127477;&#127481;</span>
          <div class="lang-meta"><div class="name">Portugu\xEAs</div><div class="code">PT</div></div>
        </label>
        <label class="chip" data-lang="pl">
          <input type="checkbox" value="pl" />
          <span class="flag">&#127477;&#127473;</span>
          <div class="lang-meta"><div class="name">Polski</div><div class="code">PL</div></div>
        </label>
        <label class="chip" data-lang="el">
          <input type="checkbox" value="el" />
          <span class="flag">&#127468;&#127479;</span>
          <div class="lang-meta"><div class="name">\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC</div><div class="code">EL</div></div>
        </label>
        <label class="chip" data-lang="tr">
          <input type="checkbox" value="tr" />
          <span class="flag">&#127481;&#127479;</span>
          <div class="lang-meta"><div class="name">T\xFCrk\xE7e</div><div class="code">TR</div></div>
        </label>
        <label class="chip" data-lang="ko">
          <input type="checkbox" value="ko" />
          <span class="flag">&#127472;&#127479;</span>
          <div class="lang-meta"><div class="name">\uD55C\uAD6D\uC5B4</div><div class="code">KO</div></div>
        </label>
        <label class="chip" data-lang="zh">
          <input type="checkbox" value="zh" />
          <span class="flag">&#127464;&#127475;</span>
          <div class="lang-meta"><div class="name">\u4E2D\u6587</div><div class="code">ZH</div></div>
        </label>
        <label class="chip" data-lang="ja">
          <input type="checkbox" value="ja" />
          <span class="flag">&#127471;&#127477;</span>
          <div class="lang-meta"><div class="name">\u65E5\u672C\u8A9E</div><div class="code">JA</div></div>
        </label>
      </div>
    </div>

    <!-- Lock terms -->
    <div class="section" style="margin-bottom:0">
      <div class="field-label">Do Not Translate</div>
      <input class="lock-input" id="lockTerms" type="text"
             placeholder="Maclear, 8lends, USDC, KYC, APR\u2026  (comma-separated)" />
      <p class="hint">These exact terms stay in English across all translations.</p>
    </div>
  </div>

  <div class="workflow-group">
    <!-- Selection-changed warning -->
    <div class="rescan-warn hidden" id="rescanWarn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      Selection changed \u2014 <strong id="rescanLink">Scan again</strong> to update
    </div>

    <!-- Scan: primary hero action -->
    <div class="section section-scan" style="margin-bottom:0">
      <button class="btn btn-primary btn-full scan-cta" id="scanBtn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        Scan Selection
      </button>
      <p id="emptyState" class="scan-hint" role="status">
        Select frames on the canvas, then tap <strong>Scan</strong>
      </p>
    </div>
  </div>

  <!-- Preview (revealed after scan) -->
  <div class="section hidden fade-in" id="previewSection">
    <div class="section-label">Found Texts <span id="countBadge" style="color:var(--primary)"></span></div>
    <div class="preview-box" id="previewBox"></div>
  </div>

  <!-- Cost estimate (revealed after scan) -->
  <div class="section hidden fade-in" id="costSection">
    <div class="section-label">Estimated Cost</div>
    <div class="cost-card" id="costCard"></div>
  </div>

  <!-- Progress (revealed during translation) -->
  <div class="progress-section panel panel--progress hidden" id="progressSection">
    <div class="progress-head">
      <span class="progress-eyebrow">Progress</span>
    </div>
    <div class="progress-outer"><div class="progress-inner" id="progressBar"></div></div>
    <div class="progress-label" id="progressLabel">Ready</div>
  </div>

  <!-- Review panel (revealed after translation) -->
  <div class="section hidden fade-in" id="reviewSection">
    <div class="section-label">Review <span style="font-weight:400;color:var(--txt3)">\xB7 Fit % \xB7 next: Apply</span></div>
    <div class="review-panel">
      <div class="review-tabs" id="reviewTabs"></div>
      <div class="review-header">
        <span>Source EN (editable)</span>
        <span>Translation</span>
        <span>Fit</span>
      </div>
      <div class="review-scroll">
        <div id="reviewRows"></div>
      </div>
    </div>
    <div class="review-summary" id="reviewSummary"></div>
  </div>

  <div class="section-divider"><span>Advanced</span></div>

  <!-- Smart Fit -->
  <div class="section">
    <div class="field-label">Smart Fit</div>
    <div class="smartfit-block">
      <div class="fit-rows-stack">
        <div class="fit-row">
          <label class="fit-toggle" id="wrapToggle">
            <input type="checkbox" id="smartWrap" checked />
            <span class="fit-toggle-track"></span>
            <span class="fit-toggle-label">Wrap to frame width</span>
          </label>
          <div class="fit-control-group">
            <span class="fit-hint-label">Side padding</span>
            <div class="stepper">
              <button class="stepper-btn" id="padMinus" type="button">\u2212</button>
              <input class="stepper-input" id="sidePadding" type="number" min="0" max="80" step="1" value="16" />
              <button class="stepper-btn" id="padPlus" type="button">+</button>
            </div>
          </div>
        </div>
        <div class="fit-row">
          <label class="fit-toggle" id="expandFramesToggle">
            <input type="checkbox" id="expandFrames" checked />
            <span class="fit-toggle-track"></span>
            <span class="fit-toggle-label">Grow frames when text overflows</span>
          </label>
        </div>
        <div class="fit-row">
          <label class="fit-toggle" id="scaleToggle">
            <input type="checkbox" id="autoFontScale" />
            <span class="fit-toggle-track"></span>
            <span class="fit-toggle-label">Auto scale font if overflow</span>
          </label>
          <div class="fit-control-group" id="minFontGroup" style="opacity:.4;pointer-events:none">
            <span class="fit-hint-label">Min size</span>
            <div class="stepper">
              <button class="stepper-btn" id="minFontMinus" type="button">\u2212</button>
              <input class="stepper-input" id="minFontSize" type="number" min="6" max="24" step="1" value="8" />
              <button class="stepper-btn" id="minFontPlus" type="button">+</button>
            </div>
          </div>
        </div>
      </div>
      <p class="hint">Wrap turns single-line text into wrapping mode. <strong>Grow frames</strong> widens/talls fixed cards (e.g. glass panels) so longer translations stay inside. Auto scale shrinks type instead.</p>
      <div class="smartfit-reset">
        <button type="button" id="smartFitRecommendedBtn">Use recommended defaults</button>
      </div>
      <details class="designer-tips">
        <summary>Layout tips \u2014 complex screens &amp; glass cards</summary>
        <ul>
          <li><strong>One frame per screen.</strong> Select the whole artboard (e.g. &quot;10&quot;). We clone it as one piece so staggered cards stay aligned with the illustration.</li>
          <li><strong>Inside each card,</strong> use vertical Auto Layout for list rows (icon + text). When text wraps, rows grow together; <strong>Grow frames</strong> expands the glass panel behind.</li>
          <li><strong>Long languages (ES, DE, PL, EL\u2026):</strong> keep <strong>Wrap</strong> + <strong>Grow frames</strong> on. Use <strong>Auto scale font</strong> only for fixed-size UI (tiny buttons, badges).</li>
        </ul>
      </details>
    </div>
  </div>

  <!-- Sync from source -->
  <div class="section">
    <div class="field-label">Sync from Source</div>
    <div class="sync-card">
      <div class="sync-card-head">
        <div class="sync-card-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
        </div>
        <div>
          <div class="sync-card-title">Update all language frames</div>
          <div class="sync-card-sub">Edit EN source, push to all locales at once</div>
        </div>
      </div>
      <p class="hint">Select one source frame. Matching frames on this page \u2014 <strong>BaseName [ES]</strong>, <strong>BaseName [PL]</strong>, <strong>BaseName [EL]</strong>, <strong>[KO]</strong>, <strong>[ZH]</strong>, <strong>[JA]</strong>, \u2026 \u2014 receive fresh translations. Smart Fit settings above apply.</p>
      <button class="btn btn-secondary btn-full" type="button" id="syncRefBtn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
        Sync Selected Frame to All Languages
      </button>
    </div>
  </div>

  <!-- Log -->
  <div class="log" id="logArea"></div>

</div>

<!-- ================================================================ -->
<!--  Bottom bar                                                       -->
<!-- ================================================================ -->
<div class="bottom">
  <div class="bottom-primary-slot">
    <button class="btn btn-primary btn-full" id="translateBtn" disabled type="button">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></svg>
      <span id="translateLabel">Translate</span>
    </button>
    <button class="btn btn-primary btn-full hidden" id="applyBtn" disabled type="button">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
      Apply to canvas
    </button>
  </div>
  <button class="btn btn-outline btn-full hidden" id="cancelBtn" type="button" style="border-color:var(--red);color:var(--red)">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    Cancel
  </button>
  <div class="cost-hint hidden" id="costHint"></div>
</div>

<!-- ================================================================ -->
<!--  Script                                                           -->
<!-- ================================================================ -->
<!-- Loads before inline script; produced by npm run build -->
<script src="glossary-lookup.js"><\/script>
<script>
/* ================================================================== */
/*  Glossary                                                           */
/* ================================================================== */
const GLOSSARY = {
  es: {
    // Core finance
    "APR":"TAE","Annual Percentage Rate":"Tasa Anual Equivalente",
    "interest rate":"tasa de inter\xE9s","annual returns":"rendimientos anuales",
    "monthly payouts":"pagos mensuales","monthly payments":"pagos mensuales",
    "balance":"saldo","statement":"extracto","account":"cuenta",
    "deposit":"dep\xF3sito","withdrawal":"retiro","wire transfer":"transferencia bancaria",
    "transaction":"transacci\xF3n","payment":"pago","invoice":"factura",
    "fee":"comisi\xF3n","no hidden fees":"sin comisiones ocultas",
    // P2P / Crowdlending (Maclear)
    "P2P lending":"pr\xE9stamos P2P","crowdlending":"crowdlending",
    "crowdfunding":"financiaci\xF3n colectiva","lending platform":"plataforma de pr\xE9stamos",
    "investment platform":"plataforma de inversi\xF3n",
    "investor":"inversor","investors":"inversores",
    "borrower":"prestatario","lender":"prestamista",
    "loan":"pr\xE9stamo","loan period":"plazo del pr\xE9stamo","loan term":"plazo del pr\xE9stamo",
    "loan originator":"originador de pr\xE9stamos",
    "funded":"financiado","repaid":"reembolsado",
    "default":"impago","late loans":"pr\xE9stamos con retraso",
    "cash drag":"capital inactivo",
    "primary market":"mercado primario","secondary market":"mercado secundario",
    "total funded":"total financiado","total interest paid":"total de intereses pagados",
    "available funds":"fondos disponibles","invested funds":"fondos invertidos",
    "total funds":"fondos totales",
    // Investment
    "initial investment":"inversi\xF3n inicial","investment period":"per\xEDodo de inversi\xF3n",
    "future value":"valor futuro","earned return":"rendimiento obtenido",
    "average annual return":"rendimiento medio anual",
    "portfolio":"cartera","passive income":"ingresos pasivos",
    "principal repayment":"devoluci\xF3n del capital",
    "interest payment":"pago de intereses",
    "installment":"cuota","recurring payment":"pago recurrente",
    // Compliance & process
    "due diligence":"diligencia debida","risk assessment":"evaluaci\xF3n de riesgos",
    "risk scoring":"puntuaci\xF3n de riesgo","AML":"AML",
    "compliance":"cumplimiento normativo","regulated":"regulado",
    "verification":"verificaci\xF3n","KYC":"KYC",
    // Bonuses & rewards
    "referral bonus":"bono de referido","loyalty bonus":"bono de fidelidad",
    "welcome bonus":"bono de bienvenida","investment reward":"recompensa de inversi\xF3n",
    "invite friends":"invitar amigos",
    // UI actions
    "sign up":"registrarse","log in":"iniciar sesi\xF3n","register":"registrarse",
    "invest now":"invertir ahora","start investing":"empezar a invertir",
    "dashboard":"panel de control","onboarding":"alta de cliente",
    // General finance
    "collateral":"garant\xEDa","mortgage":"hipoteca","savings":"ahorros",
    "credit score":"puntuaci\xF3n crediticia","overdraft":"sobregiro",
    "chargeback":"contracargo","settlement":"liquidaci\xF3n",
    "direct debit":"domiciliaci\xF3n bancaria","exchange rate":"tipo de cambio",
    "payee":"beneficiario","payer":"pagador","beneficiary":"beneficiario",
    "equity":"capital","liability":"pasivo","asset":"activo",
    "dividend":"dividendo","spending limit":"l\xEDmite de gasto",
    // Crypto / Web3 (Maclear Crypto Course)
    "blockchain":"blockchain","token":"token","tokens":"tokens",
    "stablecoin":"stablecoin","stablecoins":"stablecoins",
    "cryptocurrency":"criptomoneda","crypto":"cripto",
    "crypto wallet":"monedero cripto","wallet":"monedero",
    "seed phrase":"frase semilla","private key":"clave privada",
    "public address":"direcci\xF3n p\xFAblica","smart contract":"contrato inteligente",
    "network fees":"comisiones de red","gas fees":"tarifas de gas",
    "custodial":"custodiado","non-custodial":"no custodiado",
    "custodial wallet":"monedero custodiado",
    "non-custodial wallet":"monedero auto-custodiado",
    "fiat":"moneda fiduciaria","pegged":"vinculado",
    "decentralized":"descentralizado","centralized":"centralizado",
    "capital provider":"proveedor de capital",
    "repayment schedule":"calendario de pagos",
    "leverage":"apalancamiento","diversification":"diversificaci\xF3n",
    "yield":"rendimiento","returns":"rendimientos",
    "liquidity":"liquidez","protocol":"protocolo",
    "staking":"staking","airdrop":"airdrop",
    "mining":"miner\xEDa","validator":"validador",
    "consensus":"consenso","bridge":"puente",
    "on-chain":"on-chain","off-chain":"off-chain",
    "scam":"estafa","phishing":"phishing",
    "Learn & Earn":"Aprende y Gana",
    "start learning":"empezar a aprender",
    "checklist":"lista de verificaci\xF3n",
    "step-by-step":"paso a paso",
    "beginner":"principiante","beginners":"principiantes",
    // Tech terms \u2014 must stay untranslated
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","DEX":"DEX","CEX":"CEX","DApp":"DApp",
    "Layer 1":"Layer 1","Layer 2":"Layer 2",
    // Date/era labels \u2014 keep verbatim
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",
    // Infographic card text \u2014 concise translations
    "Evolution of the Web from 1.0 to 3.0":"Evoluci\xF3n de la Web del 1.0 al 3.0",
    "Static read-only web pages":"P\xE1ginas web est\xE1ticas de solo lectura",
    "Information-centric and interactive":"Centrada en la informaci\xF3n e interactiva",
    "User-centric, decentralized, private and secure":"Centrada en el usuario, descentralizada, privada y segura",
    "read-only":"solo lectura","user-centric":"centrada en el usuario",
    "private and secure":"privada y segura"
  },
  it: {
    "APR":"TAEG","Annual Percentage Rate":"Tasso Annuo Effettivo Globale",
    "interest rate":"tasso di interesse","annual returns":"rendimenti annuali",
    "monthly payouts":"pagamenti mensili","monthly payments":"pagamenti mensili",
    "balance":"saldo","statement":"estratto conto","account":"conto",
    "deposit":"deposito","withdrawal":"prelievo","wire transfer":"bonifico bancario",
    "transaction":"transazione","payment":"pagamento","invoice":"fattura",
    "fee":"commissione","no hidden fees":"nessuna commissione nascosta",
    "P2P lending":"prestiti P2P","crowdlending":"crowdlending",
    "crowdfunding":"crowdfunding","lending platform":"piattaforma di prestiti",
    "investment platform":"piattaforma di investimento",
    "investor":"investitore","investors":"investitori",
    "borrower":"mutuatario","lender":"prestatore",
    "loan":"prestito","loan period":"durata del prestito","loan term":"durata del prestito",
    "loan originator":"originatore di prestiti",
    "funded":"finanziato","repaid":"rimborsato",
    "default":"insolvenza","late loans":"prestiti in ritardo",
    "cash drag":"capitale inattivo",
    "primary market":"mercato primario","secondary market":"mercato secondario",
    "total funded":"totale finanziato","total interest paid":"totale interessi pagati",
    "available funds":"fondi disponibili","invested funds":"fondi investiti",
    "total funds":"fondi totali",
    "initial investment":"investimento iniziale","investment period":"periodo di investimento",
    "future value":"valore futuro","earned return":"rendimento ottenuto",
    "average annual return":"rendimento medio annuo",
    "portfolio":"portafoglio","passive income":"reddito passivo",
    "principal repayment":"rimborso del capitale",
    "interest payment":"pagamento degli interessi",
    "installment":"rata","recurring payment":"pagamento ricorrente",
    "due diligence":"due diligence","risk assessment":"valutazione del rischio",
    "risk scoring":"punteggio di rischio","AML":"AML",
    "compliance":"conformit\xE0 normativa","regulated":"regolamentato",
    "verification":"verifica","KYC":"KYC",
    "referral bonus":"bonus referral","loyalty bonus":"bonus fedelt\xE0",
    "welcome bonus":"bonus di benvenuto","investment reward":"premio di investimento",
    "invite friends":"invita amici",
    "sign up":"registrati","log in":"accedi","register":"registrati",
    "invest now":"investi ora","start investing":"inizia a investire",
    "dashboard":"pannello di controllo","onboarding":"registrazione cliente",
    "collateral":"garanzia","mortgage":"mutuo","savings":"risparmi",
    "credit score":"punteggio di credito","overdraft":"scoperto",
    "chargeback":"storno","settlement":"regolamento",
    "direct debit":"addebito diretto","exchange rate":"tasso di cambio",
    "payee":"beneficiario","payer":"pagatore","beneficiary":"beneficiario",
    "equity":"capitale","liability":"passivit\xE0","asset":"attivit\xE0",
    "dividend":"dividendo","spending limit":"limite di spesa",
    "blockchain":"blockchain","token":"token","tokens":"token",
    "stablecoin":"stablecoin","stablecoins":"stablecoin",
    "cryptocurrency":"criptovaluta","crypto":"cripto",
    "crypto wallet":"portafoglio crypto","wallet":"portafoglio",
    "seed phrase":"frase seed","private key":"chiave privata",
    "public address":"indirizzo pubblico","smart contract":"contratto intelligente",
    "network fees":"commissioni di rete","gas fees":"commissioni gas",
    "custodial":"custodiale","non-custodial":"non custodiale",
    "custodial wallet":"portafoglio custodiale",
    "non-custodial wallet":"portafoglio non custodiale",
    "fiat":"valuta fiat","pegged":"ancorato",
    "decentralized":"decentralizzato","centralized":"centralizzato",
    "capital provider":"fornitore di capitale",
    "repayment schedule":"piano di rimborso",
    "leverage":"leva finanziaria","diversification":"diversificazione",
    "yield":"rendimento","returns":"rendimenti",
    "liquidity":"liquidit\xE0","protocol":"protocollo",
    "staking":"staking","airdrop":"airdrop",
    "mining":"mining","validator":"validatore",
    "consensus":"consenso","bridge":"bridge",
    "on-chain":"on-chain","off-chain":"off-chain",
    "scam":"truffa","phishing":"phishing",
    "Learn & Earn":"Impara e Guadagna",
    "start learning":"inizia a imparare",
    "checklist":"checklist","step-by-step":"passo dopo passo",
    "beginner":"principiante","beginners":"principianti",
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","DEX":"DEX","CEX":"CEX","DApp":"DApp",
    "Layer 1":"Layer 1","Layer 2":"Layer 2",
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",
    "Evolution of the Web from 1.0 to 3.0":"Evoluzione del Web dal 1.0 al 3.0",
    "Static read-only web pages":"Pagine web statiche in sola lettura",
    "Information-centric and interactive":"Incentrato sulle informazioni e interattivo",
    "User-centric, decentralized, private and secure":"Incentrato sull'utente, decentralizzato, privato e sicuro",
    "read-only":"sola lettura","user-centric":"incentrato sull'utente"
  },
  fr: {
    "APR":"TAEG","Annual Percentage Rate":"Taux Annuel Effectif Global",
    "interest rate":"taux d'int\xE9r\xEAt","annual returns":"rendements annuels",
    "monthly payouts":"versements mensuels","monthly payments":"paiements mensuels",
    "balance":"solde","statement":"relev\xE9","account":"compte",
    "deposit":"d\xE9p\xF4t","withdrawal":"retrait","wire transfer":"virement bancaire",
    "transaction":"transaction","payment":"paiement","invoice":"facture",
    "fee":"frais","no hidden fees":"aucuns frais cach\xE9s",
    "P2P lending":"pr\xEAt P2P","crowdlending":"crowdlending",
    "crowdfunding":"financement participatif","lending platform":"plateforme de pr\xEAt",
    "investment platform":"plateforme d'investissement",
    "investor":"investisseur","investors":"investisseurs",
    "borrower":"emprunteur","lender":"pr\xEAteur",
    "loan":"pr\xEAt","loan period":"dur\xE9e du pr\xEAt","loan term":"dur\xE9e du pr\xEAt",
    "loan originator":"originateur de pr\xEAts",
    "funded":"financ\xE9","repaid":"rembours\xE9",
    "default":"d\xE9faut de paiement","late loans":"pr\xEAts en retard",
    "cash drag":"capital inactif",
    "primary market":"march\xE9 primaire","secondary market":"march\xE9 secondaire",
    "total funded":"total financ\xE9","total interest paid":"total des int\xE9r\xEAts vers\xE9s",
    "available funds":"fonds disponibles","invested funds":"fonds investis",
    "total funds":"fonds totaux",
    "initial investment":"investissement initial","investment period":"p\xE9riode d'investissement",
    "future value":"valeur future","earned return":"rendement obtenu",
    "average annual return":"rendement annuel moyen",
    "portfolio":"portefeuille","passive income":"revenu passif",
    "principal repayment":"remboursement du capital",
    "interest payment":"paiement des int\xE9r\xEAts",
    "installment":"versement","recurring payment":"paiement r\xE9current",
    "due diligence":"v\xE9rification pr\xE9alable","risk assessment":"\xE9valuation des risques",
    "risk scoring":"notation du risque","AML":"LCB",
    "compliance":"conformit\xE9 r\xE9glementaire","regulated":"r\xE9glement\xE9",
    "verification":"v\xE9rification","KYC":"KYC",
    "referral bonus":"prime de parrainage","loyalty bonus":"prime de fid\xE9lit\xE9",
    "welcome bonus":"prime de bienvenue","investment reward":"r\xE9compense d'investissement",
    "invite friends":"inviter des amis",
    "sign up":"s'inscrire","log in":"se connecter","register":"s'inscrire",
    "invest now":"investir maintenant","start investing":"commencer \xE0 investir",
    "dashboard":"tableau de bord","onboarding":"inscription client",
    "collateral":"garantie","mortgage":"pr\xEAt hypoth\xE9caire","savings":"\xE9pargne",
    "credit score":"cote de cr\xE9dit","overdraft":"d\xE9couvert",
    "chargeback":"r\xE9trofacturation","settlement":"r\xE8glement",
    "direct debit":"pr\xE9l\xE8vement automatique","exchange rate":"taux de change",
    "payee":"b\xE9n\xE9ficiaire","payer":"payeur","beneficiary":"b\xE9n\xE9ficiaire",
    "equity":"capitaux propres","liability":"passif","asset":"actif",
    "dividend":"dividende","spending limit":"plafond de d\xE9penses",
    "blockchain":"blockchain","token":"jeton","tokens":"jetons",
    "stablecoin":"stablecoin","stablecoins":"stablecoins",
    "cryptocurrency":"cryptomonnaie","crypto":"crypto",
    "crypto wallet":"portefeuille crypto","wallet":"portefeuille",
    "seed phrase":"phrase de r\xE9cup\xE9ration","private key":"cl\xE9 priv\xE9e",
    "public address":"adresse publique","smart contract":"contrat intelligent",
    "network fees":"frais de r\xE9seau","gas fees":"frais de gas",
    "custodial":"custodial","non-custodial":"non-custodial",
    "custodial wallet":"portefeuille custodial",
    "non-custodial wallet":"portefeuille non-custodial",
    "fiat":"monnaie fiduciaire","pegged":"index\xE9",
    "decentralized":"d\xE9centralis\xE9","centralized":"centralis\xE9",
    "capital provider":"fournisseur de capital",
    "repayment schedule":"calendrier de remboursement",
    "leverage":"effet de levier","diversification":"diversification",
    "yield":"rendement","returns":"rendements",
    "liquidity":"liquidit\xE9","protocol":"protocole",
    "staking":"staking","airdrop":"airdrop",
    "mining":"minage","validator":"validateur",
    "consensus":"consensus","bridge":"pont",
    "on-chain":"on-chain","off-chain":"off-chain",
    "scam":"arnaque","phishing":"hame\xE7onnage",
    "Learn & Earn":"Apprendre et Gagner",
    "start learning":"commencer \xE0 apprendre",
    "checklist":"liste de contr\xF4le","step-by-step":"\xE9tape par \xE9tape",
    "beginner":"d\xE9butant","beginners":"d\xE9butants",
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","DEX":"DEX","CEX":"CEX","DApp":"DApp",
    "Layer 1":"Layer 1","Layer 2":"Layer 2",
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",
    "Evolution of the Web from 1.0 to 3.0":"\xC9volution du Web de 1.0 \xE0 3.0",
    "Static read-only web pages":"Pages web statiques en lecture seule",
    "Information-centric and interactive":"Centr\xE9 sur l'information et interactif",
    "User-centric, decentralized, private and secure":"Centr\xE9 sur l'utilisateur, d\xE9centralis\xE9, priv\xE9 et s\xE9curis\xE9",
    "read-only":"lecture seule","user-centric":"centr\xE9 utilisateur"
  },
  de: {
    "APR":"Eff. Jahreszins","Annual Percentage Rate":"Effektiver Jahreszins",
    "interest rate":"Zinssatz","annual returns":"Jahresrendite",
    "monthly payouts":"monatliche Auszahlungen","monthly payments":"monatliche Zahlungen",
    "balance":"Kontostand","statement":"Kontoauszug","account":"Konto",
    "deposit":"Einzahlung","withdrawal":"Auszahlung","wire transfer":"Bank\xFCberweisung",
    "transaction":"Transaktion","payment":"Zahlung","invoice":"Rechnung",
    "fee":"Geb\xFChr","no hidden fees":"keine versteckten Geb\xFChren",
    "P2P lending":"P2P-Kreditvergabe","crowdlending":"Crowdlending",
    "crowdfunding":"Crowdfunding","lending platform":"Kreditplattform",
    "investment platform":"Investitionsplattform",
    "investor":"Investor","investors":"Investoren",
    "borrower":"Kreditnehmer","lender":"Kreditgeber",
    "loan":"Kredit","loan period":"Kreditlaufzeit","loan term":"Kreditlaufzeit",
    "loan originator":"Kreditanbahner",
    "funded":"finanziert","repaid":"zur\xFCckgezahlt",
    "default":"Ausfall","late loans":"versp\xE4tete Kredite",
    "cash drag":"Kapitalverz\xF6gerung",
    "primary market":"Prim\xE4rmarkt","secondary market":"Sekund\xE4rmarkt",
    "total funded":"Gesamtfinanzierung","total interest paid":"Gesamtzinsen gezahlt",
    "available funds":"verf\xFCgbare Mittel","invested funds":"investierte Mittel",
    "total funds":"Gesamtmittel",
    "initial investment":"Erstinvestition","investment period":"Investitionszeitraum",
    "future value":"Endwert","earned return":"erzielter Ertrag",
    "average annual return":"durchschnittliche Jahresrendite",
    "portfolio":"Portfolio","passive income":"passives Einkommen",
    "principal repayment":"Kapitalr\xFCckzahlung",
    "interest payment":"Zinszahlung",
    "installment":"Rate","recurring payment":"Dauerauftrag",
    "due diligence":"Sorgfaltspr\xFCfung","risk assessment":"Risikobewertung",
    "risk scoring":"Risikobewertung","AML":"GwG",
    "compliance":"Compliance","regulated":"reguliert",
    "verification":"Verifizierung","KYC":"KYC",
    "referral bonus":"Empfehlungsbonus","loyalty bonus":"Treuebonus",
    "welcome bonus":"Willkommensbonus","investment reward":"Investitionspr\xE4mie",
    "invite friends":"Freunde einladen",
    "sign up":"registrieren","log in":"anmelden","register":"registrieren",
    "invest now":"jetzt investieren","start investing":"jetzt anlegen",
    "dashboard":"Dashboard","onboarding":"Kontoer\xF6ffnung",
    "collateral":"Sicherheit","mortgage":"Hypothek","savings":"Ersparnisse",
    "credit score":"Bonit\xE4tsbewertung","overdraft":"\xDCberziehung",
    "chargeback":"R\xFCckbuchung","settlement":"Abrechnung",
    "direct debit":"Lastschrift","exchange rate":"Wechselkurs",
    "payee":"Zahlungsempf\xE4nger","payer":"Zahler","beneficiary":"Beg\xFCnstigter",
    "equity":"Eigenkapital","liability":"Verbindlichkeit","asset":"Verm\xF6genswert",
    "dividend":"Dividende","spending limit":"Ausgabenlimit",
    "blockchain":"Blockchain","token":"Token","tokens":"Token",
    "stablecoin":"Stablecoin","stablecoins":"Stablecoins",
    "cryptocurrency":"Kryptow\xE4hrung","crypto":"Krypto",
    "crypto wallet":"Krypto-Wallet","wallet":"Wallet",
    "seed phrase":"Seed-Phrase","private key":"privater Schl\xFCssel",
    "public address":"\xF6ffentliche Adresse","smart contract":"Smart Contract",
    "network fees":"Netzwerkgeb\xFChren","gas fees":"Gas-Geb\xFChren",
    "custodial":"verwahrt","non-custodial":"nicht-verwahrt",
    "custodial wallet":"verwahrtes Wallet",
    "non-custodial wallet":"nicht-verwahrtes Wallet",
    "fiat":"Fiatgeld","pegged":"gebunden",
    "decentralized":"dezentralisiert","centralized":"zentralisiert",
    "capital provider":"Kapitalgeber",
    "repayment schedule":"Tilgungsplan",
    "leverage":"Hebelwirkung","diversification":"Diversifizierung",
    "yield":"Rendite","returns":"Ertr\xE4ge",
    "liquidity":"Liquidit\xE4t","protocol":"Protokoll",
    "staking":"Staking","airdrop":"Airdrop",
    "mining":"Mining","validator":"Validator",
    "consensus":"Konsens","bridge":"Bridge",
    "on-chain":"On-Chain","off-chain":"Off-Chain",
    "scam":"Betrug","phishing":"Phishing",
    "Learn & Earn":"Lernen und Verdienen",
    "start learning":"jetzt lernen",
    "checklist":"Checkliste","step-by-step":"Schritt f\xFCr Schritt",
    "beginner":"Anf\xE4nger","beginners":"Anf\xE4nger",
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","DEX":"DEX","CEX":"CEX","DApp":"DApp",
    "Layer 1":"Layer 1","Layer 2":"Layer 2",
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",
    "Evolution of the Web from 1.0 to 3.0":"Entwicklung des Webs von 1.0 bis 3.0",
    "Static read-only web pages":"Statische, schreibgesch\xFCtzte Webseiten",
    "Information-centric and interactive":"Informationszentriert und interaktiv",
    "User-centric, decentralized, private and secure":"Nutzerzentriert, dezentral, privat und sicher",
    "read-only":"schreibgesch\xFCtzt","user-centric":"nutzerzentriert"
  },
  pt: {
    "APR":"TAEG","Annual Percentage Rate":"Taxa Anual Efetiva Global",
    "interest rate":"taxa de juro","annual returns":"rendimento anual",
    "monthly payouts":"pagamentos mensais","monthly payments":"pagamentos mensais",
    "balance":"saldo","statement":"extrato","account":"conta",
    "deposit":"dep\xF3sito","withdrawal":"levantamento","wire transfer":"transfer\xEAncia banc\xE1ria",
    "transaction":"transa\xE7\xE3o","payment":"pagamento","invoice":"fatura",
    "fee":"comiss\xE3o","no hidden fees":"sem taxas ocultas",
    "P2P lending":"empr\xE9stimos P2P","crowdlending":"crowdlending",
    "crowdfunding":"financiamento coletivo","lending platform":"plataforma de empr\xE9stimos",
    "investment platform":"plataforma de investimento",
    "investor":"investidor","investors":"investidores",
    "borrower":"mutu\xE1rio","lender":"mutuante",
    "loan":"empr\xE9stimo","loan period":"prazo do empr\xE9stimo","loan term":"prazo do empr\xE9stimo",
    "loan originator":"originador de empr\xE9stimos",
    "funded":"financiado","repaid":"reembolsado",
    "default":"incumprimento","late loans":"empr\xE9stimos em atraso",
    "cash drag":"capital inativo",
    "primary market":"mercado prim\xE1rio","secondary market":"mercado secund\xE1rio",
    "total funded":"total financiado","total interest paid":"total de juros pagos",
    "available funds":"fundos dispon\xEDveis","invested funds":"fundos investidos",
    "total funds":"fundos totais",
    "initial investment":"investimento inicial","investment period":"per\xEDodo de investimento",
    "future value":"valor futuro","earned return":"rendimento obtido",
    "average annual return":"rendimento anual m\xE9dio",
    "portfolio":"carteira","passive income":"rendimento passivo",
    "principal repayment":"reembolso do capital",
    "interest payment":"pagamento de juros",
    "installment":"presta\xE7\xE3o","recurring payment":"pagamento recorrente",
    "due diligence":"auditoria pr\xE9via","risk assessment":"avalia\xE7\xE3o de risco",
    "risk scoring":"pontua\xE7\xE3o de risco","AML":"ABC",
    "compliance":"conformidade regulamentar","regulated":"regulamentado",
    "verification":"verifica\xE7\xE3o","KYC":"KYC",
    "referral bonus":"b\xF3nus de refer\xEAncia","loyalty bonus":"b\xF3nus de fidelidade",
    "welcome bonus":"b\xF3nus de boas-vindas","investment reward":"recompensa de investimento",
    "invite friends":"convidar amigos",
    "sign up":"registar","log in":"iniciar sess\xE3o","register":"registar",
    "invest now":"investir agora","start investing":"come\xE7ar a investir",
    "dashboard":"painel de controlo","onboarding":"registo de cliente",
    "collateral":"garantia","mortgage":"hipoteca","savings":"poupan\xE7as",
    "credit score":"pontua\xE7\xE3o de cr\xE9dito","overdraft":"descoberto",
    "chargeback":"estorno","settlement":"liquida\xE7\xE3o",
    "direct debit":"d\xE9bito direto","exchange rate":"taxa de c\xE2mbio",
    "payee":"benefici\xE1rio","payer":"pagador","beneficiary":"benefici\xE1rio",
    "equity":"capital pr\xF3prio","liability":"passivo","asset":"ativo",
    "dividend":"dividendo","spending limit":"limite de gastos",
    "blockchain":"blockchain","token":"token","tokens":"tokens",
    "stablecoin":"stablecoin","stablecoins":"stablecoins",
    "cryptocurrency":"criptomoeda","crypto":"cripto",
    "crypto wallet":"carteira cripto","wallet":"carteira",
    "seed phrase":"frase-semente","private key":"chave privada",
    "public address":"endere\xE7o p\xFAblico","smart contract":"contrato inteligente",
    "network fees":"taxas de rede","gas fees":"taxas de gas",
    "custodial":"custodial","non-custodial":"n\xE3o custodial",
    "custodial wallet":"carteira custodial",
    "non-custodial wallet":"carteira n\xE3o custodial",
    "fiat":"moeda fiduci\xE1ria","pegged":"indexado",
    "decentralized":"descentralizado","centralized":"centralizado",
    "capital provider":"provedor de capital",
    "repayment schedule":"calend\xE1rio de reembolso",
    "leverage":"alavancagem","diversification":"diversifica\xE7\xE3o",
    "yield":"rendimento","returns":"rendimentos",
    "liquidity":"liquidez","protocol":"protocolo",
    "staking":"staking","airdrop":"airdrop",
    "mining":"minera\xE7\xE3o","validator":"validador",
    "consensus":"consenso","bridge":"ponte",
    "on-chain":"on-chain","off-chain":"off-chain",
    "scam":"fraude","phishing":"phishing",
    "Learn & Earn":"Aprender e Ganhar",
    "start learning":"come\xE7ar a aprender",
    "checklist":"lista de verifica\xE7\xE3o","step-by-step":"passo a passo",
    "beginner":"iniciante","beginners":"iniciantes",
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","DEX":"DEX","CEX":"CEX","DApp":"DApp",
    "Layer 1":"Layer 1","Layer 2":"Layer 2",
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",
    "Evolution of the Web from 1.0 to 3.0":"Evolu\xE7\xE3o da Web de 1.0 a 3.0",
    "Static read-only web pages":"P\xE1ginas web est\xE1ticas somente leitura",
    "Information-centric and interactive":"Centrada na informa\xE7\xE3o e interativa",
    "User-centric, decentralized, private and secure":"Centrada no usu\xE1rio, descentralizada, privada e segura",
    "read-only":"somente leitura","user-centric":"centrada no usu\xE1rio"
  },
  pl: {
    "APR":"RRSO","Annual Percentage Rate":"Roczna Rzeczywista Stopa Oprocentowania",
    "interest rate":"oprocentowanie","annual returns":"roczne zwroty",
    "monthly payouts":"miesi\u0119czne wyp\u0142aty","monthly payments":"miesi\u0119czne p\u0142atno\u015Bci",
    "balance":"saldo","statement":"wyci\u0105g","account":"konto",
    "deposit":"wp\u0142ata","withdrawal":"wyp\u0142ata","wire transfer":"przelew bankowy",
    "transaction":"transakcja","payment":"p\u0142atno\u015B\u0107","invoice":"faktura",
    "fee":"op\u0142ata","no hidden fees":"bez ukrytych op\u0142at",
    "P2P lending":"po\u017Cyczki P2P","crowdlending":"crowdlending",
    "crowdfunding":"crowdfunding","lending platform":"platforma po\u017Cyczkowa",
    "investment platform":"platforma inwestycyjna",
    "investor":"inwestor","investors":"inwestorzy",
    "borrower":"po\u017Cyczkobiorca","lender":"po\u017Cyczkodawca",
    "loan":"po\u017Cyczka","loan period":"okres po\u017Cyczki","loan term":"okres po\u017Cyczki",
    "loan originator":"inicjator po\u017Cyczek",
    "funded":"sfinansowany","repaid":"sp\u0142acony",
    "default":"niewyp\u0142acalno\u015B\u0107","late loans":"po\u017Cyczki z op\xF3\u017Anieniem",
    "cash drag":"nieaktywny kapita\u0142",
    "primary market":"rynek pierwotny","secondary market":"rynek wt\xF3rny",
    "total funded":"\u0142\u0105cznie sfinansowano","total interest paid":"\u0142\u0105cznie zap\u0142acone odsetki",
    "available funds":"dost\u0119pne \u015Brodki","invested funds":"zainwestowane \u015Brodki",
    "total funds":"\u0142\u0105czne \u015Brodki",
    "initial investment":"inwestycja pocz\u0105tkowa","investment period":"okres inwestycji",
    "future value":"warto\u015B\u0107 przysz\u0142a","earned return":"uzyskany zwrot",
    "average annual return":"\u015Bredni roczny zwrot",
    "portfolio":"portfel","passive income":"doch\xF3d pasywny",
    "principal repayment":"sp\u0142ata kapita\u0142u",
    "interest payment":"sp\u0142ata odsetek",
    "installment":"rata","recurring payment":"p\u0142atno\u015B\u0107 cykliczna",
    "due diligence":"due diligence","risk assessment":"ocena ryzyka",
    "risk scoring":"scoring ryzyka","AML":"AML",
    "compliance":"zgodno\u015B\u0107 regulacyjna","regulated":"regulowany",
    "verification":"weryfikacja","KYC":"KYC",
    "referral bonus":"bonus polecaj\u0105cy","loyalty bonus":"bonus lojalno\u015Bciowy",
    "welcome bonus":"bonus powitalny","investment reward":"nagroda inwestycyjna",
    "invite friends":"zapro\u015B znajomych",
    "sign up":"zarejestruj si\u0119","log in":"zaloguj si\u0119","register":"zarejestruj si\u0119",
    "invest now":"zainwestuj teraz","start investing":"zacznij inwestowa\u0107",
    "dashboard":"panel","onboarding":"onboarding klienta",
    "collateral":"zabezpieczenie","mortgage":"hipoteka","savings":"oszcz\u0119dno\u015Bci",
    "credit score":"ocena kredytowa","overdraft":"debet",
    "chargeback":"chargeback","settlement":"rozliczenie",
    "direct debit":"polecenie zap\u0142aty","exchange rate":"kurs wymiany",
    "payee":"odbiorca p\u0142atno\u015Bci","payer":"p\u0142atnik","beneficiary":"beneficjent",
    "equity":"kapita\u0142 w\u0142asny","liability":"zobowi\u0105zanie","asset":"aktywa",
    "dividend":"dywidenda","spending limit":"limit wydatk\xF3w",
    "blockchain":"blockchain","token":"token","tokens":"tokeny",
    "stablecoin":"stablecoin","stablecoins":"stablecoiny",
    "cryptocurrency":"kryptowaluta","crypto":"krypto",
    "crypto wallet":"portfel krypto","wallet":"portfel",
    "seed phrase":"fraza seed","private key":"klucz prywatny",
    "public address":"adres publiczny","smart contract":"smart kontrakt",
    "network fees":"op\u0142aty sieciowe","gas fees":"op\u0142aty gas",
    "custodial":"powierniczy","non-custodial":"niepowierniczy",
    "custodial wallet":"portfel powierniczy",
    "non-custodial wallet":"portfel niepowierniczy",
    "fiat":"waluta fiducjarna","pegged":"powi\u0105zany",
    "decentralized":"zdecentralizowany","centralized":"scentralizowany",
    "capital provider":"dostawca kapita\u0142u",
    "repayment schedule":"harmonogram sp\u0142at",
    "leverage":"d\u017Awignia","diversification":"dywersyfikacja",
    "yield":"rentowno\u015B\u0107","returns":"zwroty",
    "liquidity":"p\u0142ynno\u015B\u0107","protocol":"protok\xF3\u0142",
    "staking":"staking","airdrop":"airdrop",
    "mining":"mining","validator":"walidator",
    "consensus":"konsensus","bridge":"most",
    "on-chain":"on-chain","off-chain":"off-chain",
    "scam":"oszustwo","phishing":"phishing",
    "Learn & Earn":"Ucz si\u0119 i zarabiaj",
    "start learning":"zacznij nauk\u0119",
    "checklist":"lista kontrolna","step-by-step":"krok po kroku",
    "beginner":"pocz\u0105tkuj\u0105cy","beginners":"pocz\u0105tkuj\u0105cy",
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","DEX":"DEX","CEX":"CEX","DApp":"DApp",
    "Layer 1":"Layer 1","Layer 2":"Layer 2",
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",
    "Evolution of the Web from 1.0 to 3.0":"Ewolucja sieci od 1.0 do 3.0",
    "Static read-only web pages":"Statyczne strony tylko do odczytu",
    "Information-centric and interactive":"Skoncentrowana na informacji i interaktywna",
    "User-centric, decentralized, private and secure":"Skoncentrowana na u\u017Cytkowniku, zdecentralizowana, prywatna i bezpieczna",
    "read-only":"tylko do odczytu","user-centric":"skoncentrowana na u\u017Cytkowniku",
    "private and secure":"prywatna i bezpieczna"
  },
  el: {
    "APR":"\u0395\u03A4\u0395","Annual Percentage Rate":"\u0395\u03C4\u03AE\u03C3\u03B9\u03BF \u03A0\u03BF\u03C3\u03BF\u03C3\u03C4\u03CC \u039A\u03CC\u03C3\u03C4\u03BF\u03C5\u03C2",
    "interest rate":"\u03B5\u03C0\u03B9\u03C4\u03CC\u03BA\u03B9\u03BF","annual returns":"\u03B5\u03C4\u03AE\u03C3\u03B9\u03B5\u03C2 \u03B1\u03C0\u03BF\u03B4\u03CC\u03C3\u03B5\u03B9\u03C2",
    "monthly payouts":"\u03BC\u03B7\u03BD\u03B9\u03B1\u03AF\u03B5\u03C2 \u03C0\u03BB\u03B7\u03C1\u03C9\u03BC\u03AD\u03C2","monthly payments":"\u03BC\u03B7\u03BD\u03B9\u03B1\u03AF\u03B5\u03C2 \u03C0\u03BB\u03B7\u03C1\u03C9\u03BC\u03AD\u03C2",
    "balance":"\u03C5\u03C0\u03CC\u03BB\u03BF\u03B9\u03C0\u03BF","statement":"\u03BA\u03B1\u03C4\u03AC\u03C3\u03C4\u03B1\u03C3\u03B7 \u03BB\u03BF\u03B3\u03B1\u03C1\u03B9\u03B1\u03C3\u03BC\u03BF\u03CD","account":"\u03BB\u03BF\u03B3\u03B1\u03C1\u03B9\u03B1\u03C3\u03BC\u03CC\u03C2",
    "deposit":"\u03BA\u03B1\u03C4\u03AC\u03B8\u03B5\u03C3\u03B7","withdrawal":"\u03B1\u03BD\u03AC\u03BB\u03B7\u03C8\u03B7","wire transfer":"\u03C4\u03C1\u03B1\u03C0\u03B5\u03B6\u03B9\u03BA\u03AE \u03BC\u03B5\u03C4\u03B1\u03C6\u03BF\u03C1\u03AC",
    "transaction":"\u03C3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE","payment":"\u03C0\u03BB\u03B7\u03C1\u03C9\u03BC\u03AE","invoice":"\u03C4\u03B9\u03BC\u03BF\u03BB\u03CC\u03B3\u03B9\u03BF",
    "fee":"\u03C0\u03C1\u03BF\u03BC\u03AE\u03B8\u03B5\u03B9\u03B1","no hidden fees":"\u03C7\u03C9\u03C1\u03AF\u03C2 \u03BA\u03C1\u03C5\u03C6\u03AD\u03C2 \u03C7\u03C1\u03B5\u03CE\u03C3\u03B5\u03B9\u03C2",
    "P2P lending":"\u03B4\u03B1\u03BD\u03B5\u03B9\u03C3\u03BC\u03CC\u03C2 P2P","crowdlending":"crowdlending",
    "crowdfunding":"crowdfunding","lending platform":"\u03C0\u03BB\u03B1\u03C4\u03C6\u03CC\u03C1\u03BC\u03B1 \u03B4\u03B1\u03BD\u03B5\u03B9\u03C3\u03BC\u03BF\u03CD",
    "investment platform":"\u03C0\u03BB\u03B1\u03C4\u03C6\u03CC\u03C1\u03BC\u03B1 \u03B5\u03C0\u03B5\u03BD\u03B4\u03CD\u03C3\u03B5\u03C9\u03BD",
    "investor":"\u03B5\u03C0\u03B5\u03BD\u03B4\u03C5\u03C4\u03AE\u03C2","investors":"\u03B5\u03C0\u03B5\u03BD\u03B4\u03C5\u03C4\u03AD\u03C2",
    "borrower":"\u03B4\u03B1\u03BD\u03B5\u03B9\u03BF\u03BB\u03AE\u03C0\u03C4\u03B7\u03C2","lender":"\u03B4\u03B1\u03BD\u03B5\u03B9\u03C3\u03C4\u03AE\u03C2",
    "loan":"\u03B4\u03AC\u03BD\u03B5\u03B9\u03BF","loan period":"\u03B4\u03B9\u03AC\u03C1\u03BA\u03B5\u03B9\u03B1 \u03B4\u03B1\u03BD\u03B5\u03AF\u03BF\u03C5","loan term":"\u03B4\u03B9\u03AC\u03C1\u03BA\u03B5\u03B9\u03B1 \u03B4\u03B1\u03BD\u03B5\u03AF\u03BF\u03C5",
    "loan originator":"\u03B5\u03BA\u03B4\u03CC\u03C4\u03B7\u03C2 \u03B4\u03B1\u03BD\u03B5\u03AF\u03C9\u03BD",
    "funded":"\u03C7\u03C1\u03B7\u03BC\u03B1\u03C4\u03BF\u03B4\u03BF\u03C4\u03B7\u03BC\u03AD\u03BD\u03BF","repaid":"\u03B1\u03C0\u03BF\u03C0\u03BB\u03B7\u03C1\u03C9\u03BC\u03AD\u03BD\u03BF",
    "default":"\u03BA\u03B1\u03B8\u03C5\u03C3\u03C4\u03AD\u03C1\u03B7\u03C3\u03B7 \u03C0\u03BB\u03B7\u03C1\u03C9\u03BC\u03AE\u03C2","late loans":"\u03B5\u03C0\u03B9\u03B2\u03B1\u03C1\u03C5\u03BC\u03AD\u03BD\u03B1 \u03B4\u03AC\u03BD\u03B5\u03B9\u03B1",
    "cash drag":"\u03B1\u03B4\u03C1\u03B1\u03BD\u03AD\u03C2 \u03BA\u03B5\u03C6\u03AC\u03BB\u03B1\u03B9\u03BF",
    "primary market":"\u03C0\u03C1\u03C9\u03C4\u03BF\u03B3\u03B5\u03BD\u03AE\u03C2 \u03B1\u03B3\u03BF\u03C1\u03AC","secondary market":"\u03B4\u03B5\u03C5\u03C4\u03B5\u03C1\u03BF\u03B3\u03B5\u03BD\u03AE\u03C2 \u03B1\u03B3\u03BF\u03C1\u03AC",
    "total funded":"\u03C3\u03C5\u03BD\u03BF\u03BB\u03B9\u03BA\u03AE \u03C7\u03C1\u03B7\u03BC\u03B1\u03C4\u03BF\u03B4\u03CC\u03C4\u03B7\u03C3\u03B7","total interest paid":"\u03C3\u03C5\u03BD\u03BF\u03BB\u03B9\u03BA\u03BF\u03AF \u03C4\u03CC\u03BA\u03BF\u03B9",
    "available funds":"\u03B4\u03B9\u03B1\u03B8\u03AD\u03C3\u03B9\u03BC\u03B1 \u03BA\u03B5\u03C6\u03AC\u03BB\u03B1\u03B9\u03B1","invested funds":"\u03B5\u03C0\u03B5\u03BD\u03B4\u03C5\u03BC\u03AD\u03BD\u03B1 \u03BA\u03B5\u03C6\u03AC\u03BB\u03B1\u03B9\u03B1",
    "total funds":"\u03C3\u03C5\u03BD\u03BF\u03BB\u03B9\u03BA\u03AC \u03BA\u03B5\u03C6\u03AC\u03BB\u03B1\u03B9\u03B1",
    "initial investment":"\u03B1\u03C1\u03C7\u03B9\u03BA\u03AE \u03B5\u03C0\u03AD\u03BD\u03B4\u03C5\u03C3\u03B7","investment period":"\u03C0\u03B5\u03C1\u03AF\u03BF\u03B4\u03BF\u03C2 \u03B5\u03C0\u03AD\u03BD\u03B4\u03C5\u03C3\u03B7\u03C2",
    "future value":"\u03BC\u03B5\u03BB\u03BB\u03BF\u03BD\u03C4\u03B9\u03BA\u03AE \u03B1\u03BE\u03AF\u03B1","earned return":"\u03B1\u03C0\u03BF\u03BA\u03C4\u03B7\u03B8\u03B5\u03AF\u03C3\u03B1 \u03B1\u03C0\u03CC\u03B4\u03BF\u03C3\u03B7",
    "average annual return":"\u03BC\u03AD\u03C3\u03B7 \u03B5\u03C4\u03AE\u03C3\u03B9\u03B1 \u03B1\u03C0\u03CC\u03B4\u03BF\u03C3\u03B7",
    "portfolio":"\u03C7\u03B1\u03C1\u03C4\u03BF\u03C6\u03C5\u03BB\u03AC\u03BA\u03B9\u03BF","passive income":"\u03C0\u03B1\u03B8\u03B7\u03C4\u03B9\u03BA\u03CC \u03B5\u03B9\u03C3\u03CC\u03B4\u03B7\u03BC\u03B1",
    "principal repayment":"\u03B1\u03C0\u03BF\u03C0\u03BB\u03B7\u03C1\u03C9\u03BC\u03AE \u03BA\u03B5\u03C6\u03B1\u03BB\u03B1\u03AF\u03BF\u03C5",
    "interest payment":"\u03C0\u03BB\u03B7\u03C1\u03C9\u03BC\u03AE \u03C4\u03CC\u03BA\u03C9\u03BD",
    "installment":"\u03B4\u03CC\u03C3\u03B7","recurring payment":"\u03B5\u03C0\u03B1\u03BD\u03B1\u03BB\u03B1\u03BC\u03B2\u03B1\u03BD\u03CC\u03BC\u03B5\u03BD\u03B7 \u03C0\u03BB\u03B7\u03C1\u03C9\u03BC\u03AE",
    "due diligence":"due diligence","risk assessment":"\u03B1\u03BE\u03B9\u03BF\u03BB\u03CC\u03B3\u03B7\u03C3\u03B7 \u03BA\u03B9\u03BD\u03B4\u03CD\u03BD\u03BF\u03C5",
    "risk scoring":"\u03B2\u03B1\u03B8\u03BC\u03BF\u03BB\u03CC\u03B3\u03B7\u03C3\u03B7 \u03BA\u03B9\u03BD\u03B4\u03CD\u03BD\u03BF\u03C5","AML":"AML",
    "compliance":"\u03C3\u03C5\u03BC\u03BC\u03CC\u03C1\u03C6\u03C9\u03C3\u03B7","regulated":"\u03C1\u03C5\u03B8\u03BC\u03B9\u03B6\u03CC\u03BC\u03B5\u03BD\u03BF",
    "verification":"\u03B5\u03C0\u03B1\u03BB\u03AE\u03B8\u03B5\u03C5\u03C3\u03B7","KYC":"KYC",
    "referral bonus":"\u03BC\u03C0\u03CC\u03BD\u03BF\u03C5\u03C2 \u03C0\u03B1\u03C1\u03B1\u03C0\u03BF\u03BC\u03C0\u03AE\u03C2","loyalty bonus":"\u03BC\u03C0\u03CC\u03BD\u03BF\u03C5\u03C2 \u03C0\u03B9\u03C3\u03C4\u03CC\u03C4\u03B7\u03C4\u03B1\u03C2",
    "welcome bonus":"\u03BC\u03C0\u03CC\u03BD\u03BF\u03C5\u03C2 \u03BA\u03B1\u03BB\u03C9\u03C3\u03BF\u03C1\u03AF\u03C3\u03BC\u03B1\u03C4\u03BF\u03C2","investment reward":"\u03B1\u03BD\u03C4\u03B1\u03BC\u03BF\u03B9\u03B2\u03AE \u03B5\u03C0\u03AD\u03BD\u03B4\u03C5\u03C3\u03B7\u03C2",
    "invite friends":"\u03C0\u03C1\u03BF\u03C3\u03BA\u03B1\u03BB\u03AD\u03C3\u03C4\u03B5 \u03C6\u03AF\u03BB\u03BF\u03C5\u03C2",
    "sign up":"\u03B5\u03B3\u03B3\u03C1\u03B1\u03C6\u03AE","log in":"\u03C3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7","register":"\u03B5\u03B3\u03B3\u03C1\u03B1\u03C6\u03AE",
    "invest now":"\u03B5\u03C0\u03B5\u03BD\u03B4\u03CD\u03C3\u03C4\u03B5 \u03C4\u03CE\u03C1\u03B1","start investing":"\u03BE\u03B5\u03BA\u03B9\u03BD\u03AE\u03C3\u03C4\u03B5 \u03BD\u03B1 \u03B5\u03C0\u03B5\u03BD\u03B4\u03CD\u03B5\u03C4\u03B5",
    "dashboard":"\u03C0\u03AF\u03BD\u03B1\u03BA\u03B1\u03C2 \u03B5\u03BB\u03AD\u03B3\u03C7\u03BF\u03C5","onboarding":"\u03B5\u03B3\u03B3\u03C1\u03B1\u03C6\u03AE \u03C0\u03B5\u03BB\u03AC\u03C4\u03B7",
    "collateral":"\u03B5\u03BE\u03B1\u03C3\u03C6\u03AC\u03BB\u03B9\u03C3\u03B7","mortgage":"\u03C5\u03C0\u03BF\u03B8\u03AE\u03BA\u03B7","savings":"\u03B1\u03C0\u03BF\u03C4\u03B1\u03BC\u03B9\u03B5\u03CD\u03C3\u03B5\u03B9\u03C2",
    "credit score":"\u03C0\u03B9\u03C3\u03C4\u03BF\u03BB\u03B7\u03C0\u03C4\u03B9\u03BA\u03AE \u03B9\u03BA\u03B1\u03BD\u03CC\u03C4\u03B7\u03C4\u03B1","overdraft":"\u03C5\u03C0\u03B5\u03C1\u03B1\u03BD\u03AC\u03BB\u03B7\u03C8\u03B7",
    "chargeback":"\u03B1\u03BD\u03C4\u03B9\u03BB\u03BF\u03B3\u03B9\u03C3\u03BC\u03CC\u03C2","settlement":"\u03B4\u03B9\u03B1\u03BA\u03B1\u03BD\u03BF\u03BD\u03B9\u03C3\u03BC\u03CC\u03C2",
    "direct debit":"\u03AC\u03BC\u03B5\u03C3\u03B7 \u03C7\u03C1\u03AD\u03C9\u03C3\u03B7","exchange rate":"\u03B9\u03C3\u03BF\u03C4\u03B9\u03BC\u03AF\u03B1",
    "payee":"\u03B4\u03B9\u03BA\u03B1\u03B9\u03BF\u03CD\u03C7\u03BF\u03C2","payer":"\u03C0\u03BB\u03B7\u03C1\u03C9\u03C4\u03AE\u03C2","beneficiary":"\u03B4\u03B9\u03BA\u03B1\u03B9\u03BF\u03CD\u03C7\u03BF\u03C2",
    "equity":"\u03AF\u03B4\u03B9\u03B1 \u03BA\u03B5\u03C6\u03AC\u03BB\u03B1\u03B9\u03B1","liability":"\u03C5\u03C0\u03BF\u03C7\u03C1\u03AD\u03C9\u03C3\u03B7","asset":"\u03B5\u03BD\u03B5\u03C1\u03B3\u03B7\u03C4\u03B9\u03BA\u03CC",
    "dividend":"\u03BC\u03AD\u03C1\u03B9\u03C3\u03BC\u03B1","spending limit":"\u03CC\u03C1\u03B9\u03BF \u03B4\u03B1\u03C0\u03B1\u03BD\u03CE\u03BD",
    "blockchain":"blockchain","token":"token","tokens":"tokens",
    "stablecoin":"stablecoin","stablecoins":"stablecoins",
    "cryptocurrency":"\u03BA\u03C1\u03C5\u03C0\u03C4\u03BF\u03BD\u03CC\u03BC\u03B9\u03C3\u03BC\u03B1","crypto":"\u03BA\u03C1\u03CD\u03C0\u03C4\u03BF",
    "crypto wallet":"\u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9 \u03BA\u03C1\u03CD\u03C0\u03C4\u03BF","wallet":"\u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9",
    "seed phrase":"\u03C6\u03C1\u03AC\u03C3\u03B7 seed","private key":"\u03B9\u03B4\u03B9\u03C9\u03C4\u03B9\u03BA\u03CC \u03BA\u03BB\u03B5\u03B9\u03B4\u03AF",
    "public address":"\u03B4\u03B7\u03BC\u03CC\u03C3\u03B9\u03B1 \u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7","smart contract":"\u03AD\u03BE\u03C5\u03C0\u03BD\u03BF \u03C3\u03C5\u03BC\u03B2\u03CC\u03BB\u03B1\u03B9\u03BF",
    "network fees":"\u03B4\u03B9\u03BA\u03C4\u03C5\u03B1\u03BA\u03AD\u03C2 \u03C7\u03C1\u03B5\u03CE\u03C3\u03B5\u03B9\u03C2","gas fees":"\u03C7\u03C1\u03B5\u03CE\u03C3\u03B5\u03B9\u03C2 gas",
    "custodial":"\u03B8\u03B5\u03BC\u03B1\u03C4\u03BF\u03C6\u03C5\u03BB\u03B1\u03BA\u03AE","non-custodial":"\u03BC\u03B7 \u03B8\u03B5\u03BC\u03B1\u03C4\u03BF\u03C6\u03C5\u03BB\u03B1\u03BA\u03AE",
    "custodial wallet":"\u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9 \u03B8\u03B5\u03BC\u03B1\u03C4\u03BF\u03C6\u03C5\u03BB\u03B1\u03BA\u03AE\u03C2",
    "non-custodial wallet":"\u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03CC\u03BB\u03B9 \u03B1\u03C5\u03C4\u03BF\u03B4\u03B9\u03B1\u03C7\u03B5\u03AF\u03C1\u03B9\u03C3\u03B7\u03C2",
    "fiat":"\u03BD\u03BF\u03BC\u03B9\u03C3\u03BC\u03B1\u03C4\u03B9\u03BA\u03CC \u03BD\u03CC\u03BC\u03B9\u03C3\u03BC\u03B1","pegged":"\u03C3\u03C5\u03BD\u03B4\u03B5\u03B4\u03B5\u03BC\u03AD\u03BD\u03BF",
    "decentralized":"\u03B1\u03C0\u03BF\u03BA\u03B5\u03BD\u03C4\u03C1\u03C9\u03BC\u03AD\u03BD\u03BF","centralized":"\u03BA\u03B5\u03BD\u03C4\u03C1\u03B9\u03BA\u03CC",
    "capital provider":"\u03C0\u03AC\u03C1\u03BF\u03C7\u03BF\u03C2 \u03BA\u03B5\u03C6\u03B1\u03BB\u03B1\u03AF\u03BF\u03C5",
    "repayment schedule":"\u03C0\u03C1\u03CC\u03B3\u03C1\u03B1\u03BC\u03BC\u03B1 \u03B1\u03C0\u03BF\u03C0\u03BB\u03B7\u03C1\u03C9\u03BC\u03AE\u03C2",
    "leverage":"\u03BC\u03CC\u03C7\u03BB\u03B5\u03C5\u03C3\u03B7","diversification":"\u03B4\u03B9\u03B1\u03C3\u03C0\u03BF\u03C1\u03AC",
    "yield":"\u03B1\u03C0\u03CC\u03B4\u03BF\u03C3\u03B7","returns":"\u03B1\u03C0\u03BF\u03B4\u03CC\u03C3\u03B5\u03B9\u03C2",
    "liquidity":"\u03C1\u03B5\u03C5\u03C3\u03C4\u03CC\u03C4\u03B7\u03C4\u03B1","protocol":"\u03C0\u03C1\u03C9\u03C4\u03CC\u03BA\u03BF\u03BB\u03BB\u03BF",
    "staking":"staking","airdrop":"airdrop",
    "mining":"mining","validator":"\u03B5\u03C0\u03B9\u03BA\u03C5\u03C1\u03C9\u03C4\u03AE\u03C2",
    "consensus":"\u03C3\u03C5\u03BD\u03B1\u03AF\u03BD\u03B5\u03C3\u03B7","bridge":"\u03B3\u03AD\u03C6\u03C5\u03C1\u03B1",
    "on-chain":"on-chain","off-chain":"off-chain",
    "scam":"\u03B1\u03C0\u03AC\u03C4\u03B7","phishing":"phishing",
    "Learn & Earn":"\u039C\u03AC\u03B8\u03B5 \u03BA\u03B1\u03B9 \u03BA\u03AD\u03C1\u03B4\u03B9\u03C3\u03B5",
    "start learning":"\u03BE\u03B5\u03BA\u03B9\u03BD\u03AE\u03C3\u03C4\u03B5 \u03C4\u03B7 \u03BC\u03AC\u03B8\u03B7\u03C3\u03B7",
    "checklist":"\u03BB\u03AF\u03C3\u03C4\u03B1 \u03B5\u03BB\u03AD\u03B3\u03C7\u03BF\u03C5","step-by-step":"\u03B2\u03AE\u03BC\u03B1 \u03C0\u03C1\u03BF\u03C2 \u03B2\u03AE\u03BC\u03B1",
    "beginner":"\u03B1\u03C1\u03C7\u03AC\u03C1\u03B9\u03BF\u03C2","beginners":"\u03B1\u03C1\u03C7\u03AC\u03C1\u03B9\u03BF\u03B9",
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","DEX":"DEX","CEX":"CEX","DApp":"DApp",
    "Layer 1":"Layer 1","Layer 2":"Layer 2",
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",
    "Evolution of the Web from 1.0 to 3.0":"\u0395\u03BE\u03AD\u03BB\u03B9\u03BE\u03B7 \u03C4\u03BF\u03C5 \u0394\u03B9\u03B1\u03B4\u03B9\u03BA\u03C4\u03CD\u03BF\u03C5 \u03B1\u03C0\u03CC 1.0 \u03C3\u03B5 3.0",
    "Static read-only web pages":"\u03A3\u03C4\u03B1\u03C4\u03B9\u03BA\u03AD\u03C2 \u03C3\u03B5\u03BB\u03AF\u03B4\u03B5\u03C2 \u03BC\u03CC\u03BD\u03BF \u03B3\u03B9\u03B1 \u03B1\u03BD\u03AC\u03B3\u03BD\u03C9\u03C3\u03B7",
    "Information-centric and interactive":"\u0395\u03C3\u03C4\u03B9\u03B1\u03C3\u03BC\u03AD\u03BD\u03B7 \u03C3\u03C4\u03B7\u03BD \u03C0\u03BB\u03B7\u03C1\u03BF\u03C6\u03BF\u03C1\u03AF\u03B1 \u03BA\u03B1\u03B9 \u03B4\u03B9\u03B1\u03B4\u03C1\u03B1\u03C3\u03C4\u03B9\u03BA\u03AE",
    "User-centric, decentralized, private and secure":"\u0395\u03C3\u03C4\u03B9\u03B1\u03C3\u03BC\u03AD\u03BD\u03B7 \u03C3\u03C4\u03BF\u03BD \u03C7\u03C1\u03AE\u03C3\u03C4\u03B7, \u03B1\u03C0\u03BF\u03BA\u03B5\u03BD\u03C4\u03C1\u03C9\u03BC\u03AD\u03BD\u03B7, \u03B9\u03B4\u03B9\u03C9\u03C4\u03B9\u03BA\u03AE \u03BA\u03B1\u03B9 \u03B1\u03C3\u03C6\u03B1\u03BB\u03AE\u03C2",
    "read-only":"\u03BC\u03CC\u03BD\u03BF \u03B3\u03B9\u03B1 \u03B1\u03BD\u03AC\u03B3\u03BD\u03C9\u03C3\u03B7","user-centric":"\u03B5\u03C3\u03C4\u03B9\u03B1\u03C3\u03BC\u03AD\u03BD\u03B7 \u03C3\u03C4\u03BF\u03BD \u03C7\u03C1\u03AE\u03C3\u03C4\u03B7",
    "private and secure":"\u03B9\u03B4\u03B9\u03C9\u03C4\u03B9\u03BA\u03AE \u03BA\u03B1\u03B9 \u03B1\u03C3\u03C6\u03B1\u03BB\u03AE\u03C2"
  },
  tr: {
    "APR":"YBO","Annual Percentage Rate":"Y\u0131ll\u0131k Bazda Oran",
    "interest rate":"faiz oran\u0131","annual returns":"y\u0131ll\u0131k getiriler",
    "monthly payouts":"ayl\u0131k \xF6demeler","monthly payments":"ayl\u0131k \xF6demeler",
    "balance":"bakiye","statement":"hesap \xF6zeti","account":"hesap",
    "deposit":"para yat\u0131rma","withdrawal":"para \xE7ekme","wire transfer":"havale",
    "transaction":"i\u015Flem","payment":"\xF6deme","invoice":"fatura",
    "fee":"\xFCcret","no hidden fees":"gizli \xFCcret yok",
    "P2P lending":"P2P kredi","crowdlending":"kitlesel kredilendirme",
    "crowdfunding":"kitlesel fonlama","lending platform":"kredi platformu",
    "investment platform":"yat\u0131r\u0131m platformu",
    "investor":"yat\u0131r\u0131mc\u0131","investors":"yat\u0131r\u0131mc\u0131lar",
    "borrower":"bor\xE7lu","lender":"kredi veren",
    "loan":"kredi","loan period":"kredi s\xFCresi","loan term":"kredi vadesi",
    "loan originator":"kredi sa\u011Flay\u0131c\u0131",
    "funded":"fonland\u0131","repaid":"geri \xF6dendi",
    "default":"temerr\xFCt","late loans":"geciken krediler",
    "cash drag":"at\u0131l nakit",
    "primary market":"birincil piyasa","secondary market":"ikincil piyasa",
    "total funded":"toplam fonlanan","total interest paid":"\xF6denen toplam faiz",
    "available funds":"kullan\u0131labilir fonlar","invested funds":"yat\u0131r\u0131lan fonlar",
    "total funds":"toplam fonlar",
    "initial investment":"ba\u015Flang\u0131\xE7 yat\u0131r\u0131m\u0131","investment period":"yat\u0131r\u0131m d\xF6nemi",
    "future value":"gelecek de\u011Fer","earned return":"kazan\u0131lan getiri",
    "average annual return":"ortalama y\u0131ll\u0131k getiri",
    "portfolio":"portf\xF6y","passive income":"pasif gelir",
    "principal repayment":"anapara geri \xF6demesi",
    "interest payment":"faiz \xF6demesi",
    "installment":"taksit","recurring payment":"tekrarlayan \xF6deme",
    "due diligence":"durum tespiti","risk assessment":"risk de\u011Ferlendirmesi",
    "risk scoring":"risk puanlamas\u0131","AML":"AML",
    "compliance":"mevzuata uyum","regulated":"d\xFCzenlemeye tabi",
    "verification":"do\u011Frulama","KYC":"KYC",
    "referral bonus":"davet bonusu","loyalty bonus":"sadakat bonusu",
    "welcome bonus":"ho\u015F geldin bonusu","investment reward":"yat\u0131r\u0131m \xF6d\xFCl\xFC",
    "invite friends":"arkada\u015Flar\u0131n\u0131 davet et",
    "sign up":"kaydol","log in":"giri\u015F yap","register":"kaydol",
    "invest now":"\u015Fimdi yat\u0131r\u0131m yap","start investing":"yat\u0131r\u0131ma ba\u015Fla",
    "dashboard":"kontrol paneli","onboarding":"m\xFC\u015Fteri kayd\u0131",
    "collateral":"teminat","mortgage":"ipotek","savings":"birikimler",
    "credit score":"kredi notu","overdraft":"ek hesap",
    "chargeback":"\xF6deme iadesi","settlement":"mutabakat",
    "direct debit":"otomatik \xF6deme","exchange rate":"d\xF6viz kuru",
    "payee":"alacakl\u0131","payer":"\xF6deyen","beneficiary":"lehtar",
    "equity":"\xF6zkaynak","liability":"y\xFCk\xFCml\xFCl\xFCk","asset":"varl\u0131k",
    "dividend":"temett\xFC","spending limit":"harcama limiti",
    "blockchain":"blok zinciri","token":"token","tokens":"tokenlar",
    "stablecoin":"stablecoin","stablecoins":"stablecoinler",
    "cryptocurrency":"kripto para","crypto":"kripto",
    "crypto wallet":"kripto c\xFCzdan\u0131","wallet":"c\xFCzdan",
    "seed phrase":"kurtarma ifadesi","private key":"\xF6zel anahtar",
    "public address":"genel adres","smart contract":"ak\u0131ll\u0131 s\xF6zle\u015Fme",
    "network fees":"a\u011F \xFCcretleri","gas fees":"gas \xFCcretleri",
    "custodial":"saklamal\u0131","non-custodial":"saklamas\u0131z",
    "custodial wallet":"saklamal\u0131 c\xFCzdan",
    "non-custodial wallet":"saklamas\u0131z c\xFCzdan",
    "fiat":"itibari para","pegged":"sabitlenmi\u015F",
    "decentralized":"merkeziyetsiz","centralized":"merkezi",
    "capital provider":"sermaye sa\u011Flay\u0131c\u0131",
    "repayment schedule":"geri \xF6deme plan\u0131",
    "leverage":"kald\u0131ra\xE7","diversification":"\xE7e\u015Fitlendirme",
    "yield":"getiri","returns":"getiriler",
    "liquidity":"likidite","protocol":"protokol",
    "staking":"staking","airdrop":"airdrop",
    "mining":"madencilik","validator":"do\u011Frulay\u0131c\u0131",
    "consensus":"konsens\xFCs","bridge":"k\xF6pr\xFC",
    "on-chain":"zincir \xFCst\xFC","off-chain":"zincir d\u0131\u015F\u0131",
    "scam":"doland\u0131r\u0131c\u0131l\u0131k","phishing":"oltalama",
    "Learn & Earn":"\xD6\u011Fren ve Kazan",
    "start learning":"\xF6\u011Frenmeye ba\u015Fla",
    "checklist":"kontrol listesi","step-by-step":"ad\u0131m ad\u0131m",
    "beginner":"ba\u015Flang\u0131\xE7","beginners":"yeni ba\u015Flayanlar",
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","DEX":"DEX","CEX":"CEX","DApp":"DApp",
    "Layer 1":"Layer 1","Layer 2":"Layer 2",
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",
    "Evolution of the Web from 1.0 to 3.0":"Web'in 1.0'dan 3.0'a evrimi",
    "Static read-only web pages":"Statik salt okunur web sayfalar\u0131",
    "Information-centric and interactive":"Bilgi odakl\u0131 ve etkile\u015Fimli",
    "User-centric, decentralized, private and secure":"Kullan\u0131c\u0131 odakl\u0131, merkeziyetsiz, gizli ve g\xFCvenli",
    "read-only":"salt okunur","user-centric":"kullan\u0131c\u0131 odakl\u0131",
    "private and secure":"gizli ve g\xFCvenli"
  },
  ko: {
    "APR":"\uC5F0\uC774\uC728","Annual Percentage Rate":"\uC5F0\uC774\uC728",
    "interest rate":"\uC774\uC790\uC728","annual returns":"\uC5F0\uAC04 \uC218\uC775\uB960",
    "monthly payouts":"\uC6D4\uBCC4 \uC9C0\uAE09","monthly payments":"\uC6D4\uBCC4 \uACB0\uC81C",
    "balance":"\uC794\uC561","statement":"\uBA85\uC138\uC11C","account":"\uACC4\uC815",
    "deposit":"\uC785\uAE08","withdrawal":"\uCD9C\uAE08","wire transfer":"\uACC4\uC88C\uC774\uCCB4",
    "transaction":"\uAC70\uB798","payment":"\uACB0\uC81C","invoice":"\uCCAD\uAD6C\uC11C",
    "fee":"\uC218\uC218\uB8CC","no hidden fees":"\uC228\uACA8\uC9C4 \uC218\uC218\uB8CC \uC5C6\uC74C",
    "P2P lending":"P2P \uB300\uCD9C","crowdlending":"\uD06C\uB77C\uC6B0\uB4DC \uB80C\uB529",
    "crowdfunding":"\uD06C\uB77C\uC6B0\uB4DC \uD380\uB529","lending platform":"\uB300\uCD9C \uD50C\uB7AB\uD3FC",
    "investment platform":"\uD22C\uC790 \uD50C\uB7AB\uD3FC",
    "investor":"\uD22C\uC790\uC790","investors":"\uD22C\uC790\uC790",
    "borrower":"\uCC28\uC785\uC790","lender":"\uB300\uCD9C\uC790",
    "loan":"\uB300\uCD9C","loan period":"\uB300\uCD9C \uAE30\uAC04","loan term":"\uB300\uCD9C \uAE30\uAC04",
    "loan originator":"\uB300\uCD9C \uBC1C\uD589\uC0AC",
    "funded":"\uD380\uB529 \uC644\uB8CC","repaid":"\uC0C1\uD658 \uC644\uB8CC",
    "default":"\uBD80\uC2E4","late loans":"\uC5F0\uCCB4 \uB300\uCD9C",
    "cash drag":"\uD604\uAE08 \uC720\uB3D9\uC131 \uC9C0\uC5F0",
    "primary market":"1\uCC28 \uC2DC\uC7A5","secondary market":"2\uCC28 \uC2DC\uC7A5",
    "total funded":"\uCD1D \uD380\uB529\uC561","total interest paid":"\uC9C0\uAE09 \uC774\uC790 \uD569\uACC4",
    "available funds":"\uC0AC\uC6A9 \uAC00\uB2A5 \uC790\uAE08","invested funds":"\uD22C\uC790 \uC790\uAE08",
    "total funds":"\uCD1D \uC790\uAE08",
    "initial investment":"\uCD08\uAE30 \uD22C\uC790","investment period":"\uD22C\uC790 \uAE30\uAC04",
    "future value":"\uBBF8\uB798 \uAC00\uCE58","earned return":"\uD68D\uB4DD \uC218\uC775",
    "average annual return":"\uD3C9\uADE0 \uC5F0\uAC04 \uC218\uC775\uB960",
    "portfolio":"\uD3EC\uD2B8\uD3F4\uB9AC\uC624","passive income":"\uD328\uC2DC\uBE0C \uC778\uCEF4",
    "principal repayment":"\uC6D0\uAE08 \uC0C1\uD658",
    "interest payment":"\uC774\uC790 \uC9C0\uAE09",
    "installment":"\uD560\uBD80","recurring payment":"\uC815\uAE30 \uACB0\uC81C",
    "due diligence":"\uC2E4\uC0AC","risk assessment":"\uB9AC\uC2A4\uD06C \uD3C9\uAC00",
    "risk scoring":"\uB9AC\uC2A4\uD06C \uC810\uC218","AML":"AML",
    "compliance":"\uCEF4\uD50C\uB77C\uC774\uC5B8\uC2A4","regulated":"\uADDC\uC81C \uB300\uC0C1",
    "verification":"\uBCF8\uC778 \uD655\uC778","KYC":"KYC",
    "referral bonus":"\uCD94\uCC9C \uBCF4\uB108\uC2A4","loyalty bonus":"\uB85C\uC5F4\uD2F0 \uBCF4\uB108\uC2A4",
    "welcome bonus":"\uC6F0\uCEF4 \uBCF4\uB108\uC2A4","investment reward":"\uD22C\uC790 \uB9AC\uC6CC\uB4DC",
    "invite friends":"\uCE5C\uAD6C \uCD08\uB300",
    "sign up":"\uD68C\uC6D0\uAC00\uC785","log in":"\uB85C\uADF8\uC778","register":"\uD68C\uC6D0\uAC00\uC785",
    "invest now":"\uC9C0\uAE08 \uD22C\uC790\uD558\uAE30","start investing":"\uD22C\uC790 \uC2DC\uC791\uD558\uAE30",
    "dashboard":"\uB300\uC2DC\uBCF4\uB4DC","onboarding":"\uC628\uBCF4\uB529",
    "collateral":"\uB2F4\uBCF4","mortgage":"\uBAA8\uAE30\uC9C0","savings":"\uC800\uCD95",
    "credit score":"\uC2E0\uC6A9 \uC810\uC218","overdraft":"\uB2F9\uC88C\uB300\uC6D4",
    "chargeback":"\uC9C0\uAE09 \uAC70\uC808","settlement":"\uACB0\uC81C",
    "direct debit":"\uC790\uB3D9\uC774\uCCB4","exchange rate":"\uD658\uC728",
    "payee":"\uC218\uCDE8\uC778","payer":"\uC9C0\uAE09\uC778","beneficiary":"\uC218\uC775\uC790",
    "equity":"\uC790\uBCF8","liability":"\uBD80\uCC44","asset":"\uC790\uC0B0",
    "dividend":"\uBC30\uB2F9","spending limit":"\uC9C0\uCD9C \uD55C\uB3C4",
    "minimum investment":"\uCD5C\uC18C \uD22C\uC790\uAE08","maximum investment":"\uCD5C\uB300 \uD22C\uC790\uAE08","investment amount":"\uD22C\uC790 \uAE08\uC561",
    "account holder":"\uC608\uAE08\uC8FC","IBAN":"IBAN","processing time":"\uCC98\uB9AC \uC18C\uC694 \uC2DC\uAC04","business days":"\uC601\uC5C5\uC77C",
    "credit rating":"\uC2E0\uC6A9 \uB4F1\uAE09","risk grade":"\uB9AC\uC2A4\uD06C \uB4F1\uAE09","maturity":"\uB9CC\uAE30","amortization":"\uC0C1\uAC01",
    "early repayment":"\uC870\uAE30 \uC0C1\uD658","monthly interest":"\uC6D4 \uC774\uC790","accrued interest":"\uBBF8\uC218 \uC774\uC790",
    "total return":"\uCD1D \uC218\uC775","net return":"\uC21C\uC218\uC775","gross return":"\uCD1D\uC218\uC775(\uC138\uC804)",
    "fixed rate":"\uACE0\uC815 \uAE08\uB9AC","variable rate":"\uBCC0\uB3D9 \uAE08\uB9AC","compound interest":"\uBCF5\uB9AC","simple interest":"\uB2E8\uB9AC",
    "capital at risk":"\uC6D0\uAE08 \uC190\uC2E4 \uC704\uD5D8","past performance":"\uACFC\uAC70 \uC2E4\uC801","past performance is not a guarantee of future results":"\uACFC\uAC70 \uC2E4\uC801\uC774 \uBBF8\uB798 \uC218\uC775\uC744 \uBCF4\uC7A5\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",
    "financial intermediary":"\uAE08\uC735 \uC911\uAC1C\uC5C5\uC790","payment institution":"\uACB0\uC81C \uAE30\uAD00","electronic money":"\uC804\uC790\uD654\uD3D0",
    "digital assets":"\uB514\uC9C0\uD138 \uC790\uC0B0","securities":"\uC720\uAC00\uC99D\uAD8C","transfer fee":"\uC1A1\uAE08 \uC218\uC218\uB8CC",
    "available balance":"\uCD9C\uAE08 \uAC00\uB2A5 \uC794\uC561","wallet balance":"\uC9C0\uAC11 \uC794\uC561","reserved balance":"\uC608\uC57D \uC794\uC561",
    "pending":"\uB300\uAE30 \uC911","completed":"\uC644\uB8CC","failed":"\uC2E4\uD328","verification pending":"\uBCF8\uC778 \uD655\uC778 \uB300\uAE30",
    "two-factor authentication":"2\uB2E8\uACC4 \uC778\uC99D","regulatory":"\uADDC\uC81C","SME":"\uC911\uC18C\uAE30\uC5C5","borrower company":"\uCC28\uC785 \uAE30\uC5C5",
    "payment protection":"\uC9C0\uAE09 \uBCF4\uD638","buyback guarantee":"\uB9E4\uC785\uC57D\uC815","interest accrual":"\uC774\uC790 \uBC1C\uC0DD",
    "GDPR":"GDPR","EEA":"EEA","privacy policy":"\uAC1C\uC778\uC815\uBCF4 \uCC98\uB9AC\uBC29\uCE68","terms of service":"\uC774\uC6A9\uC57D\uAD00","AML policy":"AML \uC815\uCC45",
    "payout":"\uC9C0\uAE09","payouts":"\uC9C0\uAE09","refund":"\uD658\uBD88","top up":"\uCDA9\uC804","disbursement":"\uC1A1\uAE08",
    "loyalty program":"\uB85C\uC5F4\uD2F0 \uD504\uB85C\uADF8\uB7A8","referral program":"\uCD94\uCC9C \uD504\uB85C\uADF8\uB7A8","welcome offer":"\uC6F0\uCEF4 \uD61C\uD0DD",
    "annualized return":"\uC5F0\uD658\uC0B0 \uC218\uC775\uB960","internal rate of return":"\uB0B4\uBD80\uC218\uC775\uB960","holding period":"\uBCF4\uC720 \uAE30\uAC04",
    "liquidity risk":"\uC720\uB3D9\uC131 \uB9AC\uC2A4\uD06C","credit risk":"\uC2E0\uC6A9 \uB9AC\uC2A4\uD06C","market risk":"\uC2DC\uC7A5 \uB9AC\uC2A4\uD06C",
    "collateralized loan":"\uB2F4\uBCF4 \uB300\uCD9C","unsecured loan":"\uBB34\uB2F4\uBCF4 \uB300\uCD9C","loan book":"\uB300\uCD9C \uD3EC\uD2B8\uD3F4\uB9AC\uC624",
    "underwriting":"\uC2EC\uC0AC","origination fee":"\uBC1C\uD589 \uC218\uC218\uB8CC","servicing":"\uB300\uCD9C \uAD00\uB9AC",
    "escrow":"\uC5D0\uC2A4\uD06C\uB85C","settlement date":"\uACB0\uC81C\uC77C","value date":"\uAC00\uCE58\uC77C",
    "KYC verification":"KYC \uC778\uC99D","identity verification":"\uC2E0\uC6D0 \uD655\uC778","proof of address":"\uC8FC\uC18C \uC99D\uBA85",
    "iban":"IBAN","swift":"SWIFT","remittance":"\uD574\uC678 \uC1A1\uAE08",
    "slippage":"\uC2AC\uB9AC\uD53C\uC9C0","liquidity pool":"\uC720\uB3D9\uC131 \uD480","impermanent loss":"\uBE44\uC601\uAD6C\uC801 \uC190\uC2E4",
    "DEX":"DEX","CEX":"CEX","order book":"\uD638\uAC00\uCC3D","yield farming":"\uC774\uC790 \uD30C\uBC0D","APY":"APY","TVL":"TVL",
    "blockchain":"\uBE14\uB85D\uCCB4\uC778","token":"\uD1A0\uD070","tokens":"\uD1A0\uD070",
    "stablecoin":"\uC2A4\uD14C\uC774\uBE14\uCF54\uC778","stablecoins":"\uC2A4\uD14C\uC774\uBE14\uCF54\uC778",
    "cryptocurrency":"\uC554\uD638\uD654\uD3D0","crypto":"\uD06C\uB9BD\uD1A0",
    "crypto wallet":"\uD06C\uB9BD\uD1A0 \uC9C0\uAC11","wallet":"\uC9C0\uAC11",
    "seed phrase":"\uC2DC\uB4DC \uAD6C\uBB38","private key":"\uAC1C\uC778 \uD0A4",
    "public address":"\uACF5\uAC1C \uC8FC\uC18C","smart contract":"\uC2A4\uB9C8\uD2B8 \uCEE8\uD2B8\uB799\uD2B8",
    "network fees":"\uB124\uD2B8\uC6CC\uD06C \uC218\uC218\uB8CC","gas fees":"\uAC00\uC2A4 \uC218\uC218\uB8CC",
    "custodial":"\uC218\uD0C1\uD615","non-custodial":"\uBE44\uC218\uD0C1\uD615",
    "custodial wallet":"\uC218\uD0C1\uD615 \uC9C0\uAC11",
    "non-custodial wallet":"\uBE44\uC218\uD0C1\uD615 \uC9C0\uAC11",
    "fiat":"\uBC95\uC815\uD654\uD3D0","pegged":"\uC5F0\uB3D9",
    "decentralized":"\uD0C8\uC911\uC559\uD654","centralized":"\uC911\uC559\uD654",
    "capital provider":"\uC790\uBCF8 \uACF5\uAE09\uC790",
    "repayment schedule":"\uC0C1\uD658 \uC77C\uC815",
    "leverage":"\uB808\uBC84\uB9AC\uC9C0","diversification":"\uBD84\uC0B0 \uD22C\uC790",
    "yield":"\uC218\uC775\uB960","returns":"\uC218\uC775",
    "liquidity":"\uC720\uB3D9\uC131","protocol":"\uD504\uB85C\uD1A0\uCF5C",
    "staking":"\uC2A4\uD14C\uC774\uD0B9","airdrop":"\uC5D0\uC5B4\uB4DC\uB86D",
    "mining":"\uCC44\uAD74","validator":"\uAC80\uC99D\uC790",
    "consensus":"\uD569\uC758","bridge":"\uBE0C\uB9AC\uC9C0",
    "on-chain":"\uC628\uCCB4\uC778","off-chain":"\uC624\uD504\uCCB4\uC778",
    "scam":"\uC0AC\uAE30","phishing":"\uD53C\uC2F1",
    "Learn & Earn":"\uD559\uC2B5\uD558\uACE0 \uC801\uB9BD\uD558\uAE30",
    "start learning":"\uD559\uC2B5 \uC2DC\uC791",
    "checklist":"\uCCB4\uD06C\uB9AC\uC2A4\uD2B8","step-by-step":"\uB2E8\uACC4\uBCC4",
    "beginner":"\uCD08\uBCF4\uC790","beginners":"\uCD08\uBCF4\uC790",
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","Layer 1":"Layer 1","Layer 2":"Layer 2",
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",
    "Evolution of the Web from 1.0 to 3.0":"\uC6F9\uC758 \uC9C4\uD654: 1.0\uC5D0\uC11C 3.0\uAE4C\uC9C0",
    "Static read-only web pages":"\uC815\uC801 \uC77D\uAE30 \uC804\uC6A9 \uC6F9 \uD398\uC774\uC9C0",
    "Information-centric and interactive":"\uC815\uBCF4 \uC911\uC2EC\uC758 \uC778\uD130\uB799\uD2F0\uBE0C \uC6F9",
    "User-centric, decentralized, private and secure":"\uC0AC\uC6A9\uC790 \uC911\uC2EC, \uD0C8\uC911\uC559\uD654, \uD504\uB77C\uC774\uBC84\uC2DC \uBC0F \uBCF4\uC548",
    "read-only":"\uC77D\uAE30 \uC804\uC6A9","user-centric":"\uC0AC\uC6A9\uC790 \uC911\uC2EC"
  },
  zh: {
    "APR":"\u5E74\u5316\u5229\u7387","Annual Percentage Rate":"\u5E74\u5316\u5229\u7387",
    "interest rate":"\u5229\u7387","annual returns":"\u5E74\u5316\u6536\u76CA",
    "monthly payouts":"\u6309\u6708\u652F\u4ED8","monthly payments":"\u6BCF\u6708\u8FD8\u6B3E",
    "balance":"\u4F59\u989D","statement":"\u5BF9\u8D26\u5355","account":"\u8D26\u6237",
    "deposit":"\u5145\u503C","withdrawal":"\u63D0\u73B0","wire transfer":"\u94F6\u884C\u8F6C\u8D26",
    "transaction":"\u4EA4\u6613","payment":"\u4ED8\u6B3E","invoice":"\u53D1\u7968",
    "fee":"\u8D39\u7528","no hidden fees":"\u65E0\u9690\u85CF\u8D39\u7528",
    "P2P lending":"P2P \u501F\u8D37","crowdlending":"\u4F17\u7B79\u501F\u8D37",
    "crowdfunding":"\u4F17\u7B79","lending platform":"\u501F\u8D37\u5E73\u53F0",
    "investment platform":"\u6295\u8D44\u5E73\u53F0",
    "investor":"\u6295\u8D44\u8005","investors":"\u6295\u8D44\u8005",
    "borrower":"\u501F\u6B3E\u4EBA","lender":"\u51FA\u501F\u4EBA",
    "loan":"\u8D37\u6B3E","loan period":"\u8D37\u6B3E\u671F\u9650","loan term":"\u8D37\u6B3E\u671F\u9650",
    "loan originator":"\u8D37\u6B3E\u53D1\u8D77\u65B9",
    "funded":"\u5DF2\u878D\u8D44","repaid":"\u5DF2\u507F\u8FD8",
    "default":"\u8FDD\u7EA6","late loans":"\u903E\u671F\u8D37\u6B3E",
    "cash drag":"\u8D44\u91D1\u95F2\u7F6E",
    "primary market":"\u4E00\u7EA7\u5E02\u573A","secondary market":"\u4E8C\u7EA7\u5E02\u573A",
    "total funded":"\u603B\u878D\u8D44\u989D","total interest paid":"\u5DF2\u4ED8\u5229\u606F\u603B\u989D",
    "available funds":"\u53EF\u7528\u8D44\u91D1","invested funds":"\u5DF2\u6295\u8D44\u8D44\u91D1",
    "total funds":"\u603B\u8D44\u91D1",
    "initial investment":"\u521D\u59CB\u6295\u8D44","investment period":"\u6295\u8D44\u671F\u9650",
    "future value":"\u672A\u6765\u4EF7\u503C","earned return":"\u5DF2\u83B7\u5F97\u6536\u76CA",
    "average annual return":"\u5E73\u5747\u5E74\u5316\u6536\u76CA",
    "portfolio":"\u6295\u8D44\u7EC4\u5408","passive income":"\u88AB\u52A8\u6536\u5165",
    "principal repayment":"\u672C\u91D1\u507F\u8FD8",
    "interest payment":"\u5229\u606F\u652F\u4ED8",
    "installment":"\u5206\u671F","recurring payment":"\u5B9A\u671F\u4ED8\u6B3E",
    "due diligence":"\u5C3D\u804C\u8C03\u67E5","risk assessment":"\u98CE\u9669\u8BC4\u4F30",
    "risk scoring":"\u98CE\u9669\u8BC4\u5206","AML":"\u53CD\u6D17\u94B1",
    "compliance":"\u5408\u89C4","regulated":"\u53D7\u76D1\u7BA1",
    "verification":"\u8EAB\u4EFD\u9A8C\u8BC1","KYC":"KYC",
    "referral bonus":"\u63A8\u8350\u5956\u52B1","loyalty bonus":"\u5FE0\u8BDA\u5EA6\u5956\u52B1",
    "welcome bonus":"\u6B22\u8FCE\u5956\u52B1","investment reward":"\u6295\u8D44\u5956\u52B1",
    "invite friends":"\u9080\u8BF7\u597D\u53CB",
    "sign up":"\u6CE8\u518C","log in":"\u767B\u5F55","register":"\u6CE8\u518C",
    "invest now":"\u7ACB\u5373\u6295\u8D44","start investing":"\u5F00\u59CB\u6295\u8D44",
    "dashboard":"\u63A7\u5236\u53F0","onboarding":"\u5F00\u6237\u5F15\u5BFC",
    "collateral":"\u62B5\u62BC\u54C1","mortgage":"\u6309\u63ED","savings":"\u50A8\u84C4",
    "credit score":"\u4FE1\u7528\u8BC4\u5206","overdraft":"\u900F\u652F",
    "chargeback":"\u62D2\u4ED8","settlement":"\u7ED3\u7B97",
    "direct debit":"\u76F4\u63A5\u6263\u6B3E","exchange rate":"\u6C47\u7387",
    "payee":"\u6536\u6B3E\u4EBA","payer":"\u4ED8\u6B3E\u4EBA","beneficiary":"\u53D7\u76CA\u4EBA",
    "equity":"\u6743\u76CA","liability":"\u8D1F\u503A","asset":"\u8D44\u4EA7",
    "dividend":"\u80A1\u606F","spending limit":"\u6D88\u8D39\u9650\u989D",
    "minimum investment":"\u6700\u4F4E\u6295\u8D44\u989D","maximum investment":"\u6700\u9AD8\u6295\u8D44\u989D","investment amount":"\u6295\u8D44\u91D1\u989D",
    "account holder":"\u8D26\u6237\u6301\u6709\u4EBA","IBAN":"IBAN","processing time":"\u5904\u7406\u65F6\u95F4","business days":"\u5DE5\u4F5C\u65E5",
    "credit rating":"\u4FE1\u7528\u8BC4\u7EA7","risk grade":"\u98CE\u9669\u7B49\u7EA7","maturity":"\u5230\u671F","amortization":"\u644A\u9500",
    "early repayment":"\u63D0\u524D\u8FD8\u6B3E","monthly interest":"\u6708\u606F","accrued interest":"\u5E94\u8BA1\u5229\u606F",
    "total return":"\u603B\u56DE\u62A5","net return":"\u51C0\u6536\u76CA","gross return":"\u603B\u6536\u76CA\uFF08\u7A0E\u524D\uFF09",
    "fixed rate":"\u56FA\u5B9A\u5229\u7387","variable rate":"\u6D6E\u52A8\u5229\u7387","compound interest":"\u590D\u5229","simple interest":"\u5355\u5229",
    "capital at risk":"\u672C\u91D1\u98CE\u9669","past performance":"\u5386\u53F2\u4E1A\u7EE9","past performance is not a guarantee of future results":"\u8FC7\u5F80\u4E1A\u7EE9\u4E0D\u4EE3\u8868\u672A\u6765\u8868\u73B0",
    "financial intermediary":"\u91D1\u878D\u4E2D\u4ECB","payment institution":"\u652F\u4ED8\u673A\u6784","electronic money":"\u7535\u5B50\u8D27\u5E01",
    "digital assets":"\u6570\u5B57\u8D44\u4EA7","securities":"\u8BC1\u5238","transfer fee":"\u8F6C\u8D26\u624B\u7EED\u8D39",
    "available balance":"\u53EF\u7528\u4F59\u989D","wallet balance":"\u94B1\u5305\u4F59\u989D","reserved balance":"\u51BB\u7ED3\u4F59\u989D",
    "pending":"\u5904\u7406\u4E2D","completed":"\u5DF2\u5B8C\u6210","failed":"\u5931\u8D25","verification pending":"\u9A8C\u8BC1\u5BA1\u6838\u4E2D",
    "two-factor authentication":"\u53CC\u56E0\u7D20\u8BA4\u8BC1","regulatory":"\u76D1\u7BA1","SME":"\u4E2D\u5C0F\u4F01\u4E1A","borrower company":"\u501F\u6B3E\u4F01\u4E1A",
    "payment protection":"\u4ED8\u6B3E\u4FDD\u969C","buyback guarantee":"\u56DE\u8D2D\u62C5\u4FDD","interest accrual":"\u5229\u606F\u8BA1\u63D0",
    "GDPR":"GDPR","EEA":"\u6B27\u6D32\u7ECF\u6D4E\u533A","privacy policy":"\u9690\u79C1\u653F\u7B56","terms of service":"\u670D\u52A1\u6761\u6B3E","AML policy":"\u53CD\u6D17\u94B1\u653F\u7B56",
    "payout":"\u5230\u8D26","payouts":"\u4ED8\u6B3E","refund":"\u9000\u6B3E","top up":"\u5145\u503C","disbursement":"\u653E\u6B3E",
    "loyalty program":"\u5FE0\u8BDA\u5EA6\u8BA1\u5212","referral program":"\u63A8\u8350\u8BA1\u5212","welcome offer":"\u65B0\u4EBA\u793C\u9047",
    "annualized return":"\u5E74\u5316\u6536\u76CA","internal rate of return":"\u5185\u90E8\u6536\u76CA\u7387","holding period":"\u6301\u6709\u671F",
    "liquidity risk":"\u6D41\u52A8\u6027\u98CE\u9669","credit risk":"\u4FE1\u7528\u98CE\u9669","market risk":"\u5E02\u573A\u98CE\u9669",
    "collateralized loan":"\u62B5\u62BC\u8D37\u6B3E","unsecured loan":"\u4FE1\u7528\u8D37\u6B3E","loan book":"\u8D37\u6B3E\u7EC4\u5408",
    "underwriting":"\u6388\u4FE1\u5BA1\u6279","origination fee":"\u53D1\u8D77\u8D39","servicing":"\u8D37\u540E\u670D\u52A1",
    "escrow":"\u6258\u7BA1\u8D26\u6237","settlement date":"\u7ED3\u7B97\u65E5","value date":"\u8D77\u606F\u65E5",
    "KYC verification":"KYC \u8BA4\u8BC1","identity verification":"\u8EAB\u4EFD\u9A8C\u8BC1","proof of address":"\u5730\u5740\u8BC1\u660E",
    "iban":"IBAN","swift":"SWIFT","remittance":"\u6C47\u6B3E",
    "slippage":"\u6ED1\u70B9","liquidity pool":"\u6D41\u52A8\u6027\u6C60","impermanent loss":"\u65E0\u5E38\u635F\u5931",
    "DEX":"DEX","CEX":"CEX","order book":"\u8BA2\u5355\u7C3F","yield farming":"\u6D41\u52A8\u6027\u6316\u77FF","APY":"APY","TVL":"TVL",
    "blockchain":"\u533A\u5757\u94FE","token":"\u4EE3\u5E01","tokens":"\u4EE3\u5E01",
    "stablecoin":"\u7A33\u5B9A\u5E01","stablecoins":"\u7A33\u5B9A\u5E01",
    "cryptocurrency":"\u52A0\u5BC6\u8D27\u5E01","crypto":"\u52A0\u5BC6\u8D44\u4EA7",
    "crypto wallet":"\u52A0\u5BC6\u94B1\u5305","wallet":"\u94B1\u5305",
    "seed phrase":"\u52A9\u8BB0\u8BCD","private key":"\u79C1\u94A5",
    "public address":"\u516C\u5F00\u5730\u5740","smart contract":"\u667A\u80FD\u5408\u7EA6",
    "network fees":"\u7F51\u7EDC\u8D39\u7528","gas fees":"Gas \u8D39\u7528",
    "custodial":"\u6258\u7BA1","non-custodial":"\u975E\u6258\u7BA1",
    "custodial wallet":"\u6258\u7BA1\u94B1\u5305",
    "non-custodial wallet":"\u975E\u6258\u7BA1\u94B1\u5305",
    "fiat":"\u6CD5\u5E01","pegged":"\u951A\u5B9A",
    "decentralized":"\u53BB\u4E2D\u5FC3\u5316","centralized":"\u4E2D\u5FC3\u5316",
    "capital provider":"\u8D44\u91D1\u63D0\u4F9B\u65B9",
    "repayment schedule":"\u8FD8\u6B3E\u8BA1\u5212",
    "leverage":"\u6760\u6746","diversification":"\u5206\u6563\u6295\u8D44",
    "yield":"\u6536\u76CA","returns":"\u56DE\u62A5",
    "liquidity":"\u6D41\u52A8\u6027","protocol":"\u534F\u8BAE",
    "staking":"\u8D28\u62BC","airdrop":"\u7A7A\u6295",
    "mining":"\u6316\u77FF","validator":"\u9A8C\u8BC1\u8282\u70B9",
    "consensus":"\u5171\u8BC6","bridge":"\u8DE8\u94FE\u6865",
    "on-chain":"\u94FE\u4E0A","off-chain":"\u94FE\u4E0B",
    "scam":"\u8BC8\u9A97","phishing":"\u9493\u9C7C",
    "Learn & Earn":"\u5B66\u4E60\u5373\u8D5A",
    "start learning":"\u5F00\u59CB\u5B66\u4E60",
    "checklist":"\u6E05\u5355","step-by-step":"\u5206\u6B65",
    "beginner":"\u521D\u5B66\u8005","beginners":"\u521D\u5B66\u8005",
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","Layer 1":"Layer 1","Layer 2":"Layer 2",
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",
    "Evolution of the Web from 1.0 to 3.0":"Web\u7684\u6F14\u8FDB\uFF1A\u4ECE1.0\u52303.0",
    "Static read-only web pages":"\u9759\u6001\u53EA\u8BFB\u7F51\u9875",
    "Information-centric and interactive":"\u4EE5\u4FE1\u606F\u4E3A\u4E2D\u5FC3\u7684\u4EA4\u4E92\u5F0F\u7F51\u7EDC",
    "User-centric, decentralized, private and secure":"\u4EE5\u7528\u6237\u4E3A\u4E2D\u5FC3\u3001\u53BB\u4E2D\u5FC3\u5316\u3001\u9690\u79C1\u4E0E\u5B89\u5168",
    "read-only":"\u53EA\u8BFB","user-centric":"\u4EE5\u7528\u6237\u4E3A\u4E2D\u5FC3"
  },
  ja: {
    "APR":"\u5E74\u5229","Annual Percentage Rate":"\u5E74\u5229",
    "interest rate":"\u91D1\u5229","annual returns":"\u5E74\u9593\u30EA\u30BF\u30FC\u30F3",
    "monthly payouts":"\u6708\u6B21\u6255\u3044\u51FA\u3057","monthly payments":"\u6708\u6B21\u652F\u6255\u3044",
    "balance":"\u6B8B\u9AD8","statement":"\u660E\u7D30","account":"\u53E3\u5EA7",
    "deposit":"\u5165\u91D1","withdrawal":"\u51FA\u91D1","wire transfer":"\u9280\u884C\u632F\u8FBC",
    "transaction":"\u53D6\u5F15","payment":"\u652F\u6255\u3044","invoice":"\u8ACB\u6C42\u66F8",
    "fee":"\u624B\u6570\u6599","no hidden fees":"\u96A0\u308C\u305F\u624B\u6570\u6599\u306A\u3057",
    "P2P lending":"P2P\u30EC\u30F3\u30C7\u30A3\u30F3\u30B0","crowdlending":"\u30AF\u30E9\u30A6\u30C9\u30EC\u30F3\u30C7\u30A3\u30F3\u30B0",
    "crowdfunding":"\u30AF\u30E9\u30A6\u30C9\u30D5\u30A1\u30F3\u30C7\u30A3\u30F3\u30B0","lending platform":"\u878D\u8CC7\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0",
    "investment platform":"\u6295\u8CC7\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0",
    "investor":"\u6295\u8CC7\u5BB6","investors":"\u6295\u8CC7\u5BB6",
    "borrower":"\u501F\u308A\u624B","lender":"\u8CB8\u3057\u624B",
    "loan":"\u878D\u8CC7","loan period":"\u878D\u8CC7\u671F\u9593","loan term":"\u878D\u8CC7\u671F\u9593",
    "loan originator":"\u30ED\u30FC\u30F3\u30AA\u30EA\u30B8\u30CD\u30FC\u30BF\u30FC",
    "funded":"\u8ABF\u9054\u6E08\u307F","repaid":"\u8FD4\u6E08\u6E08\u307F",
    "default":"\u30C7\u30D5\u30A9\u30EB\u30C8","late loans":"\u5EF6\u6EDE\u30ED\u30FC\u30F3",
    "cash drag":"\u30AD\u30E3\u30C3\u30B7\u30E5\u30C9\u30E9\u30C3\u30B0",
    "primary market":"\u30D7\u30E9\u30A4\u30DE\u30EA\u30FC\u30DE\u30FC\u30B1\u30C3\u30C8","secondary market":"\u30BB\u30AB\u30F3\u30C0\u30EA\u30FC\u30DE\u30FC\u30B1\u30C3\u30C8",
    "total funded":"\u7DCF\u8ABF\u9054\u984D","total interest paid":"\u652F\u6255\u5229\u606F\u5408\u8A08",
    "available funds":"\u5229\u7528\u53EF\u80FD\u8CC7\u91D1","invested funds":"\u6295\u8CC7\u6E08\u307F\u8CC7\u91D1",
    "total funds":"\u7DCF\u8CC7\u91D1",
    "initial investment":"\u521D\u671F\u6295\u8CC7","investment period":"\u6295\u8CC7\u671F\u9593",
    "future value":"\u5C06\u6765\u4FA1\u5024","earned return":"\u7372\u5F97\u30EA\u30BF\u30FC\u30F3",
    "average annual return":"\u5E73\u5747\u5E74\u9593\u30EA\u30BF\u30FC\u30F3",
    "portfolio":"\u30DD\u30FC\u30C8\u30D5\u30A9\u30EA\u30AA","passive income":"\u4E0D\u52B4\u6240\u5F97",
    "principal repayment":"\u5143\u672C\u8FD4\u6E08",
    "interest payment":"\u5229\u606F\u652F\u6255\u3044",
    "installment":"\u5206\u5272\u6255\u3044","recurring payment":"\u5B9A\u671F\u652F\u6255\u3044",
    "due diligence":"\u30C7\u30E5\u30FC\u30C7\u30EA\u30B8\u30A7\u30F3\u30B9","risk assessment":"\u30EA\u30B9\u30AF\u8A55\u4FA1",
    "risk scoring":"\u30EA\u30B9\u30AF\u30B9\u30B3\u30A2","AML":"AML",
    "compliance":"\u30B3\u30F3\u30D7\u30E9\u30A4\u30A2\u30F3\u30B9","regulated":"\u898F\u5236\u4E0B",
    "verification":"\u672C\u4EBA\u78BA\u8A8D","KYC":"KYC",
    "referral bonus":"\u7D39\u4ECB\u30DC\u30FC\u30CA\u30B9","loyalty bonus":"\u30ED\u30A4\u30E4\u30EB\u30C6\u30A3\u30DC\u30FC\u30CA\u30B9",
    "welcome bonus":"\u30A6\u30A7\u30EB\u30AB\u30E0\u30DC\u30FC\u30CA\u30B9","investment reward":"\u6295\u8CC7\u30EA\u30EF\u30FC\u30C9",
    "invite friends":"\u53CB\u9054\u3092\u62DB\u5F85",
    "sign up":"\u65B0\u898F\u767B\u9332","log in":"\u30ED\u30B0\u30A4\u30F3","register":"\u767B\u9332",
    "invest now":"\u4ECA\u3059\u3050\u6295\u8CC7","start investing":"\u6295\u8CC7\u3092\u59CB\u3081\u308B",
    "dashboard":"\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9","onboarding":"\u30AA\u30F3\u30DC\u30FC\u30C7\u30A3\u30F3\u30B0",
    "collateral":"\u62C5\u4FDD","mortgage":"\u4F4F\u5B85\u30ED\u30FC\u30F3","savings":"\u8CAF\u84C4",
    "credit score":"\u4FE1\u7528\u30B9\u30B3\u30A2","overdraft":"\u5F53\u5EA7\u8CB8\u8D8A",
    "chargeback":"\u30C1\u30E3\u30FC\u30B8\u30D0\u30C3\u30AF","settlement":"\u6C7A\u6E08",
    "direct debit":"\u53E3\u5EA7\u632F\u66FF","exchange rate":"\u70BA\u66FF\u30EC\u30FC\u30C8",
    "payee":"\u53D7\u53D6\u4EBA","payer":"\u652F\u6255\u4EBA","beneficiary":"\u53D7\u76CA\u8005",
    "equity":"\u8CC7\u672C","liability":"\u8CA0\u50B5","asset":"\u8CC7\u7523",
    "dividend":"\u914D\u5F53","spending limit":"\u652F\u51FA\u4E0A\u9650",
    "minimum investment":"\u6700\u4F4E\u6295\u8CC7\u984D","maximum investment":"\u6700\u5927\u6295\u8CC7\u984D","investment amount":"\u6295\u8CC7\u91D1\u984D",
    "account holder":"\u53E3\u5EA7\u540D\u7FA9\u4EBA","IBAN":"IBAN","processing time":"\u51E6\u7406\u6642\u9593","business days":"\u55B6\u696D\u65E5",
    "credit rating":"\u4FE1\u7528\u683C\u4ED8\u3051","risk grade":"\u30EA\u30B9\u30AF\u30B0\u30EC\u30FC\u30C9","maturity":"\u6E80\u671F","amortization":"\u511F\u5374",
    "early repayment":"\u65E9\u671F\u8FD4\u6E08","monthly interest":"\u6708\u6B21\u5229\u5B50","accrued interest":"\u672A\u53CE\u5229\u606F",
    "total return":"\u7DCF\u30EA\u30BF\u30FC\u30F3","net return":"\u7D14\u30EA\u30BF\u30FC\u30F3","gross return":"\u7DCF\u30EA\u30BF\u30FC\u30F3\uFF08\u7A0E\u5F15\u524D\uFF09",
    "fixed rate":"\u56FA\u5B9A\u91D1\u5229","variable rate":"\u5909\u52D5\u91D1\u5229","compound interest":"\u8907\u5229","simple interest":"\u5358\u5229",
    "capital at risk":"\u5143\u672C\u30EA\u30B9\u30AF","past performance":"\u904E\u53BB\u306E\u5B9F\u7E3E","past performance is not a guarantee of future results":"\u904E\u53BB\u306E\u5B9F\u7E3E\u306F\u5C06\u6765\u306E\u6210\u679C\u3092\u4FDD\u8A3C\u3059\u308B\u3082\u306E\u3067\u306F\u3042\u308A\u307E\u305B\u3093",
    "financial intermediary":"\u91D1\u878D\u4EF2\u4ECB\u696D\u8005","payment institution":"\u6C7A\u6E08\u4E8B\u696D\u8005","electronic money":"\u96FB\u5B50\u30DE\u30CD\u30FC",
    "digital assets":"\u30C7\u30B8\u30BF\u30EB\u8CC7\u7523","securities":"\u6709\u4FA1\u8A3C\u5238","transfer fee":"\u632F\u8FBC\u624B\u6570\u6599",
    "available balance":"\u5229\u7528\u53EF\u80FD\u6B8B\u9AD8","wallet balance":"\u30A6\u30A9\u30EC\u30C3\u30C8\u6B8B\u9AD8","reserved balance":"\u7559\u4FDD\u6B8B\u9AD8",
    "pending":"\u4FDD\u7559\u4E2D","completed":"\u5B8C\u4E86","failed":"\u5931\u6557","verification pending":"\u672C\u4EBA\u78BA\u8A8D\u5F85\u3061",
    "two-factor authentication":"\u4E8C\u8981\u7D20\u8A8D\u8A3C","regulatory":"\u898F\u5236","SME":"\u4E2D\u5C0F\u4F01\u696D","borrower company":"\u501F\u5165\u4F01\u696D",
    "payment protection":"\u652F\u6255\u4FDD\u8B77","buyback guarantee":"\u8CB7\u53D6\u4FDD\u8A3C","interest accrual":"\u5229\u606F\u767A\u751F",
    "GDPR":"GDPR","EEA":"EEA","privacy policy":"\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC","terms of service":"\u5229\u7528\u898F\u7D04","AML policy":"AML\u65B9\u91DD",
    "payout":"\u652F\u6255\u3044","payouts":"\u652F\u6255\u3044","refund":"\u8FD4\u91D1","top up":"\u30C1\u30E3\u30FC\u30B8","disbursement":"\u9001\u91D1",
    "loyalty program":"\u30ED\u30A4\u30E4\u30EB\u30C6\u30A3\u30D7\u30ED\u30B0\u30E9\u30E0","referral program":"\u7D39\u4ECB\u30D7\u30ED\u30B0\u30E9\u30E0","welcome offer":"\u30A6\u30A7\u30EB\u30AB\u30E0\u7279\u5178",
    "annualized return":"\u5E74\u63DB\u7B97\u30EA\u30BF\u30FC\u30F3","internal rate of return":"\u5185\u90E8\u53CE\u76CA\u7387","holding period":"\u4FDD\u6709\u671F\u9593",
    "liquidity risk":"\u6D41\u52D5\u6027\u30EA\u30B9\u30AF","credit risk":"\u4FE1\u7528\u30EA\u30B9\u30AF","market risk":"\u5E02\u5834\u30EA\u30B9\u30AF",
    "collateralized loan":"\u62C5\u4FDD\u4ED8\u30ED\u30FC\u30F3","unsecured loan":"\u7121\u62C5\u4FDD\u30ED\u30FC\u30F3","loan book":"\u30ED\u30FC\u30F3\u30D6\u30C3\u30AF",
    "underwriting":"\u4E0E\u4FE1\u5BE9\u67FB","origination fee":"\u624B\u6570\u6599\uFF08\u7D44\u6210\uFF09","servicing":"\u30B5\u30FC\u30D3\u30B7\u30F3\u30B0",
    "escrow":"\u30A8\u30B9\u30AF\u30ED\u30FC","settlement date":"\u6C7A\u6E08\u65E5","value date":"\u30D0\u30EA\u30E5\u30FC\u65E5",
    "KYC verification":"KYC\u8A8D\u8A3C","identity verification":"\u672C\u4EBA\u78BA\u8A8D","proof of address":"\u4F4F\u6240\u8A3C\u660E",
    "iban":"IBAN","swift":"SWIFT","remittance":"\u9001\u91D1",
    "slippage":"\u30B9\u30EA\u30C3\u30DA\u30FC\u30B8","liquidity pool":"\u6D41\u52D5\u6027\u30D7\u30FC\u30EB","impermanent loss":"\u4E00\u6642\u7684\u640D\u5931",
    "DEX":"DEX","CEX":"CEX","order book":"\u30AA\u30FC\u30C0\u30FC\u30D6\u30C3\u30AF","yield farming":"\u30A4\u30FC\u30EB\u30C9\u30D5\u30A1\u30FC\u30DF\u30F3\u30B0","APY":"APY","TVL":"TVL",
    "blockchain":"\u30D6\u30ED\u30C3\u30AF\u30C1\u30A7\u30FC\u30F3","token":"\u30C8\u30FC\u30AF\u30F3","tokens":"\u30C8\u30FC\u30AF\u30F3",
    "stablecoin":"\u30B9\u30C6\u30FC\u30D6\u30EB\u30B3\u30A4\u30F3","stablecoins":"\u30B9\u30C6\u30FC\u30D6\u30EB\u30B3\u30A4\u30F3",
    "cryptocurrency":"\u6697\u53F7\u8CC7\u7523","crypto":"\u30AF\u30EA\u30D7\u30C8",
    "crypto wallet":"\u6697\u53F7\u8CC7\u7523\u30A6\u30A9\u30EC\u30C3\u30C8","wallet":"\u30A6\u30A9\u30EC\u30C3\u30C8",
    "seed phrase":"\u30B7\u30FC\u30C9\u30D5\u30EC\u30FC\u30BA","private key":"\u79D8\u5BC6\u9375",
    "public address":"\u516C\u958B\u30A2\u30C9\u30EC\u30B9","smart contract":"\u30B9\u30DE\u30FC\u30C8\u30B3\u30F3\u30C8\u30E9\u30AF\u30C8",
    "network fees":"\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u624B\u6570\u6599","gas fees":"\u30AC\u30B9\u4EE3",
    "custodial":"\u30AB\u30B9\u30C8\u30C7\u30A3\u30A2\u30EB","non-custodial":"\u30CE\u30F3\u30AB\u30B9\u30C8\u30C7\u30A3\u30A2\u30EB",
    "custodial wallet":"\u30AB\u30B9\u30C8\u30C7\u30A3\u30A2\u30EB\u30A6\u30A9\u30EC\u30C3\u30C8",
    "non-custodial wallet":"\u30CE\u30F3\u30AB\u30B9\u30C8\u30C7\u30A3\u30A2\u30EB\u30A6\u30A9\u30EC\u30C3\u30C8",
    "fiat":"\u6CD5\u5B9A\u901A\u8CA8","pegged":"\u30DA\u30C3\u30B0",
    "decentralized":"\u5206\u6563\u578B","centralized":"\u4E2D\u592E\u96C6\u6A29\u578B",
    "capital provider":"\u8CC7\u672C\u63D0\u4F9B\u8005",
    "repayment schedule":"\u8FD4\u6E08\u30B9\u30B1\u30B8\u30E5\u30FC\u30EB",
    "leverage":"\u30EC\u30D0\u30EC\u30C3\u30B8","diversification":"\u5206\u6563\u6295\u8CC7",
    "yield":"\u5229\u56DE\u308A","returns":"\u30EA\u30BF\u30FC\u30F3",
    "liquidity":"\u6D41\u52D5\u6027","protocol":"\u30D7\u30ED\u30C8\u30B3\u30EB",
    "staking":"\u30B9\u30C6\u30FC\u30AD\u30F3\u30B0","airdrop":"\u30A8\u30A2\u30C9\u30ED\u30C3\u30D7",
    "mining":"\u30DE\u30A4\u30CB\u30F3\u30B0","validator":"\u30D0\u30EA\u30C7\u30FC\u30BF\u30FC",
    "consensus":"\u30B3\u30F3\u30BB\u30F3\u30B5\u30B9","bridge":"\u30D6\u30EA\u30C3\u30B8",
    "on-chain":"\u30AA\u30F3\u30C1\u30A7\u30FC\u30F3","off-chain":"\u30AA\u30D5\u30C1\u30A7\u30FC\u30F3",
    "scam":"\u8A50\u6B3A","phishing":"\u30D5\u30A3\u30C3\u30B7\u30F3\u30B0",
    "Learn & Earn":"\u5B66\u3093\u3067\u7A3C\u3050",
    "start learning":"\u5B66\u7FD2\u3092\u59CB\u3081\u308B",
    "checklist":"\u30C1\u30A7\u30C3\u30AF\u30EA\u30B9\u30C8","step-by-step":"\u30B9\u30C6\u30C3\u30D7\u30D0\u30A4\u30B9\u30C6\u30C3\u30D7",
    "beginner":"\u521D\u5FC3\u8005","beginners":"\u521D\u5FC3\u8005",
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","Layer 1":"Layer 1","Layer 2":"Layer 2",
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",
    "Evolution of the Web from 1.0 to 3.0":"Web\u306E\u9032\u5316\uFF1A1.0\u304B\u30893.0\u3078",
    "Static read-only web pages":"\u9759\u7684\u306A\u8AAD\u307F\u53D6\u308A\u5C02\u7528\u30A6\u30A7\u30D6\u30DA\u30FC\u30B8",
    "Information-centric and interactive":"\u60C5\u5831\u4E2D\u5FC3\u3067\u30A4\u30F3\u30BF\u30E9\u30AF\u30C6\u30A3\u30D6",
    "User-centric, decentralized, private and secure":"\u30E6\u30FC\u30B6\u30FC\u4E2D\u5FC3\u30FB\u5206\u6563\u578B\u30FB\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u30FB\u5B89\u5168",
    "read-only":"\u8AAD\u307F\u53D6\u308A\u5C02\u7528","user-centric":"\u30E6\u30FC\u30B6\u30FC\u4E2D\u5FC3"
  }
};

const LANG_NAMES = { es:"Spanish", it:"Italian", fr:"French", de:"German", pt:"Portuguese", pl:"Polish", el:"Greek", tr:"Turkish", ko:"Korean", zh:"Simplified Chinese", ja:"Japanese" };

const COURSE_GLOSSARY = {
  es: {
    "tx as a receipt":"tx como comprobante",
    "transaction hash":"hash de transacci\xF3n",
    "block explorer":"explorador de bloques",
    "network":"red","base network":"red Base",
    "Interface":"Interfaz","website":"sitio web","confirm":"confirmar","execution":"ejecuci\xF3n",
    "tokenomics":"token\xF3mica",
    "crypto taxes":"impuestos cripto",
    "real yield":"rendimiento real",
    "approval":"aprobaci\xF3n","approvals":"aprobaciones",
    "spending cap":"l\xEDmite de gasto",
    "allowance":"asignaci\xF3n",
    "revoke approval":"revocar aprobaci\xF3n",
    "wallet connection":"conexi\xF3n de monedero",
    "normal login":"inicio de sesi\xF3n normal",
    "clone site":"sitio clonado","fake support":"soporte falso",
    "support staff":"personal de soporte",
    "wrong address":"direcci\xF3n incorrecta",
    "malicious transaction":"transacci\xF3n maliciosa",
    "private key leak":"filtraci\xF3n de clave privada",
    "seed phrase leak":"filtraci\xF3n de frase semilla",
    "risk management":"gesti\xF3n de riesgos",
    "position sizing":"dimensionamiento de posici\xF3n",
    "term length":"plazo",
    "investor discipline":"disciplina del inversor",
    "capital preservation":"preservaci\xF3n de capital",
    "money management":"gesti\xF3n del dinero",
    "operational security":"seguridad operativa",
    "self-custody":"autocustodia",
    "price swings":"oscilaciones de precio",
    "quick reset":"reinicio r\xE1pido"
  },
  it: {
    "tx as a receipt":"tx come ricevuta","transaction hash":"hash della transazione",
    "block explorer":"explorer blockchain","network":"rete","base network":"rete Base",
    "Interface":"Interfaccia","website":"sito web","confirm":"conferma","execution":"esecuzione",
    "tokenomics":"tokenomics","crypto taxes":"tasse crypto","real yield":"rendimento reale",
    "approval":"approvazione","approvals":"approvazioni","spending cap":"limite di spesa",
    "allowance":"autorizzazione","revoke approval":"revoca approvazione",
    "wallet connection":"connessione wallet","normal login":"accesso normale",
    "clone site":"sito clone","fake support":"supporto falso","support staff":"staff di supporto",
    "wrong address":"indirizzo errato","malicious transaction":"transazione malevola",
    "private key leak":"fuga della chiave privata","seed phrase leak":"fuga della seed phrase",
    "risk management":"gestione del rischio","position sizing":"dimensionamento posizione",
    "term length":"durata","investor discipline":"disciplina dell'investitore",
    "capital preservation":"preservazione del capitale","money management":"gestione del denaro",
    "operational security":"sicurezza operativa","self-custody":"autocustodia",
    "price swings":"oscillazioni di prezzo","quick reset":"reset rapido"
  },
  fr: {
    "tx as a receipt":"tx comme re\xE7u","transaction hash":"hash de transaction",
    "block explorer":"explorateur de blocs","network":"r\xE9seau","base network":"r\xE9seau Base",
    "Interface":"Interface","website":"site web","confirm":"confirmer","execution":"ex\xE9cution",
    "tokenomics":"tokenomics","crypto taxes":"fiscalit\xE9 crypto","real yield":"rendement r\xE9el",
    "approval":"approbation","approvals":"approbations","spending cap":"plafond de d\xE9pense",
    "allowance":"autorisation","revoke approval":"r\xE9voquer l'approbation",
    "wallet connection":"connexion du portefeuille","normal login":"connexion classique",
    "clone site":"site clon\xE9","fake support":"faux support","support staff":"\xE9quipe support",
    "wrong address":"mauvaise adresse","malicious transaction":"transaction malveillante",
    "private key leak":"fuite de cl\xE9 priv\xE9e","seed phrase leak":"fuite de phrase de r\xE9cup\xE9ration",
    "risk management":"gestion des risques","position sizing":"dimensionnement de position",
    "term length":"dur\xE9e","investor discipline":"discipline de l'investisseur",
    "capital preservation":"pr\xE9servation du capital","money management":"gestion de l'argent",
    "operational security":"s\xE9curit\xE9 op\xE9rationnelle","self-custody":"auto-garde",
    "price swings":"variations de prix","quick reset":"r\xE9initialisation rapide"
  },
  de: {
    "tx as a receipt":"TX als Beleg","transaction hash":"Transaktions-Hash",
    "block explorer":"Block-Explorer","network":"Netzwerk","base network":"Base-Netzwerk",
    "Interface":"Oberfl\xE4che","website":"Website","confirm":"Best\xE4tigen","execution":"Ausf\xFChrung",
    "tokenomics":"Tokenomics","crypto taxes":"Krypto-Steuern","real yield":"reale Rendite",
    "approval":"Freigabe","approvals":"Freigaben","spending cap":"Ausgabenlimit",
    "allowance":"Berechtigung","revoke approval":"Freigabe widerrufen",
    "wallet connection":"Wallet-Verbindung","normal login":"normale Anmeldung",
    "clone site":"Klonseite","fake support":"falscher Support","support staff":"Support-Team",
    "wrong address":"falsche Adresse","malicious transaction":"b\xF6sartige Transaktion",
    "private key leak":"Leak des privaten Schl\xFCssels","seed phrase leak":"Leak der Seed-Phrase",
    "risk management":"Risikomanagement","position sizing":"Positionsgr\xF6\xDFe",
    "term length":"Laufzeit","investor discipline":"Investor-Disziplin",
    "capital preservation":"Kapitalerhalt","money management":"Geldmanagement",
    "operational security":"operative Sicherheit","self-custody":"Selbstverwahrung",
    "price swings":"Preisschwankungen","quick reset":"Schnell-Reset"
  },
  pt: {
    "tx as a receipt":"tx como comprovativo","transaction hash":"hash da transa\xE7\xE3o",
    "block explorer":"explorador de blocos","network":"rede","base network":"rede Base",
    "Interface":"Interface","website":"site web","confirm":"confirmar","execution":"execu\xE7\xE3o",
    "tokenomics":"tokenomics","crypto taxes":"impostos cripto","real yield":"rendimento real",
    "approval":"aprova\xE7\xE3o","approvals":"aprova\xE7\xF5es","spending cap":"limite de gastos",
    "allowance":"permiss\xE3o","revoke approval":"revogar aprova\xE7\xE3o",
    "wallet connection":"conex\xE3o da carteira","normal login":"login normal",
    "clone site":"site clonado","fake support":"suporte falso","support staff":"equipa de suporte",
    "wrong address":"endere\xE7o errado","malicious transaction":"transa\xE7\xE3o maliciosa",
    "private key leak":"vazamento de chave privada","seed phrase leak":"vazamento da frase-semente",
    "risk management":"gest\xE3o de risco","position sizing":"dimensionamento da posi\xE7\xE3o",
    "term length":"prazo","investor discipline":"disciplina do investidor",
    "capital preservation":"preserva\xE7\xE3o de capital","money management":"gest\xE3o de dinheiro",
    "operational security":"seguran\xE7a operacional","self-custody":"autocust\xF3dia",
    "price swings":"oscila\xE7\xF5es de pre\xE7o","quick reset":"rein\xEDcio r\xE1pido"
  },
  pl: {
    "tx as a receipt":"tx jako potwierdzenie","transaction hash":"hash transakcji",
    "block explorer":"eksplorator blok\xF3w","network":"sie\u0107","base network":"sie\u0107 Base",
    "Interface":"Interfejs","website":"strona internetowa","confirm":"potwierd\u017A","execution":"wykonanie",
    "tokenomics":"tokenomika","crypto taxes":"podatki krypto","real yield":"realny zwrot",
    "approval":"zatwierdzenie","approvals":"zatwierdzenia","spending cap":"limit wydatk\xF3w",
    "allowance":"limit zgody","revoke approval":"cofnij zatwierdzenie",
    "wallet connection":"po\u0142\u0105czenie portfela","normal login":"standardowe logowanie",
    "clone site":"sklonowana strona","fake support":"fa\u0142szywe wsparcie","support staff":"personel wsparcia",
    "wrong address":"b\u0142\u0119dny adres","malicious transaction":"z\u0142o\u015Bliwa transakcja",
    "private key leak":"wyciek klucza prywatnego","seed phrase leak":"wyciek frazy seed",
    "risk management":"zarz\u0105dzanie ryzykiem","position sizing":"wielko\u015B\u0107 pozycji",
    "term length":"okres","investor discipline":"dyscyplina inwestora",
    "capital preservation":"ochrona kapita\u0142u","money management":"zarz\u0105dzanie pieni\u0119dzmi",
    "operational security":"bezpiecze\u0144stwo operacyjne","self-custody":"samodzielna kustodia",
    "price swings":"wahania cen","quick reset":"szybki reset"
  },
  el: {
    "tx as a receipt":"tx \u03C9\u03C2 \u03B1\u03C0\u03CC\u03B4\u03B5\u03B9\u03BE\u03B7","transaction hash":"hash \u03C3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE\u03C2",
    "block explorer":"\u03B5\u03BE\u03B5\u03C1\u03B5\u03C5\u03BD\u03B7\u03C4\u03AE\u03C2 \u03BC\u03C0\u03BB\u03BF\u03BA","network":"\u03B4\u03AF\u03BA\u03C4\u03C5\u03BF","base network":"\u03B4\u03AF\u03BA\u03C4\u03C5\u03BF Base",
    "Interface":"\u0394\u03B9\u03B5\u03C0\u03B1\u03C6\u03AE","website":"\u03B9\u03C3\u03C4\u03BF\u03C3\u03B5\u03BB\u03AF\u03B4\u03B1","confirm":"\u03B5\u03C0\u03B9\u03B2\u03B5\u03B2\u03B1\u03AF\u03C9\u03C3\u03B7","execution":"\u03B5\u03BA\u03C4\u03AD\u03BB\u03B5\u03C3\u03B7",
    "tokenomics":"tokenomics","crypto taxes":"\u03C6\u03CC\u03C1\u03BF\u03B9 \u03BA\u03C1\u03CD\u03C0\u03C4\u03BF","real yield":"\u03C0\u03C1\u03B1\u03B3\u03BC\u03B1\u03C4\u03B9\u03BA\u03AE \u03B1\u03C0\u03CC\u03B4\u03BF\u03C3\u03B7",
    "approval":"\u03AD\u03B3\u03BA\u03C1\u03B9\u03C3\u03B7","approvals":"\u03B5\u03B3\u03BA\u03C1\u03AF\u03C3\u03B5\u03B9\u03C2","spending cap":"\u03CC\u03C1\u03B9\u03BF \u03B4\u03B1\u03C0\u03B1\u03BD\u03CE\u03BD",
    "allowance":"\u03CC\u03C1\u03B9\u03BF \u03AD\u03B3\u03BA\u03C1\u03B9\u03C3\u03B7\u03C2","revoke approval":"\u03B1\u03BD\u03AC\u03BA\u03BB\u03B7\u03C3\u03B7 \u03AD\u03B3\u03BA\u03C1\u03B9\u03C3\u03B7\u03C2",
    "wallet connection":"\u03C3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7 \u03C0\u03BF\u03C1\u03C4\u03BF\u03C6\u03BF\u03BB\u03B9\u03BF\u03CD","normal login":"\u03BA\u03B1\u03BD\u03BF\u03BD\u03B9\u03BA\u03AE \u03C3\u03CD\u03BD\u03B4\u03B5\u03C3\u03B7",
    "clone site":"\u03BA\u03BB\u03C9\u03BD\u03BF\u03C0\u03BF\u03B9\u03B7\u03BC\u03AD\u03BD\u03BF\u03C2 \u03B9\u03C3\u03C4\u03CC\u03C4\u03BF\u03C0\u03BF\u03C2","fake support":"\u03C8\u03B5\u03CD\u03C4\u03B9\u03BA\u03B7 \u03C5\u03C0\u03BF\u03C3\u03C4\u03AE\u03C1\u03B9\u03BE\u03B7","support staff":"\u03BF\u03BC\u03AC\u03B4\u03B1 \u03C5\u03C0\u03BF\u03C3\u03C4\u03AE\u03C1\u03B9\u03BE\u03B7\u03C2",
    "wrong address":"\u03BB\u03B1\u03BD\u03B8\u03B1\u03C3\u03BC\u03AD\u03BD\u03B7 \u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7","malicious transaction":"\u03BA\u03B1\u03BA\u03CC\u03B2\u03BF\u03C5\u03BB\u03B7 \u03C3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE",
    "private key leak":"\u03B4\u03B9\u03B1\u03C1\u03C1\u03BF\u03AE \u03B9\u03B4\u03B9\u03C9\u03C4\u03B9\u03BA\u03BF\u03CD \u03BA\u03BB\u03B5\u03B9\u03B4\u03B9\u03BF\u03CD","seed phrase leak":"\u03B4\u03B9\u03B1\u03C1\u03C1\u03BF\u03AE \u03C6\u03C1\u03AC\u03C3\u03B7\u03C2 seed",
    "risk management":"\u03B4\u03B9\u03B1\u03C7\u03B5\u03AF\u03C1\u03B9\u03C3\u03B7 \u03BA\u03B9\u03BD\u03B4\u03CD\u03BD\u03BF\u03C5","position sizing":"\u03BC\u03AD\u03B3\u03B5\u03B8\u03BF\u03C2 \u03B8\u03AD\u03C3\u03B7\u03C2",
    "term length":"\u03B4\u03B9\u03AC\u03C1\u03BA\u03B5\u03B9\u03B1","investor discipline":"\u03C0\u03B5\u03B9\u03B8\u03B1\u03C1\u03C7\u03AF\u03B1 \u03B5\u03C0\u03B5\u03BD\u03B4\u03C5\u03C4\u03AE",
    "capital preservation":"\u03B4\u03B9\u03B1\u03C4\u03AE\u03C1\u03B7\u03C3\u03B7 \u03BA\u03B5\u03C6\u03B1\u03BB\u03B1\u03AF\u03BF\u03C5","money management":"\u03B4\u03B9\u03B1\u03C7\u03B5\u03AF\u03C1\u03B9\u03C3\u03B7 \u03C7\u03C1\u03B7\u03BC\u03AC\u03C4\u03C9\u03BD",
    "operational security":"\u03BB\u03B5\u03B9\u03C4\u03BF\u03C5\u03C1\u03B3\u03B9\u03BA\u03AE \u03B1\u03C3\u03C6\u03AC\u03BB\u03B5\u03B9\u03B1","self-custody":"\u03B1\u03C5\u03C4\u03BF\u03B4\u03B9\u03B1\u03C7\u03B5\u03AF\u03C1\u03B9\u03C3\u03B7",
    "price swings":"\u03B4\u03B9\u03B1\u03BA\u03C5\u03BC\u03AC\u03BD\u03C3\u03B5\u03B9\u03C2 \u03C4\u03B9\u03BC\u03CE\u03BD","quick reset":"\u03B3\u03C1\u03AE\u03B3\u03BF\u03C1\u03B7 \u03B5\u03C0\u03B1\u03BD\u03B1\u03C6\u03BF\u03C1\u03AC"
  },
  tr: {
    "tx as a receipt":"makbuz olarak tx","transaction hash":"i\u015Flem hash'i",
    "block explorer":"blok gezgini","network":"a\u011F","base network":"Base a\u011F\u0131",
    "Interface":"Aray\xFCz","website":"web sitesi","confirm":"onayla","execution":"y\xFCr\xFCtme",
    "tokenomics":"tokenomi","crypto taxes":"kripto vergileri","real yield":"ger\xE7ek getiri",
    "approval":"onay","approvals":"onaylar","spending cap":"harcama limiti",
    "allowance":"izin limiti","revoke approval":"onay\u0131 iptal et",
    "wallet connection":"c\xFCzdan ba\u011Flant\u0131s\u0131","normal login":"normal giri\u015F",
    "clone site":"klon site","fake support":"sahte destek","support staff":"destek ekibi",
    "wrong address":"yanl\u0131\u015F adres","malicious transaction":"k\xF6t\xFC ama\xE7l\u0131 i\u015Flem",
    "private key leak":"\xF6zel anahtar s\u0131z\u0131nt\u0131s\u0131","seed phrase leak":"kurtarma ifadesi s\u0131z\u0131nt\u0131s\u0131",
    "risk management":"risk y\xF6netimi","position sizing":"pozisyon boyutland\u0131rma",
    "term length":"vade","investor discipline":"yat\u0131r\u0131mc\u0131 disiplini",
    "capital preservation":"sermaye korumas\u0131","money management":"para y\xF6netimi",
    "operational security":"operasyonel g\xFCvenlik","self-custody":"\xF6z saklama",
    "price swings":"fiyat dalgalanmalar\u0131","quick reset":"h\u0131zl\u0131 s\u0131f\u0131rlama"
  },
  ko: {
    "tx as a receipt":"\uC601\uC218\uC99D\uC73C\uB85C\uC11C\uC758 tx","transaction hash":"\uD2B8\uB79C\uC7AD\uC158 \uD574\uC2DC",
    "block explorer":"\uBE14\uB85D \uC775\uC2A4\uD50C\uB85C\uB7EC","network":"\uB124\uD2B8\uC6CC\uD06C","base network":"Base \uB124\uD2B8\uC6CC\uD06C",
    "Interface":"\uC778\uD130\uD398\uC774\uC2A4","website":"\uC6F9\uC0AC\uC774\uD2B8","confirm":"\uD655\uC778","execution":"\uC2E4\uD589",
    "tokenomics":"\uD1A0\uD06C\uB178\uBBF9\uC2A4","crypto taxes":"\uC554\uD638\uD654\uD3D0 \uC138\uAE08","real yield":"\uC2E4\uC9C8 \uC218\uC775\uB960",
    "approval":"\uC2B9\uC778","approvals":"\uC2B9\uC778","spending cap":"\uC9C0\uCD9C \uD55C\uB3C4",
    "allowance":"\uD5C8\uC6A9 \uD55C\uB3C4","revoke approval":"\uC2B9\uC778 \uCDE8\uC18C",
    "wallet connection":"\uC9C0\uAC11 \uC5F0\uACB0","normal login":"\uC77C\uBC18 \uB85C\uADF8\uC778",
    "clone site":"\uBCF5\uC81C \uC0AC\uC774\uD2B8","fake support":"\uAC00\uC9DC \uC9C0\uC6D0","support staff":"\uC9C0\uC6D0\uD300",
    "wrong address":"\uC798\uBABB\uB41C \uC8FC\uC18C","malicious transaction":"\uC545\uC131 \uAC70\uB798",
    "private key leak":"\uAC1C\uC778 \uD0A4 \uC720\uCD9C","seed phrase leak":"\uC2DC\uB4DC \uAD6C\uBB38 \uC720\uCD9C",
    "risk management":"\uB9AC\uC2A4\uD06C \uAD00\uB9AC","position sizing":"\uD3EC\uC9C0\uC158 \uD06C\uAE30",
    "term length":"\uAE30\uAC04","investor discipline":"\uD22C\uC790\uC790 \uADDC\uC728",
    "capital preservation":"\uC790\uBCF8 \uBCF4\uC804","money management":"\uC790\uAE08 \uAD00\uB9AC",
    "operational security":"\uC6B4\uC601 \uBCF4\uC548","self-custody":"\uC140\uD504 \uCEE4\uC2A4\uD130\uB514",
    "price swings":"\uAC00\uACA9 \uBCC0\uB3D9",
    "perpetual contract":"\uBB34\uAE30\uD55C \uACC4\uC57D","oracle":"\uC624\uB77C\uD074","liquidation":"\uAC15\uC81C \uCCAD\uC0B0",
    "rug pull":"\uB7ED\uD480","honeypot":"\uD5C8\uB2C8\uD31F","smart contract audit":"\uC2A4\uB9C8\uD2B8 \uCEE8\uD2B8\uB799\uD2B8 \uAC10\uC0AC",
    "over-collateralization":"\uACFC\uB2F4\uBCF4","flash loan":"\uD50C\uB798\uC2DC\uB860","MEV":"MEV",
    "quick reset":"\uBE60\uB978 \uC7AC\uC124\uC815"
  },
  zh: {
    "tx as a receipt":"\u4EA4\u6613\u4F5C\u4E3A\u51ED\u8BC1","transaction hash":"\u4EA4\u6613\u54C8\u5E0C",
    "block explorer":"\u533A\u5757\u6D4F\u89C8\u5668","network":"\u7F51\u7EDC","base network":"Base \u7F51\u7EDC",
    "Interface":"\u754C\u9762","website":"\u7F51\u7AD9","confirm":"\u786E\u8BA4","execution":"\u6267\u884C",
    "tokenomics":"\u4EE3\u5E01\u7ECF\u6D4E\u5B66","crypto taxes":"\u52A0\u5BC6\u7A0E\u52A1","real yield":"\u771F\u5B9E\u6536\u76CA",
    "approval":"\u6388\u6743","approvals":"\u6388\u6743","spending cap":"\u652F\u51FA\u4E0A\u9650",
    "allowance":"\u989D\u5EA6","revoke approval":"\u64A4\u9500\u6388\u6743",
    "wallet connection":"\u94B1\u5305\u8FDE\u63A5","normal login":"\u5E38\u89C4\u767B\u5F55",
    "clone site":"\u514B\u9686\u7F51\u7AD9","fake support":"\u5047\u5192\u5BA2\u670D","support staff":"\u5BA2\u670D\u4EBA\u5458",
    "wrong address":"\u9519\u8BEF\u5730\u5740","malicious transaction":"\u6076\u610F\u4EA4\u6613",
    "private key leak":"\u79C1\u94A5\u6CC4\u9732","seed phrase leak":"\u52A9\u8BB0\u8BCD\u6CC4\u9732",
    "risk management":"\u98CE\u9669\u7BA1\u7406","position sizing":"\u4ED3\u4F4D\u89C4\u6A21",
    "term length":"\u671F\u9650","investor discipline":"\u6295\u8D44\u8005\u7EAA\u5F8B",
    "capital preservation":"\u8D44\u672C\u4FDD\u5168","money management":"\u8D44\u91D1\u7BA1\u7406",
    "operational security":"\u8FD0\u8425\u5B89\u5168","self-custody":"\u81EA\u6258\u7BA1",
    "price swings":"\u4EF7\u683C\u6CE2\u52A8",
    "perpetual contract":"\u6C38\u7EED\u5408\u7EA6","oracle":"\u9884\u8A00\u673A","liquidation":"\u5F3A\u5236\u5E73\u4ED3",
    "rug pull":"\u8DD1\u8DEF","honeypot":"\u871C\u7F50","smart contract audit":"\u667A\u80FD\u5408\u7EA6\u5BA1\u8BA1",
    "over-collateralization":"\u8D85\u989D\u62B5\u62BC","flash loan":"\u95EA\u7535\u8D37","MEV":"MEV",
    "quick reset":"\u5FEB\u901F\u91CD\u7F6E"
  },
  ja: {
    "tx as a receipt":"\u9818\u53CE\u66F8\u3068\u3057\u3066\u306Etx","transaction hash":"\u30C8\u30E9\u30F3\u30B6\u30AF\u30B7\u30E7\u30F3\u30CF\u30C3\u30B7\u30E5",
    "block explorer":"\u30D6\u30ED\u30C3\u30AF\u30A8\u30AF\u30B9\u30D7\u30ED\u30FC\u30E9\u30FC","network":"\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF","base network":"Base\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF",
    "Interface":"\u30A4\u30F3\u30BF\u30FC\u30D5\u30A7\u30FC\u30B9","website":"\u30A6\u30A7\u30D6\u30B5\u30A4\u30C8","confirm":"\u78BA\u8A8D","execution":"\u5B9F\u884C",
    "tokenomics":"\u30C8\u30FC\u30AF\u30CE\u30DF\u30AF\u30B9","crypto taxes":"\u6697\u53F7\u8CC7\u7523\u7A0E","real yield":"\u5B9F\u8CEA\u5229\u56DE\u308A",
    "approval":"\u627F\u8A8D","approvals":"\u627F\u8A8D","spending cap":"\u652F\u51FA\u4E0A\u9650",
    "allowance":"\u8A31\u53EF\u984D","revoke approval":"\u627F\u8A8D\u3092\u53D6\u308A\u6D88\u3059",
    "wallet connection":"\u30A6\u30A9\u30EC\u30C3\u30C8\u63A5\u7D9A","normal login":"\u901A\u5E38\u30ED\u30B0\u30A4\u30F3",
    "clone site":"\u30AF\u30ED\u30FC\u30F3\u30B5\u30A4\u30C8","fake support":"\u507D\u30B5\u30DD\u30FC\u30C8","support staff":"\u30B5\u30DD\u30FC\u30C8\u62C5\u5F53",
    "wrong address":"\u8AA4\u3063\u305F\u30A2\u30C9\u30EC\u30B9","malicious transaction":"\u60AA\u610F\u306E\u3042\u308B\u53D6\u5F15",
    "private key leak":"\u79D8\u5BC6\u9375\u306E\u6F0F\u6D29","seed phrase leak":"\u30B7\u30FC\u30C9\u30D5\u30EC\u30FC\u30BA\u306E\u6F0F\u6D29",
    "risk management":"\u30EA\u30B9\u30AF\u7BA1\u7406","position sizing":"\u30DD\u30B8\u30B7\u30E7\u30F3\u30B5\u30A4\u30BA",
    "term length":"\u671F\u9593","investor discipline":"\u6295\u8CC7\u5BB6\u306E\u898F\u5F8B",
    "capital preservation":"\u8CC7\u672C\u4FDD\u5168","money management":"\u8CC7\u91D1\u7BA1\u7406",
    "operational security":"\u904B\u7528\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3","self-custody":"\u30BB\u30EB\u30D5\u30AB\u30B9\u30C8\u30C7\u30A3",
    "price swings":"\u4FA1\u683C\u5909\u52D5",
    "perpetual contract":"\u7121\u671F\u9650\u5951\u7D04","oracle":"\u30AA\u30E9\u30AF\u30EB","liquidation":"\u6E05\u7B97",
    "rug pull":"\u30E9\u30B0\u30D7\u30EB","honeypot":"\u30CF\u30CB\u30FC\u30DD\u30C3\u30C8","smart contract audit":"\u30B9\u30DE\u30FC\u30C8\u30B3\u30F3\u30C8\u30E9\u30AF\u30C8\u76E3\u67FB",
    "over-collateralization":"\u904E\u5270\u62C5\u4FDD","flash loan":"\u30D5\u30E9\u30C3\u30B7\u30E5\u30ED\u30FC\u30F3","MEV":"MEV",
    "quick reset":"\u30AF\u30A4\u30C3\u30AF\u30EA\u30BB\u30C3\u30C8"
  }
};

function getGlossary(lang) {
  return { ...(GLOSSARY[lang] || {}), ...(COURSE_GLOSSARY[lang] || {}) };
}

function glossaryExact(sourceText, lang) {
  const gl = getGlossary(lang);
  if (typeof FintechGlossary === "undefined" || !FintechGlossary.glossaryResolve) {
    if (gl[sourceText] !== undefined) return gl[sourceText];
    const lower = sourceText.toLowerCase();
    if (gl[lower] !== undefined) return gl[lower];
    return null;
  }
  return FintechGlossary.glossaryResolve(sourceText, gl, { isLocked: isLockedTerm });
}

const PRICING = {
  "gpt-5.5-nano": { i: 0.25, o: 1.50 },
  "gpt-5.5-mini": { i: 0.90, o: 5.00 },
  "gpt-5.5":      { i: 3.50, o: 17.0 },
  "gpt-5.4-nano": { i: 0.20, o: 1.25 },
  "gpt-5.4-mini": { i: 0.75, o: 4.50 },
  "gpt-5.4":      { i: 3.00, o: 15.0 },
  "gpt-4o-mini":  { i: 0.15, o: 0.60 },
  "gpt-4o":       { i: 2.50, o: 10.0 },
};

/* ================================================================== */
/*  State                                                              */
/* ================================================================== */
let provider = "free";
let framesData = [];
let busy = false;
let cache = {};
let cacheLoaded = false;
let cacheDirty = false;

function persistCache() {
  if (!cacheDirty) return;
  cacheDirty = false;
  const keys = Object.keys(cache);
  const trimmed = {};
  const slice = keys.slice(-2000);
  for (const k of slice) trimmed[k] = cache[k];
  parent.postMessage({ pluginMessage: { type: "save-cache", data: trimmed } }, "*");
}

/* ================================================================== */
/*  DOM                                                                */
/* ================================================================== */
const $ = (s) => document.getElementById(s);
const $apiKey       = $("apiKey");
const $saveKey      = $("saveKey");
const $toggleKey    = $("toggleKey");
const $model        = $("model");
const $scanBtn      = $("scanBtn");
const $translateBtn = $("translateBtn");
const $translateLbl = $("translateLabel");
const $applyBtn     = $("applyBtn");
const $applyLbl     = null;
const $previewSec   = $("previewSection");
const $previewBox   = $("previewBox");
const $countBadge   = $("countBadge");
const $costSection  = $("costSection");
const $costCard     = $("costCard");
const $costHint     = $("costHint");
const $progressSec  = $("progressSection");
const $progressBar  = $("progressBar");
const $progressLbl  = $("progressLabel");
const $logArea      = $("logArea");
const $scrollWrap   = document.querySelector(".scroll");
const $emptyState   = $("emptyState");
const $proSettings  = $("proSettings");
const $lockTerms    = $("lockTerms");
const $smartWrap    = $("smartWrap");
const $expandFrames = document.getElementById("expandFrames");
const $sidePadding  = $("sidePadding");
const $padMinus     = $("padMinus");
const $padPlus      = $("padPlus");
const $reviewSec    = $("reviewSection");
const $reviewTabs   = $("reviewTabs");
const $reviewRows   = $("reviewRows");
const $reviewSummary = $("reviewSummary");
const $syncRefBtn    = $("syncRefBtn");
const $cancelBtn     = $("cancelBtn");

let translatedStore = {};  // { "es": [ {original, translated, path, frameId} ], ... }
let canvasApplied = false;
let activeReviewLang = null;
let cancelRequested = false;
let myMemoryCharsUsed = 0;

/* ================================================================== */
/*  Provider toggle                                                    */
/* ================================================================== */
document.querySelectorAll(".toggle-opt").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".toggle-opt").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    provider = btn.dataset.provider;
    $proSettings.classList.toggle("hidden", provider === "free");
    updateCost();
    saveSettings();
  });
});

/* ================================================================== */
/*  Language chips                                                     */
/* ================================================================== */
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const cb = chip.querySelector("input");
    if (!cb || cb.id === "smartWrap") return;
    requestAnimationFrame(() => {
      chip.classList.toggle("on", cb.checked);
      updateCost();
      saveSettings();
    });
  });
});

if ($smartWrap) {
  $smartWrap.addEventListener("change", () => {
    saveSettings();
  });
}
if ($expandFrames) {
  $expandFrames.addEventListener("change", () => {
    saveSettings();
  });
}

if ($sidePadding) {
  $sidePadding.addEventListener("input", () => {
    const n = Number($sidePadding.value || 0);
    if (!Number.isFinite(n) || n < 0) $sidePadding.value = "0";
    if (n > 80) $sidePadding.value = "80";
    updateCost();
    saveSettings();
  });
}
if ($padMinus && $sidePadding) {
  $padMinus.addEventListener("click", () => {
    const n = Math.max(0, Number($sidePadding.value || 0) - 1);
    $sidePadding.value = String(n);
    saveSettings();
  });
}
if ($padPlus && $sidePadding) {
  $padPlus.addEventListener("click", () => {
    const n = Math.min(80, Number($sidePadding.value || 0) + 1);
    $sidePadding.value = String(n);
    saveSettings();
  });
}

const $autoFontScale = document.getElementById("autoFontScale");
const $minFontSize   = document.getElementById("minFontSize");
const $minFontMinus  = document.getElementById("minFontMinus");
const $minFontPlus   = document.getElementById("minFontPlus");
const $minFontGroup  = document.getElementById("minFontGroup");

function syncFontScaleUI() {
  const on = $autoFontScale && $autoFontScale.checked;
  if ($minFontGroup) {
    $minFontGroup.style.opacity       = on ? "1" : "0.4";
    $minFontGroup.style.pointerEvents = on ? "auto" : "none";
  }
}
if ($autoFontScale) {
  $autoFontScale.addEventListener("change", function() { syncFontScaleUI(); saveSettings(); });
  syncFontScaleUI();
}
const $smartFitRecommendedBtn = $("smartFitRecommendedBtn");
if ($smartFitRecommendedBtn) {
  $smartFitRecommendedBtn.addEventListener("click", () => {
    if ($smartWrap) $smartWrap.checked = true;
    if ($expandFrames) $expandFrames.checked = true;
    if ($autoFontScale) $autoFontScale.checked = false;
    if ($sidePadding) $sidePadding.value = "16";
    syncFontScaleUI();
    saveSettings();
    log("Smart Fit: recommended defaults (wrap + grow on, scale off, padding 16)", "info");
  });
}
if ($minFontMinus && $minFontSize) {
  $minFontMinus.addEventListener("click", () => {
    const n = Math.max(6, Number($minFontSize.value || 8) - 1);
    $minFontSize.value = String(n);
    saveSettings();
  });
}
if ($minFontPlus && $minFontSize) {
  $minFontPlus.addEventListener("click", () => {
    const n = Math.min(24, Number($minFontSize.value || 8) + 1);
    $minFontSize.value = String(n);
    saveSettings();
  });
}

function selectedLangs() {
  return [...document.querySelectorAll(".chip input:checked")].map(i => i.value);
}

/* ================================================================== */
/*  API Key                                                            */
/* ================================================================== */
$toggleKey.addEventListener("click", () => {
  $apiKey.type = $apiKey.type === "password" ? "text" : "password";
});
$saveKey.addEventListener("click", () => {
  const k = $apiKey.value.trim();
  if (!k) return;
  if (!k.startsWith("sk-")) {
    log("Key must start with sk-... (not sess- or other)", "err");
    return;
  }
  parent.postMessage({ pluginMessage: { type: "save-key", key: k } }, "*");
  log("API key saved", "ok");
});

$cancelBtn.addEventListener("click", function() {
  cancelRequested = true;
  $cancelBtn.disabled = true;
  $cancelBtn.textContent = "Cancelling\u2026";
});

$model.addEventListener("change", () => { updateCost(); saveSettings(); });
if ($lockTerms) $lockTerms.addEventListener("input", () => saveSettings());

/* ================================================================== */
/*  UI helpers                                                         */
/* ================================================================== */
function scrollToEl(el) {
  if (!$scrollWrap || !el) return;
  // Small timeout lets the DOM render before measuring positions.
  setTimeout(function() {
    var top = el.getBoundingClientRect().top - $scrollWrap.getBoundingClientRect().top;
    $scrollWrap.scrollBy({ top: top - 12, behavior: "smooth" });
  }, 60);
}

function log(msg, cls, noAutoScroll) {
  const d = document.createElement("div");
  d.className = "log-line fade-in " + (cls || "info");
  d.innerHTML = '<span class="dot"></span>' + esc(msg);
  // Append (newest at bottom) so scrolling down shows latest.
  $logArea.appendChild(d);
  if ($scrollWrap && !noAutoScroll) {
    $scrollWrap.scrollTop = $scrollWrap.scrollHeight;
  }
}

function setProgress(pct, text) {
  const wasHidden = $progressSec.classList.contains("hidden");
  $progressSec.classList.remove("hidden");
  $progressBar.style.width = pct + "%";
  $progressLbl.textContent = text;
  // Scroll into view when progress section first appears.
  if (wasHidden) scrollToEl($progressSec);
}

function setBusy(v) {
  busy = v;
  $scanBtn.disabled = v;
  if ($syncRefBtn) $syncRefBtn.disabled = v;
  const applyShowing = $applyBtn && !$applyBtn.classList.contains("hidden");
  if (applyShowing) {
    $applyBtn.disabled = v;
    $translateBtn.disabled = true;
  } else {
    $translateBtn.disabled = v;
    if ($applyBtn) $applyBtn.disabled = true;
  }
}

function esc(s) { return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

/* ================================================================== */
/*  Cost estimation                                                    */
/* ================================================================== */
function updateCost() {
  if (!framesData.length) { $costSection.classList.add("hidden"); $costHint.classList.add("hidden"); return; }

  const langs = selectedLangs();
  const totalStrings = framesData.reduce((s,f) => s + f.texts.length, 0);
  const totalChars   = framesData.reduce((s,f) => s + f.texts.reduce((a,t) => a + t.characters.length, 0), 0);
  const perLang = totalStrings * langs.length;

  if (provider === "free") {
    $costCard.innerHTML =
      '<div class="icon free">&#x2728;</div>' +
      '<div class="info">' +
        '<div class="price free-price">Free</div>' +
        '<div class="detail">' + perLang + ' strings via Google Translate &middot; No API key needed</div>' +
      '</div>';
    $costHint.textContent = "Free \u2014 powered by Google Translate";
    $costHint.classList.remove("hidden");
  } else {
    const model = $model.value;
    const p = PRICING[model] || PRICING["gpt-5.5-mini"];
    const sysTokens = 500;
    const inTokens  = Math.ceil(totalChars / 3.5) + sysTokens;
    const outTokens = Math.ceil(totalChars / 3.5);
    const costPerLang = (inTokens * p.i + outTokens * p.o) / 1_000_000;
    const totalCost = costPerLang * langs.length;
    const display = totalCost < 0.01 ? "<$0.01" : "$" + totalCost.toFixed(3);

    $costCard.innerHTML =
      '<div class="icon paid">&#x26A1;</div>' +
      '<div class="info">' +
        '<div class="price paid-price">~' + display + '</div>' +
        '<div class="detail">' + perLang + ' strings &middot; ' + model + ' &middot; ~' + (inTokens + outTokens) + ' tokens</div>' +
      '</div>';
    $costHint.textContent = "Est. ~" + display;
    $costHint.classList.remove("hidden");
  }

  $costSection.classList.remove("hidden");
}

/* ================================================================== */
/*  Scan                                                               */
/* ================================================================== */
const $rescanWarn = $("rescanWarn");
const $rescanLink = $("rescanLink");

function hideRescanWarn() {
  if ($rescanWarn) $rescanWarn.classList.add("hidden");
}
function showRescanWarn() {
  if ($rescanWarn && framesData.length > 0) $rescanWarn.classList.remove("hidden");
}

function doScan() {
  if (busy) return;
  hideRescanWarn();
  parent.postMessage({ pluginMessage: { type: "scan" } }, "*");
}

$scanBtn.addEventListener("click", doScan);
if ($rescanLink) {
  $rescanLink.addEventListener("click", function() { doScan(); });
}

function fitOptionsPayload() {
  return {
    smartWrap:     !!($smartWrap     && $smartWrap.checked),
    sidePadding:   Number(($sidePadding  && $sidePadding.value)  || 0),
    expandFrames:  $expandFrames == null ? true : !!$expandFrames.checked,
    autoFontScale: !!($autoFontScale && $autoFontScale.checked),
    minFontSize:   Number(($minFontSize  && $minFontSize.value)   || 8),
  };
}

if ($syncRefBtn) {
  $syncRefBtn.addEventListener("click", function() {
    if (busy) return;
    const langs = selectedLangs();
    if (!langs.length) { log("Select at least one target language", "err"); return; }
    if (provider === "openai" && !$apiKey.value.trim()) { log("Enter OpenAI API key", "err"); return; }
    setBusy(true);
    $progressSec.classList.remove("hidden");
    setProgress(0, "Reading source frame\u2026");
    parent.postMessage({ pluginMessage: { type: "sync-reference-scan", langs: langs } }, "*");
  });
}

/* ================================================================== */
/*  Helpers: cleanup                                                   */
/* ================================================================== */
function stripTags(s) {
  return s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
}

function looksTranslated(original, translated) {
  if (!translated || !translated.trim()) return false;
  const a = original.toLowerCase().trim();
  const b = translated.toLowerCase().trim();
  if (a === b) return false;
  if (b.includes("<g ") || b.includes("</g>")) return false;
  return true;
}

/**
 * Split trailing sentence punctuation from the last non-whitespace run (mirrors source vs API).
 * Preserves spaces after punctuation in \`.after\` (unusual in UI but keeps layout faithful).
 */
function splitTrailingSentencePunct(s) {
  if (!s) return { core: "", punct: "", after: "" };
  let i = s.length - 1;
  while (i >= 0 && /\\s/.test(s[i])) i--;
  const after = s.slice(i + 1);
  if (i < 0) return { core: "", punct: "", after: after };
  let j = i;
  while (j >= 0 && /[.!?\u2026:;\\u2026\\u3002\\uFF01\\uFF1F\\uFF1A\\uFF1B\\uFF0E\\uFE52]/.test(s[j])) j--;
  const punct = s.slice(j + 1, i + 1);
  const core = s.slice(0, j + 1);
  return { core, punct, after };
}

/** If source has no lowercase letters, uppercase the whole translation (e.g. VIP, OK). */
function mirrorLetterCase(origCore, transCore) {
  if (!transCore) return transCore;
  if (!/\\p{L}/u.test(origCore)) return transCore;

  if (!/\\p{Ll}/u.test(origCore)) {
    return transCore.toLocaleUpperCase("en-US");
  }

  const tm = transCore.match(/\\p{L}/u);
  const om = origCore.match(/\\p{L}/u);
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
function applySourceFormatting(original, translated) {
  if (translated == null || translated === "") return original;

  const lead = (original.match(/^\\s*/) || [""])[0];
  const trail = (original.match(/\\s*$/) || [""])[0];
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

/* Google / MyMemory expect zh-CN for simplified Chinese; UI chip stays "zh". */
function translateApiLang(lang) {
  return lang === "zh" ? "zh-CN" : lang;
}

/* ================================================================== */
/*  Retry helper                                                       */
/* ================================================================== */
async function withRetry(fn, retries, baseDelay) {
  retries = retries || 3;
  baseDelay = baseDelay || 400;
  let lastErr;
  for (let attempt = 0; attempt < retries; attempt++) {
    if (cancelRequested) throw new Error("Cancelled");
    try { return await fn(); } catch (e) {
      lastErr = e;
      if (attempt < retries - 1) await sleep(baseDelay * Math.pow(2, attempt));
    }
  }
  throw lastErr;
}

/* ================================================================== */
/*  Translation: Google Translate (free, primary)                      */
/* ================================================================== */
async function translateGoogle(text, lang) {
  return withRetry(async function() {
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" +
      translateApiLang(lang) + "&dt=t&q=" + encodeURIComponent(text);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Google Translate HTTP " + res.status);
    const data = await res.json();
    let result = "";
    if (data && data[0]) {
      for (const part of data[0]) {
        if (part && part[0]) result += part[0];
      }
    }
    return result.trim();
  }, 3, 500);
}

/* ================================================================== */
/*  Translation: MyMemory (free, fallback)                             */
/* ================================================================== */
/* MyMemory publishes ~5k chars/day for anonymous usage (see their FAQ); the API does not return a precise remaining quota.
   This value is a session-only safety budget so we do not spam MyMemory after Google failed; it resets when the plugin UI reloads. */
const MYMEMORY_SESSION_CHAR_BUDGET = 4500;

async function translateMyMemory(text, lang) {
  if (myMemoryCharsUsed + text.length > MYMEMORY_SESSION_CHAR_BUDGET) {
    throw new Error("MyMemory session budget exceeded (plugin session counter; reload resets). Use Pro or try later.");
  }
  return withRetry(async function() {
    const url = "https://api.mymemory.translated.net/get?q=" +
      encodeURIComponent(text) + "&langpair=en|" + translateApiLang(lang);
    const res = await fetch(url);
    if (!res.ok) throw new Error("MyMemory HTTP " + res.status);
    const data = await res.json();
    if (data.responseData && data.responseData.match !== undefined && data.responseData.match < 0.3) {
      throw new Error("MyMemory low-quality match");
    }
    myMemoryCharsUsed += text.length;
    return stripTags(data.responseData.translatedText || "");
  }, 2, 600);
}

/* ================================================================== */
/*  Free batch: Google primary \u2192 MyMemory fallback \u2192 parallel          */
/* ================================================================== */
async function translateOneFree(text, lang) {
  if (isDateEraLabel(text)) return text;
  const key = lang + ":" + text;
  if (cache[key]) return cache[key];

  const exact = glossaryExact(text, lang);
  if (exact) {
    const out = applySourceFormatting(text, exact);
    cache[key] = out;
    cacheDirty = true;
    return out;
  }

  let translated = "";
  let failedGoogle = false;
  try {
    translated = await translateGoogle(text, lang);
  } catch (e) {
    failedGoogle = true;
    if (e.message === "Cancelled") throw e;
  }

  if (!looksTranslated(text, translated)) {
    try {
      translated = await translateMyMemory(text, lang);
    } catch (e2) {
      if (e2.message === "Cancelled") throw e2;
      if (failedGoogle) log("Both APIs failed for: " + text.slice(0, 40), "warn");
    }
  }

  translated = stripTags(translated);
  if (!translated) translated = text;

  translated = applySourceFormatting(text, translated);
  cache[key] = translated;
  cacheDirty = true;
  return translated;
}

async function batchFree(texts, lang, onProg) {
  const CONCURRENCY = 5;
  const results = new Array(texts.length);
  let completed = 0;

  for (let start = 0; start < texts.length; start += CONCURRENCY) {
    if (cancelRequested) throw new Error("Cancelled");
    const end = Math.min(start + CONCURRENCY, texts.length);
    const chunk = [];
    for (let i = start; i < end; i++) {
      chunk.push(translateOneFree(texts[i], lang).then(function(r) {
        results[i] = r;
        completed++;
        onProg(completed, texts.length);
      }));
    }
    await Promise.all(chunk);
    if (end < texts.length) await sleep(30);
  }
  return results;
}

/* ================================================================== */
/*  Translation: OpenAI (pro)                                          */
/* ================================================================== */
function filterGlossary(gl, texts) {
  const pool = texts.join(" ").toLowerCase();
  const out = {};
  for (const [en, loc] of Object.entries(gl)) {
    if (pool.includes(en.toLowerCase())) out[en] = loc;
  }
  return out;
}

async function callOpenAI(texts, lang) {
  const key = $apiKey.value.trim();
  const model = $model.value;
  const gl = filterGlossary(getGlossary(lang), texts);
  const glBlock = Object.entries(gl).map(([e,t]) => '  "'+e+'" \u2192 "'+t+'"').join("\\n");

  const sys =
    "You are a professional fintech UI/UX translator.\\n" +
    "Translate every string from English to " + LANG_NAMES[lang] + ".\\n\\n" +
    "RULES:\\n" +
    "1. Formal, professional tone for financial apps.\\n" +
    "2. Preserve ALL placeholders: {var}, {{var}}, %s, %d, %@, $var.\\n" +
    "3. DATE / ERA / TIMELINE LABELS: any string that is primarily a date range, decade, year span, or timeline marker (e.g. \\"1900s~2000\\", \\"2000s~2020s\\", \\"2020s~?\\", \\"Q1 2024\\", \\"2020\u20132025\\") must be returned EXACTLY as-is, character-for-character. Do NOT spell out decades, do NOT rephrase, do NOT drop the \\"s\\" suffix, do NOT change ~ or \u2013 to other characters.\\n" +
    "4. Keep unchanged: KYC, AML, IBAN, SWIFT, BIC, API, PIN, OTP, 2FA, CVV, PCI, SEPA.\\n" +
    "5. Keep established tech/industry terms untranslated: Web 1.0, Web 2.0, Web 3.0, DeFi, NFT, DAO, DEX, CEX, DApp, Layer 1, Layer 2, staking, blockchain, token, wallet, smart contract, and all brand names.\\n" +
    "6. CONCISE \u2014 this is critical for UI cards and labels:\\n" +
    "   - Translation must match the source length as closely as possible.\\n" +
    "   - NEVER expand a short phrase into a verbose description.\\n" +
    "   - If source is \u2264 30 chars \u2192 translation must not exceed 130 % of source length.\\n" +
    "   - If source is \u2264 60 chars \u2192 translation must not exceed 120 % of source length.\\n" +
    "   - Prefer shorter synonyms and natural abbreviations in the target language.\\n" +
    "7. No extra punctuation.\\n" +
    "8. Preserve capitalisation (ALL CAPS \u2192 ALL CAPS, Title \u2192 Title).\\n" +
    "9. Preserve leading/trailing whitespace and terminal punctuation exactly as in source.\\n" +
    "10. Preserve ALL special characters verbatim: tildes (~), en-dashes (\u2013), em-dashes (\u2014), arrows (\u2192\u2190), bullets (\u2022), pipes (|), slashes (/). Never replace one with another.\\n\\n" +
    (glBlock ? "GLOSSARY (use these exact translations when the source matches):\\n" + glBlock + "\\n\\n" : "") +
    "INPUT: JSON array of source strings.\\n" +
    "OUTPUT: a JSON object with a single key \\"t\\" whose value is the translated array (same order, same count).\\n" +
    "Example: {\\"t\\": [\\"translated1\\", \\"translated2\\"]}\\n" +
    "Return ONLY valid JSON. No markdown, no explanation.";

  const body = {
    model,
    messages: [{ role: "system", content: sys }, { role: "user", content: JSON.stringify(texts) }],
    temperature: 0.1,
    response_format: { type: "json_object" },
  };

  return withRetry(async function() {
    if (cancelRequested) throw new Error("Cancelled");
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error((e.error && e.error.message) || "OpenAI " + res.status);
    }

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error.message || JSON.stringify(data.error).slice(0, 200));
    }
    if (!data.choices || !data.choices.length || !data.choices[0].message) {
      throw new Error("OpenAI returned unexpected response (no choices). Model may be unavailable.");
    }

    let content = data.choices[0].message.content.trim();
    if (content.startsWith("\`\`\`")) content = content.replace(/^\`\`\`(?:json)?\\n?/, "").replace(/\\n?\`\`\`$/, "");

    let parsed;
    try { parsed = JSON.parse(content); } catch (pe) {
      throw new Error("OpenAI returned invalid JSON: " + content.slice(0, 120));
    }

    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) && parsed.error) {
      const em = typeof parsed.error === "string" ? parsed.error
        : (parsed.error.message || JSON.stringify(parsed.error).slice(0, 200));
      throw new Error("OpenAI error: " + em);
    }

    let arr = parsed;

    if (typeof arr === "string") {
      arr = [arr];
    }

    if (!Array.isArray(arr) && typeof arr === "object" && arr !== null) {
      const keys = Object.keys(arr);
      for (const k of keys) {
        const v = arr[k];
        if (Array.isArray(v) && v.length === texts.length) { arr = v; break; }
      }
      if (!Array.isArray(arr)) {
        const strVals = keys.filter(function(k) { return typeof arr[k] === "string" && k !== "error"; });
        if (strVals.length === texts.length) {
          arr = strVals.map(function(k) { return arr[k]; });
        } else if (texts.length === 1 && strVals.length >= 1) {
          arr = [arr[strVals[0]]];
        }
      }
    }

    if (!Array.isArray(arr) || arr.length !== texts.length) {
      throw new Error("Expected " + texts.length + " translations, got " + (Array.isArray(arr) ? arr.length : "non-array") + "; raw: " + content.slice(0, 150));
    }
    return arr;
  }, 2, 1000);
}

async function batchOpenAI(texts, lang, onProg) {
  const BATCH = 40;
  const results = [];

  for (let i = 0; i < texts.length; i += BATCH) {
    const batch = texts.slice(i, i + BATCH);
    const uncachedIdx = [], uncachedTxt = [];
    const batchRes = new Array(batch.length);

    for (let j = 0; j < batch.length; j++) {
      if (shouldSkipTranslation(batch[j])) {
        batchRes[j] = batch[j];
        continue;
      }
      const k = lang + ":" + batch[j];
      const exact = glossaryExact(batch[j], lang);
      if (exact) {
        const out = applySourceFormatting(batch[j], exact);
        cache[k] = out;
        cacheDirty = true;
        batchRes[j] = out;
      } else if (cache[k] !== undefined) {
        batchRes[j] = cache[k];
      } else {
        uncachedIdx.push(j);
        uncachedTxt.push(batch[j]);
      }
    }

    if (uncachedTxt.length) {
      if (cancelRequested) throw new Error("Cancelled");
      const translated = await callOpenAI(uncachedTxt, lang);
      for (let k = 0; k < uncachedTxt.length; k++) {
        const ck = lang + ":" + uncachedTxt[k];
        const out = applySourceFormatting(uncachedTxt[k], translated[k]);
        cache[ck] = out;
        cacheDirty = true;
        batchRes[uncachedIdx[k]] = out;
      }
    }

    results.push(...batchRes);
    onProg(Math.min(i + BATCH, texts.length), texts.length);
  }
  return results;
}

/* ================================================================== */
/*  Lock terms helpers                                                 */
/* ================================================================== */
let _lockedSet = null;
let _lockedRaw = "";
function getLockedSet() {
  const raw = $lockTerms.value || "";
  if (raw === _lockedRaw && _lockedSet) return _lockedSet;
  _lockedRaw = raw;
  _lockedSet = new Set(raw.split(",").map(s => s.trim().toLowerCase()).filter(Boolean));
  return _lockedSet;
}

function isLockedTerm(text) {
  return getLockedSet().has(text.toLowerCase().trim());
}

const DATE_ERA_RE = /^\\s*\\d{4}s?\\s*[~\u2013\u2014\\-]\\s*(\\d{4}s?|\\?)\\s*$/;
function isDateEraLabel(text) {
  return DATE_ERA_RE.test(text);
}

function shouldSkipTranslation(text) {
  return isLockedTerm(text) || isDateEraLabel(text);
}

/* ================================================================== */
/*  Overflow detection                                                 */
/* ================================================================== */
function estimateWidth(s) {
  if (!s) return 0;
  let w = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    const isCJK = (c >= 0x3000 && c <= 0x9FFF) || (c >= 0xAC00 && c <= 0xD7AF) ||
                  (c >= 0xF900 && c <= 0xFAFF) || (c >= 0xFF01 && c <= 0xFF60);
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

function deltaClass(pct) {
  if (pct <= 15) return "ok";
  if (pct <= 35) return "warn";
  return "danger";
}

function deltaLabel(pct) {
  if (pct === 0) return "=";
  return (pct > 0 ? "+" : "") + pct + "%";
}

/* ================================================================== */
/*  Step 1: Translate (store results, show review)                     */
/* ================================================================== */
$translateBtn.addEventListener("click", async () => {
  if (busy) return;
  const langs = selectedLangs();
  if (!langs.length) { log("Select at least one language", "err"); return; }
  if (!framesData.length) { log("Scan a selection first", "err"); return; }
  if (provider === "openai" && !$apiKey.value.trim()) { log("Enter OpenAI API key", "err"); return; }

  cancelRequested = false;
  myMemoryCharsUsed = 0;
  canvasApplied = false;
  if ($applyBtn) {
    $applyBtn.classList.add("hidden");
    $applyBtn.disabled = true;
  }
  $translateBtn.classList.remove("hidden");
  setBusy(true);
  $cancelBtn.classList.remove("hidden");
  $cancelBtn.disabled = false;
  $cancelBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Cancel';
  $logArea.innerHTML = "";
  translatedStore = {};

  const steps = langs.length * framesData.length;
  let done = 0;

  try {
    for (let li = 0; li < langs.length; li++) {
      if (cancelRequested) throw new Error("Cancelled");
      const lang = langs[li];
      translatedStore[lang] = [];

      for (const frame of framesData) {
        if (cancelRequested) throw new Error("Cancelled");
        const allChars = frame.texts.map(t => t.characters);
        setProgress(Math.round(done / steps * 100), "[" + lang.toUpperCase() + "] \u2026");

        const onProg = (cur, tot) => {
          const gp = Math.round(((done + cur / tot) / steps) * 100);
          setProgress(gp, "[" + lang.toUpperCase() + "] " + Math.round(cur/tot*100) + "%");
        };

        const translated = provider === "free"
          ? await batchFree(allChars, lang, onProg)
          : await batchOpenAI(allChars, lang, onProg);

        for (let i = 0; i < frame.texts.length; i++) {
          const isLocked = shouldSkipTranslation(allChars[i]);
          translatedStore[lang].push({
            frameId: frame.id,
            frameName: frame.name,
            path: frame.texts[i].path,
            original: allChars[i],
            translated: isLocked ? allChars[i] : translated[i],
            locked: isLocked,
          });
        }

        done++;
        setProgress(Math.round(done / steps * 100), "[" + lang.toUpperCase() + "] \u2713");
        await sleep(100);
      }
    }

    setProgress(100, "Done \u2014 review Fit %, then apply");
    log("Translation ready. Check Review (Fit %), then use the button below to apply.", "ok");
    showReviewPanel(langs);
    $translateBtn.classList.add("hidden");
    if ($applyBtn) {
      $applyBtn.classList.remove("hidden");
      $applyBtn.disabled = false;
    }
  } catch (e) {
    if (e.message === "Cancelled") {
      log("Translation cancelled by user", "warn");
      setProgress(0, "Cancelled");
    } else {
      log("Error: " + e.message, "err");
      setProgress(0, "Error \u2014 see log");
    }
    translatedStore = {};
    $translateBtn.classList.remove("hidden");
    if ($applyBtn) {
      $applyBtn.classList.add("hidden");
      $applyBtn.disabled = true;
    }
  }

  persistCache();
  $cancelBtn.classList.add("hidden");
  setBusy(false);
});

/* ================================================================== */
/*  Step 2: Apply (create/update frames on canvas)                    */
/* ================================================================== */
if ($applyBtn) {
  $applyBtn.addEventListener("click", async () => {
    if (busy) return;
    const applyLangs = Object.keys(translatedStore);
    if (!applyLangs.length) {
      log("Translate first \u2014 nothing to apply", "err");
      return;
    }
    if (!framesData.length) {
      log("Scan a selection first", "err");
      return;
    }
    setBusy(true);
    $progressSec.classList.remove("hidden");
    setProgress(0, "Applying to canvas\u2026");
    try {
      const multiFrame = framesData.length > 1;
      const ops = [];
      for (let li = 0; li < applyLangs.length; li++) {
        const lang = applyLangs[li];
        const items = translatedStore[lang];
        const byFrame = {};
        items.forEach(item => {
          if (!byFrame[item.frameId]) byFrame[item.frameId] = [];
          byFrame[item.frameId].push({ path: item.path, text: item.translated });
        });
        for (const frameId of Object.keys(byFrame)) {
          ops.push({ lang, langIndex: li, frameId, translations: byFrame[frameId] });
        }
      }
      for (let i = 0; i < ops.length; i++) {
        const op = ops[i];
        setProgress(
          ops.length ? Math.round((i / ops.length) * 100) : 100,
          "Applying " + op.lang.toUpperCase() + "\u2026",
        );
        parent.postMessage({ pluginMessage: {
          type: "create-frame",
          frameId: op.frameId,
          langCode: op.lang,
          langIndex: op.langIndex,
          multiFrame: multiFrame,
          translations: op.translations,
          fitOptions: fitOptionsPayload(),
        }}, "*");
        await sleep(200);
      }
      setProgress(100, "Done \u2014 " + ops.length + " frame op(s)");
      log(ops.length + " frame(s) created/updated on canvas", "ok");
      canvasApplied = true;
      updateReviewSummary();
    } catch (e) {
      log("Apply error: " + e.message, "err");
      setProgress(0, "Apply failed");
    }
    setBusy(false);
  });
}

/* ================================================================== */
/*  Review panel: render                                               */
/* ================================================================== */
function showReviewPanel(langs) {
  $reviewSec.classList.remove("hidden");
  scrollToEl($reviewSec);

  $reviewTabs.innerHTML = "";
  langs.forEach((lang, i) => {
    const btn = document.createElement("button");
    btn.className = "review-tab" + (i === 0 ? " active" : "");
    btn.dataset.lang = lang;

    const items = translatedStore[lang] || [];
    const warns = items.filter(r => calcDelta(r.original, r.translated) > 35).length;
    btn.innerHTML = lang.toUpperCase() + (warns ? ' <span class="warn-dot"></span>' : "");

    btn.addEventListener("click", () => {
      document.querySelectorAll(".review-tab").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      renderReviewRows(lang);
    });
    $reviewTabs.appendChild(btn);
  });

  renderReviewRows(langs[0]);
}

function renderReviewRows(lang) {
  activeReviewLang = lang;
  const items = translatedStore[lang] || [];
  $reviewRows.innerHTML = "";

  let okCount = 0, warnCount = 0, dangerCount = 0, lockedCount = 0;

  items.forEach((item, idx) => {
    const delta = calcDelta(item.original, item.translated);
    const cls = item.locked ? "" : deltaClass(delta);

    if (item.locked) lockedCount++;
    else if (cls === "ok") okCount++;
    else if (cls === "warn") warnCount++;
    else dangerCount++;

    const row = document.createElement("div");
    row.className = "review-row" + (cls === "danger" ? " overflow-danger" : cls === "warn" ? " overflow-warn" : "");

    row.innerHTML =
      '<div class="review-cell review-original" contenteditable="true" data-idx="' + idx + '">' + esc(item.original) + '</div>' +
      '<div class="review-cell review-translated" contenteditable="' + (item.locked ? "false" : "true") + '" data-idx="' + idx + '">' +
        esc(item.translated) +
      '</div>' +
      '<div class="review-cell review-delta ' + cls + '">' +
        (item.locked ? "&#x1F512;" : deltaLabel(delta)) +
      '</div>';

    const editCell = row.querySelector(".review-translated");
    editCell.addEventListener("blur", () => {
      const newText = editCell.textContent.trim();
      if (newText && newText !== item.translated) {
        item.translated = newText;
        const d = calcDelta(item.original, newText);
        const dc = deltaClass(d);
        row.querySelector(".review-delta").className = "review-cell review-delta " + dc;
        row.querySelector(".review-delta").textContent = deltaLabel(d);
        row.className = "review-row" + (dc === "danger" ? " overflow-danger" : dc === "warn" ? " overflow-warn" : "");
        updateReviewSummary();
      }
    });

    /* ---- Source (EN) edit \u2192 re-translate for all languages ---- */
    const srcCell = row.querySelector(".review-original");
    srcCell.addEventListener("blur", function() {
      const newSrc = srcCell.textContent.trim();
      if (!newSrc || newSrc === item.original) return;

      const captureLang = activeReviewLang;
      srcCell.classList.add("src-syncing");

      (async function() {
        const allLangs = Object.keys(translatedStore);
        for (let li = 0; li < allLangs.length; li++) {
          const l = allLangs[li];
          const storeItem = translatedStore[l][idx];
          if (!storeItem) continue;
          storeItem.original = newSrc;
          if (storeItem.locked) continue;
          try {
            const results = provider === "free"
              ? await batchFree([newSrc], l, function() {})
              : await batchOpenAI([newSrc], l, function() {});
            if (results && results[0]) storeItem.translated = results[0];
          } catch (_e) { /* keep existing translation on error */ }
        }
        renderReviewRows(captureLang);
      })();
    });

    $reviewRows.appendChild(row);
  });

  updateReviewSummary();
}

function updateReviewSummary() {
  if (!activeReviewLang) return;
  const items = translatedStore[activeReviewLang] || [];
  let ok = 0, warn = 0, danger = 0, locked = 0;
  items.forEach(item => {
    if (item.locked) { locked++; return; }
    const d = calcDelta(item.original, item.translated);
    const c = deltaClass(d);
    if (c === "ok") ok++;
    else if (c === "warn") warn++;
    else danger++;
  });

  const hint = canvasApplied
    ? "On canvas \u2014 edit cells &amp; use the same button again to re-apply"
    : "Use the primary button below to apply (after Translate finishes it switches to Apply)";
  $reviewSummary.innerHTML =
    '<div class="stat"><span class="dot-sm" style="background:var(--green)"></span> ' + ok + ' fit</div>' +
    (warn ? '<div class="stat"><span class="dot-sm" style="background:var(--yellow)"></span> ' + warn + ' longer</div>' : '') +
    (danger ? '<div class="stat"><span class="dot-sm" style="background:var(--red)"></span> ' + danger + ' overflow risk</div>' : '') +
    (locked ? '<div class="stat"><span class="dot-sm" style="background:var(--txt3)"></span> ' + locked + ' locked</div>' : '') +
    '<div class="stat" style="margin-left:auto;color:var(--txt3)">' + hint + "</div>";
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ================================================================== */
/*  Settings persistence                                               */
/* ================================================================== */
function saveSettings() {
  parent.postMessage({ pluginMessage: {
    type: "save-settings",
    settings: {
      provider,
      model: $model.value,
      langs: selectedLangs(),
      lockTerms: $lockTerms.value || "",
      smartWrap:     !!($smartWrap     && $smartWrap.checked),
      sidePadding:   Number(($sidePadding  && $sidePadding.value)  || 16),
      expandFrames:  $expandFrames == null ? true : !!$expandFrames.checked,
      autoFontScale: !!($autoFontScale && $autoFontScale.checked),
      minFontSize:   Number(($minFontSize  && $minFontSize.value)   || 8),
    },
  }}, "*");
}

function applySettings(s) {
  if (!s) return;
  if (s.provider) {
    provider = s.provider;
    document.querySelectorAll(".toggle-opt").forEach(b => {
      b.classList.toggle("active", b.dataset.provider === provider);
    });
    $proSettings.classList.toggle("hidden", provider === "free");
  }
  if (s.model) $model.value = s.model;
  if (typeof s.lockTerms    === "string")  $lockTerms.value        = s.lockTerms;
  if (typeof s.smartWrap    === "boolean") $smartWrap.checked      = s.smartWrap;
  if (typeof s.sidePadding  === "number")  $sidePadding.value      = String(s.sidePadding);
  if (typeof s.expandFrames === "boolean" && $expandFrames) {
    $expandFrames.checked = s.expandFrames;
  }
  if (typeof s.autoFontScale === "boolean" && $autoFontScale) {
    $autoFontScale.checked = s.autoFontScale;
    syncFontScaleUI();
  }
  if (typeof s.minFontSize  === "number" && $minFontSize) $minFontSize.value = String(s.minFontSize);
  if (s.langs) {
    document.querySelectorAll(".chip").forEach(chip => {
      const cb = chip.querySelector("input");
      const on = s.langs.includes(cb.value);
      cb.checked = on;
      chip.classList.toggle("on", on);
    });
  }
}

/* ================================================================== */
/*  Messages from Figma                                                */
/* ================================================================== */
window.onmessage = (e) => {
  const msg = e.data.pluginMessage;
  if (!msg) return;

  if (msg.type === "init-data") {
    applySettings(msg.settings);
    if (msg.key) $apiKey.value = msg.key;
    if (msg.cache && typeof msg.cache === "object") {
      cache = msg.cache;
      cacheLoaded = true;
    }
  }

  if (msg.type === "key-saved") { /* logged already */ }

  if (msg.type === "scanned") {
    framesData = msg.frames;
    let total = 0;
    $previewBox.innerHTML = "";

    for (const f of framesData) {
      const label = document.createElement("div");
      label.className = "frame-label";
      label.textContent = f.name + "  (" + f.texts.length + " texts)";
      $previewBox.appendChild(label);

      for (let i = 0; i < f.texts.length; i++) {
        const row = document.createElement("div");
        row.className = "text-row";
        row.innerHTML = '<span class="num">' + (i + 1) + '</span><span class="val">' + esc(f.texts[i].characters) + '</span>';
        $previewBox.appendChild(row);
        total++;
      }
    }

    $countBadge.textContent = "(" + total + ")";
    $previewSec.classList.remove("hidden");
    $emptyState.classList.add("hidden");
    $translateBtn.disabled = false;
    $translateBtn.classList.remove("hidden");
    $reviewSec.classList.add("hidden");
    $cancelBtn.classList.add("hidden");
    translatedStore = {};
    canvasApplied = false;
    if ($applyBtn) {
      $applyBtn.classList.add("hidden");
      $applyBtn.disabled = true;
    }
    hideRescanWarn();
    updateCost();
    log("Scanned: " + framesData.length + " frame(s), " + total + " text(s)", "ok", true);
    // \u041F\u0440\u043E\u043A\u0440\u0443\u0442\u043A\u0430 \u0442\u0430\u043A, \u0447\u0442\u043E\u0431\u044B \u0431\u043B\u043E\u043A \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u043F\u0440\u0438\u0436\u0430\u043B\u0441\u044F \u043A \u043D\u0438\u0437\u0443 \u0432\u0438\u0434\u0438\u043C\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u043F\u0430\u043D\u0435\u043B\u0438.
    setTimeout(function() {
      if ($previewSec) {
        $previewSec.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      }
    }, 80);
  }

  if (msg.type === "selection-changed") {
    // Show warning only if we have scanned frames and the new selection doesn't match.
    if (framesData.length > 0) {
      const scannedIds = framesData.map(function(f) { return f.id; }).sort().join(",");
      const newIds = (msg.ids || []).slice().sort().join(",");
      if (scannedIds !== newIds) {
        showRescanWarn();
      } else {
        hideRescanWarn();
      }
    }
  }

  if (msg.type === "error") {
    log(msg.text, "err");
    setBusy(false);
  }

  if (msg.type === "sync-reference-ready") {
    void (async function() {
      try {
        const baseName = msg.baseName;
        const texts = msg.texts;
        const targets = msg.targets;
        const langs = selectedLangs();
        const withTarget = langs.filter(function(l) { return targets[l]; });
        const steps = withTarget.length > 0 ? withTarget.length : 1;
        let done = 0;
        let applied = 0;

        for (let li = 0; li < langs.length; li++) {
          const lang = langs[li];
          const targetId = targets[lang];
          if (!targetId) {
            log("Skip " + lang.toUpperCase() + ": no frame \xAB" + baseName + " [" + lang.toUpperCase() + "]\xBB on page", "warn");
            continue;
          }

          const allChars = texts.map(function(t) { return t.characters; });
          const onProg = function(cur, tot) {
            const gp = Math.round(((done + cur / tot) / steps) * 100);
            setProgress(gp, "Sync " + lang.toUpperCase() + " \u2014 " + Math.round(cur / tot * 100) + "%");
          };

          let translated;
          try {
            translated = provider === "free"
              ? await batchFree(allChars, lang, onProg)
              : await batchOpenAI(allChars, lang, onProg);
          } catch (err) {
            log("[" + lang.toUpperCase() + "] " + err.message, "err");
            done++;
            continue;
          }

          const translations = [];
          for (let i = 0; i < texts.length; i++) {
            const locked = shouldSkipTranslation(allChars[i]);
            translations.push({ path: texts[i].path, text: locked ? allChars[i] : translated[i] });
          }

          const fo = fitOptionsPayload();
          parent.postMessage({ pluginMessage: {
            type: "sync-reference-apply",
            targetFrameId: targetId,
            langCode: lang,
            translations: translations,
            fitOptions: {
              smartWrap:     fo.smartWrap,
              sidePadding:   fo.sidePadding,
              expandFrames:  fo.expandFrames,
              autoFontScale: fo.autoFontScale,
              minFontSize:   fo.minFontSize,
            },
          }}, "*");

          applied++;
          done++;
          await sleep(180);
        }

        if (applied === 0) {
          log("No matching frames on page. Names must be \xAB" + baseName + " [ES]\xBB, etc.", "err");
        } else {
          log("Sent " + applied + " update(s) to Figma", "info");
        }
        setProgress(100, "Done");
      } finally {
        setBusy(false);
      }
    })();
  }

  if (msg.type === "sync-reference-done") {
    let s = msg.fail
      ? "[\u21BB " + msg.langCode.toUpperCase() + "] " + msg.ok + " ok, " + msg.fail + " skipped"
      : "[\u21BB " + msg.langCode.toUpperCase() + "] " + msg.ok + " texts updated";
    if (msg.err) s += " \u2014 " + msg.err;
    else if (msg.framesExpanded > 0) s += " \xB7 " + msg.framesExpanded + " frame(s) enlarged";
    log(s, msg.fail || msg.err ? "warn" : "info");
  }

  if (msg.type === "frame-done") {
    let s = msg.fail
      ? "[" + msg.langCode.toUpperCase() + "] " + msg.ok + " ok, " + msg.fail + " skipped"
      : "[" + msg.langCode.toUpperCase() + "] " + msg.ok + " texts applied";
    if (!msg.fail && msg.framesExpanded > 0) s += " \xB7 " + msg.framesExpanded + " frame(s) enlarged";
    log(s, msg.fail ? "warn" : "info");
  }

  if (msg.type === "frame-error") {
    log("[" + msg.langCode.toUpperCase() + "] " + msg.text, "err");
  }
};

/* ================================================================== */
/*  Init                                                               */
/* ================================================================== */
parent.postMessage({ pluginMessage: { type: "init" } }, "*");
<\/script>
</body>
</html>
`, { width: 560, height: 740 });
  void figma.loadAllPagesAsync();
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
  function captureCharStyles(node) {
    const len = node.characters.length;
    const styles = [];
    for (let i = 0; i < len; i++) {
      styles.push({
        fontName: node.getRangeFontName(i, i + 1),
        fontSize: node.getRangeFontSize(i, i + 1),
        letterSpacing: node.getRangeLetterSpacing(i, i + 1),
        lineHeight: node.getRangeLineHeight(i, i + 1),
        textDecoration: node.getRangeTextDecoration(i, i + 1),
        textCase: node.getRangeTextCase(i, i + 1),
        fills: node.getRangeFills(i, i + 1)
      });
    }
    return styles;
  }
  function isUniformStyle(styles) {
    if (styles.length <= 1)
      return true;
    const f = styles[0];
    for (let i = 1; i < styles.length; i++) {
      const s = styles[i];
      if (s.fontName.family !== f.fontName.family || s.fontName.style !== f.fontName.style || s.fontSize !== f.fontSize)
        return false;
    }
    return true;
  }
  function mapSegmentStyles(segStyles, oldSeg, newSeg) {
    const newLen = newSeg.length;
    if (!segStyles.length || newLen === 0)
      return [];
    if (isUniformStyle(segStyles)) {
      const arr = [];
      for (let i = 0; i < newLen; i++)
        arr.push(segStyles[0]);
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
        for (let ci = 0; ci < newTokens[ti].length; ci++)
          result.push(st);
      }
    } else {
      for (let ti = 0; ti < newTokens.length; ti++) {
        const srcTi = Math.min(Math.floor(ti / newTokens.length * oldTokens.length), oldTokens.length - 1);
        const st = tokenStyle[srcTi];
        for (let ci = 0; ci < newTokens[ti].length; ci++)
          result.push(st);
      }
    }
    return result;
  }
  function mapStylesToNewLength(styles, oldText, newText) {
    const newLen = newText.length;
    if (!styles.length || newLen === 0)
      return [];
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
      while (mapped.length < newLen)
        mapped.push(styles[styles.length - 1]);
      return mapped.slice(0, newLen);
    }
    return mapSegmentStyles(styles, oldText, newText);
  }
  async function applyCharStyles(node, mapped) {
    const len = node.characters.length;
    if (!mapped.length || len === 0)
      return;
    let i = 0;
    while (i < len) {
      const s = mapped[i];
      let j = i + 1;
      while (j < len && j < mapped.length) {
        const n = mapped[j];
        if (n.fontName.family !== s.fontName.family || n.fontName.style !== s.fontName.style || n.fontSize !== s.fontSize)
          break;
        j++;
      }
      try {
        await figma.loadFontAsync(s.fontName);
        node.setRangeFontName(i, j, s.fontName);
        node.setRangeFontSize(i, j, s.fontSize);
        node.setRangeLetterSpacing(i, j, s.letterSpacing);
        node.setRangeLineHeight(i, j, s.lineHeight);
        node.setRangeTextDecoration(i, j, s.textDecoration);
        node.setRangeTextCase(i, j, s.textCase);
        if (s.fills !== figma.mixed) {
          node.setRangeFills(i, j, s.fills);
        }
      } catch (_e) {
      }
      i = j;
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
    const canGrowFrame = opts.expandFrames !== false;
    if (node.textAutoResize === "WIDTH_AND_HEIGHT") {
      if (inAutoLayout) {
        if (autoScale) {
          await scaleFontToWidth(node, originalWidth, minFont);
        }
      } else if (canGrowFrame && !autoScale) {
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
  var EXPAND_FRAME_PAD = 8;
  var EXPAND_RELAX_PASSES = 4;
  function expandFrameForTextOverflow(textNode, frame) {
    const tb = textNode.absoluteBoundingBox;
    const fb = frame.absoluteBoundingBox;
    if (!tb || !fb)
      return false;
    const overflowW = tb.x + tb.width - (fb.x + fb.width);
    const overflowH = tb.y + tb.height - (fb.y + fb.height);
    if (overflowW <= 0 && overflowH <= 0)
      return false;
    const addW = overflowW > 0 ? overflowW + EXPAND_FRAME_PAD : 0;
    const addH = overflowH > 0 ? overflowH + EXPAND_FRAME_PAD : 0;
    const w0 = frame.width;
    const h0 = frame.height;
    try {
      frame.resize(w0 + addW, h0 + addH);
      return frame.width !== w0 || frame.height !== h0;
    } catch (_e) {
      return false;
    }
  }
  function relaxFramesForTranslatedText(textNodes, root) {
    const resizedIds = /* @__PURE__ */ new Set();
    for (let pass = 0; pass < EXPAND_RELAX_PASSES; pass++) {
      for (const t of textNodes) {
        let p = t.parent;
        while (p) {
          if (p.type === "PAGE")
            break;
          if (p.type === "FRAME" || p.type === "COMPONENT" || p.type === "INSTANCE") {
            if (expandFrameForTextOverflow(t, p))
              resizedIds.add(p.id);
          }
          if (p.id === root.id)
            break;
          p = p.parent;
        }
      }
    }
    return resizedIds.size;
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
      minFontSize: fo.minFontSize,
      expandFrames: fo.expandFrames
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
          const savedStyles = captureCharStyles(node);
          const originalText = node.characters;
          node.characters = t.text;
          const mapped = mapStylesToNewLength(savedStyles, originalText, t.text);
          await applyCharStyles(node, mapped);
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
    let framesExpanded = 0;
    const expandOn = fo.expandFrames !== false;
    if (expandOn && records.length) {
      framesExpanded = relaxFramesForTranslatedText(
        records.map((r) => r.node),
        root
      );
    }
    return { ok, fail, framesExpanded };
  }
  function stripLangSuffix(name) {
    return name.replace(/\s+\[[A-Za-z]{2}\]\s*$/, "").trim();
  }
  function localizedFrameName(base, lang) {
    return base + " [" + lang.toUpperCase() + "]";
  }
  function respaceLanguageClones(sourceId, sourceX, sourceY, sourceW, sourceH, gap, multiFrame) {
    const all = figma.currentPage.findAll(
      (n) => n.type === "FRAME" || n.type === "COMPONENT" || n.type === "INSTANCE"
    );
    const siblings = [];
    for (const n of all) {
      const f = n;
      if (f.getPluginData("ft_source_id") === sourceId)
        siblings.push(f);
    }
    if (siblings.length === 0)
      return;
    siblings.sort((a, b) => {
      const ai = parseInt(a.getPluginData("ft_lang_index") || "", 10);
      const bi = parseInt(b.getPluginData("ft_lang_index") || "", 10);
      if (!isNaN(ai) && !isNaN(bi) && ai !== bi)
        return ai - bi;
      return multiFrame ? a.y - b.y : a.x - b.x;
    });
    if (multiFrame) {
      let nextY = sourceY + sourceH + gap;
      for (const sib of siblings) {
        sib.x = sourceX;
        sib.y = nextY;
        nextY = sib.y + sib.height + gap;
      }
    } else {
      let nextX = sourceX + sourceW + gap;
      for (const sib of siblings) {
        sib.x = nextX;
        sib.y = sourceY;
        nextX = sib.x + sib.width + gap;
      }
    }
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
      const orig = await figma.getNodeByIdAsync(frameId);
      if (!orig) {
        figma.ui.postMessage({ type: "frame-error", frameId, langCode, text: "Original frame not found" });
        return;
      }
      const wantName = `${stripLangSuffix(orig.name)} [${langCode.toUpperCase()}]`;
      const taggedMatches = [];
      const legacyNameMatches = [];
      const candidates = figma.currentPage.findAll(
        (n) => n.type === "FRAME" || n.type === "COMPONENT" || n.type === "INSTANCE"
      );
      for (const n of candidates) {
        const f = n;
        const tagId = f.getPluginData("ft_source_id");
        const tagLang = f.getPluginData("ft_lang");
        if (tagId && tagId === frameId && tagLang === langCode) {
          taggedMatches.push(f);
        } else if (!tagId && f.name === wantName) {
          legacyNameMatches.push(f);
        }
      }
      let toReplace = null;
      if (taggedMatches.length > 0) {
        toReplace = taggedMatches[0];
      } else if (legacyNameMatches.length === 1) {
        toReplace = legacyNameMatches[0];
      }
      let replaceX = null;
      let replaceY = null;
      if (toReplace) {
        replaceX = toReplace.x;
        replaceY = toReplace.y;
        for (const f of taggedMatches) {
          try {
            f.remove();
          } catch (_e) {
          }
        }
        if (taggedMatches.length === 0) {
          try {
            toReplace.remove();
          } catch (_e) {
          }
        }
      }
      const gap = 80;
      const origFrame = orig;
      const absX = origFrame.absoluteTransform[0][2];
      const absY = origFrame.absoluteTransform[1][2];
      const ow = origFrame.width || 400;
      const oh = origFrame.height || 400;
      const clone = origFrame.clone();
      clone.name = wantName;
      clone.setPluginData("ft_source_id", frameId);
      clone.setPluginData("ft_lang", langCode);
      clone.setPluginData("ft_lang_index", String(langIndex));
      clone.setPluginData("ft_multi_frame", multiFrame === true ? "1" : "0");
      if (clone.parent !== figma.currentPage) {
        figma.currentPage.appendChild(clone);
      }
      if (replaceX !== null && replaceY !== null) {
        clone.x = replaceX;
        clone.y = replaceY;
      } else if (multiFrame === true) {
        clone.x = absX;
        clone.y = absY + (oh + gap) * (langIndex + 1);
      } else {
        clone.x = absX + (ow + gap) * (langIndex + 1);
        clone.y = absY;
      }
      try {
        const fo = fitOptions || {};
        const { ok, fail, framesExpanded } = await applyTranslationsToRoot(clone, translations, fo);
        respaceLanguageClones(frameId, absX, absY, ow, oh, gap, multiFrame === true);
        figma.ui.postMessage({ type: "frame-done", frameId, langCode, ok, fail, framesExpanded });
        let toast = `\u2713 ${clone.name} \u2014 ${ok} translated`;
        if (fail)
          toast += `, ${fail} skipped`;
        if (framesExpanded)
          toast += ` \xB7 ${framesExpanded} frame(s) enlarged`;
        figma.notify(toast);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        figma.ui.postMessage({ type: "frame-error", frameId, langCode, text: message });
        figma.notify(`\u2717 ${langCode.toUpperCase()}: ${message}`, { error: true });
      }
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
      const root = await figma.getNodeByIdAsync(targetFrameId);
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
      try {
        const fo = fitOptions || {};
        const { ok, fail, framesExpanded } = await applyTranslationsToRoot(root, translations, fo);
        figma.ui.postMessage({ type: "sync-reference-done", langCode, ok, fail, framesExpanded });
        let st = `\u21BB [${langCode.toUpperCase()}] \u2014 ${ok} text layer(s)`;
        if (framesExpanded)
          st += ` \xB7 ${framesExpanded} frame(s) enlarged`;
        figma.notify(st);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        figma.ui.postMessage({
          type: "sync-reference-done",
          langCode,
          ok: 0,
          fail: translations.length,
          err: message
        });
        figma.notify(`\u2717 Sync ${langCode.toUpperCase()}: ${message}`, { error: true });
      }
    }
    if (msg.type === "close") {
      figma.closePlugin();
    }
  };
})();
