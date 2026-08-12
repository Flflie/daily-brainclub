var DB = window.DB || {};

DB.WordSearchPuzzle = {
  id: "wordsearch",
  title: "Woordzoeker",
  emoji: "🔎",
  SIZE: 8,
  WORD_POOL: {
    nl: ["KAT", "HOND", "VOGEL", "PAARD", "VIS", "UIL", "BEER", "WOLF"],
    en: ["CAT", "DOG", "BIRD", "HORSE", "FISH", "OWL", "BEAR", "WOLF"],
    de: ["KATZE", "HUND", "VOGEL", "PFERD", "FISCH", "EULE", "BAER", "WOLF"],
    fr: ["CHAT", "CHIEN", "OISEAU", "CHEVAL", "POISSON", "HIBOU", "OURS", "LOUP"],
    es: ["GATO", "PERRO", "AVE", "CABALLO", "PEZ", "BUHO", "OSO", "LOBO"]
  },
  ALPHABET: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  DIRS: [[0, 1], [1, 0], [1, 1], [-1, 1]],

  generate: function (rng) {
    var SIZE = this.SIZE;
    var words = DB.L(this.WORD_POOL).slice().sort(function () { return 0; });
    var shuffled = words.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var t = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = t;
    }
    var chosen = shuffled.slice(0, 5);

    var grid = [];
    for (var r = 0; r < SIZE; r++) { grid.push(new Array(SIZE).fill(null)); }

    var placements = [];
    var dirs = this.DIRS;

    chosen.forEach(function (word) {
      var placed = false;
      for (var attempt = 0; attempt < 300 && !placed; attempt++) {
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
        cell.addEventListener("click", function () {
          var r = parseInt(cell.getAttribute("data-r"), 10);
          var c = parseInt(cell.getAttribute("data-c"), 10);
          handleCellClick(r, c);
        });
      });
    }

    var foundCells = {};
    function isFoundCell(r, c) { return !!foundCells[cellKey(r, c)]; }

    function handleCellClick(r, c) {
      if (!selStart) {
        selStart = { r: r, c: c };
        render();
        return;
      }
      var r1 = selStart.r, c1 = selStart.c;
      var dr = r - r1, dc = c - c1;
      var steps = Math.max(Math.abs(dr), Math.abs(dc));
      var valid = steps > 0 && (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc));

      if (valid) {
        var stepR = dr === 0 ? 0 : dr / Math.abs(dr);
        var stepC = dc === 0 ? 0 : dc / Math.abs(dc);
        var cells = [];
        var letters = "";
        for (var i = 0; i <= steps; i++) {
          var rr = r1 + stepR * i, cc = c1 + stepC * i;
          cells.push([rr, cc]);
          letters += grid[rr][cc];
        }
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
