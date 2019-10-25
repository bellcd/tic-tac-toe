class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardRep: [[null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null]]
    };
  }

  render() {
    return React.createElement(Board, {
      boardRep: this.state.boardRep
    });
  }

}

const Square = ({
  x,
  y,
  piece
}) => {
  return React.createElement("div", {
    class: "square-background"
  }, `${x},${y}`, React.createElement("div", {
    class: "square-content"
  }, piece));
};

const Board = ({
  boardRep
}) => {
  const flatArr = boardRep.reduce((acc, row, i) => {
    return acc.concat(row.map((piece, j) => React.createElement(Square, {
      key: `${i},${j}`,
      y: i,
      x: j,
      piece: piece
    })));
  }, []);
  return React.createElement("div", {
    id: "board"
  }, flatArr);
};

ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));