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

export function moveUp(grid) {
  return slideTiles(grid.cellsByColumn)
}

export function moveDown(grid) {
  return slideTiles(grid.cellsByColumn.map((column) => [...column].reverse()));
}

export function moveRight(grid) {
  return slideTiles(grid.cellsByRow.map((row) => [...row].reverse()));
}

export function moveLeft(grid) {
  return slideTiles(grid.cellsByRow)
}

export function canMoveUp(grid) {
  return canMove(grid.cellsByColumn)
}

export function canMoveDown(grid) {
  return canMove(grid.cellsByColumn.map((column) => [...column].reverse()));
}

export function canMoveRight(grid) {
  return canMove(grid.cellsByRow.map((row) => [...row].reverse()));
}

export function canMoveLeft(grid) {
  return canMove(grid.cellsByRow)
}
