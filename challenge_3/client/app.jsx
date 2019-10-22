// TODO: why did I think I needed require() statements to use React??
// const React = require('react');
// const ReactDOM = require('reactDOM');

// HOMEPAGE
class Homepage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className={this.props.activePage === 'Homepage' ? '' : 'hide'}>
        <InputField
          inputFieldText={'Name'}
          inputFieldType={'name'}
          name={this.props.name}
          onNameChange={this.props.onNameChange}
        >
        </InputField>
        <Button
          onClick={this.props.onClick}
          text={'checkout'}
        >
        </Button>
      </div>
    );
  }
}

class PageOne extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className={this.props.activePage === 'PageOne' ? '' : 'hide'}>
        <Button
          onClick={this.props.onClick}
          text={'next'}
          pageNum={'1'}
        >
        </Button>
      </div>
    );
  }
}

const Button = ({ onClick, text, pageNum }) => {
  return (
    <button
      id={`${pageNum === undefined ? `${text}-` : `page-${pageNum}-`}button`}
      onClick={onClick}
    >
    {text}
    </button>
  );
}

// TODO: is inputFieldType needed??
const InputField = ({ inputFieldText, inputFieldType, name, onNameChange }) => {
  console.log(onNameChange);
  return (
    <div>
      <label htmlFor="name">{inputFieldText}</label>
      <input
        type="text"
        name={inputFieldType}
        value={name}
        onChange={onNameChange}
      >
      </input>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    // TODO: (the response from the server??) to each button click will change which view is active ...
    this.state = {
      url: `http://localhost:3000`,
      activePage: 'Homepage',
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

    this.handleCheckoutClick = this.handleCheckoutClick.bind(this);
    this.handlePageOneClick = this.handlePageOneClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleCheckoutClick(e) {
    const url = `${this.state.url}/homepage`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          activePage: res.activePage
        })
      })
  }

  handlePageOneClick(e) {

  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  render() {
    return <div>
      <Homepage
        activePage={this.state.activePage}
        onClick={this.handleCheckoutClick}
        name={this.state.name}
        onNameChange={this.handleNameChange}
      >
      </Homepage>
      <PageOne
        activePage={this.state.activePage}
        onClick={this.handlePageOneClick}
      >
      </PageOne>
      {/* TODO: add components for other pages  */}
      {/* <PageTwo></PageTwo>
      <PageThree></PageThree>
      <Confirmation></Confirmation> */}
    </div>
  }
};

ReactDOM.render(<App></App>, document.querySelector('#root'));


