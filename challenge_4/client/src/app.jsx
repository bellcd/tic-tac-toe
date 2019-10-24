const React = require('react');
const ReactDOM = require('react-dom');
const Grid = require('./components/grid.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

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

  handleClick() {
    console.log('new click')
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