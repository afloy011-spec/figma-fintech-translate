# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-07-03

### Added
- Brazilian Portuguese (`pt-br`) with full fintech + crypto-course glossaries, mapped to `pt-BR` for the translation APIs.
- Polish (`pl`), Greek (`el`) and Turkish (`tr`) target languages (translated via API; no dedicated glossary yet).
- GPT-5.5 model family (Nano / Mini / full) with cost estimation in the Pro flow.
- `src/glossary-data.mjs`, `src/text-format.mjs`, `src/style-map.mjs` modules, inlined into the UI / bundled into the plugin at build time.
- Tests: glossary key-parity check plus unit tests for text formatting and per-character style mapping.

### Changed
- Manifest uses `documentAccess: "dynamic-page"`; node lookups are async (`getNodeByIdAsync`, `loadAllPagesAsync`).
- Glossaries, text-formatting helpers and style-mapping logic extracted out of the `ui.html` / `code.ts` monoliths for testability; `build.mjs` now inlines multiple module bundles.

### Fixed
- "Apply to canvas" no longer fails silently under `dynamic-page` access.
- Translating a duplicated frame creates a new language clone instead of overwriting the source (clones are tagged via `setPluginData`).
- Smart Fit: translated text grows/wraps correctly and language clones are re-spaced by their actual size instead of overlapping.
- Whole-word glossary matching prevents false substring hits (e.g. `April` → `TAEil`).
- Removed the naive `glossaryExact` fallback that silently degraded matching when the glossary bundle was missing — it now fails loudly.

### Removed
- Prebuilt release artifacts (`*.zip`, generated `release/*.js|html|manifest.json`) are no longer committed; they are published to GitHub Releases and built locally via `npm run release:zip`.

## [1.0.0]

### Added
- Initial Figma plugin: translate English UI frames to Spanish, Italian, French, German and European Portuguese (with Korean / Chinese / Japanese via glossary), cloning each frame with a `[XX]` language suffix.
- Free tier (Google `gtx` endpoint + MyMemory fallback) and Pro tier (OpenAI) translation providers.
- Company fintech + crypto-course glossary applied before hitting the translation API.
- Smart Fit layout handling and per-character style preservation across text replacement.

[1.2.0]: https://github.com/afloy011-spec/figma-fintech-translate/releases/tag/v1.2.0
[1.0.0]: https://github.com/afloy011-spec/figma-fintech-translate/releases/tag/v1.0.0
