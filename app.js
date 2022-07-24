

const hearts = document.querySelectorAll('.hearts');
const LifesCount = document.querySelector('.Lifes-count');
const LifesTxt = document.querySelector('.Lifes-text');
const timerHours = document.querySelector('#timer .hours');
const timerMins = document.querySelector('#timer .minutes');
const timerSeconds = document.querySelector('#timer .seconds');
const restartBtn = document.querySelector('#restart');
const modal = document.querySelector('#simpleModal');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const modalReplayBtn = document.querySelector('.modal-replay-btn');
const modalLifes = document.querySelector('.modal-body .Lifes-count');
const modalHours = document.querySelector('.modal-body .hours');
const modalMins = document.querySelector('.modal-body .mins');
const modalSeconds = document.querySelector('.modal-body .seconds');
const modalRating = document.querySelector('.modal-body .rating');
let infoBtn = document.getElementById('info-btn');


const deck = document.querySelector('.deck');
const cards = [].slice.call(deck.children);
// card symbols
let cardSymbols = ['js-square', 'html5', 'css3-alt',
    'python', 'react', 'angular', 'sass', 'less',
    'js-square', 'html5', 'css3-alt',
    'python', 'react', 'angular', 'sass', 'less'];
 
// List of opened cards
let openCards = [];

// Number of start
let rating = 3;

// Number of wrong Lifes
let Lifes = 0;

// Number of matches. Max is 8
let matches = 0;

// Total seconds elapsed since game start
let elapsedSeconds = 0;
let hour = 0;
let min = 0;
let sec = 0;

// Timer
let timer = undefined;

// Game status
let gameStarted = false;

function info() {
    alert('Click on a card \n\
 Keep revealing cards and working your memory to remember each unveiled card.\n\
 Match cards properly with less moves and in faster time \
  ');}
/* ---- Event listeners ---- */

infoBtn.addEventListener('click', info);
// Click event listener attached to cards
deck.addEventListener('click', openCard);

// Click event listener attached to restart button
restartBtn.addEventListener('click', restartGame);

// Click event listener attached to x button to close modal
modalCloseBtn.addEventListener('click', closeModal);

// Click event listener attached to modal's replay button to restart the game
modalReplayBtn.addEventListener('click', restartGame);

/* ----------- Main game logic ----------- */

// Start new game
restartGame();

// Function to add 'open' & 'show' classes to card
function openCard(event) {

    startTimer();

    var target = event.target;
    const parent = target.parentElement;
    if (parent.classList.contains('card')) {
        target = parent;
    }

    if (!openCards.includes(target)) {
        target.classList.add('open', 'show');
        openCards.push(target);
        checkMatch();
    }
}

function startTimer() {
    if (!gameStarted) {
        gameStarted = true;
        timer = setInterval(setTime, 1000);
    }
}

function stopTimer() {
    gameStarted = false;
    clearInterval(timer);
}

function setTime() {
    let remainderSeconds = ++elapsedSeconds;
    hour = parseInt(remainderSeconds / 3600);
    timerHours.textContent = stringifyTime(hour);
    remainderSeconds = remainderSeconds % 3600;
    min = parseInt(remainderSeconds / 60)
    timerMins.textContent = stringifyTime(min);
    remainderSeconds = remainderSeconds % 60;
    sec = remainderSeconds;
    timerSeconds.textContent = stringifyTime(sec);
}

// Function to  'open' & 'show'  card
function closeCard(card) {
    setTimeout(() => {
        card.classList.remove('open', 'show');
    }, 500)
}

// Function to add 'match' class to card
function matchCard(card) {
    setTimeout(() => {
        card.classList.add('match', 'bounceIn');
    }, 500)
}

function checkMatch() {
    const length = openCards.length;
    if (length === 2) {

        const last = openCards[1];
        const preLast = openCards[0];

        if (last.children[0].classList.toString() ===
            preLast.children[0].classList.toString()) {
            incrementMatches();
            matchCard(last);
            matchCard(preLast);
        } else {
            closeCard(last);
            closeCard(preLast);
        }
        incrementLifes();
        openCards = [];
        checkGameWin();
    }
}
// not working
function incrementLifes() {
    Lifes++;
    LifesCount.textContent = Lifes;
    if (Lifes === 1) {
        LifesTxt.textContent = ' Lifes';
    } else {
        LifesTxt.textContent = 'Lifes';
    }
    determineRating();
}

function determineRating() {
    if (Lifes === 17) {
        rating--;
        hearts[2].classList.add('empty-heart');
    } else if (Lifes === 26) {
        rating--;
        hearts[1].classList.add('empty-heart');
    } else if (Lifes === 34) {
        rating--;
        hearts[0].classList.add('empty-heart');
    }
}

function incrementMatches() {
    matches++;
}

function checkGameWin() {
    if (matches === 8) {
        stopTimer();
        openModal();
    }
}

function restartGame() {
    closeModal();
    resetScore();
    resetDeck();
}

function resetScore() {

    // Reset rating
    rating = 3;
    hearts.forEach(heart => removeClassByPrefix(heart, 'empty-heart'));

    // Reset Lifes
    Lifes= 0;
    LifesCount.textContent = Lifes;

    // Reset matches
    matches = 0;

    // Reset time
    elapsedSeconds = 0;
    hour = 0;
    min = 0;
    sec = 0;
    timerHours.textContent = '00';
    timerMins.textContent = '00';
    timerSeconds.textContent = '00';

    // Stop timer
    stopTimer();
}

function resetDeck() {

    // Clear openedCards array
    openCards = [];

    // Shuffle symbols
    cardSymbols = shuffle(cardSymbols);

    // Iterate over all cards
    cards.forEach((card, index) => {
        card.classList.remove('open', 'show', 'match');
        removeClassByPrefix(card.children[0], 'fa-');

        // Attach new symbols to cards
        const symbol = `fa-${cardSymbols[index]}`;
        card.children[0].classList.add(symbol);
    });
}

function openModal() {
    modalHours.textContent = hour > 0 ? `${hour} hours, ` : '';
    modalMins.textContent = min > 0 ? `${min} minutes, ` : '';
    modalSeconds.textContent = `${sec} seconds`;
    modalLifes.textContent = `${Lifes} Lifes`;
    modalRating.textContent = rating;
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

/* ----------- Helper functions ----------- */

function removeClassByPrefix(el, prefix, replace = '') {
    var regx = new RegExp('\\b' + prefix + '(.*)?\\b', 'g');
    el.className = el.className.replace(regx, replace);
    return el;
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function stringifyTime(val) {
    var valString = val + '';
    return valString.length >= 2 ? `${val}` : `0${val}`;
}
