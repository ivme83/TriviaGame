var game = {
  score: 0,
  currentQuestion:0,

  myQuestions: [
      {
        question: "Who is the strongest?",
        answers: {
          a: "Superman",
          b: "The Terminator",
          c: "Waluigi, obviously"
        },
        correctAnswer: "c"
      },
      {
        question: "What is the best site ever created?",
        answers: {
          a: "SitePoint",
          b: "Simple Steps Code",
          c: "Trick question; they're both the best"
        },
        correctAnswer: "c"
      },
      {
        question: "Where is Waldo really?",
        answers: {
          a: "Antarctica",
          b: "Minding his own business, so stop asking",
          c: "Sitting in a tree",
        },
        correctAnswer: "c"
      }
    ],

    initiateGame: function() {
      $("#question").empty();
      $("#question").html("<span id='game-btn'>Start</span>");
      this.score = 0;
      this.currentQuestion = 0;
    },

    drawQA: function(cq) {
      $("#question").empty();
      $("#question").html(this.myQuestions[cq].question);
      $("#answers").empty();
      $("#answers").append("<p class='answer' id='ansA'>" + this.myQuestions[cq].answers.a + "</p>");
      $("#answers").append("<p class='answer' id='ansB'>" + this.myQuestions[cq].answers.b + "</p>");
      $("#answers").append("<p class='answer' id='ansC'>" + this.myQuestions[cq].answers.c + "</p>");
      
      $("#ansA").on("load", function(){
        alert("loaded");
      });
    },

    startGame: function() {
      this.drawQA(this.currentQuestion);
    },

    check: function() {
      alert("2");
    }

}

$(document).ready(function() {
  game.initiateGame();
  $("#game-btn").on("click", function() {
    game.startGame();
  });

});


