const timer_div =document.getElementById('timer')

let utils = {};
  
function start_timer(){
    const dateRun = new Date().valueOf();
    const dateNow= new Date().valueOf();
    const newTimer = ((dateNow-dateRun)/1000).toFixed(0);
    timer_div.innerText = newTimer
    timer = setInterval(()=>{
        const dateNow= new Date().valueOf();
        const newTimer= ((dateNow-dateRun)/1000).toFixed(0);
         timer_div.innerText = newTimer
    
    },500)
    
    }
//    function ButtonFunction(event){
//        scrores_games()
//    }
/* 
 * this menu outlines all the screens and their paths. 
 */
function app_menu() {
    // start by declaring an items object.
     var items = {};
  
     // each key will be ID of the "screen."
     items.welcome_path = {
      active: true,
        title: 'Welcome to mataching game',
        screen_callback: 'welcome',
     };
     items.choose_path = {
        // active: true,
        title: 'Are you excited to play?',
        screen_callback: 'choose'
     };
     items.play_game_path = {
        // active: true,
        title: 'play_game',
        screen_callback: 'play_game'
     };
     items.scores_path = {
         //active: true,
        title: 'Scrores',
        screen_callback: 'scrores_games'
     };
     items.cards_path ={
         title: 'j',

     }
    return items;
}
/*
 *  the screen 1 callback.
 */
function welcome() {
  // start with content.
  let content = {};
  // each major section will be specified by an object.
  
  // object with a markup property.
  content.header = {
    markup: '<h3>What is your name?</h3>'
  };
  
  content.body = {
    markup:'<input id="input1" type="text" placeholder="e.g.  Ali" name="yourname">'
  };
  
  // object with a links property.
  content.nav = {
    className:'nav',
    links:[{
      text:'continue',
      href:'#choose_path'
    },
   /* {
      text:'screen 3',
      href:'#play_game_path'
    }*/]
  };
  // return the content.
  return content;
}
/*
 *  the screen 2 callback.
 */
function choose() {
  let content = {};
  
  content.header = {
    markup: '<h3>Please choose</h3>'
  };
//   content.body = {
//     markup:'<button id="btn1"'
//   };
  content.nav = {
    className:'nav',
    links:[{
      text:'Play',
      href:'#play_game_path'
    },
    {
      text:'Scores',
      href:'#scores_path'
    }]
  };
  return content;
}
/*
 *  the screen 3 callback.
 */
function play_game() {
  let content = {};
  
    // object with a markup property.
content.header = {
    markup: ''
    
  };
  
  content.body = {
    markup:'<p>Start the game</p>',
    innerHTML: '<h1>g</h1>'


  };
  

content.nav = {
    className:'nav',
    links:[{
      text:'back',
      href:'#choose_path'
    },
    {
      text:'start',
      href:'#cards_path',
      function:  start_timer()
    }]
  };
 
  return content;
}
function cards_g(){
    const checkboxHtml = document.createElement('div');
    checkboxHtml.className = 'task-checkbox';
    checkboxHtml.innerHTML = '<h3>ssss</h3>';
    document.addEventListener('DOMContentLoaded', () => {
        //card options

        const cardArray = [
          {
            name: 'img1',
            img: '/images/icons8-dog-sit-96.png'
          },
          {
            name: 'img2',
            img: '/images/icons8-circus-tent-96.png'
          },
          {
            name: 'img3',
            img: '/images/icons8-car-96.png'
          },
          {
            name: 'img4',
            img: '/images/icons8-swinging-boat-96.png'
          },
          {
            name: 'img5',
            img: '/images/icons8-playground-96.png'
          },
          {
            name: 'img6',
            img: '/images/icons8-airport-96.png'
          },
          {
            name: 'img1',
            img: '/images/icons8-dog-sit-96.png'
          },
          {
            name: 'img2',
            img: '/images/icons8-circus-tent-96.png'
          },
          {
            name: 'img3',
            img: '/images/icons8-car-96.png'
          },
          {
            name: 'img4',
            img: '/images/icons8-swinging-boat-96.png'
          },
          {
            name: 'img5',
            img: '/images/icons8-playground-96.png'
          },
          {
            name: 'img6',
            img: '/images/icons8-airport-96.png'
          },
          {
            name: 'img7',
            img: '/images/icons8-food-bar-96.png'
          },
          {
            name: 'img7',
            img: '/images/icons8-food-bar-96.png'
          },
          {
            name: 'img8',
            img: '/images/icons8-owl-96.png'
          },
          {
            name: 'img8',
            img: '/images/icons8-owl-96.png'
          }
        ]
        
        cardArray.sort(() => 0.5 - Math.random())
        const grid = document.querySelector('.grid')
        const resultDisplay = document.querySelector('#result')
        let cardsChosen = []
        let cardsChosenId = []
        let cardsWon = []
    
        function createBoard() {
            
        for (let i = 0; i < cardArray.length; i++) {
          const card = document.createElement('img')
          card.setAttribute('src', '/images/icons8-blue-square-96.png')
          card.setAttribute('data-id', i)
          card.addEventListener('click', flipCard)
          grid.appendChild(card)
        }

      }
      
    
      //check for matches
      function checkForMatch() {
        const cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        
        if(optionOneId == optionTwoId) {
          cards[optionOneId].setAttribute('src', '/images/icons8-blue-square-96.png')
          cards[optionTwoId].setAttribute('src', '/images/icons8-blue-square-96.png')
          alert('You have clicked the same image!')
        }
        else if (cardsChosen[0] === cardsChosen[1]) {
          // alert('You found a match')
          cards[optionOneId].setAttribute('src', '/images/icons8-thumbs-up-96.png')
          cards[optionTwoId].setAttribute('src', '/images/icons8-thumbs-up-96.png')
          cards[optionOneId].removeEventListener('click', flipCard)
          cards[optionTwoId].removeEventListener('click', flipCard)
          cardsWon.push(cardsChosen)
        } else {
          cards[optionOneId].setAttribute('src', '/images/icons8-blue-square-96.png')
          cards[optionTwoId].setAttribute('src', '/images/icons8-blue-square-96.png')
          // alert('Sorry, try again')
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if  (cardsWon.length === cardArray.length/2) {
          resultDisplay.textContent = 'Congratulations! You found them all!'
          resultDisplay.innerText='<div onclick="scrores_games()" role="button" id="btn1">scores</div>'
        }
        

      }
    
      //flip your card
      function flipCard() {
          
        let cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length ===2) {
          setTimeout(checkForMatch, 500)
        }
      }
    
      createBoard()
    })


}

cards_g()


function scrores_games() {
    let content = {};
    
    return content;
  }
(function(context) {
/*
 *  changeScreen function.
 */
  function changeScreen(e) {
   // codepen-specific.

   
   // get the active screen.
   let prev = document.querySelector('.screen.active');
  
   const delay = 10;
   window.setTimeout(function() {
     if (prev && prev.className.includes('active')) {
          prev.classList.remove('active');
     }  
   },delay);
    
   let id = e.target.href.split('#')[1];

   // if screen does not exist, build it dynamically.
   let screen = document.getElementById(id) || buildScreen(id);
         
   if (!screen.className.includes('active')) {
         let delay = 50;
          window.setTimeout(function() {
             screen.className += ' active';
          },delay); 
   }
   return id;
}
/* add content. */
function addContent(id,screen,el) {
  
  if (context.menu[id]) {
    let cb = context.menu[id].screen_callback;
     
    let content = window[cb]();
 
    for (const key in content) {

     let o = content[key];
 
     if (o.markup) {
     
      let div = document.createElement('div');
       div.innerHTML = o.markup;
       el.appendChild(div);
     }
      
     if (o.links) {
       let ul = document.createElement('ul');
       if (o.className) { ul.className = o.className; }
       for (link of o.links) {
         let li = document.createElement('li');
         let a = document.createElement('a');
         a.textContent = link.text;
         a.href = link.href;
         li.appendChild(a);
         ul.appendChild(li);
         enableLink(a);
       }
       el.appendChild(ul);
     }
    }
  }
  return el;
}
 
/* for each screen, add a title and content. */
context.init = function(appId,myMenu) {
  
  // add these to the context object since we will want to use them later.
  context.id = appId;
  context.menu = myMenu();
  
  let path_ids = Object.keys(context.menu);

  let screenId = path_ids.find(id => context.menu[id].active);

  if (screenId) {
    // console.log('screenId: ' + screenId);
    screen = buildScreen(screenId);
    
    screen.className += ' active';
  }
}
function buildScreen(screenId) {
  
    let app = document.getElementById(context.id);

    let obj = context.menu[screenId];
    
    let screen = document.createElement('div');
    
    screen.className = 'screen';
    screen.id = screenId;
  
    let h2 = document.createElement('h2');
    let title = obj.title || 'Placeholder';
    h2.textContent = title;
    
    screen.appendChild(h2);
    
    let ui = document.createElement('div');
    ui.className = 'ui-content';
    
    ui = addContent(screenId,screen,ui);
    screen.appendChild(ui);
    app.appendChild(screen);

    return screen;
}
/*
 *  enable a link once it is added.
 */
function enableLink(link) {
  link.addEventListener('click',function(e) {
     let id = changeScreen(e);        
  }); 
}
})(utils);

// call the function and pass in the ID of the container.
utils.init('app',app_menu);
