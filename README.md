# Fintech Translator for Figma

Advanced Figma plugin for fintech/crypto localization with:
- multi-language translation,
- domain glossary (Maclear + crypto course terms),
- designer review/edit before apply,
- smart text fitting for better UX/UI layout.

## Features

- EN -> ES / IT / FR / DE / PT translation
- 2 translation engines:
  - `Free`: Google Translate (primary) + MyMemory (fallback)
  - `Pro`: OpenAI API models
- Rich glossary system:
  - fintech terms
  - P2P/crowdlending terms
  - crypto/Web3 terms
  - advanced course vocabulary
- `Do Not Translate` custom lock terms (comma-separated)
- 2-step production flow:
  1. `Translate` (no frame creation yet)
  2. `Review & Edit` (inline editing + overflow signals)
  3. `Apply to Frames`
- Review QA panel:
  - per-language tabs
  - fit delta (`+%`) per string
  - warning indicators for potentially long translations
- Smart UI fitting:
  - `Smart wrap by frame width`
  - `Side padding` control (px)
  - keeps text inside frame bounds more predictably
- Translation cache to reduce repeated API calls/cost
- Estimated cost card for Pro mode
- Saved settings between sessions (provider/model/languages/fit options/lock terms)

## Plugin Structure

```text
figma-fintech-translate/
├── manifest.json
├── build.mjs
├── package.json
├── src/
│   ├── code.ts      # Figma sandbox logic (node operations, clone/apply/smart-fit)
│   └── ui.html      # UI + translation logic + glossary + review flow
└── dist/
    ├── code.js
    └── ui.html
```

## Installation (Development)

1. Install dependencies:

```bash
npm install
```

2. Build:

```bash
npm run build
```

3. In Figma Desktop:
   - `Plugins` -> `Development` -> `Import plugin from manifest...`
   - Select `manifest.json` from this folder.

## Usage

1. Select one or more frames in Figma.
2. Open plugin `Fintech Translator`.
3. Choose translation engine:
   - `Google Translate (Free)` or
   - `OpenAI (Pro)` + API key + model.
4. Choose target languages.
5. (Optional) Fill `Do Not Translate` terms.
6. (Optional) Configure `Smart Fit`:
   - toggle wrap,
   - side padding in px.
7. Click `Scan Selection`.
8. Click `Translate`.
9. In `Review & Edit`, adjust any translated strings inline.
10. Click `Apply to Frames`.

Result: cloned frames per language (`[ES]`, `[IT]`, etc.) with reviewed text applied.

## Free vs Pro

### Free
- No API key required.
- Uses Google Translate endpoint with MyMemory fallback.
- Glossary exact-match support.
- Best for quick drafts and no-cost localization passes.

### Pro (OpenAI)
- Requires API key (`sk-...`).
- Better contextual translation quality.
- Full glossary prompt injection + exact-match optimization.
- Recommended for production text quality.

## Glossary System

Plugin merges two dictionaries per language:
- core finance + product glossary,
- crypto course/advanced terminology.

Also supports user-defined lock terms via `Do Not Translate`.

## Smart Fit Logic

When enabled:
- translated text is wrapped more predictably,
- width is constrained to original text width,
- for non-auto-layout parent frames, text is kept inside frame with side paddings.

This reduces common UI breakage from longer localized strings.

## Security Notes

- API key is stored in Figma `clientStorage` (local to user/plugin).
- Key is only sent to OpenAI in Pro mode.
- Do not share keys/screenshots containing keys.

For stricter security, use a backend proxy instead of direct API from plugin UI.

## Troubleshooting

- `An error occurred while running this plugin`:
  - open `Show/Hide console` in plugin,
  - check first red error line,
  - rebuild plugin and relaunch.

- `Failed to fetch`:
  - verify network access in `manifest.json`,
  - check internet/proxy restrictions,
  - verify provider endpoint availability.

- No texts found:
  - ensure a frame is selected,
  - ensure selected frame contains `TEXT` nodes.

- Wrong key format:
  - OpenAI key must start with `sk-`.

## Commands

```bash
npm run build
npm run watch
```

## Current Limitations

- Free engine depends on public translation endpoints (stability can vary).
- Glossary in Free mode is exact-match oriented (not full phrase NLP enforcement).
- Large files with thousands of text nodes may require multiple passes.

## Suggested Roadmap

- Phrase-level glossary enforcement for Free mode
- Retry/backoff handling for transient API errors
- Overflow auto-fix presets (`shorten`, `CTA compact`, `legal strict`)
- Export/import Translation Memory JSON
- Optional proxy mode for enterprise security

---

If you want, this README can be split into:
- user-facing (`README.md`),
- technical (`README.dev.md`),
- release notes (`CHANGELOG.md`).
