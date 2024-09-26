function show (shown,hidden){
    document.getElementById(shown).style.display='block';
    document.getElementById(hidden).style.display='none';
    return false;
}
/*---------------------------- Timer--------------------------*/
let [milliseconds ,second]=[0,0]
let timerRef = document.getElementById('time'); 
let int = null;

document.getElementById('start').addEventListener('click', ()=>{
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(mainTime,10);
});
    function mainTime(){
        milliseconds+=10;
        if(milliseconds == 1000){
            milliseconds = 0;
            second++;
 }
 let s = second < 10 ? "0" + second : second;
 let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

 timerRef.innerHTML = `${s} :${ms}`;
}
//--------------------------------------------------------------------------  

const section=document.querySelector("section");
const playerLivesCount=document.getElementById("plyer-lives");
let playersLives=3;

//show of playersLives
playerLivesCount.textContent=playersLives;


//function store the images 
const getData = () =>
 [
    {imgSrc:"./images/axenda.jpg", name:"axenda"},
    {imgSrc:"./images/facebook.png", name:"facebook"},
    {imgSrc:"./images/instagram.png", name:"instagram"},
    {imgSrc:"./images/linkedin.png", name:"linkedin"},
    {imgSrc:"./images/pinterest.png", name:"pinterest"},
    {imgSrc:"./images/twitter.png", name:"twitter"},
    {imgSrc:"./images/whatsapp.png", name:"whatsapp"},
    {imgSrc:"./images/youtube.png", name:"youtube"},
    {imgSrc:"./images/axenda.jpg", name:"axenda"},
    {imgSrc:"./images/facebook.png", name:"facebook"},
    {imgSrc:"./images/instagram.png", name:"instagram"},
    {imgSrc:"./images/linkedin.png", name:"linkedin"},
    {imgSrc:"./images/pinterest.png", name:"pinterest"},
    {imgSrc:"./images/twitter.png", name:"twitter"},
    {imgSrc:"./images/whatsapp.png", name:"whatsapp"},
    {imgSrc:"./images/youtube.png", name:"youtube"}

] 

//Random function 
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() -0.5);
   
   return cardData;
};
//randomize();

//generate the cards function 
const cardGenerator = () => {
  const cardData=randomize();
  //generate cards to html

  cardData.forEach((item,_index) => {
 // console.log(item);
    const card= document.createElement("div");
     const face = document.createElement("img");
     const back = document.createElement("div");
     card.classList='card';
     face.classList='face';
     back.classList='back';
     //img src 
     face.src=item.imgSrc;
    card.setAttribute("name",item.name);
    //Add the cards to the section 
   section.appendChild(card);
   //Add the face and back to card
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener('click', (e) => {
          card.classList.toggle('toggleCard');
          checkCards(e);
    });
  });

};

//check cards
const checkCards = (e) => {
    console.log(e);
    const clickedCard = e.target;  
    clickedCard.classList.add('flipped');
    const flippedCards=document.querySelectorAll('.flipped');
    const toggleCard =document.querySelectorAll('.toggleCard'); 
    if(flippedCards.length===2){
        if(flippedCards[0].getAttribute("name")===flippedCards[1].getAttribute("name")){
            console.log("match");
            flippedCards.forEach(card =>{
            card.classList.remove('flipped');
            card.style.pointerEvents = 'none';
        });
        }else{
            console.log("Wrong");
             flippedCards.forEach(card =>{
              card.classList.remove('flipped');
              setTimeout(()=>card.classList.remove('toggleCard'),1000);
            });
            playersLives--;
            playerLivesCount.textContent=playersLives;
            if (playersLives===0){
                restart("You lose, try again 🤪");
            }
        }
    }
    // check to see if we won the game 
    if(toggleCard.length === 16){
        restart("You won 🥳");
    }
};

//reset function 
const restart = (text) =>{
    let cardData=randomize();
    let faces=document.querySelectorAll('.face');
    let cards=document.querySelectorAll('.card');
    section.style.pointerEvents = 'none'; 
    cardData.forEach((item,index)=>{
       cards[index].classList.remove("toggleCard");
       //random
       setTimeout(()=>{ 
       cards[index].style.pointerEvents = "all";
       faces[index].src=item.imgSrc;
       cards[index].setAttribute("name",item.name);
       section.style.pointerEvents ="all";
       },1000);
    });

    playersLives=3;
    playerLivesCount.textContent = playersLives;
    setTimeout(()=>window.alert(text),100);
};

cardGenerator();