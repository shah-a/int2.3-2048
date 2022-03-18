class Cell {
  #cellElement
  #x
  #y
  #tile
  #mergeTile

  constructor(cellElement, x, y) {
    this.#cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get tile() {
    return this.#tile;
  }

  get mergeTile() {
    return this.#mergeTile;
  }

  set tile(value) {
    this.#tile = value;
    if (!value) return;
    this.#tile.x = this.#x;
    this.#tile.y = this.#y;
  }

  set mergeTile(value) {
    this.#mergeTile = value;
    if (!value) return;
    this.#mergeTile.x = this.#x;
    this.#mergeTile.y = this.#y;
  }

  canAccept(tile) {
    if (!this.tile) return true;
    const unmerged = this.mergeTile == null;
    const sameValue = this.tile.value === tile.value;
    if (unmerged && sameValue) return true;
    return false;
  }

  mergeTiles() {
    if (!this.tile || !this.mergeTile) return;
    this.tile.value += this.mergeTile.value;
    this.mergeTile.remove();
    this.mergeTile = null;
  }
}

export default Cell;
