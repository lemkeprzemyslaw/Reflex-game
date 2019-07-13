import createBoard from './components/createBoard.js';

const gameState = {
  boardSize: 5,
  gameTime: 60000,
  health: 3,
  points: 0,
};

createBoard('board', gameState.boardSize);

const allTiles = document.querySelectorAll('.tile');


const randomTile = allTiles[Math.floor(Math.random() * Math.pow(gameState.boardSize, 2))];

randomTile.style.backgroundColor = 'green';

allTiles.forEach(tile => tile.addEventListener('click', (e) => {
  console.log(e.target === randomTile)
  })
);


