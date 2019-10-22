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

app.post('/homepage', (req, res, next) => {
  ({ name, email, password } = req.body());

  console.log(name, email, password);
  // create a db record
  db.createRecord(name, email, password, () => {});

  // add name, email, & password fields to that record
  // return the id from that record ??

  res.send(JSON.stringify({
    activePage: 'PageOne'
  }));
});

app.listen(port, () => { console.log(`App is listening on port ${port}`) });