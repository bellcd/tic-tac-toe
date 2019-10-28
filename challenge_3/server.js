const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.json());
const db = require('./db.js');

// I'm not handling the case where the user clears their cookie ...
function setCookie(req, res, next) {
  let session_cookie = req.cookies.session_cookie

  // if session_cookie is present on the request
  if (session_cookie) {
    // read the record from the database that matches that session_cookie
    // get the appropriate email from the record that matches the session_cookie
    db.selectRecord({ session_cookie }, (err, data) => {
      if (err) {
        console.log(err);
        return;
       }

      console.log('data: ', data);
    });

    // set that email on the req object
    // invoke next
    next();
  } else {
    // generate and set one
    session_cookie = Math.random() * 100000000000000000;
    res.cookie('session_cookie', session_cookie);

    // set the session_cookie on the req object
    req.session_cookie = session_cookie;
    next();
  }
}

// TODO: does this nees to be a POST route??
app.post('/homepage', (req, res, next) => {
  res.send(JSON.stringify({
    activePage: 'PageOne'
  }));
});

app.post('/page-one', setCookie, (req, res, next) => {
  ({ name, email, password } = req.body);
  const session_cookie = req.session_cookie;

  console.log(name, email, password);
  // TODO: change so I'm not storing plain text passwords ...
  db.createRecord(name, email, password, session_cookie, (err, data) => {
    if (err) { console.log(err); }

    res.send(JSON.stringify({
      activePage: 'PageTwo'
    }));
  });
});

// TODO: find a better way to match the user in the db than always sending the email??
app.post('/page-two', setCookie, (req, res, next) => {
  ({ email, address_line_1, address_line_2, city, state, zip_code, phone_num } = req.body);

  db.updateRecord({ email }, { address_line_1, address_line_2, city, state, zip_code, phone_num }, (err, data) => {
    if (err) { console.log(err); }

    res.send(JSON.stringify({
      activePage: 'PageThree'
    }));
  });
});

app.post('/page-three', setCookie, (req, res, next) => {
  ({ email, cc_number, cc_exp, cvv, zip_code_billing } = req.body);

  db.updateRecord({ email }, { cc_number, cc_exp, cvv, zip_code_billing }, (err, data) => {
    if (err) { console.log(err); }

    res.send(JSON.stringify({
      activePage: 'Confirmation'
    }));
  });
});

app.get('/cart', setCookie, (req, res, next) => {
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