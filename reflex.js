import createBoard from './components/createBoard.js';

const gameState = {
  boardSize: 5,
  gameTime: 60,
  health: 3,
  points: 0,
};

createBoard('board', gameState.boardSize);

const allTiles = document.querySelectorAll('.tile');
const healthIndicator = document.querySelector('#health');
const pointsIndicator = document.querySelector('#points');
const timeIndicator = document.querySelector('#time');

const showIndicator = (indicatorId, indicatorName, indicatorValue) => indicatorId.textContent = indicatorName + ': ' + indicatorValue;

showIndicator(healthIndicator, 'Życie', gameState.health);
showIndicator(pointsIndicator, 'Punkty', gameState.points);
showIndicator(timeIndicator, 'Pozostały czas', gameState.gameTime);

const randomTile = allTiles[Math.floor(Math.random() * Math.pow(gameState.boardSize, 2))];

randomTile.style.backgroundColor = 'green';

allTiles.forEach(tile => tile.addEventListener('click', (e) => {
  console.log(e.target === randomTile)
  })
);


