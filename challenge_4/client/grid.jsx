const React = require('react');
const Disc = require('./disc.js');

const Grid = ({ gridRep }) => {
  const gridElement = gridRep.map((col) => {
    return col.map((disc, index) => {
      return <Disc key={index} disc={disc}></Disc>
    })
  });

  return <div id="grid">{gridElement}</div>
}

module.exports = Grid;