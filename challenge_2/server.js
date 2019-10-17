const express = require('express');
const utilities = require('./utilities.js');


const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.static('client'));

app.get('/', (req, res, next) => {
  console.log('here');
});

app.post('/', (req, res, next) => {
  // console.log('req.body.json_data: ', req.body.json_data);
  const csv = utilities.JSONtoCSV(req.body.json_data);

  // console.log('csv: ', csv);

  const html = `<!DOCTYPE html>
  <html>
    <head>

    </head>
    <body>
      <form action="http://127.0.0.1:3000" method="post">
        <div>
          <label for="json">JSON data</label>
          <textarea id="json" name="json_data"></textarea>
          <button type="submit" value="submit">send the data</button>
        </div>
      </form>
      <p>${csv}</p>
    </body>
  </html>`

  res.status(200);
  res.write(html);

});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})


// TODO:
  // generate CSV structure from submitted JSON data
  // respond with that CSV structured data embedded (?) in an html page that also has the form to submit another one