var DB = window.DB || {};

DB.WordGuessPuzzle = {
  id: "wordguess",
  title: "Woord raden",
  emoji: "🔤",

  WORDS: {
    nl: ["APPEL", "TAFEL", "STOEL", "WATER", "BLOEM", "KAMER", "BRIEF", "PLANT", "VLIEG", "KRANT", "SCHIP", "TREIN", "GROEN", "FIETS", "PAARD", "HEMEL", "LENTE", "NACHT", "KLEUR", "GETAL", "BOTER", "GROTE", "KLEIN", "LICHT", "KOUDE", "AARDE", "STEEN", "IJZER", "PAARS", "BLAUW", "ZWART", "BRUIN", "GRIJS", "ROZEN", "BOMEN", "VOGEL", "KATER", "FEEST", "GEEST", "DAGEN", "WEKEN", "STERK", "BREED", "RONDE", "ADRES", "NEVEL", "BROOD", "KAARS", "DEKEN", "VLOER", "RAMEN", "GAZON", "HAGEL", "REGEN", "STORM", "ZOMER", "MAAND", "AVOND", "HEDEN", "LADEN", "PLANK", "KLEED", "HAMER", "LEPEL", "EMMER", "BEZEM", "SPONS", "WOORD", "VRAAG", "REGEL", "METEN", "WEGEN", "KAART", "ROUTE", "PADEN", "PLEIN", "TOREN", "DAKEN", "HOEVE", "AKKER", "WEIDE", "SLOOT", "DALEN", "ZADEN", "VAREN", "WETEN", "HOREN", "LOPEN", "STAAN", "LEZEN", "KOKEN", "VEGEN", "KOPEN", "GEVEN", "NEMEN", "DUWEN", "RADEN", "BEIGE", "SLANG", "HAZEN", "BEVER", "OTTER", "EZELS", "UILEN", "MEEUW", "MEREL", "RAVEN", "KRAAI", "PEREN", "DRUIF", "PRUIM", "NOTEN", "GRAAN", "RIJST", "PASTA", "PATAT", "FRIET", "PEPER", "KRUID", "WAFEL", "SNOEP", "PINDA", "BONEN"],
    en: ["APPLE", "TABLE", "CHAIR", "WATER", "FLAME", "HOUSE", "PAPER", "BEACH", "PLANE", "MOUSE", "SHIRT", "TRAIN", "GREEN", "BREAD", "HORSE", "SMILE", "HEART", "MUSIC", "LIGHT", "NIGHT", "CLOUD", "RIVER", "STONE", "BRAVE", "QUIET", "HAPPY", "EARTH", "OCEAN", "SUGAR", "LEMON", "GRAPE", "PEACH", "MONEY", "PHONE", "GLASS", "PLANT", "STORM", "SPACE", "MAGIC", "DREAM", "WORLD", "SOUND", "CROWN", "PRIDE", "SHINE", "BRICK", "FENCE", "SHELF", "FLOOR", "GRASS", "SEEDS", "BLOOM", "FIELD", "CLIFF", "ROCKS", "WAVES", "SHORE", "COAST", "SHELL", "CREEK", "PONDS", "BROOK", "MARSH", "FROST", "MONTH", "WEEKS", "HOURS", "CLOCK", "WATCH", "NORTH", "SOUTH", "ROADS", "PATHS", "ROUTE", "TOWER", "BARNS", "SHEDS", "FARMS", "SWANS", "CROWS", "DOVES", "ROBIN", "EAGLE", "HAWKS", "SNAKE", "SNAIL", "WHALE", "SEALS", "TROUT", "PEARS", "PLUMS", "BERRY", "MELON", "MANGO", "SPICE", "HERBS", "STAND", "SLEEP", "LAUGH", "SPEAK", "DRINK", "TOAST", "CAKES", "HONEY", "RIVER", "CANDY", "PIZZA", "SALAD", "ONION", "BEANS", "OLIVE", "CHESS", "PAINT", "BRUSH", "CHALK", "STAMP", "CLIMB", "SWING", "CATCH"],
    de: ["APFEL", "TISCH", "STUHL", "BLUME", "BRIEF", "ZEBRA", "GRUEN", "PFERD", "KLEID", "STIFT", "MOTOR", "KATZE", "WOLKE", "BLATT", "TASSE", "TRAUM", "FEUER", "STEIN", "KREIS", "FARBE", "MUSIK", "LEBEN", "NACHT", "MAUER", "KERZE", "ENGEL", "GEIST", "KRAFT", "SPIEL", "TIGER", "PANDA", "WOLLE", "SEIFE", "KRONE", "TAUBE", "FALKE", "SCHUH", "REGEN", "MARKE", "ADLER", "PUPPE", "KUGEL", "NEBEL", "MARKT", "BRAUN", "DECKE", "BODEN", "EIMER", "BESEN", "FRAGE", "REGEL", "KARTE", "ROUTE", "PLATZ", "ACKER", "WIESE", "TEICH", "BERGE", "BUSCH", "HECKE", "STURM", "FROST", "HAGEL", "SONNE", "MONAT", "WOCHE", "UHREN", "GASSE", "STALL", "SCHAF", "ZIEGE", "ENTEN", "RABEN", "MEISE", "FUCHS", "HASEN", "RATTE", "BIENE", "WESPE", "FISCH", "ROBBE", "BIRNE", "MANGO", "BEERE", "KRAUT", "NUDEL", "SUPPE", "SALAT", "TOAST", "HONIG", "SAMEN", "KEKSE", "PIZZA", "GABEL", "LAMPE"],
    fr: ["POMME", "TABLE", "FLEUR", "PORTE", "LIVRE", "PLAGE", "TRAIN", "VERTE", "PLUIE", "CHIEN", "ROUTE", "VILLE", "TASSE", "VIEUX", "JAUNE", "COEUR", "MONDE", "FORCE", "VOILE", "SALLE", "CHOSE", "NOTRE", "VOTRE", "TERRE", "ROSES", "SOUPE", "MUSEE", "LUNDI", "VENTE", "DANSE", "CARTE", "CORPS", "GRAND", "PETIT", "BLANC", "NOIRE", "ROUGE", "FRAIS", "GENOU", "PARLE", "CHAMP", "LARME", "HEURE", "PLUME", "TIGRE", "HERBE", "GRAIN", "ARBRE", "NUAGE", "ORAGE", "NEIGE", "GRELE", "GIVRE", "VENTS", "LUNES", "JOURS", "PONTS", "TOURS", "VACHE", "CYGNE", "AIGLE", "HIBOU", "OURSE", "LOUPS", "RATES", "GUEPE", "POIRE", "PRUNE", "MELON", "PECHE", "BAIES", "PATES", "TARTE", "EPICE", "MAINS", "PIEDS", "TETES", "PENSE", "COURT", "CUIRE", "MANGE", "BOIRE", "ROBES", "PIANO", "PINCE", "FRUIT", "SUCRE", "LANCE"],
    es: ["LIBRO", "SILLA", "PLAYA", "VERDE", "PERRO", "CALLE", "PLATO", "NOCHE", "RATON", "FLORA", "AGUAS", "NUBES", "PATOS", "CIELO", "MESAS", "FUEGO", "MUNDO", "FUERA", "DULCE", "NEGRO", "LIBRE", "TARDE", "NIEVE", "ARBOL", "DEBIL", "LIMON", "FRESA", "MANGO", "PLATA", "COBRE", "CARTA", "PUNTO", "GRUPO", "CAMPO", "PARTE", "MANOS", "SUENO", "ABRIL", "JUNIO", "MARZO", "TIGRE", "PANDA", "FIRME", "VIAJE", "CERCA", "VALLA", "SUELO", "GRANO", "HOJAS", "RAMAS", "SETOS", "LUNAS", "MESES", "HORAS", "NORTE", "RUTAS", "TORRE", "VACAS", "OVEJA", "CABRA", "GANSO", "CISNE", "BUHOS", "LOBOS", "ZORRO", "RATAS", "ABEJA", "PECES", "FOCAS", "PERAS", "MELON", "BAYAS", "ARROZ", "PASTA", "SOPAS", "TARTA", "BRAZO", "PECHO", "ANDAR", "CORRE", "CANTA", "COCER", "COMER", "BEBER", "PIANO", "PIZZA", "CEBRA", "SALSA", "TREPA", "SALTA"]
  },

  generate: function (rng, opts) {
    var words = DB.L(this.WORDS).filter(function (w) { return w.length === 5; });
    var avoid = (opts && opts.avoid) || [];
    if (avoid.length) {
      var avoidSet = {};
      avoid.forEach(function (w) { avoidSet[w] = true; });
      var filtered = words.filter(function (w) { return !avoidSet[w]; });
      if (filtered.length >= 8) words = filtered;
    }
    var idx = Math.floor(rng() * words.length);
    return { word: words[idx], maxGuesses: 6 };
  },

  mount: function (container, puzzleData, onFinish) {
    var word = puzzleData.word;
    var maxGuesses = puzzleData.maxGuesses;
    var state = { guesses: [], current: "", done: false };
    var keyStatus = {};

    var rows = "QWERTYUIOP,ASDFGHJKL,ZXCVBNM".split(",");

    function evaluate(guess) {
      var result = new Array(5).fill("absent");
      var wordChars = word.split("");
      var used = new Array(5).fill(false);

      for (var i = 0; i < 5; i++) {
        if (guess[i] === wordChars[i]) {
          result[i] = "correct";
          used[i] = true;
        }
      }
      for (var i = 0; i < 5; i++) {
        if (result[i] === "correct") continue;
        for (var j = 0; j < 5; j++) {
          if (!used[j] && guess[i] === wordChars[j]) {
            result[i] = "present";
            used[j] = true;
            break;
          }
        }
      }
      return result;
    }

    function updateKeyStatus(guess, result) {
      for (var i = 0; i < guess.length; i++) {
        var ch = guess[i];
        var st = result[i];
        var rank = { absent: 0, present: 1, correct: 2 };
        if (!keyStatus[ch] || rank[st] > rank[keyStatus[ch]]) {
          keyStatus[ch] = st;
        }
      }
    }

    function render() {
      var html = '<div class="puzzle-title">' + DB.t("wordguess.attempt", { title: DB.puzzleTitle("wordguess"), i: state.guesses.length + 1, n: maxGuesses }) + '</div>';

      for (var r = 0; r < maxGuesses; r++) {
        var rowLetters, rowResult;
        if (r < state.guesses.length) {
          rowLetters = state.guesses[r].guess.split("");
          rowResult = state.guesses[r].result;
        } else if (r === state.guesses.length) {
          rowLetters = state.current.split("");
          rowResult = null;
        } else {
          rowLetters = [];
          rowResult = null;
        }
        html += '<div class="word-row">';
        for (var c = 0; c < 5; c++) {
          var letter = rowLetters[c] || "";
          var cls = "word-cell" + (letter ? " filled" : "");
          if (rowResult) cls += " " + rowResult[c];
          html += '<div class="' + cls + '">' + letter + '</div>';
        }
        html += "</div>";
      }

      html += '<div class="keyboard">';
      rows.forEach(function (row, ri) {
        html += '<div class="kb-row">';
        if (ri === 2) html += '<div class="kb-key wide" data-key="ENTER">' + DB.t("wordguess.ok") + '</div>';
        row.split("").forEach(function (letter) {
          var cls = "kb-key" + (keyStatus[letter] ? " " + keyStatus[letter] : "");
          html += '<div class="' + cls + '" data-key="' + letter + '">' + letter + '</div>';
        });
        if (ri === 2) html += '<div class="kb-key wide" data-key="BACK">&#9003;</div>';
        html += "</div>";
      });
      html += "</div>";

      container.innerHTML = html;

      container.querySelectorAll(".kb-key").forEach(function (key) {
        key.addEventListener("click", function () {
          handleKey(key.getAttribute("data-key"));
        });
      });
    }

    function handleKey(key) {
      if (state.done) return;
      if (key === "BACK") {
        state.current = state.current.slice(0, -1);
      } else if (key === "ENTER") {
        if (state.current.length !== 5) return;
        var result = evaluate(state.current);
        updateKeyStatus(state.current, result);
        state.guesses.push({ guess: state.current, result: result });
        var won = state.current === word;
        state.current = "";
        if (won || state.guesses.length >= maxGuesses) {
          state.done = true;
          render();
          setTimeout(function () { finish(won); }, 700);
          return;
        }
      } else if (/^[A-Z]$/.test(key) && state.current.length < 5) {
        state.current += key;
      }
      render();
    }

    function onKeydown(e) {
      if (state.done) return;
      var k = e.key.toUpperCase();
      if (k === "BACKSPACE") handleKey("BACK");
      else if (k === "ENTER") handleKey("ENTER");
      else if (/^[A-Z]$/.test(k)) handleKey(k);
    }
    document.addEventListener("keydown", onKeydown);

    function finish(won) {
      document.removeEventListener("keydown", onKeydown);
      var guessesUsed = state.guesses.length;
      var score = won ? Math.max(40, 100 - (guessesUsed - 1) * 12) : 10;
      onFinish({ score: score, detail: won ? DB.t("wordguess.detailWon", { n: guessesUsed }) : DB.t("wordguess.detailLost", { word: word }) });
    }

    render();

    return {
      forceFinish: function () {
        document.removeEventListener("keydown", onKeydown);
        finish(false);
      }
    };
  }
};

window.DB = DB;
