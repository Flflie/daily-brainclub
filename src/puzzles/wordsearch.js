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
