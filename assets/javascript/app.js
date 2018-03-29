var timerInterval;
var timing = false;

var timer = {
  time: 10,
  display: true,

  start: function() {
    if (!timing) {
      if(display) {
        this.time = 10;
      } else {
        this.time = 3;
      }
      timerInterval = setInterval(timer.count, 1000);
      timing = true;
    }
  },

  displayTrue: function() {
    display = true;
  },

  displayFalse: function() {
    display = false;
  },

  count: function() {

    if (this.display){
      if (timer.time === 0) {
        timer.stop();
        game.clearTimer();
        game.drawFeedback(false);
      } else {
        timer.time--;
        console.log(timer.time);
        game.drawTimer(timer.time);
      }
    } else {
      if (timer.time === 0) {
        timer.stop();
        game.clearTimer();
        game.progressGame();
      } else {
        timer.time--;
        console.log(timer.time);
      }      
    }

  },

  stop: function() {
    clearInterval(timerInterval);
    timing = false;
  }
}

var game = {
  score: 0,
  answered: 0,
  currentQuestion:0,
  gameOn: false,
  counter: 30,

  myQuestions: [
      {
        question: "Who is the strongest?",
        answers: {
          a: "Superman",
          b: "The Terminator",
          c: "Waluigi"
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
      $("#question").html("<span id='game-btn' class='btn btn-default'>Start</span>");
      this.score = 0;
      this.answered = 0;
      this.currentQuestion = 0;
    },

    drawQA: function(cq) {
      if (cq < this.myQuestions.length) {
        $("#question").empty();
        $("#question").html(this.myQuestions[cq].question);
        $("#ansA").empty();
        $("#ansA").html("<div class='answer btn btn-info btn-lg btn-block'>" + this.myQuestions[cq].answers.a + "</div>");
        $("#ansB").empty();
        $("#ansB").html("<div class='answer btn btn-info btn-lg btn-block'>" + this.myQuestions[cq].answers.b + "</div>");
        $("#ansC").empty();
        $("#ansC").html("<div class='answer btn btn-info btn-lg btn-block'>" + this.myQuestions[cq].answers.c + "</div>");
      }

    },

    drawFeedback: function(fb) {
      $("#timer").empty();
      $("#question").empty();
      $("#ansA").empty();
      $("#ansB").empty();
      $("#ansC").empty();
      if (fb) {
        $("#question").html(this.getCurrentCA() + " is the correct answer!");
      } else {
        $("#question").html("Sorry that is incorrect!");
        $("#ansA").html("The correct answer is " + this.getCurrentCA());
      }
      timer.displayFalse();
      timer.start();
    },

    getCurrentCA: function() {
      switch (this.myQuestions[this.currentQuestion].correctAnswer) {
        case "a":
          return this.myQuestions[this.currentQuestion].answers.a;
          break;
        case "b":
          return this.myQuestions[this.currentQuestion].answers.b;
          break;
        case "c":
          return this.myQuestions[this.currentQuestion].answers.c;
          break;
      }
    },

    startGame: function() {
      gameOn = true;
      timer.displayTrue();
      timer.start();
      this.drawTimer(10);
      this.drawQA(this.currentQuestion);
    },

    drawTimer: function(currentTime) {
      $("#timer").empty();
      $("#timer").html("Time Remaining: " + currentTime);      
    },

    clearTimer: function() {
      $("#timer").empty();
    },

    checkAns: function(ans) {
      timer.stop();
      this.answered++;
      if(this.myQuestions[this.currentQuestion].correctAnswer === ans) {
        this.score++;
        this.drawFeedback(true);
      } else {
        this.drawFeedback(false);
      }      
    },

    progressGame: function() {
      this.currentQuestion++;
      if (this.currentQuestion < this.myQuestions.length) {
        timer.displayTrue();
        timer.start();
        this.drawTimer(10);
        this.drawQA(this.currentQuestion);
      } else {
        this.drawEndScreen();
      }
    },

    drawEndScreen: function() {
      $("#question").empty();
      $("#question").html("You have finished!");
      $("#ansA").empty();
      $("#ansA").html("<p>Correct Answers: " + this.score + "</p>");
      $("#ansB").empty();
      $("#ansB").html("<p>Incorrect Answers: " + (this.myQuestions.length - this.score) + "</p>");
      $("#ansC").empty();
      $("#ansC").html("<p>Unanswered Questions: " + (this.myQuestions.length - this.answered) + "</p>");
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