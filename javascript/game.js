    // Variable Declarations
var lives = 3;
var solutions = ["galaga", "frogger", "centipede", "paperboy", "tetris", "rampage"];
var answer = [];
var wrongGuesses = [];
var guess;
var answerText = document.getElementById("answer");
var missedText = document.getElementById("missedLetters");
var livesText = document.getElementById("lives");
var backgroundMusic = new Audio("./audio/background.mp3");


    // Choose a solution
var computerChoice = solutions[Math.floor(Math.random() * solutions.length)];
console.log("Solution is " + computerChoice);
console.log("Current lives: " + lives);

    // Write underscores to the "answer" array matching the number of characters in the solution
for (var i = 0; i < computerChoice.length; i++) {
    answer[i] = "_";
}
console.log("Answer array is: " + answer);
answerText.textContent = answer.join(' ');
livesText.textContent = lives;

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
}
    // Key listener
    document.onkeyup = function(event) {
        backgroundMusic.play();
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

            
    }
}
