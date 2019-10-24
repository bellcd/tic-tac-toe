const React = require('react');
const ReactDOM = require('react-dom');
const Grid = require('./grid.js');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // each subarray is a column
      // 0 is red, 1 is yellow
      gridRep: [
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1]
      ]
    }
  }

  render() {
    return (
      <Grid gridRep={this.state.gridRep}></Grid>
    );
  }
}

ReactDOM.render(<App></App>, document.querySelector('#root'));

