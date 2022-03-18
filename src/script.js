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

setupInput();

// -------------------------
// Input Handlers
// -------------------------

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
    case 'ArrowRight':
      moveRight();
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
    default:
      return;
  }

  grid.cells.forEach((cell) => cell.mergeTiles());

  setupInput();
}

function moveUp() {
  slideTiles(grid.cellsByColumn)
}

function moveDown() {
  slideTiles(grid.cellsByColumn.map((column) => [...column].reverse()));
}

function moveRight() {
  slideTiles(grid.cellsByRow.map((row) => [...row].reverse()));
}

function moveLeft() {
  slideTiles(grid.cellsByRow)
}

function slideTiles(cells) {
  cells.forEach((group) => {
    for (let i = 1; i < group.length; i++) {
      const cell = group[i];
      if (!cell.tile) continue;

      let lastValidCell;
      for (let j = i - 1; j >= 0; j--) {
        const moveToCell = group[j]
        if (!moveToCell.canAccept(cell.tile)) break;
        lastValidCell = moveToCell;
      }

      if (lastValidCell) {
        if (lastValidCell.tile) {
          lastValidCell.mergeTile = cell.tile;
        } else {
          lastValidCell.tile = cell.tile;
        }
        cell.tile = null;
      }
    }
  });
}
