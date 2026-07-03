<a id="top"></a>

# Fintech Translator for Figma

*Scan frames, translate, review copy fit, apply to the canvas — Free (Google) or Pro (OpenAI).*

<p>
  <a href="https://www.figma.com/community"><img src="https://img.shields.io/badge/Figma-Plugin-F24E1E?style=flat-square&logo=figma&logoColor=white" alt="Figma plugin"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-%E2%89%A518-24292f?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js 18+"></a>
  <a href="https://github.com/afloy011-spec/figma-fintech-translate/actions/workflows/ci.yml"><img src="https://github.com/afloy011-spec/figma-fintech-translate/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
</p>

**Scope:** fintech / crypto UI — **EN** → 12 languages: ES · IT · FR · DE · **PT** · **PT-BR** · PL · EL · TR · KO · ZH · JA. Lock brands, check **Fit %** in Review, then **Apply**; Smart Fit adjusts layout on canvas.

> [!NOTE]
> **`PT` vs `PT-BR`:** `PT` is **European Portuguese** (mapped to `pt-PT`; e.g. `withdrawal` → *levantamento*) and `PT-BR` is **Brazilian Portuguese** (`pt-BR`; `withdrawal` → *saque*). They ship as separate chips with separate glossaries. `KO` / `ZH` / `JA` carry the largest glossaries; `PL` / `EL` / `TR` are translated via the API without a dedicated glossary.

<table style="border-collapse:separate;border-spacing:10px;width:100%;max-width:720px;table-layout:fixed;margin:20px 0 8px 0;">
  <tbody>
    <tr>
      <td style="width:25%;text-align:center;vertical-align:middle;border:1px solid #d0d7de;border-radius:8px;padding:12px 6px;background:#f6f8fa;"><a href="#installation"><strong>Installation</strong></a></td>
      <td style="width:25%;text-align:center;vertical-align:middle;border:1px solid #d0d7de;border-radius:8px;padding:12px 6px;background:#f6f8fa;"><a href="#usage"><strong>Quick start</strong></a></td>
      <td style="width:25%;text-align:center;vertical-align:middle;border:1px solid #d0d7de;border-radius:8px;padding:12px 6px;background:#f6f8fa;"><a href="https://github.com/afloy011-spec/figma-fintech-translate/releases"><strong>Releases</strong></a></td>
      <td style="width:25%;text-align:center;vertical-align:middle;border:1px solid #d0d7de;border-radius:8px;padding:12px 6px;background:#f6f8fa;"><a href="https://github.com/afloy011-spec/figma-fintech-translate/archive/refs/heads/main.zip"><strong>Source ZIP</strong></a></td>
    </tr>
  </tbody>
</table>

## Preview

OpenAI (**Pro**) and Google Translate (**Free**) — plugin UI.

<table style="border-collapse:collapse;width:100%;table-layout:fixed;margin:8px 0;">
  <thead>
    <tr>
      <th style="width:50%;text-align:center;padding:10px 8px;border-bottom:1px solid #30363d;">OpenAI (Pro) — key &amp; model</th>
      <th style="width:50%;text-align:center;padding:10px 8px;border-bottom:1px solid #30363d;">Google Translate (Free) — languages &amp; Scan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align:top;padding:12px 8px;text-align:center;">
        <img src="https://raw.githubusercontent.com/afloy011-spec/figma-fintech-translate/main/docs/screenshots/ui-pro-openai.png" alt="Fintech Translator: OpenAI Pro mode, API key, GPT model" width="100%" style="max-width:560px; border-radius:10px; border:1px solid #30363d; display:block; margin:0 auto;">
      </td>
      <td style="vertical-align:top;padding:12px 8px;text-align:center;">
        <img src="https://raw.githubusercontent.com/afloy011-spec/figma-fintech-translate/main/docs/screenshots/ui-free-scan.png" alt="Fintech Translator: Free mode, target languages, Scan Selection" width="100%" style="max-width:560px; border-radius:10px; border:1px solid #30363d; display:block; margin:0 auto;">
      </td>
    </tr>
  </tbody>
</table>

<p align="right"><a href="#top">↑ Back to top</a></p>

## Table of contents

- [Features](#features)
- [Repository layout](#repository-layout)
- [Installation](#installation)
- [Usage](#usage)
- [Free vs Pro](#free-vs-pro)
- [Testing & CI](#testing--ci)
- [Compatibility](#compatibility)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)

## Features

- **Engines:** **Free** (Google Translate + MyMemory fallback) · **Pro** (OpenAI + your key).
- **Glossary:** fintech / crowdlending / crypto map + **exact, case-insensitive, longest substring** match in Free mode (e.g. `P2P lending` inside `P2P lending platform`). Pro also gets glossary in the prompt.
- **Flow:** **Scan** → **Translate** → **Review** (Fit % deltas) → main button becomes **Apply to canvas** → re-apply after edits. New language batch: **Scan** again.
- **Smart Fit:** wrap, padding, grow frames, optional auto font scale (`src/code.ts`).
- **Multi-frame:** multiple scanned frames → clones **below**; single frame → clones **to the right**.
- **Cache & settings** in Figma `clientStorage`.

<p align="right"><a href="#top">↑ Back to top</a></p>

## Repository layout

```text
figma-fintech-translate/
├── manifest.json           # main: dist/code.js, ui: dist/ui.html
├── build.mjs               # esbuild: bundles + inlines the modules below into ui.html
├── package.json
├── CHANGELOG.md
├── src/
│   ├── code.ts             # Figma main-thread: scan, clone, smart-fit
│   ├── ui.html             # UI + translation flow (glossary/text-format inlined at build)
│   ├── glossary-lookup.mjs # glossaryResolve (exact / case-insensitive / whole-word substring)
│   ├── glossary-data.mjs   # GLOSSARY, COURSE_GLOSSARY, LANG_NAMES
│   ├── text-format.mjs     # case/punctuation/whitespace mirroring, date-era detection
│   └── style-map.mjs       # per-character style remapping (shared with code.ts)
├── test/                   # node unit tests (no Figma runtime)
├── dist/                   # gitignored — npm run build
└── docs/
    ├── ci-workflow.yml     # copy → .github/workflows/ci.yml to enable Actions
    └── screenshots/
```

## Installation

> [!IMPORTANT]
> **`dist/` is not in git.** After clone or ZIP download you must run **`npm install`** and **`npm run build`** before importing the plugin in Figma.

<table style="width:100%; border-collapse:collapse;">
  <thead>
    <tr>
      <th style="text-align:left; padding:8px; width:34%; border-bottom:1px solid #30363d;">Option</th>
      <th style="text-align:left; padding:8px; border-bottom:1px solid #30363d;">Steps</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align:top; padding:10px 8px;"><strong>A. Git clone</strong></td>
      <td style="vertical-align:top; padding:10px 8px;">
        <code>git clone https://github.com/afloy011-spec/figma-fintech-translate.git</code><br>
        <code>cd figma-fintech-translate</code><br>
        <code>npm install && npm run build</code>
      </td>
    </tr>
    <tr>
      <td style="vertical-align:top; padding:10px 8px;"><strong>B. Download ZIP</strong></td>
      <td style="vertical-align:top; padding:10px 8px;">
        Use the green <strong>Download source</strong> button above (or Releases). Unzip, then in the folder: <code>npm install && npm run build</code>.
      </td>
    </tr>
  </tbody>
</table>

1. **Figma Desktop** → **Plugins** → **Development** → **Import plugin from manifest…**
2. Select **`manifest.json`** in the project root.
3. Run **Plugins → Development → Fintech Translator** (name from manifest).

Russian walkthrough: **[INSTALL.md](./INSTALL.md)**.

> [!NOTE]
> Prebuilt zips for non-developers belong in **[GitHub Releases](https://github.com/afloy011-spec/figma-fintech-translate/releases)** (run `npm run build` before zipping). Do not commit `dist/` or large `.zip` files to `main`.

<p align="right"><a href="#top">↑ Back to top</a></p>

## Usage

1. Select frame(s) with text → open the plugin.
2. **Scan Selection** → **Translate** → check **Review** (yellow/red **Fit %** = longer copy vs source).
3. **Apply to canvas** → frames like `Name [ES]`.
4. Edit Review cells if needed → **Apply to canvas** again.

<p align="right"><a href="#top">↑ Back to top</a></p>

## Free vs Pro

<table style="width:100%; border-collapse:collapse;">
  <thead>
    <tr>
      <th style="text-align:left; padding:8px; width:22%; border-bottom:1px solid #30363d;"></th>
      <th style="text-align:center; padding:8px; width:39%; border-bottom:1px solid #30363d;">Free</th>
      <th style="text-align:center; padding:8px; width:39%; border-bottom:1px solid #30363d;">Pro</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:8px; border-bottom:1px solid #21262d;"><strong>API key</strong></td>
      <td style="text-align:center; padding:8px; border-bottom:1px solid #21262d;">Not required</td>
      <td style="text-align:center; padding:8px; border-bottom:1px solid #21262d;">OpenAI <code>sk-…</code></td>
    </tr>
    <tr>
      <td style="padding:8px; border-bottom:1px solid #21262d;"><strong>Glossary</strong></td>
      <td style="text-align:center; padding:8px; border-bottom:1px solid #21262d;">Map + substring match</td>
      <td style="text-align:center; padding:8px; border-bottom:1px solid #21262d;">Prompt + same map</td>
    </tr>
    <tr>
      <td style="padding:8px;"><strong>Limits</strong></td>
      <td style="text-align:center; padding:8px;">Public endpoints; MyMemory uses a <strong>session-only</strong> char budget in the UI (resets when the plugin reloads)</td>
      <td style="text-align:center; padding:8px;">Per your OpenAI plan</td>
    </tr>
  </tbody>
</table>

> [!WARNING]
> **Free tier is unofficial and best-effort.** It calls Google Translate's undocumented web endpoint (`translate.googleapis.com/translate_a/single?client=gtx`) with **MyMemory** as a fallback (session budget ~4.5k chars; anonymous MyMemory allows roughly ~5k chars/day). These are not official APIs — Google can rate-limit, change, or block them **without notice**, and MyMemory may reject once the daily quota is hit. Use Free for drafts and Fit % estimation; for reliable, higher-volume, glossary-faithful output use **Pro** (OpenAI, your own key).

## Testing & CI

- **Tests:** `npm test` — glossary lookup, Fit % heuristic, glossary key-parity across languages, text-formatting helpers, and per-character style mapping.
- **CI:** copy [`docs/ci-workflow.yml`](./docs/ci-workflow.yml) to `.github/workflows/ci.yml` (GitHub UI works if your token lacks the `workflow` OAuth scope). Then: `npm ci` → `npm test` → `npm run build` on each push/PR.
- **Not covered:** Figma sandbox smart-fit (`code.ts`) without a harness.

<p align="right"><a href="#top">↑ Back to top</a></p>

## Compatibility

Plugin UI avoids **optional chaining** / **nullish coalescing** in the inline `ui.html` script where older WebViews break. `code.ts` targets **ES2017** via esbuild.

## Security

> [!IMPORTANT]
> OpenAI keys live in **Figma `clientStorage`** only and are sent to **OpenAI** in Pro mode. Never commit keys or show them in screenshots.

## Troubleshooting

<p style="margin:0 0 12px 0;color:#656d76;font-size:14px;line-height:1.5;">Most issues are a missing build or a blocked network call — quick checks below.</p>

<table style="border-collapse:collapse;width:100%;table-layout:fixed;margin:8px 0;">
  <thead>
    <tr>
      <th style="border:1px solid #d0d7de;background:#f6f8fa;padding:10px 12px;text-align:left;font-weight:600;width:50%;">What you see</th>
      <th style="border:1px solid #d0d7de;background:#f6f8fa;padding:10px 12px;text-align:left;font-weight:600;width:50%;">What to try</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border:1px solid #d0d7de;background:#ffffff;padding:10px 12px;vertical-align:top;font-weight:600;">Plugin won’t open / error on launch</td>
      <td style="border:1px solid #d0d7de;background:#ffffff;padding:10px 12px;vertical-align:top;line-height:1.55;word-wrap:break-word;">Run <code>npm run build</code> — you should have <code>dist/glossary-lookup.js</code>, <code>dist/code.js</code>, and <code>dist/ui.html</code>.</td>
    </tr>
    <tr>
      <td style="border:1px solid #d0d7de;background:#f6f8fa;padding:10px 12px;vertical-align:top;font-weight:600;"><code style="background:transparent;">Failed to fetch</code></td>
      <td style="border:1px solid #d0d7de;background:#f6f8fa;padding:10px 12px;vertical-align:top;line-height:1.55;word-wrap:break-word;">Check <code>manifest.json</code> → <code>networkAccess</code>; try without VPN/proxy or adjust firewall.</td>
    </tr>
    <tr>
      <td style="border:1px solid #d0d7de;background:#ffffff;padding:10px 12px;vertical-align:top;font-weight:600;">Wrong frames updated</td>
      <td style="border:1px solid #d0d7de;background:#ffffff;padding:10px 12px;vertical-align:top;line-height:1.55;word-wrap:break-word;">Selection changed after your last scan → run <strong>Scan Selection</strong> again.</td>
    </tr>
    <tr>
      <td style="border:1px solid #d0d7de;background:#f6f8fa;padding:10px 12px;vertical-align:top;font-weight:600;">UI script error</td>
      <td style="border:1px solid #d0d7de;background:#f6f8fa;padding:10px 12px;vertical-align:top;line-height:1.55;word-wrap:break-word;">Plugin console — first red stack line. Avoid <code>?.</code> / <code>??</code> in inline <code>ui.html</code> (older WebViews).</td>
    </tr>
  </tbody>
</table>

## Roadmap

<p style="margin:0 0 12px 0;color:#656d76;font-size:14px;line-height:1.5;">Rough priorities — <strong>Releases</strong> and <strong>Issues</strong> stay the source of truth.</p>

<table style="border-collapse:collapse;width:100%;table-layout:fixed;margin:8px 0;">
  <thead>
    <tr>
      <th style="border:1px solid #d0d7de;background:#f6f8fa;padding:10px 12px;text-align:left;font-weight:600;width:50%;">Priority</th>
      <th style="border:1px solid #d0d7de;background:#f6f8fa;padding:10px 12px;text-align:left;font-weight:600;width:50%;">Direction</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border:1px solid #d0d7de;background:#ffffff;padding:10px 12px;vertical-align:top;">
        <span style="display:inline-block;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:0.02em;background:#ffebe9;color:#a40e26;border:1px solid #ffb3ad;">P1</span>
      </td>
      <td style="border:1px solid #d0d7de;background:#ffffff;padding:10px 12px;vertical-align:top;line-height:1.55;word-wrap:break-word;">Regression tests / harness for <code>code.ts</code> smart-fit (mock text + frames).</td>
    </tr>
    <tr>
      <td style="border:1px solid #d0d7de;background:#f6f8fa;padding:10px 12px;vertical-align:top;">
        <span style="display:inline-block;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:0.02em;background:#fff8c5;color:#9a6700;border:1px solid #e8d96a;">P2</span>
      </td>
      <td style="border:1px solid #d0d7de;background:#f6f8fa;padding:10px 12px;vertical-align:top;line-height:1.55;word-wrap:break-word;">Translation memory export/import; optional clone placement presets (always horizontal / vertical).</td>
    </tr>
    <tr>
      <td style="border:1px solid #d0d7de;background:#ffffff;padding:10px 12px;vertical-align:top;">
        <span style="display:inline-block;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:0.02em;background:#ddf4ff;color:#0969da;border:1px solid #79c0ff;">P3</span>
      </td>
      <td style="border:1px solid #d0d7de;background:#ffffff;padding:10px 12px;vertical-align:top;line-height:1.55;word-wrap:break-word;">Figma Community publish when stable; keep Releases for teams.</td>
    </tr>
    <tr>
      <td style="border:1px solid #d0d7de;background:#f6f8fa;padding:10px 12px;vertical-align:top;">
        <span style="display:inline-block;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:0.02em;background:#f6f8fa;color:#57606a;border:1px solid #d0d7de;">P4</span>
      </td>
      <td style="border:1px solid #d0d7de;background:#f6f8fa;padding:10px 12px;vertical-align:top;line-height:1.55;word-wrap:break-word;">In-plugin glossary editor (today: edit source + <code>npm run build</code>).</td>
    </tr>
  </tbody>
</table>

<p align="right"><a href="#top">↑ Back to top</a></p>

---

**Repository:** [github.com/afloy011-spec/figma-fintech-translate](https://github.com/afloy011-spec/figma-fintech-translate)
