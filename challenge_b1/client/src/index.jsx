class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      // 0s are white
      // 1s are red

      turn: 1,
      zeroScore: 0,
      oneScore: 0,
      boardRep: [
        [null,   0 , null,   0 , null,   0 , null,   0 ],
        [  0 , null,   0 , null,   0 , null,   0 , null],
        [null,   0 , null,   0 , null,   0 , null,   0 ],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [  1 , null,   1 , null,   1 , null,   1 , null],
        [null,   1 , null,   1 , null,   1 , null,   1 ],
        [  1 , null,   1 , null,   1 , null,   1 , null],
      ],
      boardRepTempate: [
        [null,   0 , null,   0 , null,   0 , null,   0 ],
        [  0 , null,   0 , null,   0 , null,   0 , null],
        [null,   0 , null,   0 , null,   0 , null,   0 ],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [  1 , null,   1 , null,   1 , null,   1 , null],
        [null,   1 , null,   1 , null,   1 , null,   1 ],
        [  1 , null,   1 , null,   1 , null,   1 , null],
      ]
    }
  }

  handleClick(e, x, y) {
    console.log(`you clicked on square ${x},${y}`);
  }

  isGameOver() {

  }

  render() {
    return (
      <Board boardRep={this.state.boardRep} onClick={this.handleClick}></Board>
    );
  }
}

const Board = ({ boardRep, onClick }) => {
  let count = -1;
  let color;

  const flatArr = boardRep.reduce((acc, row, i) => {
    ++count;
    return acc.concat(row.map((piece, j) => {
      color = (count % 2 === 0) ? `light-square` : `dark-square`;
      ++count;
      return <Square key={`${i},${j}`} y={i} x={j} piece={piece} color={color} onClick={onClick}></Square>;
    }));
  }, []);

  return (
    <div id="board">
      {flatArr}
    </div>
  );
}

const Square = ({ x, y, piece, color, onClick }) => {
  return (
    <div className={`square-background ${color}`} onClick={(e) => onClick(e, x, y)}>
      {/* {`${x},${y}`} */}
      <div className="square-content">{piece}</div>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));