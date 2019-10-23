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

app.post('/page-one', (req, res, next) => {
  ({ name, email, password } = req.body);

  console.log(name, email, password);
  // TODO: change so I'm not storing plain text passwords ...
  db.createRecord(name, email, password, (err, data) => {
    if (err) { console.log(err); }

    res.send(JSON.stringify({
      activePage: 'PageTwo'
    }));
  });
});

// TODO: find a better way to match the user in the db than always sending the email??
app.post('/page-two', (req, res, next) => {
  ({ email, address_line_1, address_line_2, city, state, zip_code, phone_num } = req.body);

  db.updateRecord({ email }, { address_line_1, address_line_2, city, state, zip_code, phone_num }, (err, data) => {
    if (err) { console.log(err); }

    res.send(JSON.stringify({
      activePage: 'PageThree'
    }));
  });
});

app.post('/page-three', (req, res, next) => {
  ({ email, cc_number, cc_exp, cvv, zip_code_billing } = req.body);

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