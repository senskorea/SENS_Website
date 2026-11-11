const byId = id => document.getElementById(id);
const viewer = byId("viewer");
const stage = byId("stage");
const slide = byId("slide");
const previous = byId("previous");
const next = byId("next");
const fullscreen = byId("fullscreen");
const demo = byId("demo");
const status = byId("status");
const koreanSlide = byId("korean-slide");
const language = byId("language");
const prefKey = "sens-uncommon-language";
const languageFromUrl = () => new URL(location.href).searchParams.get("lang");
function rememberedLanguage() {
  try { return localStorage.getItem(prefKey); } catch { return null; }
}

async function start() {
  const response = await fetch("./slides.json");
  if (!response.ok) throw new Error("Slide list unavailable");
  const slides = await response.json();
  if (!slides.length) throw new Error("Slide list empty");
  let korean = null;
  try {
    const result = await fetch("./korean-slides.json");
    if (result.ok) {
      const translated = await result.json();
      if (Array.isArray(translated) && translated.length === slides.length &&
          translated.every((item, i) => item.position === i + 1 && item.html && item.label)) korean = translated;
    }
  } catch { /* The original deck remains usable. */ }
  let lang = korean && (languageFromUrl() ?? rememberedLanguage()) === "ko" ? "ko" : "en";
  byId("language-control").hidden = !korean;
  const fromHash = () => {
    const match = /^#slide-([1-9][0-9]*)$/.exec(location.hash);
    return match ? Math.min(slides.length - 1, Number(match[1]) - 1) : 0;
  };
  let index = fromHash();
  let touchStart;

  function render() {
    const item = slides[index];
    const ko = lang === "ko";
    viewer.dataset.lang = lang;
    document.documentElement.lang = lang;
    language.value = lang;
    slide.hidden = ko;
    koreanSlide.hidden = !ko;
    byId("download").textContent = ko ? "영문 PDF 다운로드" : "Download PDF";
    byId("language-label").textContent = ko ? "덱 언어" : "Deck language";
    byId("controls").setAttribute("aria-label", ko ? "슬라이드 탐색" : "Presentation controls");
    previous.setAttribute("aria-label", ko ? "이전 슬라이드" : "Previous slide");
    next.setAttribute("aria-label", ko ? "다음 슬라이드" : "Next slide");
    demo.textContent = ko ? "데모 체험 ↗" : "Try the demo ↗";
    updateFullscreenLabel();
    if (ko) {
      const translation = korean[index];
      const heading = document.createElement("h2");
      heading.textContent = translation.label;
      heading.hidden = index === 0;
      const body = document.createElement("template");
      body.innerHTML = translation.html; // First-party, versioned Korean slide markup.
      koreanSlide.dataset.slide = String(index + 1);
      koreanSlide.replaceChildren(heading, body.content);
      byId("caption").textContent = translation.label;
    } else {
      slide.src = item.image;
      slide.alt = item.description;
      byId("caption").textContent = item.title;
    }
    byId("counter").textContent = `${index + 1} / ${slides.length}`;
    previous.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    demo.hidden = index !== slides.length - 1;
    if (!ko && index + 1 < slides.length) new Image().src = slides[index + 1].image;
  }
  function updateFullscreenLabel() {
    const active = Boolean(document.fullscreenElement);
    fullscreen.textContent = lang === "ko" ? (active ? "전체 화면 닫기" : "전체 화면")
      : (active ? "Exit fullscreen" : "Fullscreen");
  }
  language.addEventListener("change", () => {
    lang = language.value === "ko" && korean ? "ko" : "en";
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
    try { localStorage.setItem(prefKey, lang); } catch { /* Private browsing. */ }
    render();
  });
  function go(value) {
    const bounded = Math.max(0, Math.min(slides.length - 1, value));
    if (bounded === index) return;
    index = bounded;
    history.replaceState(null, "", `#slide-${index + 1}`);
    render();
  }
  previous.addEventListener("click", () => go(index - 1));
  next.addEventListener("click", () => go(index + 1));
  addEventListener("hashchange", () => { index = fromHash(); render(); });
  addEventListener("keydown", event => {
    if (event.altKey || event.metaKey || event.ctrlKey || event.repeat ||
        event.target.closest("input, textarea, select, [contenteditable]")) return;
    const key = event.key;
    if (key === " " && event.target.closest("a, button")) return;
    const destinations = { ArrowLeft: index - 1, ArrowRight: index + 1,
      PageUp: index - 1, PageDown: index + 1, Home: 0, End: slides.length - 1, " ": index + 1 };
    if (!Object.hasOwn(destinations, key)) return;
    event.preventDefault();
    go(destinations[key]);
  });
  stage.addEventListener("touchstart", event => {
    touchStart = event.touches.length === 1 ? event.touches[0] : null;
  }, { passive: true });
  stage.addEventListener("touchcancel", () => { touchStart = null; });
  stage.addEventListener("touchend", event => {
    if (!touchStart || event.touches.length || event.changedTouches.length !== 1) {
      touchStart = null;
      return;
    }
    const dx = event.changedTouches[0].clientX - touchStart.clientX;
    const dy = event.changedTouches[0].clientY - touchStart.clientY;
    touchStart = null;
    if (Math.abs(dx) >= 48 && Math.abs(dx) > 1.4 * Math.abs(dy)) go(index - Math.sign(dx));
  }, { passive: true });
  slide.addEventListener("error", () => {
    status.classList.remove("sr-only");
    status.textContent = "This slide could not load. The complete PDF is available above.";
  });
  slide.addEventListener("load", () => {
    status.classList.add("sr-only");
    status.textContent = "";
  });
  if (document.fullscreenEnabled && viewer.requestFullscreen) {
    fullscreen.hidden = false;
    fullscreen.addEventListener("click", async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await viewer.requestFullscreen();
      } catch {
        status.classList.remove("sr-only");
        status.textContent = "Fullscreen is unavailable in this browser.";
      }
    });
    document.addEventListener("fullscreenchange", updateFullscreenLabel);
  }
  byId("controls").hidden = false;
  render();
}

start().catch(() => {
  status.classList.remove("sr-only");
  status.textContent = "The viewer could not start. Download the complete PDF above.";
});
