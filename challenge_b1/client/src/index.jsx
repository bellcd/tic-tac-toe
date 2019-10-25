class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boardRep: [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null]
      ]
    }
  }

  render() {
    return (
      <Board boardRep={this.state.boardRep}></Board>
    );
  }
}

const Square = ({ x, y, piece}) => {
  return (
    <div class="square-background">
      {`${x},${y}`}
      <div class="square-content">{piece}</div>
    </div>
  );
}

const Board = ({ boardRep }) => {
  const flatArr = boardRep.reduce((acc, row, i) => {
    return acc.concat(row.map((piece, j) => <Square key={`${i},${j}`} y={i} x={j} piece={piece}></Square>));
  }, []);

  return (
    <div id="board">
      {flatArr}
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));