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
  piece,
  color
}) => {
  return React.createElement("div", {
    className: `square-background ${color}`
  }, `${x},${y}`, React.createElement("div", {
    className: "square-content"
  }, piece));
};

const Board = ({
  boardRep
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
        color: color
      });
    }));
  }, []);
  return React.createElement("div", {
    id: "board"
  }, flatArr);
};

ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));