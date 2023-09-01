var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;
var index = -1;

// Arrays used to create blanks and letters on screen
var lettersInChosenWord = [];
var blanksLetters = [];

// Array of words the user will guess
var words = ["variable","array", "modulus", "object", "function", "string", "boolean"];
var Questions = [
    {
        question: "Commonly used data types DO NOT include:",
        Option1: "strings",
        Option2: "booleans",
        Option3: "alert",
        Option4: "numbers",
        Correct: "alert",

    },

    {
        question: "The condition in an if/else statement is enclosed with ______",
        Option1: "quotes",
        Option2: "parenthesis",
        Option3: "brackets",
        Option4: "commas",
        Correct: "parenthesis",

    },

    {
        question: "Arrays in Javascript can be used to store:",
        Option1: "other arrays",
        Option2: "booleans",
        Option3: "numbers and strings",
        Option4: "All of the above",
        Correct: "All of the above",

    },
]

document.querySelector("#Option1").addEventListener("click", nextQuestion)
document.querySelector("#Option2").addEventListener("click", nextQuestion)
document.querySelector("#Option3").addEventListener("click", nextQuestion)
document.querySelector("#Option4").addEventListener("click", nextQuestion)


// The init function is called when the page loads 
function init() {
  getWins();
  getlosses();
}

function nextQuestion() {
    if(index > -1 ){
        console.log(this)
        console.log(Questions [index].Correct)
        if(this.textContent != Questions[index].Correct){
            timerCount -= 10
        } 
    }
    index ++
    if(index > 2) {
        console.log(index)
        return winGame()

    }
    document.querySelector("#Question").textContent = Questions[index].question;
    document.querySelector("#Option1").textContent = Questions[index].Option1;
    document.querySelector("#Option2").textContent = Questions[index].Option2;
    document.querySelector("#Option3").textContent = Questions[index].Option3;
    document.querySelector("#Option4").textContent = Questions[index].Option4;
}

// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  timerCount = 60;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  startTimer()
  nextQuestion() 
}

// The winGame function is called when the win condition is met
function winGame() {
  winCounter++
  startButton.disabled = false;
  setWins()
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  wordBlank.textContent = "GAME OVER";
  loseCounter++
  startButton.disabled = false;
  setLosses()
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
    if (index > 2) {
        // Clears interval
        clearInterval(timer);
      }
  }, 1000);
}

// Creates blanks on screen


// Updates win count on screen and sets win count to client storage
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  var storedWins = localStorage.getItem("winCount");
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
  }
  //Render win count to page
  win.textContent = winCounter;
}

function getlosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
  lose.textContent = loseCounter;
}

function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join("")) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
}

// Tests if guessed letter is in word and renders it to the screen.
function checkLetters(letter) {
  var letterInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }
  
  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      if (chosenWord[j] === letter) {
        blanksLetters[j] = letter;
      }
    }
    wordBlank.textContent = blanksLetters.join(" ");
  }
}

// Attach event listener to document to listen for key event
document.addEventListener("keydown", function(event) {
  // If the count is zero, exit function
  if (timerCount === 0) {
    return;
  }
  // Convert all keys to lower case
  var key = event.key.toLowerCase();
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
  // Test if key pushed is letter
  if (alphabetNumericCharacters.includes(key)) {
    var letterGuessed = event.key;
    checkLetters(letterGuessed)
    checkWin();
  }
});

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);
