/*  
Click to Start
Timer begins at 120 seconds and countdown
Player goes through all 10 questions
player can only guess one answer per question
Once completed, player submit's answers
HTML is updated with users score
Score includes: time spent, answers correct, and answers wrong */

// ---------------------------------------------------------------

var questions = [
  {
    ques: "In what year did the New Orleans Saints win the SuperBowl?",
    ans: ["2009", "2010", "2017", "2012"],
    name: "SuperBowl",
    correct: "2010",
    divClass: ".SuperBowl"
  },
  {
    ques: "How many NFL records has Drew Brees broken?",
    ans: ["10", "4", "21", "32"],
    name: "Records",
    correct: "21",
    divClass: ".Records"
  },
  {
    ques: "What is the name of the Saint Bernard that is the Saints' mascot?",
    ans: ["Roux", "Cujo", "Gumbo", "Orleans"],
    name: "Gumbo",
    correct: "Gumbo",
    divClass: ".Gumbo"
  },
  {
    ques: "What number is Alvin Kamara's jersey number?",
    ans: ["24", "41", "22", "9"],
    name: "Alvin",
    correct: "41",
    divClass: ".Alvin"
  },
  {
    ques:
      "What costume did Ricky Williams wear on the cover of ESPN The Magazine?",
    ans: ["Wedding gown", "Priest", "Fireman", "The Hamburgler"],
    name: "Cover",
    correct: "Wedding gown",
    divClass: ".Cover"
  },
  {
    ques: "What is the name of the Saint's home stadium?",
    ans: [
      "AT&T Stadium",
      "Gillette Stadium",
      "Mercedes-Benz SuperDome",
      "Soldier Field"
    ],
    name: "Stadium",
    correct: "Mercedes-Benz SuperDome",
    divClass: ".Stadium"
  },
  {
    ques:
      "Who was the Saints' first playoff win against in their franchise history??",
    ans: [
      "San Fransisco 49ers ",
      "St. Louis Rams",
      "Dallas Cowboys",
      "Carolina Panthers"
    ],
    name: "Playoff",
    correct: "St. Louis Rams",
    divClass: ".Playoff"
  },
  {
    ques: "Who is the Saints' all-tme leading scorer ?",
    ans: ["Mark Ingram", "Morten Andersen", "John Carney", "Marques Colston"],
    name: "Scorer",
    correct: "Morten Andersen",
    divClass: ".Scorer"
  },
  {
    ques: "What year did the Saints play their inaugural season?",
    ans: ["1965", "1966", "1975", "1967"],
    name: "Inaugural",
    correct: "1967",
    divClass: ".Inaugural"
  },
  {
    ques: "What coach led the Saints to their first non-losing season (8-8)?",
    ans: ["Dick Nolan", "Don Shula", "Vince Lombardi", "Bill Parcells"],
    name: "Coach",
    correct: "Dick Nolan",
    divClass: ".Coach"
  }
]; // end questions object

var labels = ["first", "second", "third", "forth"];

// click to start then display quesions
var startGame = $("#start-btn").on("click", function() {
  $(this)
    .parent()
    .hide();
  $(".container").show();
  countdown(120);
  questionDisplay();
});

// function for displaying questions
var questionDisplay = function() {
  $(".questions :not('#sub-but')").empty();
  // loops through the 10 questions
  for (var j = 0; j < 10; j++) {
    $(".questions").prepend('<div class="' + questions[j].name + '"></div>');
    $(questions[j].divClass).append(
      '<div class ="ques-title">' + questions[j].ques + "</div>"
    );
    // loops through answers for each radio button
    for (var i = 0; i <= 3; i++) {
      $(questions[j].divClass).append(
        '<input type="radio"  name="' +
          questions[j].name +
          '" value="' +
          questions[j].ans[i] +
          '"/><label for="' +
          labels[i] +
          '">' +
          questions[j].ans[i] +
          "</label>"
      );
    }
    $(".questions").prepend("<hr />");
  }
};

// function for countdown timer
var countdown = function(seconds) {
  var timer = setInterval(function() {
    seconds = seconds - 1;
    $("#time-remain").html(seconds);

    if (seconds <= 0) {
      $(".container").fadeOut(500);
      var correctAnswers = 0;
      var wrongAnswers = 0;
      var unAnswered = 0;

      // loop through correctArray & radioName to match html elements & answers
      for (var i = 0; i < 10; i++) {
        if (
          $('input:radio[name="' + questions[i].name + '"]:checked').val() ===
          questions[i].correct
        ) {
          correctAnswers++;
          console.log("this is correct! number:" + i);
        } else {
          wrongAnswers++;
          console.log("this is wrong! number:" + i);
        }
      }
      $("#correctTimesUp").append(correctAnswers);
      // display wrongAnswers
      $("#wrongTimesUp").append(wrongAnswers);
      $("#timesUp")
        .fadeIn(1000)
        .show();

      // alert("Times Up!");
      clearInterval(timer);
      return;
    }
  }, 1000);

  // click event for submit button to stop timer
  $("#sub-but").on("click", function() {
    clearInterval(timer);
  });
}; // end countdown

// function to grade quiz once submit button is clicked
var gradeQuiz = $("#sub-but").on("click", function() {
  var correctAnswers = 0;
  var wrongAnswers = 0;
  var unAnswered = 0;

  // loop through correctArray & radioName to match html elements & answers
  for (var i = 0; i < 10; i++) {
    if (
      $('input:radio[name="' + questions[i].name + '"]:checked').val() ===
      questions[i].correct
    ) {
      correctAnswers++;
    } else {
      wrongAnswers++;
    }
  }

  // once submit is clicked...
  // tests
  // stop timer
  countdown();
  // fade out questions
  $(".container").fadeOut(500);
  // show answerScreen
  $("#answerScreen").show();
  // display correctAnswers
  $("#correctScreen").append(correctAnswers);
  // display wrongAnswers
  $("#wrongScreen").append(wrongAnswers);
}); // end gradeQuiz
