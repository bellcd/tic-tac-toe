const React = require('react');
const ReactDOM = require('react-dom');
const Grid = require('./components/grid.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
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
    debugger;
    console.log(e);

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