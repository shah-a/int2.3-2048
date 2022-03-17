class Cell {
  #cellElement
  #x
  #y
  #tile

  constructor(cellElement, x, y) {
    this.#cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }

  get tile() {
    return this.#tile;
  }
}

export default Cell;
