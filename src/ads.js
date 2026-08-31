var DB = window.DB || {};

DB.AD_INTERVAL = 2;
DB.adBreakCount = 0;

// --- Native AdMob (only active inside the Capacitor app, never in a plain browser/PWA) ---
// TODO: replace with real ad unit IDs once AdMob approves them (see PROJECT_STATUS.md).
// These are Google's official public test IDs - safe to ship, always serve a test ad, never real revenue.
DB.ADMOB_INTERSTITIAL_ID = "ca-app-pub-3940256099942544/1033173712";
DB.ADMOB_BANNER_ID = "ca-app-pub-3940256099942544/6300978111";

DB.isNativeApp = function () {
  return !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
};

DB.nativeAdMobInit = null;
DB.initNativeAdMob = function () {
  if (!DB.isNativeApp()) return Promise.resolve(false);
  if (!DB.nativeAdMobInit) {
    DB.nativeAdMobInit = window.Capacitor.Plugins.AdMob.initialize()
      .then(function () { return true; })
      .catch(function (err) { console.warn("AdMob init failed", err); return false; });
  }
  return DB.nativeAdMobInit;
};

DB.AD_CREATIVES = [
  { emoji: "🧩", titleKey: "ad.c1.title", bodyKey: "ad.c1.body", bg: "linear-gradient(135deg,#7c3aed,#ec4899)" },
  { emoji: "🎮", titleKey: "ad.c2.title", bodyKey: "ad.c2.body", bg: "linear-gradient(135deg,#14b8a6,#3b82f6)" },
  { emoji: "🌟", titleKey: "ad.c3.title", bodyKey: "ad.c3.body", bg: "linear-gradient(135deg,#f59e0b,#ef4444)" },
  { emoji: "☕", titleKey: "ad.c4.title", bodyKey: "ad.c4.body", bg: "linear-gradient(135deg,#16a34a,#0d9488)" }
];

DB.renderAdBreak = function (onDone) {
  if (DB.isNativeApp()) {
    DB.renderNativeInterstitial(onDone);
    return;
  }

  var creative = DB.AD_CREATIVES[DB.adBreakCount % DB.AD_CREATIVES.length];
  DB.adBreakCount++;
  var seconds = 4;

  DB.appRoot.innerHTML =
    '<div class="header"><div class="brand">Daily <span>BrainClub</span></div>' + DB.homeBtn() + '</div>' +
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

// Shows a real native AdMob interstitial between puzzles. Never blocks the
// player: if the ad fails to load/show, we just continue immediately.
DB.renderNativeInterstitial = function (onDone) {
  DB.appRoot.innerHTML =
    '<div class="header"><div class="brand">Daily <span>BrainClub</span></div>' + DB.homeBtn() + '</div>' +
    '<div class="card center"><p class="muted">' + DB.t("ad.hint") + '</p></div>';

  var AdMob = window.Capacitor.Plugins.AdMob;
  var done = false;
  var listeners = [];

  function finish() {
    if (done) return;
    done = true;
    listeners.forEach(function (l) { l.remove(); });
    onDone();
  }

  function on(eventName, handler) {
    var p = AdMob.addListener(eventName, handler);
    listeners.push({ remove: function () { p.then(function (h) { h.remove(); }); } });
  }

  // Safety net: never let a broken ad SDK soft-lock the daily mission.
  var safetyTimer = setTimeout(finish, 8000);
  var wrappedFinish = function () { clearTimeout(safetyTimer); finish(); };

  on("interstitialAdDismissed", wrappedFinish);
  on("interstitialAdFailedToShow", wrappedFinish);
  on("interstitialAdFailedToLoad", wrappedFinish);
  on("interstitialAdLoaded", function () {
    AdMob.showInterstitial().catch(wrappedFinish);
  });

  DB.initNativeAdMob().then(function () {
    return AdMob.prepareInterstitial({ adId: DB.ADMOB_INTERSTITIAL_ID });
  }).catch(wrappedFinish);
};

DB.adBannerIndex = 0;

DB.renderAdBannerContent = function () {
  var el = document.getElementById("adBanner");
  if (!el) return;
  var creative = DB.AD_CREATIVES[DB.adBannerIndex % DB.AD_CREATIVES.length];
  DB.adBannerIndex++;
  el.style.background = creative.bg;
  el.innerHTML =
    '<span class="ad-banner-label">' + DB.t("ad.label") + '</span>' +
    '<span class="ad-banner-emoji">' + creative.emoji + '</span>' +
    '<span class="ad-banner-title">' + DB.t(creative.titleKey) + '</span>';
};

DB.initAdBanner = function () {
  if (DB.isNativeApp()) {
    // The native banner is a real OS-level view drawn by AdMob itself - the
    // DOM placeholder underneath must stay hidden so they don't overlap.
    var el = document.getElementById("adBanner");
    if (el) el.style.display = "none";
    DB.initNativeAdMob().then(function () {
      return window.Capacitor.Plugins.AdMob.showBanner({
        adId: DB.ADMOB_BANNER_ID,
        adSize: "ADAPTIVE_BANNER",
        position: "BOTTOM_CENTER",
        margin: 0
      });
    }).catch(function (err) { console.warn("Native banner failed", err); });
    return;
  }

  DB.renderAdBannerContent();
  setInterval(DB.renderAdBannerContent, 8000);
};

window.DB = DB;
