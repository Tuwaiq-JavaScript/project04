const cards = document.querySelectorAll('.card');
const oneDiv = document.querySelectorAll('one');
let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0; 
let timer;
let myTimer = document.querySelectorAll('timer');


 
// function stop(){
//     clearInterval(timer);
  
//   }
let card =[];

const jsonString = localStorage.getItem('one');
if (jsonString) {
	one = JSON.parse(jsonString);
}
(function (){
    var sec = 0;
    timer = setInterval(()=>{
        myTimer.innerHTML = '00:'+sec;
      sec ++;
    }, 1000) 
  })() 

  
  
  
function flipCard(e){ 
    let clickedCard = e.target; 

    if(clickedCard !== cardOne && !disableDeck){ 
        clickedCard.classList.add('flip');

        if(!cardOne){
            return cardOne = clickedCard; 
        }
        cardTwo = clickedCard;

        disableDeck = true;

        let cardOneImg = cardOne.querySelector('img').src, 
        cardTwoImg = cardTwo.querySelector('img').src; 
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2){ 

    if(img1 === img2){ 
        matchedCard++; 
        if(matchedCard == 8){ 
            setTimeout(() => { 
                return shuffleCard();
            }, 1200); 
        }

        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = '';//7.4
        return disableDeck = false;
    }
    else{
        setTimeout(() => { 
            cardOne.classList.add('shake');
            cardTwo.classList.add('shake');
        }, 400);

        setTimeout(() => { 
            cardOne.classList.remove('shake', 'flip');
            cardTwo.classList.remove('shake', 'flip');
            cardOne = cardTwo = '';

            disableDeck = false;

        }, 1200);
    }
}

function shuffleCard(){
    matchedCard = 0;
    cardOne = cardTwo = "";

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]; 
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => { 
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);

        let imgTag = card.querySelector('img');
        imgTag.src = `images/img-${arr[index]}.png`;
    });
}
shuffleCard();

cards.forEach(card => { s
    card.addEventListener('click', flipCard); 
});