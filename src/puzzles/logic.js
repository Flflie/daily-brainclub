var DB = window.DB || {};

DB.LogicPuzzle = {
  id: "logic",
  title: "Logische puzzel",
  emoji: "🕵️",

  NAMES: ["Anna", "Bram", "Cas", "Diana", "Emma", "Finn"],
  COLORS: {
    nl: ["rood", "blauw", "groen", "geel", "paars"],
    en: ["red", "blue", "green", "yellow", "purple"],
    de: ["rot", "blau", "grün", "gelb", "lila"],
    fr: ["rouge", "bleu", "vert", "jaune", "violet"],
    es: ["rojo", "azul", "verde", "amarillo", "morado"]
  },
  PETS: {
    nl: ["kat", "hond", "vis", "vogel", "konijn"],
    en: ["cat", "dog", "fish", "bird", "rabbit"],
    de: ["Katze", "Hund", "Fisch", "Vogel", "Kaninchen"],
    fr: ["chat", "chien", "poisson", "oiseau", "lapin"],
    es: ["gato", "perro", "pez", "pájaro", "conejo"]
  },

  shuffleArray: function (arr, rng) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  },

  generate: function (rng) {
    var lang = DB.currentLang();
    var people = this.shuffleArray(this.NAMES, rng).slice(0, 3);
    var colors = this.shuffleArray(DB.L(this.COLORS), rng).slice(0, 3);
    var pets = this.shuffleArray(DB.L(this.PETS), rng).slice(0, 3);

    var colorPerm = this.shuffleArray([0, 1, 2], rng);
    var petPerm = this.shuffleArray([0, 1, 2], rng);

    var personColor = [colors[colorPerm[0]], colors[colorPerm[1]], colors[colorPerm[2]]];
    var personPet = [pets[petPerm[0]], pets[petPerm[1]], pets[petPerm[2]]];

    var clueTemplates = {
      nl: [
        people[0] + " draagt " + personColor[0] + ".",
        people[1] + " draagt niet " + personColor[2] + ".",
        "De persoon met de " + personPet[2] + " is " + people[2] + ".",
        people[0] + " heeft geen " + personPet[1] + "."
      ],
      en: [
        people[0] + " wears " + personColor[0] + ".",
        people[1] + " does not wear " + personColor[2] + ".",
        "The person with the " + personPet[2] + " is " + people[2] + ".",
        people[0] + " does not have a " + personPet[1] + "."
      ],
      de: [
        people[0] + " trägt " + personColor[0] + ".",
        people[1] + " trägt nicht " + personColor[2] + ".",
        "Die Person mit " + personPet[2] + " ist " + people[2] + ".",
        people[0] + " hat kein " + personPet[1] + "."
      ],
      fr: [
        people[0] + " porte la couleur " + personColor[0] + ".",
        people[1] + " ne porte pas la couleur " + personColor[2] + ".",
        "La personne avec " + personPet[2] + " est " + people[2] + ".",
        people[0] + " n'a pas de " + personPet[1] + "."
      ],
      es: [
        people[0] + " lleva el color " + personColor[0] + ".",
        people[1] + " no lleva el color " + personColor[2] + ".",
        "La persona con " + personPet[2] + " es " + people[2] + ".",
        people[0] + " no tiene " + personPet[1] + "."
      ]
    };
    var clues = clueTemplates[lang] || clueTemplates.nl;

    return {
      people: people,
      colors: colors,
      pets: pets,
      solutionColor: personColor,
      solutionPet: personPet,
      clues: this.shuffleArray(clues, rng)
    };
  },

  mount: function (container, puzzleData, onFinish) {
    var people = puzzleData.people;
    var colors = puzzleData.colors;
    var pets = puzzleData.pets;
    var answers = people.map(function () { return { color: "", pet: "" }; });

    function render() {
      var html = '<div class="puzzle-title">' + DB.t("logic.subtitle", { title: DB.puzzleTitle("logic") }) + '</div>';
      html += '<div class="logic-clues"><ul>';
      puzzleData.clues.forEach(function (clue) {
        html += "<li>" + clue + "</li>";
      });
      html += '</ul></div>';

      html += '<table class="logic-table"><thead><tr><th></th><th>' + DB.t("logic.colorHeader") + '</th><th>' + DB.t("logic.petHeader") + '</th></tr></thead><tbody>';
      people.forEach(function (person, i) {
        html += "<tr><td>" + person + "</td>";
        html += '<td><select class="logic-select" data-i="' + i + '" data-type="color">';
        html += '<option value="">-</option>';
        colors.forEach(function (c) {
          html += '<option value="' + c + '"' + (answers[i].color === c ? " selected" : "") + '>' + c + '</option>';
        });
        html += '</select></td>';
        html += '<td><select class="logic-select" data-i="' + i + '" data-type="pet">';
        html += '<option value="">-</option>';
        pets.forEach(function (p) {
          html += '<option value="' + p + '"' + (answers[i].pet === p ? " selected" : "") + '>' + p + '</option>';
        });
        html += '</select></td></tr>';
      });
      html += '</tbody></table>';
      html += '<button class="btn" id="logicCheck" style="margin-top:14px">' + DB.t("sudoku.check") + '</button>';

      container.innerHTML = html;

      container.querySelectorAll(".logic-select").forEach(function (sel) {
        sel.addEventListener("change", function () {
          var i = parseInt(sel.getAttribute("data-i"), 10);
          var type = sel.getAttribute("data-type");
          answers[i][type] = sel.value;
        });
      });

      container.querySelector("#logicCheck").addEventListener("click", finish);
    }

    function finish() {
      var correct = 0;
      var total = people.length * 2;
      people.forEach(function (person, i) {
        if (answers[i].color === puzzleData.solutionColor[i]) correct++;
        if (answers[i].pet === puzzleData.solutionPet[i]) correct++;
      });
      var score = Math.round((correct / total) * 100);
      onFinish({ score: score, detail: DB.t("logic.detail", { correct: correct, total: total }) });
    }

    render();

    return {
      forceFinish: finish
    };
  }
};

window.DB = DB;
