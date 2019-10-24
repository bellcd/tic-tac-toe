const React = require('react');
const ReactDOM = require('react-dom');
const Grid = require('./components/grid.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      message: '',
      count: 0, // TODO: better way to keep track of count??
      // each subarray is a row
      // 0 is red, 1 is yellow
      gridRep: [ // there's probably a better way to set every as null to begin with ...
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ],
      gridRepTemplate: [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ]
    }
  }

  updateMessage(message) {
    this.setState({
      message: message
    });
  }

  hasRowWin(grid) {
    const gridCopy = grid.slice(); // safe?? only a shallow copy ...
    gridCopy.reverse();

    return gridCopy.some(row => {
      return this.isLineWin(row);
    });
  }

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
  }

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
  }

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

  handleClick(e, x, y) {
    // TODO: probably better to check the gridRep to see if that spot is empty, rather than in the event ...
    if (e.target.childNodes.length === 0) {
      this.setDisc(x, y);
    } else {
      // there's already a disc in this spot, so ignore the click
    }
  }

  // TODO: there's probably a better way to do this ...
  makeDiscFall(x, y, state) {
    // check the relevant x index of all the other rows (y's)
    const col = state.gridRep.map(row => {
      return row[x];
    })
    // get the highest index disc that has a value of null (0,0 is at the TOP LEFT of the grid)
    // loop through the col backwards (ie, from the bottom of the grid up)
    for (let i = col.length - 1; i > -1; i--) {
      if (col[i] === null) {
        // return the index of the first null value
        return i;
      }
    }
  }

  setDisc(x, y) {
    this.setState((state, props) => {
      // determine whose turn it is
      let disc = state.count % 2 === 0 ? 0 : 1;

      // apply makeDiscFall, and reassign y
      y = this.makeDiscFall(x, y, state);

      // update the grid
      state.gridRep[y][x] = disc;

      return {
        gridRep: state.gridRep,
        count: ++state.count
      }
    });
  }

  // TODO: check for opposite conditions? how many nulls are in each line??
  checkForWin() {
    let message;
    if (this.state.count === 42) {
      message = `It's a tie!`;
    } else if (this.hasRowWin(this.state.gridRep)) {
      message = `There's a row win`;
    } else if (this.hasColWin(this.state.gridRep)) {
      message = `There's a column win`;
    } else if (this.hasDiagonalWin(this.state.gridRep)) {
      message = `There's a diagonal win`;
    }

    if (message) {
      this.updateMessage(message);
    }
  }

  componentDidUpdate() {
    if (this.state.message === '') {
      this.checkForWin(this.state.gridRep);
    }
  }

  render() {
    return (
      <>
        <Grid gridRep={this.state.gridRep} onClick={this.handleClick}></Grid>
        <div>{this.state.message}</div>
      </>
    );
  }
}

ReactDOM.render(<App></App>, document.querySelector('#root'));

console.log('hello')
console.log('hello')