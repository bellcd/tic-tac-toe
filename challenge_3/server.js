const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
const db = require('./db.js');

app.post('/page-one', (req, res, next) => {
  console.log('here');
});

// TODO: need to add other routes for the other pages ...
app.post('/homepage', (req, res, next) => {
  ({ name, email, password } = req.body);

  console.log(name, email, password);
  // create a db record
  db.createRecord(name, email, password, (err, data) => {
    if (err) { console.log(err); }
  });

  // add name, email, & password fields to that record
  // return the id from that record ??

  res.send(JSON.stringify({
    activePage: 'PageOne'
  }));
});

// TODO: find a better way to match the user in the db than always sending the email??
app.post('/page-one', (req, res, next) => {
  ({ email, address_line_1, address_line_2, city, state, zip_code, phone_num } = req.body);

  // update the db record
  db.updateRecord({ email }, { address_line_1, address_line_2, city, state, zip_code, phone_num }, (err, data) => {
    if (err) { console.log(err); }
  });
});

app.listen(port, () => { console.log(`App is listening on port ${port}`) });