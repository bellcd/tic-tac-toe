const React = require('react');

class Disc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let disc = this.props.disc;

    return (
      <div
        id="disc"
        onClick={(e) => this.props.onClick(e, this.props.x, this.props.y)}
      >
        <div id="disc-value">{disc}</div>
      </div>
    );
  }
}

module.exports = Disc;