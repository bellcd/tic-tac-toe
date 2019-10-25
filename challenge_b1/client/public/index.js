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
      boardRep: [[null, 0, null, 0, null, 0, null, 0], [0, null, 0, null, 0, null, 0, null], [null, 0, null, 0, null, 0, null, 0], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [1, null, 1, null, 1, null, 1, null], [null, 1, null, 1, null, 1, null, 1], [1, null, 1, null, 1, null, 1, null]],
      boardRepTempate: [[null, 0, null, 0, null, 0, null, 0], [0, null, 0, null, 0, null, 0, null], [null, 0, null, 0, null, 0, null, 0], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [1, null, 1, null, 1, null, 1, null], [null, 1, null, 1, null, 1, null, 1], [1, null, 1, null, 1, null, 1, null]]
    };
  }

  handleClick(e, x, y) {
    this.setState((state, props) => {
      return {
        turn: ++state.turn,
        currentTurn: state.currentTurn === 0 ? 1 : 0
      };
    });
    console.log(`you clicked on square ${x},${y}`);
  }

  isGameOver() {}

  ComponentDidUpdate() {}

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
  return React.createElement("div", {
    className: `square-background ${color}`,
    onClick: e => onClick(e, x, y)
  }, React.createElement("div", {
    className: "square-content"
  }, piece));
};

ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));