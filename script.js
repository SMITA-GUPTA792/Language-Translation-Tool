// =========================================
//   LinguaSwap — script.js (FINAL FIX)
//   TTS: fetch-as-blob method (works on
//   file://, localhost, and live servers)
// =========================================

const LANGUAGES = [
  { code: "en",  tts: "en-US",  name: "English" },
  { code: "hi",  tts: "hi-IN",  name: "Hindi" },
  { code: "es",  tts: "es-ES",  name: "Spanish" },
  { code: "fr",  tts: "fr-FR",  name: "French" },
  { code: "de",  tts: "de-DE",  name: "German" },
  { code: "it",  tts: "it-IT",  name: "Italian" },
  { code: "pt",  tts: "pt-PT",  name: "Portuguese" },
  { code: "ru",  tts: "ru-RU",  name: "Russian" },
  { code: "ja",  tts: "ja-JP",  name: "Japanese" },
  { code: "zh",  tts: "zh-CN",  name: "Chinese (Simplified)" },
  { code: "zh-TW", tts: "zh-TW", name: "Chinese (Traditional)" },
  { code: "ko",  tts: "ko-KR",  name: "Korean" },
  { code: "ar",  tts: "ar-SA",  name: "Arabic" },
  { code: "bn",  tts: "bn-IN",  name: "Bengali" },
  { code: "tr",  tts: "tr-TR",  name: "Turkish" },
  { code: "nl",  tts: "nl-NL",  name: "Dutch" },
  { code: "pl",  tts: "pl-PL",  name: "Polish" },
  { code: "sv",  tts: "sv-SE",  name: "Swedish" },
  { code: "da",  tts: "da-DK",  name: "Danish" },
  { code: "fi",  tts: "fi-FI",  name: "Finnish" },
  { code: "no",  tts: "nb-NO",  name: "Norwegian" },
  { code: "id",  tts: "id-ID",  name: "Indonesian" },
  { code: "ms",  tts: "ms-MY",  name: "Malay" },
  { code: "th",  tts: "th-TH",  name: "Thai" },
  { code: "vi",  tts: "vi-VN",  name: "Vietnamese" },
  { code: "uk",  tts: "uk-UA",  name: "Ukrainian" },
  { code: "cs",  tts: "cs-CZ",  name: "Czech" },
  { code: "sk",  tts: "sk-SK",  name: "Slovak" },
  { code: "ro",  tts: "ro-RO",  name: "Romanian" },
  { code: "hu",  tts: "hu-HU",  name: "Hungarian" },
  { code: "bg",  tts: "bg-BG",  name: "Bulgarian" },
  { code: "hr",  tts: "hr-HR",  name: "Croatian" },
  { code: "sr",  tts: "sr-RS",  name: "Serbian" },
  { code: "sl",  tts: "sl-SI",  name: "Slovenian" },
  { code: "lt",  tts: "lt-LT",  name: "Lithuanian" },
  { code: "lv",  tts: "lv-LV",  name: "Latvian" },
  { code: "et",  tts: "et-EE",  name: "Estonian" },
  { code: "el",  tts: "el-GR",  name: "Greek" },
  { code: "he",  tts: "he-IL",  name: "Hebrew" },
  { code: "fa",  tts: "fa-IR",  name: "Persian" },
  { code: "ur",  tts: "ur-PK",  name: "Urdu" },
  { code: "ta",  tts: "ta-IN",  name: "Tamil" },
  { code: "te",  tts: "te-IN",  name: "Telugu" },
  { code: "ml",  tts: "ml-IN",  name: "Malayalam" },
  { code: "kn",  tts: "kn-IN",  name: "Kannada" },
  { code: "gu",  tts: "gu-IN",  name: "Gujarati" },
  { code: "pa",  tts: "pa-IN",  name: "Punjabi" },
  { code: "mr",  tts: "mr-IN",  name: "Marathi" },
  { code: "ne",  tts: "ne-NP",  name: "Nepali" },
  { code: "si",  tts: "si-LK",  name: "Sinhala" },
  { code: "my",  tts: "my-MM",  name: "Burmese" },
  { code: "km",  tts: "km-KH",  name: "Khmer" },
  { code: "sw",  tts: "sw-KE",  name: "Swahili" },
  { code: "am",  tts: "am-ET",  name: "Amharic" },
  { code: "af",  tts: "af-ZA",  name: "Afrikaans" },
  { code: "zu",  tts: "zu-ZA",  name: "Zulu" },
  { code: "tl",  tts: "fil-PH", name: "Filipino" },
  { code: "ca",  tts: "ca-ES",  name: "Catalan" },
  { code: "is",  tts: "is-IS",  name: "Icelandic" },
  { code: "mn",  tts: "mn-MN",  name: "Mongolian" },
  { code: "ka",  tts: "ka-GE",  name: "Georgian" },
  { code: "hy",  tts: "hy-AM",  name: "Armenian" },
  { code: "az",  tts: "az-AZ",  name: "Azerbaijani" },
  { code: "kk",  tts: "kk-KZ",  name: "Kazakh" },
];

// ── DOM refs
const homeView       = document.getElementById("homeView");
const appView        = document.getElementById("appView");
const startBtn       = document.getElementById("startBtn");
const logoHome       = document.getElementById("logoHome");
const sourceLangEl   = document.getElementById("sourceLang");
const targetLangEl   = document.getElementById("targetLang");
const sourceTextEl   = document.getElementById("sourceText");
const translatedEl   = document.getElementById("translatedText");
const loadingEl      = document.getElementById("loadingSpinner");
const charCountEl    = document.getElementById("charCount");
const toastEl        = document.getElementById("toast");
const historySection = document.getElementById("historySection");
const historyListEl  = document.getElementById("historyList");
const translateBtn   = document.getElementById("translateBtn");
const charWrap       = charCountEl.parentElement;

let historyData  = JSON.parse(localStorage.getItem("ls_history") || "[]");
let currentAudio = null;

// ── Populate dropdowns
function populateLanguages() {
  const sorted = [...LANGUAGES].sort((a, b) => a.name.localeCompare(b.name));
  sorted.forEach(lang => {
    [sourceLangEl, targetLangEl].forEach(sel => {
      const opt = document.createElement("option");
      opt.value = lang.code;
      opt.textContent = lang.name;
      sel.appendChild(opt);
    });
  });
  sourceLangEl.value = "en";
  targetLangEl.value = "hi";
}

// ── Character counter
sourceTextEl.addEventListener("input", () => {
  const len = sourceTextEl.value.length;
  charCountEl.textContent = len;
  charWrap.classList.toggle("warn", len > 4500);
});

// ── TRANSLATE
async function translate() {
  const text = sourceTextEl.value.trim();
  if (!text) { showToast("Please enter some text first.", "warn"); return; }

  const src = sourceLangEl.value;
  const tgt = targetLangEl.value;
  if (src === tgt) { showToast("Source and target are the same.", "warn"); return; }

  setLoading(true);
  try {
    const url =
      "https://translate.googleapis.com/translate_a/single" +
      "?client=gtx&sl=" + src + "&tl=" + tgt + "&dt=t" +
      "&q=" + encodeURIComponent(text);

    const res = await fetch(url);
    if (!res.ok) throw new Error("Network error " + res.status);

    const data = await res.json();
    let translated = "";
    if (data && data[0]) {
      data[0].forEach(part => { if (part && part[0]) translated += part[0]; });
    }
    if (!translated) throw new Error("Empty response");

    translatedEl.textContent = translated;
    translatedEl.classList.add("has-text");
    saveHistory(text, translated, src, tgt);

  } catch (err) {
    translatedEl.innerHTML =
      '<span style="color:#ff6b7a;">❌ Translation failed: ' + err.message +
      '. Check your internet connection.</span>';
  } finally {
    setLoading(false);
  }
}

function setLoading(on) {
  translateBtn.disabled = on;
  loadingEl.classList.toggle("hidden", !on);
  if (on) { translatedEl.innerHTML = ""; translatedEl.classList.remove("has-text"); }
}

// ── Swap
document.getElementById("swapBtn").addEventListener("click", () => {
  const tmp = sourceLangEl.value;
  sourceLangEl.value = targetLangEl.value;
  targetLangEl.value = tmp;

  const srcText = sourceTextEl.value;
  const tgtText = translatedEl.classList.contains("has-text")
    ? translatedEl.textContent.trim() : "";

  if (tgtText) {
    sourceTextEl.value = tgtText;
    charCountEl.textContent = tgtText.length;
    if (srcText) {
      translatedEl.textContent = srcText;
    } else {
      translatedEl.innerHTML = '<span class="placeholder-text">Translation will appear here…</span>';
      translatedEl.classList.remove("has-text");
    }
  }
});

// ── Clear
document.getElementById("clearBtn").addEventListener("click", () => {
  sourceTextEl.value = "";
  charCountEl.textContent = "0";
  charWrap.classList.remove("warn");
  translatedEl.innerHTML = '<span class="placeholder-text">Translation will appear here…</span>';
  translatedEl.classList.remove("has-text");
  stopAudio();
  sourceTextEl.focus();
});

// ── Copy
document.getElementById("copyBtn").addEventListener("click", async () => {
  const txt = translatedEl.textContent.trim();
  if (!txt || translatedEl.querySelector(".placeholder-text")) {
    showToast("Nothing to copy yet.", "warn"); return;
  }
  try {
    await navigator.clipboard.writeText(txt);
    showToast("Copied to clipboard!");
  } catch {
    const ta = document.createElement("textarea");
    ta.value = txt;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    showToast("Copied!");
  }
});

// ══════════════════════════════════════════════════════════════
//   TEXT-TO-SPEECH  —  FINAL FIX
//
//   PROBLEM 1: Browser Web Speech API needs OS voice packs.
//              Hindi/Bengali/Tamil not installed on most PCs
//              → "voice not available" error.
//
//   PROBLEM 2: new Audio(googleTtsUrl).play() gets blocked
//              when page is opened from file:// (your PC)
//              because Google's server rejects it.
//
//   SOLUTION:  Use fetch() to download the audio as a Blob,
//              then create a local object URL and play that.
//              fetch() sends the right headers so Google
//              accepts the request, and the blob URL is
//              always local so the browser plays it freely.
// ══════════════════════════════════════════════════════════════

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = "";
    currentAudio = null;
  }
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  document.querySelectorAll(".icon-btn.speaking")
    .forEach(b => b.classList.remove("speaking"));
}

async function speak(text, langCode, btnEl) {
  if (!text || !text.trim()) {
    showToast("Nothing to speak.", "warn"); return;
  }

  stopAudio();
  if (btnEl) btnEl.classList.add("speaking");

  // Google TTS supports ~200 chars per call
  const chunk = text.trim().slice(0, 200);
  const ttsUrl =
    "https://translate.googleapis.com/translate_tts" +
    "?ie=UTF-8" +
    "&q="      + encodeURIComponent(chunk) +
    "&tl="     + langCode +
    "&client=gtx" +
    "&ttsspeed=0.9";

  try {
    // ✅ FETCH AS BLOB — works on file://, localhost, and live servers
    const response = await fetch(ttsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
          "AppleWebKit/537.36 (KHTML, like Gecko) " +
          "Chrome/124.0.0.0 Safari/537.36",
        "Referer": "https://translate.google.com/",
      },
    });

    if (!response.ok) throw new Error("TTS fetch failed: " + response.status);

    const blob     = await response.blob();
    const blobUrl  = URL.createObjectURL(blob);
    const audio    = new Audio(blobUrl);
    currentAudio   = audio;

    audio.onended = () => {
      if (btnEl) btnEl.classList.remove("speaking");
      URL.revokeObjectURL(blobUrl);
      currentAudio = null;
    };

    audio.onerror = () => {
      if (btnEl) btnEl.classList.remove("speaking");
      URL.revokeObjectURL(blobUrl);
      currentAudio = null;
      showToast("Audio playback failed. Check your volume/browser.", "warn");
    };

    await audio.play();

  } catch (err) {
    if (btnEl) btnEl.classList.remove("speaking");
    console.warn("Google TTS failed:", err.message);
    // Last resort: browser Web Speech API
    speakFallback(text, langCode, btnEl);
  }
}

// ── Fallback: browser Web Speech API
function getVoicesAsync() {
  return new Promise(resolve => {
    const v = window.speechSynthesis.getVoices();
    if (v.length) return resolve(v);
    window.speechSynthesis.onvoiceschanged = () =>
      resolve(window.speechSynthesis.getVoices());
  });
}

async function speakFallback(text, langCode, btnEl) {
  if (!window.speechSynthesis) {
    showToast("Speech not supported in this browser.", "warn"); return;
  }
  const found   = LANGUAGES.find(l => l.code === langCode);
  const ttsCode = found ? found.tts : langCode;

  const voices = await getVoicesAsync();
  const match  =
    voices.find(v => v.lang === ttsCode) ||
    voices.find(v => v.lang.startsWith(langCode)) ||
    voices.find(v => v.lang.startsWith(ttsCode.split("-")[0]));

  if (!match) {
    showToast(
      "No " + (found ? found.name : langCode) +
      " voice installed on your device. Try Chrome on Android or a live server.",
      "warn"
    );
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = match;
  utterance.lang  = match.lang;
  utterance.rate  = 0.88;

  if (btnEl) {
    btnEl.classList.add("speaking");
    utterance.onend   = () => btnEl.classList.remove("speaking");
    utterance.onerror = () => btnEl.classList.remove("speaking");
  }
  window.speechSynthesis.speak(utterance);
}

// ── Speak source
document.getElementById("speakSourceBtn").addEventListener("click", function () {
  const text = sourceTextEl.value.trim();
  if (!text) { showToast("No source text to speak.", "warn"); return; }
  speak(text, sourceLangEl.value, this);
});

// ── Speak translation
document.getElementById("speakTargetBtn").addEventListener("click", function () {
  const text = translatedEl.textContent.trim();
  if (!text || translatedEl.querySelector(".placeholder-text")) {
    showToast("Translate something first.", "warn"); return;
  }
  speak(text, targetLangEl.value, this);
});

// ── Toast
let toastTimer;
function showToast(msg, type = "success") {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.style.background =
    type === "warn"  ? "var(--warn)"   :
    type === "error" ? "var(--danger)" : "var(--success)";
  toastEl.classList.remove("hidden", "fade-out");
  toastTimer = setTimeout(() => {
    toastEl.classList.add("fade-out");
    setTimeout(() => toastEl.classList.add("hidden"), 380);
  }, 3000);
}

// ── History
function saveHistory(src, tgt, srcLang, tgtLang) {
  historyData.unshift({
    src, tgt,
    srcName: getLangName(srcLang),
    tgtName: getLangName(tgtLang),
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    srcLang, tgtLang,
  });
  if (historyData.length > 8) historyData.pop();
  localStorage.setItem("ls_history", JSON.stringify(historyData));
  renderHistory();
}

function renderHistory() {
  historyListEl.innerHTML = "";
  historyData.forEach((e, i) => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.title = "Click to restore";
    div.innerHTML =
      '<div class="history-meta">' +
        '<span class="history-badge">' + esc(e.srcName) + ' → ' + esc(e.tgtName) + '</span>' +
        '<span class="history-time">' + esc(e.time) + '</span>' +
      '</div>' +
      '<div class="history-pair">' +
        '<span class="history-source">' + esc(e.src) + '</span>' +
        '<span class="history-arrow">→</span>' +
        '<span class="history-target">' + esc(e.tgt) + '</span>' +
      '</div>';
    div.addEventListener("click", () => restoreHistory(i));
    historyListEl.appendChild(div);
  });
  historySection.style.display = historyData.length ? "flex" : "none";
}

function restoreHistory(i) {
  const e = historyData[i];
  sourceLangEl.value = e.srcLang;
  targetLangEl.value = e.tgtLang;
  sourceTextEl.value = e.src;
  charCountEl.textContent = e.src.length;
  translatedEl.textContent = e.tgt;
  translatedEl.classList.add("has-text");
}

function getLangName(code) {
  return LANGUAGES.find(l => l.code === code)?.name || code;
}
function esc(str) {
  const d = document.createElement("div");
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

// ── Ctrl+Enter shortcut
sourceTextEl.addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") translate();
});

document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  historyData = [];
  localStorage.removeItem("ls_history");
  renderHistory();
});

translateBtn.addEventListener("click", translate);

// ── View switching (Home ⇄ Translator)
function showApp() {
  homeView.classList.add("hidden");
  appView.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "instant" });
  sourceTextEl.focus();
}
function showHome() {
  appView.classList.add("hidden");
  homeView.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "instant" });
}
startBtn.addEventListener("click", showApp);
logoHome.addEventListener("click", showHome);
logoHome.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showHome(); }
});

// ── Init
populateLanguages();
renderHistory();
