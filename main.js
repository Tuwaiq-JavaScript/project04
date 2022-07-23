const score = document.getElementById('score');
const cards = document.querySelectorAll('.card');

const chances = 15;
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
// hide and show sech
// function hidefirst() {
//     const playbtn= document.getElementById('play-btn');
//         if (playbtn.style.display === "none") {
//           playbtn.style.display = "block";
//         } else {
//           playbtn.style.display = "none";
//         }
//       }


window.onload = function () {
	currentChance = chances;
	document.getElementById('currentchances').innerText = currentChance;
    
};
function flipCard({ target: clickedCard }) {
	if (cardOne !== clickedCard && !disableDeck) {
		clickedCard.classList.add('flip');
		if (!cardOne) {
			return (cardOne = clickedCard);
		}
		cardTwo = clickedCard;
		disableDeck = true;
		let cardOneImg = cardOne.querySelector('.back-view img').src,
			cardTwoImg = cardTwo.querySelector('.back-view img').src;
		matchCards(cardOneImg, cardTwoImg);
	}
}
function matchCards(img1, img2) {
	if (img1 === img2) {
		matched++;
		score.innerText = matched;

		if (matched == 8) {
            alert('You won');
			setTimeout(() => {
				return shuffleCard();
			}, 1000);
		}
		cardOne.removeEventListener('click', flipCard);
		cardTwo.removeEventListener('click', flipCard);
		cardOne = cardTwo = '';
		return (disableDeck = false);
	} 
	setTimeout(() => {
		cardOne.classList.add('shake');
		cardTwo.classList.add('shake');
        document.getElementById('currentchances').innerText = --currentChance;
        if (currentChance == 0) {
            document.getElementById('start-btn').click();
            document.getElementById('start-btn').click();

            alert('You lost');
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
	}, 400);
	setTimeout(() => {
		cardOne.classList.remove('shake', 'flip');
		cardTwo.classList.remove('shake', 'flip');
		cardOne = cardTwo = '';

		disableDeck = false;
	}, 1200);
}
function shuffleCard() {
	matched = 0;
	disableDeck = false;
	cardOne = cardTwo = '';
	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
	arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
	cards.forEach((card, i) => {
		card.classList.remove('flip');
		let imgTag = card.querySelector('.back-view img');
		imgTag.src = `images/img-${arr[i]}.png`;
		card.addEventListener('click', flipCard);
	});
}
shuffleCard();

cards.forEach((card) => {
	card.addEventListener('click', flipCard);
});

// timer
const timerdiv = document.getElementById('timer');
const startbtn = document.getElementById('start-btn');

let didstart = false;
let timer;

const startBtnF = (event) => {
	if (didstart) {
		clearInterval(timer);
		timerdiv.innerText = '0';
		startbtn.innerText = 'Start';
		didstart = false;

		document.getElementById('start-btn').style.backgroundColor = '#7dd800';
	} else {
		startTimer();
		startbtn.innerText = 'Stop';
		didstart = true;

		document.getElementById('start-btn').style.backgroundColor = '#ffcccb';
	}
};

function startTimer() {
	const dateRun = new Date().valueOf() + 1000;

	const dateNow = new Date().valueOf() + 1000;
	const newTimer = ((dateNow - dateRun) / 1000).toFixed(0);
	timerdiv.innerText = newTimer;

	timer = setInterval(() => {
		const dateNow = new Date().valueOf() + 1000;
		const newTimer = ((dateNow - dateRun) / 1000).toFixed(0);
		timerdiv.innerText = newTimer;
	}, 500);
}
// hide and show div
function myFunction() {
	var x = document.getElementById('first');
	var y = document.getElementById('name-page');
	if (x.style.display === 'block') {
		x.style.display = 'none';
        y.style.display = 'block';
		
	} else {
		x.style.display = 'block';
        y.style.display = 'none';
		
	}
}
