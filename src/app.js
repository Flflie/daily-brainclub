var DB = window.DB || {};

DB.PUZZLE_ORDER = [
  DB.WordSearchPuzzle,
  DB.SudokuPuzzle,
  DB.BlocksPuzzle,
  DB.MemoryPuzzle,
  DB.WordGuessPuzzle,
  DB.MathPuzzle,
  DB.LogicPuzzle
];

DB.COMING_SOON = [];

DB.appRoot = document.getElementById("app");
DB.runState = null;

DB.homeBtn = function () {
  return '<button class="home-btn" data-home aria-label="Home">🏠</button>';
};

DB.formatDate = function () {
  var d = new Date();
  var locale = DB.currentLang() === "en" ? "en-US" : "nl-NL";
  return d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });
};

DB.renderHeader = function (state) {
  var avatarStyle = state.activeAvatar && DB.AVATAR_STYLES[state.activeAvatar];
  var avatarHtml = avatarStyle
    ? '<div class="avatar-badge" style="background:' + avatarStyle.bg + '">' + avatarStyle.emoji + '</div>'
    : "";
  var scene = state.activeBackground && DB.BACKGROUND_SCENES[state.activeBackground];
  var sceneBannerHtml = scene
    ? '<div class="scene-banner" style="background-image:' + DB.svgBackgroundUrl(scene) + '">' +
        '<span class="scene-banner-label">' + DB.L(DB.BACKGROUND_LABELS)[state.activeBackground] + '</span>' +
      '</div>'
    : "";
  var lang = DB.currentLang();
  var colorTheme = state.colorTheme || "auto";
  var settingsPanelHtml =
    '<div class="settings-panel" id="settingsPanel" hidden>' +
      '<div class="settings-row">' +
        '<span>' + DB.t("settings.language") + '</span>' +
        '<div class="settings-lang-switch">' +
          DB.LANGUAGES.map(function (code) {
            return '<button class="lang-opt' + (lang === code ? " active" : "") + '" data-lang="' + code + '">' + code.toUpperCase() + '</button>';
          }).join("") +
        '</div>' +
      '</div>' +
      '<div class="settings-row">' +
        '<span>' + DB.t("settings.colorTheme") + '</span>' +
        '<div class="settings-lang-switch">' +
          '<button class="theme-opt' + (colorTheme === "light" ? " active" : "") + '" data-theme-choice="light">' + DB.t("settings.light") + '</button>' +
          '<button class="theme-opt' + (colorTheme === "dark" ? " active" : "") + '" data-theme-choice="dark">' + DB.t("settings.dark") + '</button>' +
          '<button class="theme-opt' + (colorTheme === "auto" ? " active" : "") + '" data-theme-choice="auto">' + DB.t("settings.system") + '</button>' +
        '</div>' +
      '</div>' +
      (state.firstName
        ? '<div class="settings-row">' +
            '<span>' + DB.t("settings.name") + '</span>' +
            '<button class="link-btn" id="settingsEditName">' + state.firstName + ' · ' + DB.t("settings.editName") + '</button>' +
          '</div>'
        : "") +
      '<div class="settings-row">' +
        '<span>' + DB.t("settings.contact") + '</span>' +
        '<a class="link-btn" href="mailto:waterpixels2@gmail.com">' + DB.t("settings.contactAction") + '</a>' +
      '</div>' +
    '</div>';
  return (
    sceneBannerHtml +
    '<div class="header">' +
      '<div class="header-left">' + avatarHtml + '<div class="brand">Daily <span>BrainClub</span></div></div>' +
      '<div class="header-right">' +
        DB.homeBtn() +
        '<div class="streak-pill">🔥 ' + state.streak + '</div>' +
        '<div class="settings-wrap">' +
          '<button class="settings-toggle" id="settingsBtn" aria-label="Settings">⚙️</button>' +
          settingsPanelHtml +
        '</div>' +
      '</div>' +
    '</div>'
  );
};

DB.renderWelcome = function () {
  DB.lastRender = DB.renderWelcome;
  var state = DB.loadState();

  DB.appRoot.innerHTML =
    DB.renderHeader(state) +
    '<div class="card center">' +
      '<h2>' + DB.t("welcome.title") + '</h2>' +
      '<p class="muted">' + DB.t("welcome.subtitle") + '</p>' +
      '<input class="name-input" type="text" id="firstNameInput" placeholder="' + DB.t("welcome.placeholder") + '" maxlength="30" autocomplete="off" value="' + (state.firstName || "") + '" />' +
      '<button class="btn" id="welcomeStart" style="margin-top:14px">' + DB.t("welcome.start") + '</button>' +
    '</div>';

  DB.bindHeader();
  var input = document.getElementById("firstNameInput");
  input.focus();

  function submitName() {
    var name = input.value.trim();
    if (!name) return;
    var s = DB.loadState();
    s.firstName = name;
    DB.saveState(s);
    DB.renderHome();
  }

  document.getElementById("welcomeStart").addEventListener("click", submitName);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") submitName();
  });
};

DB.renderHome = function () {
  DB.lastRender = DB.renderHome;
  var state = DB.loadState();
  if (!state.firstName) {
    DB.renderWelcome();
    return;
  }
  var playedToday = DB.hasPlayedToday();
  var todayScore = playedToday ? state.history[DB.todayStr()].score : null;

  var puzzleTiles = DB.PUZZLE_ORDER.map(function (p) {
    return '<div class="puzzle-tile practice" data-puzzle="' + p.id + '"><span class="icon">' + p.emoji + '</span>' + DB.puzzleTitle(p.id) + '</div>';
  }).join("");
  var soonTiles = DB.COMING_SOON.map(function (p) {
    return '<div class="puzzle-tile"><span class="icon">' + p.emoji + '</span>' + DB.puzzleTitle(p.id) + '<span class="soon">' + DB.t("home.comingSoon") + '</span></div>';
  }).join("");

  var totalCards = DB.ALBUMS.reduce(function (sum, a) { return sum + a.items.length; }, 0);
  var ownedCardCount = Object.keys(state.ownedCards).length;
  var albumSummary = DB.ALBUMS.map(function (album) {
    var progress = DB.getAlbumProgress(state, album.id);
    var complete = progress.owned === progress.total;
    return '<div class="album-mini' + (complete ? ' complete' : '') + '"><span>' + album.emoji + '</span>' + progress.owned + '/' + progress.total + '</div>';
  }).join("");

  var remainder7 = state.streak % 7;
  var daysUntilWeek = remainder7 === 0 ? 7 : 7 - remainder7;
  var remainder30 = state.streak % 30;
  var daysUntil30 = (remainder30 === 0 && state.streak > 0) ? 30 : 30 - remainder30;
  var daysUntilElite = Math.max(0, 100 - state.streak);

  var milestonesHtml =
    '<div class="milestone-row">' +
      '<div class="milestone-chip">' + DB.t("home.weekBadgeIn", { n: daysUntilWeek, unit: DB.dayWord(daysUntilWeek) }) + '</div>' +
      '<div class="milestone-chip">' + DB.t("home.medalIn", { n: daysUntil30, unit: DB.dayWord(daysUntil30) }) + '</div>' +
      (state.eliteStatus
        ? '<div class="milestone-chip complete">' + DB.t("home.eliteReached") + '</div>'
        : '<div class="milestone-chip">' + DB.t("home.eliteIn", { n: daysUntilElite }) + '</div>') +
    '</div>';

  var latestBg = state.cosmetics.backgrounds[state.cosmetics.backgrounds.length - 1];
  var latestAvatar = state.cosmetics.avatars[state.cosmetics.avatars.length - 1];
  var newBg = latestBg && latestBg !== state.activeBackground;
  var newAvatar = latestAvatar && latestAvatar !== state.activeAvatar;
  var cosmeticNoticeHtml = "";
  if (newBg || newAvatar) {
    var noticeParts = [];
    if (newBg) noticeParts.push(DB.t("home.newBackground", { name: DB.L(DB.BACKGROUND_LABELS)[latestBg] }));
    if (newAvatar) noticeParts.push(DB.t("home.newAvatar", { name: DB.L(DB.AVATAR_LABELS)[latestAvatar] }));
    cosmeticNoticeHtml =
      '<div class="badge-toast" id="cosmeticNotice" style="cursor:pointer">' +
        DB.t("home.cosmeticUnlocked", { parts: noticeParts.join(DB.t("home.and")) }) +
      '</div>';
  }

  var challengeHtml = "";
  if (state.weekChallenge && state.weekChallenge.weekIndex > 0) {
    var wc = state.weekChallenge;
    var pct = Math.min(100, Math.round((wc.bonusCount / wc.target) * 100));
    challengeHtml =
      '<div class="card" style="margin-top:14px">' +
        '<h3>' + DB.t("home.challengeTitle", { n: wc.weekIndex }) + (wc.claimed ? DB.t("home.challengeDoneSuffix") : "") + '</h3>' +
        '<p class="muted">' + DB.cycleItem(DB.L(DB.CHALLENGE_FLAVORS), wc.weekIndex) + '</p>' +
        '<div class="challenge-track"><div class="challenge-track-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="muted">' + Math.min(wc.bonusCount, wc.target) + ' / ' + wc.target + (wc.claimed ? DB.t("home.challengeDoneLine") : '') + '</div>' +
      '</div>';
  }

  DB.appRoot.innerHTML =
    DB.renderHeader(state) +
    cosmeticNoticeHtml +
    '<div class="card">' +
      '<div class="date-line">' + DB.formatDate() + '</div>' +
      '<h2 class="greeting-heading">' + DB.t("home.greeting", { name: state.firstName }) + '</h2>' +
      (playedToday
        ? '<p class="muted">' + DB.t("home.playedToday", { score: todayScore }) + '</p>'
        : '<p class="muted">' + DB.t("home.notPlayedYet", { n: DB.PUZZLE_ORDER.length }) + '</p>') +
      '<div class="puzzle-grid">' + puzzleTiles + soonTiles + '</div>' +
      '<p class="muted practice-hint">' + DB.t("home.practiceHint") + '</p>' +
    '</div>' +
    '<button class="btn" id="startRun" ' + (playedToday ? "disabled" : "") + '>' +
      (playedToday ? DB.t("home.alreadyDone") : DB.t("home.startRun")) +
    '</button>' +
    '<button class="btn secondary" id="mpEntryBtn" style="margin-top:10px">' + DB.t("home.multiplayerBtn") + '</button>' +
    '<button class="btn secondary" id="lbEntryBtn" style="margin-top:10px">' + DB.t("lb.viewBtn") + '</button>' +
    '<div class="card" style="margin-top:14px">' +
      '<h3>' + DB.t("home.milestones") + '</h3>' +
      milestonesHtml +
    '</div>' +
    challengeHtml +
    '<div class="card" style="margin-top:14px" id="albumsEntry">' +
      '<h3>' + DB.t("home.albumsTitle", { owned: ownedCardCount, total: totalCards }) + '</h3>' +
      '<div class="album-mini-row">' + albumSummary + '</div>' +
      '<button class="btn secondary" id="viewAlbumsBtn" style="margin-top:12px">' + DB.t("home.viewAlbums") + '</button>' +
    '</div>' +
    '<div class="card" style="margin-top:14px">' +
      '<h3>' + DB.t("home.stats") + '</h3>' +
      '<div class="muted">' + DB.t("home.totalRuns", { n: state.totalRuns }) + '</div>' +
      '<div class="muted">' + DB.t("home.badgesEarned", { n: state.badges.length ? state.badges.length : DB.t("home.badgesNone") }) + '</div>' +
      '<button class="btn secondary" id="viewAchievementsBtn" style="margin-top:12px">' + DB.t("home.viewAchievements") + '</button>' +
    '</div>';

  DB.bindHeader();
  var startBtn = document.getElementById("startRun");
  if (startBtn && !playedToday) {
    startBtn.addEventListener("click", DB.startRun);
  }
  document.getElementById("viewAlbumsBtn").addEventListener("click", DB.renderAlbums);
  document.getElementById("viewAchievementsBtn").addEventListener("click", DB.renderAchievements);
  document.getElementById("mpEntryBtn").addEventListener("click", DB.renderMultiplayerHome);
  document.getElementById("lbEntryBtn").addEventListener("click", DB.renderLeaderboard);
  var cosmeticNotice = document.getElementById("cosmeticNotice");
  if (cosmeticNotice) {
    cosmeticNotice.addEventListener("click", DB.renderAchievements);
  }
  document.querySelectorAll(".puzzle-tile.practice").forEach(function (el) {
    el.addEventListener("click", function () {
      var id = el.getAttribute("data-puzzle");
      var def = DB.PUZZLE_ORDER.find(function (p) { return p.id === id; });
      if (def) DB.startPractice(def);
    });
  });
};

DB.startPractice = function (puzzleDef) {
  DB.practiceState = { def: puzzleDef, data: puzzleDef.generate(Math.random), abandoning: false, controller: null };
  DB.renderPracticeStep();
};

DB.renderPracticeStep = function () {
  var ps = DB.practiceState;
  ps.abandoning = false;

  DB.appRoot.innerHTML =
    '<div class="header"><div class="brand">Daily <span>BrainClub</span></div><div class="header-right">' + DB.homeBtn() + '<div class="streak-pill">' + ps.def.emoji + ' ' + DB.t("practice.label") + '</div></div></div>' +
    '<div class="card" id="puzzleContainer"></div>' +
    '<button class="btn secondary" id="practiceExit" style="margin-top:12px">' + DB.t("run.backHome") + '</button>';

  var container = document.getElementById("puzzleContainer");
  var finished = false;
  ps.controller = ps.def.mount(container, ps.data, function (result) {
    if (finished) return;
    finished = true;
    if (ps.abandoning) {
      DB.renderHome();
      return;
    }
    DB.renderPracticeResult(ps.def, result);
  });

  document.getElementById("practiceExit").addEventListener("click", function () {
    if (finished) return;
    ps.abandoning = true;
    if (ps.controller && ps.controller.forceFinish) {
      ps.controller.forceFinish();
    } else {
      DB.renderHome();
    }
  });
};

DB.renderPracticeResult = function (def, result) {
  DB.appRoot.innerHTML =
    '<div class="card center">' +
      '<div class="transition-emoji">' + def.emoji + '</div>' +
      '<h2>' + DB.puzzleTitle(def.id) + ' ' + DB.t("run.finished") + '</h2>' +
      '<div class="result-score">' + result.score + '</div>' +
      '<p class="muted">' + result.detail + '</p>' +
      '<button class="btn" id="practiceAgain">' + DB.t("practice.again") + '</button>' +
      '<button class="btn secondary" id="practiceHome" style="margin-top:10px">' + DB.t("run.backHome") + '</button>' +
    '</div>';

  document.getElementById("practiceAgain").addEventListener("click", function () { DB.startPractice(def); });
  document.getElementById("practiceHome").addEventListener("click", DB.renderHome);
};

DB.renderAchievements = function () {
  DB.lastRender = DB.renderAchievements;
  var state = DB.loadState();
  var categories = {};
  var order = ["cat.weekbadges", "cat.trophies", "cat.challenges", "cat.medals", "cat.status", "cat.albums", "cat.other"].map(DB.t);

  state.badges.forEach(function (id) {
    var info = DB.describeBadgeId(id);
    if (!categories[info.category]) categories[info.category] = [];
    categories[info.category].push(info);
  });

  var sectionsHtml = order
    .filter(function (cat) { return categories[cat]; })
    .map(function (cat) {
      var items = categories[cat].map(function (b) {
        return '<div class="achievement-row"><span class="achievement-emoji">' + b.emoji + '</span><span>' + b.label + '</span></div>';
      }).join("");
      return '<div class="card"><h3>' + cat + '</h3>' + items + '</div>';
    }).join("");

  var cosmeticsHtml = "";
  if (state.cosmetics && (state.cosmetics.backgrounds.length || state.cosmetics.avatars.length)) {
    var bgSwatches = state.cosmetics.backgrounds.map(function (id) {
      var name = DB.L(DB.BACKGROUND_LABELS)[id];
      var active = state.activeBackground === id;
      return (
        '<div class="cosmetic-swatch bg-swatch' + (active ? " active" : "") + '" data-type="background" data-name="' + id + '" style="background-image:' + (DB.BACKGROUND_SCENES[id] ? DB.svgBackgroundUrl(DB.BACKGROUND_SCENES[id]) : "none") + ';background-size:cover;background-position:center">' +
          '<span>' + name + (active ? " ✓" : "") + '</span>' +
        '</div>'
      );
    }).join("");
    var avatarSwatches = state.cosmetics.avatars.map(function (id) {
      var style = DB.AVATAR_STYLES[id];
      var name = DB.L(DB.AVATAR_LABELS)[id];
      var active = state.activeAvatar === id;
      return (
        '<div class="cosmetic-swatch avatar-swatch' + (active ? " active" : "") + '" data-type="avatar" data-name="' + id + '">' +
          '<div class="avatar-badge" style="background:' + (style ? style.bg : "var(--surface-2)") + '">' + (style ? style.emoji : "🙂") + '</div>' +
          '<span>' + name + (active ? " ✓" : "") + '</span>' +
        '</div>'
      );
    }).join("");

    cosmeticsHtml =
      '<div class="card"><h3>' + DB.t("ach.cosmeticsTitle") + '</h3>' +
      '<p class="muted">' + DB.t("ach.cosmeticsHint") + '</p>' +
      (state.cosmetics.backgrounds.length ? '<div class="muted" style="margin:10px 0 6px">' + DB.t("ach.backgroundsLabel") + '</div><div class="cosmetic-row">' + bgSwatches + '</div>' : "") +
      (state.cosmetics.avatars.length ? '<div class="muted" style="margin:14px 0 6px">' + DB.t("ach.avatarsLabel") + '</div><div class="cosmetic-row">' + avatarSwatches + '</div>' : "") +
      '</div>';
  }

  DB.appRoot.innerHTML =
    DB.renderHeader(state) +
    '<div class="card"><h2>' + DB.t("ach.title") + '</h2><p class="muted">' + DB.t("ach.subtitle") + '</p></div>' +
    cosmeticsHtml +
    (sectionsHtml || '<div class="card"><p class="muted">' + DB.t("ach.none") + '</p></div>') +
    '<button class="btn secondary" id="backHome">' + DB.t("ach.back") + '</button>' +
    '<div class="card" style="margin-top:14px">' +
      '<h3>' + DB.t("ach.resetTitle") + '</h3>' +
      '<p class="muted">' + DB.t("ach.resetHint") + '</p>' +
      '<button class="btn danger" id="resetProgress" style="margin-top:12px">' + DB.t("ach.resetBtn") + '</button>' +
    '</div>';

  DB.bindHeader();
  document.getElementById("backHome").addEventListener("click", DB.renderHome);
  document.getElementById("resetProgress").addEventListener("click", function () {
    if (window.confirm(DB.t("ach.resetConfirm"))) {
      localStorage.removeItem(DB.STORAGE_KEY);
      DB.applyTheme(DB.loadState());
      DB.applyColorTheme(DB.loadState());
      DB.renderHome();
    }
  });
  document.querySelectorAll(".cosmetic-swatch").forEach(function (el) {
    el.addEventListener("click", function () {
      var type = el.getAttribute("data-type");
      var name = el.getAttribute("data-name");
      var s = DB.loadState();
      if (type === "background") {
        s.activeBackground = s.activeBackground === name ? null : name;
      } else {
        s.activeAvatar = s.activeAvatar === name ? null : name;
      }
      DB.saveState(s);
      DB.applyTheme(s);
      DB.renderAchievements();
    });
  });
};

DB.startRun = function () {
  var startBtn = document.getElementById("startRun");
  if (startBtn) {
    startBtn.disabled = true;
    startBtn.dataset.originalText = startBtn.textContent;
    startBtn.textContent = "…";
  }

  DB.fetchDailySeed().then(function (seed) {
    var rng = DB.mulberry32(seed);
    var puzzles = DB.PUZZLE_ORDER.map(function (p) {
      return { def: p, data: p.generate(rng) };
    });

    DB.runState = {
      puzzles: puzzles,
      index: 0,
      results: [],
      timerId: null,
      activeController: null
    };

    DB.renderPuzzleStep();
  });
};

DB.renderPuzzleStep = function () {
  var rs = DB.runState;
  var step = rs.puzzles[rs.index];

  var dots = rs.puzzles.map(function (_, i) {
    var cls = "progress-dot";
    if (i < rs.index) cls += " done";
    else if (i === rs.index) cls += " active";
    return '<div class="' + cls + '"></div>';
  }).join("");

  DB.appRoot.innerHTML =
    '<div class="header"><div class="brand">Daily <span>BrainClub</span></div><div class="header-right">' + DB.homeBtn() + '<div class="streak-pill">' + step.def.emoji + ' ' + (rs.index + 1) + '/' + rs.puzzles.length + '</div></div></div>' +
    '<div class="progress-row">' + dots + '</div>' +
    '<div class="timer-bar-track"><div class="timer-bar-fill" id="timerFill" style="width:100%"></div></div>' +
    '<div class="bonus-label" id="bonusLabel">' + DB.t("run.bonusRemaining", { s: DB.PUZZLE_SECONDS }) + '</div>' +
    '<div class="card" id="puzzleContainer"></div>' +
    '<button class="btn secondary" id="skipBtn" style="margin-top:12px">' + DB.t("run.skipBtn") + '</button>';

  var container = document.getElementById("puzzleContainer");
  rs.stepFinished = false;
  rs.stepStartTime = Date.now();

  rs.activeController = step.def.mount(container, step.data, function (result) {
    if (rs.stepFinished) return;
    rs.stepFinished = true;
    clearInterval(rs.timerId);
    var elapsedSeconds = (Date.now() - rs.stepStartTime) / 1000;
    var withinBonus = elapsedSeconds <= DB.PUZZLE_SECONDS;
    DB.finishCurrentPuzzle(result, withinBonus);
  });

  document.getElementById("skipBtn").addEventListener("click", function () {
    if (rs.activeController && rs.activeController.forceFinish) {
      rs.activeController.forceFinish();
    }
  });

  clearInterval(rs.timerId);
  rs.timerId = setInterval(function () {
    var elapsed = (Date.now() - rs.stepStartTime) / 1000;
    var remaining = Math.max(0, DB.PUZZLE_SECONDS - elapsed);
    var pct = (remaining / DB.PUZZLE_SECONDS) * 100;
    var fill = document.getElementById("timerFill");
    var label = document.getElementById("bonusLabel");
    if (fill) fill.style.width = pct + "%";
    if (remaining <= 0) {
      if (fill) fill.classList.add("expired");
      if (label) label.textContent = DB.t("run.bonusExpired");
      clearInterval(rs.timerId);
    } else if (label) {
      label.textContent = DB.t("run.bonusRemaining", { s: Math.ceil(remaining) });
    }
  }, 1000);
};

DB.finishCurrentPuzzle = function (result, withinBonus) {
  var rs = DB.runState;
  clearInterval(rs.timerId);
  var step = rs.puzzles[rs.index];
  rs.results.push({ id: step.def.id, emoji: step.def.emoji, score: result.score, detail: result.detail, withinBonus: withinBonus });

  DB.renderTransition(step, result, withinBonus, function () {
    rs.index++;
    if (rs.index >= rs.puzzles.length) {
      DB.finishRun();
    } else if (rs.index % DB.AD_INTERVAL === 0) {
      DB.renderAdBreak(function () { DB.renderPuzzleStep(); });
    } else {
      DB.renderPuzzleStep();
    }
  });
};

DB.renderTransition = function (step, result, withinBonus, onContinue) {
  DB.appRoot.innerHTML =
    '<div class="card center">' +
      '<div class="transition-emoji">' + step.def.emoji + '</div>' +
      '<h2>' + DB.puzzleTitle(step.def.id) + ' ' + DB.t("run.finished") + '</h2>' +
      '<div class="result-score">' + result.score + '</div>' +
      (withinBonus ? '<div class="bonus-tag">' + DB.t("run.bonusAchieved") + '</div>' : '') +
      '<p class="muted">' + result.detail + '</p>' +
      '<button class="btn" id="continueBtn">' + DB.t("run.continueBtn") + '</button>' +
    '</div>';

  document.getElementById("continueBtn").addEventListener("click", onContinue);
};

DB.finishRun = function () {
  var rs = DB.runState;
  var dailyScore = Math.round(rs.results.reduce(function (sum, r) { return sum + r.score; }, 0) / rs.results.length);
  var allBonus = rs.results.every(function (r) { return r.withinBonus; });
  var outcome = DB.recordRunCompleted(dailyScore, allBonus);
  var cardResult = DB.awardDailyCards(allBonus ? 2 : 1);
  DB.submitLeaderboardScore(dailyScore, outcome.state.streak);

  if (outcome.challengeCompleted) {
    var bonusCardResult = DB.awardDailyCards(1);
    cardResult.drawn = cardResult.drawn.concat(bonusCardResult.drawn);
    cardResult.newAlbumBadges = (cardResult.newAlbumBadges || []).concat(bonusCardResult.newAlbumBadges || []);
  }

  var rows = rs.results.map(function (r) {
    return '<div class="result-row"><span>' + r.emoji + ' ' + DB.puzzleTitle(r.id) + (r.withinBonus ? ' ⚡' : '') + '</span><b>' + r.score + '</b></div>';
  }).join("");

  var allNewBadges = (outcome.newBadges || []).concat(cardResult.newAlbumBadges || []);
  var badgeHtml = allNewBadges.map(function (b) {
    return '<div class="badge-toast">' + b.emoji + ' ' + DB.t("toast.newBadgePrefix") + b.label + '</div>';
  }).join("");

  var bonusBanner = allBonus ? '<div class="badge-toast">' + DB.t("run.bonusBanner") + '</div>' : "";
  var challengeBanner = outcome.challengeCompleted ? '<div class="badge-toast">' + DB.t("run.challengeBanner") + '</div>' : "";

  var cardsHtml = "";
  if (cardResult.drawn.length) {
    var cardTiles = cardResult.drawn.map(function (c) {
      var cardName = DB.L(c.name);
      var visual = c.image
        ? '<img class="earned-card-photo" style="object-position:' + (c.focus || "center") + '" src="' + c.image + '" alt="' + cardName + '">'
        : '<div class="earned-card-emoji">' + c.emoji + '</div>';
      return (
        '<div class="earned-card">' +
          visual +
          '<div class="earned-card-name">' + cardName + '</div>' +
          '<div class="earned-card-album">' + DB.L(c.albumTitle) + (c.isNew ? '' : DB.t("earnedCard.duplicate")) + '</div>' +
        '</div>'
      );
    }).join("");
    cardsHtml =
      '<div class="card">' +
        '<h3>' + (cardResult.drawn.length > 1 ? DB.t("earnedCard.titlePlural") : DB.t("earnedCard.titleSingle")) + '</h3>' +
        '<div class="cards-earned-row">' + cardTiles + '</div>' +
      '</div>';
  }

  DB.appRoot.innerHTML =
    '<div class="header"><div class="brand">Daily <span>BrainClub</span></div>' + DB.homeBtn() + '</div>' +
    '<div class="card center">' +
      '<h2>' + DB.t("run.dailyScore") + '</h2>' +
      '<div class="result-score">' + dailyScore + '</div>' +
      '<div class="muted">' + DB.t("run.streakLabel", { n: outcome.state.streak, unit: DB.dayWord(outcome.state.streak) }) + '</div>' +
    '</div>' +
    bonusBanner +
    challengeBanner +
    badgeHtml +
    cardsHtml +
    '<div class="result-breakdown">' + rows + '</div>' +
    '<button class="btn secondary" id="lbViewBtn" style="margin-top:10px">' + DB.t("lb.viewBtn") + '</button>' +
    '<button class="btn secondary" id="viewAlbumsBtn" style="margin-top:10px">' + DB.t("run.viewAlbums") + '</button>' +
    '<button class="btn secondary" id="backHome" style="margin-top:10px">' + DB.t("run.backHome") + '</button>';

  document.getElementById("backHome").addEventListener("click", DB.renderHome);
  document.getElementById("viewAlbumsBtn").addEventListener("click", DB.renderAlbums);
  document.getElementById("lbViewBtn").addEventListener("click", DB.renderLeaderboard);
};

document.addEventListener("click", function (e) {
  var btn = e.target.closest("[data-home]");
  if (btn) DB.renderHome();
});

DB.applyTheme(DB.loadState());
DB.applyColorTheme(DB.loadState());
DB.renderHome();

window.DB = DB;
