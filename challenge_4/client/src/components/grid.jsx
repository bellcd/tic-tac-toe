const React = require('react');
const Disc = require('./disc.jsx');

const Grid = ({ gridRep, onClick }) => {
  const gridElement = gridRep.map((row, y) => {
    return row.map((disc, x) => {
      return <Disc key={`${x},${y}`} disc={disc} x={x} y={y} onClick={onClick}></Disc>
    })
  });

  return <div id="grid">{gridElement}</div>
}

module.exports = Grid;