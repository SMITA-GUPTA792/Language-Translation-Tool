# 🌐 LinguaSwap

A fast, browser-based language translator. No sign-up, no backend, no build step — open one file and start translating.

LinguaSwap opens to a **home page** first. Click **Start Translating** to enter the translator, and click the logo any time to come back.

---

## ✨ Features

- **Instant translation** between 60+ languages, powered by Google's translation endpoint
- **Text-to-speech** for both the source text and the translation, with a browser-voice fallback if a language pack isn't installed
- **One-click swap** to flip source/target language and text
- **Copy to clipboard** for the translated text
- **Translation history** (last 8), saved locally in your browser and restorable with one click
- **Character counter** with a warning near the 5,000-character limit
- **Keyboard shortcut** — `Ctrl` / `Cmd` + `Enter` to translate instantly
- Fully responsive, dark-themed UI — works the same on desktop and mobile
- Zero dependencies, zero installs — just HTML, CSS, and JavaScript

---

## 📁 Project structure

```
LinguaSwap/
├── index.html              # Markup for the home page + translator
├── style.css               # All styling (dark theme, gradients, responsive layout)
├── script.js              # Language list, translation logic, TTS, history, view switching
├── logo.png               # App logo used in header/home screen
├── Screenshot-home.png    # Preview image of the home page
└── README.md              # This fileDME.md      # This file
```

---

## 🚀 Getting started

1. Download or clone this folder so all three files (`index.html`, `style.css`, `script.js`) sit **next to each other**.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).
3. You'll land on the home page first — click **Start Translating** to open the translator.

No server, no `npm install`, no API key required. An internet connection is needed since translation and voice audio are fetched live.

> **Tip:** if the page looks unstyled (plain black text, no layout), it usually means `style.css` or `script.js` isn't in the same folder as `index.html`, or the file was opened through an online HTML viewer that ignores relative file links. Opening the local `index.html` directly in your browser avoids both issues.

---

## 🖱️ How to use

1. From the home page, click **Start Translating**.
2. Pick a **source language** and a **target language** from the two dropdowns.
3. Type or paste text into the **Source Text** box (up to 5,000 characters).
4. Click **Translate**, or press `Ctrl`/`Cmd` + `Enter`.
5. Use the 🔊 icons to hear either box read aloud, 📋 to copy the translation, or ⇄ to swap languages and text.
6. Past translations appear under **Recent Translations** — click one to restore it, or **Clear all** to wipe history.
7. Click the **LinguaSwap logo** in the header at any time to return to the home page.

---

## 🌍 Supported languages (64)

Afrikaans, Amharic, Arabic, Armenian, Azerbaijani, Bengali, Bulgarian, Burmese, Catalan, Chinese (Simplified), Chinese (Traditional), Croatian, Czech, Danish, Dutch, English, Estonian, Filipino, Finnish, French, Georgian, German, Greek, Gujarati, Hebrew, Hindi, Hungarian, Icelandic, Indonesian, Italian, Japanese, Kannada, Kazakh, Khmer, Korean, Latvian, Lithuanian, Malay, Malayalam, Marathi, Mongolian, Nepali, Norwegian, Persian, Polish, Portuguese, Punjabi, Romanian, Russian, Serbian, Sinhala, Slovak, Slovenian, Spanish, Swahili, Swedish, Tamil, Telugu, Thai, Turkish, Ukrainian, Urdu, Vietnamese, Zulu

Want another language added? Open `script.js`, find the `LANGUAGES` array near the top, and add a new line in the same format:

```js
{ code: "xx", tts: "xx-XX", name: "Language Name" },
```

- `code` — the translation language code
- `tts` — the speech locale code (used for both text-to-speech sources)
- `name` — the label shown in the dropdown

---

## 🔊 How text-to-speech works

LinguaSwap tries Google's speech endpoint first, fetching the audio as a file in the background so it plays reliably whether the page is opened locally or from a server. If that fails — for example, on a flaky connection — it falls back to your browser's built-in voices. If your device doesn't have a voice pack for that language installed, you'll see a short message instead of audio.

---

## 🛠️ Built with

Plain HTML, CSS, and JavaScript — no frameworks, no bundlers, no dependencies. Translation and speech audio are fetched from Google's public translation endpoints at request time.

---

## 📄 License

Free to use, modify, and share.
