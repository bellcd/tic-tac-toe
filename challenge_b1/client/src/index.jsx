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

const Square = ({ x, y, piece, color }) => {
  return (
    <div className={`square-background ${color}`}>
      {`${x},${y}`}
      <div className="square-content">{piece}</div>
    </div>
  );
}

const Board = ({ boardRep }) => {
  let count = -1;
  let color;

  const flatArr = boardRep.reduce((acc, row, i) => {
    ++count;
    return acc.concat(row.map((piece, j) => {
      color = (count % 2 === 0) ? `light-square` : `dark-square`;
      ++count;
      return <Square key={`${i},${j}`} y={i} x={j} piece={piece} color={color}></Square>;
    }));
  }, []);

  return (
    <div id="board">
      {flatArr}
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));