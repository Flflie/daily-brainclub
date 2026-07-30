var DB = window.DB || {};

DB.ALBUMS = [
  {
    id: "oldtimers",
    title: { nl: "Oude auto's", en: "Vintage Cars" },
    emoji: "🚗",
    reward: { nl: "Exclusieve 'Oldtimer Klassiek' avatarrand", en: "Exclusive 'Vintage Classic' avatar frame" },
    items: [
      { id: "porsche-911", name: { nl: "Porsche 911", en: "Porsche 911" }, emoji: "🚗", image: "assets/cars/porsche-911.jpg" },
      { id: "citroen-traction-avant", name: { nl: "Citroën Traction Avant (1954)", en: "Citroën Traction Avant (1954)" }, emoji: "🚗", image: "assets/cars/citroen-traction-avant.jpg" },
      { id: "volvo-amazon", name: { nl: "Volvo Amazon", en: "Volvo Amazon" }, emoji: "🚗", image: "assets/cars/volvo-amazon.jpg" },
      { id: "mercedes-300sl", name: { nl: "Mercedes-Benz 300 SL Roadster (1960)", en: "Mercedes-Benz 300 SL Roadster (1960)" }, emoji: "🚗", image: "assets/cars/mercedes-300sl.jpg" },
      { id: "renault-4", name: { nl: "Renault 4", en: "Renault 4" }, emoji: "🚗", image: "assets/cars/renault-4.jpg" },
      { id: "vw-t1-bus", name: { nl: "Volkswagen T1 Bus", en: "Volkswagen T1 Bus" }, emoji: "🚗", image: "assets/cars/vw-t1-bus.jpg" },
      { id: "vw-kever-cabrio", name: { nl: "VW Kever Cabrio (1957)", en: "VW Beetle Convertible (1957)" }, emoji: "🚗", image: "assets/cars/vw-kever-cabrio.jpg" },
      { id: "ford-cortina-mk1", name: { nl: "Ford Cortina Mk1 (1964)", en: "Ford Cortina Mk1 (1964)" }, emoji: "🚗", image: "assets/cars/ford-cortina-mk1.jpg" }
    ]
  },
  {
    id: "bloemen",
    title: { nl: "Bloemen", en: "Flowers" },
    emoji: "🌷",
    reward: { nl: "Lente-achtergrond ontgrendeld", en: "Spring background unlocked" },
    items: [
      { id: "lelie", name: { nl: "Lelie", en: "Lily" }, emoji: "🌸", image: "assets/flowers/lelie.jpg" },
      { id: "hibiscus", name: { nl: "Hibiscus", en: "Hibiscus" }, emoji: "🌺", image: "assets/flowers/hibiscus.jpg", focus: "50% 25%" },
      { id: "dahlia", name: { nl: "Dahlia", en: "Dahlia" }, emoji: "💮", image: "assets/flowers/dahlia.jpg", focus: "50% 25%" },
      { id: "zonnebloem", name: { nl: "Zonnebloem", en: "Sunflower" }, emoji: "🌻", image: "assets/flowers/zonnebloem.jpg", focus: "50% 30%" },
      { id: "madeliefje", name: { nl: "Madeliefje", en: "Daisy" }, emoji: "🌼", image: "assets/flowers/madeliefje.jpg" },
      { id: "roos", name: { nl: "Roos", en: "Rose" }, emoji: "🌹", image: "assets/flowers/roos.jpg" },
      { id: "plumeria", name: { nl: "Plumeria", en: "Plumeria" }, emoji: "🌷", image: "assets/flowers/plumeria.jpg" },
      { id: "orchidee", name: { nl: "Orchidee", en: "Orchid" }, emoji: "🏵️", image: "assets/flowers/orchidee.jpg" }
    ]
  },
  {
    id: "steden",
    title: { nl: "Nederlandse steden", en: "Dutch Cities" },
    emoji: "🏙️",
    reward: { nl: "Nederland-thema profielbadge", en: "Netherlands-theme profile badge" },
    items: [
      { id: "rotterdam", name: { nl: "Rotterdam", en: "Rotterdam" }, emoji: "🏗️", image: "assets/cities/rotterdam.jpg", focus: "50% 35%" },
      { id: "amsterdam", name: { nl: "Amsterdam", en: "Amsterdam" }, emoji: "🚲", image: "assets/cities/amsterdam.jpg", focus: "50% 35%" },
      { id: "arnhem", name: { nl: "Arnhem", en: "Arnhem" }, emoji: "🌉", image: "assets/cities/arnhem.jpg", focus: "50% 68%" },
      { id: "scheveningen", name: { nl: "Scheveningen", en: "Scheveningen" }, emoji: "🎡", image: "assets/cities/scheveningen.jpg", focus: "50% 20%" },
      { id: "groningen", name: { nl: "Groningen", en: "Groningen" }, emoji: "🚴", image: "assets/cities/groningen.jpg" },
      { id: "volendam", name: { nl: "Volendam", en: "Volendam" }, emoji: "⛵", image: "assets/cities/volendam.jpg" },
      { id: "maastricht", name: { nl: "Maastricht", en: "Maastricht" }, emoji: "⛪", image: "assets/cities/maastricht.jpg", focus: "50% 28%" },
      { id: "alkmaar", name: { nl: "Alkmaar", en: "Alkmaar" }, emoji: "🧀", image: "assets/cities/alkmaar.jpg", focus: "50% 10%" }
    ]
  },
  {
    id: "kastelen",
    title: { nl: "Kastelen", en: "Castles" },
    emoji: "🏰",
    reward: { nl: "Kasteel-avatar ontgrendeld", en: "Castle avatar unlocked" },
    items: [
      { id: "de-haar", name: { nl: "Kasteel de Haar", en: "Castle de Haar" }, emoji: "🏰", image: "assets/castles/de-haar.jpg" },
      { id: "muiderslot", name: { nl: "Muiderslot", en: "Muiderslot Castle" }, emoji: "🏰", image: "assets/castles/muiderslot.jpg" },
      { id: "heeswijk", name: { nl: "Kasteel Heeswijk", en: "Heeswijk Castle" }, emoji: "🏰", image: "assets/castles/heeswijk.jpg", focus: "50% 25%" },
      { id: "amerongen", name: { nl: "Kasteel Amerongen", en: "Amerongen Castle" }, emoji: "🏰", image: "assets/castles/amerongen.jpg", focus: "50% 25%" },
      { id: "hoensbroek", name: { nl: "Kasteel Hoensbroek", en: "Hoensbroek Castle" }, emoji: "🏰", image: "assets/castles/hoensbroek.jpg" },
      { id: "huis-bergh", name: { nl: "Kasteel Huis Bergh", en: "Huis Bergh Castle" }, emoji: "🏰", image: "assets/castles/huis-bergh.jpg", focus: "50% 25%" },
      { id: "doorwerth", name: { nl: "Kasteel Doorwerth", en: "Doorwerth Castle" }, emoji: "🏰", image: "assets/castles/doorwerth.jpg", focus: "50% 8%" },
      { id: "loevestein", name: { nl: "Slot Loevestein", en: "Loevestein Castle" }, emoji: "🏰", image: "assets/castles/loevestein.jpg" }
    ]
  },
  {
    id: "dieren",
    title: { nl: "Dieren", en: "Animals" },
    emoji: "🦁",
    reward: { nl: "Dierentuin-achtergrond ontgrendeld", en: "Zoo background unlocked" },
    items: [
      { id: "bij", name: { nl: "Bij", en: "Bee" }, emoji: "🐝", image: "assets/animals/bij.jpg" },
      { id: "oehoe", name: { nl: "Oehoe", en: "Eagle Owl" }, emoji: "🦉", image: "assets/animals/oehoe.jpg", focus: "50% 18%" },
      { id: "vlinder", name: { nl: "Vlinder", en: "Butterfly" }, emoji: "🦋", image: "assets/animals/vlinder.jpg" },
      { id: "blauwgele-vogel", name: { nl: "Blauwgele vogel", en: "Blue-and-Yellow Bird" }, emoji: "🐦", image: "assets/animals/blauwgele-vogel.jpg", focus: "50% 25%" },
      { id: "koala", name: { nl: "Koala", en: "Koala" }, emoji: "🐨", image: "assets/animals/koala.jpg", focus: "50% 25%" },
      { id: "pauw", name: { nl: "Pauw", en: "Peacock" }, emoji: "🦚", image: "assets/animals/pauw.jpg" },
      { id: "schildpad", name: { nl: "Schildpad", en: "Turtle" }, emoji: "🐢", image: "assets/animals/schildpad.jpg", focus: "50% 25%" },
      { id: "hert", name: { nl: "Hert", en: "Deer" }, emoji: "🦌", image: "assets/animals/hert.jpg" }
    ]
  }
];

DB.cardKey = function (albumId, itemId) {
  return albumId + ":" + itemId;
};

DB.getAlbumProgress = function (state, albumId) {
  var album = DB.ALBUMS.find(function (a) { return a.id === albumId; });
  var owned = album.items.filter(function (item) {
    return !!state.ownedCards[DB.cardKey(albumId, item.id)];
  }).length;
  return { owned: owned, total: album.items.length };
};

DB.isAlbumComplete = function (state, albumId) {
  var progress = DB.getAlbumProgress(state, albumId);
  return progress.owned === progress.total;
};

DB.drawCards = function (state, count) {
  var allCards = [];
  DB.ALBUMS.forEach(function (album) {
    album.items.forEach(function (item) {
      allCards.push({ albumId: album.id, albumTitle: album.title, itemId: item.id, name: item.name, emoji: item.emoji, image: item.image, focus: item.focus });
    });
  });

  function keyOf(c) { return DB.cardKey(c.albumId, c.itemId); }

  var missingPool = allCards.filter(function (c) { return !state.ownedCards[keyOf(c)]; });
  var drawn = [];

  for (var i = 0; i < count; i++) {
    var sourcePool = missingPool.length > 0 ? missingPool : allCards;
    if (sourcePool.length === 0) break;
    var idx = Math.floor(Math.random() * sourcePool.length);
    var card = sourcePool[idx];
    var isNew = !state.ownedCards[keyOf(card)];
    state.ownedCards[keyOf(card)] = true;
    drawn.push({ albumId: card.albumId, albumTitle: card.albumTitle, itemId: card.itemId, name: card.name, emoji: card.emoji, image: card.image, focus: card.focus, isNew: isNew });
    missingPool = missingPool.filter(function (c) { return keyOf(c) !== keyOf(card); });
  }

  return drawn;
};

DB.awardDailyCards = function (count) {
  var state = DB.loadState();
  var drawn = DB.drawCards(state, count);
  var newAlbumBadges = [];

  DB.ALBUMS.forEach(function (album) {
    var badgeId = "album-" + album.id;
    if (DB.isAlbumComplete(state, album.id) && state.badges.indexOf(badgeId) === -1) {
      state.badges.push(badgeId);
      newAlbumBadges.push({ id: badgeId, label: DB.t("toast.albumComplete", { title: DB.L(album.title), reward: DB.L(album.reward) }), emoji: album.emoji });
    }
  });

  DB.saveState(state);
  return { drawn: drawn, newAlbumBadges: newAlbumBadges, state: state };
};

DB.renderAlbums = function () {
  DB.lastRender = DB.renderAlbums;
  var state = DB.loadState();

  var tiles = DB.ALBUMS.map(function (album) {
    var progress = DB.getAlbumProgress(state, album.id);
    var complete = progress.owned === progress.total;
    return (
      '<div class="album-tile' + (complete ? ' complete' : '') + '" data-album="' + album.id + '">' +
        '<div class="album-tile-emoji">' + album.emoji + '</div>' +
        '<div class="album-tile-title">' + DB.L(album.title) + '</div>' +
        '<div class="album-tile-progress">' + progress.owned + ' / ' + progress.total + (complete ? ' ✓' : '') + '</div>' +
      '</div>'
    );
  }).join("");

  DB.appRoot.innerHTML =
    DB.renderHeader(state) +
    '<div class="card">' +
      '<h2>' + DB.t("albums.title") + '</h2>' +
      '<p class="muted">' + DB.t("albums.subtitle") + '</p>' +
      '<div class="album-grid">' + tiles + '</div>' +
    '</div>' +
    '<button class="btn secondary" id="backHome">' + DB.t("ach.back") + '</button>';

  DB.bindHeader();
  document.querySelectorAll(".album-tile").forEach(function (el) {
    el.addEventListener("click", function () {
      DB.renderAlbumDetail(el.getAttribute("data-album"));
    });
  });
  document.getElementById("backHome").addEventListener("click", DB.renderHome);
};

DB.renderAlbumDetail = function (albumId) {
  DB.lastRender = function () { DB.renderAlbumDetail(albumId); };
  var state = DB.loadState();
  var album = DB.ALBUMS.find(function (a) { return a.id === albumId; });
  var progress = DB.getAlbumProgress(state, albumId);
  var complete = progress.owned === progress.total;

  var cardsHtml = album.items.map(function (item) {
    var owned = !!state.ownedCards[DB.cardKey(albumId, item.id)];
    var itemName = DB.L(item.name);
    var visual = owned
      ? (item.image
          ? '<img class="collect-card-photo" style="object-position:' + (item.focus || "center") + '" src="' + item.image + '" alt="' + itemName + '">'
          : '<div class="collect-card-emoji">' + item.emoji + '</div>')
      : '<div class="collect-card-emoji">❔</div>';
    return (
      '<div class="collect-card' + (owned ? "" : " locked") + '">' +
        visual +
        '<div class="collect-card-name">' + (owned ? itemName : DB.t("albumDetail.unknown")) + '</div>' +
      '</div>'
    );
  }).join("");

  DB.appRoot.innerHTML =
    DB.renderHeader(state) +
    '<div class="card">' +
      '<div class="date-line">' + album.emoji + ' ' + DB.L(album.title) + '</div>' +
      '<h2>' + DB.t("albumDetail.cardsCount", { owned: progress.owned, total: progress.total }) + '</h2>' +
      (complete
        ? '<div class="bonus-tag">' + DB.t("albumDetail.complete", { reward: DB.L(album.reward) }) + '</div>'
        : '<p class="muted">' + DB.t("albumDetail.rewardHint", { reward: DB.L(album.reward) }) + '</p>') +
      '<div class="collect-grid">' + cardsHtml + '</div>' +
    '</div>' +
    '<button class="btn secondary" id="backAlbums">' + DB.t("albums.back") + '</button>';

  DB.bindHeader();
  document.getElementById("backAlbums").addEventListener("click", DB.renderAlbums);
};

window.DB = DB;
