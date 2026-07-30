var DB = window.DB || {};

DB.MathPuzzle = {
  id: "math",
  title: "Rekenpuzzel",
  emoji: "🧮",

  generate: function (rng) {
    var questions = [];
    for (var i = 0; i < 10; i++) {
      var a = Math.floor(rng() * 20) + 1;
      var b = Math.floor(rng() * 20) + 1;
      var opRoll = rng();
      var op = opRoll < 0.5 ? "+" : "-";
      if (op === "-" && b > a) { var tmp = a; a = b; b = tmp; }
      var answer = op === "+" ? a + b : a - b;
      questions.push({ a: a, b: b, op: op, answer: answer });
    }
    return { questions: questions };
  },

  mount: function (container, puzzleData, onFinish) {
    var state = { index: 0, correct: 0, wrong: 0 };

    function render() {
      if (state.index >= puzzleData.questions.length) {
        finish();
        return;
      }
      var q = puzzleData.questions[state.index];
      container.innerHTML =
        '<div class="puzzle-title">' + DB.t("math.question", { title: DB.puzzleTitle("math"), i: state.index + 1, n: puzzleData.questions.length }) + '</div>' +
        '<div class="math-question">' + q.a + ' ' + q.op + ' ' + q.b + ' = ?</div>' +
        '<input class="math-input" type="number" inputmode="numeric" id="mathAnswer" autocomplete="off" />' +
        '<button class="btn" id="mathSubmit">' + DB.t("math.confirm") + '</button>' +
        '<div class="math-stats"><span>' + DB.t("math.correct") + state.correct + '</span><span>' + DB.t("math.wrong") + state.wrong + '</span></div>';

      var input = container.querySelector("#mathAnswer");
      input.focus();
      var submit = container.querySelector("#mathSubmit");

      function submitAnswer() {
        var val = parseInt(input.value, 10);
        if (!isNaN(val) && val === q.answer) state.correct++;
        else state.wrong++;
        state.index++;
        render();
      }

      submit.addEventListener("click", submitAnswer);
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") submitAnswer();
      });
    }

    function finish() {
      var total = puzzleData.questions.length;
      var score = Math.round((state.correct / total) * 100);
      onFinish({ score: score, detail: DB.t("math.detail", { correct: state.correct, total: total }) });
    }

    render();

    return {
      forceFinish: finish
    };
  }
};

window.DB = DB;
