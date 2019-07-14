import createBoard from './components/createBoard.js';
import showIndicator from './components/showIndicator.js';

const gameState = {
  boardSize: 5,
  gameTime: 10,
  health: 3,
  points: 0,
  started: false,
  highlightTimeout: null,
  breakTimeout:null,
  timerInterval: null,
};

createBoard('board', gameState.boardSize);

const allTiles = document.querySelectorAll('.tile');
const startBtn = document.querySelector('#start-btn');
const resetBtn = document.querySelector('#reset-btn');

let activeTile = null;

const randomTile = () => activeTile = allTiles[Math.floor(Math.random() * Math.pow(gameState.boardSize, 2))];
const showHealth = () => showIndicator('#health', 'Życie', gameState.health);
const showPoints = () => showIndicator('#points', 'Punkty', gameState.points);
const showTime = () => showIndicator('#time', 'Pozostały czas', gameState.gameTime);

showHealth();
showPoints();
showTime();

const decrementTime = () => {
  gameState.gameTime--;
  showTime();
};

const decrementHealth = () => {
  gameState.health--;
  showHealth();
};

const incrementPoint = () => {
  gameState.points++;
  showPoints();
};

const clearTile = () => {
  allTiles.forEach((tile) => tile.style.backgroundColor = '')
};

const startTimer = () => {
  gameState.timerInterval = setInterval(() => {
    if (gameState.gameTime === 0) {
      alert('Gratulacje! Twój wynik: ' + gameState.points);
    }

    if (gameState.health === 0 || gameState.gameTime === 0) {
      gameState.started = false;
      clearInterval(gameState.timerInterval);
    } else if (gameState.started) {
      decrementTime()
    }
  }, 1000);
};

startBtn.addEventListener('click', () => {
  if (!gameState.started) {
    gameState.started = true;
    startTimer();
    gameRun();
  }
});

resetBtn.addEventListener('click',() => {
  gameState.boardSize = 5;
  gameState.gameTime = 60;
  gameState.health = 3;
  gameState.points = 0;
  gameState.started = false;
  clearTimeout(gameState.highlightTimeout);
  clearTimeout(gameState.breakTimeout);
  clearTile();
  activeTile = null;
  showHealth();
  showPoints();
  showTime();
});

allTiles.forEach(tile => tile.addEventListener('click', (e) => {
    if (gameState.started) {
      if (e.target === activeTile) {
        incrementPoint();
        clearTimeout(gameState.highlightTimeout);
        clearTimeout(gameState.breakTimeout);
        clearTile();
        gameRun();
      } else if (gameState.health > 0) {
        decrementHealth()
      }

      if (gameState.health === 0) {
        clearTile();
        console.log(':(')
      }
    }
  })
);

const gameRun = () => {
  randomTile();

  if (gameState.started) {
    activeTile.style.backgroundColor = 'green';

    gameState.highlightTimeout = setTimeout(() => {
      clearTile();
      activeTile = null;
      decrementHealth();

      gameState.breakTimeout = setTimeout(() => {
        gameRun();
      }, 1000);
    }, 2000);
  }
};