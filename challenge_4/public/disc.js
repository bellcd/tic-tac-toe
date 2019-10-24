const React = require('react');

const Disc = ({
  disc
}) => {
  return React.createElement("div", {
    id: "disc"
  }, React.createElement("div", {
    id: "disc-value"
  }, disc));
};

module.exports = Disc;