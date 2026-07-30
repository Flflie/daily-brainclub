var DB = window.DB || {};

DB.MemoryPuzzle = {
  id: "memory",
  title: "Geheugenspel",
  emoji: "🧠",

  generate: function (rng) {
    var sequence = [];
    for (var i = 0; i < 20; i++) {
      sequence.push(Math.floor(rng() * 9));
    }
    return { sequence: sequence };
  },

  mount: function (container, puzzleData, onFinish) {
    var state = {
      round: 1,
      shownLength: 0,
      playerIndex: 0,
      phase: "idle",
      failed: false
    };

    function cellsHtml(litIndex, resultClass) {
      var html = '<div class="memory-grid">';
      for (var i = 0; i < 9; i++) {
        var cls = "memory-cell";
        if (i === litIndex) cls += " lit";
        if (resultClass && i === litIndex) cls += " " + resultClass;
        html += '<div class="memory-cell" data-i="' + i + '"></div>';
      }
      html += "</div>";
      return html;
    }

    function baseRender(statusText) {
      container.innerHTML =
        '<div class="puzzle-title">' + DB.t("memory.round", { title: DB.puzzleTitle("memory"), n: state.round }) + '</div>' +
        '<div class="memory-status">' + statusText + '</div>' +
        '<div class="memory-grid">' +
        Array.from({ length: 9 }).map(function (_, i) {
          return '<div class="memory-cell" data-i="' + i + '"></div>';
        }).join("") +
        "</div>";
    }

    function getCell(i) {
      return container.querySelector('.memory-cell[data-i="' + i + '"]');
    }

    function playSequence() {
      state.phase = "showing";
      baseRender(DB.t("memory.watch"));
      var seq = puzzleData.sequence.slice(0, state.round);
      var i = 0;
      var interval = setInterval(function () {
        if (i > 0) {
          var prevCell = getCell(seq[i - 1]);
          if (prevCell) prevCell.classList.remove("lit");
        }
        if (i >= seq.length) {
          clearInterval(interval);
          setTimeout(startPlayerTurn, 300);
          return;
        }
        var cell = getCell(seq[i]);
        if (cell) cell.classList.add("lit");
        i++;
      }, 550);
    }

    function startPlayerTurn() {
      state.phase = "input";
      state.playerIndex = 0;
      baseRender(DB.t("memory.yourTurn", { n: state.round }));
      var cells = container.querySelectorAll(".memory-cell");
      cells.forEach(function (cell) {
        cell.addEventListener("click", function () {
          if (state.phase !== "input") return;
          var i = parseInt(cell.getAttribute("data-i"), 10);
          var expected = puzzleData.sequence[state.playerIndex];
          if (i === expected) {
            cell.classList.add("ok");
            setTimeout(function () { cell.classList.remove("ok"); }, 200);
            state.playerIndex++;
            if (state.playerIndex >= state.round) {
              state.phase = "idle";
              state.round++;
              if (state.round > puzzleData.sequence.length) {
                finish();
              } else {
                setTimeout(playSequence, 500);
              }
            }
          } else {
            cell.classList.add("wrong");
            state.failed = true;
            state.phase = "idle";
            setTimeout(finish, 400);
          }
        });
      });
    }

    function finish() {
      var achieved = state.round - 1;
      var score = Math.min(100, Math.round((achieved / 12) * 100));
      onFinish({ score: score, detail: DB.t("memory.detail", { n: achieved }) });
    }

    playSequence();

    return {
      forceFinish: finish
    };
  }
};

window.DB = DB;
