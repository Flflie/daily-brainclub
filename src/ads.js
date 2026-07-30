var DB = window.DB || {};

DB.AD_INTERVAL = 2;
DB.adBreakCount = 0;

DB.AD_CREATIVES = [
  { emoji: "🧩", titleKey: "ad.c1.title", bodyKey: "ad.c1.body", bg: "linear-gradient(135deg,#7c3aed,#ec4899)" },
  { emoji: "🎮", titleKey: "ad.c2.title", bodyKey: "ad.c2.body", bg: "linear-gradient(135deg,#14b8a6,#3b82f6)" },
  { emoji: "🌟", titleKey: "ad.c3.title", bodyKey: "ad.c3.body", bg: "linear-gradient(135deg,#f59e0b,#ef4444)" },
  { emoji: "☕", titleKey: "ad.c4.title", bodyKey: "ad.c4.body", bg: "linear-gradient(135deg,#16a34a,#0d9488)" }
];

DB.renderAdBreak = function (onDone) {
  var creative = DB.AD_CREATIVES[DB.adBreakCount % DB.AD_CREATIVES.length];
  DB.adBreakCount++;
  var seconds = 4;

  DB.appRoot.innerHTML =
    '<div class="header"><div class="brand">Daily <span>Brainclub</span></div></div>' +
    '<div class="ad-card" style="background:' + creative.bg + '">' +
      '<span class="ad-label">' + DB.t("ad.label") + '</span>' +
      '<div class="ad-emoji">' + creative.emoji + '</div>' +
      '<h2>' + DB.t(creative.titleKey) + '</h2>' +
      '<p>' + DB.t(creative.bodyKey) + '</p>' +
    '</div>' +
    '<p class="muted ad-hint">' + DB.t("ad.hint") + '</p>' +
    '<button class="btn secondary" id="adCloseBtn" disabled>' + DB.t("ad.closeIn", { s: seconds }) + '</button>';

  var btn = document.getElementById("adCloseBtn");
  var timer = setInterval(function () {
    seconds--;
    if (seconds <= 0) {
      clearInterval(timer);
      btn.disabled = false;
      btn.textContent = DB.t("ad.close");
    } else {
      btn.textContent = DB.t("ad.closeIn", { s: seconds });
    }
  }, 1000);

  btn.addEventListener("click", function () {
    if (btn.disabled) return;
    clearInterval(timer);
    onDone();
  });
};

window.DB = DB;
