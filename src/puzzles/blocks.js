var DB = window.DB || {};

DB.BlocksPuzzle = {
  id: "blocks",
  title: "Blokkenpuzzel",
  emoji: "🧩",
  SIZE: 6,

  SHAPES: {
    single:   { cells: [[0,0]], rows: 1, cols: 1 },
    domino_h: { cells: [[0,0],[0,1]], rows: 1, cols: 2 },
    domino_v: { cells: [[0,0],[1,0]], rows: 2, cols: 1 },
    square:   { cells: [[0,0],[0,1],[1,0],[1,1]], rows: 2, cols: 2 },
    line3_h:  { cells: [[0,0],[0,1],[0,2]], rows: 1, cols: 3 },
    line3_v:  { cells: [[0,0],[1,0],[2,0]], rows: 3, cols: 1 },
    corner:   { cells: [[0,0],[0,1],[1,0]], rows: 2, cols: 2 },
    corner2:  { cells: [[0,0],[1,0],[1,1]], rows: 2, cols: 2 }
  },

  generate: function (rng) {
    var keys = Object.keys(this.SHAPES);
    var queue = [];
    for (var i = 0; i < 60; i++) {
      queue.push(keys[Math.floor(rng() * keys.length)]);
    }
    return { queue: queue };
  },

  mount: function (container, puzzleData, onFinish) {
    var SIZE = this.SIZE;
    var SHAPES = this.SHAPES;
    var queue = puzzleData.queue.slice();
    var queuePos = 0;
    var gridFilled = [];
    for (var r = 0; r < SIZE; r++) gridFilled.push(new Array(SIZE).fill(false));

    var hand = [drawShape(), drawShape(), drawShape()];
    var selectedHandIndex = 0;
    var points = 0;
    var message = DB.t("blocks.msgStart");

    function drawShape() {
      if (queuePos >= queue.length) return null;
      return queue[queuePos++];
    }

    function render() {
      var html = '<div class="puzzle-title">' + DB.t("blocks.scoreHeader", { title: DB.puzzleTitle("blocks"), n: points }) + '</div>';
      html += '<div class="blocks-status">' + message + '</div>';
      html += '<div class="blocks-grid">';
      for (var r = 0; r < SIZE; r++) {
        for (var c = 0; c < SIZE; c++) {
          var cls = "blocks-cell" + (gridFilled[r][c] ? " filled" : "");
          html += '<div class="' + cls + '" data-r="' + r + '" data-c="' + c + '"></div>';
        }
      }
      html += '</div>';

      html += '<div class="hand-row">';
      hand.forEach(function (shapeKey, i) {
        if (!shapeKey) {
          html += '<div class="hand-piece empty"></div>';
          return;
        }
        var shape = SHAPES[shapeKey];
        var cls = "hand-piece" + (i === selectedHandIndex ? " selected" : "");
        html += '<div class="' + cls + '" data-i="' + i + '">';
        html += '<div class="hand-mini" style="grid-template-columns:repeat(' + shape.cols + ',1fr);grid-template-rows:repeat(' + shape.rows + ',1fr)">';
        for (var rr = 0; rr < shape.rows; rr++) {
          for (var cc = 0; cc < shape.cols; cc++) {
            var on = shape.cells.some(function (p) { return p[0] === rr && p[1] === cc; });
            html += '<div class="hand-mini-cell' + (on ? " on" : "") + '"></div>';
          }
        }
        html += '</div></div>';
      });
      html += '</div>';

      container.innerHTML = html;

      container.querySelectorAll(".hand-piece").forEach(function (el) {
        if (el.classList.contains("empty")) return;
        el.addEventListener("click", function () {
          selectedHandIndex = parseInt(el.getAttribute("data-i"), 10);
          render();
        });
        el.addEventListener("pointerdown", function (e) {
          startDrag(parseInt(el.getAttribute("data-i"), 10), e);
        });
      });

      container.querySelectorAll(".blocks-cell").forEach(function (cell) {
        cell.addEventListener("click", function () {
          var r = parseInt(cell.getAttribute("data-r"), 10);
          var c = parseInt(cell.getAttribute("data-c"), 10);
          tryPlace(r, c);
        });
      });
    }

    var dragState = null;

    function startDrag(handIdx, e) {
      var shapeKey = hand[handIdx];
      if (!shapeKey) return;
      e.preventDefault();
      var shape = SHAPES[shapeKey];
      var ghost = document.createElement("div");
      ghost.className = "drag-ghost";
      ghost.style.gridTemplateColumns = "repeat(" + shape.cols + ",1fr)";
      ghost.style.gridTemplateRows = "repeat(" + shape.rows + ",1fr)";
      for (var rr = 0; rr < shape.rows; rr++) {
        for (var cc = 0; cc < shape.cols; cc++) {
          var on = shape.cells.some(function (p) { return p[0] === rr && p[1] === cc; });
          var cellEl = document.createElement("div");
          cellEl.className = "drag-ghost-cell" + (on ? " on" : "");
          ghost.appendChild(cellEl);
        }
      }
      document.body.appendChild(ghost);
      dragState = { handIdx: handIdx, shape: shape, ghostEl: ghost, lastAnchor: null };
      moveGhost(e.clientX, e.clientY);
      document.addEventListener("pointermove", onDragMove);
      document.addEventListener("pointerup", onDragEnd);
    }

    function moveGhost(x, y) {
      if (!dragState) return;
      var ghost = dragState.ghostEl;
      ghost.style.left = (x - ghost.offsetWidth / 2) + "px";
      ghost.style.top = (y - ghost.offsetHeight - 50) + "px";
    }

    function findCellUnder(x, y) {
      var wasVisible = dragState.ghostEl.style.visibility;
      dragState.ghostEl.style.visibility = "hidden";
      var el = document.elementFromPoint(x, y);
      dragState.ghostEl.style.visibility = wasVisible || "visible";
      var cellEl = el && el.closest ? el.closest(".blocks-cell") : null;
      if (!cellEl) return null;
      return { r: parseInt(cellEl.getAttribute("data-r"), 10), c: parseInt(cellEl.getAttribute("data-c"), 10) };
    }

    function clearPreview() {
      container.querySelectorAll(".blocks-cell.preview-ok, .blocks-cell.preview-bad").forEach(function (c) {
        c.classList.remove("preview-ok", "preview-bad");
      });
    }

    function showPreview(anchorR, anchorC) {
      clearPreview();
      var shape = dragState.shape;
      var targets = shape.cells.map(function (p) { return [anchorR + p[0], anchorC + p[1]]; });
      var fits = targets.every(function (t) {
        return t[0] >= 0 && t[0] < SIZE && t[1] >= 0 && t[1] < SIZE && !gridFilled[t[0]][t[1]];
      });
      targets.forEach(function (t) {
        if (t[0] >= 0 && t[0] < SIZE && t[1] >= 0 && t[1] < SIZE) {
          var cellEl = container.querySelector('.blocks-cell[data-r="' + t[0] + '"][data-c="' + t[1] + '"]');
          if (cellEl) cellEl.classList.add(fits ? "preview-ok" : "preview-bad");
        }
      });
    }

    function onDragMove(e) {
      if (!dragState) return;
      moveGhost(e.clientX, e.clientY);
      var cell = findCellUnder(e.clientX, e.clientY);
      dragState.lastAnchor = cell;
      if (cell) showPreview(cell.r, cell.c);
      else clearPreview();
    }

    function onDragEnd() {
      document.removeEventListener("pointermove", onDragMove);
      document.removeEventListener("pointerup", onDragEnd);
      if (!dragState) return;
      clearPreview();
      dragState.ghostEl.remove();
      var anchor = dragState.lastAnchor;
      var handIdx = dragState.handIdx;
      dragState = null;
      if (anchor) {
        selectedHandIndex = handIdx;
        tryPlace(anchor.r, anchor.c);
      }
    }

    function tryPlace(anchorR, anchorC) {
      var shapeKey = hand[selectedHandIndex];
      if (!shapeKey) {
        message = DB.t("blocks.msgChooseFirst");
        render();
        return;
      }
      var shape = SHAPES[shapeKey];
      var targets = shape.cells.map(function (p) { return [anchorR + p[0], anchorC + p[1]]; });

      var fits = targets.every(function (t) {
        return t[0] >= 0 && t[0] < SIZE && t[1] >= 0 && t[1] < SIZE && !gridFilled[t[0]][t[1]];
      });

      if (!fits) {
        message = DB.t("blocks.msgNoFit");
        render();
        return;
      }

      targets.forEach(function (t) { gridFilled[t[0]][t[1]] = true; });
      points += targets.length * 5;

      var clearedLines = clearFullLines();
      points += clearedLines * 40;
      message = clearedLines > 0 ? DB.t("blocks.msgLinesCleared", { n: clearedLines, pts: clearedLines * 40 }) : DB.t("blocks.msgPlaced");

      hand[selectedHandIndex] = drawShape();
      if (hand.every(function (h) { return !h; })) {
        message = DB.t("blocks.msgAllDone");
      }
      selectedHandIndex = hand.findIndex(function (h) { return !!h; });
      if (selectedHandIndex === -1) selectedHandIndex = 0;

      render();
    }

    function clearFullLines() {
      var count = 0;
      var fullRows = [];
      var fullCols = [];
      for (var r = 0; r < SIZE; r++) {
        if (gridFilled[r].every(function (v) { return v; })) fullRows.push(r);
      }
      for (var c = 0; c < SIZE; c++) {
        var full = true;
        for (var r = 0; r < SIZE; r++) if (!gridFilled[r][c]) { full = false; break; }
        if (full) fullCols.push(c);
      }
      fullRows.forEach(function (r) { for (var c = 0; c < SIZE; c++) gridFilled[r][c] = false; });
      fullCols.forEach(function (c) { for (var r = 0; r < SIZE; r++) gridFilled[r][c] = false; });
      count = fullRows.length + fullCols.length;
      return count;
    }

    function finish() {
      var score = Math.min(100, Math.round((points / 250) * 100));
      onFinish({ score: score, detail: DB.t("blocks.detail", { pts: points }) });
    }

    render();

    return {
      forceFinish: finish
    };
  }
};

window.DB = DB;
