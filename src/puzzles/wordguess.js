var DB = window.DB || {};

DB.WordGuessPuzzle = {
  id: "wordguess",
  title: "Woord raden",
  emoji: "🔤",

  WORDS: {
    nl: ["APPEL", "TAFEL", "STOEL", "WATER", "BLOEM", "KAMER", "BRIEF", "PLANT", "VLIEG", "KRANT", "SCHIP", "TREIN", "GROEN", "FIETS", "PAARD"],
    en: ["APPLE", "TABLE", "CHAIR", "WATER", "FLAME", "HOUSE", "PAPER", "BEACH", "PLANE", "MOUSE", "SHIRT", "TRAIN", "GREEN", "BREAD", "HORSE"]
  },

  generate: function (rng) {
    var words = DB.L(this.WORDS).filter(function (w) { return w.length === 5; });
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
