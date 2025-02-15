const words = [
    { word: "TRUST", clue: "Faith Confidence" },
    { word: "PLANT", clue: "Nature Green" },
    { word: "BREAD", clue: "Food Bakery" },
    { word: "HOUSE", clue: "Home Shelter" }
];

// Pick a random word
let selectedWord = words[Math.floor(Math.random() * words.length)];
const secretWord = selectedWord.word;
document.getElementById("clue-text").textContent = selectedWord.clue;

const maxAttempts = 6;
let attempts = 0;

function createBoard() {
    const board = document.getElementById("game-board");
    for (let i = 0; i < maxAttempts * 5; i++) {
        let box = document.createElement("div");
        box.classList.add("letter-box");
        board.appendChild(box);
    }
}

function submitGuess() {
    let input = document.getElementById("guess-input");
    let guess = input.value.toUpperCase();
    
    if (guess.length !== 5) {
        document.getElementById("message").textContent = "⚠ Enter a 5-letter word!";
        return;
    }

    let board = document.querySelectorAll(".letter-box");
    let startIdx = attempts * 5;

    for (let i = 0; i < 5; i++) {
        let box = board[startIdx + i];
        box.textContent = guess[i];

        setTimeout(() => {
            if (guess[i] === secretWord[i]) {
                box.classList.add("correct");
            } else if (secretWord.includes(guess[i])) {
                box.classList.add("misplaced");
            } else {
                box.classList.add("wrong");
            }
        }, i * 300); // Delay effect
    }

    attempts++;

    if (guess === secretWord) {
        document.getElementById("message").textContent = "🎉 You Win!";
    } else if (attempts === maxAttempts) {
        document.getElementById("message").textContent = "❌ Game Over! The word was " + secretWord;
    }

    input.value = "";
}

createBoard();