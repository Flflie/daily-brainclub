var DB = window.DB || {};

DB.lbPollTimer = null;

DB.lbStopPolling = function () {
  if (DB.lbPollTimer) {
    clearInterval(DB.lbPollTimer);
    DB.lbPollTimer = null;
  }
};

DB.submitLeaderboardScore = function (dailyScore, streak) {
  var state = DB.loadState();
  fetch("/api/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      deviceId: state.deviceId,
      name: state.firstName || "Player",
      date: DB.todayStr(),
      score: dailyScore,
      streak: streak
    })
  }).catch(function () {});
};

DB.renderLeaderboard = function () {
  DB.lbStopPolling();
  DB.lastRender = DB.renderLeaderboard;
  var state = DB.loadState();
  var dateStr = DB.todayStr();

  function draw(entries) {
    var listEl = document.getElementById("lbList");
    if (!listEl) return;
    if (!entries.length) {
      listEl.innerHTML = '<p class="muted">' + DB.t("lb.empty") + "</p>";
      return;
    }
    var medals = ["🥇", "🥈", "🥉"];
    listEl.innerHTML = entries.map(function (e, i) {
      var isYou = e.deviceId === state.deviceId;
      var medal = medals[i] || (i + 1) + ".";
      return (
        '<div class="mp-result-row' + (isYou ? " lb-you" : "") + '">' +
          '<span class="mp-medal">' + medal + "</span>" +
          '<span class="mp-result-name">' + e.name + (isYou ? DB.t("lb.you") : "") + "</span>" +
          '<span class="muted">' + DB.t("lb.streakSuffix", { n: e.streak }) + "</span>" +
          '<b class="mp-result-score">' + e.score + "</b>" +
        "</div>"
      );
    }).join("");
  }

  DB.appRoot.innerHTML =
    DB.renderHeader(state) +
    '<div class="card center">' +
      "<h2>" + DB.t("lb.title") + "</h2>" +
      '<p class="muted">' + DB.t("lb.subtitle") + "</p>" +
    "</div>" +
    '<div class="card" style="margin-top:14px" id="lbList"><p class="muted">…</p></div>' +
    '<button class="btn secondary" id="lbBack" style="margin-top:14px">' + DB.t("lb.back") + "</button>";

  DB.bindHeader();
  document.getElementById("lbBack").addEventListener("click", function () {
    DB.lbStopPolling();
    DB.renderHome();
  });

  function poll() {
    fetch("/api/leaderboard/" + dateStr)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.ok) draw(data.entries);
      })
      .catch(function () {});
  }

  poll();
  DB.lbPollTimer = setInterval(poll, 3000);
};

window.DB = DB;
