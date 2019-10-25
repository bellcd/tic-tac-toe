class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      turn: 1,
      currentTurn: 'black',
      blackScore: 0,
      redScore: 0,
      boardRep: [[null, 'black', null, 'black', null, 'black', null, 'black'], ['black', null, 'black', null, 'black', null, 'black', null], [null, 'black', null, 'black', null, 'black', null, 'black'], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], ['red', null, 'red', null, 'red', null, 'red', null], [null, 'red', null, 'red', null, 'red', null, 'red'], ['red', null, 'red', null, 'red', null, 'red', null]],
      boardRepTempate: [[null, 'black', null, 'black', null, 'black', null, 'black'], ['black', null, 'black', null, 'black', null, 'black', null], [null, 'black', null, 'black', null, 'black', null, 'black'], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], ['red', null, 'red', null, 'red', null, 'red', null], [null, 'red', null, 'red', null, 'red', null, 'red'], ['red', null, 'red', null, 'red', null, 'red', null]],
      blackPiecesPossibleMoves: {
        '1,0': {},
        '3,0': {},
        '5,0': {},
        '7,0': {},
        '0,1': {},
        '2,1': {},
        '4,1': {},
        '6,1': {},
        '1,2': {},
        '3,2': {},
        '5,2': {},
        '7,2': {}
      },
      RedPiecesPossibleMoves: {
        '0,5': {},
        '2,5': {},
        '4,5': {},
        '6,5': {},
        '1,6': {},
        '3,6': {},
        '5,6': {},
        '7,6': {},
        '0,7': {},
        '2,7': {},
        '4,7': {},
        '6,7': {}
      }
    };
  } // maintain two ___PiecesPossibleMoves objects, one for each player, with the x,y coordinates of every piece for that player
  // each list of possible moves for each piece starts out as an empty object


  determinePossibleMoves(turn, x, y) {
    const currentPlayer = turn;
    const otherPlayer = turn === 'black' ? 'red' : 'black';
    let list = turn === 'black' ? this.state.blackPiecesPossibleMoves : this.state.RedPiecesPossibleMoves; // going to directly assign to list later, THEN call setState to replace the relevant property in setState when list is ready. decent workflow??

    let pieceX, pieceY, diagonalX, diagonalY; // on every turn, check each piece in ___PiecesPossibleMoves
    // get an array of all the keys

    const currentPiecePositions = Object.keys(list).map(coords => coords.split(',')); // for each piece

    currentPiecePositions.forEach(piece => {
      pieceX = piece[0];
      pieceY = piece[1]; // for each immediate diagonal (above for 0's turn / below for 1's turn)

      leftDiagonalX = pieceX - 1;
      rightDiagonalX = pieceX + 1;

      if (turn === 'black') {
        leftDiagonalY = pieceY + 1;
        rightDiagonalY = pieceY + 1;
      } else if (turn === 'red') {
        leftDiagonalY = pieceY - 1;
        rightDiagonalY = pieceY - 1;
      } // if this diagonal is empty


      if (this.state.boardRep[leftDiagonalY][leftDiagonalX] === null) {
        // this square can be moved to
        // update ___PiecesPossibleMoves to reflect that
        // make sure I can add these to the list object properly ?? react state??
        if (list[`${x},${y}`].length === 0) {
          list[`${x},${y}`] = [`${leftDiagonalX},${leftDiagonalY}`];
        } else {
          list[`${x},${y}`].push(`${leftDiagonalX},${leftDiagonalY}`);
        } // else if this diagonal contains an enemy piece

      } else if (this.state.boardRep[leftDiagonalY][leftDiagonalX] === otherPlayer) {// get the coordinates for the square this enemy piece is on
        // repeat the diagonal checking process from this square // recursion ???
      } else {// this diagonal contains a friendly piece, so can't move here
        }
    });
  }

  handleClick(e, x, y) {
    this.determinePossibleMoves(this.state.turn, x, y);
    this.setState((state, props) => {
      return {
        turn: ++state.turn,
        currentTurn: state.currentTurn === 'black' ? 'red' : 'black'
      };
    });
    console.log(`you clicked on square ${x},${y}`);
  }

  isGameOver() {}

  render() {
    return React.createElement(React.Fragment, null, React.createElement(Board, {
      boardRep: this.state.boardRep,
      onClick: this.handleClick
    }), React.createElement("div", null, "Turn: ", this.state.turn), React.createElement("div", null, "Player ", this.state.currentTurn, " goes this turn"));
  }

}

const Board = ({
  boardRep,
  onClick
}) => {
  let count = -1;
  let color;
  const flatArr = boardRep.reduce((acc, row, i) => {
    ++count;
    return acc.concat(row.map((piece, j) => {
      color = count % 2 === 0 ? `light-square` : `dark-square`;
      ++count;
      return React.createElement(Square, {
        key: `${i},${j}`,
        y: i,
        x: j,
        piece: piece,
        color: color,
        onClick: onClick
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
  onClick
}) => {
  let pieceColor = piece === 'black' ? 'black-piece' : 'red-piece';
  return React.createElement("div", {
    className: `square-background ${color}`,
    onClick: e => onClick(e, x, y)
  }, `${x},${y}`, React.createElement("div", {
    className: "square-content"
  }, React.createElement("span", {
    className: pieceColor
  }, piece)));
};

ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));