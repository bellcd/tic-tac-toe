const express = require('express');
const utilities = require('./utilities.js');
const multer = require('multer');
const upload = multer();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('client'));

app.get('/', (req, res, next) => {
  console.log('here');
});

app.post('/', upload.single('jsonFile'), (req, res, next) => {
  console.log('req.body: ', req.body);

  const json = req.body.jsonText === '' ? req.file.buffer.toString() : req.body.jsonText;
  const csv = utilities.JSONtoCSV(json);

  // TODO: change this to use templates instead of repeating the code from index.html
  const html = `<!DOCTYPE html>
  <html>
    <head>

    </head>
    <body>
      <form action="http://127.0.0.1:3000" method="post" enctype="multipart/form-data">
        <div>
          <label for="jsonText">JSON data</label>
          <textarea id="jsonText" name="jsonText"></textarea>
        </div>
        <div>
          <label for="jsonFile"></label>
          <input type="file" id="jsonFile" name="jsonFile" accept=".json">
        </div>
        <button id="form-btn" type="submit" value="submit">send the data through the form</button>
        <button id="ajax-btn" type="button" value="submit" style="display: none;">send the data with AJAX</button>
        <p id="csv">${csv}</p>
        <div id="download-csv-container">
          <a id="download-csv" href="" download="data.csv">Download CSV</a>
        </div>
      </form>
      <button id="change-btn">Change how to send the data</button>
    </body>
  </html>`

  res.status(200);
  res.write(html);

});

app.post('/json', (req, res, next) => {
  console.log('req: ', req);
  console.log('req.body: ', req.body);

  const csv = utilities.JSONtoCSV(JSON.stringify(req.body));
  res.status(200);
  res.send(csv);
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});