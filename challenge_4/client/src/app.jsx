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

  handleClick(e, x, y) {
    this.setDisc(x, y);
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

  // TODO: need to check if count is at max

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

  render() {
    return (
      <Grid gridRep={this.state.gridRep} onClick={this.handleClick}></Grid>
    );
  }
}

ReactDOM.render(<App></App>, document.querySelector('#root'));

console.log('hello')
console.log('hello')