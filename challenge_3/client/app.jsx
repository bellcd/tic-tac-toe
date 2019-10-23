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
        <InputField
          inputFieldText={'Name'}
          inputFieldType={'name'}
          value={this.props.name}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <InputField
          inputFieldText={'Email'}
          inputFieldType={'email'}
          value={this.props.email}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <InputField
          inputFieldText={'Password'}
          inputFieldType={'password'}
          value={this.props.password}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
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

class PageTwo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.activePage === 'PageTwo' ? '' : 'hide'}>
        <InputField
          inputFieldText={'Address'}
          inputFieldType={'address_line_1'}
          value={this.props.address_line_1}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <InputField
          inputFieldText={'Address (cont)'}
          inputFieldType={'address_line_2'}
          value={this.props.address_line_2}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <InputField
          inputFieldText={'City'}
          inputFieldType={'city'}
          value={this.props.city}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <InputField
          inputFieldText={'State'}
          inputFieldType={'state'}
          value={this.props.state}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        <InputField
          inputFieldText={'Zip Code'}
          inputFieldType={'zip_code'}
          value={this.props.zip_code}
          onInputFieldChange={this.props.onInputFieldChange}
        ></InputField>
        <InputField
          inputFieldText={'Phone Num'}
          inputFieldType={'phone_num'}
          value={this.props.phone_num}
          onInputFieldChange={this.props.onInputFieldChange}
        ></InputField>
        </InputField>
        <Button
          onClick={this.props.onClick}
          text={'next'}
          pageNum={'2'}
        >
        </Button>
      </div>
    );
  }
}

class PageThree extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.activePage === 'PageThree' ? '' : 'hide'}>
        <InputField
          inputFieldText={'Credit Card Number'}
          inputFieldType={'cc_number'}
          value={this.props.cc_number}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <InputField
          inputFieldText={'Credit Card Expiration Date'}
          inputFieldType={'cc_exp'}
          value={this.props.cc_exp}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <InputField
          inputFieldText={'CVV'}
          inputFieldType={'cvv'}
          value={this.props.cvv}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <InputField
          inputFieldText={'Billing Zip Code'}
          inputFieldType={'zip_code_billing'}
          value={this.props.zip_code_billing}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <Button
          onClick={this.props.onClick}
          text={'next'}
          pageNum={'3'}
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
const InputField = ({ inputFieldText, inputFieldType, value, onInputFieldChange }) => {
  return (
    <div>
      <label htmlFor={inputFieldType}>{inputFieldText}</label>
      <input
        type="text"
        name={inputFieldType}
        value={value}
        onChange={onInputFieldChange}
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
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
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

  handleInputFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return <div>
      <Homepage
        activePage={this.state.activePage}
        onClick={this.handleCheckoutClick}
        name={this.state.name}
        email={this.state.email}
        password={this.state.password}
        onInputFieldChange={this.handleInputFieldChange}
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


