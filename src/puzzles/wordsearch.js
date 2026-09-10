var DB = window.DB || {};

DB.WordSearchPuzzle = {
  id: "wordsearch",
  title: "Woordzoeker",
  emoji: "🔎",
  SIZE: 8,
  WORD_POOL: {
    nl: ["KAT", "HOND", "VOGEL", "PAARD", "VIS", "UIL", "BEER", "WOLF", "LEEUW", "TIJGER", "OLIFANT", "GIRAFFE", "ZEBRA", "AAP", "KROKODIL", "DOLFIJN", "HAAI", "SCHAAP", "GEIT", "KOE", "VARKEN", "KIP", "EEND", "MUIS", "KONIJN", "VOS", "HERT", "EEKHOORN", "PINGUIN", "KOALA", "PANDA", "KAMEEL", "EZEL", "SLANG", "KIKKER", "SPIN", "MIER", "BIJ", "ZON", "MAAN", "STER", "BOOM", "BLOEM", "WOLK", "REGEN", "SNEEUW", "BERG", "ZEE", "STRAND", "APPEL", "BROOD", "KAAS", "MELK", "TAART", "TAFEL", "STOEL", "DEUR", "RAAM", "AUTO", "FIETS", "TREIN", "BOOT", "ROOD", "BLAUW", "GROEN", "GEEL", "HOOFD", "HAND", "VOET", "OOG", "DRAAK", "RUPS", "KREEFT", "GARNAAL", "OTTER", "BEVER", "LYNX", "JAGUAR", "BUFFEL", "KALKOEN", "PAUW", "ZWAAN", "REIGER", "SPECHT", "MEREL", "RAAF", "KRAAI", "DUIF", "GANS", "FAZANT", "EGEL", "MOL", "RAT", "HAMSTER", "CAVIA", "WEZEL", "MARTER", "ELAND", "BIZON", "LAMA", "ALPACA", "FLAMINGO", "IJSBEER", "ZEEHOND", "WALRUS", "ORKA", "PALING", "FOREL", "KARPER", "SNOEK", "BAARS", "TONIJN", "ZALM", "HARING", "MAKREEL", "VINK", "WORM", "SLAK", "VLINDER", "KEVER", "WESP", "HOMMEL", "MUG", "MOT", "MOS", "VAREN", "STRUIK", "TAK", "BLAD", "WORTEL", "ZAAD", "GRAAN", "MAIS", "KLAVER", "DISTEL", "ROOS", "TULP", "LELIE", "VIOOL", "NARCIS", "BEEK", "VIJVER", "SLOOT", "KUST", "RIF", "GOLF", "VLOED", "GROT", "ROTS", "KLIP", "VULKAAN", "OASE", "HAGEL", "MIST", "WIND", "ORKAAN", "BLIKSEM", "DONDER", "VORST", "DAUW", "EILAND", "BED", "KAST", "BANK", "LAMP", "KLOK", "SPIEGEL", "KUSSEN", "DEKEN", "GORDIJN", "VLOER", "MUUR", "DAK", "TRAP", "SLEUTEL", "SLOT", "HAMER", "ZAAG", "TANG", "BOOR", "MES", "VORK", "LEPEL", "BORD", "KOM", "PAN", "KOP", "GLAS", "FLES", "EMMER", "BEZEM", "DWEIL", "DOEK", "SPONS", "KAM", "ZEEP", "SCHAAR", "LIJM", "PEN", "POTLOOD", "PAPIER", "BOEK", "KRANT", "BRIL", "TAS", "KOFFER", "PARAPLU", "HOED", "PET", "SJAAL", "JAS", "BROEK", "SOK", "SCHOEN", "LAARS", "RIEM", "BUS", "TRAM", "TAXI", "METRO", "SCHIP", "KANO", "RAKET", "BALLON", "STEP", "KAR", "SLEDE", "WAGEN", "KOETS", "VLOT", "VEER", "ANKER", "ZEIL", "ROER", "MAST", "ORANJE", "ROZE", "WIT", "GRIJS", "GOUD", "ZILVER", "PAARS", "OOR", "NEUS", "MOND", "ARM", "BEEN", "KNIE", "TEEN", "VINGER", "DUIM", "HIEL", "ENKEL", "POLS", "NEK", "RUG", "BUIK", "HART", "LONG", "MAAG", "LEVER", "NIER", "BOT", "SPIER", "HUID", "HAAR", "TAND", "TONG", "LIP", "WANG", "KIN", "PEER", "BANAAN", "DRUIF", "KERS", "PRUIM", "PERZIK", "CITROEN", "MELOEN", "AARDBEI", "FRAMBOOS", "BRAAM", "BES", "NOOT", "WALNOOT", "AMANDEL", "RIJST", "PASTA", "SOEP", "SALADE", "PATAT", "FRIET", "EI", "BOTER", "HONING", "JAM", "SUIKER", "ZOUT", "PEPER", "KRUID", "KOFFIE", "THEE", "SAP", "WIJN", "BIER", "KOEK", "WAFEL", "SNOEP", "DROP", "PINDA", "KOOL", "SLA", "TOMAAT", "PREI", "BIET", "RADIJS", "ERWT", "BOON", "LINZE"],
    en: ["CAT", "DOG", "BIRD", "HORSE", "FISH", "OWL", "BEAR", "WOLF", "LION", "TIGER", "ELEPHANT", "GIRAFFE", "ZEBRA", "MONKEY", "LIZARD", "DOLPHIN", "SHARK", "SHEEP", "GOAT", "COW", "PIG", "CHICKEN", "DUCK", "MOUSE", "RABBIT", "FOX", "DEER", "SQUIRREL", "PENGUIN", "KOALA", "PANDA", "CAMEL", "DONKEY", "SNAKE", "FROG", "SPIDER", "ANT", "BEE", "SUN", "MOON", "STAR", "TREE", "FLOWER", "CLOUD", "RAIN", "SNOW", "MOUNTAIN", "SEA", "BEACH", "APPLE", "BREAD", "CHEESE", "MILK", "CAKE", "TABLE", "CHAIR", "DOOR", "WINDOW", "CAR", "BIKE", "TRAIN", "BOAT", "RED", "BLUE", "GREEN", "YELLOW", "HEAD", "HAND", "FOOT", "EYE", "DRAGON", "CATERPILLAR", "LOBSTER", "SHRIMP", "OTTER", "BEAVER", "LYNX", "JAGUAR", "BUFFALO", "TURKEY", "PEACOCK", "SWAN", "HERON", "MAGPIE", "CROW", "RAVEN", "DOVE", "GOOSE", "HEDGEHOG", "MOLE", "RAT", "HAMSTER", "WEASEL", "MOOSE", "BISON", "LLAMA", "ALPACA", "FLAMINGO", "WALRUS", "SEAL", "ORCA", "WHALE", "EEL", "TROUT", "CARP", "PIKE", "PERCH", "TUNA", "SALMON", "HERRING", "WORM", "SNAIL", "SLUG", "BUTTERFLY", "BEETLE", "WASP", "MOTH", "GNAT", "FERN", "MOSS", "BUSH", "SHRUB", "BRANCH", "LEAF", "ROOT", "SEED", "GRAIN", "CLOVER", "THISTLE", "ROSE", "TULIP", "LILY", "DAISY", "CREEK", "POND", "BROOK", "MARSH", "COAST", "REEF", "WAVE", "TIDE", "CAVE", "ROCK", "CLIFF", "VOLCANO", "OASIS", "HAIL", "MIST", "WIND", "STORM", "THUNDER", "FROST", "DEW", "ISLAND", "BED", "SHELF", "COUCH", "LAMP", "CLOCK", "MIRROR", "PILLOW", "BLANKET", "CURTAIN", "FLOOR", "WALL", "ROOF", "STAIRS", "KEY", "LOCK", "HAMMER", "SAW", "DRILL", "KNIFE", "FORK", "SPOON", "PLATE", "BOWL", "PAN", "CUP", "GLASS", "BOTTLE", "BUCKET", "BROOM", "CLOTH", "SPONGE", "COMB", "SOAP", "TOWEL", "GLUE", "PEN", "PENCIL", "PAPER", "BOOK", "NEWSPAPER", "GLASSES", "BAG", "SUITCASE", "UMBRELLA", "HAT", "SCARF", "COAT", "TROUSERS", "SOCK", "SHOE", "BOOT", "BELT", "BUS", "TRAM", "TAXI", "SUBWAY", "SHIP", "CANOE", "ROCKET", "BALLOON", "SCOOTER", "CART", "SLED", "WAGON", "RAFT", "FERRY", "ANCHOR", "SAIL", "MAST", "ORANGE", "PINK", "WHITE", "GREY", "GOLD", "SILVER", "PURPLE", "EAR", "NOSE", "MOUTH", "ARM", "LEG", "KNEE", "TOE", "FINGER", "THUMB", "HEEL", "ANKLE", "WRIST", "NECK", "BACK", "BELLY", "HEART", "LUNG", "STOMACH", "LIVER", "SKIN", "HAIR", "TOOTH", "TONGUE", "LIP", "CHEEK", "CHIN", "PEAR", "BANANA", "PLUM", "CHERRY", "PEACH", "MELON", "BERRY", "MANGO", "GRAPE", "LEMON", "LIME", "NUT", "WALNUT", "ALMOND", "RICE", "PASTA", "SOUP", "SALAD", "FRIES", "EGG", "BUTTER", "HONEY", "JAM", "SUGAR", "SALT", "PEPPER", "HERB", "COFFEE", "TEA", "JUICE", "WINE", "BEER", "COOKIE", "WAFFLE", "CANDY", "PEANUT", "CABBAGE", "TOMATO", "LEEK", "BEET", "RADISH", "PEA", "BEAN", "LENTIL"],
    de: ["KATZE", "HUND", "VOGEL", "PFERD", "FISCH", "EULE", "BAER", "WOLF", "LOEWE", "TIGER", "ELEFANT", "GIRAFFE", "ZEBRA", "AFFE", "KROKODIL", "DELFIN", "HAI", "SCHAF", "ZIEGE", "KUH", "SCHWEIN", "HUHN", "ENTE", "MAUS", "ADLER", "FUCHS", "HIRSCH", "IGEL", "PINGUIN", "KOALA", "PANDA", "KAMEL", "ESEL", "SCHLANGE", "FROSCH", "SPINNE", "AMEISE", "BIENE", "SONNE", "MOND", "STERN", "BAUM", "BLUME", "WOLKE", "REGEN", "SCHNEE", "BERG", "MEER", "STRAND", "APFEL", "BROT", "KAESE", "MILCH", "KUCHEN", "TISCH", "STUHL", "TUER", "FENSTER", "AUTO", "FAHRRAD", "ZUG", "BOOT", "ROT", "BLAU", "GRUEN", "GELB", "KOPF", "HAND", "FUSS", "AUGE", "DRACHE", "RAUPE", "HUMMER", "OTTER", "BIBER", "LUCHS", "JAGUAR", "BUEFFEL", "TRUTHAHN", "PFAU", "SCHWAN", "REIHER", "SPECHT", "AMSEL", "KRAEHE", "RABE", "TAUBE", "GANS", "MOLL", "RATTE", "MOOS", "FARN", "BUSCH", "AST", "BLATT", "WURZEL", "SAMEN", "KLEE", "DISTEL", "ROSE", "TULPE", "LILIE", "BACH", "TEICH", "KUESTE", "RIFF", "WELLE", "HOEHLE", "FELS", "VULKAN", "OASE", "HAGEL", "NEBEL", "WIND", "STURM", "DONNER", "FROST", "TAU", "INSEL", "BETT", "REGAL", "LAMPE", "UHR", "SPIEGEL", "KISSEN", "DECKE", "BODEN", "WAND", "DACH", "TREPPE", "SCHLUESSEL", "HAMMER", "SAEGE", "MESSER", "GABEL", "LOEFFEL", "TELLER", "TOPF", "GLAS", "EIMER", "BESEN", "TUCH", "SEIFE", "STIFT", "PAPIER", "BUCH", "ZEITUNG", "BRILLE", "TASCHE", "KOFFER", "SCHIRM", "HUT", "SCHAL", "MANTEL", "HOSE", "SOCKE", "SCHUH", "GUERTEL", "BUS", "TAXI", "SCHIFF", "KANU", "RAKETE", "BALLON", "ROLLER", "KARREN", "SCHLITTEN", "FLOSS", "ANKER", "SEGEL", "MAST", "ORANGE", "ROSA", "WEISS", "GRAU", "GOLD", "SILBER", "LILA", "OHR", "NASE", "MUND", "ARM", "BEIN", "KNIE", "ZEH", "FINGER", "DAUMEN", "FERSE", "HALS", "RUECKEN", "BAUCH", "HERZ", "LUNGE", "MAGEN", "LEBER", "HAUT", "HAAR", "ZAHN", "ZUNGE", "LIPPE", "KINN", "BIRNE", "BANANE", "PFLAUME", "KIRSCHE", "MELONE", "BEERE", "MANGO", "TRAUBE", "ZITRONE", "NUSS", "REIS", "NUDEL", "SUPPE", "SALAT", "POMMES", "EI", "BUTTER", "HONIG", "ZUCKER", "SALZ", "PFEFFER", "KAFFEE", "TEE", "SAFT", "WEIN", "KEKS", "WAFFEL", "BOHNE", "ERBSE"],
    fr: ["CHAT", "CHIEN", "OISEAU", "CHEVAL", "POISSON", "HIBOU", "OURS", "LOUP", "LION", "TIGRE", "ELEPHANT", "GIRAFE", "ZEBRE", "SINGE", "LEZARD", "DAUPHIN", "REQUIN", "MOUTON", "CHEVRE", "VACHE", "COCHON", "POULE", "CANARD", "SOURIS", "LAPIN", "RENARD", "CERF", "ECUREUIL", "PINGOUIN", "KOALA", "PANDA", "CHAMEAU", "ANE", "SERPENT", "TORTUE", "ARAIGNEE", "FOURMI", "ABEILLE", "SOLEIL", "LUNE", "ETOILE", "ARBRE", "FLEUR", "NUAGE", "PLUIE", "NEIGE", "MONTAGNE", "MER", "PLAGE", "POMME", "PAIN", "FROMAGE", "LAIT", "GATEAU", "TABLE", "CHAISE", "PORTE", "FENETRE", "VOITURE", "VELO", "TRAIN", "BATEAU", "ROUGE", "BLEU", "VERT", "JAUNE", "TETE", "MAIN", "PIED", "OEIL", "DRAGON", "HOMARD", "LOUTRE", "CASTOR", "LYNX", "JAGUAR", "BISON", "DINDON", "PAON", "CYGNE", "HERON", "PIVERT", "MERLE", "CORBEAU", "PIGEON", "OIE", "TAUPE", "RAT", "HERISSON", "BELETTE", "LAMA", "ALPAGA", "FLAMANT", "PHOQUE", "ORQUE", "BALEINE", "ANGUILLE", "TRUITE", "CARPE", "THON", "SAUMON", "VER", "ESCARGOT", "LIMACE", "PAPILLON", "SCARABEE", "GUEPE", "MOUCHE", "FOUGERE", "MOUSSE", "BUISSON", "BRANCHE", "FEUILLE", "RACINE", "GRAINE", "TREFLE", "ROSE", "TULIPE", "LIS", "RUISSEAU", "MARE", "COTE", "RECIF", "VAGUE", "MAREE", "GROTTE", "ROCHER", "VOLCAN", "OASIS", "GRELE", "BRUME", "VENT", "ORAGE", "TONNERRE", "GEL", "ILE", "LIT", "ETAGERE", "LAMPE", "MIROIR", "COUSSIN", "PLANCHER", "MUR", "TOIT", "MARCHE", "CLE", "MARTEAU", "SCIE", "COUTEAU", "FOURCHETTE", "CUILLERE", "ASSIETTE", "BOL", "VERRE", "SEAU", "BALAI", "SAVON", "STYLO", "CRAYON", "PAPIER", "LIVRE", "JOURNAL", "LUNETTES", "SAC", "VALISE", "CHAPEAU", "ECHARPE", "MANTEAU", "PANTALON", "CHAUSSETTE", "SOULIER", "CEINTURE", "BUS", "TAXI", "NAVIRE", "CANOE", "FUSEE", "BALLON", "TROTTINETTE", "CHARIOT", "TRAINEAU", "RADEAU", "ANCRE", "VOILE", "ORANGE", "BLANC", "GRIS", "OR", "ARGENT", "VIOLET", "OREILLE", "NEZ", "BOUCHE", "BRAS", "JAMBE", "GENOU", "ORTEIL", "DOIGT", "POUCE", "TALON", "COU", "DOS", "VENTRE", "COEUR", "POUMON", "ESTOMAC", "FOIE", "PEAU", "CHEVEU", "DENT", "LANGUE", "LEVRE", "MENTON", "POIRE", "BANANE", "PRUNE", "CERISE", "MELON", "BAIE", "MANGUE", "RAISIN", "CITRON", "NOIX", "RIZ", "PATES", "SOUPE", "SALADE", "FRITES", "BEURRE", "MIEL", "SUCRE", "SEL", "POIVRE", "CAFE", "THE", "JUS", "VIN", "BIERE", "BISCUIT", "GAUFRE", "HARICOT"],
    es: ["GATO", "PERRO", "AVE", "CABALLO", "PEZ", "BUHO", "OSO", "LOBO", "LEON", "TIGRE", "ELEFANTE", "JIRAFA", "CEBRA", "MONO", "LAGARTO", "DELFIN", "TIBURON", "OVEJA", "CABRA", "VACA", "CERDO", "GALLINA", "PATO", "RATON", "CONEJO", "ZORRO", "CIERVO", "ARDILLA", "PINGUINO", "KOALA", "PANDA", "CAMELLO", "BURRO", "VIBORA", "RANA", "ARANA", "HORMIGA", "ABEJA", "SOL", "LUNA", "ESTRELLA", "ARBOL", "FLOR", "NUBE", "LLUVIA", "NIEVE", "MONTANA", "MAR", "PLAYA", "MANZANA", "PAN", "QUESO", "LECHE", "PASTEL", "MESA", "SILLA", "PUERTA", "VENTANA", "COCHE", "BICI", "TREN", "BARCO", "ROJO", "AZUL", "VERDE", "AMARILLO", "CABEZA", "MANO", "PIE", "OJO", "DRAGON", "LANGOSTA", "NUTRIA", "CASTOR", "LINCE", "JAGUAR", "BISONTE", "PAVO", "PAVOREAL", "CISNE", "GARZA", "MIRLO", "CUERVO", "PALOMA", "GANSO", "TOPO", "RATA", "ERIZO", "COMADREJA", "LLAMA", "ALPACA", "FLAMENCO", "FOCA", "ORCA", "BALLENA", "ANGUILA", "TRUCHA", "CARPA", "ATUN", "SALMON", "GUSANO", "CARACOL", "BABOSA", "MARIPOSA", "ESCARABAJO", "AVISPA", "MOSCA", "HELECHO", "MUSGO", "ARBUSTO", "RAMA", "HOJA", "RAIZ", "SEMILLA", "TREBOL", "ROSA", "TULIPAN", "LIRIO", "ARROYO", "CHARCA", "COSTA", "ARRECIFE", "OLA", "MAREA", "CUEVA", "ROCA", "VOLCAN", "OASIS", "GRANIZO", "NIEBLA", "VIENTO", "TORMENTA", "TRUENO", "HIELO", "ISLA", "CAMA", "ESTANTE", "LAMPARA", "ESPEJO", "COJIN", "SUELO", "PARED", "TECHO", "ESCALERA", "LLAVE", "MARTILLO", "SIERRA", "CUCHILLO", "TENEDOR", "CUCHARA", "PLATO", "CUENCO", "VASO", "CUBO", "ESCOBA", "JABON", "BOLIGRAFO", "LAPIZ", "PAPEL", "LIBRO", "PERIODICO", "GAFAS", "BOLSA", "MALETA", "SOMBRERO", "BUFANDA", "ABRIGO", "PANTALON", "CALCETIN", "ZAPATO", "BOTA", "CINTURON", "AUTOBUS", "TAXI", "NAVIO", "CANOA", "COHETE", "GLOBO", "PATINETE", "CARRO", "TRINEO", "BALSA", "ANCLA", "VELA", "MASTIL", "NARANJA", "ROSADO", "BLANCO", "GRIS", "ORO", "PLATA", "MORADO", "OREJA", "NARIZ", "BOCA", "BRAZO", "PIERNA", "RODILLA", "DEDO", "PULGAR", "TALON", "CUELLO", "ESPALDA", "BARRIGA", "CORAZON", "PULMON", "ESTOMAGO", "HIGADO", "PIEL", "PELO", "DIENTE", "LENGUA", "LABIO", "MENTON", "PERA", "PLATANO", "CIRUELA", "CEREZA", "MELON", "BAYA", "MANGO", "UVA", "LIMON", "NUEZ", "ARROZ", "SOPA", "ENSALADA", "PATATAS", "HUEVO", "MANTEQUILLA", "MIEL", "AZUCAR", "SAL", "PIMIENTA", "CAFE", "ZUMO", "VINO", "CERVEZA", "GALLETA", "GOFRE", "JUDIA"]
  },
  ALPHABET: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  DIRS: [[0, 1], [1, 0], [1, 1], [-1, 1]],

  generate: function (rng, opts) {
    var SIZE = this.SIZE;
    // Only words that can actually fit in the grid.
    var pool = DB.L(this.WORD_POOL).filter(function (w) { return w.length <= SIZE; });
    var avoid = (opts && opts.avoid) || [];
    if (avoid.length) {
      var avoidSet = {};
      avoid.forEach(function (w) { avoidSet[w] = true; });
      var filtered = pool.filter(function (w) { return !avoidSet[w]; });
      if (filtered.length >= 15) pool = filtered;
    }
    var shuffled = pool.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var t = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = t;
    }
    var chosen = shuffled.slice(0, 5).sort(function (a, b) { return b.length - a.length; });

    var grid = [];
    for (var r = 0; r < SIZE; r++) { grid.push(new Array(SIZE).fill(null)); }

    var placements = [];
    var dirs = this.DIRS;

    chosen.forEach(function (word) {
      var placed = false;
      for (var attempt = 0; attempt < 500 && !placed; attempt++) {
        var dir = dirs[Math.floor(rng() * dirs.length)];
        var r0 = Math.floor(rng() * SIZE);
        var c0 = Math.floor(rng() * SIZE);
        var endR = r0 + dir[0] * (word.length - 1);
        var endC = c0 + dir[1] * (word.length - 1);
        if (endR < 0 || endR >= SIZE || endC < 0 || endC >= SIZE) continue;

        var fits = true;
        for (var i = 0; i < word.length; i++) {
          var rr = r0 + dir[0] * i, cc = c0 + dir[1] * i;
          var existing = grid[rr][cc];
          if (existing && existing !== word[i]) { fits = false; break; }
        }
        if (!fits) continue;

        var cells = [];
        for (var i = 0; i < word.length; i++) {
          var rr = r0 + dir[0] * i, cc = c0 + dir[1] * i;
          grid[rr][cc] = word[i];
          cells.push([rr, cc]);
        }
        placements.push({ word: word, cells: cells });
        placed = true;
      }
    });

    for (var r = 0; r < SIZE; r++) {
      for (var c = 0; c < SIZE; c++) {
        if (!grid[r][c]) {
          grid[r][c] = this.ALPHABET[Math.floor(rng() * this.ALPHABET.length)];
        }
      }
    }

    return { grid: grid, words: placements.map(function (p) { return p.word; }) };
  },

  mount: function (container, puzzleData, onFinish) {
    var SIZE = this.SIZE;
    var grid = puzzleData.grid;
    var words = puzzleData.words;
    var found = {};
    var selStart = null;

    function cellKey(r, c) { return r + "_" + c; }

    function render() {
      var html = '<div class="puzzle-title">' + DB.t("wordsearch.instruction", { title: DB.puzzleTitle("wordsearch"), n: words.length }) + '</div>';
      html += '<div class="wordlist">';
      words.forEach(function (w) {
        html += '<span class="wordlist-item' + (found[w] ? ' found' : '') + '">' + w + '</span>';
      });
      html += '</div>';
      html += '<div class="wordsearch-grid">';
      for (var r = 0; r < SIZE; r++) {
        for (var c = 0; c < SIZE; c++) {
          var cls = "wordsearch-cell";
          if (selStart && selStart.r === r && selStart.c === c) cls += " selecting";
          if (isFoundCell(r, c)) cls += " found";
          html += '<div class="' + cls + '" data-r="' + r + '" data-c="' + c + '">' + grid[r][c] + '</div>';
        }
      }
      html += '</div>';
      container.innerHTML = html;

      container.querySelectorAll(".wordsearch-cell").forEach(function (cell) {
        cell.addEventListener("pointerdown", function (e) {
          e.preventDefault();
          var r = parseInt(cell.getAttribute("data-r"), 10);
          var c = parseInt(cell.getAttribute("data-c"), 10);
          pressState = { r: r, c: c, moved: false };
          document.addEventListener("pointermove", onDragMove);
          document.addEventListener("pointerup", onDragEnd);
        });
      });
    }

    var foundCells = {};
    function isFoundCell(r, c) { return !!foundCells[cellKey(r, c)]; }

    var pressState = null;
    var dragPathKeys = {};

    function pathCells(r1, c1, r, c) {
      var dr = r - r1, dc = c - c1;
      var steps = Math.max(Math.abs(dr), Math.abs(dc));
      var valid = steps > 0 && (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc));
      if (!valid) return null;
      var stepR = dr === 0 ? 0 : dr / Math.abs(dr);
      var stepC = dc === 0 ? 0 : dc / Math.abs(dc);
      var cells = [];
      for (var i = 0; i <= steps; i++) {
        cells.push([r1 + stepR * i, c1 + stepC * i]);
      }
      return cells;
    }

    function updatePathPreview(r, c) {
      dragPathKeys = {};
      if (!selStart) return;
      var cells = pathCells(selStart.r, selStart.c, r, c);
      if (!cells) return;
      cells.forEach(function (rc) { dragPathKeys[cellKey(rc[0], rc[1])] = true; });
      container.querySelectorAll(".wordsearch-cell").forEach(function (cellEl) {
        var rr = cellEl.getAttribute("data-r"), cc = cellEl.getAttribute("data-c");
        cellEl.classList.toggle("selecting", !!dragPathKeys[cellKey(rr, cc)]);
      });
    }

    function onDragMove(e) {
      if (!pressState) return;
      var el = document.elementFromPoint(e.clientX, e.clientY);
      var cellEl = el && el.closest ? el.closest(".wordsearch-cell") : null;
      if (!cellEl) return;
      var r = parseInt(cellEl.getAttribute("data-r"), 10);
      var c = parseInt(cellEl.getAttribute("data-c"), 10);
      if (r === pressState.r && c === pressState.c) return;

      if (!pressState.moved) {
        pressState.moved = true;
        selStart = { r: pressState.r, c: pressState.c };
      }
      updatePathPreview(r, c);
    }

    function onDragEnd(e) {
      document.removeEventListener("pointermove", onDragMove);
      document.removeEventListener("pointerup", onDragEnd);
      if (!pressState) return;
      var wasDrag = pressState.moved;
      var startR = pressState.r, startC = pressState.c;
      pressState = null;

      if (wasDrag) {
        var el = document.elementFromPoint(e.clientX, e.clientY);
        var cellEl = el && el.closest ? el.closest(".wordsearch-cell") : null;
        if (cellEl) {
          var r = parseInt(cellEl.getAttribute("data-r"), 10);
          var c = parseInt(cellEl.getAttribute("data-c"), 10);
          completeSelection(r, c);
        } else {
          clearPreview();
          selStart = null;
          render();
        }
        return;
      }

      // Plain tap, no movement: fall back to the classic first-tap/second-tap flow.
      if (!selStart) {
        selStart = { r: startR, c: startC };
        render();
      } else {
        completeSelection(startR, startC);
      }
    }

    function clearPreview() {
      container.querySelectorAll(".wordsearch-cell").forEach(function (cellEl) {
        cellEl.classList.remove("selecting");
      });
    }

    function completeSelection(r, c) {
      var cells = pathCells(selStart.r, selStart.c, r, c);

      if (cells) {
        var letters = cells.map(function (rc) { return grid[rc[0]][rc[1]]; }).join("");
        var reversed = letters.split("").reverse().join("");
        var match = words.find(function (w) { return !found[w] && (w === letters || w === reversed); });
        if (match) {
          found[match] = true;
          cells.forEach(function (rc) { foundCells[cellKey(rc[0], rc[1])] = true; });
        }
      }

      selStart = null;
      render();

      if (Object.keys(found).length === words.length) {
        setTimeout(finish, 400);
      }
    }

    function finish() {
      var foundCount = Object.keys(found).length;
      var score = Math.round((foundCount / words.length) * 100);
      onFinish({ score: score, detail: DB.t("wordsearch.detail", { found: foundCount, total: words.length }) });
    }

    render();

    return {
      forceFinish: finish
    };
  }
};

window.DB = DB;
