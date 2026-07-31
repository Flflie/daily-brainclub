var DB = window.DB || {};

DB.STORAGE_KEY = "dailyBrainclubState";
DB.PUZZLE_SECONDS = 120;

DB.todayStr = function () {
  var d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
};

DB.defaultState = function () {
  return {
    streak: 0,
    lastPlayedDate: null,
    totalRuns: 0,
    badges: [],
    history: {},
    ownedCards: {},
    streakStartDate: null,
    weekChallenge: { weekIndex: 0, bonusCount: 0, target: 3, claimed: false },
    cosmetics: { backgrounds: [], avatars: [] },
    eliteStatus: false,
    activeBackground: null,
    activeAvatar: null,
    language: "nl",
    firstName: null,
    deviceId: null
  };
};

DB.newDeviceId = function () {
  return "d" + Math.random().toString(36).slice(2) + Date.now().toString(36);
};

DB.WEEK_BADGE_NAMES = {
  nl: ["Beginnersgeluk", "Puzzelaar", "Denker", "Scherpzinnig", "Meesterbrein", "Puzzelheld", "Genie in wording", "Legende"],
  en: ["Beginner's Luck", "Puzzler", "Thinker", "Sharp Mind", "Mastermind", "Puzzle Hero", "Genius in Training", "Legend"]
};
DB.WEEK_BADGE_EMOJIS = ["🥉", "🥈", "🏅", "🎖️", "🧩", "⭐", "🌟", "💎"];
DB.TROPHY_NAMES = {
  nl: ["Bronzen Beker", "Zilveren Beker", "Gouden Beker", "Platina Beker", "Diamanten Beker", "Kristallen Beker", "Titanium Beker", "Legendarische Beker"],
  en: ["Bronze Trophy", "Silver Trophy", "Gold Trophy", "Platinum Trophy", "Diamond Trophy", "Crystal Trophy", "Titanium Trophy", "Legendary Trophy"]
};
DB.CHALLENGE_FLAVORS = {
  nl: [
    "Behaal deze week 3x de bliksembonus (alle puzzels binnen 2 min).",
    "Speel snel: verzamel deze week 3x de bliksembonus.",
    "Deze week: 3x bliksembonus voor een extra albumkaart.",
    "Uitdaging van de week: 3x alle puzzels binnen 2 minuten oplossen."
  ],
  en: [
    "Achieve the speed bonus 3x this week (all puzzles within 2 min).",
    "Play fast: earn the speed bonus 3x this week.",
    "This week: 3x speed bonus for an extra album card.",
    "Challenge of the week: solve all puzzles within 2 minutes, 3 times."
  ]
};

DB.BACKGROUND_IDS = ["sunrise", "aurora", "dunes", "starrysky", "blossom", "autumnforest", "wintersnow", "summersea"];
DB.BACKGROUND_LABELS = {
  nl: { sunrise: "Zonsopgang", aurora: "Noorderlicht", dunes: "Duinlandschap", starrysky: "Sterrenhemel", blossom: "Lentebloesem", autumnforest: "Herfstbos", wintersnow: "Wintersneeuw", summersea: "Zomerzee" },
  en: { sunrise: "Sunrise", aurora: "Northern Lights", dunes: "Dune Landscape", starrysky: "Starry Sky", blossom: "Spring Blossom", autumnforest: "Autumn Forest", wintersnow: "Winter Snow", summersea: "Summer Sea" }
};

DB.AVATAR_IDS = ["crown", "knight", "wizard", "astronaut", "captain", "explorer", "champion", "master"];
DB.AVATAR_LABELS = {
  nl: { crown: "Gouden Kroon-avatar", knight: "Ridder-avatar", wizard: "Tovenaar-avatar", astronaut: "Astronaut-avatar", captain: "Kapitein-avatar", explorer: "Ontdekkingsreiziger-avatar", champion: "Kampioen-avatar", master: "Meester-avatar" },
  en: { crown: "Golden Crown Avatar", knight: "Knight Avatar", wizard: "Wizard Avatar", astronaut: "Astronaut Avatar", captain: "Captain Avatar", explorer: "Explorer Avatar", champion: "Champion Avatar", master: "Master Avatar" }
};

DB.BRAINCLUB_SQ_LAYER = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'>" +
  "<defs><g id='sq'>" +
  "<rect x='3' y='3' width='34' height='34' rx='6' fill='none' stroke='currentColor' stroke-width='3'/>" +
  "<text x='20' y='25' font-size='13' font-weight='700' text-anchor='middle' fill='currentColor'>abc</text>" +
  "</g></defs>" +
  "<g style='color:#a78bfa'><use href='#sq' transform='translate(420 70) rotate(-6) scale(1.4)'/></g>" +
  "</svg>";

DB.BRAINCLUB_TILE = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'>" +
  "<defs>" +
  "<path id='pc' d='M4 4 H24 C24 -4 40 -4 40 4 H60 V24 C68 24 68 40 60 40 V60 H40 C40 52 24 52 24 60 H4 V40 C12 40 12 24 4 24 Z'/>" +
  "<g id='br'>" +
  "<path d='M20 10 C14 4 4 6 2 14 C-4 14 -6 24 0 28 C-4 34 0 42 8 42 C8 48 16 50 20 46 C24 50 32 48 32 42 C40 42 44 34 40 28 C46 24 44 14 38 14 C36 6 26 4 20 10 Z' fill='#ff9db8' stroke='#e0648a' stroke-width='2.5' stroke-linejoin='round'/>" +
  "<path d='M20 10 Q17 26 20 46' fill='none' stroke='#e0648a' stroke-width='2.5' stroke-linecap='round'/>" +
  "<path d='M9 16 Q13 20 9 24' fill='none' stroke='#ffd6e2' stroke-width='2.5' stroke-linecap='round'/>" +
  "<path d='M31 16 Q27 20 31 24' fill='none' stroke='#ffd6e2' stroke-width='2.5' stroke-linecap='round'/>" +
  "<path d='M6 30 Q10 33 7 37' fill='none' stroke='#ffd6e2' stroke-width='2' stroke-linecap='round'/>" +
  "<path d='M34 30 Q30 33 33 37' fill='none' stroke='#ffd6e2' stroke-width='2' stroke-linecap='round'/>" +
  "</g>" +
  "<g id='ws'>" +
  "<rect x='3' y='3' width='34' height='34' rx='6' fill='none' stroke='currentColor' stroke-width='3'/>" +
  "<line x1='10' y1='10' x2='30' y2='30' stroke='currentColor' stroke-width='3' stroke-linecap='round'/>" +
  "<g font-size='8' font-weight='700' text-anchor='middle' fill='currentColor'>" +
  "<text x='10' y='13'>C</text><text x='20' y='13'>R</text><text x='30' y='13'>M</text>" +
  "<text x='10' y='23'>S</text><text x='20' y='23'>A</text><text x='30' y='23'>D</text>" +
  "<text x='10' y='33'>P</text><text x='20' y='33'>L</text><text x='30' y='33'>T</text>" +
  "</g>" +
  "</g>" +
  "<g id='su'>" +
  "<rect x='3' y='3' width='34' height='34' rx='5' fill='none' stroke='currentColor' stroke-width='3'/>" +
  "<line x1='20' y1='3' x2='20' y2='37' stroke='currentColor' stroke-width='2.5'/>" +
  "<line x1='3' y1='20' x2='37' y2='20' stroke='currentColor' stroke-width='2.5'/>" +
  "<text x='11' y='15' font-size='11' font-weight='700' text-anchor='middle' fill='currentColor'>1</text>" +
  "<text x='29' y='15' font-size='11' font-weight='700' text-anchor='middle' fill='currentColor'>2</text>" +
  "<text x='11' y='33' font-size='11' font-weight='700' text-anchor='middle' fill='currentColor'>3</text>" +
  "<text x='29' y='33' font-size='11' font-weight='700' text-anchor='middle' fill='currentColor'>4</text>" +
  "</g>" +
  "</defs>" +
  "<g fill='#ff9f5a' stroke='#fff' stroke-width='3' stroke-linejoin='round'><use href='#pc' transform='translate(75 75) rotate(15) scale(0.85)'/></g>" +
  "<g style='color:#ffffff' opacity='0.9'><use href='#br' transform='translate(220 60) rotate(-8) scale(0.85)'/></g>" +
  "<g fill='#3b82f6' stroke='#fff' stroke-width='3' stroke-linejoin='round'><use href='#pc' transform='translate(240 220) rotate(-20) scale(0.8)'/></g>" +
  "<g fill='#6ee7b7' stroke='#fff' stroke-width='3' stroke-linejoin='round'><use href='#pc' transform='translate(270 130) rotate(10) scale(0.7)'/></g>" +
  "<g style='color:#93c5fd'><use href='#su' transform='translate(70 230) rotate(6) scale(1.0)'/></g>" +
  "<g style='color:#ffd166'><use href='#ws' transform='translate(170 160) rotate(-10) scale(0.85)'/></g>" +
  "</svg>";

DB.BRAINCLUB_GRADIENT_CSS = "linear-gradient(135deg, #f3e8ff 0%, #c9a3ff 50%, #60a5fa 100%)";

DB.BACKGROUND_SCENES = {
  "sunrise": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'>" +
    "<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>" +
    "<stop offset='0' stop-color='#fff1c4'/><stop offset='0.55' stop-color='#ffb37b'/><stop offset='1' stop-color='#ff7eb3'/>" +
    "</linearGradient></defs>" +
    "<rect width='800' height='450' fill='url(#g)'/>" +
    "<g fill='#fff' opacity='0.55'>" +
    "<ellipse cx='140' cy='90' rx='55' ry='18'/><ellipse cx='185' cy='80' rx='40' ry='15'/>" +
    "<ellipse cx='620' cy='60' rx='60' ry='20'/><ellipse cx='670' cy='72' rx='38' ry='14'/>" +
    "</g>" +
    "<g stroke='#ffdd88' stroke-width='4' opacity='0.7'>" +
    "<line x1='400' y1='150' x2='400' y2='190'/><line x1='330' y1='175' x2='355' y2='205'/><line x1='470' y1='175' x2='445' y2='205'/>" +
    "<line x1='300' y1='230' x2='335' y2='235'/><line x1='500' y1='230' x2='465' y2='235'/>" +
    "</g>" +
    "<circle cx='400' cy='320' r='95' fill='#ffe08a'/>" +
    "<circle cx='400' cy='320' r='95' fill='#ffcf5c' opacity='0.5'/>" +
    "<path d='M0 360 Q200 300 400 350 T800 345 V450 H0 Z' fill='#f4935a'/>" +
    "<path d='M0 405 Q250 355 500 400 T800 385 V450 H0 Z' fill='#c25f3c'/>" +
    "<path d='M40 340 q18 -22 36 0' stroke='#8a3b2b' stroke-width='3' fill='none'/>" +
    "<path d='M700 355 q18 -22 36 0' stroke='#8a3b2b' stroke-width='3' fill='none'/>" +
    "</svg>",
  "aurora": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'>" +
    "<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>" +
    "<stop offset='0' stop-color='#060d20'/><stop offset='1' stop-color='#0e1c2e'/>" +
    "</linearGradient></defs>" +
    "<rect width='800' height='450' fill='url(#g)'/>" +
    "<g fill='#fff'>" +
    "<circle cx='120' cy='60' r='2'/><circle cx='260' cy='40' r='1.6'/><circle cx='500' cy='70' r='2.2'/>" +
    "<circle cx='650' cy='35' r='1.6'/><circle cx='740' cy='90' r='1.8'/><circle cx='60' cy='140' r='1.6'/>" +
    "<circle cx='420' cy='30' r='1.6'/><circle cx='320' cy='150' r='1.4'/>" +
    "</g>" +
    "<path d='M290 45 l4 10 10 2 -10 3 -4 10 -4 -10 -10 -3 10 -2 Z' fill='#fff'/>" +
    "<path d='M580 110 l3 8 8 2 -8 2 -3 8 -3 -8 -8 -2 8 -2 Z' fill='#fff'/>" +
    "<path d='M0 60 Q300 8 500 52 T800 28 L800 55 Q600 78 500 68 Q300 32 0 88 Z' fill='#86efac' opacity='0.35'/>" +
    "<path d='M0 90 Q200 18 400 68 T800 38 L800 88 Q600 112 400 102 Q200 52 0 132 Z' fill='#4fd1c5' opacity='0.5'/>" +
    "<path d='M0 160 Q220 68 420 138 T800 98 L800 168 Q600 214 400 190 Q220 128 0 208 Z' fill='#4ade80' opacity='0.6'/>" +
    "<path d='M0 230 Q250 128 480 208 T800 158 L800 228 Q600 268 400 248 Q250 188 0 285 Z' fill='#a78bfa' opacity='0.4'/>" +
    "<path d='M0 420 L55 300 L80 340 L120 270 L165 420 Z' fill='#050a14'/>" +
    "<path d='M600 420 L650 290 L685 335 L730 260 L800 420 Z' fill='#050a14'/>" +
    "</svg>",
  "dunes": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'>" +
    "<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>" +
    "<stop offset='0' stop-color='#fdf6e3'/><stop offset='1' stop-color='#bfe3f7'/>" +
    "</linearGradient></defs>" +
    "<rect width='800' height='450' fill='url(#g)'/>" +
    "<circle cx='650' cy='90' r='48' fill='#fff6d8'/>" +
    "<g fill='#fff' opacity='0.7'><ellipse cx='170' cy='70' rx='45' ry='15'/><ellipse cx='215' cy='60' rx='30' ry='12'/></g>" +
    "<path d='M400 190 q90 -80 170 0' stroke='#8fbfe0' stroke-width='3' fill='none' opacity='0.7'/>" +
    "<path d='M120 220 l-16 -8 M120 220 l-4 -18 M120 220 l16 -8' stroke='#3b82f6' stroke-width='2'/>" +
    "<path d='M0 260 Q200 195 400 250 T800 225 V450 H0 Z' fill='#f2d9a1'/>" +
    "<g stroke='#d9b877' stroke-width='3' opacity='0.8'>" +
    "<path d='M90 258 q6 -14 12 0'/><path d='M260 240 q6 -14 12 0'/><path d='M520 235 q6 -14 12 0'/><path d='M700 232 q6 -14 12 0'/>" +
    "</g>" +
    "<path d='M0 320 Q220 258 460 310 T800 288 V450 H0 Z' fill='#e6c284'/>" +
    "<path d='M0 380 Q250 338 500 380 T800 358 V450 H0 Z' fill='#d1a765'/>" +
    "</svg>",
  "starrysky": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'>" +
    "<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>" +
    "<stop offset='0' stop-color='#0b1030'/><stop offset='1' stop-color='#241b4f'/>" +
    "</linearGradient></defs>" +
    "<rect width='800' height='450' fill='url(#g)'/>" +
    "<circle cx='620' cy='90' r='40' fill='#fef3c7'/><circle cx='605' cy='80' r='34' fill='#241b4f'/>" +
    "<g fill='#fff'>" +
    "<circle cx='90' cy='60' r='1.6'/><circle cx='180' cy='110' r='1.3'/>" +
    "<circle cx='260' cy='50' r='1.8'/><circle cx='340' cy='120' r='1.2'/>" +
    "<circle cx='420' cy='60' r='1.5'/><circle cx='480' cy='150' r='1.3'/>" +
    "<circle cx='60' cy='170' r='1.4'/><circle cx='730' cy='160' r='1.6'/><circle cx='150' cy='200' r='1.2'/>" +
    "</g>" +
    "<path d='M130 75 l4 11 11 2 -11 3 -4 11 -4 -11 -11 -3 11 -2 Z' fill='#fff'/>" +
    "<path d='M380 35 l3 9 9 2 -9 2 -3 9 -3 -9 -9 -2 9 -2 Z' fill='#fff'/>" +
    "<path d='M700 55 l3 9 9 2 -9 2 -3 9 -3 -9 -9 -2 9 -2 Z' fill='#fff'/>" +
    "<line x1='60' y1='40' x2='140' y2='90' stroke='#fff' stroke-width='2' opacity='0.7'/>" +
    "<path d='M0 380 L150 290 L200 330 L300 260 L340 380 Z' fill='#3a2f6e'/>" +
    "<path d='M250 400 L420 270 L470 310 L600 240 L650 400 Z' fill='#2c2360'/>" +
    "<path d='M520 400 L680 300 L730 340 L800 280 V400 Z' fill='#3a2f6e'/>" +
    "</svg>",
  "blossom": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'>" +
    "<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>" +
    "<stop offset='0' stop-color='#fff0f6'/><stop offset='1' stop-color='#d9f5e3'/>" +
    "</linearGradient></defs>" +
    "<rect width='800' height='450' fill='url(#g)'/>" +
    "<path d='M-20 40 Q200 120 380 60 T760 90' stroke='#a9744f' stroke-width='10' fill='none'/>" +
    "<path d='M-20 40 Q200 120 380 60' stroke='#7d5638' stroke-width='4' fill='none'/>" +
    "<path d='M550 70 Q620 20 700 55' stroke='#7d5638' stroke-width='5' fill='none'/>" +
    "<path d='M-20 280 Q120 190 270 225' stroke='#a9744f' stroke-width='9' fill='none'/>" +
    "<path d='M-20 280 Q120 190 270 225' stroke='#7d5638' stroke-width='3.5' fill='none'/>" +
    "<path d='M820 320 Q680 235 555 265' stroke='#a9744f' stroke-width='9' fill='none'/>" +
    "<path d='M820 320 Q680 235 555 265' stroke='#7d5638' stroke-width='3.5' fill='none'/>" +
    "<path d='M-20 130 Q100 60 220 100' stroke='#a9744f' stroke-width='8' fill='none'/>" +
    "<path d='M-20 130 Q100 60 220 100' stroke='#7d5638' stroke-width='3' fill='none'/>" +
    "<path d='M820 150 Q700 190 580 155' stroke='#a9744f' stroke-width='8' fill='none'/>" +
    "<path d='M820 150 Q700 190 580 155' stroke='#7d5638' stroke-width='3' fill='none'/>" +
    "<path d='M380 -10 Q430 70 500 30' stroke='#a9744f' stroke-width='8' fill='none'/>" +
    "<path d='M380 -10 Q430 70 500 30' stroke='#7d5638' stroke-width='3' fill='none'/>" +
    "<path d='M300 460 Q380 350 460 385' stroke='#a9744f' stroke-width='8' fill='none'/>" +
    "<path d='M300 460 Q380 350 460 385' stroke='#7d5638' stroke-width='3' fill='none'/>" +
    "<g fill='#ffb6d9'>" +
    "<circle cx='50' cy='70' r='11'/><circle cx='78' cy='58' r='11'/><circle cx='80' cy='88' r='11'/><circle cx='108' cy='70' r='11'/>" +
    "<circle cx='120' cy='55' r='12'/><circle cx='150' cy='43' r='12'/><circle cx='152' cy='75' r='12'/><circle cx='182' cy='55' r='12'/>" +
    "<circle cx='260' cy='95' r='10'/><circle cx='286' cy='84' r='10'/><circle cx='288' cy='110' r='10'/><circle cx='314' cy='95' r='10'/>" +
    "<circle cx='340' cy='55' r='12'/><circle cx='370' cy='43' r='12'/><circle cx='372' cy='75' r='12'/><circle cx='402' cy='55' r='12'/>" +
    "<circle cx='470' cy='85' r='10'/><circle cx='496' cy='74' r='10'/><circle cx='498' cy='100' r='10'/><circle cx='524' cy='85' r='10'/>" +
    "<circle cx='600' cy='80' r='12'/><circle cx='630' cy='68' r='12'/><circle cx='632' cy='100' r='12'/><circle cx='662' cy='80' r='12'/>" +
    "<circle cx='700' cy='50' r='10'/><circle cx='726' cy='39' r='10'/><circle cx='728' cy='65' r='10'/><circle cx='754' cy='50' r='10'/>" +
    "<circle cx='40' cy='245' r='11'/><circle cx='68' cy='233' r='11'/><circle cx='70' cy='263' r='11'/><circle cx='98' cy='245' r='11'/>" +
    "<circle cx='160' cy='210' r='10'/><circle cx='186' cy='199' r='10'/><circle cx='188' cy='225' r='10'/><circle cx='214' cy='210' r='10'/>" +
    "<circle cx='760' cy='280' r='11'/><circle cx='788' cy='268' r='11'/><circle cx='790' cy='298' r='11'/><circle cx='818' cy='280' r='11'/>" +
    "<circle cx='650' cy='245' r='10'/><circle cx='676' cy='234' r='10'/><circle cx='678' cy='260' r='10'/><circle cx='704' cy='245' r='10'/>" +
    "<circle cx='10' cy='100' r='10'/><circle cx='38' cy='88' r='10'/><circle cx='40' cy='118' r='10'/><circle cx='68' cy='100' r='10'/>" +
    "<circle cx='130' cy='70' r='10'/><circle cx='158' cy='58' r='10'/><circle cx='160' cy='88' r='10'/><circle cx='188' cy='70' r='10'/>" +
    "<circle cx='760' cy='180' r='10'/><circle cx='788' cy='168' r='10'/><circle cx='790' cy='198' r='10'/><circle cx='818' cy='180' r='10'/>" +
    "<circle cx='630' cy='150' r='10'/><circle cx='658' cy='138' r='10'/><circle cx='660' cy='168' r='10'/><circle cx='688' cy='150' r='10'/>" +
    "<circle cx='380' cy='15' r='10'/><circle cx='408' cy='3' r='10'/><circle cx='410' cy='33' r='10'/><circle cx='438' cy='15' r='10'/>" +
    "<circle cx='450' cy='45' r='10'/><circle cx='478' cy='33' r='10'/><circle cx='480' cy='63' r='10'/><circle cx='508' cy='45' r='10'/>" +
    "<circle cx='310' cy='395' r='10'/><circle cx='338' cy='383' r='10'/><circle cx='340' cy='413' r='10'/><circle cx='368' cy='395' r='10'/>" +
    "<circle cx='410' cy='355' r='10'/><circle cx='438' cy='343' r='10'/><circle cx='440' cy='373' r='10'/><circle cx='468' cy='355' r='10'/>" +
    "</g>" +
    "<g fill='#ff8fc0'>" +
    "<circle cx='79' cy='73' r='4'/><circle cx='151' cy='58' r='5'/><circle cx='287' cy='97' r='4'/>" +
    "<circle cx='371' cy='58' r='5'/><circle cx='497' cy='87' r='4'/><circle cx='631' cy='83' r='5'/><circle cx='727' cy='52' r='4'/>" +
    "<circle cx='409' cy='18' r='4'/><circle cx='479' cy='48' r='4'/><circle cx='339' cy='398' r='4'/><circle cx='439' cy='358' r='4'/>" +
    "<circle cx='39' cy='103' r='4'/><circle cx='159' cy='73' r='4'/><circle cx='789' cy='183' r='4'/><circle cx='659' cy='153' r='4'/>" +
    "<circle cx='69' cy='248' r='4'/><circle cx='187' cy='213' r='4'/><circle cx='789' cy='283' r='4'/><circle cx='677' cy='248' r='4'/>" +
    "</g>" +
    "<g fill='#e35fa0' opacity='0.85'>" +
    "<path d='M40 250 q10 -12 20 0 q-10 6 -20 0Z'/><path d='M150 190 q9 -11 18 0 q-9 5 -18 0Z'/>" +
    "<path d='M220 320 q10 -12 20 0 q-10 6 -20 0Z'/><path d='M340 260 q9 -11 18 0 q-9 5 -18 0Z'/>" +
    "<path d='M460 210 q10 -12 20 0 q-10 6 -20 0Z'/><path d='M540 300 q9 -11 18 0 q-9 5 -18 0Z'/>" +
    "<path d='M600 350 q10 -12 20 0 q-10 6 -20 0Z'/><path d='M720 200 q9 -11 18 0 q-9 5 -18 0Z'/>" +
    "</g>" +
    "<g fill='#ffd6ea' opacity='0.85'>" +
    "<ellipse cx='80' cy='220' rx='7' ry='4'/><ellipse cx='180' cy='150' rx='6' ry='3'/><ellipse cx='260' cy='300' rx='7' ry='4'/>" +
    "<ellipse cx='400' cy='170' rx='6' ry='3'/><ellipse cx='500' cy='200' rx='7' ry='4'/><ellipse cx='560' cy='140' rx='6' ry='3'/>" +
    "<ellipse cx='620' cy='340' rx='7' ry='4'/><ellipse cx='700' cy='240' rx='7' ry='4'/><ellipse cx='760' cy='150' rx='6' ry='3'/>" +
    "</g>" +
    "<path d='M0 380 Q250 335 500 380 T800 368 V450 H0 Z' fill='#c8ecd4'/>" +
    "</svg>",
  "autumnforest": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'>" +
    "<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>" +
    "<stop offset='0' stop-color='#fff3d6'/><stop offset='1' stop-color='#e07a3e'/>" +
    "</linearGradient></defs>" +
    "<rect width='800' height='450' fill='url(#g)'/>" +
    "<circle cx='120' cy='80' r='38' fill='#ffe9ae' opacity='0.8'/>" +
    "<rect x='4' y='250' width='16' height='130' fill='#5a3820'/>" +
    "<circle cx='-10' cy='225' r='48' fill='#8b3a2b'/><circle cx='28' cy='210' r='52' fill='#a8461f'/><circle cx='8' cy='185' r='42' fill='#c0392b'/>" +
    "<rect x='95' y='260' width='13' height='90' fill='#5a3820'/><ellipse cx='101' cy='352' rx='22' ry='7' fill='#5a3820'/>" +
    "<circle cx='85' cy='245' r='36' fill='#c0392b'/><circle cx='115' cy='230' r='40' fill='#e0642e'/><circle cx='100' cy='210' r='34' fill='#d35400'/>" +
    "<rect x='172' y='275' width='11' height='75' fill='#6b4226'/>" +
    "<circle cx='163' cy='260' r='30' fill='#a8461f'/><circle cx='190' cy='250' r='32' fill='#d35400'/>" +
    "<rect x='245' y='240' width='13' height='110' fill='#5a3820'/><ellipse cx='251' cy='352' rx='24' ry='7' fill='#5a3820'/>" +
    "<circle cx='232' cy='220' r='42' fill='#e67e22'/><circle cx='268' cy='205' r='46' fill='#c0392b'/><circle cx='250' cy='180' r='38' fill='#f1a13a'/>" +
    "<rect x='415' y='270' width='13' height='80' fill='#6b4226'/>" +
    "<circle cx='405' cy='255' r='32' fill='#d35400'/><circle cx='435' cy='245' r='34' fill='#c0392b'/>" +
    "<rect x='505' y='280' width='11' height='70' fill='#6b4226'/>" +
    "<circle cx='497' cy='265' r='28' fill='#c0392b'/><circle cx='522' cy='258' r='30' fill='#e67e22'/>" +
    "<rect x='585' y='230' width='13' height='120' fill='#5a3820'/><ellipse cx='591' cy='352' rx='24' ry='7' fill='#5a3820'/>" +
    "<circle cx='572' cy='210' r='44' fill='#c0392b'/><circle cx='608' cy='195' r='48' fill='#e67e22'/><circle cx='590' cy='170' r='36' fill='#f1a13a'/>" +
    "<rect x='715' y='260' width='13' height='90' fill='#5a3820'/><ellipse cx='721' cy='352' rx='22' ry='7' fill='#5a3820'/>" +
    "<circle cx='702' cy='245' r='34' fill='#e67e22'/><circle cx='735' cy='235' r='36' fill='#c0392b'/>" +
    "<rect x='784' y='245' width='16' height='135' fill='#5a3820'/>" +
    "<circle cx='772' cy='220' r='46' fill='#a8461f'/><circle cx='808' cy='210' r='50' fill='#8b3a2b'/><circle cx='790' cy='185' r='40' fill='#c0392b'/>" +
    "<line x1='100' y1='215' x2='70' y2='170' stroke='#5a3820' stroke-width='4'/>" +
    "<line x1='590' y1='175' x2='620' y2='125' stroke='#5a3820' stroke-width='4'/>" +
    "<line x1='250' y1='185' x2='225' y2='140' stroke='#5a3820' stroke-width='3'/>" +
    "<line x1='435' y1='230' x2='460' y2='190' stroke='#5a3820' stroke-width='3'/>" +
    "<line x1='720' y1='220' x2='695' y2='175' stroke='#5a3820' stroke-width='3'/>" +
    "<line x1='30' y1='195' x2='5' y2='150' stroke='#5a3820' stroke-width='4'/>" +
    "<line x1='340' y1='290' x2='340' y2='250' stroke='#4a2f1a' stroke-width='7'/>" +
    "<path d='M308 302 L340 218 L372 302 Z' fill='#2f6b4f'/>" +
    "<path d='M315 342 L340 258 L365 342 Z' fill='#357a5b'/>" +
    "<path d='M320 375 L340 302 L360 375 Z' fill='#3d8a68'/>" +
    "<line x1='660' y1='300' x2='660' y2='265' stroke='#4a2f1a' stroke-width='6'/>" +
    "<path d='M634 312 L660 240 L686 312 Z' fill='#2f6b4f'/>" +
    "<path d='M640 347 L660 275 L680 347 Z' fill='#357a5b'/>" +
    "<line x1='755' y1='320' x2='755' y2='290' stroke='#4a2f1a' stroke-width='5'/>" +
    "<path d='M733 330 L755 268 L777 330 Z' fill='#357a5b'/>" +
    "<path d='M738 358 L755 305 L772 358 Z' fill='#3d8a68'/>" +
    "<ellipse cx='450' cy='405' rx='55' ry='15' fill='#4a2f1a'/><ellipse cx='450' cy='400' rx='50' ry='10' fill='#6b4226'/>" +
    "<ellipse cx='450' cy='397' rx='38' ry='5' fill='#3d8a68' opacity='0.7'/>" +
    "<ellipse cx='140' cy='410' rx='48' ry='13' fill='#4a2f1a'/><ellipse cx='140' cy='406' rx='44' ry='9' fill='#6b4226'/>" +
    "<g stroke='#2f6b4f' stroke-width='4' opacity='0.85'>" +
    "<path d='M92 392 q-4 -16 4 -22'/><path d='M104 392 q4 -16 -2 -24'/>" +
    "<path d='M255 415 q-4 -16 4 -22'/><path d='M267 415 q4 -16 -2 -24'/>" +
    "<path d='M588 420 q-4 -16 4 -22'/><path d='M600 420 q4 -16 -2 -24'/>" +
    "<path d='M735 396 q-4 -16 4 -22'/><path d='M747 396 q4 -16 -2 -24'/>" +
    "<path d='M35 415 q-4 -16 4 -22'/><path d='M47 415 q4 -16 -2 -24'/>" +
    "<path d='M400 430 q-4 -16 4 -22'/><path d='M412 430 q4 -16 -2 -24'/>" +
    "<path d='M660 400 q-4 -16 4 -22'/><path d='M672 400 q4 -16 -2 -24'/>" +
    "</g>" +
    "<g fill='#6b4226'><circle cx='210' cy='398' r='4'/><circle cx='480' cy='418' r='4'/><circle cx='560' cy='398' r='4'/><circle cx='690' cy='415' r='4'/>" +
    "<circle cx='30' cy='405' r='4'/><circle cx='370' cy='425' r='4'/><circle cx='630' cy='412' r='4'/></g>" +
    "<g fill='#f4a742'>" +
    "<path d='M150 140 q8 -10 16 0 q-8 5 -16 0Z'/><path d='M330 100 q8 -10 16 0 q-8 5 -16 0Z'/>" +
    "<path d='M480 150 q8 -10 16 0 q-8 5 -16 0Z'/><path d='M650 120 q8 -10 16 0 q-8 5 -16 0Z'/>" +
    "<path d='M60 190 q8 -10 16 0 q-8 5 -16 0Z' transform='rotate(20 68 190)'/>" +
    "</g>" +
    "<g fill='#c0392b'>" +
    "<path d='M210 60 q7 -9 14 0 q-7 4 -14 0Z' transform='rotate(-30 217 60)'/>" +
    "<path d='M400 200 q8 -10 16 0 q-8 5 -16 0Z' transform='rotate(45 408 200)'/>" +
    "<path d='M540 220 q7 -9 14 0 q-7 4 -14 0Z' transform='rotate(-15 547 220)'/>" +
    "<path d='M760 130 q7 -9 14 0 q-7 4 -14 0Z' transform='rotate(60 767 130)'/>" +
    "<path d='M20 100 q7 -9 14 0 q-7 4 -14 0Z' transform='rotate(10 27 100)'/>" +
    "</g>" +
    "<g fill='#e67e22'>" +
    "<path d='M270 170 q8 -10 16 0 q-8 5 -16 0Z' transform='rotate(-40 278 170)'/>" +
    "<path d='M600 260 q7 -9 14 0 q-7 4 -14 0Z' transform='rotate(25 607 260)'/>" +
    "<path d='M120 250 q7 -9 14 0 q-7 4 -14 0Z' transform='rotate(-60 127 250)'/>" +
    "<path d='M700 190 q8 -10 16 0 q-8 5 -16 0Z' transform='rotate(15 708 190)'/>" +
    "<path d='M370 320 q7 -9 14 0 q-7 4 -14 0Z' transform='rotate(35 377 320)'/>" +
    "</g>" +
    "<g fill='#d35400'>" +
    "<path d='M90 60 q6 -8 12 0 q-6 4 -12 0Z' transform='rotate(50 96 60)'/>" +
    "<path d='M460 90 q7 -9 14 0 q-7 4 -14 0Z' transform='rotate(-20 467 90)'/>" +
    "<path d='M620 60 q6 -8 12 0 q-6 4 -12 0Z' transform='rotate(30 626 60)'/>" +
    "<path d='M290 260 q6 -8 12 0 q-6 4 -12 0Z' transform='rotate(-45 296 260)'/>" +
    "</g>" +
    "<path d='M0 355 Q250 315 500 352 T800 340 V450 H0 Z' fill='#9c5a33'/>" +
    "<path d='M0 390 Q250 355 500 388 T800 378 V450 H0 Z' fill='#8a4a2b'/>" +
    "<path d='M0 420 Q250 392 500 420 T800 410 V450 H0 Z' fill='#5c3418'/>" +
    "<path d='M0 440 Q250 425 500 440 T800 434 V450 H0 Z' fill='#3f2412'/>" +
    "<g>" +
    "<ellipse cx='45' cy='370' rx='9' ry='5' fill='#c0392b' transform='rotate(20 45 370)'/>" +
    "<ellipse cx='130' cy='385' rx='8' ry='5' fill='#e67e22' transform='rotate(-30 130 385)'/>" +
    "<ellipse cx='195' cy='368' rx='9' ry='5' fill='#f1a13a' transform='rotate(10 195 368)'/>" +
    "<ellipse cx='300' cy='400' rx='9' ry='5' fill='#c0392b' transform='rotate(-15 300 400)'/>" +
    "<ellipse cx='380' cy='378' rx='8' ry='5' fill='#e67e22' transform='rotate(35 380 378)'/>" +
    "<ellipse cx='430' cy='412' rx='9' ry='5' fill='#d35400' transform='rotate(-40 430 412)'/>" +
    "<ellipse cx='510' cy='390' rx='8' ry='5' fill='#f1a13a' transform='rotate(20 510 390)'/>" +
    "<ellipse cx='565' cy='372' rx='9' ry='5' fill='#c0392b' transform='rotate(-10 565 372)'/>" +
    "<ellipse cx='650' cy='405' rx='9' ry='5' fill='#e67e22' transform='rotate(30 650 405)'/>" +
    "<ellipse cx='700' cy='378' rx='8' ry='5' fill='#d35400' transform='rotate(-25 700 378)'/>" +
    "<ellipse cx='765' cy='398' rx='9' ry='5' fill='#f1a13a' transform='rotate(15 765 398)'/>" +
    "</g>" +
    "<g fill='#6b4226' opacity='0.8'>" +
    "<ellipse cx='90' cy='400' rx='16' ry='6'/><ellipse cx='260' cy='420' rx='18' ry='6'/><ellipse cx='450' cy='405' rx='16' ry='6'/>" +
    "<ellipse cx='620' cy='425' rx='18' ry='6'/><ellipse cx='740' cy='400' rx='16' ry='6'/>" +
    "</g>" +
    "</svg>",
  "wintersnow": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'>" +
    "<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>" +
    "<stop offset='0' stop-color='#ffffff'/><stop offset='1' stop-color='#bcd9f7'/>" +
    "</linearGradient></defs>" +
    "<rect width='800' height='450' fill='url(#g)'/>" +
    "<circle cx='130' cy='75' r='40' fill='#fff9e0' opacity='0.9'/><circle cx='130' cy='75' r='55' fill='#fff9e0' opacity='0.35'/>" +
    "<g fill='#fff' opacity='0.85'><ellipse cx='330' cy='55' rx='38' ry='14'/><ellipse cx='368' cy='48' rx='26' ry='11'/>" +
    "<ellipse cx='600' cy='50' rx='40' ry='15'/><ellipse cx='640' cy='63' rx='28' ry='12'/></g>" +
    "<path d='M-20 250 L60 130 L140 250 Z' fill='#e6f1fb'/><path d='M50 260 L150 155 L260 260 Z' fill='#d8ebf9'/>" +
    "<path d='M220 260 L320 165 L420 260 Z' fill='#e6f1fb'/><path d='M540 255 L630 150 L730 255 Z' fill='#d8ebf9'/>" +
    "<path d='M680 260 L780 170 L830 260 Z' fill='#e6f1fb'/>" +
    "<path d='M60 130 l-16 34 h32 Z' fill='#fff'/><path d='M150 155 l-17 36 h34 Z' fill='#fff'/>" +
    "<path d='M320 165 l-16 33 h32 Z' fill='#fff'/><path d='M630 150 l-17 37 h34 Z' fill='#fff'/>" +
    "<path d='M0 300 Q200 240 400 290 T800 270 V450 H0 Z' fill='#eaf4fc'/>" +
    "<path d='M0 350 Q220 300 460 340 T800 320 V450 H0 Z' fill='#d3e9f8'/>" +
    "<path d='M0 400 Q220 365 460 398 T800 385 V450 H0 Z' fill='#bcd9f7'/>" +
    "<line x1='110' y1='330' x2='110' y2='270' stroke='#4a2f1a' stroke-width='5'/>" +
    "<path d='M84 335 L110 260 L136 335 Z' fill='#2f6b4f'/><path d='M90 305 L110 245 L130 305 Z' fill='#357a5b'/>" +
    "<g fill='#fff' opacity='0.9'><ellipse cx='110' cy='335' rx='24' ry='6'/><ellipse cx='110' cy='305' rx='18' ry='5'/></g>" +
    "<line x1='680' y1='300' x2='680' y2='230' stroke='#6b4226' stroke-width='6'/>" +
    "<path d='M645 300 L680 225 L715 300 Z' fill='#2f6b4f'/><path d='M652 275 L680 200 L708 275 Z' fill='#357a5b'/>" +
    "<path d='M655 340 L680 270 L705 340 Z' fill='#3a7d5d'/>" +
    "<g fill='#fff'><ellipse cx='680' cy='300' rx='30' ry='7'/><ellipse cx='680' cy='340' rx='24' ry='6'/><ellipse cx='680' cy='260' rx='18' ry='5'/></g>" +
    "<line x1='560' y1='380' x2='560' y2='335' stroke='#4a2f1a' stroke-width='4'/>" +
    "<path d='M538 385 L560 328 L582 385 Z' fill='#357a5b'/><path d='M543 360 L560 320 L577 360 Z' fill='#3d8a68'/>" +
    "<ellipse cx='560' cy='385' rx='16' ry='4' fill='#fff' opacity='0.9'/>" +
    "<circle cx='240' cy='400' r='30' fill='#f5fbff'/><circle cx='240' cy='355' r='22' fill='#f5fbff'/><circle cx='240' cy='320' r='15' fill='#f5fbff'/>" +
    "<circle cx='233' cy='317' r='2.2' fill='#333'/><circle cx='247' cy='317' r='2.2' fill='#333'/>" +
    "<path d='M240 322 l10 3 -10 3 Z' fill='#e67e22'/>" +
    "<circle cx='240' cy='352' r='2' fill='#333'/><circle cx='240' cy='360' r='2' fill='#333'/>" +
    "<path d='M218 340 L195 320 M262 340 L285 322' stroke='#4a2f1a' stroke-width='3'/>" +
    "<path d='M228 300 q12 -10 24 0' stroke='#c0392b' stroke-width='6' fill='none'/>" +
    "<path d='M362 415 Q392 405 422 415' stroke='#8a4a2b' stroke-width='7' fill='none'/>" +
    "<path d='M368 410 L416 410 L410 400 L374 400 Z' fill='#c0392b'/>" +
    "<circle cx='392' cy='383' r='9' fill='#ffd9b3'/>" +
    "<path d='M383 378 q9 -14 18 0 Z' fill='#e11d48'/><circle cx='401' cy='378' r='2.5' fill='#fff'/>" +
    "<ellipse cx='392' cy='400' rx='13' ry='16' fill='#3b82f6'/>" +
    "<path d='M379 396 L364 405 M405 396 L419 402' stroke='#3b82f6' stroke-width='5' stroke-linecap='round'/>" +
    "<ellipse cx='500' cy='413' rx='11' ry='5' fill='#eaf4fc' opacity='0.9'/>" +
    "<ellipse cx='500' cy='398' rx='14' ry='18' fill='#f59e0b'/>" +
    "<circle cx='500' cy='378' r='10' fill='#ffd9b3'/>" +
    "<path d='M490 373 q10 -15 20 0 Z' fill='#16a34a'/><circle cx='510' cy='373' r='2.5' fill='#fff'/>" +
    "<path d='M488 392 Q478 388 472 393' stroke='#f59e0b' stroke-width='5' stroke-linecap='round' fill='none'/>" +
    "<path d='M512 392 Q522 388 528 393' stroke='#f59e0b' stroke-width='5' stroke-linecap='round' fill='none'/>" +
    "<circle cx='470' cy='396' r='6' fill='#fff'/>" +
    "<path d='M492 412 L486 425 M508 412 L514 425' stroke='#f59e0b' stroke-width='5' stroke-linecap='round'/>" +
    "<g stroke='#fff' stroke-width='2' opacity='0.9'>" +
    "<path d='M90 65 v10 M85 70 h10'/><path d='M200 35 v10 M195 40 h10'/><path d='M320 85 v10 M315 90 h10'/>" +
    "<path d='M450 45 v10 M445 50 h10'/><path d='M560 95 v10 M555 100 h10'/><path d='M150 145 v10 M145 150 h10'/>" +
    "<path d='M40 200 v8 M36 204 h8'/><path d='M480 150 v8 M476 154 h8'/><path d='M730 90 v9 M725 94 h10'/>" +
    "<path d='M620 200 v8 M616 204 h8'/><path d='M380 130 v8 M376 134 h8'/><path d='M20 100 v7 M16 104 h8'/>" +
    "<path d='M760 220 v8 M756 224 h8'/><path d='M500 230 v8 M496 234 h8'/><path d='M340 190 v7 M336 194 h7'/>" +
    "</g>" +
    "<g fill='#fff' opacity='0.85'>" +
    "<circle cx='110' cy='230' r='2.5'/><circle cx='260' cy='120' r='2'/><circle cx='400' cy='250' r='2.5'/>" +
    "<circle cx='530' cy='180' r='2'/><circle cx='650' cy='140' r='2.5'/><circle cx='60' cy='280' r='2'/>" +
    "</g>" +
    "</svg>",
  "summersea": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'>" +
    "<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>" +
    "<stop offset='0' stop-color='#fffde7'/><stop offset='0.55' stop-color='#a3e4e0'/><stop offset='1' stop-color='#1f8fa3'/>" +
    "</linearGradient></defs>" +
    "<rect width='800' height='450' fill='url(#g)'/>" +
    "<circle cx='650' cy='90' r='45' fill='#ffe08a'/>" +
    "<g stroke='#ffdd88' stroke-width='4' opacity='0.8'>" +
    "<line x1='650' y1='20' x2='650' y2='36'/><line x1='650' y1='144' x2='650' y2='160'/>" +
    "<line x1='580' y1='90' x2='596' y2='90'/><line x1='704' y1='90' x2='720' y2='90'/>" +
    "<line x1='608' y1='48' x2='620' y2='60'/><line x1='692' y1='48' x2='680' y2='60'/>" +
    "<line x1='608' y1='132' x2='620' y2='120'/><line x1='692' y1='132' x2='680' y2='120'/>" +
    "</g>" +
    "<g fill='#fff' opacity='0.85'><ellipse cx='500' cy='45' rx='34' ry='13'/><ellipse cx='534' cy='38' rx='24' ry='10'/></g>" +
    "<path d='M120 170 q14 -10 28 0 q14 -10 28 0' stroke='#333' stroke-width='3' fill='none'/>" +
    "<path d='M480 140 q14 -10 28 0 q14 -10 28 0' stroke='#333' stroke-width='3' fill='none'/>" +
    "<path d='M700 100 q12 -9 24 0 q12 -9 24 0' stroke='#333' stroke-width='3' fill='none'/>" +
    "<path d='M300 320 l60 -55 h14 l60 55 Z' fill='#fff' opacity='0.9'/><rect x='355' y='230' width='4' height='90' fill='#8a5a2b'/>" +
    "<path d='M0 280 Q200 245 400 280 T800 265 V450 H0 Z' fill='#2fa7ab'/>" +
    "<path d='M0 330 Q220 295 460 330 T800 315 V450 H0 Z' fill='#1f8fa3'/>" +
    "<path d='M0 390 Q250 358 500 390 T800 378 V450 H0 Z' fill='#166f82'/>" +
    "<g stroke='#fff' stroke-width='3' fill='none' opacity='0.85'>" +
    "<path d='M100 275 q12 -16 24 0 q12 -16 24 0'/><path d='M480 260 q12 -16 24 0 q12 -16 24 0'/>" +
    "<path d='M620 300 q12 -16 24 0 q12 -16 24 0'/>" +
    "</g>" +
    "<path d='M-10 450 L-10 300 Q140 275 270 335 Q210 405 110 450 Z' fill='#ffe4a3'/>" +
    "<path d='M-10 320 Q140 295 270 340' stroke='#ffd280' stroke-width='6' fill='none' opacity='0.8'/>" +
    "<g fill='#f5c56b' opacity='0.7'><circle cx='40' cy='400' r='3'/><circle cx='90' cy='420' r='3'/><circle cx='150' cy='390' r='3'/>" +
    "<circle cx='20' cy='360' r='3'/><circle cx='190' cy='410' r='3'/></g>" +
    "<path d='M25 448 Q40 430 60 445 Q45 435 25 448Z' fill='#fff' opacity='0.8'/>" +
    "<path d='M175 440 l6 -14 6 14 -6 -4 Z' fill='#e8734a'/>" +
    "<path d='M15 445 Q30 448 15 452 Q0 448 15 445Z' fill='#e8734a'/>" +
    "<path d='M40 452 Q10 300 55 175' stroke='#8a5a2b' stroke-width='9' fill='none'/>" +
    "<g stroke='#2f9e52' stroke-width='9' stroke-linecap='round' fill='none'>" +
    "<path d='M55 175 Q10 140 -30 155'/><path d='M55 175 Q0 165 -35 200'/><path d='M55 175 Q95 130 140 135'/>" +
    "<path d='M55 175 Q100 160 130 190'/><path d='M55 175 Q40 120 60 90'/>" +
    "</g>" +
    "<circle cx='48' cy='185' r='7' fill='#6b4226'/><circle cx='62' cy='190' r='7' fill='#5a3820'/>" +
    "<line x1='150' y1='390' x2='150' y2='295' stroke='#e8734a' stroke-width='5'/>" +
    "<path d='M100 298 A50 42 0 0 1 200 298 Z' fill='#ff5b6e'/>" +
    "<path d='M100 298 A50 42 0 0 1 130 260 Z' fill='#fff'/>" +
    "<path d='M170 262 A50 42 0 0 1 200 298 Z' fill='#fff'/>" +
    "<path d='M100 298 Q150 315 200 298' stroke='#e8734a' stroke-width='3' fill='none'/>" +
    "<g transform='translate(210,365) rotate(-12)'>" +
    "<rect x='-32' y='-10' width='64' height='20' rx='4' fill='#fff'/>" +
    "<rect x='-32' y='-10' width='64' height='7' fill='#ff5b6e'/><rect x='-32' y='3' width='64' height='7' fill='#3b82f6'/>" +
    "</g>" +
    "<g transform='translate(58,360)'>" +
    "<circle r='16' fill='#fff'/>" +
    "<path d='M0 -16 A16 16 0 0 1 14 -8 L0 0 Z' fill='#ff5b6e'/><path d='M14 -8 A16 16 0 0 1 14 8 L0 0 Z' fill='#3b82f6'/>" +
    "<path d='M14 8 A16 16 0 0 1 0 16 L0 0 Z' fill='#ffd23f'/><path d='M-14 8 A16 16 0 0 1 -14 -8 L0 0 Z' fill='#2f9e52'/>" +
    "<path d='M0 -16 A16 16 0 0 0 -14 -8 L0 0 Z' fill='#ff5b6e'/><path d='M0 16 A16 16 0 0 0 14 8 L0 0 Z' fill='#3b82f6'/>" +
    "</g>" +
    "<g transform='translate(178,412)'>" +
    "<rect x='-26' y='-6' width='52' height='10' rx='2' fill='#fff'/>" +
    "<rect x='-26' y='-6' width='52' height='4' fill='#38bdf8'/>" +
    "<g transform='translate(-24,-6) rotate(-55)'>" +
    "<rect x='0' y='-32' width='10' height='34' rx='2' fill='#fff'/>" +
    "<rect x='0' y='-32' width='10' height='12' fill='#38bdf8'/><rect x='0' y='-12' width='10' height='10' fill='#38bdf8'/>" +
    "</g>" +
    "<line x1='-20' y1='4' x2='-20' y2='16' stroke='#8a5a2b' stroke-width='3'/>" +
    "<line x1='20' y1='4' x2='20' y2='16' stroke='#8a5a2b' stroke-width='3'/>" +
    "</g>" +
    "<g transform='translate(248,428)'>" +
    "<path d='M-9 0 L9 0 L0 22 Z' fill='#e8a33d'/>" +
    "<path d='M-7 3 L7 3 M-5 9 L5 9 M-3 15 L3 15' stroke='#c97f1f' stroke-width='1.3'/>" +
    "<circle cx='0' cy='-9' r='11' fill='#ffb6d9'/><circle cx='0' cy='-22' r='9' fill='#fff3c4'/>" +
    "<circle cx='-3' cy='-26' r='2' fill='#ff5b6e'/>" +
    "</g>" +
    "<g transform='translate(430,285)'>" +
    "<ellipse cx='0' cy='7' rx='30' ry='8' fill='#0b3a45' opacity='0.12'/>" +
    "<circle r='24' fill='none' stroke='#ff5b6e' stroke-width='13'/>" +
    "<circle r='24' fill='none' stroke='#fff' stroke-width='13' stroke-dasharray='13 13'/>" +
    "<circle r='11' fill='#7fd0cc'/>" +
    "</g>" +
    "</svg>"
};

DB.AVATAR_STYLES = {
  crown: { emoji: "👑", bg: "linear-gradient(135deg,#ffe08a,#f59e0b)" },
  knight: { emoji: "🛡️", bg: "linear-gradient(135deg,#e2e8f0,#94a3b8)" },
  wizard: { emoji: "🧙", bg: "linear-gradient(135deg,#e0c3ff,#7c3aed)" },
  astronaut: { emoji: "👨‍🚀", bg: "linear-gradient(135deg,#c2d9ff,#3b5bdb)" },
  captain: { emoji: "🧑‍✈️", bg: "linear-gradient(135deg,#bcdfff,#1e6091)" },
  explorer: { emoji: "🧭", bg: "linear-gradient(135deg,#c8f2d4,#16a34a)" },
  champion: { emoji: "🏆", bg: "linear-gradient(135deg,#ffe4a8,#ea9a1e)" },
  master: { emoji: "🎓", bg: "linear-gradient(135deg,#f3d9ff,#ec4899)" }
};

DB.cycleItem = function (list, n) {
  return list[(n - 1) % list.length];
};

DB.svgBackgroundUrl = function (svg) {
  var encoded = encodeURIComponent(svg).replace(/'/g, "%27");
  return "url('data:image/svg+xml," + encoded + "')";
};

DB.applyTheme = function (state) {
  var decor = document.querySelector(".bg-decor");
  if (!decor) return;
  var sceneName = state.activeBackground || "Brainclub";

  if (sceneName === "Brainclub") {
    decor.style.backgroundImage =
      DB.svgBackgroundUrl(DB.BRAINCLUB_SQ_LAYER) + ", " +
      DB.svgBackgroundUrl(DB.BRAINCLUB_TILE) + ", " +
      DB.BRAINCLUB_GRADIENT_CSS;
    decor.style.backgroundSize = "cover, 220px 220px, cover";
    decor.style.backgroundPosition = "center bottom, 0 0, center";
    decor.style.backgroundRepeat = "no-repeat, repeat, no-repeat";
    decor.classList.add("custom-scene");
    return;
  }

  var scene = DB.BACKGROUND_SCENES[sceneName];
  if (scene) {
    decor.style.backgroundImage = DB.svgBackgroundUrl(scene);
    decor.style.backgroundSize = "cover";
    decor.style.backgroundPosition = "center bottom";
    decor.style.backgroundRepeat = "no-repeat";
    decor.classList.add("custom-scene");
  } else {
    decor.style.backgroundImage = "";
    decor.classList.remove("custom-scene");
  }
};

DB.describeBadgeId = function (id) {
  var m;
  if ((m = id.match(/^week-badge-(\d+)$/))) {
    var n = parseInt(m[1], 10);
    return { emoji: DB.cycleItem(DB.WEEK_BADGE_EMOJIS, n), label: DB.t("badge.week", { n: n, name: DB.cycleItem(DB.L(DB.WEEK_BADGE_NAMES), n) }), category: DB.t("cat.weekbadges") };
  }
  if ((m = id.match(/^week-trophy-(\d+)$/))) {
    var n = parseInt(m[1], 10);
    return { emoji: "🏆", label: DB.t("badge.trophy", { n: n, name: DB.cycleItem(DB.L(DB.TROPHY_NAMES), n) }), category: DB.t("cat.trophies") };
  }
  if ((m = id.match(/^week-challenge-(\d+)$/))) {
    var n = parseInt(m[1], 10);
    return { emoji: "🎯", label: DB.t("badge.challengeDone", { n: n }), category: DB.t("cat.challenges") };
  }
  if ((m = id.match(/^gold-medal-(\d+)$/))) {
    var k = parseInt(m[1], 10);
    return { emoji: "🥇", label: DB.t("badge.medal", { k: k, days: k * 30 }), category: DB.t("cat.medals") };
  }
  if (id === "elite-status" || id === "elite-100") {
    return { emoji: "👑", label: DB.t("badge.elite"), category: DB.t("cat.status") };
  }
  if (id === "speedrun-1") {
    return { emoji: "⚡", label: DB.t("badge.speedrun"), category: DB.t("cat.other") };
  }
  if (id.indexOf("album-") === 0) {
    var albumId = id.slice(6);
    var album = DB.ALBUMS ? DB.ALBUMS.find(function (a) { return a.id === albumId; }) : null;
    return { emoji: album ? album.emoji : "🎴", label: album ? DB.t("badge.albumComplete", { title: DB.L(album.title) }) : id, category: DB.t("cat.albums") };
  }
  if (id === "week-1") return { emoji: "🏅", label: DB.t("badge.legacyWeek1"), category: DB.t("cat.weekbadges") };
  if (id === "gold-30") return { emoji: "🥇", label: DB.t("badge.legacyGold30"), category: DB.t("cat.medals") };
  return { emoji: "🏷️", label: id, category: DB.t("cat.other") };
};

DB.loadState = function () {
  var state;
  try {
    var raw = localStorage.getItem(DB.STORAGE_KEY);
    state = raw ? Object.assign(DB.defaultState(), JSON.parse(raw)) : DB.defaultState();
  } catch (e) {
    state = DB.defaultState();
  }
  if (!state.deviceId) {
    state.deviceId = DB.newDeviceId();
    DB.saveState(state);
  }
  return state;
};

DB.saveState = function (state) {
  localStorage.setItem(DB.STORAGE_KEY, JSON.stringify(state));
};

DB.daysBetween = function (a, b) {
  var da = new Date(a + "T00:00:00");
  var db = new Date(b + "T00:00:00");
  return Math.round((db - da) / 86400000);
};

DB.recordRunCompleted = function (dailyScore, allBonus) {
  var state = DB.loadState();
  var today = DB.todayStr();

  if (state.history[today]) {
    state.history[today].score = Math.max(state.history[today].score, dailyScore);
    DB.saveState(state);
    return { state: state, newBadges: [], challengeCompleted: false };
  }

  if (state.lastPlayedDate) {
    var gap = DB.daysBetween(state.lastPlayedDate, today);
    if (gap === 1) {
      state.streak += 1;
    } else if (gap > 1) {
      state.streak = 1;
      state.streakStartDate = today;
    }
  } else {
    state.streak = 1;
    state.streakStartDate = today;
  }
  if (!state.streakStartDate) state.streakStartDate = today;

  state.lastPlayedDate = today;
  state.totalRuns += 1;
  state.history[today] = { score: dailyScore, allBonus: !!allBonus };

  var newBadges = [];

  var weekIndex = Math.ceil(state.streak / 7);
  if (!state.weekChallenge || state.weekChallenge.weekIndex !== weekIndex) {
    state.weekChallenge = { weekIndex: weekIndex, bonusCount: 0, target: 3, claimed: false };
  }
  if (allBonus) {
    state.weekChallenge.bonusCount += 1;
  }

  if (state.streak % 7 === 0) {
    var weekNum = state.streak / 7;
    var badgeId = "week-badge-" + weekNum;
    var trophyId = "week-trophy-" + weekNum;
    if (state.badges.indexOf(badgeId) === -1) {
      state.badges.push(badgeId);
      newBadges.push({ id: badgeId, label: DB.t("toast.weekBadge", { n: weekNum, name: DB.cycleItem(DB.L(DB.WEEK_BADGE_NAMES), weekNum) }), emoji: DB.cycleItem(DB.WEEK_BADGE_EMOJIS, weekNum) });
    }
    if (state.badges.indexOf(trophyId) === -1) {
      state.badges.push(trophyId);
      newBadges.push({ id: trophyId, label: DB.t("toast.weekTrophy", { n: weekNum, name: DB.cycleItem(DB.L(DB.TROPHY_NAMES), weekNum) }), emoji: "🏆" });
    }
  }

  var challengeCompleted = false;
  if (!state.weekChallenge.claimed && state.weekChallenge.bonusCount >= state.weekChallenge.target) {
    state.weekChallenge.claimed = true;
    challengeCompleted = true;
    var challengeId = "week-challenge-" + state.weekChallenge.weekIndex;
    if (state.badges.indexOf(challengeId) === -1) {
      state.badges.push(challengeId);
      newBadges.push({ id: challengeId, label: DB.t("toast.weekChallengeDone", { n: state.weekChallenge.weekIndex }), emoji: "🎯" });
    }
  }

  if (state.streak % 30 === 0) {
    var cycle = state.streak / 30;
    var medalId = "gold-medal-" + cycle;
    if (state.badges.indexOf(medalId) === -1) {
      state.badges.push(medalId);
      var bgId = DB.cycleItem(DB.BACKGROUND_IDS, cycle);
      var avatarId = DB.cycleItem(DB.AVATAR_IDS, cycle);
      state.cosmetics.backgrounds.push(bgId);
      state.cosmetics.avatars.push(avatarId);
      newBadges.push({ id: medalId, label: DB.t("toast.medal", { k: cycle, bg: DB.L(DB.BACKGROUND_LABELS)[bgId], avatar: DB.L(DB.AVATAR_LABELS)[avatarId] }), emoji: "🥇" });
    }
  }

  if (state.streak === 100 && state.badges.indexOf("elite-status") === -1) {
    state.badges.push("elite-status");
    state.eliteStatus = true;
    newBadges.push({ id: "elite-status", label: DB.t("toast.elite"), emoji: "👑" });
  }

  if (allBonus && state.badges.indexOf("speedrun-1") === -1) {
    state.badges.push("speedrun-1");
    newBadges.push({ id: "speedrun-1", label: DB.t("badge.speedrun"), emoji: "⚡" });
  }

  DB.saveState(state);
  return { state: state, newBadges: newBadges, challengeCompleted: challengeCompleted };
};

DB.hasPlayedToday = function () {
  var state = DB.loadState();
  return !!state.history[DB.todayStr()];
};

// Deterministic daily seed so everyone (in this prototype: this device) gets
// the same puzzle set for a given date.
DB.mulberry32 = function (seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

DB.seedFromDate = function (dateStr) {
  var hash = 0;
  for (var i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return hash;
};

DB.dailyRandom = function () {
  return DB.mulberry32(DB.seedFromDate(DB.todayStr()));
};

// Fetch today's puzzle seed from the server so the daily set is
// server-authoritative; falls back to the local date-derived seed
// if the server can't be reached (offline-safe).
DB.fetchDailySeed = function () {
  return fetch("/api/daily-seed/" + DB.todayStr())
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (!data.ok) throw new Error("bad response");
      return data.seed;
    })
    .catch(function () {
      return DB.seedFromDate(DB.todayStr());
    });
};

window.DB = DB;
