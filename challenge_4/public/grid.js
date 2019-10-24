const React = require('react');

const Disc = require('./disc.js');

const Grid = ({
  gridRep,
  onClick
}) => {
  const gridElement = gridRep.map(col => {
    return col.map((disc, index) => {
      return React.createElement(Disc, {
        key: index,
        disc: disc,
        onClick: onClick
      });
    });
  });
  return React.createElement("div", {
    id: "grid"
  }, gridElement);
};

module.exports = Grid;
console.log('h1');
console.log('h1');