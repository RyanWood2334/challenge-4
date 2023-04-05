//define all questions

//Which team won the first Super Bowl in 1967?
//--Green Bay Packers
//Chicago Bears
//Pittsburgh Steelers
//Houston Oilers
//

//
//What was the original name of the New England Patriots when they were founded?
//--Boston Patriots
//New England Clamchowders
//Boston Yankees
//Boston Bruins
//
//
//How many NFL teams play in the state of California?
//--3
//5
//1
//2
//
//How many rounds does the NFL Draft have?
//--7--
//9
//6
//5
//
//
// 2. How many minutes is each NFL quarter?

//15 minutes
//12 Minutes
//20 Minutes
//10 Minutes
//
//19. How much did a ticket cost to the first NFL game?

//$1.75
//$5.25
//$15.50
//$3.50
//
//
//
//45. Who has the most touchdowns in NFL history?

//--Jerry Rice
//Calvin Johnson
//Adrian Peterson
//Austin Ekeler
//
//
//
//20. What are the oldest franchises in the NFL?

//--Cardinals and Bears
//Oilers and Packers
//Colts and Ravens
//Seahawks and Saints

//
//use an if statement and for loop for targeting arrays with correct answers
//
//
//

//-----------Option for using one array for answers
// var correctAnswersA = ["Green Bay Packers", "Boston Patriots"]
// var correctAnswersB = ["3", "7"]
// var correctAnswersC = ["15 Minutes", "$1.75"]
// var correctAnswersD = ["Jerry Rice", "Cardinals and Bears"]

// var correctAnswerArray = correctAnswersA.concat(correctAnswersB, correctAnswersC, correctAnswersD)

var startButton = document.querySelector("#start-button");
var testContainer = document.querySelector(".quiz-container");
var questionHeader = document.querySelector("#question");
var timerBox = document.querySelector("#timer-box");
var answerBox = document.querySelector("answer-box");
var resultBox = document.querySelector("result-box");
var highScoreSave = document.querySelector("#high-score-form");
var timerDisplay = document.querySelector("#time");
var answerButton1 = document.querySelector("#answer-1");
var answerButton2 = document.querySelector("#answer-2");
var answerButton3 = document.querySelector("#answer-3");
var answerButton4 = document.querySelector("#answer-4");
var highScoreButton = document.querySelector("#save-scores-btn");
var pastScoreSheet = document.querySelector("#past-score-sheet");
var startButtonHeader = document.querySelector("#start-button-header");
var correctGuessCount = document.querySelector("#correct-guess-count");
var incorrectGuessCount = document.querySelector("#incorrect-guess-count");
var savedScoreList = document.querySelector("#saved-score-list");
CORRECT_GUESSES = 0;
INCORRECT_GUESSES = 0;

// global variable for key for local saved storage
SAVED_USER_SCORE_KEY = "savedUserScore";

var question0 = ["Which team won the first Super Bowl in 1967?"];
var question1 = [
  "What was the original name of the New England Patriots when they were founded",
];
var question2 = ["How many NFL teams play in the state of California?"];
var question3 = ["How many minutes is each NFL quarter?"];
var question4 = ["Who has the most touchdowns in NFL history?"];
var question5 = ["How many rounds does the NFL Draft have?"];
var question6 = [
  "How much money does a 30 second commercial in the superbowl cost?",
];
var question7 = ["What are the oldest franchises in the NFL?"];

var answers0 = {
  "Chicago Bears": false,
  "Green Bay Packers": true,
  "Pittsburgh Steelers": false,
  "Houston Oilers": false,
};

var answers1 = {
  "New England Clamchowders": false,
  "Boston Yankees": false,
  "Boston Patriots": true,
  "Boston Bruins": false,
};
var answers2 = {
  Three: true,
  Five: false,
  One: false,
  Two: false,
};
var answers3 = {
  "12 Minutes": false,
  "15 Minutes": true,
  "20 Minutes": false,
  "10 Minutes": false,
};
var answers4 = {
  "Calvin Johnson": false,
  "Adrian Peterson": false,
  "Jerry Rice": true,
  "Austin Ekeler": false,
};
var answers5 = {
  Six: false,
  Seven: true,
  Nine: false,
  Five: false,
};
var answers6 = {
  "$5 million": true,
  "$1 million": false,
  "$16 million": false,
  "$10 million": false,
};
var answers7 = {
  Bears: true,
  Oilers: false,
  Colts: false,
  Seahawks: false,
};

var fullQuestionsArray = question0.concat(
  question1,
  question2,
  question3,
  question4,
  question5,
  question6,
  question7
);
console.log(fullQuestionsArray);

// var randomQuestion = fullQuestionsArray[Math.floor(Math.random()*fullQuestionsArray.length)]
// console.log(randomQuestion);

var answer0Arr = Object.entries(answers0);
console.log(answer0Arr);
var answer1Arr = Object.entries(answers1);
console.log(answer1Arr);
var answer2Arr = Object.entries(answers2);
console.log(answer2Arr);
var answer3Arr = Object.entries(answers3);
console.log(answer3Arr);
var answer4Arr = Object.entries(answers4);
console.log(answer4Arr);
var answer5Arr = Object.entries(answers5);
console.log(answer5Arr);
var answer6Arr = Object.entries(answers6);
console.log(answer6Arr);
var answer7Arr = Object.entries(answers7);
console.log(answer7Arr);

var fullAnswersArray = answer0Arr.concat(
  answer1Arr,
  answer2Arr,
  answer3Arr,
  answer4Arr,
  answer5Arr,
  answer6Arr,
  answer7Arr
);
console.log(fullAnswersArray);

answerButton1.addEventListener("click", (event) => {
  event.preventDefault();
  evalAnswerOne();
});
answerButton2.addEventListener("click", (event) => {
  event.preventDefault();
  evalAnswerTwo();
});
answerButton3.addEventListener("click", (event) => {
  event.preventDefault();
  evalAnswerThree();
});
answerButton4.addEventListener("click", (event) => {
  event.preventDefault();
  evalAnswerFour();
});

correctGuessCount.textContent = CORRECT_GUESSES;
incorrectGuessCount.textContent = INCORRECT_GUESSES;

var timerIntervalHandle;
var secondsLeft = 100;
var timeClock = document.querySelector("#time-display");
function setTime() {
  timerIntervalHandle = setInterval(function () {
    timeClock.textContent = 0 + " Second(s) Remaining";

    if (secondsLeft > 0) {
      timeClock.textContent = "Time Remaining: " + secondsLeft;

      secondsLeft--;
    } else if (secondsLeft === 0) {
      timeClock.textContent = "Time Remaining: " + secondsLeft;

      quizComplete();
    }
  }, 1000);
}

startButton.addEventListener("click", (event) => {
  event.preventDefault();
  startQuiz();
  var scoreHistoryArray = mothraGet();
  for (let index = 0; index < scoreHistoryArray.length; index++) {
    console.log(scoreHistoryArray);
    console.log(index);
    var userScore = scoreHistoryArray[index];
    var scoreEntry = document.createElement("li");
    scoreEntry.textContent = userScore.initials + " " + userScore.highScore;
    savedScoreList.appendChild(scoreEntry);
  }
});

function startQuiz() {
  setTime();
  questionGenerator();
  answerRender();
}

function questionGenerator() {
  //show slides? or timer to render different stuff?
  // if fullQuestionArray === 0???

  var questionDisplay = fullQuestionsArray[0];
  questionHeader.textContent = questionDisplay;
  fullQuestionsArray.splice(0, 1);
  return questionDisplay;
}
// answerRender()

function answerRender() {
  if (fullAnswersArray.length === 0) {
    quizComplete();
  } else {
    var answerDisplay0 = fullAnswersArray[0][0];
    var answerDisplay1 = fullAnswersArray[1][0];
    var answerDisplay2 = fullAnswersArray[2][0];
    var answerDisplay3 = fullAnswersArray[3][0];

    answerButton1.textContent = answerDisplay0;
    answerButton2.textContent = answerDisplay1;
    answerButton3.textContent = answerDisplay2;
    answerButton4.textContent = answerDisplay3;
  }
}

function evalAnswerOne() {
  console.log("answer button 1");
  var evaluation1 = fullAnswersArray[0][1];
  console.log(fullAnswersArray[0][1]);
  if (evaluation1 === true) {
    CORRECT_GUESSES++;
  } else {
    INCORRECT_GUESSES++;
  }
  correctGuessCount.textContent = CORRECT_GUESSES;
  incorrectGuessCount.textContent = INCORRECT_GUESSES;
  console.log(evaluation1);
  fullAnswersArray.splice(0, 4);
  questionGenerator();
  answerRender();
  if (fullAnswersArray.length === 0) {
    quizComplete();
  }
}
function evalAnswerTwo() {
  console.log("answer button 2");
  var evaluation2 = fullAnswersArray[1][1];
  console.log(fullAnswersArray[1][1]);

  if (evaluation2 === true) {
    CORRECT_GUESSES++;
  } else {
    INCORRECT_GUESSES++;
  }
  correctGuessCount.textContent = CORRECT_GUESSES;
  incorrectGuessCount.textContent = INCORRECT_GUESSES;
  console.log(evaluation2);
  fullAnswersArray.splice(0, 4);
  questionGenerator();
  answerRender();
  if (fullAnswersArray.length === 0) {
    quizComplete();
  }
}
function evalAnswerThree() {
  console.log("answer button 3");
  var evaluation3 = fullAnswersArray[2][1];
  console.log(fullAnswersArray[2][1]);
  if (evaluation3 === true) {
    CORRECT_GUESSES++;
  } else {
    INCORRECT_GUESSES++;
  }
  correctGuessCount.textContent = CORRECT_GUESSES;
  incorrectGuessCount.textContent = INCORRECT_GUESSES;
  console.log(evaluation3);
  fullAnswersArray.splice(0, 4);
  questionGenerator();
  answerRender();
  if (fullAnswersArray.length === 0) {
    quizComplete();
  }
}
function evalAnswerFour() {
  console.log("answer button 4");
  var evaluation4 = fullAnswersArray[3][1];
  console.log(fullAnswersArray[3][1]);
  if (evaluation4 === true) {
    CORRECT_GUESSES++;
  } else {
    INCORRECT_GUESSES++;
  }
  correctGuessCount.textContent = CORRECT_GUESSES;
  incorrectGuessCount.textContent = INCORRECT_GUESSES;
  console.log(evaluation4);
  fullAnswersArray.splice(0, 4);
  questionGenerator();
  answerRender();
  if (fullAnswersArray.length === 0) {
    quizComplete();
  }
}

function quizComplete() {
  clearInterval(timerIntervalHandle);
  console.log(secondsLeft);
  console.log(fullQuestionsArray);

  var testRestartText = "Restart Quiz!";
  var restartButtonText = "Restart Quiz";
  var winMessage =
    "Quiz Complete! Please input your score into the form below to save your high score!";
  questionHeader.textContent = winMessage;
  document.getElementById("answer-box").style.display = "none";
  document.getElementById("result-box").style.display = "none";
  startButtonHeader.textContent = testRestartText;
  startButton.textContent = restartButtonText;
  startButton.addEventListener("click", pageReload);
}

function pageReload() {
  location.reload();
}

var userInitialSpan = document.querySelector("#initials");
var userHighscoreSpan = document.querySelector("#highscore");

// savescore.addEventListener("click",)
function kingKongScoreRender(initials, highScore) {
  var scoreHistory = mothraGet();
  mothraSave(initials, highScore, scoreHistory);
  var scoreEntry = document.createElement("li");
  scoreEntry.textContent = initials + " " + highScore;
  savedScoreList.appendChild(scoreEntry);
}

function mothraGet() {
  var scoreHistory = JSON.parse(localStorage.getItem(SAVED_USER_SCORE_KEY));

  return scoreHistory;
}

function mothraSave(initials, highScore, scoreHistory) {
  var savedUserScore = {
    initials,
    highScore,
  };

  var savedScoreArray = [savedUserScore];
  var savedScoreUpdate = savedScoreArray.concat(scoreHistory);
  localStorage.setItem(SAVED_USER_SCORE_KEY, JSON.stringify(savedScoreUpdate));
}

highScoreSave.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event);
  var initials = document.querySelector("#initials").value;
  var highScore = document.querySelector("#highscore").value;
  if (!initials || !highScore) {
    window.alert("please input initials -and- your score.");
  } else {
    kingKongScoreRender(initials, highScore);
  }
});

// }

// function
//    to render a question
//          clearing/removing question (if there is one)
//          getting the first question
//          add question to question container
//          button element for each one
//          add answers to the answers container (multiple containers)

// function
//      handle quiz completion
//      stop timer
//      hide quiz container
//      show end screen
//      show time remaining as score
// function
//     handle answer clicks

//  if
//      question click is WRONG
//      subtract time from timer, and update timer to reflect loss
//       flash wrong answer page (setTimeout)

//       generate next question
//
//    update question variable to next question
//
//
//     if
//          question is last question
//          trigger quiz completion
//

// function
//  saving high scores
//      get value of user input (name/intital)
//       validate input
//       retrieve existing data from local storage
//       update the high score data
//       save updated data back to local storage
//       redirect to start screen after save

//function
//  listening for key press on save button for high scores
//          check if the key pressed was 'enter' for saving scores
//          OPTIONAL check if the key pressed was 'a' 'b' or 'c' for answers
//
//  event listeners
//      click start
//      click answers
//      click save
//      keyups
