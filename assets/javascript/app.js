var game = {
  score: 0,
  currentQuestion:0,
  gameOn: false,

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
        correctAnswer: "b"
      }
    ],

    initiateGame: function() {
      $("#question").empty();
      $("#question").html("<span id='game-btn'>Start</span>");
      this.score = 0;
      this.currentQuestion = 0;
    },

    drawQA: function(cq) {
      if (cq < this.myQuestions.length) {
        $("#question").empty();
        $("#question").html(this.myQuestions[cq].question);
        /*$("#answers").empty();
        $("#answers").append("<p class='answer' id='ansA'>" + this.myQuestions[cq].answers.a + "</p>");
        $("#answers").append("<p class='answer' id='ansB'>" + this.myQuestions[cq].answers.b + "</p>");
        $("#answers").append("<p class='answer' id='ansC'>" + this.myQuestions[cq].answers.c + "</p>");
        */
        $("#ansA").empty();
        $("#ansA").html("<p class='answer'>" + this.myQuestions[cq].answers.a + "</p>");
        $("#ansB").empty();
        $("#ansB").html("<p class='answer'>" + this.myQuestions[cq].answers.b + "</p>");
        $("#ansC").empty();
        $("#ansC").html("<p class='answer'>" + this.myQuestions[cq].answers.c + "</p>");
      }

    },

    startGame: function() {
      gameOn = true;
      this.drawQA(this.currentQuestion);
    },

    checkAns: function(ans) {
      if(this.myQuestions[this.currentQuestion].correctAnswer === ans) {
        alert("yay");
        this.score++;
      } else {
        alert("boo");
      }
      this.currentQuestion++;
      this.drawQA(this.currentQuestion);
    }

}

$(document).ready(function() {
  game.initiateGame();
  
  $("#game-btn").on("click", function() {
    game.startGame();
  });

  $("#ansA").on("click", function() {
    game.checkAns("a");
  });

  $("#ansB").on("click", function() {
    game.checkAns("b");
  });

  $("#ansC").on("click", function() {
    game.checkAns("c");
  });

});



