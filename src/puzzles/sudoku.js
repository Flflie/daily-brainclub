var DB = window.DB || {};

DB.SudokuPuzzle = {
  id: "sudoku",
  title: "Mini sudoku",
  emoji: "🔢",
  SIZE: 4,

  shuffleArray: function (arr, rng) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  },

  swapRows: function (grid, r1, r2) {
    var t = grid[r1]; grid[r1] = grid[r2]; grid[r2] = t;
  },

  swapCols: function (grid, c1, c2) {
    for (var r = 0; r < grid.length; r++) {
      var t = grid[r][c1]; grid[r][c1] = grid[r][c2]; grid[r][c2] = t;
    }
  },

  generate: function (rng) {
    var base = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 1, 4, 3],
      [4, 3, 2, 1]
    ];
    var digits = this.shuffleArray([1, 2, 3, 4], rng);
    var solution = base.map(function (row) {
      return row.map(function (v) { return digits[v - 1]; });
    });

    if (rng() < 0.5) this.swapRows(solution, 0, 1);
    if (rng() < 0.5) this.swapRows(solution, 2, 3);
    if (rng() < 0.5) { this.swapRows(solution, 0, 2); this.swapRows(solution, 1, 3); }
    if (rng() < 0.5) this.swapCols(solution, 0, 1);
    if (rng() < 0.5) this.swapCols(solution, 2, 3);
    if (rng() < 0.5) { this.swapCols(solution, 0, 2); this.swapCols(solution, 1, 3); }

    var indices = this.shuffleArray([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], rng);
    var givenCount = 7;
    var givenSet = {};
    for (var i = 0; i < givenCount; i++) givenSet[indices[i]] = true;

    var puzzle = solution.map(function (row) { return row.slice(); });
    for (var idx = 0; idx < 16; idx++) {
      if (!givenSet[idx]) {
        var r = Math.floor(idx / 4), c = idx % 4;
        puzzle[r][c] = 0;
      }
    }

    return { solution: solution, puzzle: puzzle };
  },

  mount: function (container, puzzleData, onFinish) {
    var SIZE = this.SIZE;
    var userGrid = puzzleData.puzzle.map(function (row) { return row.slice(); });
    var given = puzzleData.puzzle;
    var solution = puzzleData.solution;
    var selected = null;

    function totalBlanks() {
      var count = 0;
      for (var r = 0; r < SIZE; r++) for (var c = 0; c < SIZE; c++) if (given[r][c] === 0) count++;
      return count;
    }

    function boxOf(r, c) {
      var br = r < 2 ? 0 : 2, bc = c < 2 ? 0 : 2;
      return { r0: br, r1: br + 1, c0: bc, c1: bc + 1 };
    }

    function hasConflict(r, c) {
      var val = userGrid[r][c];
      if (!val) return false;
      for (var cc = 0; cc < SIZE; cc++) {
        if (cc !== c) {
          var other = given[r][cc] !== 0 ? given[r][cc] : userGrid[r][cc];
          if (other === val) return true;
        }
      }
      for (var rr = 0; rr < SIZE; rr++) {
        if (rr !== r) {
          var other2 = given[rr][c] !== 0 ? given[rr][c] : userGrid[rr][c];
          if (other2 === val) return true;
        }
      }
      var box = boxOf(r, c);
      for (var br = box.r0; br <= box.r1; br++) {
        for (var bc = box.c0; bc <= box.c1; bc++) {
          if (br === r && bc === c) continue;
          var other3 = given[br][bc] !== 0 ? given[br][bc] : userGrid[br][bc];
          if (other3 === val) return true;
        }
      }
      return false;
    }

    function render() {
      var html = '<div class="puzzle-title">' + DB.t("sudoku.instruction", { title: DB.puzzleTitle("sudoku") }) + '</div>';
      html += '<div class="sudoku-grid">';
      for (var r = 0; r < SIZE; r++) {
        for (var c = 0; c < SIZE; c++) {
          var isGiven = given[r][c] !== 0;
          var val = isGiven ? given[r][c] : (userGrid[r][c] || "");
          var cls = "sudoku-cell";
          if (isGiven) cls += " given";
          if (selected && selected.r === r && selected.c === c) cls += " selected";
          if (!isGiven && userGrid[r][c] && hasConflict(r, c)) cls += " conflict";
          if ((c === 1) ) cls += " border-right";
          if ((r === 1)) cls += " border-bottom";
          html += '<div class="' + cls + '" data-r="' + r + '" data-c="' + c + '">' + val + '</div>';
        }
      }
      html += '</div>';
      html += '<div class="numpad">';
      for (var n = 1; n <= 4; n++) {
        html += '<div class="numpad-key" data-n="' + n + '">' + n + '</div>';
      }
      html += '<div class="numpad-key wide" data-n="0">' + DB.t("sudoku.clear") + '</div>';
      html += '</div>';
      html += '<button class="btn" id="sudokuCheck" style="margin-top:12px">' + DB.t("sudoku.check") + '</button>';

      container.innerHTML = html;

      container.querySelectorAll(".sudoku-cell").forEach(function (cell) {
        cell.addEventListener("click", function () {
          var r = parseInt(cell.getAttribute("data-r"), 10);
          var c = parseInt(cell.getAttribute("data-c"), 10);
          if (given[r][c] !== 0) return;
          selected = { r: r, c: c };
          render();
        });
      });

      container.querySelectorAll(".numpad-key").forEach(function (key) {
        key.addEventListener("click", function () {
          if (!selected) return;
          var n = parseInt(key.getAttribute("data-n"), 10);
          userGrid[selected.r][selected.c] = n;
          render();
        });
      });

      container.querySelector("#sudokuCheck").addEventListener("click", finish);
    }

    function finish() {
      var blanks = totalBlanks();
      var correct = 0;
      for (var r = 0; r < SIZE; r++) {
        for (var c = 0; c < SIZE; c++) {
          if (given[r][c] === 0 && userGrid[r][c] === solution[r][c]) correct++;
        }
      }
      var score = blanks === 0 ? 100 : Math.round((correct / blanks) * 100);
      onFinish({ score: score, detail: DB.t("sudoku.detail", { correct: correct, total: blanks }) });
    }

    document.addEventListener("keydown", onKeydown);
    function onKeydown(e) {
      if (!selected) return;
      if (/^[0-4]$/.test(e.key)) {
        userGrid[selected.r][selected.c] = parseInt(e.key, 10);
        render();
      }
    }

    render();

    return {
      forceFinish: function () {
        document.removeEventListener("keydown", onKeydown);
        finish();
      }
    };
  }
};

window.DB = DB;
