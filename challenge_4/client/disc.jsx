const React = require('react');

const Disc = ({ disc }) => {
  return (
    <div id="disc">
      <div id="disc-value">{disc}</div>
    </div>
  );
}

module.exports = Disc;