// const model = require('./model.js');

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

  componentDidMount() {
    const piecesPossibleMoves = model.determinePossibleMoves('black', this.state.piecesPossibleMoves); // only calculates initial moves for black, as black goes first ...

    this.setState({
      piecesPossibleMoves
    });
  }

  handleClick(e, x, y) {
    const piecesPossibleMoves = model.determinePossibleMoves(this.state.currentTurn, this.state.piecesPossibleMoves);

    this.setState((state, props) => {
      return {
        turn: ++state.turn,
        currentTurn: state.currentTurn === 'black' ? 'red' : 'black',
        piecesPossibleMoves,
        pieceToMove: `${x},${y}`
      }
    });

    console.log(`you clicked on square ${x},${y}`);
  }

  squareIsValidClickForThisTurn(x, y) {
    // square.current has to match currentTurn

  }

  isGameOver() {

  }

  render() {
    return (
      <>
        <Board boardRep={this.state.boardRep} onClick={this.handleClick} pieceToMove={this.state.pieceToMove}></Board>
        <div>Turn: {this.state.turn}</div>
        <div>Player {this.state.currentTurn} goes this turn</div>
      </>
    );
  }
}

const Board = ({ boardRep, onClick, pieceToMove }) => {
  let count = -1;
  let color;
  let onClickToPass;

  const flatArr = boardRep.reduce((acc, row, i) => {
    ++count;
    return acc.concat(row.map((piece, j) => {
      if (count % 2 === 0) {
        color = `light-square`
        onClickToPass = ``;
      } else {
        color = `dark-square`;
        onClickToPass = onClick;
      }

      ++count;
      return <Square pieceToMove={pieceToMove} key={`${i},${j}`} y={i} x={j} piece={piece} color={color} onClick={onClickToPass}></Square>;
    }));
  }, []);

  return (
    <div id="board">
      {flatArr}
    </div>
  );
}

const Square = ({ x, y, piece, color, onClick, pieceToMove }) => {
  let pieceColor = piece === 'black' ? 'black-piece': 'red-piece';
  pieceToMove = pieceToMove === `${x},${y}` ? `piece-to-move` : '';

  let fn;
  // TODO: there's probably a better way to handle this ...
  if (onClick === '') {
    fn = () => {};
  } else {
    fn = (e) => onClick(e, x, y);
  }

  return (
    <div id={pieceToMove} className={`square-background ${color}`} onClick={fn}>
      {`${x},${y}`}
      <div className="square-content"><span className={pieceColor}>{piece}</span></div>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));