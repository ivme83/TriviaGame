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
        this.time = 2;
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
        game.drawTimer(timer.time);
      }
    } else {
      if (timer.time === 0) {
        timer.stop();
        game.clearTimer();
        game.progressGame();
      } else {
        timer.time--;
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
        question: "Who is the host of Welcome to Night Vale?",
        answers: {
          a: "Kevin",
          b: "Old Woman Josie",
          c: "Cecil Palmer"
        },
        correctAnswer: "c"
      },
      {
        question: "How high does Khoshekh float off the ground?",
        answers: {
          a: "1 inch",
          b: "4 feet",
          c: "Cats can't float!"
        },
        correctAnswer: "b"
      },
      {
        question: "What are the names of the Angels?",
        answers: {
          a: "Erika",
          b: "Marcus Vanston",
          c: "Angels don't have names",
        },
        correctAnswer: "a"
      },
      {
        question: "What are the hours of the dog park?",
        answers: {
          a: "Sun up to sun down",
          b: "Night time only",
          c: "The dog park has no hours, the dog park is forbidden!",
        },
        correctAnswer: "c"
      },
      {
        question: "Who is the worst?",
        answers: {
          a: "Steve Carlsberg!",
          b: "The Secret Police",
          c: "Michelle Nguyen",
        },
        correctAnswer: "a"
      }
    ],

    initiateGame: function() {
      $("#ansA").empty();
      $("#ansB").empty();
      $("#ansC").empty();
      $("#question").empty();
      $("#timer").empty();
      $("#timer").html("<span id='game-btn' class='btn btn-default'>Start</span>");
      this.score = 0;
      this.answered = 0;
      this.currentQuestion = 0;
      this.gameOn = false;
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
        $("#question").html(this.getCurrentCA() + " is the correct answer! The Glow Cloud glows warmly.");
      } else {
        $("#question").html("Sorry that is incorrect! Please report to City Hall for re-education.");
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
      this.gameOn = true;
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
      $("#timer").empty();
      $("#timer").html("<span id='game-btn' class='btn btn-default'>Restart</span>");
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

$(document).on("click", "#game-btn", function(){
  if (game.gameOn) {
    game.initiateGame();
  } else {
    game.startGame();
  }
});