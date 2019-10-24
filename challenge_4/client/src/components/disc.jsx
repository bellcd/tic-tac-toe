const React = require('react');

const Disc = ({ disc, onClick }) => {
  return (
    <div id="disc" onClick={onClick}>
      <div id="disc-value">{disc}</div>
    </div>
  );
}

module.exports = Disc;