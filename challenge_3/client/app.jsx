// TODO: why did I think I needed require() statements to use React??
// const React = require('react');
// const ReactDOM = require('reactDOM');

const Checkout = ({ onClick }) => {
  return (
    <button
      id="checkout-button"
      onClick={onClick}
    >
    Checkout
    </button>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      zip_code: '',
      phone_num: '',
      cc_number: '',
      cc_exp: '',
      cvv: '',
      zip_code_billing: ''
    };

    this.HandleCheckoutClick = this.handleCheckoutClick.bind(this);
  }

  handleCheckoutClick(e) {
    console.log(e.target);
  }

  render() {
    return <div>
      <Checkout onClick={this.handleCheckoutClick}></Checkout>
    </div>
  }
};

ReactDOM.render(<App></App>, document.querySelector('#root'));


