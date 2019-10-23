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
        </InputField>
        <InputField
          inputFieldText={'Zip Code'}
          inputFieldType={'zip_code'}
          value={this.props.zip_code}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <InputField
          inputFieldText={'Phone Num'}
          inputFieldType={'phone_num'}
          value={this.props.phone_num}
          onInputFieldChange={this.props.onInputFieldChange}
        >
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

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
  }

  // ComponentDidUpdate(prevProps) {
  //   const url = `http://localhost:3000`;
  //   fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })

  //   .then(res => res.json())
  //   .then(res => {

  //   })
  // }

  render() {
    return (
      <div className={this.props.activePage === 'Confirmation' ? '' : 'hide'}>

      <OrderSummaryField text={'Name'} value={this.props.state.name}></OrderSummaryField>
      <OrderSummaryField text={'Email'} value={this.props.state.email}></OrderSummaryField>
      <OrderSummaryField text={'Address'} value={this.props.state.address_line_1}></OrderSummaryField>
      <OrderSummaryField text={'Address (cont)'} value={this.props.state.address_line_2}></OrderSummaryField>
      <OrderSummaryField text={'City'} value={this.props.state.city}></OrderSummaryField>
      <OrderSummaryField text={'State'} value={this.props.state.state}></OrderSummaryField>
      <OrderSummaryField text={'Zip Code'} value={this.props.state.zip_code}></OrderSummaryField>
      <OrderSummaryField text={'Phone Number'} value={this.props.state.phone_num}></OrderSummaryField>
      <OrderSummaryField text={'Credit Card Number'} value={this.props.state.cc_number}></OrderSummaryField>
      <OrderSummaryField text={'Credit Card Expiration Date'} value={this.props.state.cc_exp}></OrderSummaryField>
      <OrderSummaryField text={'CCV'} value={this.props.state.cvv}></OrderSummaryField>
      <OrderSummaryField text={'Billing Zip Code'} value={this.props.state.zip_code_billing}></OrderSummaryField>
        <Button
          onClick={this.props.onClick}
          text={'purchase'}
        >
        </Button>
      </div>
    );
  }
}

const OrderSummaryField = ({ text, value }) => {
  return (
    <div>
      {`${text}: ${value}`}
    </div>
  );
}

// // TODO: to pretty up the visual presentaton of order summary??
// const OrderSummary = () => {
//   return (
//     <div>

//     </div>
//   );
// }

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
    this.handlePageTwoClick = this.handlePageTwoClick.bind(this);
    this.handlePageThreeClick = this.handlePageThreeClick.bind(this);
    this.handleConfirmationClick = this.handleConfirmationClick.bind(this);
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
  }

  invokeFetch(url, data) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          activePage: res.activePage
        })
      });
  }

  handleCheckoutClick(e) {
    const url = `${this.state.url}/homepage`;
    const data = {}
    this.invokeFetch(url, data)
  }

  handlePageOneClick(e) {
    const url = `${this.state.url}/page-one`;
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }

    this.invokeFetch(url, data);
  }

  handlePageTwoClick(e) {
    const url = `${this.state.url}/page-two`;
    const data = {
      email: this.state.email,
      address_line_1: this.state.address_line_1,
      address_line_2: this.state.address_line_2,
      city: this.state.city,
      state: this.state.state,
      zip_code: this.state.zip_code,
      phone_num: this.state.phone_num
    }

    this.invokeFetch(url, data);
  }

  handlePageThreeClick(e) {
    const url = `${this.state.url}/page-three`;
    const data = {
      email: this.state.email,
      cc_number: this.state.cc_number,
      cc_exp: this.state.cc_exp,
      cvv: this.state.cvv,
      zip_code_billing: this.state.zip_code_billing
    }

    this.invokeFetch(url, data);
  }

  handleConfirmationClick(e) {
    this.setState({
      activePage: 'Homepage'
    });
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
        onInputFieldChange={this.handleInputFieldChange}
      >
      </Homepage>
      <PageOne
        activePage={this.state.activePage}
        onClick={this.handlePageOneClick}
        onInputFieldChange={this.handleInputFieldChange}
        name={this.state.name}
        email={this.state.email}
        password={this.state.password}
      >
      </PageOne>
      <PageTwo
        activePage={this.state.activePage}
        onClick={this.handlePageTwoClick}
        onInputFieldChange={this.handleInputFieldChange}
        address_line_1={this.state.address_line_1}
        address_line_2={this.state.address_line_2}
        city={this.state.city}
        state={this.state.state}
        zip_code={this.state.zip_code}
        phone_num={this.state.phone_num}
      >
      </PageTwo>
      <PageThree
        activePage={this.state.activePage}
        onClick={this.handlePageThreeClick}
        onInputFieldChange={this.handleInputFieldChange}
        cc_number={this.state.cc_number}
        cc_exp={this.state.cc_exp}
        cvv={this.state.cvv}
        zip_code_billing={this.state.zip_code_billing}
        >
        </PageThree>
      <Confirmation
        activePage={this.state.activePage}
        onClick={this.handleConfirmationClick}
        state={this.state}
      >
      </Confirmation>
    </div>
  }
};

ReactDOM.render(<App></App>, document.querySelector('#root'));


