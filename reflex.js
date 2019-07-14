import createBoard from './components/createBoard.js';
import showIndicator from './components/showIndicator.js';

const gameState = {
  boardSize: 5,
  gameTime: 60,
  health: 3,
  points: 0,
  started: false,
  highlightTimeout: null,
  breakTimeout:null,
  timerInterval: null,
  activeTile: null,
};

createBoard('board', gameState.boardSize);

const allTiles = document.querySelectorAll('.tile');
const startBtn = document.querySelector('#start-btn');
const resetBtn = document.querySelector('#reset-btn');
const showHealth = () => showIndicator('#health', 'Życie', gameState.health);
const showPoints = () => showIndicator('#points', 'Punkty', gameState.points);
const showTime = () => showIndicator('#time', 'Pozostały czas', gameState.gameTime);
const randomTile = () => gameState.activeTile = allTiles[Math.floor(Math.random() * Math.pow(gameState.boardSize, 2))];

showHealth();
showPoints();
showTime();

const decrementTime = () => {
  if (gameState.started) {
    gameState.gameTime--;
    showTime();
  }
};

const decrementHealth = () => {
  if (gameState.health > 0 && gameState.started) {
    gameState.health--;
    showHealth();
  }
};

const incrementPoint = () => {
  gameState.points++;
  showPoints();
};

const clearTile = () => {
  allTiles.forEach((tile) => tile.style.backgroundColor = '');
  gameState.activeTile = null;
};

const startTimer = () => {
  gameState.timerInterval = setInterval(() => {
    if (gameState.gameTime === 0) {
      clearInterval(gameState.timerInterval);
      clearTile();
      console.log('Gratulacje! Twój wynik: ' + gameState.points);
    }

    if (gameState.health === 0 || gameState.gameTime === 0) {
      gameState.started = false;
      clearInterval(gameState.timerInterval);
      clearTile();
      console.log(':(');
    }

    decrementTime()
  }, 1000);
};

startBtn.addEventListener('click', () => {
  if (!gameState.started) {
    gameState.started = true;
    startTimer();
    highlightTile();
  }
});

allTiles.forEach(tile => tile.addEventListener('click', (e) => {

  if (e.target === gameState.activeTile && gameState.started) {
    incrementPoint();
  } else {
    decrementHealth();
  }

  clearTimeout(gameState.highlightTimeout);
  clearTile();
  highlightTile();
  })
);

const highlightTile = () => {
  randomTile();

  if (gameState.started) {
    gameState.activeTile.style.backgroundColor = 'green';

    gameState.highlightTimeout = setTimeout(() => {
      clearTile();
      decrementHealth();

      setTimeout(() => {
        highlightTile();
      }, 1000);
    }, 2000);
  }
};

resetBtn.addEventListener('click',() => {
  gameState.boardSize = 5;
  gameState.gameTime = 60;
  gameState.health = 3;
  gameState.points = 0;
  gameState.started = false;
  clearTimeout(gameState.highlightTimeout);
  clearTimeout(gameState.breakTimeout);
  clearTile();
  showHealth();
  showPoints();
  showTime();
});