const express = require('express');
const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.static('client'));

app.get('/', (req, res, next) => {
  console.log('here');
});

app.post('/', (req, res, next) => {
  console.log('req.body.json_data: ', req.body.json_data);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})


// TODO:
  // generate CSV structure from submitted JSON data
  // respond with that CSV structured data embedded (?) in an html page that also has the form to submit another one