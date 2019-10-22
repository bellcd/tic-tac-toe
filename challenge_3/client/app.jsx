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
      <div className={this.props.isActive === true ? '' : 'hide'}>
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
      <div className={this.props.isActive === true ? '' : 'hide'}>
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

class App extends React.Component {
  constructor(props) {
    super(props);

    // TODO: (the response from the server??) to each button click will change which view is active ...
    this.state = {
      url: `http://localhost:3000`,
      pages: {
        activePage: 'homepage',
        homepage: {
          isActive: true
        },
        pageOne: {
          isActive: false
        },
        pageTwo: {
          isActive: false
        },
        pageThree: {
          isActive: false
        },
        confirmation: {
          isActive: false
        }
      },
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
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
      })
  }

  handlePageOneClick(e) {

  }

  render() {
    return <div>
      <Homepage
        isActive={this.state.pages.homepage.isActive}
        onClick={this.handleCheckoutClick}
      >
      </Homepage>
      <PageOne
        isActive={this.state.pages.pageOne.isActive}
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


