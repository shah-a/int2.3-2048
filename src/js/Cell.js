class Cell {
  #cellElement
  #x
  #y

  constructor(cellElement, x, y) {
    this.#cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }
}

export default Cell;
