var DB = window.DB || {};

DB.mpState = null;

DB.mpApi = function (path, options) {
  return fetch(path, options)
    .catch(function () {
      throw { offline: true };
    })
    .then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok || !data.ok) throw { data: data, status: res.status };
        return data;
      });
    });
};

DB.mpStopPolling = function () {
  if (DB.mpState && DB.mpState.pollTimer) {
    clearInterval(DB.mpState.pollTimer);
    DB.mpState.pollTimer = null;
  }
};

DB.mpErrorMessage = function (err) {
  if (err && err.offline) return DB.t("mp.error.offline");
  if (err && err.data && err.data.error === "not_found") return DB.t("mp.error.notFound");
  if (err && err.data && err.data.error === "already_started") return DB.t("mp.error.started");
  return DB.t("mp.error.generic");
};

DB.renderMultiplayerHome = function () {
  DB.mpStopPolling();
  DB.mpState = null;
  DB.lastRender = DB.renderMultiplayerHome;
  var state = DB.loadState();

  DB.appRoot.innerHTML =
    DB.renderHeader(state) +
    '<div class="card">' +
      '<h2>' + DB.t("mp.title") + '</h2>' +
      '<p class="muted">' + DB.t("mp.subtitle") + '</p>' +
      '<div id="mpError" class="mp-error" hidden></div>' +
      '<button class="btn" id="mpCreateBtn" style="margin-top:8px">' + DB.t("mp.createBtn") + '</button>' +
      '<div class="mp-join-row">' +
        '<label class="muted" for="mpJoinCode">' + DB.t("mp.joinLabel") + '</label>' +
        '<div class="mp-join-inline">' +
          '<input class="mp-code-input" id="mpJoinCode" maxlength="5" placeholder="' + DB.t("mp.joinPlaceholder") + '" autocomplete="off" />' +
          '<button class="btn secondary" id="mpJoinBtn">' + DB.t("mp.joinBtn") + '</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<button class="btn secondary" id="mpBackHome" style="margin-top:12px">' + DB.t("mp.backHome") + '</button>';

  DB.bindHeader();

  function showError(err) {
    var el = document.getElementById("mpError");
    el.textContent = DB.mpErrorMessage(err);
    el.hidden = false;
  }

  document.getElementById("mpBackHome").addEventListener("click", DB.renderHome);

  document.getElementById("mpCreateBtn").addEventListener("click", function () {
    var s = DB.loadState();
    DB.mpApi("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: s.firstName || "Player" })
    }).then(function (data) {
      DB.mpState = { code: data.room.code, playerId: data.playerId, room: data.room, pollTimer: null };
      DB.renderMpLobby();
    }).catch(showError);
  });

  var codeInput = document.getElementById("mpJoinCode");
  codeInput.addEventListener("input", function () {
    codeInput.value = codeInput.value.toUpperCase();
  });

  function doJoin() {
    var code = codeInput.value.trim().toUpperCase();
    if (!code) return;
    var s = DB.loadState();
    DB.mpApi("/api/rooms/" + encodeURIComponent(code) + "/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: s.firstName || "Player" })
    }).then(function (data) {
      DB.mpState = { code: data.room.code, playerId: data.playerId, room: data.room, pollTimer: null };
      DB.renderMpLobby();
    }).catch(showError);
  }

  document.getElementById("mpJoinBtn").addEventListener("click", doJoin);
  codeInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") doJoin();
  });
};

DB.renderMpLobby = function () {
  DB.lastRender = DB.renderMpLobby;
  var mp = DB.mpState;
  var state = DB.loadState();
  var room = mp.room;
  var isHost = room.hostId === mp.playerId;

  var playersHtml = room.players.map(function (p) {
    var tag = p.id === mp.playerId ? DB.t("mp.you") : "";
    var hostTag = p.id === room.hostId ? ' <span class="mp-host-tag">' + DB.t("mp.host") + '</span>' : "";
    return '<div class="mp-player-row"><span>' + p.name + tag + '</span>' + hostTag + '</div>';
  }).join("");

  DB.appRoot.innerHTML =
    DB.renderHeader(state) +
    '<div class="card center">' +
      '<h2>' + DB.t("mp.lobby.title") + '</h2>' +
      '<p class="muted">' + DB.t("mp.lobby.codeHint") + '</p>' +
      '<div class="mp-room-code">' + room.code + '</div>' +
    '</div>' +
    '<div class="card" style="margin-top:14px">' +
      '<h3>' + DB.t("mp.lobby.players") + ' (<span id="mpPlayerCount">' + room.players.length + '</span>)</h3>' +
      '<div id="mpPlayerList">' + playersHtml + '</div>' +
    '</div>' +
    (isHost
      ? '<button class="btn" id="mpStartBtn" style="margin-top:14px">' + DB.t("mp.lobby.startBtn") + '</button>'
      : '<p class="muted" style="margin-top:14px;text-align:center">' + DB.t("mp.lobby.waitingHost") + '</p>') +
    '<button class="btn secondary" id="mpExitBtn" style="margin-top:10px">' + DB.t("mp.exitBtn") + '</button>';

  DB.bindHeader();

  document.getElementById("mpExitBtn").addEventListener("click", function () {
    DB.mpStopPolling();
    DB.renderHome();
  });

  var startBtn = document.getElementById("mpStartBtn");
  if (startBtn) {
    startBtn.addEventListener("click", function () {
      DB.mpApi("/api/rooms/" + mp.code + "/start", { method: "POST" }).catch(function () {});
    });
  }

  DB.mpStopPolling();
  mp.pollTimer = setInterval(function () {
    DB.mpApi("/api/rooms/" + mp.code).then(function (data) {
      mp.room = data.room;
      if (data.room.status === "playing") {
        DB.mpStopPolling();
        DB.mpBeginPuzzles();
        return;
      }
      var listEl = document.getElementById("mpPlayerList");
      if (listEl) {
        listEl.innerHTML = data.room.players.map(function (p) {
          var tag = p.id === mp.playerId ? DB.t("mp.you") : "";
          var hostTag = p.id === data.room.hostId ? ' <span class="mp-host-tag">' + DB.t("mp.host") + '</span>' : "";
          return '<div class="mp-player-row"><span>' + p.name + tag + '</span>' + hostTag + '</div>';
        }).join("");
      }
      var countEl = document.getElementById("mpPlayerCount");
      if (countEl) countEl.textContent = data.room.players.length;
    }).catch(function () {});
  }, 1500);
};

DB.mpBeginPuzzles = function () {
  var mp = DB.mpState;
  var rng = DB.mulberry32(mp.room.seed);
  var puzzles = DB.PUZZLE_ORDER.map(function (p) {
    return { def: p, data: p.generate(rng) };
  });
  mp.puzzles = puzzles;
  mp.index = 0;
  mp.timerId = null;
  DB.renderMpPuzzleStep();
};

DB.renderMpPuzzleStep = function () {
  var mp = DB.mpState;
  var step = mp.puzzles[mp.index];

  var dots = mp.puzzles.map(function (_, i) {
    var cls = "progress-dot";
    if (i < mp.index) cls += " done";
    else if (i === mp.index) cls += " active";
    return '<div class="' + cls + '"></div>';
  }).join("");

  DB.appRoot.innerHTML =
    '<div class="header"><div class="brand">Daily <span>Brainclub</span></div><div class="streak-pill">' + step.def.emoji + ' ' + DB.t("mp.run.label") + ' ' + (mp.index + 1) + '/' + mp.puzzles.length + '</div></div>' +
    '<div class="progress-row">' + dots + '</div>' +
    '<div class="timer-bar-track"><div class="timer-bar-fill" id="timerFill" style="width:100%"></div></div>' +
    '<div class="bonus-label" id="bonusLabel">' + DB.t("run.bonusRemaining", { s: DB.PUZZLE_SECONDS }) + '</div>' +
    '<div class="card" id="puzzleContainer"></div>' +
    '<button class="btn secondary" id="skipBtn" style="margin-top:12px">' + DB.t("run.skipBtn") + '</button>';

  var container = document.getElementById("puzzleContainer");
  mp.stepFinished = false;
  mp.stepStartTime = Date.now();

  mp.activeController = step.def.mount(container, step.data, function (result) {
    if (mp.stepFinished) return;
    mp.stepFinished = true;
    clearInterval(mp.timerId);
    var elapsedSeconds = (Date.now() - mp.stepStartTime) / 1000;
    var withinBonus = elapsedSeconds <= DB.PUZZLE_SECONDS;
    DB.mpFinishPuzzleStep(result, withinBonus);
  });

  document.getElementById("skipBtn").addEventListener("click", function () {
    if (mp.activeController && mp.activeController.forceFinish) {
      mp.activeController.forceFinish();
    }
  });

  clearInterval(mp.timerId);
  mp.timerId = setInterval(function () {
    var elapsed = (Date.now() - mp.stepStartTime) / 1000;
    var remaining = Math.max(0, DB.PUZZLE_SECONDS - elapsed);
    var pct = (remaining / DB.PUZZLE_SECONDS) * 100;
    var fill = document.getElementById("timerFill");
    var label = document.getElementById("bonusLabel");
    if (fill) fill.style.width = pct + "%";
    if (remaining <= 0) {
      if (fill) fill.classList.add("expired");
      if (label) label.textContent = DB.t("run.bonusExpired");
      clearInterval(mp.timerId);
    } else if (label) {
      label.textContent = DB.t("run.bonusRemaining", { s: Math.ceil(remaining) });
    }
  }, 1000);
};

DB.mpFinishPuzzleStep = function (result, withinBonus) {
  var mp = DB.mpState;
  clearInterval(mp.timerId);
  var step = mp.puzzles[mp.index];

  DB.mpApi("/api/rooms/" + mp.code + "/score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playerId: mp.playerId, puzzleId: step.def.id, score: result.score })
  }).then(function (data) {
    mp.room = data.room;
  }).catch(function () {});

  DB.renderTransition(step, result, withinBonus, function () {
    mp.index++;
    if (mp.index >= mp.puzzles.length) {
      DB.renderMpResults();
    } else {
      DB.renderMpPuzzleStep();
    }
  });
};

DB.renderMpResults = function () {
  DB.lastRender = DB.renderMpResults;
  var mp = DB.mpState;
  var state = DB.loadState();

  function draw(room) {
    var totalPuzzles = DB.PUZZLE_ORDER.length;
    var sorted = room.players.slice().sort(function (a, b) { return b.totalScore - a.totalScore; });
    var allDone = room.players.every(function (p) { return p.done; });
    var medals = ["🥇", "🥈", "🥉"];

    var rowsHtml = sorted.map(function (p, i) {
      var medal = medals[i] || (i + 1) + ".";
      var you = p.id === mp.playerId ? DB.t("mp.you") : "";
      var status = p.done
        ? '<span class="mp-done-tag">' + DB.t("mp.results.finishedTag") + '</span>'
        : '<span class="muted">' + DB.t("mp.results.progress", { done: p.finishedCount, total: totalPuzzles }) + '</span>';
      return (
        '<div class="mp-result-row">' +
          '<span class="mp-medal">' + medal + '</span>' +
          '<span class="mp-result-name">' + p.name + you + '</span>' +
          status +
          '<b class="mp-result-score">' + p.totalScore + '</b>' +
        '</div>'
      );
    }).join("");

    DB.appRoot.innerHTML =
      DB.renderHeader(state) +
      '<div class="card center">' +
        '<h2>' + DB.t("mp.results.title") + '</h2>' +
        '<p class="muted">' + (allDone ? DB.t("mp.results.allDone") : DB.t("mp.results.waiting")) + '</p>' +
      '</div>' +
      '<div class="card" style="margin-top:14px">' + rowsHtml + '</div>' +
      '<button class="btn secondary" id="mpExitBtn2" style="margin-top:14px">' + DB.t("mp.backHome") + '</button>';

    DB.bindHeader();
    document.getElementById("mpExitBtn2").addEventListener("click", function () {
      DB.mpStopPolling();
      DB.renderHome();
    });
  }

  draw(mp.room);

  DB.mpStopPolling();
  mp.pollTimer = setInterval(function () {
    DB.mpApi("/api/rooms/" + mp.code).then(function (data) {
      mp.room = data.room;
      draw(data.room);
    }).catch(function () {});
  }, 1500);
};

window.DB = DB;
