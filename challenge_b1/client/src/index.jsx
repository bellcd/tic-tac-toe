class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      turn: 1,
      currentTurn: 'black',
      blackScore: 0,
      redScore: 0,
      boardRep: [
        [ null ,'black',  null ,'black',  null ,'black',  null ,'black'],
        ['black', null ,'black',  null ,'black',  null ,'black',  null ],
        [ null ,'black',  null ,'black',  null ,'black',  null ,'black'],
        [ null ,  null ,  null ,  null ,  null ,  null ,  null ,  null ],
        [ null ,  null ,  null ,  null ,  null ,  null ,  null ,  null ],
        ['red' ,  null , 'red' ,  null , 'red' ,  null , 'red' ,  null ],
        [ null , 'red' ,  null , 'red' ,  null , 'red' ,  null , 'red' ],
        ['red' ,  null , 'red' ,  null , 'red' ,  null , 'red' ,  null ],
      ],
      boardRepTempate: [
        [ null ,'black',  null ,'black',  null ,'black',  null ,'black'],
        ['black', null ,'black',  null ,'black',  null ,'black',  null ],
        [ null ,'black',  null ,'black',  null ,'black',  null ,'black'],
        [ null ,  null ,  null ,  null ,  null ,  null ,  null ,  null ],
        [ null ,  null ,  null ,  null ,  null ,  null ,  null ,  null ],
        ['red' ,  null , 'red' ,  null , 'red' ,  null , 'red' ,  null ],
        [ null , 'red' ,  null , 'red' ,  null , 'red' ,  null , 'red' ],
        ['red' ,  null , 'red' ,  null , 'red' ,  null , 'red' ,  null ],
      ],
      piecesPossibleMoves: { // TODO: is it necessary to have the current piece position in two locations??
        '1,0': { current: 'black', moves: [] },
        '3,0': { current: 'black', moves: [] },
        '5,0': { current: 'black', moves: [] },
        '7,0': { current: 'black', moves: [] },

        '0,1': { current: 'black', moves: [] },
        '2,1': { current: 'black', moves: [] },
        '4,1': { current: 'black', moves: [] },
        '6,1': { current: 'black', moves: [] },

        '1,2': { current: 'black', moves: [] },
        '3,2': { current: 'black', moves: [] },
        '5,2': { current: 'black', moves: [] },
        '7,2': { current: 'black', moves: [] },

        '0,3': { current: '', moves: [] },
        '2,3': { current: '', moves: [] },
        '4,3': { current: '', moves: [] },
        '6,3': { current: '', moves: [] },

        '1,4': { current: '', moves: [] },
        '3,4': { current: '', moves: [] },
        '5,4': { current: '', moves: [] },
        '7,4': { current: '', moves: [] },

        '0,5': { current: 'red', moves: [] },
        '2,5': { current: 'red', moves: [] },
        '4,5': { current: 'red', moves: [] },
        '6,5': { current: 'red', moves: [] },

        '1,6': { current: 'red', moves: [] },
        '3,6': { current: 'red', moves: [] },
        '5,6': { current: 'red', moves: [] },
        '7,6': { current: 'red', moves: [] },

        '0,7': { current: 'red', moves: [] },
        '2,7': { current: 'red', moves: [] },
        '4,7': { current: 'red', moves: [] },
        '6,7': { current: 'red', moves: [] },
      }
    }
  }

  determinePossibleMoves(turn, x, y) {
    const currentPlayer = turn;
    const otherPlayer = turn === 'black' ? 'red' : 'black';
    let list = this.state.piecesPossibleMoves; // going to directly assign to list later, THEN call setState to replace the relevant property in setState when list is ready. decent workflow??
    let pieceX, pieceY, leftDiagonalX, leftDiagonalY, rightDiagonalX, rightDiagonalY, pieceColor;

    for (let square in list) {
      // filter list to only those that currently have a piece on them
      if (list[square].current !== '') {
        pieceX = Number(square[0]);
        pieceY = Number(square[2]);
        pieceColor = list[square].current // ie, 'red' or 'black'

        // for each immediate diagonal (above for 0's turn / below for 1's turn)
        leftDiagonalX = pieceX - 1;
        rightDiagonalX = pieceX + 1;

        if (pieceColor === 'black') {
          leftDiagonalY = pieceY + 1;
          rightDiagonalY = pieceY + 1;
        } else if (pieceColor === 'red') {
          leftDiagonalY = pieceY - 1;
          rightDiagonalY = pieceY - 1
        }

        const diagonals = [[leftDiagonalX, leftDiagonalY], [rightDiagonalX, rightDiagonalY]];

        for (let i = 0; i < 2; i++) {

          // if this diagonal is empty
          if (this.state.boardRep[diagonals[i][1]][diagonals[i][0]] === null) {
            // this square can be moved to

            // add this diagonal to the list of possible moves for this square
            if (list[square].moves.length === 0) {
              list[square].moves = [ `${diagonals[i][0]},${diagonals[i][1]}` ];
            } else {
              list[square].moves.push(`${diagonals[i][0]},${diagonals[i][1]}`);
            }

          // else if this diagonal contains an enemy piece
          } else if (this.state.boardRep[diagonals[i][1]][diagonals[i][0]] === otherPlayer) {
            // get the coordinates for the square this enemy piece is on
            // repeat the diagonal checking process from this square // recursion ???
          } else {
            // this diagonal contains a friendly piece, so can't move here
          }
        }
      }
    }
    return list; // the function that accepts this list will call setState and update the React state
  }

  handleClick(e, x, y) {
    const list = this.determinePossibleMoves(this.state.turn, x, y);

    this.setState((state, props) => {
      return {
        turn: ++state.turn,
        currentTurn: state.currentTurn === 'black' ? 'red' : 'black',
        piecesPossibleMoves: list
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
  let pieceColor = piece === 'black' ? 'black-piece': 'red-piece';

  return (
    <div className={`square-background ${color}`} onClick={(e) => onClick(e, x, y)}>
      {`${x},${y}`}
      <div className="square-content"><span className={pieceColor}>{piece}</span></div>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));