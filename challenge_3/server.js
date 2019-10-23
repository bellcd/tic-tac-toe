const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
const db = require('./db.js');

// TODO: does this nees to be a POST route??
app.post('/homepage', (req, res, next) => {
  res.send(JSON.stringify({
    activePage: 'PageOne'
  }));
});

// TODO: need to add other routes for the other pages ...
app.post('/page-one', (req, res, next) => {
  ({ name, email, password } = req.body);

  console.log(name, email, password);
  // create a db record
  db.createRecord(name, email, password, (err, data) => {
    if (err) { console.log(err); }

    res.send(JSON.stringify({
      activePage: 'PageTwo'
    }));
  });

  // add name, email, & password fields to that record
  // return the id from that record ??
});

// TODO: find a better way to match the user in the db than always sending the email??
app.post('/page-two', (req, res, next) => {
  ({ email, address_line_1, address_line_2, city, state, zip_code, phone_num } = req.body);
  console.log('email: ', email);

  console.log('address_line_1: ', address_line_1);
  console.log('address_line_2: ', address_line_2);
  console.log('city: ', city);
  console.log('state: ', state);
  console.log('zip_code: ', zip_code);
  console.log('phone_num: ', phone_num);

  // update the db recordselec
  db.updateRecord({ email }, { address_line_1, address_line_2, city, state, zip_code, phone_num }, (err, data) => {
    if (err) { console.log(err); }

    res.send(JSON.stringify({
      activePage: 'PageThree'
    }));
  });
});

app.post('/page-three', (req, res, next) => {
  ({ email, cc_number, cc_exp, cvv, zip_code_billing } = req.body);

  // update the db record
  db.updateRecord({ email }, { cc_number, cc_exp, cvv, zip_code_billing }, (err, data) => {
    if (err) { console.log(err); }

    res.send(JSON.stringify({
      activePage: 'Confirmation'
    }));
  });
});

app.get('/cart', (req, res, next) => {
  ({ email } = req.body);

  db.selectRecord({ email }, (err, data) => {
    if (err) { console.log(err); }

    console.log('data: ', data);

    res.send(JSON.stringify({
      data
    }));
  })
});

app.listen(port, () => { console.log(`App is listening on port ${port}`) });