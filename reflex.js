import createBoard from './components/createBoard.js';
import showIndicator from './components/showIndicator.js';

const gameState = {
  boardSize: 5,
  gameTime: 60,
  health: 3,
  points: 0,
  gameStarted: false,
  gameLost: false,
  highlightTimeout: null,
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
  if (gameState.gameStarted) {
    gameState.gameTime--;
    showTime();
  }
};

const decrementHealth = () => {
  if (gameState.health > 0 && gameState.gameStarted) {
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

const clearIntervalAndTimeouts = () => {
  clearInterval(gameState.timerInterval);
  clearTimeout(gameState.highlightTimeout);
};

const checkHealth = () => {
  if (gameState.health === 0) {
    gameState.gameLost = true;
    clearIntervalAndTimeouts();
    clearTile();
    console.log(':(');
  }
};

const checkTime = () => {
  if (gameState.gameTime === 0) {
    gameState.gameLost = true;
    clearIntervalAndTimeouts();
    clearTile();
    console.log('Gratulacje! Twój wynik: ' + gameState.points);
  }
};

const startTimer = () => {
  gameState.timerInterval = setInterval(() => {
    checkTime();
    decrementTime();
  }, 1000);
};

startBtn.addEventListener('click', () => {
  if (!gameState.gameStarted && !gameState.gameLost) {
    startBtn.classList.add('disabled');
    resetBtn.classList.remove('disabled');
    gameState.gameStarted = true;
    startTimer();
    highlightTile();
  }
});

allTiles.forEach(tile => tile.addEventListener('click', (e) => {
    if (gameState.gameStarted && !gameState.gameLost) {
      if (e.target === gameState.activeTile) {
        incrementPoint();
      } else {
        decrementHealth();
      }

      checkHealth();
      clearTimeout(gameState.highlightTimeout);
      clearTile();
      highlightTile();
    }
  })
);

const highlightTile = () => {
  randomTile();
  if (gameState.gameStarted && !gameState.gameLost) {
    gameState.activeTile.style.backgroundColor = 'green';

    gameState.highlightTimeout = setTimeout(() => {
      clearTile();
      decrementHealth();
      checkHealth();

      setTimeout(() => {
        highlightTile();
      }, 1000);
    }, 2000);
  }
};

resetBtn.addEventListener('click',() => {
  if (gameState.gameStarted) {
    startBtn.classList.remove('disabled');
    resetBtn.classList.add('disabled');
    gameState.boardSize = 5;
    gameState.gameTime = 60;
    gameState.health = 3;
    gameState.points = 0;
    gameState.gameStarted = false;
    gameState.gameLost = false;
    clearIntervalAndTimeouts();
    clearTile();
    showHealth();
    showPoints();
    showTime();
  }
});