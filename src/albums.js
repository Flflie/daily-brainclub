var DB = window.DB || {};

DB.ALBUMS = [
  {
    id: "oldtimers",
    title: { nl: "Oude auto's", en: "Vintage Cars", de: "Oldtimer", fr: "Voitures anciennes", es: "Coches clásicos" },
    emoji: "🚗",
    reward: { nl: "Exclusieve 'Oldtimer Klassiek' avatarrand", en: "Exclusive 'Vintage Classic' avatar frame", de: "Exklusiver 'Oldtimer Klassik'-Avatarrahmen", fr: "Cadre d'avatar exclusif « Classique Vintage »", es: "Marco de avatar exclusivo 'Clásico Vintage'" },
    items: [
      { id: "porsche-911", name: { nl: "Porsche 911", en: "Porsche 911", de: "Porsche 911", fr: "Porsche 911", es: "Porsche 911" }, emoji: "🚗", image: "assets/cars/porsche-911.jpg" },
      { id: "citroen-traction-avant", name: { nl: "Citroën Traction Avant (1954)", en: "Citroën Traction Avant (1954)", de: "Citroën Traction Avant (1954)", fr: "Citroën Traction Avant (1954)", es: "Citroën Traction Avant (1954)" }, emoji: "🚗", image: "assets/cars/citroen-traction-avant.jpg" },
      { id: "volvo-amazon", name: { nl: "Volvo Amazon", en: "Volvo Amazon", de: "Volvo Amazon", fr: "Volvo Amazon", es: "Volvo Amazon" }, emoji: "🚗", image: "assets/cars/volvo-amazon.jpg" },
      { id: "mercedes-300sl", name: { nl: "Mercedes-Benz 300 SL Roadster (1960)", en: "Mercedes-Benz 300 SL Roadster (1960)", de: "Mercedes-Benz 300 SL Roadster (1960)", fr: "Mercedes-Benz 300 SL Roadster (1960)", es: "Mercedes-Benz 300 SL Roadster (1960)" }, emoji: "🚗", image: "assets/cars/mercedes-300sl.jpg" },
      { id: "renault-4", name: { nl: "Renault 4", en: "Renault 4", de: "Renault 4", fr: "Renault 4", es: "Renault 4" }, emoji: "🚗", image: "assets/cars/renault-4.jpg" },
      { id: "vw-t1-bus", name: { nl: "Volkswagen T1 Bus", en: "Volkswagen T1 Bus", de: "Volkswagen T1 Bus", fr: "Volkswagen Combi T1", es: "Volkswagen T1 Bus" }, emoji: "🚗", image: "assets/cars/vw-t1-bus.jpg" },
      { id: "vw-kever-cabrio", name: { nl: "VW Kever Cabrio (1957)", en: "VW Beetle Convertible (1957)", de: "VW Käfer Cabrio (1957)", fr: "VW Coccinelle Cabriolet (1957)", es: "VW Escarabajo Descapotable (1957)" }, emoji: "🚗", image: "assets/cars/vw-kever-cabrio.jpg" },
      { id: "ford-cortina-mk1", name: { nl: "Ford Cortina Mk1 (1964)", en: "Ford Cortina Mk1 (1964)", de: "Ford Cortina Mk1 (1964)", fr: "Ford Cortina Mk1 (1964)", es: "Ford Cortina Mk1 (1964)" }, emoji: "🚗", image: "assets/cars/ford-cortina-mk1.jpg" }
    ]
  },
  {
    id: "bloemen",
    title: { nl: "Bloemen", en: "Flowers", de: "Blumen", fr: "Fleurs", es: "Flores" },
    emoji: "🌷",
    reward: { nl: "Lente-achtergrond ontgrendeld", en: "Spring background unlocked", de: "Frühlingshintergrund freigeschaltet", fr: "Fond d'écran printanier débloqué", es: "Fondo de primavera desbloqueado" },
    items: [
      { id: "lelie", name: { nl: "Lelie", en: "Lily", de: "Lilie", fr: "Lys", es: "Lirio" }, emoji: "🌸", image: "assets/flowers/lelie.jpg" },
      { id: "hibiscus", name: { nl: "Hibiscus", en: "Hibiscus", de: "Hibiskus", fr: "Hibiscus", es: "Hibisco" }, emoji: "🌺", image: "assets/flowers/hibiscus.jpg", focus: "50% 25%" },
      { id: "dahlia", name: { nl: "Dahlia", en: "Dahlia", de: "Dahlie", fr: "Dahlia", es: "Dalia" }, emoji: "💮", image: "assets/flowers/dahlia.jpg", focus: "50% 25%" },
      { id: "zonnebloem", name: { nl: "Zonnebloem", en: "Sunflower", de: "Sonnenblume", fr: "Tournesol", es: "Girasol" }, emoji: "🌻", image: "assets/flowers/zonnebloem.jpg", focus: "50% 30%" },
      { id: "madeliefje", name: { nl: "Madeliefje", en: "Daisy", de: "Gänseblümchen", fr: "Pâquerette", es: "Margarita" }, emoji: "🌼", image: "assets/flowers/madeliefje.jpg" },
      { id: "roos", name: { nl: "Roos", en: "Rose", de: "Rose", fr: "Rose", es: "Rosa" }, emoji: "🌹", image: "assets/flowers/roos.jpg" },
      { id: "plumeria", name: { nl: "Plumeria", en: "Plumeria", de: "Plumeria", fr: "Frangipanier", es: "Plumeria" }, emoji: "🌷", image: "assets/flowers/plumeria.jpg" },
      { id: "orchidee", name: { nl: "Orchidee", en: "Orchid", de: "Orchidee", fr: "Orchidée", es: "Orquídea" }, emoji: "🏵️", image: "assets/flowers/orchidee.jpg" }
    ]
  },
  {
    id: "steden",
    title: { nl: "Nederlandse steden", en: "Dutch Cities", de: "Niederländische Städte", fr: "Villes néerlandaises", es: "Ciudades neerlandesas" },
    emoji: "🏙️",
    reward: { nl: "Nederland-thema profielbadge", en: "Netherlands-theme profile badge", de: "Niederlande-Themen-Profilabzeichen", fr: "Badge de profil aux couleurs des Pays-Bas", es: "Insignia de perfil con temática de los Países Bajos" },
    items: [
      { id: "rotterdam", name: { nl: "Rotterdam", en: "Rotterdam", de: "Rotterdam", fr: "Rotterdam", es: "Rotterdam" }, emoji: "🏗️", image: "assets/cities/rotterdam.jpg", focus: "50% 35%" },
      { id: "amsterdam", name: { nl: "Amsterdam", en: "Amsterdam", de: "Amsterdam", fr: "Amsterdam", es: "Ámsterdam" }, emoji: "🚲", image: "assets/cities/amsterdam.jpg", focus: "50% 35%" },
      { id: "arnhem", name: { nl: "Arnhem", en: "Arnhem", de: "Arnheim", fr: "Arnhem", es: "Arnhem" }, emoji: "🌉", image: "assets/cities/arnhem.jpg", focus: "50% 68%" },
      { id: "scheveningen", name: { nl: "Scheveningen", en: "Scheveningen", de: "Scheveningen", fr: "Scheveningen", es: "Scheveningen" }, emoji: "🎡", image: "assets/cities/scheveningen.jpg", focus: "50% 20%" },
      { id: "groningen", name: { nl: "Groningen", en: "Groningen", de: "Groningen", fr: "Groningue", es: "Groninga" }, emoji: "🚴", image: "assets/cities/groningen.jpg" },
      { id: "volendam", name: { nl: "Volendam", en: "Volendam", de: "Volendam", fr: "Volendam", es: "Volendam" }, emoji: "⛵", image: "assets/cities/volendam.jpg" },
      { id: "maastricht", name: { nl: "Maastricht", en: "Maastricht", de: "Maastricht", fr: "Maastricht", es: "Maastricht" }, emoji: "⛪", image: "assets/cities/maastricht.jpg", focus: "50% 28%" },
      { id: "alkmaar", name: { nl: "Alkmaar", en: "Alkmaar", de: "Alkmaar", fr: "Alkmaar", es: "Alkmaar" }, emoji: "🧀", image: "assets/cities/alkmaar.jpg", focus: "50% 10%" }
    ]
  },
  {
    id: "kastelen",
    title: { nl: "Kastelen", en: "Castles", de: "Schlösser", fr: "Châteaux", es: "Castillos" },
    emoji: "🏰",
    reward: { nl: "Kasteel-avatar ontgrendeld", en: "Castle avatar unlocked", de: "Schloss-Avatar freigeschaltet", fr: "Avatar château débloqué", es: "Avatar de castillo desbloqueado" },
    items: [
      { id: "de-haar", name: { nl: "Kasteel de Haar", en: "Castle de Haar", de: "Schloss de Haar", fr: "Château de Haar", es: "Castillo de Haar" }, emoji: "🏰", image: "assets/castles/de-haar.jpg" },
      { id: "muiderslot", name: { nl: "Muiderslot", en: "Muiderslot Castle", de: "Schloss Muiderslot", fr: "Château de Muiderslot", es: "Castillo Muiderslot" }, emoji: "🏰", image: "assets/castles/muiderslot.jpg" },
      { id: "heeswijk", name: { nl: "Kasteel Heeswijk", en: "Heeswijk Castle", de: "Schloss Heeswijk", fr: "Château de Heeswijk", es: "Castillo de Heeswijk" }, emoji: "🏰", image: "assets/castles/heeswijk.jpg", focus: "50% 25%" },
      { id: "amerongen", name: { nl: "Kasteel Amerongen", en: "Amerongen Castle", de: "Schloss Amerongen", fr: "Château d'Amerongen", es: "Castillo de Amerongen" }, emoji: "🏰", image: "assets/castles/amerongen.jpg", focus: "50% 25%" },
      { id: "hoensbroek", name: { nl: "Kasteel Hoensbroek", en: "Hoensbroek Castle", de: "Schloss Hoensbroek", fr: "Château de Hoensbroek", es: "Castillo de Hoensbroek" }, emoji: "🏰", image: "assets/castles/hoensbroek.jpg" },
      { id: "huis-bergh", name: { nl: "Kasteel Huis Bergh", en: "Huis Bergh Castle", de: "Schloss Huis Bergh", fr: "Château de Huis Bergh", es: "Castillo Huis Bergh" }, emoji: "🏰", image: "assets/castles/huis-bergh.jpg", focus: "50% 25%" },
      { id: "doorwerth", name: { nl: "Kasteel Doorwerth", en: "Doorwerth Castle", de: "Schloss Doorwerth", fr: "Château de Doorwerth", es: "Castillo de Doorwerth" }, emoji: "🏰", image: "assets/castles/doorwerth.jpg", focus: "50% 8%" },
      { id: "loevestein", name: { nl: "Slot Loevestein", en: "Loevestein Castle", de: "Schloss Loevestein", fr: "Château de Loevestein", es: "Castillo de Loevestein" }, emoji: "🏰", image: "assets/castles/loevestein.jpg" }
    ]
  },
  {
    id: "dieren",
    title: { nl: "Dieren", en: "Animals", de: "Tiere", fr: "Animaux", es: "Animales" },
    emoji: "🦁",
    reward: { nl: "Dierentuin-achtergrond ontgrendeld", en: "Zoo background unlocked", de: "Zoo-Hintergrund freigeschaltet", fr: "Fond d'écran de zoo débloqué", es: "Fondo de zoológico desbloqueado" },
    items: [
      { id: "bij", name: { nl: "Bij", en: "Bee", de: "Biene", fr: "Abeille", es: "Abeja" }, emoji: "🐝", image: "assets/animals/bij.jpg" },
      { id: "oehoe", name: { nl: "Oehoe", en: "Eagle Owl", de: "Uhu", fr: "Hibou grand-duc", es: "Búho real" }, emoji: "🦉", image: "assets/animals/oehoe.jpg", focus: "50% 18%" },
      { id: "vlinder", name: { nl: "Vlinder", en: "Butterfly", de: "Schmetterling", fr: "Papillon", es: "Mariposa" }, emoji: "🦋", image: "assets/animals/vlinder.jpg" },
      { id: "blauwgele-vogel", name: { nl: "Blauwgele vogel", en: "Blue-and-Yellow Bird", de: "Blau-gelber Vogel", fr: "Oiseau bleu et jaune", es: "Ave azul y amarilla" }, emoji: "🐦", image: "assets/animals/blauwgele-vogel.jpg", focus: "50% 25%" },
      { id: "koala", name: { nl: "Koala", en: "Koala", de: "Koala", fr: "Koala", es: "Koala" }, emoji: "🐨", image: "assets/animals/koala.jpg", focus: "50% 25%" },
      { id: "pauw", name: { nl: "Pauw", en: "Peacock", de: "Pfau", fr: "Paon", es: "Pavo real" }, emoji: "🦚", image: "assets/animals/pauw.jpg" },
      { id: "schildpad", name: { nl: "Schildpad", en: "Turtle", de: "Schildkröte", fr: "Tortue", es: "Tortuga" }, emoji: "🐢", image: "assets/animals/schildpad.jpg", focus: "50% 25%" },
      { id: "hert", name: { nl: "Hert", en: "Deer", de: "Hirsch", fr: "Cerf", es: "Ciervo" }, emoji: "🦌", image: "assets/animals/hert.jpg" }
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
