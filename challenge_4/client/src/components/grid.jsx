const React = require('react');

const Grid = ({ gridRep, onClick }) => {
  const gridElement = gridRep.map((col) => {
    return col.map((disc, index) => {
      return <Disc key={index} disc={disc} onClick={onClick}></Disc>
    })
  });

  return <div id="grid">{gridElement}</div>
}

module.exports = Grid;