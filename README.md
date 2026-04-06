# Fintech Translator for Figma

Figma plugin for fintech/crypto localization: EN → ES / IT / FR / DE / PT (+ optional KO/ZH/JA in glossary), lock terms, **Review (Fit %)** before **Apply**, and Smart Fit on the canvas so translated UI does not break.

## Preview

| | |
|--|--|
| **TODO** | Add a short screen recording (GIF/WebM) or 2–3 screenshots: Scan → Review with Fit % → Apply. Replace this table in a PR. |

*People install Figma plugins faster when they see the UI first — drop files into `docs/` and link them here.*

## Features

- **Languages:** English source → Spanish, Italian, French, German, Portuguese (and extended glossary entries for KO/ZH/JA where defined).
- **Engines:** **Free** (Google Translate + MyMemory fallback) · **Pro** (OpenAI + key).
- **Glossary:** Fintech / crowdlending / crypto vocabulary; **exact + case-insensitive + longest substring** match in Free mode (e.g. `P2P lending` inside `P2P lending platform`). Pro still gets glossary in the prompt.
- **Flow:** **Scan** → **Translate** → **Review & edit** (Fit delta %) → primary button switches to **Apply to canvas** → optional re-apply after edits. New run: **Scan** again.
- **Smart Fit:** wrap, padding, grow frames on overflow, optional auto font scale (see `src/code.ts`).
- **Multi-frame:** several scanned frames → translated clones stack **below**; single frame → clones to the **right**.
- **Cache & settings** in `clientStorage`.

## Repository layout

```text
figma-fintech-translate/
├── manifest.json          # points at dist/ (build output)
├── build.mjs
├── package.json
├── src/
│   ├── code.ts            # Figma sandbox
│   ├── ui.html            # Plugin UI (copied to dist/)
│   └── glossary-lookup.mjs # Shared glossary logic → dist/glossary-lookup.js
└── dist/                  # Generated — not committed; run npm run build
```

## Install (development)

```bash
npm install
npm run build
npm test    # recommended locally; same as CI when enabled
```

In **Figma Desktop:** **Plugins** → **Development** → **Import plugin from manifest…** → choose **`manifest.json`**.

After pulling changes, run `npm run build` again so `dist/` includes `glossary-lookup.js`, `code.js`, and `ui.html`.

## Releases & zip files

- **Do not commit** `dist/`, `*.zip`, or other build artifacts to `main`.
- For teammates who do not use Git, attach a **zip of the repo** (without `node_modules`) to **[GitHub Releases](https://github.com/afloy011-spec/figma-fintech-translate/releases)** after `npm run build`, or ask them to clone and build locally.
- Russian step-by-step: see **[INSTALL.md](./INSTALL.md)**.

## Usage (short)

1. Select frame(s) with text → open the plugin.
2. **Scan Selection** → **Translate** → check **Review** (red/yellow Fit % = longer strings).
3. **Apply to canvas** → clones like `Frame [ES]`.
4. Edit cells in Review if needed → **Apply to canvas** again.

## Free vs Pro

| | Free | Pro |
|---|-----|-----|
| Key | No | OpenAI `sk-…` |
| Glossary | Map + substring match + prompt (Pro only for LLM) | In prompt + same map |
| Limits | Public endpoints; MyMemory uses a **session-only** char budget in the UI (resets when the plugin reloads), not a real daily quota from the API | Per OpenAI billing |

## Testing & CI

- **Unit tests:** `npm test` — glossary resolution (`src/glossary-lookup.mjs`) and Fit % heuristic (mirrors `ui.html`).
- **GitHub Actions:** copy [`docs/ci-workflow.yml`](./docs/ci-workflow.yml) to `.github/workflows/ci.yml` and commit (first time you may need to add the file in the GitHub UI if your token lacks the `workflow` scope). Then every push/PR runs `npm ci` → `npm test` → `npm run build`.
- **Not covered yet:** Figma sandbox (`code.ts`) smart-fit — would need API mocks or harness; glossary/Fit logic is where regressions hurt most today.

## Compatibility

- Plugin UI: avoid optional chaining / nullish coalescing in **inline** `ui.html` script where older WebViews break; `code.ts` is compiled to ES2017.

## Security

- OpenAI key: `clientStorage` only; never commit keys or paste them in screenshots.

## Troubleshooting

| Issue | Try |
|-------|-----|
| Plugin error on open | Run `npm run build`; ensure `dist/glossary-lookup.js` exists next to `dist/ui.html`. |
| `Failed to fetch` | Check `manifest.json` `networkAccess` and corporate proxy/VPN. |
| Wrong frames updated | Selection changed after scan → **Scan Selection** again. |
| UI script error | First red line in the plugin console; avoid `?.` / `??` in `ui.html` inline script. |

## Roadmap (prioritized)

1. **Quality:** Figma-side smart-fit regression tests (mock `TextNode` / frames) or snapshot tests for `applySmartFit` branches.
2. **Product:** Translation memory export/import; optional “always horizontal / vertical” clone placement.
3. **Platform:** Publish to Figma Community when stable; keep Releases for private teams.
4. **Glossary:** UI editor for custom rows (today: edit source + rebuild).

---

**Repository:** [github.com/afloy011-spec/figma-fintech-translate](https://github.com/afloy011-spec/figma-fintech-translate)
