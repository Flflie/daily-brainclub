var http = require("http");
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");

var PORT = process.env.PORT || 8934;
var ROOT = __dirname;

var MIME = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

var rooms = {};
var leaderboard = {};
var dailySeeds = {};

function newRoomCode() {
  var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  var code = "";
  for (var i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function randomSeed() {
  return Math.floor(Math.random() * 2147483646) + 1;
}

function sendJson(res, obj, status) {
  var json = JSON.stringify(obj);
  res.writeHead(status || 200, {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate"
  });
  res.end(json);
}

function readJsonBody(req) {
  return new Promise(function (resolve) {
    var data = "";
    req.on("data", function (chunk) { data += chunk; });
    req.on("end", function () {
      if (!data.trim()) return resolve({});
      try { resolve(JSON.parse(data)); } catch (e) { resolve({}); }
    });
  });
}

function roomPublic(room) {
  return {
    code: room.code,
    seed: room.seed,
    status: room.status,
    hostId: room.hostId,
    createdAt: room.createdAt,
    players: Object.keys(room.players).map(function (id) {
      var p = room.players[id];
      return { id: p.id, name: p.name, scores: p.scores, totalScore: p.totalScore, finishedCount: p.finishedCount, done: p.done };
    })
  };
}

var server = http.createServer(function (req, res) {
  var u = new URL(req.url, "http://localhost");
  var p = u.pathname;
  var method = req.method;

  if (p.indexOf("/api/") === 0) {
    handleApi(req, res, p, method).catch(function (e) {
      sendJson(res, { ok: false, error: "server_error", message: e.message }, 500);
    });
    return;
  }

  var filePath = p === "/" ? "/index.html" : p;
  filePath = path.join(ROOT, filePath);
  var resolved = path.normalize(filePath);
  if (resolved.indexOf(ROOT) !== 0) {
    res.writeHead(403);
    res.end();
    return;
  }
  fs.readFile(resolved, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end();
      return;
    }
    var ext = path.extname(resolved);
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": "no-cache, no-store, must-revalidate"
    });
    res.end(data);
  });
});

async function handleApi(req, res, p, method) {
  var m;

  if (method === "POST" && p === "/api/rooms") {
    var body = await readJsonBody(req);
    var code = newRoomCode();
    while (rooms[code]) code = newRoomCode();
    var playerId = crypto.randomBytes(4).toString("hex");
    var room = {
      code: code,
      seed: randomSeed(),
      status: "lobby",
      hostId: playerId,
      createdAt: new Date().toISOString(),
      players: {}
    };
    room.players[playerId] = { id: playerId, name: String(body.name || ""), scores: {}, totalScore: 0, finishedCount: 0, done: false };
    rooms[code] = room;
    sendJson(res, { ok: true, playerId: playerId, room: roomPublic(room) });
    return;
  }

  if (method === "POST" && (m = p.match(/^\/api\/rooms\/([A-Z0-9]+)\/join$/))) {
    var code2 = m[1];
    var body2 = await readJsonBody(req);
    var room2 = rooms[code2];
    if (!room2) { sendJson(res, { ok: false, error: "not_found" }, 404); return; }
    if (room2.status !== "lobby") { sendJson(res, { ok: false, error: "already_started" }, 409); return; }
    var playerId2 = crypto.randomBytes(4).toString("hex");
    room2.players[playerId2] = { id: playerId2, name: String(body2.name || ""), scores: {}, totalScore: 0, finishedCount: 0, done: false };
    sendJson(res, { ok: true, playerId: playerId2, room: roomPublic(room2) });
    return;
  }

  if (method === "GET" && (m = p.match(/^\/api\/rooms\/([A-Z0-9]+)$/))) {
    var room3 = rooms[m[1]];
    if (!room3) { sendJson(res, { ok: false, error: "not_found" }, 404); return; }
    sendJson(res, { ok: true, room: roomPublic(room3) });
    return;
  }

  if (method === "POST" && (m = p.match(/^\/api\/rooms\/([A-Z0-9]+)\/start$/))) {
    var room4 = rooms[m[1]];
    if (!room4) { sendJson(res, { ok: false, error: "not_found" }, 404); return; }
    room4.status = "playing";
    room4.startedAt = new Date().toISOString();
    sendJson(res, { ok: true, room: roomPublic(room4) });
    return;
  }

  if (method === "POST" && (m = p.match(/^\/api\/rooms\/([A-Z0-9]+)\/score$/))) {
    var room5 = rooms[m[1]];
    if (!room5) { sendJson(res, { ok: false, error: "not_found" }, 404); return; }
    var body5 = await readJsonBody(req);
    var player = room5.players[String(body5.playerId)];
    if (!player) { sendJson(res, { ok: false, error: "player_not_found" }, 404); return; }
    var puzzleId = String(body5.puzzleId);
    var isNew = !(puzzleId in player.scores);
    player.scores[puzzleId] = parseInt(body5.score, 10) || 0;
    if (isNew) player.finishedCount++;
    var sum = 0;
    Object.keys(player.scores).forEach(function (k) { sum += player.scores[k]; });
    player.totalScore = sum;
    if (player.finishedCount >= 7) player.done = true;
    sendJson(res, { ok: true, room: roomPublic(room5) });
    return;
  }

  if (method === "GET" && (m = p.match(/^\/api\/daily-seed\/(\d{4}-\d{2}-\d{2})$/))) {
    var date = m[1];
    if (!dailySeeds[date]) dailySeeds[date] = randomSeed();
    sendJson(res, { ok: true, date: date, seed: dailySeeds[date] });
    return;
  }

  if (method === "POST" && p === "/api/leaderboard") {
    var body6 = await readJsonBody(req);
    var date2 = String(body6.date);
    if (!leaderboard[date2]) leaderboard[date2] = {};
    var deviceId = String(body6.deviceId);
    leaderboard[date2][deviceId] = {
      deviceId: deviceId,
      name: String(body6.name || ""),
      score: parseInt(body6.score, 10) || 0,
      streak: parseInt(body6.streak, 10) || 0,
      submittedAt: new Date().toISOString()
    };
    sendJson(res, { ok: true });
    return;
  }

  if (method === "GET" && (m = p.match(/^\/api\/leaderboard\/(\d{4}-\d{2}-\d{2})$/))) {
    var date3 = m[1];
    var entries = [];
    if (leaderboard[date3]) {
      entries = Object.keys(leaderboard[date3]).map(function (k) { return leaderboard[date3][k]; })
        .sort(function (a, b) { return b.score - a.score; })
        .map(function (e) { return { deviceId: e.deviceId, name: e.name, score: e.score, streak: e.streak }; });
    }
    sendJson(res, { ok: true, date: date3, entries: entries });
    return;
  }

  sendJson(res, { ok: false, error: "unknown_route" }, 404);
}

server.listen(PORT, function () {
  console.log("Serving " + ROOT + " on http://localhost:" + PORT + "/");
});
