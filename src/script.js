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

async function handleInput(e) {
  switch (e.key) {
    case 'ArrowUp':
      if (!canMoveUp()) {
        setupInput();
        return;
      }
      await moveUp();
      break;
    case 'ArrowDown':
      if (!canMoveDown()) {
        setupInput();
        return;
      }
      await moveDown();
      break;
    case 'ArrowRight':
      if (!canMoveRight()) {
        setupInput();
        return;
      }
      await moveRight();
      break;
    case 'ArrowLeft':
      if (!canMoveLeft()) {
        setupInput();
        return;
      }
      await moveLeft();
      break;
    default:
      setupInput();
      return;
  }

  grid.cells.forEach((cell) => cell.mergeTiles());

  const newTile = new Tile(gameboard);
  console.log(grid.randomEmptyCell().tile)
  grid.randomEmptyCell().tile = newTile;

  if (!canMoveUp() && !canMoveDown() && !canMoveRight() && !canMoveLeft()) {
    newTile.waitForTransition(true).then(() => {
      alert('Game Over!');
    });
    return;
  }

  setupInput();
}

function moveUp() {
  return slideTiles(grid.cellsByColumn)
}

function moveDown() {
  return slideTiles(grid.cellsByColumn.map((column) => [...column].reverse()));
}

function moveRight() {
  return slideTiles(grid.cellsByRow.map((row) => [...row].reverse()));
}

function moveLeft() {
  return slideTiles(grid.cellsByRow)
}

function canMoveUp() {
  return canMove(grid.cellsByColumn)
}

function canMoveDown() {
  return canMove(grid.cellsByColumn.map((column) => [...column].reverse()));
}

function canMoveRight() {
  return canMove(grid.cellsByRow.map((row) => [...row].reverse()));
}

function canMoveLeft() {
  return canMove(grid.cellsByRow)
}


function slideTiles(cells) {
  return Promise.all(
    cells.flatMap((group) => {
      const promises = [];
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
          promises.push(cell.tile.waitForTransition())
          if (lastValidCell.tile) {
            lastValidCell.mergeTile = cell.tile;
          } else {
            lastValidCell.tile = cell.tile;
          }
          cell.tile = null;
        }
      }
      return promises;
    })
  );
}

function canMove(cells) {
  return cells.some((group) => {
    return group.some((cell, index) => {
      if (index === 0 || !cell.tile) return false;
      const moveToCell = group[index - 1];
      return moveToCell.canAccept(cell.tile);
    });
  });
}
