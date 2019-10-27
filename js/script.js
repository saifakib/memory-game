let allCards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 
'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 
'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube']

//Initial variables
let openCards = 0;
let desiredCard;
let numMoves = 0;
let matches = 0;
let modal = document.getElementById('myModal');
let closeModal = document.getElementsByClassName("close")[0];
let numGames = 0;
let runningTime;

//Given Shuffle Function
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

//Loads first deck here
let shuffledCards = shuffle(allCards);
let deck = document.querySelector('.deck');
for(var i = 0; i < allCards.length; i++){
    let chosenCard = shuffledCards[i];
    let newCard = '<li class="card"><i class="fa '+ chosenCard +'"></i></li>';
    deck.insertAdjacentHTML('beforeend', newCard);
}

//Timer functionality
let seconds = 0, minutes = 0, hours = 0;
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    document.querySelector('.time').textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + 
    ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + 
    ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}
function timer() {
    runningTime = setTimeout(add, 1000);
}

//click on card functionality
deck.addEventListener('click', respondToTheClick);

function toOpen(evt){
    evt.target.classList.add('open','show');
    openCards++;
}

function toClose(){
    document.querySelector('.open').classList.remove('open','show','wrong');
    document.querySelector('.open').classList.remove('open','show','wrong');
    openCards-=2;
}

function match(){
    document.querySelector('.open').classList.add('match');
    document.querySelector('.open').classList.remove('open', 'show');
    document.querySelector('.open').classList.add('match');
    document.querySelector('.open').classList.remove('open', 'show');
    openCards-=2;
}

function respondToTheClick(evt){
    if(evt.target.classList.contains('card')){
      //Only increase game count and start timer if first card is selected
      if(document.querySelector('.time').textContent === "00:00:00"){
        numGames++;
        document.querySelector('#numGames').innerText = numGames;
        //Start Time
        timer();
      }
      if(openCards === 1 && (evt.target.classList.contains('open')) === false){
          if(evt.target.querySelector('i').classList.value === desiredCard){
              toOpen(evt);
              setTimeout(function(){match()}, 1500);
              matches++;
              numMoves++;
              congrats();
              desiredCard;
          } else if(evt.target.querySelector('i').classList.value !== desiredCard){
              toOpen(evt);
              setTimeout(function(){toClose()}, 1500);
              numMoves++;
              desiredCard;
          }
        } else if(openCards < 2 && (evt.target.classList.contains('open')) === false){
          desiredCard = evt.target.querySelector('i').classList.value;
          toOpen(evt);
        }
    }
    document.querySelector('.moves').innerHTML = numMoves;
    if(numMoves > 20){
        document.querySelector('#star3').classList.remove('fa-star');
    } else if(numMoves > 10){
      document.querySelector('#star2').classList.remove('fa-star');
    }
  };

//Winning condition response
function congrats(){
    if(matches === 8){
        clearTimeout(runningTime);
        document.querySelector('#finishTime').innerText = document.querySelector('.time').textContent;
        if(document.querySelector('#bestTime').textContent === ""){
            document.querySelector('#bestTime').textContent = document.querySelector('.time').textContent;
        } else if(document.querySelector('.time').textContent < document.querySelector('#bestTime').textContent){
            document.querySelector('#bestTime').textContent = document.querySelector('.time').textContent;
            document.querySelector('#highScore').textContent = 'New High Score!';
        }
        document.querySelector('.moves').innerHTML = numMoves;
        document.getElementById('myModal').style.display = 'block';
    }
}

closeModal.onclick = function() {
    modal.style.display = "none";
  }

//Restart game setup
function newGame(){
    document.querySelector('.deck').innerHTML = '';
    let shuffledCards = shuffle(allCards);
    for(var i = 0; i < allCards.length; i++){
        let chosenCard = shuffledCards[i];
        let newCard = '<li class="card"><i class="fa '+ chosenCard +'"></i></li>';
        deck.insertAdjacentHTML('beforeend', newCard);
    }
    numMoves = 0;
    matches = 0;
    openCards = 0;
    desiredCard;
    document.querySelector('.moves').innerHTML = numMoves;
}

document.querySelector('.restart').onclick = function(){
    newGame();
    clearTimeout(runningTime);
    document.querySelector('.time').textContent = "00:00:00";
    seconds = 0; 
    minutes = 0; 
    hours = 0;
}