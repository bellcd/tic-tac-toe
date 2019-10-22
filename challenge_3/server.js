const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
const connection = require('./db.js').connection;

app.post('/page-one', (req, res, next) => {
  console.log('here');
});

app.post('/homepage', (req, res, next) => {
  // create a db record
  // add name, email, & password fields to that record
  // return the id from that record ??
  res.send(JSON.stringify({
    hello: 'hi there!',
    activePage: 'pageOne'
  }));
});

app.listen(port, () => { console.log(`App is listening on port ${port}`) });