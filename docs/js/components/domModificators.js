import showIndicator from "./showIndicator.js";

const allTiles = () => document.querySelectorAll('.tile');
const startBtn = document.querySelector('#start-btn');
const resetBtn = document.querySelector('#reset-btn');
const modal = document.querySelector('#modal');
const lostLifeAlert = document.querySelector('#lost-life');

const highlightActiveTile = (activeTile) => {
  activeTile.style.backgroundColor = 'green';
};

const clearTile = (activeTile) => {
  allTiles().forEach((tile) => tile.style.backgroundColor = '');
  activeTile = null;
};

const lostLifeInfo = () => {
  lostLifeAlert.style.visibility = 'visible';
  setTimeout(() => lostLifeAlert.style.visibility = 'hidden', 1000)
};

const lostGameInfo = points => {
  showIndicator('#modal', "Niestety straciłeś wszystkie życia! Zdobyte punkty: ", points);
  modal.style.visibility = 'visible';
};

const finishGameInfo = points => {
  showIndicator('#modal', 'Gratulacje, wygałeś! Zdobyte punkty: ', points);
  modal.style.visibility = 'visible';
};

const toggleDisableButton = () => {
  if (startBtn.classList.contains('disabled')) {
    startBtn.classList.remove('disabled');
    resetBtn.classList.add('disabled');
  } else {
    startBtn.classList.add('disabled');
    resetBtn.classList.remove('disabled');
  }
};

const hideModal = () => modal.style.visibility = 'hidden';

export { allTiles, startBtn, resetBtn, modal, lostLifeInfo, highlightActiveTile, clearTile, lostGameInfo, finishGameInfo, toggleDisableButton, hideModal }