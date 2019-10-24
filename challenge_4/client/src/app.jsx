const React = require('react');
const ReactDOM = require('react-dom');
const Grid = require('./components/grid.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
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

  hasRowWin(grid) {
    const gridCopy = grid.slice(); // is this safe?? making a copy of the parent array with the same references to subarrys ...
    gridCopy.reverse();

    return gridCopy.some(row => {
      return this.isRowWin(row);
    });
  }

  isRowWin(row) {
    let isWin = [];

    for (let i = 0; i < row.length; i++) {
      if (isWin.length === 4) {
        return true;
      }

      let val = row[i];
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
    if (this.state.count === 42) {
      console.log(`It's a tie!`);
    } else if (this.hasRowWin(this.state.gridRep)) {
      console.log(`There's a row win`);
    }
  }


  componentDidUpdate() {
    this.checkForWin(this.state.gridRep);
  }

  render() {
    return (
      <Grid gridRep={this.state.gridRep} onClick={this.handleClick}></Grid>
    );
  }
}

ReactDOM.render(<App></App>, document.querySelector('#root'));

console.log('hello')
console.log('hello')