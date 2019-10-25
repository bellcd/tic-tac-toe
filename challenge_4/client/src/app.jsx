const React = require('react');
const ReactDOM = require('react-dom');
const Grid = require('./components/grid.jsx');
const model = require('./model.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isTie: false,
      isRowWin: false,
      isColWin: false,
      isDiagonalWin: false,
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

  updateMessage(win, message) {
    this.setState({
      message: message,
      [win]: true
    });
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
    let win;

    if (this.state.count === 42) {
      message = `It's a tie!`;
      win = 'isTie';
    } else if (model.hasRowWin(this.state.gridRep)) {
      message = `There's a row win`;
      win = 'isRowWin';
    } else if (model.hasColWin(this.state.gridRep)) {
      message = `There's a column win`;
      win = 'isColWin'
    } else if (model.hasDiagonalWin(this.state.gridRep)) {
      message = `There's a diagonal win`;
      win = 'isDiagonalWin'
    }

    if (message) {
      this.updateMessage(win, message);
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