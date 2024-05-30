document.addEventListener('DOMContentLoaded', initializeGrid);
document.addEventListener('mousemove', rotateImage);
const changeUrlButton = document.querySelector('#change-target');
changeUrlButton.addEventListener('click', changeTargetClick);
const scoreElement = document.getElementById('score');
const startGameButton = document.getElementById('#start-game-button');


const easyPoints = 10;
const hardPoints = 20;


let score = 0;
const image = document.getElementById('image');

function rotateImage(event) {
  const centerX = window.innerWidth / 2;
  const angle = Math.atan2(event.clientY - window.innerHeight, event.clientX - centerX);
  const angleDeg = angle * (180 / Math.PI);
  image.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg)`;
}

const gridContainer = document.getElementById('gridContainer');
let imageURLs = [
  '/assets/game-zombie.png', 
  '/assets/game-zombie.png', 
  '/assets/game-zombie.png', 
  '/assets/game-zombie.png', 
  '/assets/game-zombie.png'
];

function createGrid(container) {
  for (let i = 0; i < 36; i++) {
    const row = Math.floor(i / 9) + 1;
    const col = (i % 9) + 1;
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.style.gridRow = `${row} / span 1`;
    gridItem.style.gridColumn = `${col} / span 1`;
    container.appendChild(gridItem);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function placeImagesInGrid(container, urls) {
  urls.forEach(url => {
    let randomPosition;
    do {
      randomPosition = Math.floor(Math.random() * 36);
    } while (container.children[randomPosition].querySelector('img'));
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Random Image';
    container.children[randomPosition].appendChild(img);
  });
}

function initializeGrid() {
  const shuffledURLs = shuffleArray(imageURLs);
  createGrid(gridContainer);
  placeImagesInGrid(gridContainer, shuffledURLs);
  gridContainer.addEventListener('click', handleImageClick);
}

function handleImageClick(event) {
  const clickedImg = event.target.closest('img');
  if (clickedImg) {
    const gridContainer = document.getElementById('gridContainer');
    let randomPosition;
    scorecounter();
    do {
      randomPosition = Math.floor(Math.random() * 36);
    } while (gridContainer.children[randomPosition].querySelector('img'));
    const newGridItem = gridContainer.children[randomPosition];
    newGridItem.appendChild(clickedImg);
  }
}

//verander de images naar target en van target terug naar zombies
const targetPng = '/assets/target.png';
const zombiePng = '/assets/game-zombie.png';
// const shotEffect = '/assets/shot-effect.png';


let imgChangeButton = document.getElementById('change-target');

function changeTargetClick() {
  const images = gridContainer.querySelectorAll('img');

  images.forEach(img => {
    if (img.src.includes(zombiePng)) {
      img.src = targetPng;
    } 
    else {
      img.src = zombiePng;
    }
  });
}
// function shootEffect() {
  

// }	

function scorecounter(){
  score += easyPoints;
  document.getElementById("score").textContent = "score: " + score;
  console.log(score);
  let highScore = localStorage.getItem("highScore")
  if( score > highScore){

  localStorage.setItem("highScore", score);

  }
  document.getElementById("high-score").textContent = "high score: " + highScore;


}


function startGame() {
  let deleteOverlay = document.getElementById("start-overlay");
  deleteOverlay.remove();
  let startGameButton = document.getElementById("start-game-button");
  startGameButton.remove();

  document.getElementById("health-bar").style.animationPlayState = "running";

  setTimeout(function() {
    const overlay = document.createElement('div');
    overlay.id = 'timer-overlay';
    overlay.textContent = 'You are out of time';

    const reloadButton = document.createElement('button');
    reloadButton.textContent = 'Restart game';
    reloadButton.onclick = function() {
      location.reload();
    };

    overlay.appendChild(reloadButton);
    document.body.appendChild(overlay);
  }, 20000);
}

document.getElementById('start-game-button').onclick = startGame;