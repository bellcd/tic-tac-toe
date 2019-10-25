class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      // 0s are white
      // 1s are red

      turn: 1,
      currentTurn: 0,
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

  // WRONG APPROACH ??
  // maintain an emptySquares object, with the x,y coordinates of every playable square that is empty
    // on every turn, check each square in emptySquare
      // if the immediate diagonal squares (above for 0's turn / below for 1's turn) have a piece
        // this square is movable to from one / both diagonals
          // __________
      // else, the current player can't move to this square this turn





  // maintain two piecesCanMove objects, one for each player, with the x,y coordinates of every piece for that player
    // on every turn, check each piece in piecesCanMove
      // for each immediate diagonal (above for 0's turn / below for 1's turn)
        // if this diagonal is empty
          // this square can be moved to
          // update piecesCanMove object to reflect that
        // else if this diagonal contains an enemy piece
          // get the coordinates for the square this enemy piece is on
          // repeat the diagonal checking process from this square // recursion ???
        // else if this diagonal contains a friendly piece
          // can't move here


  handleClick(e, x, y) {
    this.setState((state, props) => {
      return {
        turn: ++state.turn,
        currentTurn: state.currentTurn === 0 ? 1 : 0
      }
    });
    console.log(`you clicked on square ${x},${y}`);
  }

  isGameOver() {

  }

  render() {
    return (
      <>
        <Board boardRep={this.state.boardRep} onClick={this.handleClick}></Board>
        <div>Turn: {this.state.turn}</div>
        <div>Player {this.state.currentTurn} goes this turn</div>
      </>
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
  let pieceColor = piece === 0 ? 'black-piece': 'red-piece';

  return (
    <div className={`square-background ${color}`} onClick={(e) => onClick(e, x, y)}>
      {`${x},${y}`}
      <div className="square-content"><span className={pieceColor}>{piece}</span></div>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));