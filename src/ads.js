var DB = window.DB || {};

DB.AD_INTERVAL = 2;
DB.adBreakCount = 0;

// --- Native AdMob (only active inside the Capacitor app, never in a plain browser/PWA) ---
// Real ad unit IDs from Florence's AdMob account (app: Daily BrainClub,
// ca-app-pub-9403666503824494~2411928928). Requires the matching real
// App ID to be compiled into the native app's strings.xml - see PROJECT_STATUS.md.
DB.ADMOB_INTERSTITIAL_ID = "ca-app-pub-9403666503824494/9754984908";
DB.ADMOB_BANNER_ID = "ca-app-pub-9403666503824494/8717235408";

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
  var wasHidden = false;

  function finish() {
    if (done) return;
    done = true;
    clearTimeout(loadTimer);
    clearTimeout(watchdogTimer);
    listeners.forEach(function (l) { l.remove(); });
    document.removeEventListener("visibilitychange", onVisibilityChange);
    onDone();
  }

  function on(eventName, handler) {
    // addListener's return value isn't reliably a Promise across Capacitor/
    // plugin versions - sometimes it's the handle itself, synchronously.
    // Promise.resolve() normalizes both shapes so .then() always works.
    var p = AdMob.addListener(eventName, handler);
    listeners.push({ remove: function () { Promise.resolve(p).then(function (h) { h.remove(); }); } });
  }

  // The interstitial covers our WebView with its own native screen, which
  // pauses the page (document.visibilityState -> "hidden"). Once the player
  // closes the ad and we come back to "visible", that's a reliable, SDK-
  // version-independent signal that the ad is gone - regardless of whether
  // the plugin's own "dismissed" event fires correctly on this device.
  function onVisibilityChange() {
    if (document.visibilityState === "hidden") {
      wasHidden = true;
    } else if (document.visibilityState === "visible" && wasHidden) {
      finish();
    }
  }
  document.addEventListener("visibilitychange", onVisibilityChange);

  // Only guards the *loading* phase - if nothing happens within 8s of asking
  // for an ad, skip it. Once the ad is actually showing, this is cleared, so
  // a real ad being legitimately on screen for a while never gets cut off.
  var loadTimer = setTimeout(finish, 8000);
  // Last-resort watchdog once the ad is up, in case both the plugin event
  // AND the visibility signal somehow fail to fire.
  var watchdogTimer = null;

  on("interstitialAdDismissed", finish);
  on("interstitialAdFailedToShow", finish);
  on("interstitialAdFailedToLoad", finish);
  on("interstitialAdLoaded", function () {
    clearTimeout(loadTimer);
    watchdogTimer = setTimeout(finish, 45000);
    AdMob.showInterstitial().catch(finish);
  });

  DB.initNativeAdMob().then(function () {
    return AdMob.prepareInterstitial({ adId: DB.ADMOB_INTERSTITIAL_ID });
  }).catch(finish);
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

    var AdMob = window.Capacitor.Plugins.AdMob;
    // The native banner's real height varies per device/ad (adaptive
    // banners resize to fit). Rather than guess a fixed CSS clearance,
    // ask AdMob for the actual displayed height and reserve exactly that
    // much space (plus a little breathing room) above it.
    AdMob.addListener("bannerAdSizeChanged", function (size) {
      // A hidden/removed/failed banner reports height 0 - ignore that and
      // keep the CSS fallback rather than collapsing the clearance to 0.
      if (size && size.height > 0) {
        document.documentElement.style.setProperty("--ad-clearance", (size.height + 20) + "px");
      }
    });

    DB.initNativeAdMob().then(function () {
      return AdMob.showBanner({
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
