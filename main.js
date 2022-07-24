const hart1 = document.getElementById('.hart1');
const hart2 = document.getElementById('.hart2');
const hart3 = document.getElementById('.hart3');
const timer = document.getElementById('timer');
let triesElement = document.querySelector('.tries span');
const btnPlay = document.getElementById('play');
const btnScores = document.getElementById('scores');
const btnContinue = document.getElementById('continue');
const btnBack1 = document.getElementById('back1');
const btnBack2 = document.getElementById('back2');
const page1 = document.querySelector('.page1');
const page2 = document.querySelector('.page2');
const page3 = document.querySelector('.page3');
const page4 = document.querySelector('.page4');
let output = document.getElementById('output');
let input = document.getElementById('myInput');
const restart = document.getElementById('restart');
let setTime = 1000;
let life = 0;
let run;

function startTime() {
	if (run == null) {
		let count = 0;
		run = setInterval(() => {
			count += 1;
			timer.innerHTML = count;
		}, setTime);
	}
}
startTime();

function restartTime() {
	if (run) {
		clearInterval(run);
		run = null;
		timer.innerHTML = '0';
		let count = 0;
		run = setInterval(() => {
			count += 1;
			timer.innerHTML = count;
		}, setTime);
	}
}

// select container
let matchingContainer = document.querySelector('.Matching-Game-blocks');
// create array from game block
let gameBlocks = Array.from(matchingContainer.children);
// create  array for index of game block
let orderRange = Array.from(Array(gameBlocks.length).keys());
//add shuffle
shuffle(orderRange);

function gamesBlock() {
	// add order for etch element in game block
	gameBlocks.forEach((block, index) => {
		//create order for every game-block
		block.style.order = orderRange[index];
		//add event in every time to click block
		block.addEventListener('click', (event) => {
			//call isChecked() for every time to click block then add class 'is-checked'
			isChecked(block);
		});
	});
}
gamesBlock();

function isChecked(selectedBlock) {
	//add class 'is-checked' for every block
	selectedBlock.classList.add('is-checked');
	// check of all block do you have a class is-checked or not
	let allBlockIsChecked = gameBlocks.filter((isChecked) => isChecked.classList.contains('is-checked'));
	// check if you do have a class is-checked
	if (allBlockIsChecked.length == 2) {
		//if you have class is-checked add class no-clicking then remove a class no-clicking after 1s
		StopClicking();

		CheckMatchBlock(allBlockIsChecked[0], allBlockIsChecked[1]);
	}
}

function StopClicking() {
	//add class to game block
	matchingContainer.classList.add('no-Clicking');

	//remove class to game block after 1s
	setTimeout(() => {
		matchingContainer.classList.remove('no-Clicking');
	}, setTime);
}

function CheckMatchBlock(firstBlock, secondBlock) {
	if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
		firstBlock.classList.remove('is-checked');
		secondBlock.classList.remove('is-checked');

		firstBlock.classList.add('has-match');
		secondBlock.classList.add('has-match');
	} else {
		triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

		setTimeout(() => {
			firstBlock.classList.remove('is-checked');
			secondBlock.classList.remove('is-checked');
		}, setTime);
	}
}
// shuffle function
function shuffle(array) {
	let current = array.length,
		temp,
		random;

	while (current > 0) {
		//get random number
		random = Math.floor(Math.random() * current);
		current--;
		//save current number in temp
		temp = array[current];
		// random number === current number
		array[current] = array[random];
		//replace between current number with random number
		array[random] = temp;
	}
	return array;
}
restart.addEventListener('click',(event) => {
	document.location.reload(true)
})
// add event to button
btnPlay.addEventListener('click', (event) => {
	page1.classList.add('page-hidden');
	page2.classList.remove('page-hidden');
});
btnScores.addEventListener('click', (event) => {
	page1.classList.add('page-hidden');
	page3.classList.remove('page-hidden');
});
btnContinue.addEventListener('click', (event) => {
	page1.classList.add('page-hidden');
	page2.classList.add('page-hidden');
	page4.classList.remove('page-hidden');
});
btnBack1.addEventListener('click', (event) => {
	page3.classList.add('page-hidden');
	page1.classList.remove('page-hidden');
});
btnBack2.addEventListener('click', (event) => {
	page4.classList.add('page-hidden');
	page1.classList.remove('page-hidden');
});

let userInfo = [];
function showData() {
	const jsonString = localStorage.getItem('userInfo');
	if (jsonString) {
		userInfo = JSON.parse(jsonString);
	}

	updateHtmlUi();
}
showData();
function addInfo() {
	btnContinue.addEventListener('click', (ev) => {
		userInfo.push({
			name: input.value,
			isChecked: false,
		});
		updateHtmlUi();

		saveToLocalStorage();
	});
}
addInfo();

function saveToLocalStorage() {
	const jsonString = JSON.stringify(userInfo);
	localStorage.setItem('userInfo', jsonString);
}

function updateHtmlUi() {
	output.replaceChildren([]);
	for (let i = 0; i < userInfo.length; i++) {
		const user = userInfo[i];
		const newName = document.createElement('div');

		if (user.isChecked) {
			newName.className = 'gap';
		} else {
			newName.className = 'api-info';
		}
		const addElement = document.createElement('span');

		addElement.className = 'api-info';
		addElement.innerHTML = user.name;

		addElement.addEventListener('click', (event) => {
			userInfo[i].isChecked = !userInfo[i].isChecked;
			updateHtmlUi();
			saveToLocalStorage();
		});
		newName.appendChild(addElement);
		output.appendChild(newName);
	}
}
