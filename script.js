const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const inputVal = document.getElementsByClassName('inputVal')[0];



let play = [];
function saveToLocalStorage() {
	const jsonString = JSON.stringify(play);
	localStorage.setItem('play', jsonString);
}

const jsonString = localStorage.getItem('play');
if (jsonString) {
	play = JSON.parse(jsonString);
}

// /// Load saved tasks from local storage to memory
// getAllTasks().then(apiTasks => {
// 	play = apiTasks;
// 	/// Update UI to reflect the actual data
//   updateHtmlUi();

// });



let cards;
let interval;
let firstCard = false;
let secondCard = false;

//Items array
const items = [
  { name: "1", image: "gems.png"},
  { name: "2", image: "gemstone.png" },
  { name: "3", image: "gem.png" },
  { name: "4", image: "gem2.png" },
  { name: "5", image: "gem3.png" },
  { name: "6", image: "gem4.png" },
  { name: "7", image: "gem5.png" },
  { name: "8", image: "gem6.png" },
  { name: "9", image: "gem7.png" },
  { name: "10", image: "gem8.png" },
  { name: "11", image: "gem9.png" },
  { name: "12", image: "gem10.png" },
];


let miss=[];
//Initial Time
let seconds = 0,
  minutes = 0;
//Initial moves and win count
let movesCount = 0,
  winCount = 0;

//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//Pick random objects from the items array
const generateRandom = (size = 4) => {
  //temporary array
  let tempArray = [...items];
  //initializes cardValues array
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {

    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
      
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
          
        } else {
          //increment moves since user selected second card
          movesCounter();
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              // to read moves and time
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>
            <h4> total time :</span>${minutes}:${seconds}</h4>
            <h4> mistaken:</span>${miss}</h4>
           `;
           play.push({
 
  id: new Date(),
  Moves:movesCount ,
  totaltime:{minutes,seconds},

  mistaken:miss,
});
saveToLocalStorage();
          
              stopGame();
            }
          } else {

            //if the cards dont match
            //flip the cards back to normal
            miss++
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 600);
          }
        }
      }
    });
  });
};



//Start game
startButton.addEventListener("click", () => {

    if(inputVal.value==0){
        alert("Please Enter your name ")
        }
        else {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  //controls amd buttons visibility
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  // timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
  initializer();
  inputVal++
        }
});


//Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

//Initialize values 
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};

// switch between pages
function show(shown, hidden) {
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden).style.display='none';
  return false;
}

// function updateHtmlUi() {
// 	play.replaceChildren([]);

// 	for (let i = 0; i < tasks.length; i++) {
// 		const task = tasks[i];
// 		const newTaskHtml = document.createElement('div');
// 		if (task.is_checked) {
// 			newTaskHtml.className = 'box task-box checked';
// 		} else {
// 			newTaskHtml.className = 'box task-box';
// 		}

// 		const checkboxHtml = document.createElement('div');
// 		checkboxHtml.className = 'task-checkbox';
// 		checkboxHtml.innerHTML = '<i class="fa-regular fa-face-grin-beam icon"></i>';
// 		checkboxHtml.addEventListener('click', async (event) => {
// 			const updatedTask = {
// 				...tasks[i],
// 				is_checked: !tasks[i].is_checked
// 			};
// 			await upsertTask(updatedTask);
// 			tasks[i] = updatedTask;
// 			updateHtmlUi();
// 		});
		
// 		newTaskHtml.appendChild(checkboxHtml);

// 		const textHtml = document.createElement('textarea');
// 		textHtml.className = 'task-input';
// 		textHtml.innerText = task.input;
// 		textHtml.oninput = (event) => autoHeight(event.target);
// 		/// onblur works after moving outside the input
// 		textHtml.onblur = async (event) => {
// 			const updatedTask = {
// 				...tasks[i],
// 				input: event.target.value,
// 			};
// 			await upsertTask(updatedTask);
// 			tasks[i] = updatedTask;
// 			updateHtmlUi();
// 		};

// 		newTaskHtml.appendChild(textHtml);

// 		const spacerHtml = document.createElement('div');
// 		spacerHtml.className = 'spacer';
// 		newTaskHtml.appendChild(spacerHtml);

// 		const deleteIconHtml = document.createElement('div');
// 		deleteIconHtml.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
// 		deleteIconHtml.addEventListener('click', async (event) => {
// 			const task_id = tasks[i].task_id;
// 			await deleteTask(task_id);
// 			tasks = tasks.filter((t, index) => index !== i);
// 			updateHtmlUi();
// 		});
// 		newTaskHtml.appendChild(deleteIconHtml);

// 		tasksDiv.appendChild(newTaskHtml);
// 	}

// 	const tasksInputs = document.getElementsByClassName('task-input');
// 	for (const child of tasksInputs) {
// 		autoHeight(child);
// 	}
// }

async function getAllinfo() {
	const result = await fetch('http://0.0.0.0:3002/play');
	return await result.json();
}



async function insertinfo(task) {
	await fetch(`http://0.0.0.0:3002/play`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(play)
	});
}

