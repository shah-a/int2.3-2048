import Grid from './js/Grid.js';

const gameboard = document.querySelector('#gameboard');
const grid = new Grid(gameboard);

grid.randomEmptyCell().tile = new Tile(gameboard);
