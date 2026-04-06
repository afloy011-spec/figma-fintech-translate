# Установка Fintech Translator (Figma)

## Требования

- **Figma Desktop** (меню *Plugins* → *Development*).
- **Node.js 18+** ([nodejs.org](https://nodejs.org)) — для сборки `dist/code.js`.

## Шаги

1. Распакуйте архив в любую папку, например `C:\Tools\figma-fintech-translate`.

2. Откройте терминал в этой папке:

   ```bash
   npm install
   npm run build
   ```

   Должна появиться папка **`dist/`** (`code.js`, `ui.html`, `glossary-lookup.js`).

3. В Figma: **Plugins** → **Development** → **Import plugin from manifest…**

4. Выберите файл **`manifest.json`** в корне проекта.

5. Запуск: **Plugins** → **Development** → **Fintech Translator**.

После изменений в коде снова выполните `npm run build` и при необходимости переимпортируйте плагин.

## Первый запуск

Выделите фрейм(ы) с текстом → откройте плагин → **Scan Selection** → **Translate** → проверьте **Review** → **Apply to canvas**.

Бесплатный перевод без ключа; для **OpenAI** нужен ключ в настройках плагина (режим Pro).

## Передать коллеге без Git

- Достаточно архива **исходников** (без `node_modules`): после распаковки коллега выполняет `npm install` и `npm run build`.
- Готовые **релизные zip** лучше выкладывать в **[GitHub Releases](https://github.com/afloy011-spec/figma-fintech-translate/releases)** — не храните большие `.zip` артефакты в истории репозитория.

## Кратко для команды (EN)

- **Figma Desktop** + **Node 18+**.
- `git clone` → `npm install` → `npm run build` → импорт **`manifest.json`** из корня.
- Ключ OpenAI только для Pro; Free работает без ключа.
- Конфиденциальность: ключ в `clientStorage`, не коммитить, не светить на скриншотах.
