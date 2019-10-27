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
      // TODO: change these components to use some form of conditional rendering
        // return null from within the actual components?
        // or perhaps do the conditional rendering at the <App> component level?
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
        {/* // TODO: extract to component?? */}
        <div>* Indicates Required</div>
        <InputField
          inputFieldText={'Name'}
          inputFieldType={'name'}
          value={this.props.name}
          required={true}
          pattern={'[a-z|A-Z]+'} // TODO: all the regex needs to be passed as a STRING (ie, without containing forward slashes /.../ )
          refsToPass={this.props.refsToPass.name}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>

        {/* // TODO: confirm this?? */}
        <InputField
          inputFieldText={'Email'}
          inputFieldType={'email'}
          value={this.props.email}
          required={true}
          pattern={'.+'}
          refsToPass={this.props.refsToPass.email}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <InputField
          inputFieldText={'Password'}
          inputFieldType={'password'}
          value={this.props.password}
          required={true}
          pattern={'.+'}
          refsToPass={this.props.refsToPass.password}
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
        {/* // TODO: extract to component?? */}
        <div>* Indicates Required</div>
        <InputField
          inputFieldText={'Address'}
          inputFieldType={'address_line_1'}
          value={this.props.address_line_1}
          required={true}
          pattern={'[a-z|A-Z|1-9| |.]+'}
          refsToPass={this.props.refsToPass.address_line_1}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <InputField
          inputFieldText={'Address (cont)'}
          inputFieldType={'address_line_2'}
          value={this.props.address_line_2}
          required={false}
          pattern={'[a-z|A-Z|1-9| |.]+'}
          refsToPass={this.props.refsToPass.address_line_2}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <InputField
          inputFieldText={'City'}
          inputFieldType={'city'}
          value={this.props.city}
          required={true}
          pattern={'[a-z|A-Z| |.]+'}
          refsToPass={this.props.refsToPass.city}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <InputField
          inputFieldText={'State'}
          inputFieldType={'state'}
          value={this.props.state}
          required={true}
          pattern={'[a-z|A-Z| |]+'}
          refsToPass={this.props.refsToPass.state}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <InputField
          inputFieldText={'Zip Code'}
          inputFieldType={'zip_code'}
          value={this.props.zip_code}
          required={true}
          pattern={'[1-9]{5}'}
          refsToPass={this.props.refsToPass.zip_code}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>

        {/* // TODO: confirm this ?? */}
        <InputField
          inputFieldText={'Phone Num'}
          inputFieldType={'phone_num'}
          value={this.props.phone_num}
          required={true}
          pattern={'^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$'}
          refsToPass={this.props.refsToPass.phone_num}
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

        {/* // TODO: extract to component?? */}
        <div>* Indicates Required</div>

        {/* // TODO: only visa ?? */}
        <InputField
          inputFieldText={'Credit Card Number'}
          inputFieldType={'cc_number'}
          value={this.props.cc_number}
          required={true}
          pattern={'.+'}
          refsToPass={this.props.refsToPass.cc_number}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>

        {/* // TODO: confirm this?? */}
        <InputField
          inputFieldText={'Credit Card Expiration Date'}
          inputFieldType={'cc_exp'}
          value={this.props.cc_exp}
          required={true}
          pattern={'.+'}
          refsToPass={this.props.refsToPass.cc_exp}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <InputField
          inputFieldText={'CVV'}
          inputFieldType={'cvv'}
          value={this.props.cvv}
          required={true}
          pattern={'[1-9]{3}'}
          refsToPass={this.props.refsToPass.cvv}
          onInputFieldChange={this.props.onInputFieldChange}
        >
        </InputField>
        <InputField
          inputFieldText={'Billing Zip Code'}
          inputFieldType={'zip_code_billing'}
          value={this.props.zip_code_billing}
          required={true}
          pattern={'[1-9]{5}'}
          refsToPass={this.props.refsToPass.zip_code_billing}
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

const InputField = ({ inputFieldText, inputFieldType, value, onInputFieldChange, required, pattern, refsToPass }) => {
  return (
    <div>
      <span>{required ? '*' : ''}</span>
      <label htmlFor={inputFieldType}>{inputFieldText}</label>
      <input
        type="text"
        name={inputFieldType}
        value={value}
        onChange={onInputFieldChange}
        required={required}
        pattern={pattern}
        ref={refsToPass}
      >
      </input>
      {/* <span class="invalid-message">{invalidMessage}</span> */}
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.refsToPass = {
      name: React.createRef(),
      email: React.createRef(),
      password: React.createRef(),
      address_line_1: React.createRef(),
      address_line_2: React.createRef(),
      city: React.createRef(),
      state: React.createRef(),
      zip_code: React.createRef(),
      phone_num: React.createRef(),
      cc_number: React.createRef(),
      cc_exp: React.createRef(),
      cvv: React.createRef(),
      zip_code_billing: React.createRef()
    }

    // TODO: (the response from the server??) to each button click will change which view is active ...
    this.state = {
      canContinue: false,
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

  showErrorMessage() {
    alert('Fix the errors!')
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
    if (!this.state.canContinue) {
      this.showErrorMessage();
      return;
    }

    const url = `${this.state.url}/page-one`;
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }

    this.invokeFetch(url, data);
  }

  handlePageTwoClick(e) {
    if (!this.state.canContinue) {
      this.showErrorMessage();
      return;
    }

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
    if (!this.state.canContinue) {
      this.showErrorMessage();
      return;
    }

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
    const element = this.refsToPass[e.target.name].current;
    console.log(element);
    console.log(element.validity);

    element.reportValidity();

    this.setState({
      [e.target.name]: e.target.value,
      canContinue: element.checkValidity()
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
        refsToPass={this.refsToPass}
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
        refsToPass={this.refsToPass}
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
        refsToPass={this.refsToPass}
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


