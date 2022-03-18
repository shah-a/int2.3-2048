class Tile {
  #tileElement
  #x
  #y
  #value

  constructor(tileContainer, value = Math.random() > 0.5 ? 2 : 4) {
    this.#tileElement = document.createElement('div');
    this.#tileElement.classList.add('tile');
    this.value = value;
    tileContainer.append(this.#tileElement);
  }

  get value() {
    return this.#value;
  }

  set value(v) {
    this.#value = v;
    this.#tileElement.textContent = this.#value;
  
    const power = Math.log2(v);
    const backgroundLightness = 100 - power * 8;
    const textLightness = backgroundLightness <= 50 ? 90 : 10;
  
    this.#tileElement.style.setProperty('--background-lightness', `${backgroundLightness}%`);
    this.#tileElement.style.setProperty('--text-lightness', `${textLightness}%`);
  }

  set x(value) {
    this.#x = value;
    this.#tileElement.style.setProperty('--x', this.#x);
  }

  set y(value) {
    this.#y = value;
    this.#tileElement.style.setProperty('--y', this.#y);
  }

  remove() {
    this.tileElement.remove();
  }
}

export default Tile;
