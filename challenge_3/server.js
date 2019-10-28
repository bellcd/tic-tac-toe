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

      // determine what string to send back as the activePage, based on how much and what data is in this record
      // TODO: I'm making some assumptions here
        // there are no duplicate records in this table ...
        // email, address_line_1, and cc_number are accurate indicators for if the user has filled in the other fields from that page ...

      console.log('data: ', data);
      console.log('!data: ', !data);

      if (data.length === 0 || data[0].email === null) {
        req.activePage = 'PageOne';
      } else {
        // set that email on the req object
        req.email = data[0].email;

        if (data[0].address_line_1 === null) {
          req.activePage = 'PageTwo';
        } else if (data[0].cc_number === null) {
          req.activePage = 'PageThree';
        } else {
          req.activePage = 'Confirmation';
        }
      }

      // invoke next
      next();
    });
  } else {
    // generate and set one
    session_cookie = Math.random() * 100000000000000000;
    res.cookie('session_cookie', session_cookie, { expires: new Date(Date.now() + 900000)});


    // the cookie gets generated and set on the client in response to the POST request to /page-one
    // so we have to explicity tell the res to that POST request that 'pageTwo' should be the next activePage
    req.activePage = 'PageTwo';

    // set the session_cookie on the req object
    req.session_cookie = session_cookie;
    next();
  }
}

// TODO: this approach of setting the cookie on the next click from PageOne doesn't seem to be working well ...
  // perhaps set a cookie when they initially visit the POST /homepage route, then use THAT COOKIE as the unique value to identify the proper record ???

// TODO: does this nees to be a POST route??
app.post('/homepage', (req, res, next) => {
  res.send(JSON.stringify({
    activePage: 'PageOne'
  }));
});

app.post('/page-one', setCookie, (req, res, next) => {
  ({ name, email, password } = req.body);
  const session_cookie = req.session_cookie;

  // console.log(name, email, password);

  // TODO: change so I'm not storing plain text passwords ...
  db.createRecord(name, email, password, session_cookie, (err, data) => {
    if (err) { console.log(err); }

    console.log('req.activePage in app.post/page-one: ', req.activePage);

    res.send(JSON.stringify({
      activePage: req.activePage
    }));
  });
});

// TODO: find a better way to match the user in the db than always sending the email??
app.post('/page-two', setCookie, (req, res, next) => {
  ({ email, address_line_1, address_line_2, city, state, zip_code, phone_num } = req.body);

  if (!email) {
    email = req.email; // the user might have closed their browser window after email was assigned on the front end state. This ensures we pick up their email from the req object where we would have assigned it from the database in previous middleware.
  }

  db.updateRecord({ email }, { address_line_1, address_line_2, city, state, zip_code, phone_num }, (err, data) => {
    if (err) { console.log(err); }

    res.send(JSON.stringify({
      activePage: req.activePage
    }));
  });
});

app.post('/page-three', setCookie, (req, res, next) => {
  ({ email, cc_number, cc_exp, cvv, zip_code_billing } = req.body);

  if (!email) {
    email = req.email; // the user might have closed their browser window after email was assigned on the front end state. This ensures we pick up their email from the req object where we would have assigned it from the database in previous middleware.
  }

  db.updateRecord({ email }, { cc_number, cc_exp, cvv, zip_code_billing }, (err, data) => {
    if (err) { console.log(err); }

    res.send(JSON.stringify({
      activePage: req.activePage
    }));
  });
});

app.get('/cart', setCookie, (req, res, next) => {
  ({ email } = req.body);

  if (!email) {
    email = req.email; // the user might have closed their browser window after email was assigned on the front end state. This ensures we pick up their email from the req object where we would have assigned it from the database in previous middleware.
  }

  db.selectRecord({ email }, (err, data) => {
    if (err) { console.log(err); }

    console.log('data: ', data);

    res.send(JSON.stringify({
      data
    }));
  })
});

app.listen(port, () => { console.log(`App is listening on port ${port}`) });