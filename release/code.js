"use strict";
(() => {
  // src/code.ts
  figma.showUI(`<!DOCTYPE html>\r
<html lang="en">\r
<head>\r
<meta charset="utf-8" />\r
<meta name="color-scheme" content="dark" />\r
<style>\r
/* ================================================================== */\r
/*  Design Tokens                                                      */\r
/* ================================================================== */\r
:root {\r
  --bg:         #1a1a1a;\r
  --card:       #242428;\r
  --card-hover: #2c2c31;\r
  --elevated:   #333338;\r
  --border:     #38383d;\r
  --border-lt:  #2e2e33;\r
\r
  --primary:    #6366F1;\r
  --primary-h:  #818CF8;\r
  --primary-bg: rgba(99,102,241,.10);\r
  --green:      #34D399;\r
  --green-bg:   rgba(52,211,153,.10);\r
  --red:        #F87171;\r
  --red-bg:     rgba(248,113,113,.10);\r
  --yellow:     #FBBF24;\r
  --yellow-bg:  rgba(251,191,36,.10);\r
\r
  --txt:   #E5E7EB;\r
  --txt2:  #9CA3AF;\r
  --txt3:  #6B7280;\r
\r
  --r:  8px;\r
  --r2: 12px;\r
  --transition: .15s ease;\r
  /* Space for fixed bottom bar: up to 2 stacked buttons + cost hint + safe padding */\r
  --scroll-pad-bottom: 172px;\r
}\r
\r
/* ================================================================== */\r
/*  Reset & Base                                                       */\r
/* ================================================================== */\r
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\r
\r
html, body { height: 100%; margin: 0; padding: 0; }\r
html { background: var(--bg); color-scheme: dark; }\r
body {\r
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;\r
  font-size: 12px;\r
  line-height: 1.5;\r
  color: var(--txt);\r
  background: var(--bg);\r
  display: flex;\r
  flex-direction: column;\r
  overflow: hidden;\r
  -webkit-font-smoothing: antialiased;\r
}\r
\r
/* ================================================================== */\r
/*  Layout                                                             */\r
/* ================================================================== */\r
header {\r
  padding: 16px 20px 14px;\r
  border-bottom: 1px solid var(--border-lt);\r
  display: flex;\r
  align-items: center;\r
  gap: 12px;\r
  flex-shrink: 0;\r
}\r
.logo {\r
  width: 32px; height: 32px;\r
  border-radius: var(--r);\r
  background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A78BFA 100%);\r
  display: flex; align-items: center; justify-content: center;\r
  font-size: 13px; font-weight: 700; color: #fff;\r
  letter-spacing: -.5px;\r
  flex-shrink: 0;\r
}\r
header h1 { font-size: 15px; font-weight: 600; letter-spacing: -.2px; }\r
header .ver {\r
  margin-left: auto;\r
  font-size: 10px;\r
  color: var(--txt3);\r
  background: var(--card);\r
  padding: 2px 8px;\r
  border-radius: 20px;\r
}\r
\r
.scroll {\r
  flex: 1;\r
  overflow-y: auto;\r
  padding: 16px 20px var(--scroll-pad-bottom);\r
  scroll-padding-bottom: var(--scroll-pad-bottom);\r
}\r
.scroll::-webkit-scrollbar { width: 4px; }\r
.scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }\r
\r
/* ================================================================== */\r
/*  Sections & layout                                                  */\r
/* ================================================================== */\r
.section { margin-bottom: 20px; }\r
\r
/* Used in dynamic panels (preview, cost, review) */\r
.section-label {\r
  font-size: 10px;\r
  font-weight: 600;\r
  text-transform: uppercase;\r
  letter-spacing: .8px;\r
  color: var(--txt3);\r
  margin-bottom: 10px;\r
}\r
\r
/* Static field labels \u2014 engine, languages, lock terms, smart fit */\r
.field-label {\r
  font-size: 10px;\r
  font-weight: 600;\r
  text-transform: uppercase;\r
  letter-spacing: .75px;\r
  color: var(--txt3);\r
  margin-bottom: 10px;\r
  display: flex;\r
  align-items: center;\r
  gap: 6px;\r
}\r
\r
/* Group title bar \u2014 "Setup" / "Translate" */\r
/* Logical groups without visible headings \u2014 spacing only */\r
.workflow-group { margin-bottom: 0; }\r
.workflow-group + .workflow-group { margin-top: 22px; }\r
\r
/* \u2500\u2500 Advanced: \u043B\u0438\u043D\u0438\u044F-\u0440\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C; \u0441\u0432\u0435\u0440\u0445\u0443 \u043E\u0442\u0441\u0442\u0443\u043F \u043E\u0442 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0433\u043E \u043F\u043E\u0442\u043E\u043A\u0430, \u0441\u043D\u0438\u0437\u0443 \u043F\u043B\u043E\u0442\u043D\u0435\u0435 \u043A \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u043C \u2500\u2500 */\r
.section-divider {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
  margin: 32px 0 10px;\r
  color: var(--txt3);\r
  font-size: 9px;\r
  font-weight: 700;\r
  letter-spacing: .1em;\r
  text-transform: uppercase;\r
}\r
.section-divider::before,\r
.section-divider::after {\r
  content: '';\r
  flex: 1;\r
  height: 1px;\r
  background: var(--border-lt);\r
}\r
\r
/* \u2500\u2500 Scan hero \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
.scan-cta {\r
  min-height: 48px;\r
  border-radius: 10px;\r
  font-size: 14px;\r
  font-weight: 600;\r
  letter-spacing: -.15px;\r
  box-shadow: 0 4px 20px rgba(99,102,241,.35), 0 1px 3px rgba(0,0,0,.2);\r
}\r
.scan-cta:hover:not(:disabled) {\r
  box-shadow: 0 6px 26px rgba(99,102,241,.45), 0 2px 6px rgba(0,0,0,.25);\r
}\r
\r
/* \u2500\u2500 Sync card \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
.sync-card {\r
  background: var(--card);\r
  border: 1px solid var(--border);\r
  border-radius: var(--r2);\r
  padding: 14px 16px;\r
}\r
.sync-card-head {\r
  display: flex;\r
  align-items: center;\r
  gap: 12px;\r
  margin-bottom: 10px;\r
}\r
.sync-card-icon {\r
  width: 34px; height: 34px;\r
  border-radius: var(--r);\r
  background: var(--primary-bg);\r
  border: 1px solid rgba(99,102,241,.25);\r
  display: flex; align-items: center; justify-content: center;\r
  color: var(--primary-h);\r
  flex-shrink: 0;\r
}\r
.sync-card-title {\r
  font-size: 13px;\r
  font-weight: 600;\r
  color: var(--txt);\r
  line-height: 1.2;\r
  letter-spacing: -.2px;\r
}\r
.sync-card-sub {\r
  font-size: 10px;\r
  color: var(--txt3);\r
  margin-top: 3px;\r
  line-height: 1.35;\r
}\r
.sync-card .hint {\r
  margin: 0 0 12px;\r
  padding-top: 10px;\r
  border-top: 1px solid var(--border-lt);\r
}\r
\r
/* \u2500\u2500 Smart Fit inline \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
.smartfit-block {\r
  background: var(--card);\r
  border: 1px solid var(--border);\r
  border-radius: var(--r2);\r
  padding: 14px 16px;\r
}\r
.smartfit-block .fit-rows-stack {\r
  margin-top: 0;\r
}\r
.smartfit-block .hint {\r
  margin-top: 12px;\r
  padding-top: 10px;\r
  border-top: 1px solid var(--border-lt);\r
  margin-bottom: 0;\r
}\r
.smartfit-reset {\r
  margin-top: 10px;\r
  font-size: 11px;\r
}\r
.smartfit-reset button {\r
  background: none;\r
  border: none;\r
  padding: 0;\r
  color: var(--primary);\r
  cursor: pointer;\r
  text-decoration: underline;\r
  font-size: inherit;\r
  font-family: inherit;\r
}\r
.designer-tips {\r
  margin-top: 12px;\r
  padding-top: 10px;\r
  border-top: 1px solid var(--border-lt);\r
  font-size: 11px;\r
  color: var(--txt2);\r
  line-height: 1.5;\r
}\r
.designer-tips summary {\r
  cursor: pointer;\r
  color: var(--primary-h);\r
  font-weight: 600;\r
  list-style: none;\r
}\r
.designer-tips summary::-webkit-details-marker { display: none; }\r
.designer-tips ul {\r
  margin: 8px 0 0;\r
  padding-left: 18px;\r
}\r
.designer-tips li { margin-bottom: 6px; }\r
.designer-tips strong { color: var(--txt); font-weight: 600; }\r
\r
/* Card surfaces \u2014 Smart Fit / Sync / Scan / Progress */\r
.panel {\r
  border-radius: var(--r2);\r
  border: 1px solid var(--border);\r
  background: var(--card);\r
  padding: 15px 16px 16px;\r
  box-shadow:\r
    0 1px 0 rgba(255,255,255,.04) inset,\r
    0 8px 28px rgba(0,0,0,.22);\r
}\r
.section > .panel { margin-bottom: 0; }\r
.panel-head { margin-bottom: 12px; }\r
.panel-eyebrow {\r
  display: block;\r
  font-size: 9px;\r
  font-weight: 700;\r
  letter-spacing: .1em;\r
  text-transform: uppercase;\r
  color: var(--primary-h);\r
  margin-bottom: 4px;\r
  opacity: .95;\r
}\r
.panel-title {\r
  font-size: 13px;\r
  font-weight: 600;\r
  letter-spacing: -.25px;\r
  color: var(--txt);\r
  line-height: 1.25;\r
}\r
.panel-desc {\r
  font-size: 11px;\r
  color: var(--txt2);\r
  line-height: 1.55;\r
  margin: 0 0 14px;\r
}\r
.panel-hint {\r
  font-size: 10px;\r
  color: var(--txt3);\r
  margin: 14px 0 0;\r
  padding-top: 12px;\r
  line-height: 1.45;\r
  border-top: 1px solid var(--border-lt);\r
}\r
.panel--sync {\r
  border-color: rgba(129,140,248,.42);\r
  background:\r
    radial-gradient(120% 80% at 0% 0%, rgba(99,102,241,.14) 0%, transparent 55%),\r
    var(--card);\r
  box-shadow:\r
    0 0 0 1px rgba(99,102,241,.08),\r
    0 10px 36px rgba(0,0,0,.24);\r
}\r
.panel--scan {\r
  border-color: rgba(99,102,241,.28);\r
  background:\r
    linear-gradient(180deg, rgba(99,102,241,.06) 0%, var(--card) 100%);\r
  padding: 16px;\r
  box-shadow:\r
    0 1px 0 rgba(255,255,255,.05) inset,\r
    0 8px 28px rgba(0,0,0,.2);\r
}\r
.panel--scan .btn-primary {\r
  min-height: 44px;\r
  border-radius: 10px;\r
  font-size: 13px;\r
}\r
.panel--progress {\r
  margin-top: 8px;\r
  padding: 12px 14px 14px;\r
  border-style: solid;\r
  border-color: var(--border-lt);\r
  box-shadow: 0 4px 20px rgba(0,0,0,.18);\r
}\r
.fit-rows-stack {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 12px;\r
}\r
\r
/* ================================================================== */\r
/*  Provider Toggle                                                    */\r
/* ================================================================== */\r
.toggle-group {\r
  display: flex;\r
  background: var(--card);\r
  border-radius: var(--r);\r
  padding: 3px;\r
  gap: 2px;\r
  border: 1px solid var(--border-lt);\r
}\r
.toggle-opt {\r
  flex: 1;\r
  padding: 10px 12px;\r
  border-radius: 6px;\r
  border: none;\r
  background: transparent;\r
  color: var(--txt2);\r
  font-size: 12px;\r
  font-weight: 500;\r
  cursor: pointer;\r
  transition: all var(--transition);\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 6px;\r
}\r
.toggle-opt:hover { color: var(--txt); }\r
.toggle-opt.active {\r
  background: var(--primary);\r
  color: #fff;\r
  box-shadow: 0 2px 8px rgba(99,102,241,.3);\r
}\r
.toggle-opt .badge {\r
  font-size: 9px;\r
  padding: 1px 6px;\r
  border-radius: 20px;\r
  font-weight: 600;\r
  text-transform: uppercase;\r
  letter-spacing: .3px;\r
}\r
.toggle-opt.active .badge { background: rgba(255,255,255,.2); color: #fff; }\r
.toggle-opt:not(.active) .badge { background: var(--green-bg); color: var(--green); }\r
\r
/* ================================================================== */\r
/*  Inputs                                                             */\r
/* ================================================================== */\r
.input-row {\r
  display: flex;\r
  gap: 6px;\r
  align-items: stretch;\r
}\r
.input {\r
  flex: 1;\r
  background: var(--card);\r
  border: 1px solid var(--border-lt);\r
  border-radius: var(--r);\r
  color: var(--txt);\r
  padding: 10px 12px;\r
  font-size: 12px;\r
  font-family: inherit;\r
  outline: none;\r
  transition: border-color var(--transition);\r
}\r
.input:focus { border-color: var(--primary); }\r
.input::placeholder { color: var(--txt3); }\r
\r
select.input {\r
  cursor: pointer;\r
  appearance: none;\r
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");\r
  background-repeat: no-repeat;\r
  background-position: right 12px center;\r
  padding-right: 32px;\r
}\r
\r
/* ================================================================== */\r
/*  Buttons                                                            */\r
/* ================================================================== */\r
.btn {\r
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;\r
  padding: 11px 20px;\r
  border: none; border-radius: var(--r);\r
  font-size: 12px; font-weight: 600; font-family: inherit;\r
  cursor: pointer;\r
  transition: all var(--transition);\r
  color: #fff;\r
  position: relative;\r
  overflow: hidden;\r
}\r
.btn:disabled { opacity: .4; cursor: not-allowed; }\r
.btn:active:not(:disabled) { transform: scale(.98); }\r
\r
.btn-primary {\r
  background: var(--primary);\r
  box-shadow: 0 2px 12px rgba(99,102,241,.25);\r
}\r
.btn-primary:hover:not(:disabled) {\r
  background: var(--primary-h);\r
  box-shadow: 0 4px 16px rgba(99,102,241,.35);\r
}\r
\r
.btn-outline {\r
  background: transparent;\r
  border: 1px solid var(--border);\r
  color: var(--txt2);\r
  box-shadow: none;\r
  padding: 9px 14px;\r
}\r
.btn-outline:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }\r
\r
.btn-secondary {\r
  background: var(--elevated);\r
  border: 1px solid var(--border);\r
  color: var(--txt);\r
  box-shadow: 0 1px 3px rgba(0,0,0,.2);\r
  padding: 11px 16px;\r
  min-height: 42px;\r
}\r
.btn-secondary:hover:not(:disabled) {\r
  background: var(--card-hover);\r
  border-color: var(--primary-h);\r
  color: #fff;\r
  box-shadow: 0 0 0 1px rgba(129,140,248,.35), 0 4px 14px rgba(99,102,241,.2);\r
}\r
.btn-secondary svg { flex-shrink: 0; opacity: .9; }\r
\r
.btn-full { width: 100%; }\r
\r
.btn-icon {\r
  width: 40px; height: 40px;\r
  padding: 0;\r
  background: var(--card);\r
  border: 1px solid var(--border-lt);\r
  color: var(--txt2);\r
  border-radius: var(--r);\r
  font-size: 14px;\r
  display: flex; align-items: center; justify-content: center;\r
  box-shadow: none;\r
}\r
.btn-icon:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }\r
\r
/* ================================================================== */\r
/*  Language Chips                                                     */\r
/* ================================================================== */\r
.chips { display: flex; gap: 8px; flex-wrap: wrap; }\r
.chip {\r
  flex: 1 1 calc(33.33% - 6px);\r
  min-width: 100px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: flex-start;\r
  gap: 10px;\r
  padding: 10px 14px;\r
  background: var(--card);\r
  border: 1.5px solid var(--border-lt);\r
  border-radius: var(--r);\r
  cursor: pointer;\r
  transition: all var(--transition);\r
  user-select: none;\r
}\r
.chip:hover { border-color: var(--txt3); }\r
.chip.on {\r
  border-color: var(--primary);\r
  background: var(--primary-bg);\r
}\r
.chip input { display: none; }\r
.chip .flag {\r
  font-size: 18px;\r
  line-height: 1;\r
  width: 22px;\r
  text-align: center;\r
  flex-shrink: 0;\r
}\r
.chip .lang-meta { display: flex; flex-direction: column; gap: 2px; }\r
.chip .name { font-size: 12px; font-weight: 600; line-height: 1; }\r
.chip .code {\r
  font-size: 9px;\r
  font-weight: 700;\r
  letter-spacing: .5px;\r
  color: var(--txt3);\r
  text-transform: uppercase;\r
  line-height: 1;\r
}\r
.chip.on .code { color: var(--primary); }\r
\r
/* ================================================================== */\r
/*  Preview                                                            */\r
/* ================================================================== */\r
.preview-box {\r
  background: var(--card);\r
  border: 1px solid var(--border-lt);\r
  border-radius: var(--r);\r
  max-height: 180px;\r
  overflow-y: auto;\r
}\r
.preview-box::-webkit-scrollbar { width: 3px; }\r
.preview-box::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }\r
\r
.frame-label {\r
  position: sticky;\r
  top: 0;\r
  padding: 10px 14px;\r
  background: var(--elevated);\r
  font-size: 10px;\r
  font-weight: 600;\r
  color: var(--primary);\r
  letter-spacing: .3px;\r
  border-bottom: 1px solid var(--border-lt);\r
  z-index: 1;\r
}\r
.text-row {\r
  padding: 8px 14px;\r
  font-size: 11px;\r
  color: var(--txt);\r
  display: flex;\r
  align-items: baseline;\r
  gap: 10px;\r
  border-bottom: 1px solid rgba(255,255,255,.03);\r
}\r
.text-row:last-child { border-bottom: none; }\r
.text-row .num {\r
  font-size: 9px;\r
  font-weight: 600;\r
  color: var(--txt3);\r
  min-width: 16px;\r
  text-align: right;\r
  flex-shrink: 0;\r
}\r
.text-row .val {\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
/* ================================================================== */\r
/*  Cost Estimate Card                                                 */\r
/* ================================================================== */\r
.cost-card {\r
  background: var(--card);\r
  border: 1px solid var(--border-lt);\r
  border-radius: var(--r);\r
  padding: 14px 16px;\r
  display: flex;\r
  align-items: center;\r
  gap: 14px;\r
}\r
.cost-card .icon {\r
  width: 36px; height: 36px;\r
  border-radius: var(--r);\r
  display: flex; align-items: center; justify-content: center;\r
  font-size: 18px;\r
  flex-shrink: 0;\r
}\r
.cost-card .icon.free { background: var(--green-bg); }\r
.cost-card .icon.paid { background: var(--primary-bg); }\r
.cost-card .info { flex: 1; }\r
.cost-card .price {\r
  font-size: 16px;\r
  font-weight: 700;\r
  letter-spacing: -.3px;\r
}\r
.cost-card .price.free-price { color: var(--green); }\r
.cost-card .price.paid-price { color: var(--primary-h); }\r
.cost-card .detail {\r
  font-size: 10px;\r
  color: var(--txt3);\r
  margin-top: 2px;\r
}\r
\r
/* ================================================================== */\r
/*  Progress                                                           */\r
/* ================================================================== */\r
.progress-section { margin-top: 0; margin-bottom: 14px; }\r
.progress-section .progress-head {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  margin-bottom: 6px;\r
}\r
.progress-section .progress-eyebrow {\r
  font-size: 8px;\r
  font-weight: 600;\r
  letter-spacing: .12em;\r
  text-transform: uppercase;\r
  color: var(--txt3);\r
  opacity: 0.75;\r
}\r
.progress-outer {\r
  height: 6px;\r
  background: var(--elevated);\r
  border-radius: 999px;\r
  overflow: hidden;\r
  border: 1px solid var(--border-lt);\r
}\r
.progress-inner {\r
  height: 100%;\r
  border-radius: 999px;\r
  width: 0%;\r
  transition: width .3s ease;\r
  background: linear-gradient(90deg, var(--primary), #A78BFA);\r
  box-shadow: 0 0 12px rgba(99,102,241,.45);\r
}\r
.progress-label {\r
  font-size: 9px;\r
  font-weight: 400;\r
  color: var(--txt3);\r
  text-align: left;\r
  margin-top: 6px;\r
  line-height: 1.4;\r
  opacity: 0.9;\r
}\r
\r
/* ================================================================== */\r
/*  Log                                                                */\r
/* ================================================================== */\r
.log {\r
  margin-top: 14px;\r
  padding-top: 10px;\r
  border-top: 1px solid var(--border-lt);\r
  max-height: 72px;\r
  overflow-y: auto;\r
  font-size: 9px;\r
  color: var(--txt3);\r
}\r
.log::-webkit-scrollbar { width: 3px; }\r
.log::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }\r
.log-line {\r
  padding: 2px 0;\r
  color: var(--txt3);\r
  display: flex;\r
  align-items: baseline;\r
  gap: 7px;\r
  line-height: 1.35;\r
  opacity: 0.92;\r
}\r
.log-line .dot {\r
  width: 4px; height: 4px;\r
  border-radius: 50%;\r
  flex-shrink: 0;\r
  margin-top: 5px;\r
  opacity: 0.9;\r
}\r
.log-line.ok   { color: var(--txt2); font-size: 9px; }\r
.log-line.ok   .dot { background: var(--green); }\r
.log-line.err  { color: var(--red); font-size: 10px; opacity: 1; font-weight: 500; }\r
.log-line.err  .dot { background: var(--red); }\r
.log-line.warn { color: var(--yellow); font-size: 9px; opacity: 0.95; }\r
.log-line.warn .dot { background: var(--yellow); }\r
.log-line.info { color: var(--txt3); font-size: 9px; opacity: 0.75; }\r
.log-line.info .dot { background: var(--txt3); opacity: 0.5; }\r
\r
/* ================================================================== */\r
/*  Bottom bar                                                         */\r
/* ================================================================== */\r
.bottom {\r
  position: fixed;\r
  z-index: 50;\r
  bottom: 0; left: 0; right: 0;\r
  padding: 12px 20px 16px;\r
  background: var(--bg);\r
  border-top: 1px solid var(--border-lt);\r
  box-shadow: 0 -12px 28px rgba(0,0,0,.45);\r
  pointer-events: none;\r
}\r
.bottom > * { pointer-events: auto; }\r
/* One primary action at a time: Translate \u2194 Apply in the same slot */\r
.bottom-primary-slot .btn-full { width: 100%; }\r
.bottom-primary-slot + .btn { margin-top: 8px; }\r
.bottom .btn + .btn { margin-top: 8px; }\r
.bottom .cost-hint {\r
  text-align: center;\r
  font-size: 10px;\r
  color: var(--txt3);\r
  margin-top: 6px;\r
}\r
\r
/* ================================================================== */\r
/*  Selection-changed warning banner                                   */\r
/* ================================================================== */\r
.rescan-warn {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  padding: 9px 12px;\r
  margin-bottom: 12px;\r
  background: rgba(251,191,36,.10);\r
  border: 1px solid rgba(251,191,36,.28);\r
  border-radius: var(--r);\r
  font-size: 10px;\r
  color: var(--yellow);\r
  line-height: 1.4;\r
  opacity: 0.95;\r
  animation: fadeIn .2s ease;\r
}\r
.rescan-warn svg { flex-shrink: 0; }\r
.rescan-warn strong { font-weight: 700; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }\r
\r
/* ================================================================== */\r
/*  Scan hint (empty state) \u2014 tight to button, same visual group        */\r
/* ================================================================== */\r
.workflow-group .section-scan {\r
  margin-bottom: 16px;\r
}\r
#previewSection {\r
  margin-top: 4px;\r
}\r
#previewSection .section-label {\r
  margin-bottom: 8px;\r
}\r
#reviewSection.section {\r
  margin-top: 12px;\r
}\r
#reviewSection .section-label {\r
  margin-bottom: 10px;\r
}\r
.section-scan .scan-hint {\r
  text-align: center;\r
  margin: 10px 0 0;\r
  padding: 0;\r
  color: var(--txt3);\r
  font-size: 10px;\r
  line-height: 1.45;\r
  font-weight: 400;\r
  opacity: 0.85;\r
}\r
.section-scan .scan-hint strong { color: var(--txt2); font-weight: 600; }\r
/* ================================================================== */\r
/*  Utility                                                            */\r
/* ================================================================== */\r
/* ================================================================== */\r
/*  Lock terms                                                         */\r
/* ================================================================== */\r
.lock-input {\r
  width: 100%;\r
  background: var(--card);\r
  border: 1px solid var(--border-lt);\r
  border-radius: var(--r);\r
  color: var(--txt);\r
  padding: 10px 12px;\r
  font-size: 11px;\r
  font-family: inherit;\r
  outline: none;\r
  transition: border-color var(--transition);\r
  resize: vertical;\r
  min-height: 36px;\r
}\r
.lock-input:focus { border-color: var(--primary); }\r
.lock-input::placeholder { color: var(--txt3); }\r
\r
/* ================================================================== */\r
/*  Review panel                                                       */\r
/* ================================================================== */\r
.review-panel {\r
  display: flex;\r
  flex-direction: column;\r
  border: 1px solid var(--border-lt);\r
  border-radius: var(--r);\r
  background: var(--card);\r
  overflow: hidden;\r
  min-height: 0;\r
}\r
.review-tabs {\r
  display: flex;\r
  gap: 4px;\r
  margin: 0;\r
  padding: 8px;\r
  background: var(--elevated);\r
  border: none;\r
  border-bottom: 1px solid var(--border-lt);\r
  border-radius: 0;\r
}\r
.review-tab {\r
  flex: 1;\r
  padding: 7px 8px;\r
  border: none;\r
  border-radius: 6px;\r
  background: transparent;\r
  color: var(--txt3);\r
  font-size: 11px;\r
  font-weight: 600;\r
  font-family: inherit;\r
  cursor: pointer;\r
  transition: all var(--transition);\r
  text-transform: uppercase;\r
  letter-spacing: .5px;\r
}\r
.review-tab:hover { color: var(--txt); }\r
.review-tab.active { background: var(--primary); color: #fff; }\r
.review-tab .warn-dot {\r
  display: inline-block;\r
  width: 6px; height: 6px;\r
  border-radius: 50%;\r
  background: var(--yellow);\r
  margin-left: 4px;\r
  vertical-align: middle;\r
}\r
\r
/* Only the rows scroll \u2014 header stays under tabs (no sticky overlap on main scroll) */\r
.review-scroll {\r
  flex: 1 1 auto;\r
  min-height: 0;\r
  max-height: 260px;\r
  overflow-y: auto;\r
  overflow-x: hidden;\r
  background: var(--card);\r
}\r
.review-scroll::-webkit-scrollbar { width: 3px; }\r
.review-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }\r
\r
.review-row {\r
  display: grid;\r
  grid-template-columns: 1fr 1fr 48px;\r
  gap: 1px;\r
  border-bottom: 1px solid var(--border-lt);\r
  font-size: 11px;\r
  position: relative;\r
}\r
.review-row:last-child { border-bottom: none; }\r
.review-row.overflow-warn { background: var(--yellow-bg); }\r
.review-row.overflow-danger { background: var(--red-bg); }\r
\r
.review-cell {\r
  padding: 8px 10px;\r
  min-height: 36px;\r
  word-break: break-word;\r
  line-height: 1.4;\r
}\r
.review-original {\r
  color: var(--txt3);\r
  border-right: 1px solid var(--border-lt);\r
  outline: none;\r
  cursor: text;\r
  transition: background var(--transition);\r
}\r
.review-original:focus {\r
  background: rgba(251,191,36,.08);\r
  box-shadow: inset 0 0 0 1px var(--yellow);\r
  color: var(--txt);\r
}\r
.review-original:hover:not(:focus) {\r
  background: rgba(255,255,255,.03);\r
}\r
.review-original.src-syncing {\r
  opacity: 0.45;\r
  pointer-events: none;\r
}\r
.review-translated {\r
  color: var(--txt);\r
  outline: none;\r
  cursor: text;\r
  border-radius: 2px;\r
  transition: background var(--transition);\r
}\r
.review-translated:focus {\r
  background: rgba(99,102,241,.08);\r
  box-shadow: inset 0 0 0 1px var(--primary);\r
}\r
.review-translated:hover:not(:focus) {\r
  background: rgba(255,255,255,.03);\r
}\r
\r
.review-delta {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-size: 9px;\r
  font-weight: 700;\r
  letter-spacing: .3px;\r
  color: var(--txt3);\r
  border-left: 1px solid var(--border-lt);\r
}\r
.review-delta.ok { color: var(--green); }\r
.review-delta.warn { color: var(--yellow); }\r
.review-delta.danger { color: var(--red); }\r
\r
.review-header {\r
  display: grid;\r
  grid-template-columns: 1fr 1fr 48px;\r
  font-size: 9px;\r
  font-weight: 600;\r
  text-transform: uppercase;\r
  letter-spacing: .6px;\r
  color: var(--txt3);\r
  background: var(--elevated);\r
  border-bottom: 1px solid var(--border-lt);\r
  flex-shrink: 0;\r
}\r
/* Each header cell mirrors .review-cell padding so columns stay aligned */\r
.review-header > span {\r
  padding: 6px 10px;\r
}\r
.review-header > span:not(:last-child) {\r
  border-right: 1px solid var(--border-lt);\r
}\r
.review-header > span:last-child {\r
  text-align: center;\r
}\r
\r
.review-summary {\r
  display: flex;\r
  gap: 16px;\r
  padding: 10px 0 0;\r
  font-size: 10px;\r
  color: var(--txt2);\r
}\r
.review-summary .stat { display: flex; align-items: center; gap: 4px; }\r
.review-summary .dot-sm {\r
  width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;\r
}\r
\r
/* ================================================================== */\r
/*  Bottom bar variants                                                */\r
/* ================================================================== */\r
.btn-success {\r
  background: var(--green);\r
  box-shadow: 0 2px 12px rgba(52,211,153,.25);\r
}\r
.btn-success:hover:not(:disabled) {\r
  background: #2DD4A0;\r
  box-shadow: 0 4px 16px rgba(52,211,153,.35);\r
}\r
\r
/* ================================================================== */\r
/*  Smart Fit controls                                                 */\r
/* ================================================================== */\r
.fit-row {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 12px;\r
}\r
.fit-toggle {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
  cursor: pointer;\r
  flex: 1;\r
}\r
.fit-toggle input { display: none; }\r
.fit-toggle-track {\r
  flex-shrink: 0;\r
  width: 32px;\r
  height: 18px;\r
  border-radius: 9px;\r
  background: var(--elevated);\r
  border: 1px solid var(--border);\r
  position: relative;\r
  transition: background var(--transition), border-color var(--transition);\r
}\r
.fit-toggle-track::after {\r
  content: '';\r
  position: absolute;\r
  top: 2px; left: 2px;\r
  width: 12px; height: 12px;\r
  border-radius: 50%;\r
  background: var(--txt3);\r
  transition: transform var(--transition), background var(--transition);\r
}\r
.fit-toggle input:checked + .fit-toggle-track {\r
  background: var(--primary);\r
  border-color: var(--primary);\r
}\r
.fit-toggle input:checked + .fit-toggle-track::after {\r
  transform: translateX(14px);\r
  background: #fff;\r
}\r
.fit-toggle-label { font-size: 12px; font-weight: 500; color: var(--txt); }\r
\r
.fit-control-group {\r
  display: flex;\r
  align-items: center;\r
  gap: 6px;\r
  flex-shrink: 0;\r
  transition: opacity var(--transition);\r
}\r
.fit-hint-label {\r
  font-size: 10px;\r
  font-weight: 500;\r
  color: var(--txt2);\r
  white-space: nowrap;\r
}\r
\r
/* ================================================================== */\r
/*  Side padding stepper                                               */\r
/* ================================================================== */\r
.stepper {\r
  display: flex;\r
  align-items: stretch;\r
  border: 1px solid var(--border);\r
  border-radius: var(--r);\r
  overflow: hidden;\r
  background: var(--bg);\r
  min-width: 132px;\r
}\r
.stepper-btn {\r
  width: 34px;\r
  border: none;\r
  background: #2f2f36;\r
  color: var(--txt);\r
  font-size: 16px;\r
  font-weight: 700;\r
  cursor: pointer;\r
  transition: all var(--transition);\r
}\r
.stepper-btn:hover { color: #fff; background: #3d3d47; }\r
.stepper-btn:active { transform: scale(.98); }\r
.stepper-input {\r
  width: 64px;\r
  border: none;\r
  border-left: 1px solid var(--border-lt);\r
  border-right: 1px solid var(--border-lt);\r
  background: transparent;\r
  color: var(--txt);\r
  text-align: center;\r
  font-size: 12px;\r
  font-weight: 600;\r
  outline: none;\r
}\r
.stepper-input::-webkit-outer-spin-button,\r
.stepper-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }\r
.stepper-input[type=number] { -moz-appearance: textfield; }\r
\r
/* ================================================================== */\r
/*  Utility                                                            */\r
/* ================================================================== */\r
.hidden { display: none !important; }\r
.hint { font-size: 10px; color: var(--txt3); margin-top: 6px; line-height: 1.4; }\r
.mt-sm { margin-top: 8px; }\r
.mt { margin-top: 12px; }\r
.fade-in { animation: fadeIn .2s ease; }\r
@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }\r
</style>\r
</head>\r
<body>\r
\r
<!-- ================================================================ -->\r
<!--  Header                                                           -->\r
<!-- ================================================================ -->\r
<header>\r
  <div class="logo">FT</div>\r
  <h1>Fintech Translator</h1>\r
  <span class="ver">v2.0</span>\r
</header>\r
\r
<!-- ================================================================ -->\r
<!--  Scrollable body                                                  -->\r
<!-- ================================================================ -->\r
<div class="scroll">\r
\r
  <div class="workflow-group">\r
    <!-- Engine -->\r
    <div class="section">\r
      <div class="field-label">Translation Engine</div>\r
      <div class="toggle-group">\r
        <button class="toggle-opt active" data-provider="free" id="provFree">\r
          <span>Google Translate</span>\r
          <span class="badge">Free</span>\r
        </button>\r
        <button class="toggle-opt" data-provider="openai" id="provPro">\r
          <span>OpenAI</span>\r
          <span class="badge">Pro</span>\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- API Key (Pro only) -->\r
    <div class="section hidden" id="proSettings">\r
      <div class="field-label">OpenAI API Key</div>\r
      <div class="input-row">\r
        <input class="input" id="apiKey" type="password" placeholder="sk-proj-..." />\r
        <button class="btn btn-icon" id="toggleKey" title="Show/hide">\r
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>\r
        </button>\r
        <button class="btn btn-outline" id="saveKey">Save</button>\r
      </div>\r
      <p class="hint">Stored locally in Figma. Never sent anywhere except OpenAI.</p>\r
      <div class="mt">\r
        <div class="field-label">Model</div>\r
        <select class="input" id="model">\r
          <option value="gpt-5.5-nano">GPT-5.5 Nano  \u2014  fastest, ~$0.25/1M</option>\r
          <option value="gpt-5.5-mini" selected>GPT-5.5 Mini  \u2014  balanced, ~$0.90/1M</option>\r
          <option value="gpt-5.5">GPT-5.5  \u2014  best quality, ~$3.50/1M</option>\r
          <option value="gpt-5.4-nano">GPT-5.4 Nano  \u2014  fastest, ~$0.20/1M</option>\r
          <option value="gpt-5.4-mini">GPT-5.4 Mini  \u2014  balanced, ~$0.75/1M</option>\r
          <option value="gpt-5.4">GPT-5.4  \u2014  best quality, ~$3/1M</option>\r
          <option value="gpt-4o-mini">GPT-4o Mini  \u2014  legacy</option>\r
          <option value="gpt-4o">GPT-4o  \u2014  legacy</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <!-- Languages -->\r
    <div class="section">\r
      <div class="field-label">Target Languages</div>\r
      <div class="chips">\r
        <label class="chip on" data-lang="es">\r
          <input type="checkbox" value="es" checked />\r
          <span class="flag">&#127466;&#127480;</span>\r
          <div class="lang-meta"><div class="name">Spanish</div><div class="code">ES</div></div>\r
        </label>\r
        <label class="chip on" data-lang="it">\r
          <input type="checkbox" value="it" checked />\r
          <span class="flag">&#127470;&#127481;</span>\r
          <div class="lang-meta"><div class="name">Italian</div><div class="code">IT</div></div>\r
        </label>\r
        <label class="chip on" data-lang="fr">\r
          <input type="checkbox" value="fr" checked />\r
          <span class="flag">&#127467;&#127479;</span>\r
          <div class="lang-meta"><div class="name">French</div><div class="code">FR</div></div>\r
        </label>\r
        <label class="chip on" data-lang="de">\r
          <input type="checkbox" value="de" checked />\r
          <span class="flag">&#127465;&#127466;</span>\r
          <div class="lang-meta"><div class="name">Deutsch</div><div class="code">DE</div></div>\r
        </label>\r
        <label class="chip on" data-lang="pt">\r
          <input type="checkbox" value="pt" checked />\r
          <span class="flag">&#127477;&#127481;</span>\r
          <div class="lang-meta"><div class="name">Portugu\xEAs (PT)</div><div class="code">PT</div></div>\r
        </label>\r
        <label class="chip on" data-lang="pt-br">\r
          <input type="checkbox" value="pt-br" checked />\r
          <span class="flag">&#127463;&#127479;</span>\r
          <div class="lang-meta"><div class="name">Portugu\xEAs (BR)</div><div class="code">PT-BR</div></div>\r
        </label>\r
        <label class="chip" data-lang="pl">\r
          <input type="checkbox" value="pl" />\r
          <span class="flag">&#127477;&#127473;</span>\r
          <div class="lang-meta"><div class="name">Polski</div><div class="code">PL</div></div>\r
        </label>\r
        <label class="chip" data-lang="el">\r
          <input type="checkbox" value="el" />\r
          <span class="flag">&#127468;&#127479;</span>\r
          <div class="lang-meta"><div class="name">\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC</div><div class="code">EL</div></div>\r
        </label>\r
        <label class="chip" data-lang="tr">\r
          <input type="checkbox" value="tr" />\r
          <span class="flag">&#127481;&#127479;</span>\r
          <div class="lang-meta"><div class="name">T\xFCrk\xE7e</div><div class="code">TR</div></div>\r
        </label>\r
        <label class="chip" data-lang="ko">\r
          <input type="checkbox" value="ko" />\r
          <span class="flag">&#127472;&#127479;</span>\r
          <div class="lang-meta"><div class="name">\uD55C\uAD6D\uC5B4</div><div class="code">KO</div></div>\r
        </label>\r
        <label class="chip" data-lang="zh">\r
          <input type="checkbox" value="zh" />\r
          <span class="flag">&#127464;&#127475;</span>\r
          <div class="lang-meta"><div class="name">\u4E2D\u6587</div><div class="code">ZH</div></div>\r
        </label>\r
        <label class="chip" data-lang="ja">\r
          <input type="checkbox" value="ja" />\r
          <span class="flag">&#127471;&#127477;</span>\r
          <div class="lang-meta"><div class="name">\u65E5\u672C\u8A9E</div><div class="code">JA</div></div>\r
        </label>\r
      </div>\r
    </div>\r
\r
    <!-- Lock terms -->\r
    <div class="section" style="margin-bottom:0">\r
      <div class="field-label">Do Not Translate</div>\r
      <input class="lock-input" id="lockTerms" type="text"\r
             placeholder="Maclear, 8lends, USDC, KYC, APR\u2026  (comma-separated)" />\r
      <p class="hint">These exact terms stay in English across all translations.</p>\r
    </div>\r
  </div>\r
\r
  <div class="workflow-group">\r
    <!-- Selection-changed warning -->\r
    <div class="rescan-warn hidden" id="rescanWarn">\r
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>\r
      Selection changed \u2014 <strong id="rescanLink">Scan again</strong> to update\r
    </div>\r
\r
    <!-- Scan: primary hero action -->\r
    <div class="section section-scan" style="margin-bottom:0">\r
      <button class="btn btn-primary btn-full scan-cta" id="scanBtn">\r
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>\r
        Scan Selection\r
      </button>\r
      <p id="emptyState" class="scan-hint" role="status">\r
        Select frames on the canvas, then tap <strong>Scan</strong>\r
      </p>\r
    </div>\r
  </div>\r
\r
  <!-- Preview (revealed after scan) -->\r
  <div class="section hidden fade-in" id="previewSection">\r
    <div class="section-label">Found Texts <span id="countBadge" style="color:var(--primary)"></span></div>\r
    <div class="preview-box" id="previewBox"></div>\r
  </div>\r
\r
  <!-- Cost estimate (revealed after scan) -->\r
  <div class="section hidden fade-in" id="costSection">\r
    <div class="section-label">Estimated Cost</div>\r
    <div class="cost-card" id="costCard"></div>\r
  </div>\r
\r
  <!-- Progress (revealed during translation) -->\r
  <div class="progress-section panel panel--progress hidden" id="progressSection">\r
    <div class="progress-head">\r
      <span class="progress-eyebrow">Progress</span>\r
    </div>\r
    <div class="progress-outer"><div class="progress-inner" id="progressBar"></div></div>\r
    <div class="progress-label" id="progressLabel">Ready</div>\r
  </div>\r
\r
  <!-- Review panel (revealed after translation) -->\r
  <div class="section hidden fade-in" id="reviewSection">\r
    <div class="section-label">Review <span style="font-weight:400;color:var(--txt3)">\xB7 Fit % \xB7 next: Apply</span></div>\r
    <div class="review-panel">\r
      <div class="review-tabs" id="reviewTabs"></div>\r
      <div class="review-header">\r
        <span>Source EN (editable)</span>\r
        <span>Translation</span>\r
        <span>Fit</span>\r
      </div>\r
      <div class="review-scroll">\r
        <div id="reviewRows"></div>\r
      </div>\r
    </div>\r
    <div class="review-summary" id="reviewSummary"></div>\r
  </div>\r
\r
  <div class="section-divider"><span>Advanced</span></div>\r
\r
  <!-- Smart Fit -->\r
  <div class="section">\r
    <div class="field-label">Smart Fit</div>\r
    <div class="smartfit-block">\r
      <div class="fit-rows-stack">\r
        <div class="fit-row">\r
          <label class="fit-toggle" id="wrapToggle">\r
            <input type="checkbox" id="smartWrap" checked />\r
            <span class="fit-toggle-track"></span>\r
            <span class="fit-toggle-label">Wrap to frame width</span>\r
          </label>\r
          <div class="fit-control-group">\r
            <span class="fit-hint-label">Side padding</span>\r
            <div class="stepper">\r
              <button class="stepper-btn" id="padMinus" type="button">\u2212</button>\r
              <input class="stepper-input" id="sidePadding" type="number" min="0" max="80" step="1" value="16" />\r
              <button class="stepper-btn" id="padPlus" type="button">+</button>\r
            </div>\r
          </div>\r
        </div>\r
        <div class="fit-row">\r
          <label class="fit-toggle" id="expandFramesToggle">\r
            <input type="checkbox" id="expandFrames" checked />\r
            <span class="fit-toggle-track"></span>\r
            <span class="fit-toggle-label">Grow frames when text overflows</span>\r
          </label>\r
        </div>\r
        <div class="fit-row">\r
          <label class="fit-toggle" id="scaleToggle">\r
            <input type="checkbox" id="autoFontScale" />\r
            <span class="fit-toggle-track"></span>\r
            <span class="fit-toggle-label">Auto scale font if overflow</span>\r
          </label>\r
          <div class="fit-control-group" id="minFontGroup" style="opacity:.4;pointer-events:none">\r
            <span class="fit-hint-label">Min size</span>\r
            <div class="stepper">\r
              <button class="stepper-btn" id="minFontMinus" type="button">\u2212</button>\r
              <input class="stepper-input" id="minFontSize" type="number" min="6" max="24" step="1" value="8" />\r
              <button class="stepper-btn" id="minFontPlus" type="button">+</button>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
      <p class="hint">Wrap turns single-line text into wrapping mode. <strong>Grow frames</strong> widens/talls fixed cards (e.g. glass panels) so longer translations stay inside. Auto scale shrinks type instead.</p>\r
      <div class="smartfit-reset">\r
        <button type="button" id="smartFitRecommendedBtn">Use recommended defaults</button>\r
      </div>\r
      <details class="designer-tips">\r
        <summary>Layout tips \u2014 complex screens &amp; glass cards</summary>\r
        <ul>\r
          <li><strong>One frame per screen.</strong> Select the whole artboard (e.g. &quot;10&quot;). We clone it as one piece so staggered cards stay aligned with the illustration.</li>\r
          <li><strong>Inside each card,</strong> use vertical Auto Layout for list rows (icon + text). When text wraps, rows grow together; <strong>Grow frames</strong> expands the glass panel behind.</li>\r
          <li><strong>Long languages (ES, DE\u2026):</strong> keep <strong>Wrap</strong> + <strong>Grow frames</strong> on. Use <strong>Auto scale font</strong> only for fixed-size UI (tiny buttons, badges).</li>\r
        </ul>\r
      </details>\r
    </div>\r
  </div>\r
\r
  <!-- Sync from source -->\r
  <div class="section">\r
    <div class="field-label">Sync from Source</div>\r
    <div class="sync-card">\r
      <div class="sync-card-head">\r
        <div class="sync-card-icon">\r
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>\r
        </div>\r
        <div>\r
          <div class="sync-card-title">Update all language frames</div>\r
          <div class="sync-card-sub">Edit EN source, push to all locales at once</div>\r
        </div>\r
      </div>\r
      <p class="hint">Select one source frame. Matching frames on this page \u2014 <strong>BaseName [ES]</strong>, <strong>BaseName [IT]</strong>, <strong>[KO]</strong>, <strong>[ZH]</strong>, <strong>[JA]</strong>, \u2026 \u2014 receive fresh translations. Smart Fit settings above apply.</p>\r
      <button class="btn btn-secondary btn-full" type="button" id="syncRefBtn">\r
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>\r
        Sync Selected Frame to All Languages\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- Log -->\r
  <div class="log" id="logArea"></div>\r
\r
</div>\r
\r
<!-- ================================================================ -->\r
<!--  Bottom bar                                                       -->\r
<!-- ================================================================ -->\r
<div class="bottom">\r
  <div class="bottom-primary-slot">\r
    <button class="btn btn-primary btn-full" id="translateBtn" disabled type="button">\r
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></svg>\r
      <span id="translateLabel">Translate</span>\r
    </button>\r
    <button class="btn btn-primary btn-full hidden" id="applyBtn" disabled type="button">\r
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>\r
      Apply to canvas\r
    </button>\r
  </div>\r
  <button class="btn btn-outline btn-full hidden" id="cancelBtn" type="button" style="border-color:var(--red);color:var(--red)">\r
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>\r
    Cancel\r
  </button>\r
  <div class="cost-hint hidden" id="costHint"></div>\r
</div>\r
\r
<!-- ================================================================ -->\r
<!--  Script                                                           -->\r
<!-- ================================================================ -->\r
<!-- Loads before inline script; produced by npm run build -->\r
<script>
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
      const keyStartsWord = isWordChar(kl[0]);
      const keyEndsWord = isWordChar(kl[kl.length - 1]);
      const leftBad = keyStartsWord && idx > 0 && isWordChar(t[idx - 1]);
      const rightBad = keyEndsWord && idx + k.length < t.length && isWordChar(t[idx + k.length]);
      if (leftBad || rightBad)
        continue;
      const before = t.slice(0, idx);
      const after = t.slice(idx + k.length);
      const trans = glossaryMap[k];
      return before + trans + after;
    }
    return null;
  }
  function isWordChar(ch) {
    return ch != null && /[\\p{L}\\p{N}]/u.test(ch);
  }
  return __toCommonJS(glossary_lookup_exports);
})();

<\/script>\r
<script>\r
/* ================================================================== */\r
/*  Glossary                                                           */\r
/* ================================================================== */\r
const GLOSSARY = {\r
  es: {\r
    // Core finance\r
    "APR":"TAE","Annual Percentage Rate":"Tasa Anual Equivalente",\r
    "interest rate":"tasa de inter\xE9s","annual returns":"rendimientos anuales",\r
    "monthly payouts":"pagos mensuales","monthly payments":"pagos mensuales",\r
    "balance":"saldo","statement":"extracto","account":"cuenta",\r
    "deposit":"dep\xF3sito","withdrawal":"retiro","wire transfer":"transferencia bancaria",\r
    "transaction":"transacci\xF3n","payment":"pago","invoice":"factura",\r
    "fee":"comisi\xF3n","no hidden fees":"sin comisiones ocultas",\r
    // P2P / Crowdlending (Maclear)\r
    "P2P lending":"pr\xE9stamos P2P","crowdlending":"crowdlending",\r
    "crowdfunding":"financiaci\xF3n colectiva","lending platform":"plataforma de pr\xE9stamos",\r
    "investment platform":"plataforma de inversi\xF3n",\r
    "investor":"inversor","investors":"inversores",\r
    "borrower":"prestatario","lender":"prestamista",\r
    "loan":"pr\xE9stamo","loan period":"plazo del pr\xE9stamo","loan term":"plazo del pr\xE9stamo",\r
    "loan originator":"originador de pr\xE9stamos",\r
    "funded":"financiado","repaid":"reembolsado",\r
    "default":"impago","late loans":"pr\xE9stamos con retraso",\r
    "cash drag":"capital inactivo",\r
    "primary market":"mercado primario","secondary market":"mercado secundario",\r
    "total funded":"total financiado","total interest paid":"total de intereses pagados",\r
    "available funds":"fondos disponibles","invested funds":"fondos invertidos",\r
    "total funds":"fondos totales",\r
    // Investment\r
    "initial investment":"inversi\xF3n inicial","investment period":"per\xEDodo de inversi\xF3n",\r
    "future value":"valor futuro","earned return":"rendimiento obtenido",\r
    "average annual return":"rendimiento medio anual",\r
    "portfolio":"cartera","passive income":"ingresos pasivos",\r
    "principal repayment":"devoluci\xF3n del capital",\r
    "interest payment":"pago de intereses",\r
    "installment":"cuota","recurring payment":"pago recurrente",\r
    // Compliance & process\r
    "due diligence":"diligencia debida","risk assessment":"evaluaci\xF3n de riesgos",\r
    "risk scoring":"puntuaci\xF3n de riesgo","AML":"AML",\r
    "compliance":"cumplimiento normativo","regulated":"regulado",\r
    "verification":"verificaci\xF3n","KYC":"KYC",\r
    // Bonuses & rewards\r
    "referral bonus":"bono de referido","loyalty bonus":"bono de fidelidad",\r
    "welcome bonus":"bono de bienvenida","investment reward":"recompensa de inversi\xF3n",\r
    "invite friends":"invitar amigos",\r
    // UI actions\r
    "sign up":"registrarse","log in":"iniciar sesi\xF3n","register":"registrarse",\r
    "invest now":"invertir ahora","start investing":"empezar a invertir",\r
    "dashboard":"panel de control","onboarding":"alta de cliente",\r
    // General finance\r
    "collateral":"garant\xEDa","mortgage":"hipoteca","savings":"ahorros",\r
    "credit score":"puntuaci\xF3n crediticia","overdraft":"sobregiro",\r
    "chargeback":"contracargo","settlement":"liquidaci\xF3n",\r
    "direct debit":"domiciliaci\xF3n bancaria","exchange rate":"tipo de cambio",\r
    "payee":"beneficiario","payer":"pagador","beneficiary":"beneficiario",\r
    "equity":"capital","liability":"pasivo","asset":"activo",\r
    "dividend":"dividendo","spending limit":"l\xEDmite de gasto",\r
    // Crypto / Web3 (Maclear Crypto Course)\r
    "blockchain":"blockchain","token":"token","tokens":"tokens",\r
    "stablecoin":"stablecoin","stablecoins":"stablecoins",\r
    "cryptocurrency":"criptomoneda","crypto":"cripto",\r
    "crypto wallet":"monedero cripto","wallet":"monedero",\r
    "seed phrase":"frase semilla","private key":"clave privada",\r
    "public address":"direcci\xF3n p\xFAblica","smart contract":"contrato inteligente",\r
    "network fees":"comisiones de red","gas fees":"tarifas de gas",\r
    "custodial":"custodiado","non-custodial":"no custodiado",\r
    "custodial wallet":"monedero custodiado",\r
    "non-custodial wallet":"monedero auto-custodiado",\r
    "fiat":"moneda fiduciaria","pegged":"vinculado",\r
    "decentralized":"descentralizado","centralized":"centralizado",\r
    "capital provider":"proveedor de capital",\r
    "repayment schedule":"calendario de pagos",\r
    "leverage":"apalancamiento","diversification":"diversificaci\xF3n",\r
    "yield":"rendimiento","returns":"rendimientos",\r
    "liquidity":"liquidez","protocol":"protocolo",\r
    "staking":"staking","airdrop":"airdrop",\r
    "mining":"miner\xEDa","validator":"validador",\r
    "consensus":"consenso","bridge":"puente",\r
    "on-chain":"on-chain","off-chain":"off-chain",\r
    "scam":"estafa","phishing":"phishing",\r
    "Learn & Earn":"Aprende y Gana",\r
    "start learning":"empezar a aprender",\r
    "checklist":"lista de verificaci\xF3n",\r
    "step-by-step":"paso a paso",\r
    "beginner":"principiante","beginners":"principiantes",\r
    // Tech terms \u2014 must stay untranslated\r
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",\r
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","DEX":"DEX","CEX":"CEX","DApp":"DApp",\r
    "Layer 1":"Layer 1","Layer 2":"Layer 2",\r
    // Date/era labels \u2014 keep verbatim\r
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",\r
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",\r
    // Infographic card text \u2014 concise translations\r
    "Evolution of the Web from 1.0 to 3.0":"Evoluci\xF3n de la Web del 1.0 al 3.0",\r
    "Static read-only web pages":"P\xE1ginas web est\xE1ticas de solo lectura",\r
    "Information-centric and interactive":"Centrada en la informaci\xF3n e interactiva",\r
    "User-centric, decentralized, private and secure":"Centrada en el usuario, descentralizada, privada y segura",\r
    "read-only":"solo lectura","user-centric":"centrada en el usuario",\r
    "private and secure":"privada y segura"\r
  },\r
  it: {\r
    "APR":"TAEG","Annual Percentage Rate":"Tasso Annuo Effettivo Globale",\r
    "interest rate":"tasso di interesse","annual returns":"rendimenti annuali",\r
    "monthly payouts":"pagamenti mensili","monthly payments":"pagamenti mensili",\r
    "balance":"saldo","statement":"estratto conto","account":"conto",\r
    "deposit":"deposito","withdrawal":"prelievo","wire transfer":"bonifico bancario",\r
    "transaction":"transazione","payment":"pagamento","invoice":"fattura",\r
    "fee":"commissione","no hidden fees":"nessuna commissione nascosta",\r
    "P2P lending":"prestiti P2P","crowdlending":"crowdlending",\r
    "crowdfunding":"crowdfunding","lending platform":"piattaforma di prestiti",\r
    "investment platform":"piattaforma di investimento",\r
    "investor":"investitore","investors":"investitori",\r
    "borrower":"mutuatario","lender":"prestatore",\r
    "loan":"prestito","loan period":"durata del prestito","loan term":"durata del prestito",\r
    "loan originator":"originatore di prestiti",\r
    "funded":"finanziato","repaid":"rimborsato",\r
    "default":"insolvenza","late loans":"prestiti in ritardo",\r
    "cash drag":"capitale inattivo",\r
    "primary market":"mercato primario","secondary market":"mercato secondario",\r
    "total funded":"totale finanziato","total interest paid":"totale interessi pagati",\r
    "available funds":"fondi disponibili","invested funds":"fondi investiti",\r
    "total funds":"fondi totali",\r
    "initial investment":"investimento iniziale","investment period":"periodo di investimento",\r
    "future value":"valore futuro","earned return":"rendimento ottenuto",\r
    "average annual return":"rendimento medio annuo",\r
    "portfolio":"portafoglio","passive income":"reddito passivo",\r
    "principal repayment":"rimborso del capitale",\r
    "interest payment":"pagamento degli interessi",\r
    "installment":"rata","recurring payment":"pagamento ricorrente",\r
    "due diligence":"due diligence","risk assessment":"valutazione del rischio",\r
    "risk scoring":"punteggio di rischio","AML":"AML",\r
    "compliance":"conformit\xE0 normativa","regulated":"regolamentato",\r
    "verification":"verifica","KYC":"KYC",\r
    "referral bonus":"bonus referral","loyalty bonus":"bonus fedelt\xE0",\r
    "welcome bonus":"bonus di benvenuto","investment reward":"premio di investimento",\r
    "invite friends":"invita amici",\r
    "sign up":"registrati","log in":"accedi","register":"registrati",\r
    "invest now":"investi ora","start investing":"inizia a investire",\r
    "dashboard":"pannello di controllo","onboarding":"registrazione cliente",\r
    "collateral":"garanzia","mortgage":"mutuo","savings":"risparmi",\r
    "credit score":"punteggio di credito","overdraft":"scoperto",\r
    "chargeback":"storno","settlement":"regolamento",\r
    "direct debit":"addebito diretto","exchange rate":"tasso di cambio",\r
    "payee":"beneficiario","payer":"pagatore","beneficiary":"beneficiario",\r
    "equity":"capitale","liability":"passivit\xE0","asset":"attivit\xE0",\r
    "dividend":"dividendo","spending limit":"limite di spesa",\r
    "blockchain":"blockchain","token":"token","tokens":"token",\r
    "stablecoin":"stablecoin","stablecoins":"stablecoin",\r
    "cryptocurrency":"criptovaluta","crypto":"cripto",\r
    "crypto wallet":"portafoglio crypto","wallet":"portafoglio",\r
    "seed phrase":"frase seed","private key":"chiave privata",\r
    "public address":"indirizzo pubblico","smart contract":"contratto intelligente",\r
    "network fees":"commissioni di rete","gas fees":"commissioni gas",\r
    "custodial":"custodiale","non-custodial":"non custodiale",\r
    "custodial wallet":"portafoglio custodiale",\r
    "non-custodial wallet":"portafoglio non custodiale",\r
    "fiat":"valuta fiat","pegged":"ancorato",\r
    "decentralized":"decentralizzato","centralized":"centralizzato",\r
    "capital provider":"fornitore di capitale",\r
    "repayment schedule":"piano di rimborso",\r
    "leverage":"leva finanziaria","diversification":"diversificazione",\r
    "yield":"rendimento","returns":"rendimenti",\r
    "liquidity":"liquidit\xE0","protocol":"protocollo",\r
    "staking":"staking","airdrop":"airdrop",\r
    "mining":"mining","validator":"validatore",\r
    "consensus":"consenso","bridge":"bridge",\r
    "on-chain":"on-chain","off-chain":"off-chain",\r
    "scam":"truffa","phishing":"phishing",\r
    "Learn & Earn":"Impara e Guadagna",\r
    "start learning":"inizia a imparare",\r
    "checklist":"checklist","step-by-step":"passo dopo passo",\r
    "beginner":"principiante","beginners":"principianti",\r
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",\r
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","DEX":"DEX","CEX":"CEX","DApp":"DApp",\r
    "Layer 1":"Layer 1","Layer 2":"Layer 2",\r
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",\r
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",\r
    "Evolution of the Web from 1.0 to 3.0":"Evoluzione del Web dal 1.0 al 3.0",\r
    "Static read-only web pages":"Pagine web statiche in sola lettura",\r
    "Information-centric and interactive":"Incentrato sulle informazioni e interattivo",\r
    "User-centric, decentralized, private and secure":"Incentrato sull'utente, decentralizzato, privato e sicuro",\r
    "read-only":"sola lettura","user-centric":"incentrato sull'utente"\r
  },\r
  fr: {\r
    "APR":"TAEG","Annual Percentage Rate":"Taux Annuel Effectif Global",\r
    "interest rate":"taux d'int\xE9r\xEAt","annual returns":"rendements annuels",\r
    "monthly payouts":"versements mensuels","monthly payments":"paiements mensuels",\r
    "balance":"solde","statement":"relev\xE9","account":"compte",\r
    "deposit":"d\xE9p\xF4t","withdrawal":"retrait","wire transfer":"virement bancaire",\r
    "transaction":"transaction","payment":"paiement","invoice":"facture",\r
    "fee":"frais","no hidden fees":"aucuns frais cach\xE9s",\r
    "P2P lending":"pr\xEAt P2P","crowdlending":"crowdlending",\r
    "crowdfunding":"financement participatif","lending platform":"plateforme de pr\xEAt",\r
    "investment platform":"plateforme d'investissement",\r
    "investor":"investisseur","investors":"investisseurs",\r
    "borrower":"emprunteur","lender":"pr\xEAteur",\r
    "loan":"pr\xEAt","loan period":"dur\xE9e du pr\xEAt","loan term":"dur\xE9e du pr\xEAt",\r
    "loan originator":"originateur de pr\xEAts",\r
    "funded":"financ\xE9","repaid":"rembours\xE9",\r
    "default":"d\xE9faut de paiement","late loans":"pr\xEAts en retard",\r
    "cash drag":"capital inactif",\r
    "primary market":"march\xE9 primaire","secondary market":"march\xE9 secondaire",\r
    "total funded":"total financ\xE9","total interest paid":"total des int\xE9r\xEAts vers\xE9s",\r
    "available funds":"fonds disponibles","invested funds":"fonds investis",\r
    "total funds":"fonds totaux",\r
    "initial investment":"investissement initial","investment period":"p\xE9riode d'investissement",\r
    "future value":"valeur future","earned return":"rendement obtenu",\r
    "average annual return":"rendement annuel moyen",\r
    "portfolio":"portefeuille","passive income":"revenu passif",\r
    "principal repayment":"remboursement du capital",\r
    "interest payment":"paiement des int\xE9r\xEAts",\r
    "installment":"versement","recurring payment":"paiement r\xE9current",\r
    "due diligence":"v\xE9rification pr\xE9alable","risk assessment":"\xE9valuation des risques",\r
    "risk scoring":"notation du risque","AML":"LCB",\r
    "compliance":"conformit\xE9 r\xE9glementaire","regulated":"r\xE9glement\xE9",\r
    "verification":"v\xE9rification","KYC":"KYC",\r
    "referral bonus":"prime de parrainage","loyalty bonus":"prime de fid\xE9lit\xE9",\r
    "welcome bonus":"prime de bienvenue","investment reward":"r\xE9compense d'investissement",\r
    "invite friends":"inviter des amis",\r
    "sign up":"s'inscrire","log in":"se connecter","register":"s'inscrire",\r
    "invest now":"investir maintenant","start investing":"commencer \xE0 investir",\r
    "dashboard":"tableau de bord","onboarding":"inscription client",\r
    "collateral":"garantie","mortgage":"pr\xEAt hypoth\xE9caire","savings":"\xE9pargne",\r
    "credit score":"cote de cr\xE9dit","overdraft":"d\xE9couvert",\r
    "chargeback":"r\xE9trofacturation","settlement":"r\xE8glement",\r
    "direct debit":"pr\xE9l\xE8vement automatique","exchange rate":"taux de change",\r
    "payee":"b\xE9n\xE9ficiaire","payer":"payeur","beneficiary":"b\xE9n\xE9ficiaire",\r
    "equity":"capitaux propres","liability":"passif","asset":"actif",\r
    "dividend":"dividende","spending limit":"plafond de d\xE9penses",\r
    "blockchain":"blockchain","token":"jeton","tokens":"jetons",\r
    "stablecoin":"stablecoin","stablecoins":"stablecoins",\r
    "cryptocurrency":"cryptomonnaie","crypto":"crypto",\r
    "crypto wallet":"portefeuille crypto","wallet":"portefeuille",\r
    "seed phrase":"phrase de r\xE9cup\xE9ration","private key":"cl\xE9 priv\xE9e",\r
    "public address":"adresse publique","smart contract":"contrat intelligent",\r
    "network fees":"frais de r\xE9seau","gas fees":"frais de gas",\r
    "custodial":"custodial","non-custodial":"non-custodial",\r
    "custodial wallet":"portefeuille custodial",\r
    "non-custodial wallet":"portefeuille non-custodial",\r
    "fiat":"monnaie fiduciaire","pegged":"index\xE9",\r
    "decentralized":"d\xE9centralis\xE9","centralized":"centralis\xE9",\r
    "capital provider":"fournisseur de capital",\r
    "repayment schedule":"calendrier de remboursement",\r
    "leverage":"effet de levier","diversification":"diversification",\r
    "yield":"rendement","returns":"rendements",\r
    "liquidity":"liquidit\xE9","protocol":"protocole",\r
    "staking":"staking","airdrop":"airdrop",\r
    "mining":"minage","validator":"validateur",\r
    "consensus":"consensus","bridge":"pont",\r
    "on-chain":"on-chain","off-chain":"off-chain",\r
    "scam":"arnaque","phishing":"hame\xE7onnage",\r
    "Learn & Earn":"Apprendre et Gagner",\r
    "start learning":"commencer \xE0 apprendre",\r
    "checklist":"liste de contr\xF4le","step-by-step":"\xE9tape par \xE9tape",\r
    "beginner":"d\xE9butant","beginners":"d\xE9butants",\r
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",\r
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","DEX":"DEX","CEX":"CEX","DApp":"DApp",\r
    "Layer 1":"Layer 1","Layer 2":"Layer 2",\r
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",\r
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",\r
    "Evolution of the Web from 1.0 to 3.0":"\xC9volution du Web de 1.0 \xE0 3.0",\r
    "Static read-only web pages":"Pages web statiques en lecture seule",\r
    "Information-centric and interactive":"Centr\xE9 sur l'information et interactif",\r
    "User-centric, decentralized, private and secure":"Centr\xE9 sur l'utilisateur, d\xE9centralis\xE9, priv\xE9 et s\xE9curis\xE9",\r
    "read-only":"lecture seule","user-centric":"centr\xE9 utilisateur"\r
  },\r
  de: {\r
    "APR":"Eff. Jahreszins","Annual Percentage Rate":"Effektiver Jahreszins",\r
    "interest rate":"Zinssatz","annual returns":"Jahresrendite",\r
    "monthly payouts":"monatliche Auszahlungen","monthly payments":"monatliche Zahlungen",\r
    "balance":"Kontostand","statement":"Kontoauszug","account":"Konto",\r
    "deposit":"Einzahlung","withdrawal":"Auszahlung","wire transfer":"Bank\xFCberweisung",\r
    "transaction":"Transaktion","payment":"Zahlung","invoice":"Rechnung",\r
    "fee":"Geb\xFChr","no hidden fees":"keine versteckten Geb\xFChren",\r
    "P2P lending":"P2P-Kreditvergabe","crowdlending":"Crowdlending",\r
    "crowdfunding":"Crowdfunding","lending platform":"Kreditplattform",\r
    "investment platform":"Investitionsplattform",\r
    "investor":"Investor","investors":"Investoren",\r
    "borrower":"Kreditnehmer","lender":"Kreditgeber",\r
    "loan":"Kredit","loan period":"Kreditlaufzeit","loan term":"Kreditlaufzeit",\r
    "loan originator":"Kreditanbahner",\r
    "funded":"finanziert","repaid":"zur\xFCckgezahlt",\r
    "default":"Ausfall","late loans":"versp\xE4tete Kredite",\r
    "cash drag":"Kapitalverz\xF6gerung",\r
    "primary market":"Prim\xE4rmarkt","secondary market":"Sekund\xE4rmarkt",\r
    "total funded":"Gesamtfinanzierung","total interest paid":"Gesamtzinsen gezahlt",\r
    "available funds":"verf\xFCgbare Mittel","invested funds":"investierte Mittel",\r
    "total funds":"Gesamtmittel",\r
    "initial investment":"Erstinvestition","investment period":"Investitionszeitraum",\r
    "future value":"Endwert","earned return":"erzielter Ertrag",\r
    "average annual return":"durchschnittliche Jahresrendite",\r
    "portfolio":"Portfolio","passive income":"passives Einkommen",\r
    "principal repayment":"Kapitalr\xFCckzahlung",\r
    "interest payment":"Zinszahlung",\r
    "installment":"Rate","recurring payment":"Dauerauftrag",\r
    "due diligence":"Sorgfaltspr\xFCfung","risk assessment":"Risikobewertung",\r
    "risk scoring":"Risikobewertung","AML":"GwG",\r
    "compliance":"Compliance","regulated":"reguliert",\r
    "verification":"Verifizierung","KYC":"KYC",\r
    "referral bonus":"Empfehlungsbonus","loyalty bonus":"Treuebonus",\r
    "welcome bonus":"Willkommensbonus","investment reward":"Investitionspr\xE4mie",\r
    "invite friends":"Freunde einladen",\r
    "sign up":"registrieren","log in":"anmelden","register":"registrieren",\r
    "invest now":"jetzt investieren","start investing":"jetzt anlegen",\r
    "dashboard":"Dashboard","onboarding":"Kontoer\xF6ffnung",\r
    "collateral":"Sicherheit","mortgage":"Hypothek","savings":"Ersparnisse",\r
    "credit score":"Bonit\xE4tsbewertung","overdraft":"\xDCberziehung",\r
    "chargeback":"R\xFCckbuchung","settlement":"Abrechnung",\r
    "direct debit":"Lastschrift","exchange rate":"Wechselkurs",\r
    "payee":"Zahlungsempf\xE4nger","payer":"Zahler","beneficiary":"Beg\xFCnstigter",\r
    "equity":"Eigenkapital","liability":"Verbindlichkeit","asset":"Verm\xF6genswert",\r
    "dividend":"Dividende","spending limit":"Ausgabenlimit",\r
    "blockchain":"Blockchain","token":"Token","tokens":"Token",\r
    "stablecoin":"Stablecoin","stablecoins":"Stablecoins",\r
    "cryptocurrency":"Kryptow\xE4hrung","crypto":"Krypto",\r
    "crypto wallet":"Krypto-Wallet","wallet":"Wallet",\r
    "seed phrase":"Seed-Phrase","private key":"privater Schl\xFCssel",\r
    "public address":"\xF6ffentliche Adresse","smart contract":"Smart Contract",\r
    "network fees":"Netzwerkgeb\xFChren","gas fees":"Gas-Geb\xFChren",\r
    "custodial":"verwahrt","non-custodial":"nicht-verwahrt",\r
    "custodial wallet":"verwahrtes Wallet",\r
    "non-custodial wallet":"nicht-verwahrtes Wallet",\r
    "fiat":"Fiatgeld","pegged":"gebunden",\r
    "decentralized":"dezentralisiert","centralized":"zentralisiert",\r
    "capital provider":"Kapitalgeber",\r
    "repayment schedule":"Tilgungsplan",\r
    "leverage":"Hebelwirkung","diversification":"Diversifizierung",\r
    "yield":"Rendite","returns":"Ertr\xE4ge",\r
    "liquidity":"Liquidit\xE4t","protocol":"Protokoll",\r
    "staking":"Staking","airdrop":"Airdrop",\r
    "mining":"Mining","validator":"Validator",\r
    "consensus":"Konsens","bridge":"Bridge",\r
    "on-chain":"On-Chain","off-chain":"Off-Chain",\r
    "scam":"Betrug","phishing":"Phishing",\r
    "Learn & Earn":"Lernen und Verdienen",\r
    "start learning":"jetzt lernen",\r
    "checklist":"Checkliste","step-by-step":"Schritt f\xFCr Schritt",\r
    "beginner":"Anf\xE4nger","beginners":"Anf\xE4nger",\r
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",\r
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","DEX":"DEX","CEX":"CEX","DApp":"DApp",\r
    "Layer 1":"Layer 1","Layer 2":"Layer 2",\r
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",\r
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",\r
    "Evolution of the Web from 1.0 to 3.0":"Entwicklung des Webs von 1.0 bis 3.0",\r
    "Static read-only web pages":"Statische, schreibgesch\xFCtzte Webseiten",\r
    "Information-centric and interactive":"Informationszentriert und interaktiv",\r
    "User-centric, decentralized, private and secure":"Nutzerzentriert, dezentral, privat und sicher",\r
    "read-only":"schreibgesch\xFCtzt","user-centric":"nutzerzentriert"\r
  },\r
  pt: {\r
    "APR":"TAEG","Annual Percentage Rate":"Taxa Anual Efetiva Global",\r
    "interest rate":"taxa de juro","annual returns":"rendimento anual",\r
    "monthly payouts":"pagamentos mensais","monthly payments":"pagamentos mensais",\r
    "balance":"saldo","statement":"extrato","account":"conta",\r
    "deposit":"dep\xF3sito","withdrawal":"levantamento","wire transfer":"transfer\xEAncia banc\xE1ria",\r
    "transaction":"transa\xE7\xE3o","payment":"pagamento","invoice":"fatura",\r
    "fee":"comiss\xE3o","no hidden fees":"sem taxas ocultas",\r
    "P2P lending":"empr\xE9stimos P2P","crowdlending":"crowdlending",\r
    "crowdfunding":"financiamento coletivo","lending platform":"plataforma de empr\xE9stimos",\r
    "investment platform":"plataforma de investimento",\r
    "investor":"investidor","investors":"investidores",\r
    "borrower":"mutu\xE1rio","lender":"mutuante",\r
    "loan":"empr\xE9stimo","loan period":"prazo do empr\xE9stimo","loan term":"prazo do empr\xE9stimo",\r
    "loan originator":"originador de empr\xE9stimos",\r
    "funded":"financiado","repaid":"reembolsado",\r
    "default":"incumprimento","late loans":"empr\xE9stimos em atraso",\r
    "cash drag":"capital inativo",\r
    "primary market":"mercado prim\xE1rio","secondary market":"mercado secund\xE1rio",\r
    "total funded":"total financiado","total interest paid":"total de juros pagos",\r
    "available funds":"fundos dispon\xEDveis","invested funds":"fundos investidos",\r
    "total funds":"fundos totais",\r
    "initial investment":"investimento inicial","investment period":"per\xEDodo de investimento",\r
    "future value":"valor futuro","earned return":"rendimento obtido",\r
    "average annual return":"rendimento anual m\xE9dio",\r
    "portfolio":"carteira","passive income":"rendimento passivo",\r
    "principal repayment":"reembolso do capital",\r
    "interest payment":"pagamento de juros",\r
    "installment":"presta\xE7\xE3o","recurring payment":"pagamento recorrente",\r
    "due diligence":"auditoria pr\xE9via","risk assessment":"avalia\xE7\xE3o de risco",\r
    "risk scoring":"pontua\xE7\xE3o de risco","AML":"ABC",\r
    "compliance":"conformidade regulamentar","regulated":"regulamentado",\r
    "verification":"verifica\xE7\xE3o","KYC":"KYC",\r
    "referral bonus":"b\xF3nus de refer\xEAncia","loyalty bonus":"b\xF3nus de fidelidade",\r
    "welcome bonus":"b\xF3nus de boas-vindas","investment reward":"recompensa de investimento",\r
    "invite friends":"convidar amigos",\r
    "sign up":"registar","log in":"iniciar sess\xE3o","register":"registar",\r
    "invest now":"investir agora","start investing":"come\xE7ar a investir",\r
    "dashboard":"painel de controlo","onboarding":"registo de cliente",\r
    "collateral":"garantia","mortgage":"hipoteca","savings":"poupan\xE7as",\r
    "credit score":"pontua\xE7\xE3o de cr\xE9dito","overdraft":"descoberto",\r
    "chargeback":"estorno","settlement":"liquida\xE7\xE3o",\r
    "direct debit":"d\xE9bito direto","exchange rate":"taxa de c\xE2mbio",\r
    "payee":"benefici\xE1rio","payer":"pagador","beneficiary":"benefici\xE1rio",\r
    "equity":"capital pr\xF3prio","liability":"passivo","asset":"ativo",\r
    "dividend":"dividendo","spending limit":"limite de gastos",\r
    "blockchain":"blockchain","token":"token","tokens":"tokens",\r
    "stablecoin":"stablecoin","stablecoins":"stablecoins",\r
    "cryptocurrency":"criptomoeda","crypto":"cripto",\r
    "crypto wallet":"carteira cripto","wallet":"carteira",\r
    "seed phrase":"frase-semente","private key":"chave privada",\r
    "public address":"endere\xE7o p\xFAblico","smart contract":"contrato inteligente",\r
    "network fees":"taxas de rede","gas fees":"taxas de gas",\r
    "custodial":"custodial","non-custodial":"n\xE3o custodial",\r
    "custodial wallet":"carteira custodial",\r
    "non-custodial wallet":"carteira n\xE3o custodial",\r
    "fiat":"moeda fiduci\xE1ria","pegged":"indexado",\r
    "decentralized":"descentralizado","centralized":"centralizado",\r
    "capital provider":"provedor de capital",\r
    "repayment schedule":"calend\xE1rio de reembolso",\r
    "leverage":"alavancagem","diversification":"diversifica\xE7\xE3o",\r
    "yield":"rendimento","returns":"rendimentos",\r
    "liquidity":"liquidez","protocol":"protocolo",\r
    "staking":"staking","airdrop":"airdrop",\r
    "mining":"minera\xE7\xE3o","validator":"validador",\r
    "consensus":"consenso","bridge":"ponte",\r
    "on-chain":"on-chain","off-chain":"off-chain",\r
    "scam":"fraude","phishing":"phishing",\r
    "Learn & Earn":"Aprender e Ganhar",\r
    "start learning":"come\xE7ar a aprender",\r
    "checklist":"lista de verifica\xE7\xE3o","step-by-step":"passo a passo",\r
    "beginner":"iniciante","beginners":"iniciantes",\r
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",\r
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","DEX":"DEX","CEX":"CEX","DApp":"DApp",\r
    "Layer 1":"Layer 1","Layer 2":"Layer 2",\r
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",\r
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",\r
    "Evolution of the Web from 1.0 to 3.0":"Evolu\xE7\xE3o da Web de 1.0 a 3.0",\r
    "Static read-only web pages":"P\xE1ginas web est\xE1ticas somente leitura",\r
    "Information-centric and interactive":"Centrada na informa\xE7\xE3o e interativa",\r
    "User-centric, decentralized, private and secure":"Centrada no usu\xE1rio, descentralizada, privada e segura",\r
    "read-only":"somente leitura","user-centric":"centrada no usu\xE1rio"\r
  },\r
  "pt-br": {\r
    // Core finance \u2014 Brazilian banking vocabulary (saque, parcela, tarifa\u2026)\r
    "APR":"Taxa Anual","Annual Percentage Rate":"Taxa Percentual Anual",\r
    "interest rate":"taxa de juros","annual returns":"retornos anuais",\r
    "monthly payouts":"pagamentos mensais","monthly payments":"pagamentos mensais",\r
    "balance":"saldo","statement":"extrato","account":"conta",\r
    "deposit":"dep\xF3sito","withdrawal":"saque","wire transfer":"transfer\xEAncia banc\xE1ria",\r
    "transaction":"transa\xE7\xE3o","payment":"pagamento","invoice":"fatura",\r
    "fee":"tarifa","no hidden fees":"sem tarifas ocultas",\r
    // P2P / Crowdlending (Maclear)\r
    "P2P lending":"empr\xE9stimos P2P","crowdlending":"crowdlending",\r
    "crowdfunding":"financiamento coletivo","lending platform":"plataforma de empr\xE9stimos",\r
    "investment platform":"plataforma de investimentos",\r
    "investor":"investidor","investors":"investidores",\r
    "borrower":"tomador","lender":"credor",\r
    "loan":"empr\xE9stimo","loan period":"prazo do empr\xE9stimo","loan term":"prazo do empr\xE9stimo",\r
    "loan originator":"originador de empr\xE9stimos",\r
    "funded":"financiado","repaid":"quitado",\r
    "default":"inadimpl\xEAncia","late loans":"empr\xE9stimos em atraso",\r
    "cash drag":"capital parado",\r
    "primary market":"mercado prim\xE1rio","secondary market":"mercado secund\xE1rio",\r
    "total funded":"total financiado","total interest paid":"total de juros pagos",\r
    "available funds":"fundos dispon\xEDveis","invested funds":"fundos investidos",\r
    "total funds":"fundos totais",\r
    // Investment\r
    "initial investment":"investimento inicial","investment period":"per\xEDodo de investimento",\r
    "future value":"valor futuro","earned return":"retorno obtido",\r
    "average annual return":"retorno m\xE9dio anual",\r
    "portfolio":"carteira","passive income":"renda passiva",\r
    "principal repayment":"amortiza\xE7\xE3o do principal",\r
    "interest payment":"pagamento de juros",\r
    "installment":"parcela","recurring payment":"pagamento recorrente",\r
    // Compliance & process\r
    "due diligence":"due diligence","risk assessment":"avalia\xE7\xE3o de risco",\r
    "risk scoring":"score de risco","AML":"PLD",\r
    "compliance":"compliance","regulated":"regulado",\r
    "verification":"verifica\xE7\xE3o","KYC":"KYC",\r
    // Bonuses & rewards\r
    "referral bonus":"b\xF4nus de indica\xE7\xE3o","loyalty bonus":"b\xF4nus de fidelidade",\r
    "welcome bonus":"b\xF4nus de boas-vindas","investment reward":"recompensa de investimento",\r
    "invite friends":"convide amigos",\r
    // UI actions\r
    "sign up":"cadastre-se","log in":"entrar","register":"cadastrar",\r
    "invest now":"invista agora","start investing":"comece a investir",\r
    "dashboard":"painel de controle","onboarding":"cadastro de cliente",\r
    // General finance\r
    "collateral":"garantia","mortgage":"hipoteca","savings":"poupan\xE7a",\r
    "credit score":"score de cr\xE9dito","overdraft":"cheque especial",\r
    "chargeback":"estorno","settlement":"liquida\xE7\xE3o",\r
    "direct debit":"d\xE9bito autom\xE1tico","exchange rate":"taxa de c\xE2mbio",\r
    "payee":"benefici\xE1rio","payer":"pagador","beneficiary":"benefici\xE1rio",\r
    "equity":"patrim\xF4nio l\xEDquido","liability":"passivo","asset":"ativo",\r
    "dividend":"dividendo","spending limit":"limite de gastos",\r
    // Crypto / Web3 (Maclear Crypto Course)\r
    "blockchain":"blockchain","token":"token","tokens":"tokens",\r
    "stablecoin":"stablecoin","stablecoins":"stablecoins",\r
    "cryptocurrency":"criptomoeda","crypto":"cripto",\r
    "crypto wallet":"carteira cripto","wallet":"carteira",\r
    "seed phrase":"frase-semente","private key":"chave privada",\r
    "public address":"endere\xE7o p\xFAblico","smart contract":"contrato inteligente",\r
    "network fees":"taxas de rede","gas fees":"taxas de g\xE1s",\r
    "custodial":"custodial","non-custodial":"n\xE3o custodial",\r
    "custodial wallet":"carteira custodial",\r
    "non-custodial wallet":"carteira n\xE3o custodial",\r
    "fiat":"moeda fiduci\xE1ria","pegged":"atrelado",\r
    "decentralized":"descentralizado","centralized":"centralizado",\r
    "capital provider":"provedor de capital",\r
    "repayment schedule":"cronograma de pagamentos",\r
    "leverage":"alavancagem","diversification":"diversifica\xE7\xE3o",\r
    "yield":"rendimento","returns":"retornos",\r
    "liquidity":"liquidez","protocol":"protocolo",\r
    "staking":"staking","airdrop":"airdrop",\r
    "mining":"minera\xE7\xE3o","validator":"validador",\r
    "consensus":"consenso","bridge":"ponte",\r
    "on-chain":"on-chain","off-chain":"off-chain",\r
    "scam":"golpe","phishing":"phishing",\r
    "Learn & Earn":"Aprenda e Ganhe",\r
    "start learning":"comece a aprender",\r
    "checklist":"checklist","step-by-step":"passo a passo",\r
    "beginner":"iniciante","beginners":"iniciantes",\r
    // Tech terms \u2014 must stay untranslated\r
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",\r
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","DEX":"DEX","CEX":"CEX","DApp":"DApp",\r
    "Layer 1":"Layer 1","Layer 2":"Layer 2",\r
    // Date/era labels \u2014 keep verbatim\r
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",\r
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",\r
    // Infographic card text \u2014 concise translations\r
    "Evolution of the Web from 1.0 to 3.0":"Evolu\xE7\xE3o da Web de 1.0 a 3.0",\r
    "Static read-only web pages":"P\xE1ginas web est\xE1ticas somente leitura",\r
    "Information-centric and interactive":"Centrada na informa\xE7\xE3o e interativa",\r
    "User-centric, decentralized, private and secure":"Centrada no usu\xE1rio, descentralizada, privada e segura",\r
    "read-only":"somente leitura","user-centric":"centrada no usu\xE1rio",\r
    "private and secure":"privada e segura"\r
  },\r
  ko: {\r
    "APR":"\uC5F0\uC774\uC728","Annual Percentage Rate":"\uC5F0\uC774\uC728",\r
    "interest rate":"\uC774\uC790\uC728","annual returns":"\uC5F0\uAC04 \uC218\uC775\uB960",\r
    "monthly payouts":"\uC6D4\uBCC4 \uC9C0\uAE09","monthly payments":"\uC6D4\uBCC4 \uACB0\uC81C",\r
    "balance":"\uC794\uC561","statement":"\uBA85\uC138\uC11C","account":"\uACC4\uC815",\r
    "deposit":"\uC785\uAE08","withdrawal":"\uCD9C\uAE08","wire transfer":"\uACC4\uC88C\uC774\uCCB4",\r
    "transaction":"\uAC70\uB798","payment":"\uACB0\uC81C","invoice":"\uCCAD\uAD6C\uC11C",\r
    "fee":"\uC218\uC218\uB8CC","no hidden fees":"\uC228\uACA8\uC9C4 \uC218\uC218\uB8CC \uC5C6\uC74C",\r
    "P2P lending":"P2P \uB300\uCD9C","crowdlending":"\uD06C\uB77C\uC6B0\uB4DC \uB80C\uB529",\r
    "crowdfunding":"\uD06C\uB77C\uC6B0\uB4DC \uD380\uB529","lending platform":"\uB300\uCD9C \uD50C\uB7AB\uD3FC",\r
    "investment platform":"\uD22C\uC790 \uD50C\uB7AB\uD3FC",\r
    "investor":"\uD22C\uC790\uC790","investors":"\uD22C\uC790\uC790",\r
    "borrower":"\uCC28\uC785\uC790","lender":"\uB300\uCD9C\uC790",\r
    "loan":"\uB300\uCD9C","loan period":"\uB300\uCD9C \uAE30\uAC04","loan term":"\uB300\uCD9C \uAE30\uAC04",\r
    "loan originator":"\uB300\uCD9C \uBC1C\uD589\uC0AC",\r
    "funded":"\uD380\uB529 \uC644\uB8CC","repaid":"\uC0C1\uD658 \uC644\uB8CC",\r
    "default":"\uBD80\uC2E4","late loans":"\uC5F0\uCCB4 \uB300\uCD9C",\r
    "cash drag":"\uD604\uAE08 \uC720\uB3D9\uC131 \uC9C0\uC5F0",\r
    "primary market":"1\uCC28 \uC2DC\uC7A5","secondary market":"2\uCC28 \uC2DC\uC7A5",\r
    "total funded":"\uCD1D \uD380\uB529\uC561","total interest paid":"\uC9C0\uAE09 \uC774\uC790 \uD569\uACC4",\r
    "available funds":"\uC0AC\uC6A9 \uAC00\uB2A5 \uC790\uAE08","invested funds":"\uD22C\uC790 \uC790\uAE08",\r
    "total funds":"\uCD1D \uC790\uAE08",\r
    "initial investment":"\uCD08\uAE30 \uD22C\uC790","investment period":"\uD22C\uC790 \uAE30\uAC04",\r
    "future value":"\uBBF8\uB798 \uAC00\uCE58","earned return":"\uD68D\uB4DD \uC218\uC775",\r
    "average annual return":"\uD3C9\uADE0 \uC5F0\uAC04 \uC218\uC775\uB960",\r
    "portfolio":"\uD3EC\uD2B8\uD3F4\uB9AC\uC624","passive income":"\uD328\uC2DC\uBE0C \uC778\uCEF4",\r
    "principal repayment":"\uC6D0\uAE08 \uC0C1\uD658",\r
    "interest payment":"\uC774\uC790 \uC9C0\uAE09",\r
    "installment":"\uD560\uBD80","recurring payment":"\uC815\uAE30 \uACB0\uC81C",\r
    "due diligence":"\uC2E4\uC0AC","risk assessment":"\uB9AC\uC2A4\uD06C \uD3C9\uAC00",\r
    "risk scoring":"\uB9AC\uC2A4\uD06C \uC810\uC218","AML":"AML",\r
    "compliance":"\uCEF4\uD50C\uB77C\uC774\uC5B8\uC2A4","regulated":"\uADDC\uC81C \uB300\uC0C1",\r
    "verification":"\uBCF8\uC778 \uD655\uC778","KYC":"KYC",\r
    "referral bonus":"\uCD94\uCC9C \uBCF4\uB108\uC2A4","loyalty bonus":"\uB85C\uC5F4\uD2F0 \uBCF4\uB108\uC2A4",\r
    "welcome bonus":"\uC6F0\uCEF4 \uBCF4\uB108\uC2A4","investment reward":"\uD22C\uC790 \uB9AC\uC6CC\uB4DC",\r
    "invite friends":"\uCE5C\uAD6C \uCD08\uB300",\r
    "sign up":"\uD68C\uC6D0\uAC00\uC785","log in":"\uB85C\uADF8\uC778","register":"\uD68C\uC6D0\uAC00\uC785",\r
    "invest now":"\uC9C0\uAE08 \uD22C\uC790\uD558\uAE30","start investing":"\uD22C\uC790 \uC2DC\uC791\uD558\uAE30",\r
    "dashboard":"\uB300\uC2DC\uBCF4\uB4DC","onboarding":"\uC628\uBCF4\uB529",\r
    "collateral":"\uB2F4\uBCF4","mortgage":"\uBAA8\uAE30\uC9C0","savings":"\uC800\uCD95",\r
    "credit score":"\uC2E0\uC6A9 \uC810\uC218","overdraft":"\uB2F9\uC88C\uB300\uC6D4",\r
    "chargeback":"\uC9C0\uAE09 \uAC70\uC808","settlement":"\uACB0\uC81C",\r
    "direct debit":"\uC790\uB3D9\uC774\uCCB4","exchange rate":"\uD658\uC728",\r
    "payee":"\uC218\uCDE8\uC778","payer":"\uC9C0\uAE09\uC778","beneficiary":"\uC218\uC775\uC790",\r
    "equity":"\uC790\uBCF8","liability":"\uBD80\uCC44","asset":"\uC790\uC0B0",\r
    "dividend":"\uBC30\uB2F9","spending limit":"\uC9C0\uCD9C \uD55C\uB3C4",\r
    "minimum investment":"\uCD5C\uC18C \uD22C\uC790\uAE08","maximum investment":"\uCD5C\uB300 \uD22C\uC790\uAE08","investment amount":"\uD22C\uC790 \uAE08\uC561",\r
    "account holder":"\uC608\uAE08\uC8FC","IBAN":"IBAN","processing time":"\uCC98\uB9AC \uC18C\uC694 \uC2DC\uAC04","business days":"\uC601\uC5C5\uC77C",\r
    "credit rating":"\uC2E0\uC6A9 \uB4F1\uAE09","risk grade":"\uB9AC\uC2A4\uD06C \uB4F1\uAE09","maturity":"\uB9CC\uAE30","amortization":"\uC0C1\uAC01",\r
    "early repayment":"\uC870\uAE30 \uC0C1\uD658","monthly interest":"\uC6D4 \uC774\uC790","accrued interest":"\uBBF8\uC218 \uC774\uC790",\r
    "total return":"\uCD1D \uC218\uC775","net return":"\uC21C\uC218\uC775","gross return":"\uCD1D\uC218\uC775(\uC138\uC804)",\r
    "fixed rate":"\uACE0\uC815 \uAE08\uB9AC","variable rate":"\uBCC0\uB3D9 \uAE08\uB9AC","compound interest":"\uBCF5\uB9AC","simple interest":"\uB2E8\uB9AC",\r
    "capital at risk":"\uC6D0\uAE08 \uC190\uC2E4 \uC704\uD5D8","past performance":"\uACFC\uAC70 \uC2E4\uC801","past performance is not a guarantee of future results":"\uACFC\uAC70 \uC2E4\uC801\uC774 \uBBF8\uB798 \uC218\uC775\uC744 \uBCF4\uC7A5\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",\r
    "financial intermediary":"\uAE08\uC735 \uC911\uAC1C\uC5C5\uC790","payment institution":"\uACB0\uC81C \uAE30\uAD00","electronic money":"\uC804\uC790\uD654\uD3D0",\r
    "digital assets":"\uB514\uC9C0\uD138 \uC790\uC0B0","securities":"\uC720\uAC00\uC99D\uAD8C","transfer fee":"\uC1A1\uAE08 \uC218\uC218\uB8CC",\r
    "available balance":"\uCD9C\uAE08 \uAC00\uB2A5 \uC794\uC561","wallet balance":"\uC9C0\uAC11 \uC794\uC561","reserved balance":"\uC608\uC57D \uC794\uC561",\r
    "pending":"\uB300\uAE30 \uC911","completed":"\uC644\uB8CC","failed":"\uC2E4\uD328","verification pending":"\uBCF8\uC778 \uD655\uC778 \uB300\uAE30",\r
    "two-factor authentication":"2\uB2E8\uACC4 \uC778\uC99D","regulatory":"\uADDC\uC81C","SME":"\uC911\uC18C\uAE30\uC5C5","borrower company":"\uCC28\uC785 \uAE30\uC5C5",\r
    "payment protection":"\uC9C0\uAE09 \uBCF4\uD638","buyback guarantee":"\uB9E4\uC785\uC57D\uC815","interest accrual":"\uC774\uC790 \uBC1C\uC0DD",\r
    "GDPR":"GDPR","EEA":"EEA","privacy policy":"\uAC1C\uC778\uC815\uBCF4 \uCC98\uB9AC\uBC29\uCE68","terms of service":"\uC774\uC6A9\uC57D\uAD00","AML policy":"AML \uC815\uCC45",\r
    "payout":"\uC9C0\uAE09","payouts":"\uC9C0\uAE09","refund":"\uD658\uBD88","top up":"\uCDA9\uC804","disbursement":"\uC1A1\uAE08",\r
    "loyalty program":"\uB85C\uC5F4\uD2F0 \uD504\uB85C\uADF8\uB7A8","referral program":"\uCD94\uCC9C \uD504\uB85C\uADF8\uB7A8","welcome offer":"\uC6F0\uCEF4 \uD61C\uD0DD",\r
    "annualized return":"\uC5F0\uD658\uC0B0 \uC218\uC775\uB960","internal rate of return":"\uB0B4\uBD80\uC218\uC775\uB960","holding period":"\uBCF4\uC720 \uAE30\uAC04",\r
    "liquidity risk":"\uC720\uB3D9\uC131 \uB9AC\uC2A4\uD06C","credit risk":"\uC2E0\uC6A9 \uB9AC\uC2A4\uD06C","market risk":"\uC2DC\uC7A5 \uB9AC\uC2A4\uD06C",\r
    "collateralized loan":"\uB2F4\uBCF4 \uB300\uCD9C","unsecured loan":"\uBB34\uB2F4\uBCF4 \uB300\uCD9C","loan book":"\uB300\uCD9C \uD3EC\uD2B8\uD3F4\uB9AC\uC624",\r
    "underwriting":"\uC2EC\uC0AC","origination fee":"\uBC1C\uD589 \uC218\uC218\uB8CC","servicing":"\uB300\uCD9C \uAD00\uB9AC",\r
    "escrow":"\uC5D0\uC2A4\uD06C\uB85C","settlement date":"\uACB0\uC81C\uC77C","value date":"\uAC00\uCE58\uC77C",\r
    "KYC verification":"KYC \uC778\uC99D","identity verification":"\uC2E0\uC6D0 \uD655\uC778","proof of address":"\uC8FC\uC18C \uC99D\uBA85",\r
    "iban":"IBAN","swift":"SWIFT","remittance":"\uD574\uC678 \uC1A1\uAE08",\r
    "slippage":"\uC2AC\uB9AC\uD53C\uC9C0","liquidity pool":"\uC720\uB3D9\uC131 \uD480","impermanent loss":"\uBE44\uC601\uAD6C\uC801 \uC190\uC2E4",\r
    "DEX":"DEX","CEX":"CEX","order book":"\uD638\uAC00\uCC3D","yield farming":"\uC774\uC790 \uD30C\uBC0D","APY":"APY","TVL":"TVL",\r
    "blockchain":"\uBE14\uB85D\uCCB4\uC778","token":"\uD1A0\uD070","tokens":"\uD1A0\uD070",\r
    "stablecoin":"\uC2A4\uD14C\uC774\uBE14\uCF54\uC778","stablecoins":"\uC2A4\uD14C\uC774\uBE14\uCF54\uC778",\r
    "cryptocurrency":"\uC554\uD638\uD654\uD3D0","crypto":"\uD06C\uB9BD\uD1A0",\r
    "crypto wallet":"\uD06C\uB9BD\uD1A0 \uC9C0\uAC11","wallet":"\uC9C0\uAC11",\r
    "seed phrase":"\uC2DC\uB4DC \uAD6C\uBB38","private key":"\uAC1C\uC778 \uD0A4",\r
    "public address":"\uACF5\uAC1C \uC8FC\uC18C","smart contract":"\uC2A4\uB9C8\uD2B8 \uCEE8\uD2B8\uB799\uD2B8",\r
    "network fees":"\uB124\uD2B8\uC6CC\uD06C \uC218\uC218\uB8CC","gas fees":"\uAC00\uC2A4 \uC218\uC218\uB8CC",\r
    "custodial":"\uC218\uD0C1\uD615","non-custodial":"\uBE44\uC218\uD0C1\uD615",\r
    "custodial wallet":"\uC218\uD0C1\uD615 \uC9C0\uAC11",\r
    "non-custodial wallet":"\uBE44\uC218\uD0C1\uD615 \uC9C0\uAC11",\r
    "fiat":"\uBC95\uC815\uD654\uD3D0","pegged":"\uC5F0\uB3D9",\r
    "decentralized":"\uD0C8\uC911\uC559\uD654","centralized":"\uC911\uC559\uD654",\r
    "capital provider":"\uC790\uBCF8 \uACF5\uAE09\uC790",\r
    "repayment schedule":"\uC0C1\uD658 \uC77C\uC815",\r
    "leverage":"\uB808\uBC84\uB9AC\uC9C0","diversification":"\uBD84\uC0B0 \uD22C\uC790",\r
    "yield":"\uC218\uC775\uB960","returns":"\uC218\uC775",\r
    "liquidity":"\uC720\uB3D9\uC131","protocol":"\uD504\uB85C\uD1A0\uCF5C",\r
    "staking":"\uC2A4\uD14C\uC774\uD0B9","airdrop":"\uC5D0\uC5B4\uB4DC\uB86D",\r
    "mining":"\uCC44\uAD74","validator":"\uAC80\uC99D\uC790",\r
    "consensus":"\uD569\uC758","bridge":"\uBE0C\uB9AC\uC9C0",\r
    "on-chain":"\uC628\uCCB4\uC778","off-chain":"\uC624\uD504\uCCB4\uC778",\r
    "scam":"\uC0AC\uAE30","phishing":"\uD53C\uC2F1",\r
    "Learn & Earn":"\uD559\uC2B5\uD558\uACE0 \uC801\uB9BD\uD558\uAE30",\r
    "start learning":"\uD559\uC2B5 \uC2DC\uC791",\r
    "checklist":"\uCCB4\uD06C\uB9AC\uC2A4\uD2B8","step-by-step":"\uB2E8\uACC4\uBCC4",\r
    "beginner":"\uCD08\uBCF4\uC790","beginners":"\uCD08\uBCF4\uC790",\r
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",\r
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","Layer 1":"Layer 1","Layer 2":"Layer 2",\r
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",\r
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",\r
    "Evolution of the Web from 1.0 to 3.0":"\uC6F9\uC758 \uC9C4\uD654: 1.0\uC5D0\uC11C 3.0\uAE4C\uC9C0",\r
    "Static read-only web pages":"\uC815\uC801 \uC77D\uAE30 \uC804\uC6A9 \uC6F9 \uD398\uC774\uC9C0",\r
    "Information-centric and interactive":"\uC815\uBCF4 \uC911\uC2EC\uC758 \uC778\uD130\uB799\uD2F0\uBE0C \uC6F9",\r
    "User-centric, decentralized, private and secure":"\uC0AC\uC6A9\uC790 \uC911\uC2EC, \uD0C8\uC911\uC559\uD654, \uD504\uB77C\uC774\uBC84\uC2DC \uBC0F \uBCF4\uC548",\r
    "read-only":"\uC77D\uAE30 \uC804\uC6A9","user-centric":"\uC0AC\uC6A9\uC790 \uC911\uC2EC"\r
  },\r
  zh: {\r
    "APR":"\u5E74\u5316\u5229\u7387","Annual Percentage Rate":"\u5E74\u5316\u5229\u7387",\r
    "interest rate":"\u5229\u7387","annual returns":"\u5E74\u5316\u6536\u76CA",\r
    "monthly payouts":"\u6309\u6708\u652F\u4ED8","monthly payments":"\u6BCF\u6708\u8FD8\u6B3E",\r
    "balance":"\u4F59\u989D","statement":"\u5BF9\u8D26\u5355","account":"\u8D26\u6237",\r
    "deposit":"\u5145\u503C","withdrawal":"\u63D0\u73B0","wire transfer":"\u94F6\u884C\u8F6C\u8D26",\r
    "transaction":"\u4EA4\u6613","payment":"\u4ED8\u6B3E","invoice":"\u53D1\u7968",\r
    "fee":"\u8D39\u7528","no hidden fees":"\u65E0\u9690\u85CF\u8D39\u7528",\r
    "P2P lending":"P2P \u501F\u8D37","crowdlending":"\u4F17\u7B79\u501F\u8D37",\r
    "crowdfunding":"\u4F17\u7B79","lending platform":"\u501F\u8D37\u5E73\u53F0",\r
    "investment platform":"\u6295\u8D44\u5E73\u53F0",\r
    "investor":"\u6295\u8D44\u8005","investors":"\u6295\u8D44\u8005",\r
    "borrower":"\u501F\u6B3E\u4EBA","lender":"\u51FA\u501F\u4EBA",\r
    "loan":"\u8D37\u6B3E","loan period":"\u8D37\u6B3E\u671F\u9650","loan term":"\u8D37\u6B3E\u671F\u9650",\r
    "loan originator":"\u8D37\u6B3E\u53D1\u8D77\u65B9",\r
    "funded":"\u5DF2\u878D\u8D44","repaid":"\u5DF2\u507F\u8FD8",\r
    "default":"\u8FDD\u7EA6","late loans":"\u903E\u671F\u8D37\u6B3E",\r
    "cash drag":"\u8D44\u91D1\u95F2\u7F6E",\r
    "primary market":"\u4E00\u7EA7\u5E02\u573A","secondary market":"\u4E8C\u7EA7\u5E02\u573A",\r
    "total funded":"\u603B\u878D\u8D44\u989D","total interest paid":"\u5DF2\u4ED8\u5229\u606F\u603B\u989D",\r
    "available funds":"\u53EF\u7528\u8D44\u91D1","invested funds":"\u5DF2\u6295\u8D44\u8D44\u91D1",\r
    "total funds":"\u603B\u8D44\u91D1",\r
    "initial investment":"\u521D\u59CB\u6295\u8D44","investment period":"\u6295\u8D44\u671F\u9650",\r
    "future value":"\u672A\u6765\u4EF7\u503C","earned return":"\u5DF2\u83B7\u5F97\u6536\u76CA",\r
    "average annual return":"\u5E73\u5747\u5E74\u5316\u6536\u76CA",\r
    "portfolio":"\u6295\u8D44\u7EC4\u5408","passive income":"\u88AB\u52A8\u6536\u5165",\r
    "principal repayment":"\u672C\u91D1\u507F\u8FD8",\r
    "interest payment":"\u5229\u606F\u652F\u4ED8",\r
    "installment":"\u5206\u671F","recurring payment":"\u5B9A\u671F\u4ED8\u6B3E",\r
    "due diligence":"\u5C3D\u804C\u8C03\u67E5","risk assessment":"\u98CE\u9669\u8BC4\u4F30",\r
    "risk scoring":"\u98CE\u9669\u8BC4\u5206","AML":"\u53CD\u6D17\u94B1",\r
    "compliance":"\u5408\u89C4","regulated":"\u53D7\u76D1\u7BA1",\r
    "verification":"\u8EAB\u4EFD\u9A8C\u8BC1","KYC":"KYC",\r
    "referral bonus":"\u63A8\u8350\u5956\u52B1","loyalty bonus":"\u5FE0\u8BDA\u5EA6\u5956\u52B1",\r
    "welcome bonus":"\u6B22\u8FCE\u5956\u52B1","investment reward":"\u6295\u8D44\u5956\u52B1",\r
    "invite friends":"\u9080\u8BF7\u597D\u53CB",\r
    "sign up":"\u6CE8\u518C","log in":"\u767B\u5F55","register":"\u6CE8\u518C",\r
    "invest now":"\u7ACB\u5373\u6295\u8D44","start investing":"\u5F00\u59CB\u6295\u8D44",\r
    "dashboard":"\u63A7\u5236\u53F0","onboarding":"\u5F00\u6237\u5F15\u5BFC",\r
    "collateral":"\u62B5\u62BC\u54C1","mortgage":"\u6309\u63ED","savings":"\u50A8\u84C4",\r
    "credit score":"\u4FE1\u7528\u8BC4\u5206","overdraft":"\u900F\u652F",\r
    "chargeback":"\u62D2\u4ED8","settlement":"\u7ED3\u7B97",\r
    "direct debit":"\u76F4\u63A5\u6263\u6B3E","exchange rate":"\u6C47\u7387",\r
    "payee":"\u6536\u6B3E\u4EBA","payer":"\u4ED8\u6B3E\u4EBA","beneficiary":"\u53D7\u76CA\u4EBA",\r
    "equity":"\u6743\u76CA","liability":"\u8D1F\u503A","asset":"\u8D44\u4EA7",\r
    "dividend":"\u80A1\u606F","spending limit":"\u6D88\u8D39\u9650\u989D",\r
    "minimum investment":"\u6700\u4F4E\u6295\u8D44\u989D","maximum investment":"\u6700\u9AD8\u6295\u8D44\u989D","investment amount":"\u6295\u8D44\u91D1\u989D",\r
    "account holder":"\u8D26\u6237\u6301\u6709\u4EBA","IBAN":"IBAN","processing time":"\u5904\u7406\u65F6\u95F4","business days":"\u5DE5\u4F5C\u65E5",\r
    "credit rating":"\u4FE1\u7528\u8BC4\u7EA7","risk grade":"\u98CE\u9669\u7B49\u7EA7","maturity":"\u5230\u671F","amortization":"\u644A\u9500",\r
    "early repayment":"\u63D0\u524D\u8FD8\u6B3E","monthly interest":"\u6708\u606F","accrued interest":"\u5E94\u8BA1\u5229\u606F",\r
    "total return":"\u603B\u56DE\u62A5","net return":"\u51C0\u6536\u76CA","gross return":"\u603B\u6536\u76CA\uFF08\u7A0E\u524D\uFF09",\r
    "fixed rate":"\u56FA\u5B9A\u5229\u7387","variable rate":"\u6D6E\u52A8\u5229\u7387","compound interest":"\u590D\u5229","simple interest":"\u5355\u5229",\r
    "capital at risk":"\u672C\u91D1\u98CE\u9669","past performance":"\u5386\u53F2\u4E1A\u7EE9","past performance is not a guarantee of future results":"\u8FC7\u5F80\u4E1A\u7EE9\u4E0D\u4EE3\u8868\u672A\u6765\u8868\u73B0",\r
    "financial intermediary":"\u91D1\u878D\u4E2D\u4ECB","payment institution":"\u652F\u4ED8\u673A\u6784","electronic money":"\u7535\u5B50\u8D27\u5E01",\r
    "digital assets":"\u6570\u5B57\u8D44\u4EA7","securities":"\u8BC1\u5238","transfer fee":"\u8F6C\u8D26\u624B\u7EED\u8D39",\r
    "available balance":"\u53EF\u7528\u4F59\u989D","wallet balance":"\u94B1\u5305\u4F59\u989D","reserved balance":"\u51BB\u7ED3\u4F59\u989D",\r
    "pending":"\u5904\u7406\u4E2D","completed":"\u5DF2\u5B8C\u6210","failed":"\u5931\u8D25","verification pending":"\u9A8C\u8BC1\u5BA1\u6838\u4E2D",\r
    "two-factor authentication":"\u53CC\u56E0\u7D20\u8BA4\u8BC1","regulatory":"\u76D1\u7BA1","SME":"\u4E2D\u5C0F\u4F01\u4E1A","borrower company":"\u501F\u6B3E\u4F01\u4E1A",\r
    "payment protection":"\u4ED8\u6B3E\u4FDD\u969C","buyback guarantee":"\u56DE\u8D2D\u62C5\u4FDD","interest accrual":"\u5229\u606F\u8BA1\u63D0",\r
    "GDPR":"GDPR","EEA":"\u6B27\u6D32\u7ECF\u6D4E\u533A","privacy policy":"\u9690\u79C1\u653F\u7B56","terms of service":"\u670D\u52A1\u6761\u6B3E","AML policy":"\u53CD\u6D17\u94B1\u653F\u7B56",\r
    "payout":"\u5230\u8D26","payouts":"\u4ED8\u6B3E","refund":"\u9000\u6B3E","top up":"\u5145\u503C","disbursement":"\u653E\u6B3E",\r
    "loyalty program":"\u5FE0\u8BDA\u5EA6\u8BA1\u5212","referral program":"\u63A8\u8350\u8BA1\u5212","welcome offer":"\u65B0\u4EBA\u793C\u9047",\r
    "annualized return":"\u5E74\u5316\u6536\u76CA","internal rate of return":"\u5185\u90E8\u6536\u76CA\u7387","holding period":"\u6301\u6709\u671F",\r
    "liquidity risk":"\u6D41\u52A8\u6027\u98CE\u9669","credit risk":"\u4FE1\u7528\u98CE\u9669","market risk":"\u5E02\u573A\u98CE\u9669",\r
    "collateralized loan":"\u62B5\u62BC\u8D37\u6B3E","unsecured loan":"\u4FE1\u7528\u8D37\u6B3E","loan book":"\u8D37\u6B3E\u7EC4\u5408",\r
    "underwriting":"\u6388\u4FE1\u5BA1\u6279","origination fee":"\u53D1\u8D77\u8D39","servicing":"\u8D37\u540E\u670D\u52A1",\r
    "escrow":"\u6258\u7BA1\u8D26\u6237","settlement date":"\u7ED3\u7B97\u65E5","value date":"\u8D77\u606F\u65E5",\r
    "KYC verification":"KYC \u8BA4\u8BC1","identity verification":"\u8EAB\u4EFD\u9A8C\u8BC1","proof of address":"\u5730\u5740\u8BC1\u660E",\r
    "iban":"IBAN","swift":"SWIFT","remittance":"\u6C47\u6B3E",\r
    "slippage":"\u6ED1\u70B9","liquidity pool":"\u6D41\u52A8\u6027\u6C60","impermanent loss":"\u65E0\u5E38\u635F\u5931",\r
    "DEX":"DEX","CEX":"CEX","order book":"\u8BA2\u5355\u7C3F","yield farming":"\u6D41\u52A8\u6027\u6316\u77FF","APY":"APY","TVL":"TVL",\r
    "blockchain":"\u533A\u5757\u94FE","token":"\u4EE3\u5E01","tokens":"\u4EE3\u5E01",\r
    "stablecoin":"\u7A33\u5B9A\u5E01","stablecoins":"\u7A33\u5B9A\u5E01",\r
    "cryptocurrency":"\u52A0\u5BC6\u8D27\u5E01","crypto":"\u52A0\u5BC6\u8D44\u4EA7",\r
    "crypto wallet":"\u52A0\u5BC6\u94B1\u5305","wallet":"\u94B1\u5305",\r
    "seed phrase":"\u52A9\u8BB0\u8BCD","private key":"\u79C1\u94A5",\r
    "public address":"\u516C\u5F00\u5730\u5740","smart contract":"\u667A\u80FD\u5408\u7EA6",\r
    "network fees":"\u7F51\u7EDC\u8D39\u7528","gas fees":"Gas \u8D39\u7528",\r
    "custodial":"\u6258\u7BA1","non-custodial":"\u975E\u6258\u7BA1",\r
    "custodial wallet":"\u6258\u7BA1\u94B1\u5305",\r
    "non-custodial wallet":"\u975E\u6258\u7BA1\u94B1\u5305",\r
    "fiat":"\u6CD5\u5E01","pegged":"\u951A\u5B9A",\r
    "decentralized":"\u53BB\u4E2D\u5FC3\u5316","centralized":"\u4E2D\u5FC3\u5316",\r
    "capital provider":"\u8D44\u91D1\u63D0\u4F9B\u65B9",\r
    "repayment schedule":"\u8FD8\u6B3E\u8BA1\u5212",\r
    "leverage":"\u6760\u6746","diversification":"\u5206\u6563\u6295\u8D44",\r
    "yield":"\u6536\u76CA","returns":"\u56DE\u62A5",\r
    "liquidity":"\u6D41\u52A8\u6027","protocol":"\u534F\u8BAE",\r
    "staking":"\u8D28\u62BC","airdrop":"\u7A7A\u6295",\r
    "mining":"\u6316\u77FF","validator":"\u9A8C\u8BC1\u8282\u70B9",\r
    "consensus":"\u5171\u8BC6","bridge":"\u8DE8\u94FE\u6865",\r
    "on-chain":"\u94FE\u4E0A","off-chain":"\u94FE\u4E0B",\r
    "scam":"\u8BC8\u9A97","phishing":"\u9493\u9C7C",\r
    "Learn & Earn":"\u5B66\u4E60\u5373\u8D5A",\r
    "start learning":"\u5F00\u59CB\u5B66\u4E60",\r
    "checklist":"\u6E05\u5355","step-by-step":"\u5206\u6B65",\r
    "beginner":"\u521D\u5B66\u8005","beginners":"\u521D\u5B66\u8005",\r
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",\r
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","Layer 1":"Layer 1","Layer 2":"Layer 2",\r
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",\r
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",\r
    "Evolution of the Web from 1.0 to 3.0":"Web\u7684\u6F14\u8FDB\uFF1A\u4ECE1.0\u52303.0",\r
    "Static read-only web pages":"\u9759\u6001\u53EA\u8BFB\u7F51\u9875",\r
    "Information-centric and interactive":"\u4EE5\u4FE1\u606F\u4E3A\u4E2D\u5FC3\u7684\u4EA4\u4E92\u5F0F\u7F51\u7EDC",\r
    "User-centric, decentralized, private and secure":"\u4EE5\u7528\u6237\u4E3A\u4E2D\u5FC3\u3001\u53BB\u4E2D\u5FC3\u5316\u3001\u9690\u79C1\u4E0E\u5B89\u5168",\r
    "read-only":"\u53EA\u8BFB","user-centric":"\u4EE5\u7528\u6237\u4E3A\u4E2D\u5FC3"\r
  },\r
  ja: {\r
    "APR":"\u5E74\u5229","Annual Percentage Rate":"\u5E74\u5229",\r
    "interest rate":"\u91D1\u5229","annual returns":"\u5E74\u9593\u30EA\u30BF\u30FC\u30F3",\r
    "monthly payouts":"\u6708\u6B21\u6255\u3044\u51FA\u3057","monthly payments":"\u6708\u6B21\u652F\u6255\u3044",\r
    "balance":"\u6B8B\u9AD8","statement":"\u660E\u7D30","account":"\u53E3\u5EA7",\r
    "deposit":"\u5165\u91D1","withdrawal":"\u51FA\u91D1","wire transfer":"\u9280\u884C\u632F\u8FBC",\r
    "transaction":"\u53D6\u5F15","payment":"\u652F\u6255\u3044","invoice":"\u8ACB\u6C42\u66F8",\r
    "fee":"\u624B\u6570\u6599","no hidden fees":"\u96A0\u308C\u305F\u624B\u6570\u6599\u306A\u3057",\r
    "P2P lending":"P2P\u30EC\u30F3\u30C7\u30A3\u30F3\u30B0","crowdlending":"\u30AF\u30E9\u30A6\u30C9\u30EC\u30F3\u30C7\u30A3\u30F3\u30B0",\r
    "crowdfunding":"\u30AF\u30E9\u30A6\u30C9\u30D5\u30A1\u30F3\u30C7\u30A3\u30F3\u30B0","lending platform":"\u878D\u8CC7\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0",\r
    "investment platform":"\u6295\u8CC7\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0",\r
    "investor":"\u6295\u8CC7\u5BB6","investors":"\u6295\u8CC7\u5BB6",\r
    "borrower":"\u501F\u308A\u624B","lender":"\u8CB8\u3057\u624B",\r
    "loan":"\u878D\u8CC7","loan period":"\u878D\u8CC7\u671F\u9593","loan term":"\u878D\u8CC7\u671F\u9593",\r
    "loan originator":"\u30ED\u30FC\u30F3\u30AA\u30EA\u30B8\u30CD\u30FC\u30BF\u30FC",\r
    "funded":"\u8ABF\u9054\u6E08\u307F","repaid":"\u8FD4\u6E08\u6E08\u307F",\r
    "default":"\u30C7\u30D5\u30A9\u30EB\u30C8","late loans":"\u5EF6\u6EDE\u30ED\u30FC\u30F3",\r
    "cash drag":"\u30AD\u30E3\u30C3\u30B7\u30E5\u30C9\u30E9\u30C3\u30B0",\r
    "primary market":"\u30D7\u30E9\u30A4\u30DE\u30EA\u30FC\u30DE\u30FC\u30B1\u30C3\u30C8","secondary market":"\u30BB\u30AB\u30F3\u30C0\u30EA\u30FC\u30DE\u30FC\u30B1\u30C3\u30C8",\r
    "total funded":"\u7DCF\u8ABF\u9054\u984D","total interest paid":"\u652F\u6255\u5229\u606F\u5408\u8A08",\r
    "available funds":"\u5229\u7528\u53EF\u80FD\u8CC7\u91D1","invested funds":"\u6295\u8CC7\u6E08\u307F\u8CC7\u91D1",\r
    "total funds":"\u7DCF\u8CC7\u91D1",\r
    "initial investment":"\u521D\u671F\u6295\u8CC7","investment period":"\u6295\u8CC7\u671F\u9593",\r
    "future value":"\u5C06\u6765\u4FA1\u5024","earned return":"\u7372\u5F97\u30EA\u30BF\u30FC\u30F3",\r
    "average annual return":"\u5E73\u5747\u5E74\u9593\u30EA\u30BF\u30FC\u30F3",\r
    "portfolio":"\u30DD\u30FC\u30C8\u30D5\u30A9\u30EA\u30AA","passive income":"\u4E0D\u52B4\u6240\u5F97",\r
    "principal repayment":"\u5143\u672C\u8FD4\u6E08",\r
    "interest payment":"\u5229\u606F\u652F\u6255\u3044",\r
    "installment":"\u5206\u5272\u6255\u3044","recurring payment":"\u5B9A\u671F\u652F\u6255\u3044",\r
    "due diligence":"\u30C7\u30E5\u30FC\u30C7\u30EA\u30B8\u30A7\u30F3\u30B9","risk assessment":"\u30EA\u30B9\u30AF\u8A55\u4FA1",\r
    "risk scoring":"\u30EA\u30B9\u30AF\u30B9\u30B3\u30A2","AML":"AML",\r
    "compliance":"\u30B3\u30F3\u30D7\u30E9\u30A4\u30A2\u30F3\u30B9","regulated":"\u898F\u5236\u4E0B",\r
    "verification":"\u672C\u4EBA\u78BA\u8A8D","KYC":"KYC",\r
    "referral bonus":"\u7D39\u4ECB\u30DC\u30FC\u30CA\u30B9","loyalty bonus":"\u30ED\u30A4\u30E4\u30EB\u30C6\u30A3\u30DC\u30FC\u30CA\u30B9",\r
    "welcome bonus":"\u30A6\u30A7\u30EB\u30AB\u30E0\u30DC\u30FC\u30CA\u30B9","investment reward":"\u6295\u8CC7\u30EA\u30EF\u30FC\u30C9",\r
    "invite friends":"\u53CB\u9054\u3092\u62DB\u5F85",\r
    "sign up":"\u65B0\u898F\u767B\u9332","log in":"\u30ED\u30B0\u30A4\u30F3","register":"\u767B\u9332",\r
    "invest now":"\u4ECA\u3059\u3050\u6295\u8CC7","start investing":"\u6295\u8CC7\u3092\u59CB\u3081\u308B",\r
    "dashboard":"\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9","onboarding":"\u30AA\u30F3\u30DC\u30FC\u30C7\u30A3\u30F3\u30B0",\r
    "collateral":"\u62C5\u4FDD","mortgage":"\u4F4F\u5B85\u30ED\u30FC\u30F3","savings":"\u8CAF\u84C4",\r
    "credit score":"\u4FE1\u7528\u30B9\u30B3\u30A2","overdraft":"\u5F53\u5EA7\u8CB8\u8D8A",\r
    "chargeback":"\u30C1\u30E3\u30FC\u30B8\u30D0\u30C3\u30AF","settlement":"\u6C7A\u6E08",\r
    "direct debit":"\u53E3\u5EA7\u632F\u66FF","exchange rate":"\u70BA\u66FF\u30EC\u30FC\u30C8",\r
    "payee":"\u53D7\u53D6\u4EBA","payer":"\u652F\u6255\u4EBA","beneficiary":"\u53D7\u76CA\u8005",\r
    "equity":"\u8CC7\u672C","liability":"\u8CA0\u50B5","asset":"\u8CC7\u7523",\r
    "dividend":"\u914D\u5F53","spending limit":"\u652F\u51FA\u4E0A\u9650",\r
    "minimum investment":"\u6700\u4F4E\u6295\u8CC7\u984D","maximum investment":"\u6700\u5927\u6295\u8CC7\u984D","investment amount":"\u6295\u8CC7\u91D1\u984D",\r
    "account holder":"\u53E3\u5EA7\u540D\u7FA9\u4EBA","IBAN":"IBAN","processing time":"\u51E6\u7406\u6642\u9593","business days":"\u55B6\u696D\u65E5",\r
    "credit rating":"\u4FE1\u7528\u683C\u4ED8\u3051","risk grade":"\u30EA\u30B9\u30AF\u30B0\u30EC\u30FC\u30C9","maturity":"\u6E80\u671F","amortization":"\u511F\u5374",\r
    "early repayment":"\u65E9\u671F\u8FD4\u6E08","monthly interest":"\u6708\u6B21\u5229\u5B50","accrued interest":"\u672A\u53CE\u5229\u606F",\r
    "total return":"\u7DCF\u30EA\u30BF\u30FC\u30F3","net return":"\u7D14\u30EA\u30BF\u30FC\u30F3","gross return":"\u7DCF\u30EA\u30BF\u30FC\u30F3\uFF08\u7A0E\u5F15\u524D\uFF09",\r
    "fixed rate":"\u56FA\u5B9A\u91D1\u5229","variable rate":"\u5909\u52D5\u91D1\u5229","compound interest":"\u8907\u5229","simple interest":"\u5358\u5229",\r
    "capital at risk":"\u5143\u672C\u30EA\u30B9\u30AF","past performance":"\u904E\u53BB\u306E\u5B9F\u7E3E","past performance is not a guarantee of future results":"\u904E\u53BB\u306E\u5B9F\u7E3E\u306F\u5C06\u6765\u306E\u6210\u679C\u3092\u4FDD\u8A3C\u3059\u308B\u3082\u306E\u3067\u306F\u3042\u308A\u307E\u305B\u3093",\r
    "financial intermediary":"\u91D1\u878D\u4EF2\u4ECB\u696D\u8005","payment institution":"\u6C7A\u6E08\u4E8B\u696D\u8005","electronic money":"\u96FB\u5B50\u30DE\u30CD\u30FC",\r
    "digital assets":"\u30C7\u30B8\u30BF\u30EB\u8CC7\u7523","securities":"\u6709\u4FA1\u8A3C\u5238","transfer fee":"\u632F\u8FBC\u624B\u6570\u6599",\r
    "available balance":"\u5229\u7528\u53EF\u80FD\u6B8B\u9AD8","wallet balance":"\u30A6\u30A9\u30EC\u30C3\u30C8\u6B8B\u9AD8","reserved balance":"\u7559\u4FDD\u6B8B\u9AD8",\r
    "pending":"\u4FDD\u7559\u4E2D","completed":"\u5B8C\u4E86","failed":"\u5931\u6557","verification pending":"\u672C\u4EBA\u78BA\u8A8D\u5F85\u3061",\r
    "two-factor authentication":"\u4E8C\u8981\u7D20\u8A8D\u8A3C","regulatory":"\u898F\u5236","SME":"\u4E2D\u5C0F\u4F01\u696D","borrower company":"\u501F\u5165\u4F01\u696D",\r
    "payment protection":"\u652F\u6255\u4FDD\u8B77","buyback guarantee":"\u8CB7\u53D6\u4FDD\u8A3C","interest accrual":"\u5229\u606F\u767A\u751F",\r
    "GDPR":"GDPR","EEA":"EEA","privacy policy":"\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC","terms of service":"\u5229\u7528\u898F\u7D04","AML policy":"AML\u65B9\u91DD",\r
    "payout":"\u652F\u6255\u3044","payouts":"\u652F\u6255\u3044","refund":"\u8FD4\u91D1","top up":"\u30C1\u30E3\u30FC\u30B8","disbursement":"\u9001\u91D1",\r
    "loyalty program":"\u30ED\u30A4\u30E4\u30EB\u30C6\u30A3\u30D7\u30ED\u30B0\u30E9\u30E0","referral program":"\u7D39\u4ECB\u30D7\u30ED\u30B0\u30E9\u30E0","welcome offer":"\u30A6\u30A7\u30EB\u30AB\u30E0\u7279\u5178",\r
    "annualized return":"\u5E74\u63DB\u7B97\u30EA\u30BF\u30FC\u30F3","internal rate of return":"\u5185\u90E8\u53CE\u76CA\u7387","holding period":"\u4FDD\u6709\u671F\u9593",\r
    "liquidity risk":"\u6D41\u52D5\u6027\u30EA\u30B9\u30AF","credit risk":"\u4FE1\u7528\u30EA\u30B9\u30AF","market risk":"\u5E02\u5834\u30EA\u30B9\u30AF",\r
    "collateralized loan":"\u62C5\u4FDD\u4ED8\u30ED\u30FC\u30F3","unsecured loan":"\u7121\u62C5\u4FDD\u30ED\u30FC\u30F3","loan book":"\u30ED\u30FC\u30F3\u30D6\u30C3\u30AF",\r
    "underwriting":"\u4E0E\u4FE1\u5BE9\u67FB","origination fee":"\u624B\u6570\u6599\uFF08\u7D44\u6210\uFF09","servicing":"\u30B5\u30FC\u30D3\u30B7\u30F3\u30B0",\r
    "escrow":"\u30A8\u30B9\u30AF\u30ED\u30FC","settlement date":"\u6C7A\u6E08\u65E5","value date":"\u30D0\u30EA\u30E5\u30FC\u65E5",\r
    "KYC verification":"KYC\u8A8D\u8A3C","identity verification":"\u672C\u4EBA\u78BA\u8A8D","proof of address":"\u4F4F\u6240\u8A3C\u660E",\r
    "iban":"IBAN","swift":"SWIFT","remittance":"\u9001\u91D1",\r
    "slippage":"\u30B9\u30EA\u30C3\u30DA\u30FC\u30B8","liquidity pool":"\u6D41\u52D5\u6027\u30D7\u30FC\u30EB","impermanent loss":"\u4E00\u6642\u7684\u640D\u5931",\r
    "DEX":"DEX","CEX":"CEX","order book":"\u30AA\u30FC\u30C0\u30FC\u30D6\u30C3\u30AF","yield farming":"\u30A4\u30FC\u30EB\u30C9\u30D5\u30A1\u30FC\u30DF\u30F3\u30B0","APY":"APY","TVL":"TVL",\r
    "blockchain":"\u30D6\u30ED\u30C3\u30AF\u30C1\u30A7\u30FC\u30F3","token":"\u30C8\u30FC\u30AF\u30F3","tokens":"\u30C8\u30FC\u30AF\u30F3",\r
    "stablecoin":"\u30B9\u30C6\u30FC\u30D6\u30EB\u30B3\u30A4\u30F3","stablecoins":"\u30B9\u30C6\u30FC\u30D6\u30EB\u30B3\u30A4\u30F3",\r
    "cryptocurrency":"\u6697\u53F7\u8CC7\u7523","crypto":"\u30AF\u30EA\u30D7\u30C8",\r
    "crypto wallet":"\u6697\u53F7\u8CC7\u7523\u30A6\u30A9\u30EC\u30C3\u30C8","wallet":"\u30A6\u30A9\u30EC\u30C3\u30C8",\r
    "seed phrase":"\u30B7\u30FC\u30C9\u30D5\u30EC\u30FC\u30BA","private key":"\u79D8\u5BC6\u9375",\r
    "public address":"\u516C\u958B\u30A2\u30C9\u30EC\u30B9","smart contract":"\u30B9\u30DE\u30FC\u30C8\u30B3\u30F3\u30C8\u30E9\u30AF\u30C8",\r
    "network fees":"\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u624B\u6570\u6599","gas fees":"\u30AC\u30B9\u4EE3",\r
    "custodial":"\u30AB\u30B9\u30C8\u30C7\u30A3\u30A2\u30EB","non-custodial":"\u30CE\u30F3\u30AB\u30B9\u30C8\u30C7\u30A3\u30A2\u30EB",\r
    "custodial wallet":"\u30AB\u30B9\u30C8\u30C7\u30A3\u30A2\u30EB\u30A6\u30A9\u30EC\u30C3\u30C8",\r
    "non-custodial wallet":"\u30CE\u30F3\u30AB\u30B9\u30C8\u30C7\u30A3\u30A2\u30EB\u30A6\u30A9\u30EC\u30C3\u30C8",\r
    "fiat":"\u6CD5\u5B9A\u901A\u8CA8","pegged":"\u30DA\u30C3\u30B0",\r
    "decentralized":"\u5206\u6563\u578B","centralized":"\u4E2D\u592E\u96C6\u6A29\u578B",\r
    "capital provider":"\u8CC7\u672C\u63D0\u4F9B\u8005",\r
    "repayment schedule":"\u8FD4\u6E08\u30B9\u30B1\u30B8\u30E5\u30FC\u30EB",\r
    "leverage":"\u30EC\u30D0\u30EC\u30C3\u30B8","diversification":"\u5206\u6563\u6295\u8CC7",\r
    "yield":"\u5229\u56DE\u308A","returns":"\u30EA\u30BF\u30FC\u30F3",\r
    "liquidity":"\u6D41\u52D5\u6027","protocol":"\u30D7\u30ED\u30C8\u30B3\u30EB",\r
    "staking":"\u30B9\u30C6\u30FC\u30AD\u30F3\u30B0","airdrop":"\u30A8\u30A2\u30C9\u30ED\u30C3\u30D7",\r
    "mining":"\u30DE\u30A4\u30CB\u30F3\u30B0","validator":"\u30D0\u30EA\u30C7\u30FC\u30BF\u30FC",\r
    "consensus":"\u30B3\u30F3\u30BB\u30F3\u30B5\u30B9","bridge":"\u30D6\u30EA\u30C3\u30B8",\r
    "on-chain":"\u30AA\u30F3\u30C1\u30A7\u30FC\u30F3","off-chain":"\u30AA\u30D5\u30C1\u30A7\u30FC\u30F3",\r
    "scam":"\u8A50\u6B3A","phishing":"\u30D5\u30A3\u30C3\u30B7\u30F3\u30B0",\r
    "Learn & Earn":"\u5B66\u3093\u3067\u7A3C\u3050",\r
    "start learning":"\u5B66\u7FD2\u3092\u59CB\u3081\u308B",\r
    "checklist":"\u30C1\u30A7\u30C3\u30AF\u30EA\u30B9\u30C8","step-by-step":"\u30B9\u30C6\u30C3\u30D7\u30D0\u30A4\u30B9\u30C6\u30C3\u30D7",\r
    "beginner":"\u521D\u5FC3\u8005","beginners":"\u521D\u5FC3\u8005",\r
    "Web 1.0":"Web 1.0","Web 2.0":"Web 2.0","Web 3.0":"Web 3.0",\r
    "DeFi":"DeFi","NFT":"NFT","DAO":"DAO","Layer 1":"Layer 1","Layer 2":"Layer 2",\r
    "1900s~2000":"1900s~2000","2000s~2020s":"2000s~2020s","2020s~?":"2020s~?",\r
    "1900s\u20132000":"1900s\u20132000","2000s\u20132020s":"2000s\u20132020s","2020s\u2013?":"2020s\u2013?",\r
    "Evolution of the Web from 1.0 to 3.0":"Web\u306E\u9032\u5316\uFF1A1.0\u304B\u30893.0\u3078",\r
    "Static read-only web pages":"\u9759\u7684\u306A\u8AAD\u307F\u53D6\u308A\u5C02\u7528\u30A6\u30A7\u30D6\u30DA\u30FC\u30B8",\r
    "Information-centric and interactive":"\u60C5\u5831\u4E2D\u5FC3\u3067\u30A4\u30F3\u30BF\u30E9\u30AF\u30C6\u30A3\u30D6",\r
    "User-centric, decentralized, private and secure":"\u30E6\u30FC\u30B6\u30FC\u4E2D\u5FC3\u30FB\u5206\u6563\u578B\u30FB\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u30FB\u5B89\u5168",\r
    "read-only":"\u8AAD\u307F\u53D6\u308A\u5C02\u7528","user-centric":"\u30E6\u30FC\u30B6\u30FC\u4E2D\u5FC3"\r
  }\r
};\r
\r
const LANG_NAMES = { es:"Spanish", it:"Italian", fr:"French", de:"German", pt:"European Portuguese", "pt-br":"Brazilian Portuguese", pl:"Polish", el:"Greek", tr:"Turkish", ko:"Korean", zh:"Simplified Chinese", ja:"Japanese" };\r
\r
const COURSE_GLOSSARY = {\r
  es: {\r
    "tx as a receipt":"tx como comprobante",\r
    "transaction hash":"hash de transacci\xF3n",\r
    "block explorer":"explorador de bloques",\r
    "network":"red","base network":"red Base",\r
    "Interface":"Interfaz","website":"sitio web","confirm":"confirmar","execution":"ejecuci\xF3n",\r
    "tokenomics":"token\xF3mica",\r
    "crypto taxes":"impuestos cripto",\r
    "real yield":"rendimiento real",\r
    "approval":"aprobaci\xF3n","approvals":"aprobaciones",\r
    "spending cap":"l\xEDmite de gasto",\r
    "allowance":"asignaci\xF3n",\r
    "revoke approval":"revocar aprobaci\xF3n",\r
    "wallet connection":"conexi\xF3n de monedero",\r
    "normal login":"inicio de sesi\xF3n normal",\r
    "clone site":"sitio clonado","fake support":"soporte falso",\r
    "support staff":"personal de soporte",\r
    "wrong address":"direcci\xF3n incorrecta",\r
    "malicious transaction":"transacci\xF3n maliciosa",\r
    "private key leak":"filtraci\xF3n de clave privada",\r
    "seed phrase leak":"filtraci\xF3n de frase semilla",\r
    "risk management":"gesti\xF3n de riesgos",\r
    "position sizing":"dimensionamiento de posici\xF3n",\r
    "term length":"plazo",\r
    "investor discipline":"disciplina del inversor",\r
    "capital preservation":"preservaci\xF3n de capital",\r
    "money management":"gesti\xF3n del dinero",\r
    "operational security":"seguridad operativa",\r
    "self-custody":"autocustodia",\r
    "price swings":"oscilaciones de precio",\r
    "quick reset":"reinicio r\xE1pido"\r
  },\r
  it: {\r
    "tx as a receipt":"tx come ricevuta","transaction hash":"hash della transazione",\r
    "block explorer":"explorer blockchain","network":"rete","base network":"rete Base",\r
    "Interface":"Interfaccia","website":"sito web","confirm":"conferma","execution":"esecuzione",\r
    "tokenomics":"tokenomics","crypto taxes":"tasse crypto","real yield":"rendimento reale",\r
    "approval":"approvazione","approvals":"approvazioni","spending cap":"limite di spesa",\r
    "allowance":"autorizzazione","revoke approval":"revoca approvazione",\r
    "wallet connection":"connessione wallet","normal login":"accesso normale",\r
    "clone site":"sito clone","fake support":"supporto falso","support staff":"staff di supporto",\r
    "wrong address":"indirizzo errato","malicious transaction":"transazione malevola",\r
    "private key leak":"fuga della chiave privata","seed phrase leak":"fuga della seed phrase",\r
    "risk management":"gestione del rischio","position sizing":"dimensionamento posizione",\r
    "term length":"durata","investor discipline":"disciplina dell'investitore",\r
    "capital preservation":"preservazione del capitale","money management":"gestione del denaro",\r
    "operational security":"sicurezza operativa","self-custody":"autocustodia",\r
    "price swings":"oscillazioni di prezzo","quick reset":"reset rapido"\r
  },\r
  fr: {\r
    "tx as a receipt":"tx comme re\xE7u","transaction hash":"hash de transaction",\r
    "block explorer":"explorateur de blocs","network":"r\xE9seau","base network":"r\xE9seau Base",\r
    "Interface":"Interface","website":"site web","confirm":"confirmer","execution":"ex\xE9cution",\r
    "tokenomics":"tokenomics","crypto taxes":"fiscalit\xE9 crypto","real yield":"rendement r\xE9el",\r
    "approval":"approbation","approvals":"approbations","spending cap":"plafond de d\xE9pense",\r
    "allowance":"autorisation","revoke approval":"r\xE9voquer l'approbation",\r
    "wallet connection":"connexion du portefeuille","normal login":"connexion classique",\r
    "clone site":"site clon\xE9","fake support":"faux support","support staff":"\xE9quipe support",\r
    "wrong address":"mauvaise adresse","malicious transaction":"transaction malveillante",\r
    "private key leak":"fuite de cl\xE9 priv\xE9e","seed phrase leak":"fuite de phrase de r\xE9cup\xE9ration",\r
    "risk management":"gestion des risques","position sizing":"dimensionnement de position",\r
    "term length":"dur\xE9e","investor discipline":"discipline de l'investisseur",\r
    "capital preservation":"pr\xE9servation du capital","money management":"gestion de l'argent",\r
    "operational security":"s\xE9curit\xE9 op\xE9rationnelle","self-custody":"auto-garde",\r
    "price swings":"variations de prix","quick reset":"r\xE9initialisation rapide"\r
  },\r
  de: {\r
    "tx as a receipt":"TX als Beleg","transaction hash":"Transaktions-Hash",\r
    "block explorer":"Block-Explorer","network":"Netzwerk","base network":"Base-Netzwerk",\r
    "Interface":"Oberfl\xE4che","website":"Website","confirm":"Best\xE4tigen","execution":"Ausf\xFChrung",\r
    "tokenomics":"Tokenomics","crypto taxes":"Krypto-Steuern","real yield":"reale Rendite",\r
    "approval":"Freigabe","approvals":"Freigaben","spending cap":"Ausgabenlimit",\r
    "allowance":"Berechtigung","revoke approval":"Freigabe widerrufen",\r
    "wallet connection":"Wallet-Verbindung","normal login":"normale Anmeldung",\r
    "clone site":"Klonseite","fake support":"falscher Support","support staff":"Support-Team",\r
    "wrong address":"falsche Adresse","malicious transaction":"b\xF6sartige Transaktion",\r
    "private key leak":"Leak des privaten Schl\xFCssels","seed phrase leak":"Leak der Seed-Phrase",\r
    "risk management":"Risikomanagement","position sizing":"Positionsgr\xF6\xDFe",\r
    "term length":"Laufzeit","investor discipline":"Investor-Disziplin",\r
    "capital preservation":"Kapitalerhalt","money management":"Geldmanagement",\r
    "operational security":"operative Sicherheit","self-custody":"Selbstverwahrung",\r
    "price swings":"Preisschwankungen","quick reset":"Schnell-Reset"\r
  },\r
  pt: {\r
    "tx as a receipt":"tx como comprovativo","transaction hash":"hash da transa\xE7\xE3o",\r
    "block explorer":"explorador de blocos","network":"rede","base network":"rede Base",\r
    "Interface":"Interface","website":"site web","confirm":"confirmar","execution":"execu\xE7\xE3o",\r
    "tokenomics":"tokenomics","crypto taxes":"impostos cripto","real yield":"rendimento real",\r
    "approval":"aprova\xE7\xE3o","approvals":"aprova\xE7\xF5es","spending cap":"limite de gastos",\r
    "allowance":"permiss\xE3o","revoke approval":"revogar aprova\xE7\xE3o",\r
    "wallet connection":"conex\xE3o da carteira","normal login":"login normal",\r
    "clone site":"site clonado","fake support":"suporte falso","support staff":"equipa de suporte",\r
    "wrong address":"endere\xE7o errado","malicious transaction":"transa\xE7\xE3o maliciosa",\r
    "private key leak":"vazamento de chave privada","seed phrase leak":"vazamento da frase-semente",\r
    "risk management":"gest\xE3o de risco","position sizing":"dimensionamento da posi\xE7\xE3o",\r
    "term length":"prazo","investor discipline":"disciplina do investidor",\r
    "capital preservation":"preserva\xE7\xE3o de capital","money management":"gest\xE3o de dinheiro",\r
    "operational security":"seguran\xE7a operacional","self-custody":"autocust\xF3dia",\r
    "price swings":"oscila\xE7\xF5es de pre\xE7o","quick reset":"rein\xEDcio r\xE1pido"\r
  },\r
  "pt-br": {\r
    "tx as a receipt":"tx como comprovante","transaction hash":"hash da transa\xE7\xE3o",\r
    "block explorer":"explorador de blocos","network":"rede","base network":"rede Base",\r
    "Interface":"Interface","website":"site","confirm":"confirmar","execution":"execu\xE7\xE3o",\r
    "tokenomics":"tokenomics","crypto taxes":"impostos sobre cripto","real yield":"rendimento real",\r
    "approval":"aprova\xE7\xE3o","approvals":"aprova\xE7\xF5es","spending cap":"limite de gastos",\r
    "allowance":"permiss\xE3o","revoke approval":"revogar aprova\xE7\xE3o",\r
    "wallet connection":"conex\xE3o da carteira","normal login":"login comum",\r
    "clone site":"site clonado","fake support":"suporte falso","support staff":"equipe de suporte",\r
    "wrong address":"endere\xE7o errado","malicious transaction":"transa\xE7\xE3o maliciosa",\r
    "private key leak":"vazamento de chave privada","seed phrase leak":"vazamento da frase-semente",\r
    "risk management":"gest\xE3o de riscos","position sizing":"dimensionamento de posi\xE7\xE3o",\r
    "term length":"prazo","investor discipline":"disciplina do investidor",\r
    "capital preservation":"preserva\xE7\xE3o de capital","money management":"gest\xE3o do dinheiro",\r
    "operational security":"seguran\xE7a operacional","self-custody":"autocust\xF3dia",\r
    "price swings":"oscila\xE7\xF5es de pre\xE7o","quick reset":"rein\xEDcio r\xE1pido"\r
  },\r
  ko: {\r
    "tx as a receipt":"\uC601\uC218\uC99D\uC73C\uB85C\uC11C\uC758 tx","transaction hash":"\uD2B8\uB79C\uC7AD\uC158 \uD574\uC2DC",\r
    "block explorer":"\uBE14\uB85D \uC775\uC2A4\uD50C\uB85C\uB7EC","network":"\uB124\uD2B8\uC6CC\uD06C","base network":"Base \uB124\uD2B8\uC6CC\uD06C",\r
    "Interface":"\uC778\uD130\uD398\uC774\uC2A4","website":"\uC6F9\uC0AC\uC774\uD2B8","confirm":"\uD655\uC778","execution":"\uC2E4\uD589",\r
    "tokenomics":"\uD1A0\uD06C\uB178\uBBF9\uC2A4","crypto taxes":"\uC554\uD638\uD654\uD3D0 \uC138\uAE08","real yield":"\uC2E4\uC9C8 \uC218\uC775\uB960",\r
    "approval":"\uC2B9\uC778","approvals":"\uC2B9\uC778","spending cap":"\uC9C0\uCD9C \uD55C\uB3C4",\r
    "allowance":"\uD5C8\uC6A9 \uD55C\uB3C4","revoke approval":"\uC2B9\uC778 \uCDE8\uC18C",\r
    "wallet connection":"\uC9C0\uAC11 \uC5F0\uACB0","normal login":"\uC77C\uBC18 \uB85C\uADF8\uC778",\r
    "clone site":"\uBCF5\uC81C \uC0AC\uC774\uD2B8","fake support":"\uAC00\uC9DC \uC9C0\uC6D0","support staff":"\uC9C0\uC6D0\uD300",\r
    "wrong address":"\uC798\uBABB\uB41C \uC8FC\uC18C","malicious transaction":"\uC545\uC131 \uAC70\uB798",\r
    "private key leak":"\uAC1C\uC778 \uD0A4 \uC720\uCD9C","seed phrase leak":"\uC2DC\uB4DC \uAD6C\uBB38 \uC720\uCD9C",\r
    "risk management":"\uB9AC\uC2A4\uD06C \uAD00\uB9AC","position sizing":"\uD3EC\uC9C0\uC158 \uD06C\uAE30",\r
    "term length":"\uAE30\uAC04","investor discipline":"\uD22C\uC790\uC790 \uADDC\uC728",\r
    "capital preservation":"\uC790\uBCF8 \uBCF4\uC804","money management":"\uC790\uAE08 \uAD00\uB9AC",\r
    "operational security":"\uC6B4\uC601 \uBCF4\uC548","self-custody":"\uC140\uD504 \uCEE4\uC2A4\uD130\uB514",\r
    "price swings":"\uAC00\uACA9 \uBCC0\uB3D9",\r
    "perpetual contract":"\uBB34\uAE30\uD55C \uACC4\uC57D","oracle":"\uC624\uB77C\uD074","liquidation":"\uAC15\uC81C \uCCAD\uC0B0",\r
    "rug pull":"\uB7ED\uD480","honeypot":"\uD5C8\uB2C8\uD31F","smart contract audit":"\uC2A4\uB9C8\uD2B8 \uCEE8\uD2B8\uB799\uD2B8 \uAC10\uC0AC",\r
    "over-collateralization":"\uACFC\uB2F4\uBCF4","flash loan":"\uD50C\uB798\uC2DC\uB860","MEV":"MEV",\r
    "quick reset":"\uBE60\uB978 \uC7AC\uC124\uC815"\r
  },\r
  zh: {\r
    "tx as a receipt":"\u4EA4\u6613\u4F5C\u4E3A\u51ED\u8BC1","transaction hash":"\u4EA4\u6613\u54C8\u5E0C",\r
    "block explorer":"\u533A\u5757\u6D4F\u89C8\u5668","network":"\u7F51\u7EDC","base network":"Base \u7F51\u7EDC",\r
    "Interface":"\u754C\u9762","website":"\u7F51\u7AD9","confirm":"\u786E\u8BA4","execution":"\u6267\u884C",\r
    "tokenomics":"\u4EE3\u5E01\u7ECF\u6D4E\u5B66","crypto taxes":"\u52A0\u5BC6\u7A0E\u52A1","real yield":"\u771F\u5B9E\u6536\u76CA",\r
    "approval":"\u6388\u6743","approvals":"\u6388\u6743","spending cap":"\u652F\u51FA\u4E0A\u9650",\r
    "allowance":"\u989D\u5EA6","revoke approval":"\u64A4\u9500\u6388\u6743",\r
    "wallet connection":"\u94B1\u5305\u8FDE\u63A5","normal login":"\u5E38\u89C4\u767B\u5F55",\r
    "clone site":"\u514B\u9686\u7F51\u7AD9","fake support":"\u5047\u5192\u5BA2\u670D","support staff":"\u5BA2\u670D\u4EBA\u5458",\r
    "wrong address":"\u9519\u8BEF\u5730\u5740","malicious transaction":"\u6076\u610F\u4EA4\u6613",\r
    "private key leak":"\u79C1\u94A5\u6CC4\u9732","seed phrase leak":"\u52A9\u8BB0\u8BCD\u6CC4\u9732",\r
    "risk management":"\u98CE\u9669\u7BA1\u7406","position sizing":"\u4ED3\u4F4D\u89C4\u6A21",\r
    "term length":"\u671F\u9650","investor discipline":"\u6295\u8D44\u8005\u7EAA\u5F8B",\r
    "capital preservation":"\u8D44\u672C\u4FDD\u5168","money management":"\u8D44\u91D1\u7BA1\u7406",\r
    "operational security":"\u8FD0\u8425\u5B89\u5168","self-custody":"\u81EA\u6258\u7BA1",\r
    "price swings":"\u4EF7\u683C\u6CE2\u52A8",\r
    "perpetual contract":"\u6C38\u7EED\u5408\u7EA6","oracle":"\u9884\u8A00\u673A","liquidation":"\u5F3A\u5236\u5E73\u4ED3",\r
    "rug pull":"\u8DD1\u8DEF","honeypot":"\u871C\u7F50","smart contract audit":"\u667A\u80FD\u5408\u7EA6\u5BA1\u8BA1",\r
    "over-collateralization":"\u8D85\u989D\u62B5\u62BC","flash loan":"\u95EA\u7535\u8D37","MEV":"MEV",\r
    "quick reset":"\u5FEB\u901F\u91CD\u7F6E"\r
  },\r
  ja: {\r
    "tx as a receipt":"\u9818\u53CE\u66F8\u3068\u3057\u3066\u306Etx","transaction hash":"\u30C8\u30E9\u30F3\u30B6\u30AF\u30B7\u30E7\u30F3\u30CF\u30C3\u30B7\u30E5",\r
    "block explorer":"\u30D6\u30ED\u30C3\u30AF\u30A8\u30AF\u30B9\u30D7\u30ED\u30FC\u30E9\u30FC","network":"\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF","base network":"Base\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF",\r
    "Interface":"\u30A4\u30F3\u30BF\u30FC\u30D5\u30A7\u30FC\u30B9","website":"\u30A6\u30A7\u30D6\u30B5\u30A4\u30C8","confirm":"\u78BA\u8A8D","execution":"\u5B9F\u884C",\r
    "tokenomics":"\u30C8\u30FC\u30AF\u30CE\u30DF\u30AF\u30B9","crypto taxes":"\u6697\u53F7\u8CC7\u7523\u7A0E","real yield":"\u5B9F\u8CEA\u5229\u56DE\u308A",\r
    "approval":"\u627F\u8A8D","approvals":"\u627F\u8A8D","spending cap":"\u652F\u51FA\u4E0A\u9650",\r
    "allowance":"\u8A31\u53EF\u984D","revoke approval":"\u627F\u8A8D\u3092\u53D6\u308A\u6D88\u3059",\r
    "wallet connection":"\u30A6\u30A9\u30EC\u30C3\u30C8\u63A5\u7D9A","normal login":"\u901A\u5E38\u30ED\u30B0\u30A4\u30F3",\r
    "clone site":"\u30AF\u30ED\u30FC\u30F3\u30B5\u30A4\u30C8","fake support":"\u507D\u30B5\u30DD\u30FC\u30C8","support staff":"\u30B5\u30DD\u30FC\u30C8\u62C5\u5F53",\r
    "wrong address":"\u8AA4\u3063\u305F\u30A2\u30C9\u30EC\u30B9","malicious transaction":"\u60AA\u610F\u306E\u3042\u308B\u53D6\u5F15",\r
    "private key leak":"\u79D8\u5BC6\u9375\u306E\u6F0F\u6D29","seed phrase leak":"\u30B7\u30FC\u30C9\u30D5\u30EC\u30FC\u30BA\u306E\u6F0F\u6D29",\r
    "risk management":"\u30EA\u30B9\u30AF\u7BA1\u7406","position sizing":"\u30DD\u30B8\u30B7\u30E7\u30F3\u30B5\u30A4\u30BA",\r
    "term length":"\u671F\u9593","investor discipline":"\u6295\u8CC7\u5BB6\u306E\u898F\u5F8B",\r
    "capital preservation":"\u8CC7\u672C\u4FDD\u5168","money management":"\u8CC7\u91D1\u7BA1\u7406",\r
    "operational security":"\u904B\u7528\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3","self-custody":"\u30BB\u30EB\u30D5\u30AB\u30B9\u30C8\u30C7\u30A3",\r
    "price swings":"\u4FA1\u683C\u5909\u52D5",\r
    "perpetual contract":"\u7121\u671F\u9650\u5951\u7D04","oracle":"\u30AA\u30E9\u30AF\u30EB","liquidation":"\u6E05\u7B97",\r
    "rug pull":"\u30E9\u30B0\u30D7\u30EB","honeypot":"\u30CF\u30CB\u30FC\u30DD\u30C3\u30C8","smart contract audit":"\u30B9\u30DE\u30FC\u30C8\u30B3\u30F3\u30C8\u30E9\u30AF\u30C8\u76E3\u67FB",\r
    "over-collateralization":"\u904E\u5270\u62C5\u4FDD","flash loan":"\u30D5\u30E9\u30C3\u30B7\u30E5\u30ED\u30FC\u30F3","MEV":"MEV",\r
    "quick reset":"\u30AF\u30A4\u30C3\u30AF\u30EA\u30BB\u30C3\u30C8"\r
  }\r
};\r
\r
function getGlossary(lang) {\r
  return { ...(GLOSSARY[lang] || {}), ...(COURSE_GLOSSARY[lang] || {}) };\r
}\r
\r
function glossaryExact(sourceText, lang) {\r
  const gl = getGlossary(lang);\r
  if (typeof FintechGlossary === "undefined" || !FintechGlossary.glossaryResolve) {\r
    if (gl[sourceText] !== undefined) return gl[sourceText];\r
    const lower = sourceText.toLowerCase();\r
    if (gl[lower] !== undefined) return gl[lower];\r
    return null;\r
  }\r
  return FintechGlossary.glossaryResolve(sourceText, gl, { isLocked: isLockedTerm });\r
}\r
\r
const PRICING = {\r
  "gpt-5.5-nano": { i: 0.25, o: 1.50 },\r
  "gpt-5.5-mini": { i: 0.90, o: 5.00 },\r
  "gpt-5.5":      { i: 3.50, o: 17.0 },\r
  "gpt-5.4-nano": { i: 0.20, o: 1.25 },\r
  "gpt-5.4-mini": { i: 0.75, o: 4.50 },\r
  "gpt-5.4":      { i: 3.00, o: 15.0 },\r
  "gpt-4o-mini":  { i: 0.15, o: 0.60 },\r
  "gpt-4o":       { i: 2.50, o: 10.0 },\r
};\r
\r
/* ================================================================== */\r
/*  State                                                              */\r
/* ================================================================== */\r
let provider = "free";\r
let framesData = [];\r
let busy = false;\r
let cache = {};\r
let cacheLoaded = false;\r
let cacheDirty = false;\r
\r
function persistCache() {\r
  if (!cacheDirty) return;\r
  cacheDirty = false;\r
  const keys = Object.keys(cache);\r
  const trimmed = {};\r
  const slice = keys.slice(-2000);\r
  for (const k of slice) trimmed[k] = cache[k];\r
  parent.postMessage({ pluginMessage: { type: "save-cache", data: trimmed } }, "*");\r
}\r
\r
/* Cache key namespaced by provider (and model for OpenAI) so a Free/Google\r
   translation is never silently reused for a Pro/OpenAI run, and switching\r
   model re-translates instead of returning the previous model's output. */\r
function cacheKey(lang, text) {\r
  const tag = provider === "openai" ? "o:" + ($model.value || "") : "free";\r
  return tag + ":" + lang + ":" + text;\r
}\r
\r
/* ================================================================== */\r
/*  DOM                                                                */\r
/* ================================================================== */\r
const $ = (s) => document.getElementById(s);\r
const $apiKey       = $("apiKey");\r
const $saveKey      = $("saveKey");\r
const $toggleKey    = $("toggleKey");\r
const $model        = $("model");\r
const $scanBtn      = $("scanBtn");\r
const $translateBtn = $("translateBtn");\r
const $translateLbl = $("translateLabel");\r
const $applyBtn     = $("applyBtn");\r
const $applyLbl     = null;\r
const $previewSec   = $("previewSection");\r
const $previewBox   = $("previewBox");\r
const $countBadge   = $("countBadge");\r
const $costSection  = $("costSection");\r
const $costCard     = $("costCard");\r
const $costHint     = $("costHint");\r
const $progressSec  = $("progressSection");\r
const $progressBar  = $("progressBar");\r
const $progressLbl  = $("progressLabel");\r
const $logArea      = $("logArea");\r
const $scrollWrap   = document.querySelector(".scroll");\r
const $emptyState   = $("emptyState");\r
const $proSettings  = $("proSettings");\r
const $lockTerms    = $("lockTerms");\r
const $smartWrap    = $("smartWrap");\r
const $expandFrames = document.getElementById("expandFrames");\r
const $sidePadding  = $("sidePadding");\r
const $padMinus     = $("padMinus");\r
const $padPlus      = $("padPlus");\r
const $reviewSec    = $("reviewSection");\r
const $reviewTabs   = $("reviewTabs");\r
const $reviewRows   = $("reviewRows");\r
const $reviewSummary = $("reviewSummary");\r
const $syncRefBtn    = $("syncRefBtn");\r
const $cancelBtn     = $("cancelBtn");\r
\r
let translatedStore = {};  // { "es": [ {original, translated, path, frameId} ], ... }\r
let canvasApplied = false;\r
let activeReviewLang = null;\r
let cancelRequested = false;\r
let myMemoryCharsUsed = 0;\r
\r
/* ================================================================== */\r
/*  Provider toggle                                                    */\r
/* ================================================================== */\r
document.querySelectorAll(".toggle-opt").forEach(btn => {\r
  btn.addEventListener("click", () => {\r
    document.querySelectorAll(".toggle-opt").forEach(b => b.classList.remove("active"));\r
    btn.classList.add("active");\r
    provider = btn.dataset.provider;\r
    $proSettings.classList.toggle("hidden", provider === "free");\r
    updateCost();\r
    saveSettings();\r
  });\r
});\r
\r
/* ================================================================== */\r
/*  Language chips                                                     */\r
/* ================================================================== */\r
document.querySelectorAll(".chip").forEach(chip => {\r
  chip.addEventListener("click", () => {\r
    const cb = chip.querySelector("input");\r
    if (!cb || cb.id === "smartWrap") return;\r
    requestAnimationFrame(() => {\r
      chip.classList.toggle("on", cb.checked);\r
      updateCost();\r
      saveSettings();\r
    });\r
  });\r
});\r
\r
if ($smartWrap) {\r
  $smartWrap.addEventListener("change", () => {\r
    saveSettings();\r
  });\r
}\r
if ($expandFrames) {\r
  $expandFrames.addEventListener("change", () => {\r
    saveSettings();\r
  });\r
}\r
\r
if ($sidePadding) {\r
  $sidePadding.addEventListener("input", () => {\r
    const n = Number($sidePadding.value || 0);\r
    if (!Number.isFinite(n) || n < 0) $sidePadding.value = "0";\r
    if (n > 80) $sidePadding.value = "80";\r
    updateCost();\r
    saveSettings();\r
  });\r
}\r
if ($padMinus && $sidePadding) {\r
  $padMinus.addEventListener("click", () => {\r
    const n = Math.max(0, Number($sidePadding.value || 0) - 1);\r
    $sidePadding.value = String(n);\r
    saveSettings();\r
  });\r
}\r
if ($padPlus && $sidePadding) {\r
  $padPlus.addEventListener("click", () => {\r
    const n = Math.min(80, Number($sidePadding.value || 0) + 1);\r
    $sidePadding.value = String(n);\r
    saveSettings();\r
  });\r
}\r
\r
const $autoFontScale = document.getElementById("autoFontScale");\r
const $minFontSize   = document.getElementById("minFontSize");\r
const $minFontMinus  = document.getElementById("minFontMinus");\r
const $minFontPlus   = document.getElementById("minFontPlus");\r
const $minFontGroup  = document.getElementById("minFontGroup");\r
\r
function syncFontScaleUI() {\r
  const on = $autoFontScale && $autoFontScale.checked;\r
  if ($minFontGroup) {\r
    $minFontGroup.style.opacity       = on ? "1" : "0.4";\r
    $minFontGroup.style.pointerEvents = on ? "auto" : "none";\r
  }\r
}\r
if ($autoFontScale) {\r
  $autoFontScale.addEventListener("change", function() { syncFontScaleUI(); saveSettings(); });\r
  syncFontScaleUI();\r
}\r
const $smartFitRecommendedBtn = $("smartFitRecommendedBtn");\r
if ($smartFitRecommendedBtn) {\r
  $smartFitRecommendedBtn.addEventListener("click", () => {\r
    if ($smartWrap) $smartWrap.checked = true;\r
    if ($expandFrames) $expandFrames.checked = true;\r
    if ($autoFontScale) $autoFontScale.checked = false;\r
    if ($sidePadding) $sidePadding.value = "16";\r
    syncFontScaleUI();\r
    saveSettings();\r
    log("Smart Fit: recommended defaults (wrap + grow on, scale off, padding 16)", "info");\r
  });\r
}\r
if ($minFontMinus && $minFontSize) {\r
  $minFontMinus.addEventListener("click", () => {\r
    const n = Math.max(6, Number($minFontSize.value || 8) - 1);\r
    $minFontSize.value = String(n);\r
    saveSettings();\r
  });\r
}\r
if ($minFontPlus && $minFontSize) {\r
  $minFontPlus.addEventListener("click", () => {\r
    const n = Math.min(24, Number($minFontSize.value || 8) + 1);\r
    $minFontSize.value = String(n);\r
    saveSettings();\r
  });\r
}\r
\r
function selectedLangs() {\r
  return [...document.querySelectorAll(".chip input:checked")].map(i => i.value);\r
}\r
\r
/* ================================================================== */\r
/*  API Key                                                            */\r
/* ================================================================== */\r
$toggleKey.addEventListener("click", () => {\r
  $apiKey.type = $apiKey.type === "password" ? "text" : "password";\r
});\r
$saveKey.addEventListener("click", () => {\r
  const k = $apiKey.value.trim();\r
  if (!k) return;\r
  if (!k.startsWith("sk-")) {\r
    log("Key must start with sk-... (not sess- or other)", "err");\r
    return;\r
  }\r
  parent.postMessage({ pluginMessage: { type: "save-key", key: k } }, "*");\r
  log("API key saved", "ok");\r
});\r
\r
$cancelBtn.addEventListener("click", function() {\r
  cancelRequested = true;\r
  $cancelBtn.disabled = true;\r
  $cancelBtn.textContent = "Cancelling\u2026";\r
});\r
\r
$model.addEventListener("change", () => { updateCost(); saveSettings(); });\r
if ($lockTerms) $lockTerms.addEventListener("input", () => saveSettings());\r
\r
/* ================================================================== */\r
/*  UI helpers                                                         */\r
/* ================================================================== */\r
function scrollToEl(el) {\r
  if (!$scrollWrap || !el) return;\r
  // Small timeout lets the DOM render before measuring positions.\r
  setTimeout(function() {\r
    var top = el.getBoundingClientRect().top - $scrollWrap.getBoundingClientRect().top;\r
    $scrollWrap.scrollBy({ top: top - 12, behavior: "smooth" });\r
  }, 60);\r
}\r
\r
function log(msg, cls, noAutoScroll) {\r
  const d = document.createElement("div");\r
  d.className = "log-line fade-in " + (cls || "info");\r
  d.innerHTML = '<span class="dot"></span>' + esc(msg);\r
  // Append (newest at bottom) so scrolling down shows latest.\r
  $logArea.appendChild(d);\r
  if ($scrollWrap && !noAutoScroll) {\r
    $scrollWrap.scrollTop = $scrollWrap.scrollHeight;\r
  }\r
}\r
\r
function setProgress(pct, text) {\r
  const wasHidden = $progressSec.classList.contains("hidden");\r
  $progressSec.classList.remove("hidden");\r
  $progressBar.style.width = pct + "%";\r
  $progressLbl.textContent = text;\r
  // Scroll into view when progress section first appears.\r
  if (wasHidden) scrollToEl($progressSec);\r
}\r
\r
function setBusy(v) {\r
  busy = v;\r
  $scanBtn.disabled = v;\r
  if ($syncRefBtn) $syncRefBtn.disabled = v;\r
  const applyShowing = $applyBtn && !$applyBtn.classList.contains("hidden");\r
  if (applyShowing) {\r
    $applyBtn.disabled = v;\r
    $translateBtn.disabled = true;\r
  } else {\r
    $translateBtn.disabled = v;\r
    if ($applyBtn) $applyBtn.disabled = true;\r
  }\r
}\r
\r
function esc(s) { return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }\r
\r
/* ================================================================== */\r
/*  Cost estimation                                                    */\r
/* ================================================================== */\r
function updateCost() {\r
  if (!framesData.length) { $costSection.classList.add("hidden"); $costHint.classList.add("hidden"); return; }\r
\r
  const langs = selectedLangs();\r
  const totalStrings = framesData.reduce((s,f) => s + f.texts.length, 0);\r
  const totalChars   = framesData.reduce((s,f) => s + f.texts.reduce((a,t) => a + t.characters.length, 0), 0);\r
  const perLang = totalStrings * langs.length;\r
\r
  if (provider === "free") {\r
    $costCard.innerHTML =\r
      '<div class="icon free">&#x2728;</div>' +\r
      '<div class="info">' +\r
        '<div class="price free-price">Free</div>' +\r
        '<div class="detail">' + perLang + ' strings via Google Translate &middot; No API key needed</div>' +\r
      '</div>';\r
    $costHint.textContent = "Free \u2014 powered by Google Translate";\r
    $costHint.classList.remove("hidden");\r
  } else {\r
    const model = $model.value;\r
    const p = PRICING[model] || PRICING["gpt-5.5-mini"];\r
    const sysTokens = 500;\r
    const inTokens  = Math.ceil(totalChars / 3.5) + sysTokens;\r
    const outTokens = Math.ceil(totalChars / 3.5);\r
    const costPerLang = (inTokens * p.i + outTokens * p.o) / 1_000_000;\r
    const totalCost = costPerLang * langs.length;\r
    const display = totalCost < 0.01 ? "<$0.01" : "$" + totalCost.toFixed(3);\r
\r
    $costCard.innerHTML =\r
      '<div class="icon paid">&#x26A1;</div>' +\r
      '<div class="info">' +\r
        '<div class="price paid-price">~' + display + '</div>' +\r
        '<div class="detail">' + perLang + ' strings &middot; ' + model + ' &middot; ~' + (inTokens + outTokens) + ' tokens</div>' +\r
      '</div>';\r
    $costHint.textContent = "Est. ~" + display;\r
    $costHint.classList.remove("hidden");\r
  }\r
\r
  $costSection.classList.remove("hidden");\r
}\r
\r
/* ================================================================== */\r
/*  Scan                                                               */\r
/* ================================================================== */\r
const $rescanWarn = $("rescanWarn");\r
const $rescanLink = $("rescanLink");\r
\r
function hideRescanWarn() {\r
  if ($rescanWarn) $rescanWarn.classList.add("hidden");\r
}\r
function showRescanWarn() {\r
  if ($rescanWarn && framesData.length > 0) $rescanWarn.classList.remove("hidden");\r
}\r
\r
function doScan() {\r
  if (busy) return;\r
  hideRescanWarn();\r
  parent.postMessage({ pluginMessage: { type: "scan" } }, "*");\r
}\r
\r
$scanBtn.addEventListener("click", doScan);\r
if ($rescanLink) {\r
  $rescanLink.addEventListener("click", function() { doScan(); });\r
}\r
\r
function fitOptionsPayload() {\r
  return {\r
    smartWrap:     !!($smartWrap     && $smartWrap.checked),\r
    sidePadding:   Number(($sidePadding  && $sidePadding.value)  || 0),\r
    expandFrames:  $expandFrames == null ? true : !!$expandFrames.checked,\r
    autoFontScale: !!($autoFontScale && $autoFontScale.checked),\r
    minFontSize:   Number(($minFontSize  && $minFontSize.value)   || 8),\r
  };\r
}\r
\r
if ($syncRefBtn) {\r
  $syncRefBtn.addEventListener("click", function() {\r
    if (busy) return;\r
    const langs = selectedLangs();\r
    if (!langs.length) { log("Select at least one target language", "err"); return; }\r
    if (provider === "openai" && !$apiKey.value.trim()) { log("Enter OpenAI API key", "err"); return; }\r
    setBusy(true);\r
    $progressSec.classList.remove("hidden");\r
    setProgress(0, "Reading source frame\u2026");\r
    parent.postMessage({ pluginMessage: { type: "sync-reference-scan", langs: langs } }, "*");\r
  });\r
}\r
\r
/* ================================================================== */\r
/*  Helpers: cleanup                                                   */\r
/* ================================================================== */\r
function stripTags(s) {\r
  return s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();\r
}\r
\r
function looksTranslated(original, translated) {\r
  if (!translated || !translated.trim()) return false;\r
  const a = original.toLowerCase().trim();\r
  const b = translated.toLowerCase().trim();\r
  if (a === b) return false;\r
  if (b.includes("<g ") || b.includes("</g>")) return false;\r
  return true;\r
}\r
\r
/**\r
 * Split trailing sentence punctuation from the last non-whitespace run (mirrors source vs API).\r
 * Preserves spaces after punctuation in \`.after\` (unusual in UI but keeps layout faithful).\r
 */\r
function splitTrailingSentencePunct(s) {\r
  if (!s) return { core: "", punct: "", after: "" };\r
  let i = s.length - 1;\r
  while (i >= 0 && /\\s/.test(s[i])) i--;\r
  const after = s.slice(i + 1);\r
  if (i < 0) return { core: "", punct: "", after: after };\r
  let j = i;\r
  while (j >= 0 && /[.!?\u2026:;\\u2026\\u3002\\uFF01\\uFF1F\\uFF1A\\uFF1B\\uFF0E\\uFE52]/.test(s[j])) j--;\r
  const punct = s.slice(j + 1, i + 1);\r
  const core = s.slice(0, j + 1);\r
  return { core, punct, after };\r
}\r
\r
/** If source has no lowercase letters, uppercase the whole translation (e.g. VIP, OK). */\r
function mirrorLetterCase(origCore, transCore) {\r
  if (!transCore) return transCore;\r
  if (!/\\p{L}/u.test(origCore)) return transCore;\r
\r
  if (!/\\p{Ll}/u.test(origCore)) {\r
    return transCore.toLocaleUpperCase("en-US");\r
  }\r
\r
  const tm = transCore.match(/\\p{L}/u);\r
  const om = origCore.match(/\\p{L}/u);\r
  if (!tm || !om) return transCore;\r
\r
  const tch = tm[0];\r
  const och = om[0];\r
  const ti = tm.index;\r
  const origFirstIsUpper = och !== och.toLowerCase();\r
  const transFirstIsLower = tch === tch.toLowerCase() && tch !== tch.toUpperCase();\r
\r
  if (origFirstIsUpper && transFirstIsLower) {\r
    const up = tch.toLocaleUpperCase("en-US");\r
    return transCore.slice(0, ti) + up + transCore.slice(ti + tch.length);\r
  }\r
  return transCore;\r
}\r
\r
/**\r
 * Restore leading/trailing whitespace from the source and mirror terminal punctuation + casing.\r
 * Free APIs often drop initial cap on short strings and add/remove final ".".\r
 */\r
function applySourceFormatting(original, translated) {\r
  if (translated == null || translated === "") return original;\r
\r
  const lead = (original.match(/^\\s*/) || [""])[0];\r
  const trail = (original.match(/\\s*$/) || [""])[0];\r
  const mid = original.slice(lead.length, original.length - trail.length);\r
\r
  const t = translated.trim();\r
  const src = splitTrailingSentencePunct(mid);\r
  const got = splitTrailingSentencePunct(t);\r
\r
  const outMirrored = mirrorLetterCase(src.core, got.core);\r
  /* Drop any terminal punctuation the MT added; keep only what the source had (src.punct + src.after). */\r
  const tail = splitTrailingSentencePunct(outMirrored);\r
  const outCore = tail.core + tail.after;\r
\r
  return lead + outCore + src.punct + src.after + trail;\r
}\r
\r
/* Google / MyMemory expect zh-CN / pt-BR; UI chips stay "zh" / "pt-br".\r
   Bare "pt" is kept as-is: Google treats it as Brazilian by default, so the\r
   European chip maps to pt-PT explicitly. */\r
function translateApiLang(lang) {\r
  if (lang === "zh") return "zh-CN";\r
  if (lang === "pt") return "pt-PT";\r
  if (lang === "pt-br") return "pt-BR";\r
  return lang;\r
}\r
\r
/* ================================================================== */\r
/*  Retry helper                                                       */\r
/* ================================================================== */\r
async function withRetry(fn, retries, baseDelay) {\r
  retries = retries || 3;\r
  baseDelay = baseDelay || 400;\r
  let lastErr;\r
  for (let attempt = 0; attempt < retries; attempt++) {\r
    if (cancelRequested) throw new Error("Cancelled");\r
    try { return await fn(); } catch (e) {\r
      lastErr = e;\r
      if (attempt < retries - 1) await sleep(baseDelay * Math.pow(2, attempt));\r
    }\r
  }\r
  throw lastErr;\r
}\r
\r
/* ================================================================== */\r
/*  Translation: Google Translate (free, primary)                      */\r
/* ================================================================== */\r
async function translateGoogle(text, lang) {\r
  return withRetry(async function() {\r
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" +\r
      translateApiLang(lang) + "&dt=t&q=" + encodeURIComponent(text);\r
    const res = await fetch(url);\r
    if (!res.ok) throw new Error("Google Translate HTTP " + res.status);\r
    const data = await res.json();\r
    let result = "";\r
    if (data && data[0]) {\r
      for (const part of data[0]) {\r
        if (part && part[0]) result += part[0];\r
      }\r
    }\r
    return result.trim();\r
  }, 3, 500);\r
}\r
\r
/* ================================================================== */\r
/*  Translation: MyMemory (free, fallback)                             */\r
/* ================================================================== */\r
/* MyMemory publishes ~5k chars/day for anonymous usage (see their FAQ); the API does not return a precise remaining quota.\r
   This value is a session-only safety budget so we do not spam MyMemory after Google failed; it resets when the plugin UI reloads. */\r
const MYMEMORY_SESSION_CHAR_BUDGET = 4500;\r
\r
async function translateMyMemory(text, lang) {\r
  if (myMemoryCharsUsed + text.length > MYMEMORY_SESSION_CHAR_BUDGET) {\r
    throw new Error("MyMemory session budget exceeded (plugin session counter; reload resets). Use Pro or try later.");\r
  }\r
  return withRetry(async function() {\r
    const url = "https://api.mymemory.translated.net/get?q=" +\r
      encodeURIComponent(text) + "&langpair=en|" + translateApiLang(lang);\r
    const res = await fetch(url);\r
    if (!res.ok) throw new Error("MyMemory HTTP " + res.status);\r
    const data = await res.json();\r
    if (data.responseData && data.responseData.match !== undefined && data.responseData.match < 0.3) {\r
      throw new Error("MyMemory low-quality match");\r
    }\r
    myMemoryCharsUsed += text.length;\r
    return stripTags(data.responseData.translatedText || "");\r
  }, 2, 600);\r
}\r
\r
/* ================================================================== */\r
/*  Free batch: Google primary \u2192 MyMemory fallback \u2192 parallel          */\r
/* ================================================================== */\r
async function translateOneFree(text, lang) {\r
  if (isDateEraLabel(text)) return text;\r
  const key = cacheKey(lang, text);\r
  if (cache[key]) return cache[key];\r
\r
  const exact = glossaryExact(text, lang);\r
  if (exact) {\r
    const out = applySourceFormatting(text, exact);\r
    cache[key] = out;\r
    cacheDirty = true;\r
    return out;\r
  }\r
\r
  let translated = "";\r
  let failedGoogle = false;\r
  try {\r
    translated = await translateGoogle(text, lang);\r
  } catch (e) {\r
    failedGoogle = true;\r
    if (e.message === "Cancelled") throw e;\r
  }\r
\r
  if (!looksTranslated(text, translated)) {\r
    try {\r
      translated = await translateMyMemory(text, lang);\r
    } catch (e2) {\r
      if (e2.message === "Cancelled") throw e2;\r
      if (failedGoogle) log("Both APIs failed for: " + text.slice(0, 40), "warn");\r
    }\r
  }\r
\r
  translated = stripTags(translated);\r
  if (!translated) {\r
    /* Both providers failed / returned nothing. Return the original but do NOT\r
       cache it \u2014 otherwise a transient network outage would permanently poison\r
       the cache, leaving this string stuck in English on every future run. */\r
    return applySourceFormatting(text, text);\r
  }\r
\r
  translated = applySourceFormatting(text, translated);\r
  cache[key] = translated;\r
  cacheDirty = true;\r
  return translated;\r
}\r
\r
async function batchFree(texts, lang, onProg) {\r
  const CONCURRENCY = 5;\r
  const results = new Array(texts.length);\r
  let completed = 0;\r
\r
  for (let start = 0; start < texts.length; start += CONCURRENCY) {\r
    if (cancelRequested) throw new Error("Cancelled");\r
    const end = Math.min(start + CONCURRENCY, texts.length);\r
    const chunk = [];\r
    for (let i = start; i < end; i++) {\r
      chunk.push(translateOneFree(texts[i], lang).then(function(r) {\r
        results[i] = r;\r
        completed++;\r
        onProg(completed, texts.length);\r
      }));\r
    }\r
    await Promise.all(chunk);\r
    if (end < texts.length) await sleep(30);\r
  }\r
  return results;\r
}\r
\r
/* ================================================================== */\r
/*  Translation: OpenAI (pro)                                          */\r
/* ================================================================== */\r
function filterGlossary(gl, texts) {\r
  const pool = texts.join(" ").toLowerCase();\r
  const out = {};\r
  for (const [en, loc] of Object.entries(gl)) {\r
    if (pool.includes(en.toLowerCase())) out[en] = loc;\r
  }\r
  return out;\r
}\r
\r
async function callOpenAI(texts, lang) {\r
  const key = $apiKey.value.trim();\r
  const model = $model.value;\r
  const gl = filterGlossary(getGlossary(lang), texts);\r
  const glBlock = Object.entries(gl).map(([e,t]) => '  "'+e+'" \u2192 "'+t+'"').join("\\n");\r
\r
  const sys =\r
    "You are a professional fintech UI/UX translator.\\n" +\r
    "Translate every string from English to " + LANG_NAMES[lang] + ".\\n\\n" +\r
    "RULES:\\n" +\r
    "1. Formal, professional tone for financial apps.\\n" +\r
    "2. Preserve ALL placeholders: {var}, {{var}}, %s, %d, %@, $var.\\n" +\r
    "3. DATE / ERA / TIMELINE LABELS: any string that is primarily a date range, decade, year span, or timeline marker (e.g. \\"1900s~2000\\", \\"2000s~2020s\\", \\"2020s~?\\", \\"Q1 2024\\", \\"2020\u20132025\\") must be returned EXACTLY as-is, character-for-character. Do NOT spell out decades, do NOT rephrase, do NOT drop the \\"s\\" suffix, do NOT change ~ or \u2013 to other characters.\\n" +\r
    "4. Keep unchanged: KYC, AML, IBAN, SWIFT, BIC, API, PIN, OTP, 2FA, CVV, PCI, SEPA.\\n" +\r
    "5. Keep established tech/industry terms untranslated: Web 1.0, Web 2.0, Web 3.0, DeFi, NFT, DAO, DEX, CEX, DApp, Layer 1, Layer 2, staking, blockchain, token, wallet, smart contract, and all brand names.\\n" +\r
    "6. CONCISE \u2014 this is critical for UI cards and labels:\\n" +\r
    "   - Translation must match the source length as closely as possible.\\n" +\r
    "   - NEVER expand a short phrase into a verbose description.\\n" +\r
    "   - If source is \u2264 30 chars \u2192 translation must not exceed 130 % of source length.\\n" +\r
    "   - If source is \u2264 60 chars \u2192 translation must not exceed 120 % of source length.\\n" +\r
    "   - Prefer shorter synonyms and natural abbreviations in the target language.\\n" +\r
    "7. No extra punctuation.\\n" +\r
    "8. Preserve capitalisation (ALL CAPS \u2192 ALL CAPS, Title \u2192 Title).\\n" +\r
    "9. Preserve leading/trailing whitespace and terminal punctuation exactly as in source.\\n" +\r
    "10. Preserve ALL special characters verbatim: tildes (~), en-dashes (\u2013), em-dashes (\u2014), arrows (\u2192\u2190), bullets (\u2022), pipes (|), slashes (/). Never replace one with another.\\n\\n" +\r
    (glBlock ? "GLOSSARY (use these exact translations when the source matches):\\n" + glBlock + "\\n\\n" : "") +\r
    "INPUT: JSON array of source strings.\\n" +\r
    "OUTPUT: a JSON object with a single key \\"t\\" whose value is the translated array (same order, same count).\\n" +\r
    "Example: {\\"t\\": [\\"translated1\\", \\"translated2\\"]}\\n" +\r
    "Return ONLY valid JSON. No markdown, no explanation.";\r
\r
  const body = {\r
    model,\r
    messages: [{ role: "system", content: sys }, { role: "user", content: JSON.stringify(texts) }],\r
    response_format: { type: "json_object" },\r
  };\r
  /* GPT-5.x accepts only the default temperature and 400s on a custom value;\r
     keep the low-temperature determinism for legacy gpt-4o models only. */\r
  if (/^gpt-4o/.test(model)) body.temperature = 0.1;\r
\r
  return withRetry(async function() {\r
    if (cancelRequested) throw new Error("Cancelled");\r
    const res = await fetch("https://api.openai.com/v1/chat/completions", {\r
      method: "POST",\r
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },\r
      body: JSON.stringify(body),\r
    });\r
\r
    if (!res.ok) {\r
      const e = await res.json().catch(() => ({}));\r
      throw new Error((e.error && e.error.message) || "OpenAI " + res.status);\r
    }\r
\r
    const data = await res.json();\r
\r
    if (data.error) {\r
      throw new Error(data.error.message || JSON.stringify(data.error).slice(0, 200));\r
    }\r
    if (!data.choices || !data.choices.length || !data.choices[0].message) {\r
      throw new Error("OpenAI returned unexpected response (no choices). Model may be unavailable.");\r
    }\r
\r
    let content = data.choices[0].message.content.trim();\r
    if (content.startsWith("\`\`\`")) content = content.replace(/^\`\`\`(?:json)?\\n?/, "").replace(/\\n?\`\`\`$/, "");\r
\r
    let parsed;\r
    try { parsed = JSON.parse(content); } catch (pe) {\r
      throw new Error("OpenAI returned invalid JSON: " + content.slice(0, 120));\r
    }\r
\r
    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) && parsed.error) {\r
      const em = typeof parsed.error === "string" ? parsed.error\r
        : (parsed.error.message || JSON.stringify(parsed.error).slice(0, 200));\r
      throw new Error("OpenAI error: " + em);\r
    }\r
\r
    let arr = parsed;\r
\r
    if (typeof arr === "string") {\r
      arr = [arr];\r
    }\r
\r
    if (!Array.isArray(arr) && typeof arr === "object" && arr !== null) {\r
      const keys = Object.keys(arr);\r
      for (const k of keys) {\r
        const v = arr[k];\r
        if (Array.isArray(v) && v.length === texts.length) { arr = v; break; }\r
      }\r
      if (!Array.isArray(arr)) {\r
        const strVals = keys.filter(function(k) { return typeof arr[k] === "string" && k !== "error"; });\r
        if (strVals.length === texts.length) {\r
          arr = strVals.map(function(k) { return arr[k]; });\r
        } else if (texts.length === 1 && strVals.length >= 1) {\r
          arr = [arr[strVals[0]]];\r
        }\r
      }\r
    }\r
\r
    if (!Array.isArray(arr) || arr.length !== texts.length) {\r
      throw new Error("Expected " + texts.length + " translations, got " + (Array.isArray(arr) ? arr.length : "non-array") + "; raw: " + content.slice(0, 150));\r
    }\r
    return arr;\r
  }, 2, 1000);\r
}\r
\r
async function batchOpenAI(texts, lang, onProg) {\r
  const BATCH = 40;\r
  const results = [];\r
\r
  for (let i = 0; i < texts.length; i += BATCH) {\r
    const batch = texts.slice(i, i + BATCH);\r
    const uncachedIdx = [], uncachedTxt = [];\r
    const batchRes = new Array(batch.length);\r
\r
    for (let j = 0; j < batch.length; j++) {\r
      if (shouldSkipTranslation(batch[j])) {\r
        batchRes[j] = batch[j];\r
        continue;\r
      }\r
      const k = cacheKey(lang, batch[j]);\r
      const exact = glossaryExact(batch[j], lang);\r
      if (exact) {\r
        const out = applySourceFormatting(batch[j], exact);\r
        cache[k] = out;\r
        cacheDirty = true;\r
        batchRes[j] = out;\r
      } else if (cache[k] !== undefined) {\r
        batchRes[j] = cache[k];\r
      } else {\r
        uncachedIdx.push(j);\r
        uncachedTxt.push(batch[j]);\r
      }\r
    }\r
\r
    if (uncachedTxt.length) {\r
      if (cancelRequested) throw new Error("Cancelled");\r
      const translated = await callOpenAI(uncachedTxt, lang);\r
      for (let k = 0; k < uncachedTxt.length; k++) {\r
        const ck = cacheKey(lang, uncachedTxt[k]);\r
        const out = applySourceFormatting(uncachedTxt[k], translated[k]);\r
        cache[ck] = out;\r
        cacheDirty = true;\r
        batchRes[uncachedIdx[k]] = out;\r
      }\r
    }\r
\r
    results.push(...batchRes);\r
    onProg(Math.min(i + BATCH, texts.length), texts.length);\r
  }\r
  return results;\r
}\r
\r
/* ================================================================== */\r
/*  Lock terms helpers                                                 */\r
/* ================================================================== */\r
let _lockedSet = null;\r
let _lockedRaw = "";\r
function getLockedSet() {\r
  const raw = $lockTerms.value || "";\r
  if (raw === _lockedRaw && _lockedSet) return _lockedSet;\r
  _lockedRaw = raw;\r
  _lockedSet = new Set(raw.split(",").map(s => s.trim().toLowerCase()).filter(Boolean));\r
  return _lockedSet;\r
}\r
\r
function isLockedTerm(text) {\r
  return getLockedSet().has(text.toLowerCase().trim());\r
}\r
\r
const DATE_ERA_RE = /^\\s*\\d{4}s?\\s*[~\u2013\u2014\\-]\\s*(\\d{4}s?|\\?)\\s*$/;\r
function isDateEraLabel(text) {\r
  return DATE_ERA_RE.test(text);\r
}\r
\r
function shouldSkipTranslation(text) {\r
  return isLockedTerm(text) || isDateEraLabel(text);\r
}\r
\r
/* ================================================================== */\r
/*  Overflow detection                                                 */\r
/* ================================================================== */\r
function estimateWidth(s) {\r
  if (!s) return 0;\r
  let w = 0;\r
  for (let i = 0; i < s.length; i++) {\r
    const c = s.charCodeAt(i);\r
    const isCJK = (c >= 0x3000 && c <= 0x9FFF) || (c >= 0xAC00 && c <= 0xD7AF) ||\r
                  (c >= 0xF900 && c <= 0xFAFF) || (c >= 0xFF01 && c <= 0xFF60);\r
    w += isCJK ? 1.8 : 1;\r
  }\r
  return w;\r
}\r
\r
function calcDelta(original, translated) {\r
  if (!original || !translated) return 0;\r
  const ow = estimateWidth(original);\r
  const tw = estimateWidth(translated);\r
  if (ow === 0) return 0;\r
  return Math.round(((tw - ow) / ow) * 100);\r
}\r
\r
function deltaClass(pct) {\r
  if (pct <= 15) return "ok";\r
  if (pct <= 35) return "warn";\r
  return "danger";\r
}\r
\r
function deltaLabel(pct) {\r
  if (pct === 0) return "=";\r
  return (pct > 0 ? "+" : "") + pct + "%";\r
}\r
\r
/* ================================================================== */\r
/*  Step 1: Translate (store results, show review)                     */\r
/* ================================================================== */\r
$translateBtn.addEventListener("click", async () => {\r
  if (busy) return;\r
  const langs = selectedLangs();\r
  if (!langs.length) { log("Select at least one language", "err"); return; }\r
  if (!framesData.length) { log("Scan a selection first", "err"); return; }\r
  if (provider === "openai" && !$apiKey.value.trim()) { log("Enter OpenAI API key", "err"); return; }\r
\r
  cancelRequested = false;\r
  myMemoryCharsUsed = 0;\r
  canvasApplied = false;\r
  if ($applyBtn) {\r
    $applyBtn.classList.add("hidden");\r
    $applyBtn.disabled = true;\r
  }\r
  $translateBtn.classList.remove("hidden");\r
  setBusy(true);\r
  $cancelBtn.classList.remove("hidden");\r
  $cancelBtn.disabled = false;\r
  $cancelBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Cancel';\r
  $logArea.innerHTML = "";\r
  translatedStore = {};\r
\r
  const steps = langs.length * framesData.length;\r
  let done = 0;\r
\r
  try {\r
    for (let li = 0; li < langs.length; li++) {\r
      if (cancelRequested) throw new Error("Cancelled");\r
      const lang = langs[li];\r
      translatedStore[lang] = [];\r
\r
      for (const frame of framesData) {\r
        if (cancelRequested) throw new Error("Cancelled");\r
        const allChars = frame.texts.map(t => t.characters);\r
        setProgress(Math.round(done / steps * 100), "[" + lang.toUpperCase() + "] \u2026");\r
\r
        const onProg = (cur, tot) => {\r
          const gp = Math.round(((done + cur / tot) / steps) * 100);\r
          setProgress(gp, "[" + lang.toUpperCase() + "] " + Math.round(cur/tot*100) + "%");\r
        };\r
\r
        const translated = provider === "free"\r
          ? await batchFree(allChars, lang, onProg)\r
          : await batchOpenAI(allChars, lang, onProg);\r
\r
        for (let i = 0; i < frame.texts.length; i++) {\r
          const isLocked = shouldSkipTranslation(allChars[i]);\r
          translatedStore[lang].push({\r
            frameId: frame.id,\r
            frameName: frame.name,\r
            path: frame.texts[i].path,\r
            original: allChars[i],\r
            translated: isLocked ? allChars[i] : translated[i],\r
            locked: isLocked,\r
          });\r
        }\r
\r
        done++;\r
        setProgress(Math.round(done / steps * 100), "[" + lang.toUpperCase() + "] \u2713");\r
        await sleep(100);\r
      }\r
    }\r
\r
    setProgress(100, "Done \u2014 review Fit %, then apply");\r
    log("Translation ready. Check Review (Fit %), then use the button below to apply.", "ok");\r
    showReviewPanel(langs);\r
    $translateBtn.classList.add("hidden");\r
    if ($applyBtn) {\r
      $applyBtn.classList.remove("hidden");\r
      $applyBtn.disabled = false;\r
    }\r
  } catch (e) {\r
    if (e.message === "Cancelled") {\r
      log("Translation cancelled by user", "warn");\r
      setProgress(0, "Cancelled");\r
    } else {\r
      log("Error: " + e.message, "err");\r
      setProgress(0, "Error \u2014 see log");\r
    }\r
    translatedStore = {};\r
    $translateBtn.classList.remove("hidden");\r
    if ($applyBtn) {\r
      $applyBtn.classList.add("hidden");\r
      $applyBtn.disabled = true;\r
    }\r
  }\r
\r
  persistCache();\r
  $cancelBtn.classList.add("hidden");\r
  setBusy(false);\r
});\r
\r
/* ================================================================== */\r
/*  Step 2: Apply (create/update frames on canvas)                    */\r
/* ================================================================== */\r
if ($applyBtn) {\r
  $applyBtn.addEventListener("click", async () => {\r
    if (busy) return;\r
    const applyLangs = Object.keys(translatedStore);\r
    if (!applyLangs.length) {\r
      log("Translate first \u2014 nothing to apply", "err");\r
      return;\r
    }\r
    if (!framesData.length) {\r
      log("Scan a selection first", "err");\r
      return;\r
    }\r
    setBusy(true);\r
    $progressSec.classList.remove("hidden");\r
    setProgress(0, "Applying to canvas\u2026");\r
    try {\r
      const multiFrame = framesData.length > 1;\r
      const ops = [];\r
      for (let li = 0; li < applyLangs.length; li++) {\r
        const lang = applyLangs[li];\r
        const items = translatedStore[lang];\r
        const byFrame = {};\r
        items.forEach(item => {\r
          if (!byFrame[item.frameId]) byFrame[item.frameId] = [];\r
          byFrame[item.frameId].push({ path: item.path, text: item.translated });\r
        });\r
        for (const frameId of Object.keys(byFrame)) {\r
          ops.push({ lang, langIndex: li, frameId, translations: byFrame[frameId] });\r
        }\r
      }\r
      for (let i = 0; i < ops.length; i++) {\r
        const op = ops[i];\r
        setProgress(\r
          ops.length ? Math.round((i / ops.length) * 100) : 100,\r
          "Applying " + op.lang.toUpperCase() + "\u2026",\r
        );\r
        parent.postMessage({ pluginMessage: {\r
          type: "create-frame",\r
          frameId: op.frameId,\r
          langCode: op.lang,\r
          langIndex: op.langIndex,\r
          multiFrame: multiFrame,\r
          translations: op.translations,\r
          fitOptions: fitOptionsPayload(),\r
        }}, "*");\r
        await sleep(200);\r
      }\r
      setProgress(100, "Done \u2014 " + ops.length + " frame op(s)");\r
      log(ops.length + " frame(s) created/updated on canvas", "ok");\r
      canvasApplied = true;\r
      updateReviewSummary();\r
    } catch (e) {\r
      log("Apply error: " + e.message, "err");\r
      setProgress(0, "Apply failed");\r
    }\r
    setBusy(false);\r
  });\r
}\r
\r
/* ================================================================== */\r
/*  Review panel: render                                               */\r
/* ================================================================== */\r
function showReviewPanel(langs) {\r
  $reviewSec.classList.remove("hidden");\r
  scrollToEl($reviewSec);\r
\r
  $reviewTabs.innerHTML = "";\r
  langs.forEach((lang, i) => {\r
    const btn = document.createElement("button");\r
    btn.className = "review-tab" + (i === 0 ? " active" : "");\r
    btn.dataset.lang = lang;\r
\r
    const items = translatedStore[lang] || [];\r
    const warns = items.filter(r => calcDelta(r.original, r.translated) > 35).length;\r
    btn.innerHTML = lang.toUpperCase() + (warns ? ' <span class="warn-dot"></span>' : "");\r
\r
    btn.addEventListener("click", () => {\r
      document.querySelectorAll(".review-tab").forEach(t => t.classList.remove("active"));\r
      btn.classList.add("active");\r
      renderReviewRows(lang);\r
    });\r
    $reviewTabs.appendChild(btn);\r
  });\r
\r
  renderReviewRows(langs[0]);\r
}\r
\r
function renderReviewRows(lang) {\r
  activeReviewLang = lang;\r
  const items = translatedStore[lang] || [];\r
  $reviewRows.innerHTML = "";\r
\r
  let okCount = 0, warnCount = 0, dangerCount = 0, lockedCount = 0;\r
\r
  items.forEach((item, idx) => {\r
    const delta = calcDelta(item.original, item.translated);\r
    const cls = item.locked ? "" : deltaClass(delta);\r
\r
    if (item.locked) lockedCount++;\r
    else if (cls === "ok") okCount++;\r
    else if (cls === "warn") warnCount++;\r
    else dangerCount++;\r
\r
    const row = document.createElement("div");\r
    row.className = "review-row" + (cls === "danger" ? " overflow-danger" : cls === "warn" ? " overflow-warn" : "");\r
\r
    row.innerHTML =\r
      '<div class="review-cell review-original" contenteditable="true" data-idx="' + idx + '">' + esc(item.original) + '</div>' +\r
      '<div class="review-cell review-translated" contenteditable="' + (item.locked ? "false" : "true") + '" data-idx="' + idx + '">' +\r
        esc(item.translated) +\r
      '</div>' +\r
      '<div class="review-cell review-delta ' + cls + '">' +\r
        (item.locked ? "&#x1F512;" : deltaLabel(delta)) +\r
      '</div>';\r
\r
    const editCell = row.querySelector(".review-translated");\r
    editCell.addEventListener("blur", () => {\r
      const newText = editCell.textContent.trim();\r
      if (newText && newText !== item.translated) {\r
        item.translated = newText;\r
        const d = calcDelta(item.original, newText);\r
        const dc = deltaClass(d);\r
        row.querySelector(".review-delta").className = "review-cell review-delta " + dc;\r
        row.querySelector(".review-delta").textContent = deltaLabel(d);\r
        row.className = "review-row" + (dc === "danger" ? " overflow-danger" : dc === "warn" ? " overflow-warn" : "");\r
        updateReviewSummary();\r
      }\r
    });\r
\r
    /* ---- Source (EN) edit \u2192 re-translate for all languages ---- */\r
    const srcCell = row.querySelector(".review-original");\r
    srcCell.addEventListener("blur", function() {\r
      const newSrc = srcCell.textContent.trim();\r
      if (!newSrc || newSrc === item.original) return;\r
\r
      const captureLang = activeReviewLang;\r
      srcCell.classList.add("src-syncing");\r
\r
      (async function() {\r
        const allLangs = Object.keys(translatedStore);\r
        for (let li = 0; li < allLangs.length; li++) {\r
          const l = allLangs[li];\r
          const storeItem = translatedStore[l][idx];\r
          if (!storeItem) continue;\r
          storeItem.original = newSrc;\r
          if (storeItem.locked) continue;\r
          try {\r
            const results = provider === "free"\r
              ? await batchFree([newSrc], l, function() {})\r
              : await batchOpenAI([newSrc], l, function() {});\r
            if (results && results[0]) storeItem.translated = results[0];\r
          } catch (_e) { /* keep existing translation on error */ }\r
        }\r
        renderReviewRows(captureLang);\r
      })();\r
    });\r
\r
    $reviewRows.appendChild(row);\r
  });\r
\r
  updateReviewSummary();\r
}\r
\r
function updateReviewSummary() {\r
  if (!activeReviewLang) return;\r
  const items = translatedStore[activeReviewLang] || [];\r
  let ok = 0, warn = 0, danger = 0, locked = 0;\r
  items.forEach(item => {\r
    if (item.locked) { locked++; return; }\r
    const d = calcDelta(item.original, item.translated);\r
    const c = deltaClass(d);\r
    if (c === "ok") ok++;\r
    else if (c === "warn") warn++;\r
    else danger++;\r
  });\r
\r
  const hint = canvasApplied\r
    ? "On canvas \u2014 edit cells &amp; use the same button again to re-apply"\r
    : "Use the primary button below to apply (after Translate finishes it switches to Apply)";\r
  $reviewSummary.innerHTML =\r
    '<div class="stat"><span class="dot-sm" style="background:var(--green)"></span> ' + ok + ' fit</div>' +\r
    (warn ? '<div class="stat"><span class="dot-sm" style="background:var(--yellow)"></span> ' + warn + ' longer</div>' : '') +\r
    (danger ? '<div class="stat"><span class="dot-sm" style="background:var(--red)"></span> ' + danger + ' overflow risk</div>' : '') +\r
    (locked ? '<div class="stat"><span class="dot-sm" style="background:var(--txt3)"></span> ' + locked + ' locked</div>' : '') +\r
    '<div class="stat" style="margin-left:auto;color:var(--txt3)">' + hint + "</div>";\r
}\r
\r
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }\r
\r
/* ================================================================== */\r
/*  Settings persistence                                               */\r
/* ================================================================== */\r
function saveSettings() {\r
  parent.postMessage({ pluginMessage: {\r
    type: "save-settings",\r
    settings: {\r
      provider,\r
      model: $model.value,\r
      langs: selectedLangs(),\r
      lockTerms: $lockTerms.value || "",\r
      smartWrap:     !!($smartWrap     && $smartWrap.checked),\r
      sidePadding:   Number(($sidePadding  && $sidePadding.value)  || 16),\r
      expandFrames:  $expandFrames == null ? true : !!$expandFrames.checked,\r
      autoFontScale: !!($autoFontScale && $autoFontScale.checked),\r
      minFontSize:   Number(($minFontSize  && $minFontSize.value)   || 8),\r
    },\r
  }}, "*");\r
}\r
\r
function applySettings(s) {\r
  if (!s) return;\r
  if (s.provider) {\r
    provider = s.provider;\r
    document.querySelectorAll(".toggle-opt").forEach(b => {\r
      b.classList.toggle("active", b.dataset.provider === provider);\r
    });\r
    $proSettings.classList.toggle("hidden", provider === "free");\r
  }\r
  if (s.model) $model.value = s.model;\r
  if (typeof s.lockTerms    === "string")  $lockTerms.value        = s.lockTerms;\r
  if (typeof s.smartWrap    === "boolean") $smartWrap.checked      = s.smartWrap;\r
  if (typeof s.sidePadding  === "number")  $sidePadding.value      = String(s.sidePadding);\r
  if (typeof s.expandFrames === "boolean" && $expandFrames) {\r
    $expandFrames.checked = s.expandFrames;\r
  }\r
  if (typeof s.autoFontScale === "boolean" && $autoFontScale) {\r
    $autoFontScale.checked = s.autoFontScale;\r
    syncFontScaleUI();\r
  }\r
  if (typeof s.minFontSize  === "number" && $minFontSize) $minFontSize.value = String(s.minFontSize);\r
  if (s.langs) {\r
    document.querySelectorAll(".chip").forEach(chip => {\r
      const cb = chip.querySelector("input");\r
      const on = s.langs.includes(cb.value);\r
      cb.checked = on;\r
      chip.classList.toggle("on", on);\r
    });\r
  }\r
}\r
\r
/* ================================================================== */\r
/*  Messages from Figma                                                */\r
/* ================================================================== */\r
window.onmessage = (e) => {\r
  const msg = e.data.pluginMessage;\r
  if (!msg) return;\r
\r
  if (msg.type === "init-data") {\r
    applySettings(msg.settings);\r
    if (msg.key) $apiKey.value = msg.key;\r
    if (msg.cache && typeof msg.cache === "object") {\r
      cache = msg.cache;\r
      cacheLoaded = true;\r
    }\r
  }\r
\r
  if (msg.type === "key-saved") { /* logged already */ }\r
\r
  if (msg.type === "scanned") {\r
    framesData = msg.frames;\r
    let total = 0;\r
    $previewBox.innerHTML = "";\r
\r
    for (const f of framesData) {\r
      const label = document.createElement("div");\r
      label.className = "frame-label";\r
      label.textContent = f.name + "  (" + f.texts.length + " texts)";\r
      $previewBox.appendChild(label);\r
\r
      for (let i = 0; i < f.texts.length; i++) {\r
        const row = document.createElement("div");\r
        row.className = "text-row";\r
        row.innerHTML = '<span class="num">' + (i + 1) + '</span><span class="val">' + esc(f.texts[i].characters) + '</span>';\r
        $previewBox.appendChild(row);\r
        total++;\r
      }\r
    }\r
\r
    $countBadge.textContent = "(" + total + ")";\r
    $previewSec.classList.remove("hidden");\r
    $emptyState.classList.add("hidden");\r
    $translateBtn.disabled = false;\r
    $translateBtn.classList.remove("hidden");\r
    $reviewSec.classList.add("hidden");\r
    $cancelBtn.classList.add("hidden");\r
    translatedStore = {};\r
    canvasApplied = false;\r
    if ($applyBtn) {\r
      $applyBtn.classList.add("hidden");\r
      $applyBtn.disabled = true;\r
    }\r
    hideRescanWarn();\r
    updateCost();\r
    log("Scanned: " + framesData.length + " frame(s), " + total + " text(s)", "ok", true);\r
    // \u041F\u0440\u043E\u043A\u0440\u0443\u0442\u043A\u0430 \u0442\u0430\u043A, \u0447\u0442\u043E\u0431\u044B \u0431\u043B\u043E\u043A \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u043F\u0440\u0438\u0436\u0430\u043B\u0441\u044F \u043A \u043D\u0438\u0437\u0443 \u0432\u0438\u0434\u0438\u043C\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u043F\u0430\u043D\u0435\u043B\u0438.\r
    setTimeout(function() {\r
      if ($previewSec) {\r
        $previewSec.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });\r
      }\r
    }, 80);\r
  }\r
\r
  if (msg.type === "selection-changed") {\r
    // Show warning only if we have scanned frames and the new selection doesn't match.\r
    if (framesData.length > 0) {\r
      const scannedIds = framesData.map(function(f) { return f.id; }).sort().join(",");\r
      const newIds = (msg.ids || []).slice().sort().join(",");\r
      if (scannedIds !== newIds) {\r
        showRescanWarn();\r
      } else {\r
        hideRescanWarn();\r
      }\r
    }\r
  }\r
\r
  if (msg.type === "error") {\r
    log(msg.text, "err");\r
    setBusy(false);\r
  }\r
\r
  if (msg.type === "sync-reference-ready") {\r
    void (async function() {\r
      try {\r
        /* Fresh run: clear leftover cancel flag and MyMemory budget so Sync\r
           isn't blocked by a previously cancelled/exhausted Translate. */\r
        cancelRequested = false;\r
        myMemoryCharsUsed = 0;\r
        const baseName = msg.baseName;\r
        const texts = msg.texts;\r
        const targets = msg.targets;\r
        const langs = selectedLangs();\r
        const withTarget = langs.filter(function(l) { return targets[l]; });\r
        const steps = withTarget.length > 0 ? withTarget.length : 1;\r
        let done = 0;\r
        let applied = 0;\r
\r
        for (let li = 0; li < langs.length; li++) {\r
          const lang = langs[li];\r
          const targetId = targets[lang];\r
          if (!targetId) {\r
            log("Skip " + lang.toUpperCase() + ": no frame \xAB" + baseName + " [" + lang.toUpperCase() + "]\xBB on page", "warn");\r
            continue;\r
          }\r
\r
          const allChars = texts.map(function(t) { return t.characters; });\r
          const onProg = function(cur, tot) {\r
            const gp = Math.round(((done + cur / tot) / steps) * 100);\r
            setProgress(gp, "Sync " + lang.toUpperCase() + " \u2014 " + Math.round(cur / tot * 100) + "%");\r
          };\r
\r
          let translated;\r
          try {\r
            translated = provider === "free"\r
              ? await batchFree(allChars, lang, onProg)\r
              : await batchOpenAI(allChars, lang, onProg);\r
          } catch (err) {\r
            log("[" + lang.toUpperCase() + "] " + err.message, "err");\r
            done++;\r
            continue;\r
          }\r
\r
          const translations = [];\r
          for (let i = 0; i < texts.length; i++) {\r
            const locked = shouldSkipTranslation(allChars[i]);\r
            translations.push({ path: texts[i].path, text: locked ? allChars[i] : translated[i] });\r
          }\r
\r
          const fo = fitOptionsPayload();\r
          parent.postMessage({ pluginMessage: {\r
            type: "sync-reference-apply",\r
            targetFrameId: targetId,\r
            langCode: lang,\r
            translations: translations,\r
            fitOptions: {\r
              smartWrap:     fo.smartWrap,\r
              sidePadding:   fo.sidePadding,\r
              expandFrames:  fo.expandFrames,\r
              autoFontScale: fo.autoFontScale,\r
              minFontSize:   fo.minFontSize,\r
            },\r
          }}, "*");\r
\r
          applied++;\r
          done++;\r
          await sleep(180);\r
        }\r
\r
        if (applied === 0) {\r
          log("No matching frames on page. Names must be \xAB" + baseName + " [ES]\xBB, etc.", "err");\r
        } else {\r
          log("Sent " + applied + " update(s) to Figma", "info");\r
        }\r
        setProgress(100, "Done");\r
      } finally {\r
        setBusy(false);\r
      }\r
    })();\r
  }\r
\r
  if (msg.type === "sync-reference-done") {\r
    let s = msg.fail\r
      ? "[\u21BB " + msg.langCode.toUpperCase() + "] " + msg.ok + " ok, " + msg.fail + " skipped"\r
      : "[\u21BB " + msg.langCode.toUpperCase() + "] " + msg.ok + " texts updated";\r
    if (msg.err) s += " \u2014 " + msg.err;\r
    else if (msg.framesExpanded > 0) s += " \xB7 " + msg.framesExpanded + " frame(s) enlarged";\r
    log(s, msg.fail || msg.err ? "warn" : "info");\r
  }\r
\r
  if (msg.type === "frame-done") {\r
    let s = msg.fail\r
      ? "[" + msg.langCode.toUpperCase() + "] " + msg.ok + " ok, " + msg.fail + " skipped"\r
      : "[" + msg.langCode.toUpperCase() + "] " + msg.ok + " texts applied";\r
    if (!msg.fail && msg.framesExpanded > 0) s += " \xB7 " + msg.framesExpanded + " frame(s) enlarged";\r
    log(s, msg.fail ? "warn" : "info");\r
  }\r
\r
  if (msg.type === "frame-error") {\r
    log("[" + msg.langCode.toUpperCase() + "] " + msg.text, "err");\r
  }\r
};\r
\r
/* ================================================================== */\r
/*  Init                                                               */\r
/* ================================================================== */\r
parent.postMessage({ pluginMessage: { type: "init" } }, "*");\r
<\/script>\r
</body>\r
</html>\r
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
    return name.replace(/\s+\[[A-Za-z]{2}(?:-[A-Za-z]{2})?\]\s*$/, "").trim();
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
