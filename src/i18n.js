var DB = window.DB || {};

DB.currentLang = function () {
  var s = DB.loadState();
  return s.language === "en" ? "en" : "nl";
};

DB.L = function (obj) {
  if (!obj || typeof obj !== "object") return obj;
  var lang = DB.currentLang();
  return obj[lang] !== undefined ? obj[lang] : obj.nl;
};

DB.t = function (key, vars) {
  var lang = DB.currentLang();
  var dict = DB.UI[lang] || DB.UI.nl;
  var str = dict[key] !== undefined ? dict[key] : (DB.UI.nl[key] !== undefined ? DB.UI.nl[key] : key);
  if (vars) {
    str = str.replace(/\{(\w+)\}/g, function (m, k) {
      return vars[k] !== undefined ? vars[k] : m;
    });
  }
  return str;
};

DB.dayWord = function (n) {
  return DB.t(n === 1 ? "unit.day" : "unit.days");
};

DB.puzzleTitle = function (id) {
  return DB.t("puzzle." + id + ".title");
};

DB.setLanguage = function (lang) {
  var s = DB.loadState();
  if (s.language === lang) return;
  s.language = lang;
  DB.saveState(s);
  DB.applyTheme(s);
  (DB.lastRender || DB.renderHome)();
};

DB.bindHeader = function () {
  var settingsBtn = document.getElementById("settingsBtn");
  var panel = document.getElementById("settingsPanel");
  if (settingsBtn && panel) {
    settingsBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      panel.hidden = !panel.hidden;
    });
    panel.addEventListener("click", function (e) { e.stopPropagation(); });
    document.addEventListener("click", function closeOnce() {
      panel.hidden = true;
    }, { once: true });
  }
  document.querySelectorAll(".lang-opt").forEach(function (el) {
    el.addEventListener("click", function () {
      DB.setLanguage(el.getAttribute("data-lang"));
    });
  });
  document.querySelectorAll(".theme-opt").forEach(function (el) {
    el.addEventListener("click", function () {
      DB.setColorTheme(el.getAttribute("data-theme-choice"));
    });
  });
  var editNameBtn = document.getElementById("settingsEditName");
  if (editNameBtn) {
    editNameBtn.addEventListener("click", function () {
      DB.renderWelcome();
    });
  }
};

DB.UI = {
  nl: {
    "puzzle.wordsearch.title": "Woordzoeker",
    "puzzle.sudoku.title": "Mini sudoku",
    "puzzle.blocks.title": "Blokkenpuzzel",
    "puzzle.memory.title": "Geheugenspel",
    "puzzle.wordguess.title": "Woord raden",
    "puzzle.math.title": "Rekenpuzzel",
    "puzzle.logic.title": "Logische puzzel",

    "welcome.title": "Welkom bij Daily BrainClub!",
    "welcome.subtitle": "Hoe mogen we je noemen?",
    "welcome.placeholder": "Je voornaam",
    "welcome.start": "Aan de slag",

    "home.greeting": "Welkom terug, {name}! 👋",

    "settings.language": "Taal",
    "settings.colorTheme": "Thema",
    "settings.light": "Licht",
    "settings.dark": "Donker",
    "settings.system": "Systeem",
    "settings.name": "Naam",
    "settings.editName": "wijzigen",
    "settings.contact": "Contact",
    "settings.contactAction": "e-mail ons",

    "home.missionTitle": "Dagelijkse missie",
    "home.playedToday": "Je hebt vandaag al gespeeld — score: <b>{score}</b>. Kom morgen terug voor een nieuwe run!",
    "home.notPlayedYet": "{n} puzzels, speel op je eigen tempo. Los een puzzel binnen 2 minuten op voor bonuspunten. Bouw je streak op!",
    "home.comingSoon": "binnenkort",
    "home.startRun": "Start dagelijkse run",
    "home.alreadyDone": "Vandaag al voltooid ✓",
    "home.milestones": "Mijlpalen",
    "home.weekBadgeIn": "🏅 Weekbadge over {n} {unit}",
    "home.medalIn": "🥇 Medaille over {n} {unit}",
    "home.eliteReached": "👑 Elite-status behaald",
    "home.eliteIn": "👑 Elite over {n} dagen",
    "home.challengeTitle": "🎯 Uitdaging van week {n}",
    "home.challengeDoneSuffix": " ✓",
    "home.challengeDoneLine": " — voltooid!",
    "home.albumsTitle": "Verzamelalbums — {owned} / {total} kaarten",
    "home.viewAlbums": "Bekijk albums",
    "home.stats": "Statistieken",
    "home.totalRuns": "Totaal aantal runs: {n}",
    "home.badgesEarned": "Badges verdiend: {n}",
    "home.badgesNone": "nog geen",
    "home.viewAchievements": "Bekijk prestaties",
    "home.practiceHint": "Tik op een puzzel om los te oefenen, buiten de dagelijkse missie om.",
    "practice.label": "Oefenen",
    "practice.again": "Nog een keer",
    "home.multiplayerBtn": "🎮 Multiplayer",

    "mp.title": "Multiplayer",
    "mp.subtitle": "Speel dezelfde puzzels tegelijk met vrienden en vergelijk live je scores.",
    "mp.createBtn": "Nieuwe room starten",
    "mp.joinLabel": "Of voer een roomcode in",
    "mp.joinPlaceholder": "bv. AB3XZ",
    "mp.joinBtn": "Meedoen",
    "mp.backHome": "Terug naar overzicht",
    "mp.error.notFound": "Room niet gevonden — controleer de code.",
    "mp.error.started": "Deze room is al gestart.",
    "mp.error.generic": "Er ging iets mis — probeer het opnieuw.",
    "mp.error.offline": "Kan de server niet bereiken. Draait serve.ps1 nog?",
    "mp.lobby.title": "Wachtkamer",
    "mp.lobby.codeHint": "Deel deze code met vrienden:",
    "mp.lobby.players": "Spelers",
    "mp.lobby.waitingHost": "Wachten tot de host de run start...",
    "mp.lobby.startBtn": "Start voor iedereen",
    "mp.you": " (jij)",
    "mp.host": "host",
    "mp.run.label": "Multiplayer",
    "mp.results.title": "Live ranglijst",
    "mp.results.waiting": "Wachten tot iedereen klaar is...",
    "mp.results.allDone": "Iedereen is klaar! 🎉",
    "mp.results.finishedTag": "klaar",
    "mp.results.progress": "{done}/{total} puzzels",
    "mp.exitBtn": "Verlaat room",

    "lb.viewBtn": "🏆 Dagranglijst",
    "lb.title": "Dagranglijst",
    "lb.subtitle": "Scores van iedereen die vandaag heeft gespeeld.",
    "lb.empty": "Nog niemand op de ranglijst vandaag — wees de eerste!",
    "lb.you": " (jij)",
    "lb.streakSuffix": "🔥 {n}",
    "lb.back": "Terug naar overzicht",

    "ad.label": "Advertentie",
    "ad.hint": "Advertenties helpen Daily BrainClub gratis te houden.",
    "ad.closeIn": "Sluiten over {s}s",
    "ad.close": "Sluiten ✕",
    "ad.c1.title": "Puzzel Pro",
    "ad.c1.body": "Ontgrendel elke dag 3 extra puzzels en exclusieve moeilijkheidsgraden.",
    "ad.c2.title": "BrainClub Friends",
    "ad.c2.body": "Speel multiplayer met tot wel 10 vrienden tegelijk.",
    "ad.c3.title": "Premium Achtergronden",
    "ad.c3.body": "Ontgrendel 50+ exclusieve scènes voor je startscherm.",
    "ad.c4.title": "Neem even een pauze",
    "ad.c4.body": "Sta even op, rek je uit en drink een glas water. Je puzzels wachten op je!",
    "home.cosmeticUnlocked": "🎁 Nieuw ontgrendeld: {parts} — tik om te activeren",
    "home.newBackground": "achtergrond '{name}'",
    "home.newAvatar": "avatar '{name}'",
    "home.and": " en ",

    "unit.day": "dag",
    "unit.days": "dagen",

    "ach.title": "Prestaties",
    "ach.subtitle": "Alle badges, bekers, medailles en status die je hebt verdiend.",
    "ach.cosmeticsTitle": "Cosmetica",
    "ach.cosmeticsHint": "Tik op een achtergrond of avatar om die te activeren.",
    "ach.backgroundsLabel": "Achtergronden",
    "ach.avatarsLabel": "Avatars",
    "ach.none": "Nog geen prestaties — start je eerste dagelijkse missie!",
    "ach.back": "Terug naar overzicht",
    "ach.resetTitle": "Voortgang resetten",
    "ach.resetHint": "Wist al je scores, streaks, badges en verzamelkaarten op dit toestel. Dit kan niet ongedaan gemaakt worden.",
    "ach.resetBtn": "Alles resetten",
    "ach.resetConfirm": "Weet je zeker dat je alle voortgang wilt wissen? Dit kan niet ongedaan gemaakt worden.",

    "cat.weekbadges": "Weekbadges",
    "cat.trophies": "Bekers",
    "cat.challenges": "Uitdagingen",
    "cat.medals": "Medailles",
    "cat.status": "Status",
    "cat.albums": "Albums",
    "cat.other": "Overig",

    "badge.week": "Week {n}: {name}",
    "badge.trophy": "Week {n}: {name}",
    "badge.challengeDone": "Week {n} uitdaging voltooid",
    "badge.medal": "Gouden medaille #{k} — {days} dagen streak",
    "badge.elite": "Elite-status — 100 dagen streak",
    "badge.speedrun": "Bliksemronde — alle puzzels binnen 2 min",
    "badge.albumComplete": "Album compleet: {title}",
    "badge.legacyWeek1": "7-dagen badge",
    "badge.legacyGold30": "Gouden medaille (30 dagen)",

    "toast.weekBadge": "Week {n} badge: {name}",
    "toast.weekTrophy": "Week {n} beker: {name}",
    "toast.weekChallengeDone": "Week {n} uitdaging voltooid!",
    "toast.medal": "Gouden medaille #{k} — achtergrond '{bg}' en '{avatar}' ontgrendeld",
    "toast.elite": "Elite-status ontgrendeld — 100 dagen streak!",
    "toast.albumComplete": "Album compleet: {title} — {reward}",
    "toast.newBadgePrefix": "Nieuwe badge: ",

    "albums.title": "Verzamelalbums",
    "albums.subtitle": "Verdien kaarten door je dagelijkse missie te voltooien. Een compleet album levert een unieke beloning op.",
    "albums.back": "Terug naar albums",
    "albumDetail.cardsCount": "{owned} / {total} kaarten",
    "albumDetail.complete": "✓ Compleet — {reward}",
    "albumDetail.rewardHint": "Beloning bij voltooien: {reward}",
    "albumDetail.unknown": "???",
    "earnedCard.titleSingle": "Nieuwe albumkaart!",
    "earnedCard.titlePlural": "Nieuwe albumkaarten!",
    "earnedCard.duplicate": " (dubbel)",

    "run.bonusRemaining": "⚡ Nog {s}s voor bonuspunten",
    "run.bonusExpired": "Bonusvenster verstreken — speel rustig verder",
    "run.skipBtn": "Ik ben klaar met deze puzzel",
    "run.continueBtn": "Volgende",
    "run.bonusAchieved": "⚡ Bonus behaald — binnen 2 minuten!",
    "run.dailyScore": "Dagscore",
    "run.streakLabel": "🔥 Streak: {n} {unit}",
    "run.bonusBanner": "⚡ Bliksembonus! Alle puzzels binnen 2 minuten opgelost — extra albumkaart verdiend.",
    "run.challengeBanner": "🎯 Weekuitdaging voltooid! Extra albumkaart verdiend.",
    "run.finished": "klaar!",
    "run.viewAlbums": "Bekijk albums",
    "run.backHome": "Terug naar overzicht",

    "math.confirm": "Bevestig",
    "math.correct": "Goed: ",
    "math.wrong": "Fout: ",
    "math.question": "{title} — vraag {i} / {n}",
    "math.detail": "{correct}/{total} goed",

    "memory.round": "{title} — ronde {n}",
    "memory.watch": "Kijk goed...",
    "memory.yourTurn": "Jouw beurt: herhaal het patroon ({n})",
    "memory.detail": "Reeks van {n} onthouden",

    "wordguess.attempt": "{title} — poging {i} / {n}",
    "wordguess.ok": "OK",
    "wordguess.detailWon": "Geraden in {n} pogingen",
    "wordguess.detailLost": "Niet geraden — het woord was {word}",

    "sudoku.instruction": "{title} — vul de lege vakjes (1-4)",
    "sudoku.clear": "Wis",
    "sudoku.check": "Controleer",
    "sudoku.detail": "{correct}/{total} vakjes goed",

    "wordsearch.instruction": "{title} — vind {n} woorden",
    "wordsearch.detail": "{found}/{total} woorden gevonden",

    "blocks.scoreHeader": "{title} — score {n}",
    "blocks.msgStart": "Kies een blok en tik op het speelveld",
    "blocks.msgChooseFirst": "Kies eerst een blok",
    "blocks.msgNoFit": "Past daar niet — probeer een andere plek",
    "blocks.msgLinesCleared": "{n} lijn(en) gewist! +{pts}",
    "blocks.msgPlaced": "Blok geplaatst",
    "blocks.msgAllDone": "Alle blokken op — mooi gedaan!",
    "blocks.detail": "{pts} punten behaald",

    "logic.subtitle": "{title} — wie hoort bij wie?",
    "logic.colorHeader": "Kleur",
    "logic.petHeader": "Huisdier",
    "logic.detail": "{correct}/{total} combinaties goed"
  },
  en: {
    "puzzle.wordsearch.title": "Word Search",
    "puzzle.sudoku.title": "Mini Sudoku",
    "puzzle.blocks.title": "Block Puzzle",
    "puzzle.memory.title": "Memory Game",
    "puzzle.wordguess.title": "Word Guess",
    "puzzle.math.title": "Math Puzzle",
    "puzzle.logic.title": "Logic Puzzle",

    "welcome.title": "Welcome to Daily BrainClub!",
    "welcome.subtitle": "What should we call you?",
    "welcome.placeholder": "Your first name",
    "welcome.start": "Let's go",

    "home.greeting": "Welcome back, {name}! 👋",

    "settings.language": "Language",
    "settings.colorTheme": "Theme",
    "settings.light": "Light",
    "settings.dark": "Dark",
    "settings.system": "System",
    "settings.name": "Name",
    "settings.editName": "edit",
    "settings.contact": "Contact",
    "settings.contactAction": "email us",

    "home.missionTitle": "Daily mission",
    "home.playedToday": "You've already played today — score: <b>{score}</b>. Come back tomorrow for a new run!",
    "home.notPlayedYet": "{n} puzzles, play at your own pace. Solve a puzzle within 2 minutes for bonus points. Build your streak!",
    "home.comingSoon": "coming soon",
    "home.startRun": "Start daily run",
    "home.alreadyDone": "Completed today ✓",
    "home.milestones": "Milestones",
    "home.weekBadgeIn": "🏅 Week badge in {n} {unit}",
    "home.medalIn": "🥇 Medal in {n} {unit}",
    "home.eliteReached": "👑 Elite status reached",
    "home.eliteIn": "👑 Elite in {n} days",
    "home.challengeTitle": "🎯 Week {n} challenge",
    "home.challengeDoneSuffix": " ✓",
    "home.challengeDoneLine": " — complete!",
    "home.albumsTitle": "Collector albums — {owned} / {total} cards",
    "home.viewAlbums": "View albums",
    "home.stats": "Statistics",
    "home.totalRuns": "Total runs: {n}",
    "home.badgesEarned": "Badges earned: {n}",
    "home.badgesNone": "none yet",
    "home.viewAchievements": "View achievements",
    "home.practiceHint": "Tap a puzzle to practice it on its own, outside the daily mission.",
    "practice.label": "Practice",
    "practice.again": "Play again",
    "home.multiplayerBtn": "🎮 Multiplayer",

    "mp.title": "Multiplayer",
    "mp.subtitle": "Play the same puzzles together with friends and compare your scores live.",
    "mp.createBtn": "Start a new room",
    "mp.joinLabel": "Or enter a room code",
    "mp.joinPlaceholder": "e.g. AB3XZ",
    "mp.joinBtn": "Join",
    "mp.backHome": "Back to overview",
    "mp.error.notFound": "Room not found — check the code.",
    "mp.error.started": "This room has already started.",
    "mp.error.generic": "Something went wrong — please try again.",
    "mp.error.offline": "Can't reach the server. Is serve.ps1 still running?",
    "mp.lobby.title": "Lobby",
    "mp.lobby.codeHint": "Share this code with friends:",
    "mp.lobby.players": "Players",
    "mp.lobby.waitingHost": "Waiting for the host to start...",
    "mp.lobby.startBtn": "Start for everyone",
    "mp.you": " (you)",
    "mp.host": "host",
    "mp.run.label": "Multiplayer",
    "mp.results.title": "Live leaderboard",
    "mp.results.waiting": "Waiting for everyone to finish...",
    "mp.results.allDone": "Everyone's finished! 🎉",
    "mp.results.finishedTag": "done",
    "mp.results.progress": "{done}/{total} puzzles",
    "mp.exitBtn": "Leave room",

    "lb.viewBtn": "🏆 Daily leaderboard",
    "lb.title": "Daily leaderboard",
    "lb.subtitle": "Scores from everyone who played today.",
    "lb.empty": "No one on the leaderboard yet today — be the first!",
    "lb.you": " (you)",
    "lb.streakSuffix": "🔥 {n}",
    "lb.back": "Back to overview",

    "ad.label": "Advertisement",
    "ad.hint": "Ads help keep Daily BrainClub free.",
    "ad.closeIn": "Close in {s}s",
    "ad.close": "Close ✕",
    "ad.c1.title": "Puzzle Pro",
    "ad.c1.body": "Unlock 3 extra puzzles and exclusive difficulty levels every day.",
    "ad.c2.title": "BrainClub Friends",
    "ad.c2.body": "Play multiplayer with up to 10 friends at once.",
    "ad.c3.title": "Premium Backgrounds",
    "ad.c3.body": "Unlock 50+ exclusive scenes for your home screen.",
    "ad.c4.title": "Take a quick break",
    "ad.c4.body": "Stand up, stretch, and grab a glass of water. Your puzzles are waiting!",
    "home.cosmeticUnlocked": "🎁 Newly unlocked: {parts} — tap to activate",
    "home.newBackground": "background '{name}'",
    "home.newAvatar": "avatar '{name}'",
    "home.and": " and ",

    "unit.day": "day",
    "unit.days": "days",

    "ach.title": "Achievements",
    "ach.subtitle": "All the badges, trophies, medals and status you've earned.",
    "ach.cosmeticsTitle": "Cosmetics",
    "ach.cosmeticsHint": "Tap a background or avatar to activate it.",
    "ach.backgroundsLabel": "Backgrounds",
    "ach.avatarsLabel": "Avatars",
    "ach.none": "No achievements yet — start your first daily mission!",
    "ach.back": "Back to overview",
    "ach.resetTitle": "Reset progress",
    "ach.resetHint": "Clears all your scores, streaks, badges and collected cards on this device. This cannot be undone.",
    "ach.resetBtn": "Reset everything",
    "ach.resetConfirm": "Are you sure you want to clear all progress? This cannot be undone.",

    "cat.weekbadges": "Week badges",
    "cat.trophies": "Trophies",
    "cat.challenges": "Challenges",
    "cat.medals": "Medals",
    "cat.status": "Status",
    "cat.albums": "Albums",
    "cat.other": "Other",

    "badge.week": "Week {n}: {name}",
    "badge.trophy": "Week {n}: {name}",
    "badge.challengeDone": "Week {n} challenge completed",
    "badge.medal": "Gold medal #{k} — {days} day streak",
    "badge.elite": "Elite status — 100 day streak",
    "badge.speedrun": "Speed round — all puzzles within 2 min",
    "badge.albumComplete": "Album complete: {title}",
    "badge.legacyWeek1": "7-day badge",
    "badge.legacyGold30": "Gold medal (30 days)",

    "toast.weekBadge": "Week {n} badge: {name}",
    "toast.weekTrophy": "Week {n} trophy: {name}",
    "toast.weekChallengeDone": "Week {n} challenge completed!",
    "toast.medal": "Gold medal #{k} — background '{bg}' and '{avatar}' unlocked",
    "toast.elite": "Elite status unlocked — 100 day streak!",
    "toast.albumComplete": "Album complete: {title} — {reward}",
    "toast.newBadgePrefix": "New badge: ",

    "albums.title": "Collector albums",
    "albums.subtitle": "Earn cards by completing your daily mission. A complete album unlocks a unique reward.",
    "albums.back": "Back to albums",
    "albumDetail.cardsCount": "{owned} / {total} cards",
    "albumDetail.complete": "✓ Complete — {reward}",
    "albumDetail.rewardHint": "Reward for completing: {reward}",
    "albumDetail.unknown": "???",
    "earnedCard.titleSingle": "New album card!",
    "earnedCard.titlePlural": "New album cards!",
    "earnedCard.duplicate": " (duplicate)",

    "run.bonusRemaining": "⚡ {s}s left for bonus points",
    "run.bonusExpired": "Bonus window expired — play on at your own pace",
    "run.skipBtn": "I'm done with this puzzle",
    "run.continueBtn": "Next",
    "run.bonusAchieved": "⚡ Bonus achieved — within 2 minutes!",
    "run.dailyScore": "Daily score",
    "run.streakLabel": "🔥 Streak: {n} {unit}",
    "run.bonusBanner": "⚡ Speed bonus! All puzzles solved within 2 minutes — extra album card earned.",
    "run.challengeBanner": "🎯 Week challenge completed! Extra album card earned.",
    "run.finished": "done!",
    "run.viewAlbums": "View albums",
    "run.backHome": "Back to overview",

    "math.confirm": "Confirm",
    "math.correct": "Correct: ",
    "math.wrong": "Wrong: ",
    "math.question": "{title} — question {i} / {n}",
    "math.detail": "{correct}/{total} correct",

    "memory.round": "{title} — round {n}",
    "memory.watch": "Watch closely...",
    "memory.yourTurn": "Your turn: repeat the pattern ({n})",
    "memory.detail": "Sequence of {n} remembered",

    "wordguess.attempt": "{title} — attempt {i} / {n}",
    "wordguess.ok": "OK",
    "wordguess.detailWon": "Guessed in {n} tries",
    "wordguess.detailLost": "Not guessed — the word was {word}",

    "sudoku.instruction": "{title} — fill the empty cells (1-4)",
    "sudoku.clear": "Clear",
    "sudoku.check": "Check",
    "sudoku.detail": "{correct}/{total} cells correct",

    "wordsearch.instruction": "{title} — find {n} words",
    "wordsearch.detail": "{found}/{total} words found",

    "blocks.scoreHeader": "{title} — score {n}",
    "blocks.msgStart": "Choose a block and tap the board",
    "blocks.msgChooseFirst": "Choose a block first",
    "blocks.msgNoFit": "Doesn't fit there — try another spot",
    "blocks.msgLinesCleared": "{n} line(s) cleared! +{pts}",
    "blocks.msgPlaced": "Block placed",
    "blocks.msgAllDone": "All blocks used — nice work!",
    "blocks.detail": "{pts} points scored",

    "logic.subtitle": "{title} — who belongs to whom?",
    "logic.colorHeader": "Color",
    "logic.petHeader": "Pet",
    "logic.detail": "{correct}/{total} combinations correct"
  }
};

window.DB = DB;
