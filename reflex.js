import createBoard from './components/createBoard.js';
import showIndicator from './components/showIndicator.js';
import {
  allTiles,
  startBtn,
  resetBtn,
  highlightActiveTile,
  clearTile,
  lostLifeInfo,
  lostGameInfo,
  finishGameInfo,
  toggleDisableButton,
  hideModal
} from './components/domModificators.js';

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

const showHealth = () => showIndicator('#health', 'Życie: ', gameState.health);
const showPoints = () => showIndicator('#points', 'Punkty: ', gameState.points);
const showTime = () => showIndicator('#time', 'Pozostały czas: ', gameState.gameTime);
const randomTile = () => gameState.activeTile = allTiles()[Math.floor(Math.random() * Math.pow(gameState.boardSize, 2))];

showHealth();
showPoints();
showTime();

const decrementTime = () => {
  if (gameState.gameTime > 0 && gameState.gameStarted) {
    gameState.gameTime--;
    showTime();
  }
};

const decrementHealth = () => {
  if (gameState.health > 0 && gameState.gameStarted) {
    gameState.health--;
    showHealth();
    lostLifeInfo();
  }
};

const incrementPoint = () => {
  gameState.points++;
  showPoints();
};

const clearIntervalAndTimeouts = () => {
  clearInterval(gameState.timerInterval);
  clearTimeout(gameState.highlightTimeout);
};

const checkHealth = () => {
  if (gameState.health === 0) {
    gameState.gameLost = true;
    clearIntervalAndTimeouts();
    clearTile(gameState.activeTile);
    lostGameInfo(gameState.points);
  }
};

const checkTime = () => {
  if (gameState.gameTime === 0) {
    gameState.gameLost = true;
    clearIntervalAndTimeouts();
    clearTile(gameState.activeTile);
    finishGameInfo(gameState.points);
  }
};

const startTimer = () => {
  gameState.timerInterval = setInterval(() => {
    checkTime();
    decrementTime();
  }, 1000);
};

const resetGameState = () => {
  gameState.boardSize = 5;
  gameState.gameTime = 60;
  gameState.health = 3;
  gameState.points = 0;
  gameState.gameStarted = false;
  gameState.gameLost = false;
};

startBtn.addEventListener('click', () => {
  if (!gameState.gameStarted && !gameState.gameLost) {
    gameState.gameStarted = true;
    toggleDisableButton();
    startTimer();
    highlightRandomTile();
  }
});

allTiles().forEach(tile => tile.addEventListener('click', (e) => {
    if (gameState.gameStarted && !gameState.gameLost) {
      if (e.target === gameState.activeTile) {
        incrementPoint();
      } else {
        decrementHealth();
      }

      checkHealth();
      clearTimeout(gameState.highlightTimeout);
      clearTile(gameState.activeTile);
      highlightRandomTile();
    }
  })
);

const highlightRandomTile = () => {
  randomTile();

  if (gameState.gameStarted && !gameState.gameLost) {
    highlightActiveTile(gameState.activeTile);

    gameState.highlightTimeout = setTimeout(() => {
      clearTile(gameState.activeTile);
      decrementHealth();
      checkHealth();

      setTimeout(() => {
        highlightRandomTile();
      }, 1000);
    }, 2000);
  }
};

resetBtn.addEventListener('click',() => {
  if (gameState.gameStarted) {
    toggleDisableButton();
    hideModal();
    resetGameState();
    clearIntervalAndTimeouts();
    clearTile(gameState.activeTile);
    showHealth();
    showPoints();
    showTime();
  }
});