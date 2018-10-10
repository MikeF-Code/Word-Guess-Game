// Variable Declarations
var lives = 3;
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
var gameStartMusic = new Audio("./audio/gameStart.mp3");

function newGame() {
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
}

document.getElementById("startButton").onclick = function() {newGame()};
document.getElementById("resetButton").onclick = function() {newGame()};

function gameLogic() {

    // For loop to check all letters in computerChoice, if keypress is correct, update "answer" array.
    for (var j = 0; j < computerChoice.length; j++) {
        if(computerChoice[j] === guess){
            answer.splice(j, 1, guess);
            console.log("Pushed guess: " + guess + " into answer array.");
            console.log("Current answer array: " + answer);
            answerText.textContent = answer.join(' ');
        } else {

        }
    }
    // Conditional statement to decrement lives and push letter into 
    if (computerChoice.indexOf(guess, 0) === -1) {
        lives--;
        wrongGuesses.push(guess);
        console.log("Wrong guess!");
        console.log("Current wrongGuesses array: " + wrongGuesses);
        console.log("Current lives: " + lives);
        missedText.textContent = wrongGuesses.join(' ');
        livesText.textContent = lives;
    } else {

    }
    //Win Condition
    if (answer.indexOf("_", 0) === -1) {
        gameText.textContent = "You win!";
        hintImage.innerHTML = "";
        console.log("Cleared hintImageOK.");
        hintImage.innerHTML = "<img src='./images/"+answerID+"-complete.png'>";
        console.log("Replaced hintImage with "+answerID+"-complete.png");
        var winMusic = new Audio("./audio/"+answerID+"-win.mp3");
        winMusic.play();
    } else {

    }

    if (lives===2) {
        hintImage.innerHTML = "";
        hintImage.innerHTML = "<img src='./images/"+answerID+"-2.png'>";
    }

    if (lives===1) {
        hintImage.innerHTML = "";
        hintImage.innerHTML = "<img src='./images/"+answerID+"-1.png'>";
    }
}



    // Key listener
    document.onkeyup = function(event) {
        if (lives > 0) {
        // Assign keystroke to variable
            guess = event.key;
            console.log("User pressed key: " + guess);
        // Alphabet upper case
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                guess = guess.toLowerCase();
                gameLogic();
        // Alphabet lower case
            } else if (event.keyCode >= 97 && event.keyCode <= 122) {
                gameLogic();
            } else {
                alert("You didn't type a letter!  Try again!");
            } 
        } else {
            gameText.textContent = "You lose!";
            hintImage.innerHTML = "";
            hintImage.innerHTML = "<img src='./images/"+answerID+"-complete.png'>";
            var loseMusic = new Audio("./audio/"+answerID+"-lose.mp3");
            loseMusic.play();
        }
    }
