import Cell from './Cell.js';

const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

class Grid {
  #cells

  constructor(gridElement) {
    gridElement.style.setProperty('--grid-size', GRID_SIZE);
    gridElement.style.setProperty('--cell-size', `${CELL_SIZE}vmin`);
    gridElement.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);
    this.#cells = this.#generateCells(gridElement).map((cellElement, index) => {
      const x = index % GRID_SIZE;
      const y = Math.floor(index / GRID_SIZE);
      return new Cell(cellElement, x, y);
    });
  }

  get #emptyCells() {
    return this.#cells.filter((cell) => cell.tile === undefined);
  }

  get cellsByColumn() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      cellGrid[cell.x][cell.y] = cell;
      return cellGrid;
    }, []);
  }

  get cellsByRow() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || [];
      cellGrid[cell.y][cell.x] = cell;
      return cellGrid;
    }, []);
  }

  #generateCells(gridElement) {
    const cells = [];
    for (let i = 0; i < GRID_SIZE ** 2; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cells.push(cell);
      gridElement.append(cell);
    }
    return cells;
  }

  randomEmptyCell() {
    const randomIndex = Math.floor(Math.random() * this.#emptyCells.length)
    return this.#emptyCells[randomIndex];
  }
}

export default Grid;
