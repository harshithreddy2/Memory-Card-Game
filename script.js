const gameBoard = document.getElementById("gameBoard");
const movesCounter = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const newGameButton = document.getElementById("newGame");

let cards = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍉", "🍉", "🥝", "🥝", "🍒", "🍒", "🍓", "🍓", "🍍", "🍍"];
let flippedCards = [];
let matchedCards = 0;
let moves = 0;
let timer;
let time = 0;

function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
}

function startGame() {
    gameBoard.innerHTML = "";
    shuffleCards();
    flippedCards = [];
    matchedCards = 0;
    moves = 0;
    time = 0;
    movesCounter.textContent = moves;
    timerDisplay.textContent = time;
    clearInterval(timer);
    timer = setInterval(() => {
        time++;
        timerDisplay.textContent = time;
    }, 1000);
    
    cards.forEach((symbol, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.textContent = this.dataset.symbol;
        flippedCards.push(this);
    }
    
    if (flippedCards.length === 2) {
        moves++;
        movesCounter.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedCards += 2;
        flippedCards = [];
        if (matchedCards === cards.length) {
            clearInterval(timer);
            setTimeout(() => alert(`Congratulations! You won in ${moves} moves and ${time} seconds!`), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = "";
            card2.textContent = "";
            flippedCards = [];
        }, 800);
    }
}

newGameButton.addEventListener("click", startGame);
startGame();
