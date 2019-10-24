const React = require('react');

const Disc = require('./disc.js');

const Grid = ({
  gridRep
}) => {
  const gridElement = gridRep.map(col => {
    return col.map((disc, index) => {
      return React.createElement(Disc, {
        key: index,
        disc: disc
      });
    });
  });
  return React.createElement("div", {
    id: "grid"
  }, gridElement);
};

module.exports = Grid;