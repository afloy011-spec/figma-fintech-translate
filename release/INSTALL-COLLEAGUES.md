# Maclear Translate — установка без Node.js

Готовый плагин для **Figma Desktop**. Сборка уже внутри архива, `npm install` не нужен.

## Шаги

1. Распакуйте **Maclear-Translate-figma-plugin.zip** в любую папку.
2. Откройте **Figma Desktop** → **Plugins** → **Development** → **Import plugin from manifest…**
3. Выберите **`manifest.json`** из распакованной папки.
4. Запуск: **Plugins** → **Development** → **Maclear Translate**.

## Работа

1. Выделите фрейм(ы) с текстом на макете.
2. В плагине: **Scan Selection** → выберите языки (ES, PL, EL, …) → **Translate**.
3. Проверьте **Review** (Fit %) → **Apply to canvas**.

- **Free** — Google Translate, ключ не нужен.
- **Pro** — OpenAI, введите ключ `sk-…` в настройках плагина.

## Smart Fit

- **Wrap to frame width** — перенос длинного текста внутри карточки.
- **Grow frames when text overflows** — расширяет карточку, если перевод шире (рекомендуется).
- **Auto scale font** — уменьшает шрифт вместо расширения (для жёстких кнопок).

## Обновление

Скачайте новый zip из [GitHub Releases](https://github.com/afloy011-spec/figma-fintech-translate/releases) или из PR, распакуйте поверх старой папки и снова **Import plugin from manifest…**.

## Разработчикам

Исходники: `git clone` → `npm install` → `npm run build` → импорт `manifest.json` из **корня** репозитория (пути `dist/code.js`).
