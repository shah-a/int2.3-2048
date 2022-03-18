import Grid from './js/Grid.js';
import Tile from './js/Tile.js';

const gameboard = document.querySelector('#gameboard');
const grid = new Grid(gameboard);

// Use this to test what a populated gameboard looks like:
// for (let i = 1; i <= 11; i++) {
//   grid.randomEmptyCell().tile = new Tile(gameboard, 2 ** i);
// }

grid.randomEmptyCell().tile = new Tile(gameboard);
grid.randomEmptyCell().tile = new Tile(gameboard);

function setupInput() {
  window.addEventListener('keydown', handleInput, { once: true });
}

function handleInput(e) {
  switch (e.key) {
    case 'ArrowUp':
      moveUp();
      break;
    case 'ArrowDown':
      moveDown();
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'ArrowRight':
      moveRight();
      break;
    default:
      break;
  }
}
