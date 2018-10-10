// Variable Declarations
var lives = 3;
var winCount = 0;
var lossCount = 0;
var solutions = ["galaga", "frogger", "centipede", "paperboy", "tetris", "rampage"];
var answer = [];
var wrongGuesses = [];
var guess;
var computerChoice;
var answerID;
var answerText = document.getElementById("answer");
var missedText = document.getElementById("missedLetters");
var livesText = document.getElementById("lives");
var gameText = document.getElementById("gameText");
// Setting up var for the hint/completion images that will cycle based on lives left remaining
var hintImage = document.getElementById("hintImage");
var winCounter = document.getElementById("winCount");
var lossCounter = document.getElementById("lossCount");
var gameStartMusic = new Audio("./audio/gameStart.mp3");

function startRound() {
    lives = 3;
    answer = [];
    // Choose a solution Index value
    answerID = Math.floor(Math.random() * solutions.length);
    console.log("answerID is: " + answerID);
    // Write the solution string to the computerChoice array
    computerChoice = solutions[answerID];
    console.log("Solution is " + computerChoice);
    console.log("Current lives: " + lives);

    gameStartMusic.play();
    hintImage.innerHTML = "";
    // Write underscores to the "answer" array matching the number of characters in the solution
    for (var i = 0; i < computerChoice.length; i++) {
        answer[i] = "_";
    }
    console.log("Answer array is: " + answer);
    wrongGuesses = [];
    missedText.textContent = wrongGuesses;
    gameText.textContent = "Press any key to guess a letter!";
    answerText.textContent = answer.join(' ');
    livesText.textContent = lives;
    winCounter.textContent = winCount;
    lossCounter.textContent = lossCount;
}

function resetGame() {
    winCount = 0;
    lossCount = 0;
    winCounter.textContent = winCount;
    lossCounter.textContent = lossCount;
    startRound();
}

document.getElementById("startButton").onclick = function() {startRound()};
document.getElementById("resetButton").onclick = function() {resetGame()};

function gameLogic() {

    // For loop to check all letters in computerChoice, if keypress is correct, update "answer" array.
    for (var j = 0; j < computerChoice.length; j++) {
        if(computerChoice[j] === guess){
            answer.splice(j, 1, guess);
            console.log("Pushed guess: " + guess + " into answer array.");
            console.log("Current answer array: " + answer);
            answerText.textContent = answer.join(' ');
                //Win Condition
            if (answer.indexOf("_", 0) === -1) {
                hintImage.innerHTML = "";
                console.log("Cleared hintImageOK.");
                hintImage.innerHTML = "<img class='img-fluid' src='./images/"+answerID+"-complete.png'>";
                console.log("Replaced hintImage with "+answerID+"-complete.png");
                gameText.textContent = "You win! Click the Start button for a new round!";
                var winMusic = new Audio("./audio/"+answerID+"-win.mp3");
                winMusic.play();
                winCount++;
                winCounter.textContent = winCount;
            }
        }
    }
    // Conditional statement to decrement lives and push letter into wrongGuesses array.
    if (computerChoice.indexOf(guess, 0) === -1) {
        lives--;
        wrongGuesses.push(guess);
        console.log("Wrong guess!");
        console.log("Current wrongGuesses array: " + wrongGuesses);
        console.log("Current lives: " + lives);
        missedText.textContent = wrongGuesses.join(' ');
        livesText.textContent = lives;
        // Nested Conditional to update hintImage picture based on lives remaining, and to check for loss state.
        if (lives===2) {
            hintImage.innerHTML = "";
            hintImage.innerHTML = "<img class='img-fluid' src='./images/"+answerID+"-2.png'>";
        } else if (lives===1) {
            hintImage.innerHTML = "";
            hintImage.innerHTML = "<img class='img-fluid' src='./images/"+answerID+"-1.png'>";
        } else if (lives === 0) {
            gameText.textContent = "You lose! Click the Start button for a new round!";
            hintImage.innerHTML = "";
            hintImage.innerHTML = "<img class='img-fluid' src='./images/"+answerID+"-complete.png'>";
            var loseMusic = new Audio("./audio/"+answerID+"-lose.mp3");
            loseMusic.play();
            lossCount++;
            lossCounter.textContent = lossCount;
        }
    }
}

    // Key listener
    document.onkeyup = function(event) {
        if (lives > 0) {
        // Assign keystroke to variable
            guess = event.key;
            console.log("User pressed key: " + guess);
        // Alphabet upper case and lower case
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                guess = guess.toLowerCase();
                gameLogic();
            } else {
                alert("You didn't type a letter!  Try again!");
            } 
        } else {
        }
    }
