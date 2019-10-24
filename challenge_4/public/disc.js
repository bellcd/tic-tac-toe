const React = require('react');

const Disc = ({
  disc,
  onClick
}) => {
  return React.createElement("div", {
    id: "disc",
    onClick: onClick
  }, React.createElement("div", {
    id: "disc-value"
  }, disc));
};

module.exports = Disc;