class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      turn: 1,
      currentTurn: 'black',
      pieceToMove: undefined,
      blackScore: 0,
      redScore: 0,
      boardRep: [[null, 'black', null, 'black', null, 'black', null, 'black'], ['black', null, 'black', null, 'black', null, 'black', null], [null, 'black', null, 'black', null, 'black', null, 'black'], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], ['red', null, 'red', null, 'red', null, 'red', null], [null, 'red', null, 'red', null, 'red', null, 'red'], ['red', null, 'red', null, 'red', null, 'red', null]],
      boardRepTempate: [[null, 'black', null, 'black', null, 'black', null, 'black'], ['black', null, 'black', null, 'black', null, 'black', null], [null, 'black', null, 'black', null, 'black', null, 'black'], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], ['red', null, 'red', null, 'red', null, 'red', null], [null, 'red', null, 'red', null, 'red', null, 'red'], ['red', null, 'red', null, 'red', null, 'red', null]],
      piecesPossibleMoves: {
        // TODO: is it necessary to have the current piece position in two locations??
        '1,0': {
          current: 'black',
          moves: []
        },
        '3,0': {
          current: 'black',
          moves: []
        },
        '5,0': {
          current: 'black',
          moves: []
        },
        '7,0': {
          current: 'black',
          moves: []
        },
        '0,1': {
          current: 'black',
          moves: []
        },
        '2,1': {
          current: 'black',
          moves: []
        },
        '4,1': {
          current: 'black',
          moves: []
        },
        '6,1': {
          current: 'black',
          moves: []
        },
        '1,2': {
          current: 'black',
          moves: []
        },
        '3,2': {
          current: 'black',
          moves: []
        },
        '5,2': {
          current: 'black',
          moves: []
        },
        '7,2': {
          current: 'black',
          moves: []
        },
        '0,3': {
          current: '',
          moves: []
        },
        '2,3': {
          current: '',
          moves: []
        },
        '4,3': {
          current: '',
          moves: []
        },
        '6,3': {
          current: '',
          moves: []
        },
        '1,4': {
          current: '',
          moves: []
        },
        '3,4': {
          current: '',
          moves: []
        },
        '5,4': {
          current: '',
          moves: []
        },
        '7,4': {
          current: '',
          moves: []
        },
        '0,5': {
          current: 'red',
          moves: []
        },
        '2,5': {
          current: 'red',
          moves: []
        },
        '4,5': {
          current: 'red',
          moves: []
        },
        '6,5': {
          current: 'red',
          moves: []
        },
        '1,6': {
          current: 'red',
          moves: []
        },
        '3,6': {
          current: 'red',
          moves: []
        },
        '5,6': {
          current: 'red',
          moves: []
        },
        '7,6': {
          current: 'red',
          moves: []
        },
        '0,7': {
          current: 'red',
          moves: []
        },
        '2,7': {
          current: 'red',
          moves: []
        },
        '4,7': {
          current: 'red',
          moves: []
        },
        '6,7': {
          current: 'red',
          moves: []
        }
      }
    };
  }

  componentDidMount() {
    const piecesPossibleMoves = this.determinePossibleMoves('black'); // only calculates initial moves for black, as black goes first ...

    this.setState({
      piecesPossibleMoves
    });
  }

  addSquareToMovesList(list, square, diagonals, i) {
    if (list[square].moves.length === 0) {
      list[square].moves = [`${diagonals[i][0]},${diagonals[i][1]}`];
    } else if (list[square].moves.indexOf(`${diagonals[i][0]},${diagonals[i][1]}`) !== -1) {// there's probably a more efficient way to check if the list already contains the relevant diagonal coordinates ...
      // moves list already contains the diagonal coordinates
    } else {
      list[square].moves.push(`${diagonals[i][0]},${diagonals[i][1]}`);
    }
  } // TODO: is there a simpler way to handle this??


  determinePossibleMoves(currentTurn) {
    const otherPlayer = currentTurn === 'black' ? 'red' : 'black';
    let list = this.state.piecesPossibleMoves; // going to directly assign to list later, THEN call setState to replace the relevant property in setState when list is ready. decent workflow??

    let pieceX, pieceY, leftDiagonalX, leftDiagonalY, rightDiagonalX, rightDiagonalY, pieceColor;

    for (let square in list) {
      // only visit those that currently have the piece whose turn we're on
      if (list[square].current === currentTurn) {
        pieceX = Number(square[0]);
        pieceY = Number(square[2]);
        pieceColor = list[square].current; // ie, 'red' or 'black'
        // for each immediate diagonal (below for black squares, above for red squares)

        leftDiagonalX = pieceX - 1;
        rightDiagonalX = pieceX + 1;

        if (pieceColor === 'black') {
          leftDiagonalY = pieceY + 1;
          rightDiagonalY = pieceY + 1;
        } else if (pieceColor === 'red') {
          leftDiagonalY = pieceY - 1;
          rightDiagonalY = pieceY - 1;
        }

        let diagonals = [[leftDiagonalX, leftDiagonalY], [rightDiagonalX, rightDiagonalY]];

        for (let i = 0; i < 2; i++) {
          // if this diagonal is empty
          if (this.state.boardRep[diagonals[i][1]][diagonals[i][0]] === null) {
            // this square can be moved to
            // add this diagonal to the list of possible moves for this square
            this.addSquareToMovesList(list, square, diagonals, i); // else if this diagonal contains an enemy piece
          } else if (this.state.boardRep[leftDiagonalY][leftDiagonalX] === otherPlayer) {
            // leftDiagonal has an enemy piece on it
            let secondDiagonalY;
            let secondDiagonalX = leftDiagonalX - 1;

            if (pieceColor === 'red') {
              secondDiagonalY = leftDiagonalY - 1;
            } else {
              secondDiagonalY = leftDiagonalY + 1;
            } // if left diagonal from the enemy square is empty


            if (this.state.boardRep[secondDiagonalY][secondDiagonalX] === null) {
              // add that square to moves list
              this.addSquareToMovesList(list, square, [[secondDiagonalX, secondDiagonalY]], 0);
            }
          } else if (this.state.boardRep[rightDiagonalY][rightDiagonalX] === otherPlayer) {
            // rightDiagonal has an enemy piece on it
            let secondDiagonalY;
            let secondDiagonalX = rightDiagonalX + 1;

            if (pieceColor === 'red') {
              secondDiagonalY = rightDiagonalY - 1;
            } else {
              secondDiagonalY = rightDiagonalY + 1;
            } // if right diagonal from the enemy square is empty


            if (this.state.boardRep[secondDiagonalY][secondDiagonalX] === null) {
              // add that square to moves list
              this.addSquareToMovesList(list, square, [[secondDiagonalX, secondDiagonalY]], 0);
            }
          } else {// this diagonal contains a friendly piece, so can't move here
          }
        }
      }
    }

    return list; // the function that accepts this list will call setState and update the React state
  }

  handleClick(e, x, y) {
    const list = this.determinePossibleMoves(this.state.currentTurn);
    this.setState((state, props) => {
      return {
        turn: ++state.turn,
        currentTurn: state.currentTurn === 'black' ? 'red' : 'black',
        piecesPossibleMoves: list,
        pieceToMove: `${x},${y}`
      };
    });
    console.log(`you clicked on square ${x},${y}`);
  }

  squareIsValidClickForThisTurn(x, y) {// square.current has to match currentTurn
  }

  isGameOver() {}

  render() {
    return React.createElement(React.Fragment, null, React.createElement(Board, {
      boardRep: this.state.boardRep,
      onClick: this.handleClick,
      pieceToMove: this.state.pieceToMove
    }), React.createElement("div", null, "Turn: ", this.state.turn), React.createElement("div", null, "Player ", this.state.currentTurn, " goes this turn"));
  }

}

const Board = ({
  boardRep,
  onClick,
  pieceToMove
}) => {
  let count = -1;
  let color;
  let onClickToPass;
  const flatArr = boardRep.reduce((acc, row, i) => {
    ++count;
    return acc.concat(row.map((piece, j) => {
      if (count % 2 === 0) {
        color = `light-square`;
        onClickToPass = ``;
      } else {
        color = `dark-square`;
        onClickToPass = onClick;
      }

      ++count;
      return React.createElement(Square, {
        pieceToMove: pieceToMove,
        key: `${i},${j}`,
        y: i,
        x: j,
        piece: piece,
        color: color,
        onClick: onClickToPass
      });
    }));
  }, []);
  return React.createElement("div", {
    id: "board"
  }, flatArr);
};

const Square = ({
  x,
  y,
  piece,
  color,
  onClick,
  pieceToMove
}) => {
  let pieceColor = piece === 'black' ? 'black-piece' : 'red-piece';
  pieceToMove = pieceToMove === `${x},${y}` ? `piece-to-move` : '';
  let fn; // TODO: there's probably a better way to handle this ...

  if (onClick === '') {
    fn = () => {};
  } else {
    fn = e => onClick(e, x, y);
  }

  return React.createElement("div", {
    id: pieceToMove,
    className: `square-background ${color}`,
    onClick: fn
  }, `${x},${y}`, React.createElement("div", {
    className: "square-content"
  }, React.createElement("span", {
    className: pieceColor
  }, piece)));
};

ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));