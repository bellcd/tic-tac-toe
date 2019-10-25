module.exports = {
  hasRowWin(grid) {
    const gridCopy = grid.slice(); // safe?? only a shallow copy ...
    gridCopy.reverse();

    return gridCopy.some(row => {
      return this.isLineWin(row);
    });
  },

  hasColWin(grid) {
    const gridCopy = grid.slice(); // safe? only a shallow copy ...

    let col = [];
    for (let j = 0; j < 7; j++) {
      col = [];
      for (let i = 0; i < 6; i++) {
        col.push(gridCopy[i][j]);
      }

      if (this.isLineWin(col)) {
        return true;
      }
    }

    return false;
  },

  hasDiagonalWin(grid) {
    // rows are index i
    // cols are index j

    // need diagonal lines
      // top left, going down right
      // bottom left, going up right

    let diagonalLine = [];
    let shouldContinue = true;
    let x = 0;
    let y = 0;

    // bottom left to top right diagonal checks
    // TODO: there's definitely a better way to handle this than repeating all of this code mostly verbatim ...
    // loop backwards through the rows
    for (let i = grid.length - 1; i > -1; i--) {
      // loop through the cols
      for (let j = 0; j < grid[i].length; j++) {
        // set x & y position to current j & i, respectively
        x = j;
        y = i;
        shouldContinue = true;

        while (shouldContinue) {
          // if x & y are both within the board size
          if (x < 7 && x > -1 && y < 6 && y > -1) {
            // push the disc at that position to diagonalLine
            diagonalLine.push(grid[y][x]);

            // increment x & decrement y
            ++x;
            --y;
          } else {
            // else, shouldContinue = false
            shouldContinue = false;

            // check if this diagonal has a win
            if (this.isLineWin(diagonalLine)) {
              return true;
            } else {
              diagonalLine = []
            }
          }
        }
      }
    }

    // top left to bottom right diagonals
    // loop through the rows
    for (let i = 0; i < grid.length; i++) {
      // loop through the cols
      for (let j = 0; j < grid[i].length; j++) {
        // set x & y position to current j & i, respectively
        x = j;
        y = i;
        shouldContinue = true;

        while (shouldContinue) {
          // if x & y are both within the board size
          if (x < 7 && x > -1 && y < 6 && y > -1) {
            // push the disc at that position to diagonalLine
            diagonalLine.push(grid[y][x]);

            // increment x & y
            ++x;
            ++y;
          } else {
            // else, shouldContinue = false
            shouldContinue = false;

            // check if this diagonal has a win
            if (this.isLineWin(diagonalLine)) {
              return true;
            } else {
              diagonalLine = []
            }
          }
        }
      }
    }

    return false;
  },

  isLineWin(line) {
    // TODO: performance optimization ??
      // return false is line.length < 4

    let isWin = [];

    for (let i = 0; i < line.length; i++) {
      if (isWin.length === 4) {
        return true;
      }

      let val = line[i];
      let winning = isWin[0];

      if (val !== null && val === winning) {
        isWin.push(val);
      } else if (val !== null) {
        isWin = [val];
      } else {
        isWin = [];
        // that spot has null in it, so a winning streak needs to start from the next spot (if any)
      }
    }

    if (isWin.length === 4) {
      return true;
    } else {
      return false;
    }
  }
}