# Fintech Translator for Figma

Figma plugin for fintech/crypto localization: EN → ES / IT / FR / DE / PT, glossary, review before apply, and smart layout so translated UI doesn’t break.

## Features

- **Languages:** English source → Spanish, Italian, French, German, Portuguese.
- **Engines:**
  - **Free:** Google Translate (primary) + MyMemory (fallback). No API key.
  - **Pro:** OpenAI (`sk-...` key + model).
- **Glossary:** Fintech, crowdlending, crypto/Web3, extended course vocabulary; exact-match in Free mode; prompt + exact-match in Pro.
- **Do not translate:** Comma-separated lock list (brands, tickers, `KYC`, etc.).
- **Flow:** Scan → Translate → **Review & Edit** (tabs, inline edits, Fit delta) → **Apply to Frames**.
- **Smart Fit (canvas):**
  - Wrap to frame width + side padding (`px`).
  - **Auto scale font if overflow** with **min font size**; for chips in auto-layout, font scales **uniformly** per original font size (no random size mix per label).
  - Different behavior for auto-layout parents vs. fixed frames (wrap / scale without trashing button grids).
- **Multi-frame workflow:** If you scan **more than one** frame, translated clones are placed **below each source** (vertical stack per language) so horizontal decks don’t overlap. **One frame** → clones stay **to the right** (classic strip).
- **Selection guard:** After a scan, if you change the selection on the canvas, a yellow banner asks you to **Scan again** so you don’t apply translations to the wrong frames.
- **Cost estimate** (Pro), **translation cache**, **settings + key** in `clientStorage`.

## Plugin structure

```text
figma-fintech-translate/
├── manifest.json
├── build.mjs
├── package.json
├── src/
│   ├── code.ts    # Sandbox: scan, clone, apply, smart-fit, selection events
│   └── ui.html    # UI, APIs, glossary, review, apply batching
└── dist/
    ├── code.js
    └── ui.html
```

## Install (development)

```bash
npm install
npm run build
```

In **Figma Desktop:** `Plugins` → `Development` → `Import plugin from manifest...` → pick `manifest.json`.

Rebuild after changes; for manifest/network changes, re-import the plugin.

## Usage

1. Select one or more frames (with text).
2. Open **Fintech Translator**.
3. Choose **Free** or **Pro** (+ key if Pro).
4. Toggle target languages.
5. Optional: **Do Not Translate**, **Smart Fit** (wrap, padding, auto font scale, min size).
6. **Scan Selection** — wait for preview and counts.
7. If you change the selection later, use **Scan again** when the banner appears.
8. **Translate** → review/edit in **Review & Edit**.
9. **Apply to Frames**.

Clones are named like `Frame name [ES]`, etc.

## Free vs Pro

| | Free | Pro |
|---|-----|-----|
| Key | Not required | `sk-...` OpenAI |
| Quality | Fast drafts | Better context |
| Glossary | Exact match | Prompt + exact match |

## Smart Fit (short)

- **WIDTH_AND_HEIGHT** text in **auto-layout:** optional font scale to fit slot width; no forced multi-line chip mess.
- **Fixed / group parents:** switch to wrapping width + optional height-based font downscale.
- **Multi-frame apply:** `multiFrame` flag from UI stacks clones vertically per frame.

## Compatibility notes

- Plugin UI runs in Figma’s WebView: avoid **optional chaining (`?.`)**, **nullish coalescing (`??`)**, and **object spread** in `ui.html` inline scripts when in doubt; `code.ts` is compiled with esbuild but runtime compatibility is tuned for older engines.
- `figma.showUI` does **not** use `transparent: true` here (not available on all declared API versions).

## Security

- OpenAI key: `clientStorage` only, sent to OpenAI in Pro mode.
- Don’t commit keys; don’t paste keys in screenshots.

## Troubleshooting

| Issue | What to try |
|------|-------------|
| Plugin runtime error | Plugin console → first red line; rebuild; no `?.` / `??` in UI script if error points at `ui.html`. |
| Failed to fetch | `manifest.json` `networkAccess` domains; network/proxy. |
| Translates wrong frames | Selection changed after scan → **Scan again** (banner). |
| Overlapping clones (many frames in one row) | Use latest build: multi-frame uses **below-each** placement. |
| Wrong OpenAI key | Must start with `sk-` (not Chat session tokens). |

## Commands

```bash
npm run build
npm run watch
```

## Limitations

- Free tier depends on public endpoints; behavior can change.
- Very large selections may need splitting.
- Corner/chrome artifacts around the plugin window are limited by Figma’s iframe rendering.

## Roadmap ideas

- Translation memory export/import  
- Retry/backoff for APIs  
- Optional layout mode toggle (always horizontal / always vertical)

---

**Repository:** [github.com/afloy011-spec/figma-fintech-translate](https://github.com/afloy011-spec/figma-fintech-translate)
