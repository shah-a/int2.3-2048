import Grid from './js/Grid.js';
import Tile from './js/Tile.js';
import * as t from './js/tileLogic.js';

const gameboard = document.querySelector('#gameboard');

const grid = new Grid(gameboard);

// Use this to test what a populated gameboard looks like:
// for (let i = 1; i <= 11; i++) {
//   grid.randomEmptyCell().tile = new Tile(gameboard, 2 ** i);
// }

grid.randomEmptyCell().tile = new Tile(gameboard);
grid.randomEmptyCell().tile = new Tile(gameboard);

gameboard.addEventListener('touchmove', (e) => e.preventDefault())
SwipeListener(gameboard);

setupInput();

// -------------------------
// Input Handlers
// -------------------------

function setupInput() {
  document.addEventListener('keydown', handleInput, { once: true });
  gameboard.addEventListener('swipe', handleInput, { once: true });
}

async function handleInput(e) {
  console.log(e.detail.directions);

  if (e.type === 'swipe') {
    if (e.detail.directions.top) e.key = 'ArrowUp';
    if (e.detail.directions.bottom) e.key = 'ArrowDown';
    if (e.detail.directions.right) e.key = 'ArrowRight';
    if (e.detail.directions.left) e.key = 'ArrowLeft';
  }

  switch (e.key) {
    case 'ArrowUp':
      if (!t.canMoveUp(grid)) {
        setupInput();
        return;
      }
      await t.moveUp(grid);
      break;
    case 'ArrowDown':
      if (!t.canMoveDown(grid)) {
        setupInput();
        return;
      }
      await t.moveDown(grid);
      break;
    case 'ArrowRight':
      if (!t.canMoveRight(grid)) {
        setupInput();
        return;
      }
      await t.moveRight(grid);
      break;
    case 'ArrowLeft':
      if (!t.canMoveLeft(grid)) {
        setupInput();
        return;
      }
      await t.moveLeft(grid);
      break;
    default:
      setupInput();
      return;
  }

  grid.cells.forEach((cell) => cell.mergeTiles());

  const newTile = new Tile(gameboard);
  grid.randomEmptyCell().tile = newTile;

  if (!t.canMoveUp(grid) && !t.canMoveDown(grid) && !t.canMoveRight(grid) && !t.canMoveLeft(grid)) {
    newTile.waitForTransition(true).then(() => {
      alert('Game Over!');
    });
    return;
  }

  setupInput();
}
