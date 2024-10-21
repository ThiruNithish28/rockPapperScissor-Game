const resultDisplay = document.querySelector('.results');
const chooseRound = document.querySelector('.pick-rounds');
const gamePage = document.querySelector('.game');
const weapons = document.querySelector('.weapons');
const roundDisplay = document.querySelector('.current-round');
const moveDisplay = document.querySelector('.display-moves');
const finalScorePage = document.querySelector('.final-score-page');
const finalResultDisplay = document.querySelector('.final-result');
const nav = document.querySelector('.nav1');

let roundSelected;
let playerMove;
let computerMove;
let playerMoveIcon;
let computerMoveIcon;
let funImgSrc;
let currentRound = 1;
let scores = {
    computer: 0,
    player: 0
};

let result;

// Initialize the game when the page loads
function initializeGame() {
    setupEventListeners();
    // begins();
}

// Set up event listeners only once
function setupEventListeners() {
    chooseRound.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-1')) {
            roundSelected = parseInt(e.target.getAttribute('data-atr'));
            console.log("Selected rounds:", roundSelected);

            chooseRound.classList.add('hidden');
            gamePage.classList.remove('hidden');
            playGame();
        }
    });

    finalScorePage.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-1')) {
            finalScorePage.classList.add('hidden');
            clearForNextMatch();
            begins(); // Start a new game
        }
    });
}

function begins() {
    document.querySelector('.intro').classList.add('hidden');
    nav.classList.remove('hidden')
    gamePage.classList.add('hidden'); // Hide the game page until the game starts
    chooseRound.classList.remove('hidden'); // Show the round selection screen
}

function pickComputerMove() {
    const random = Math.random();
    if (random < 0.4) {
        computerMove = 'rock';
        computerMoveIcon='✊';
    } else if (random >= 0.4 && random < 0.6) {
        computerMove = 'paper';
        computerMoveIcon='🖐️';
    } else {
        computerMove = 'scissors';
        computerMoveIcon='✌'
    }
}

function playGame() {
    weapons.addEventListener('click', handleWeaponClick);
}

function handleWeaponClick(e) {
    if (e.target.classList.contains('btn-1')) {

        playerMove = e.target.getAttribute('data-atr');
        console.log("Player move:", playerMove);
        
        playerMoveIcon = playerMove ==='rock' ? '✊' : playerMove==='paper' ? '🖐️' : '✌'

        // Pick the computer's move after the player makes a move
        pickComputerMove();
        console.log("Computer move:", computerMove);

        determineResult();
        updateScoreCard();
        updateRound();
        console.log(`Current round: ${currentRound}`);

        if (currentRound > roundSelected) {
            setTimeout(() => {
                endGame();
            }, 2100);
        }
    }
}

function endGame() {
    gamePage.classList.add('hidden');
    finalScorePage.classList.remove('hidden');

    let finalResult;
    if (scores.player > scores.computer) {
        finalResult = `You won the game with a score of ${scores.player} to ${scores.computer}.`;
    } else if (scores.player < scores.computer) {
        finalResult = `The computer won the game with a score of ${scores.computer} to ${scores.player}.`;
    } else {
        finalResult = `It's a draw with a score of ${scores.player} to ${scores.computer}.`;
    }
    finalResultDisplay.innerHTML = finalResult;
}

function clearForNextMatch() {
    scores.player = 0;
    scores.computer = 0;
    currentRound = 1; // Reset the current round to 1

    roundDisplay.innerHTML = `Round ${currentRound} of ${roundSelected}`;

    // Remove the score elements from the score card
    removeScoreElement('player-score');
    removeScoreElement('computer-score');
}

function removeScoreElement(className) {
    const scoreElement = document.querySelector(`.${className}`);
    if (scoreElement) {
        scoreElement.remove(); // Remove the element if it exists
    }
}

function updateRound() {
    currentRound++;
    if (currentRound <= roundSelected) {
        roundDisplay.innerHTML = `Round ${currentRound} of ${roundSelected}`;
    }
}

function determineResult() {
    if (playerMove === computerMove) {
        result = 'Good try.. It\'s a tie!';
        funImgSrc= './assest/images/tie.png';
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        scores.player++;
        result = '`Wow! You win..!`';
        funImgSrc= './assest/images/win.png';
        
    } else {
        scores.computer++;
        result = 'Oops.. Computer wins!';
        funImgSrc= './assest/images/loss.png';
    }
    displayResult();
}

function displayResult() {
    weapons.classList.add('hidden');
    moveDisplay.querySelector('.computer').innerHTML=`computer: ${computerMoveIcon}`;
    moveDisplay.querySelector('.player').innerHTML=`you: ${playerMoveIcon}`;

    // add fun img
    const img = document.createElement('img');
    img.classList.add('fun-img');
    img.src=funImgSrc;
    moveDisplay.append(img);
    resultDisplay.innerHTML = result;

    setTimeout(() => {
        resultDisplay.innerHTML = '';
        moveDisplay.querySelector('.computer').innerHTML='';
        moveDisplay.querySelector('.player').innerHTML='';
        removeScoreElement('fun-img'); // remove the fun img
        weapons.classList.remove('hidden');
        
    }, 2100);
}

function updateScoreCard() {
    const scoreCard = document.querySelector('.scores');

    function updateOrCreateScoreElement(className, content) {
        let scoreElement = scoreCard.querySelector(`.${className}`);
        if (!scoreElement) {
            scoreElement = document.createElement('p');
            scoreElement.classList.add(className);
            scoreCard.append(scoreElement);
        }
        scoreElement.innerHTML = content;
    }

    updateOrCreateScoreElement('player-score', scores.player);
    updateOrCreateScoreElement('computer-score', scores.computer);
}

// Initialize the game setup when the script runs
initializeGame();


//Step 5 of service work for PWA
if("serviceWorker" in navigator){
    window.addEventListener("load", function(){
        this.navigator.serviceWorker
         .register("/serviceWorker.js")
         .then(res=> console.log("service Worker register"))
         .catch(err => console.log("service worker not registerd",err))
    })
}
