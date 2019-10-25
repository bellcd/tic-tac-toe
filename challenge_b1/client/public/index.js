class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return React.createElement("div", null, "here is content");
  }

}

ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));