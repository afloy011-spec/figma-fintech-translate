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

   Должна обновиться папка **`dist/`** (`code.js`, `ui.html`).

3. В Figma: **Plugins** → **Development** → **Import plugin from manifest…**

4. Выберите файл **`manifest.json`** в корне проекта.

5. Запуск: **Plugins** → **Development** → **Fintech Translator**.

После изменений в коде снова выполните `npm run build` и при необходимости переимпортируйте плагин.

## Первый запуск

Выделите фрейм(ы) с текстом → откройте плагин → **Scan Selection** → **Translate** → **Apply to Frames**.

Бесплатный перевод без ключа; для **OpenAI** нужен ключ в настройках плагина (режим Pro).

## Подробнее для команды

См. файл **`COLLEAGUES.md`** в этой же папке.
