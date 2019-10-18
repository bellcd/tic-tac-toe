const express = require('express');
const utilities = require('./utilities.js');
const multer = require('multer');
const upload = multer();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('views', './client/views');
app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('client'));

app.get('/', (req, res, next) => {
  res.render('index', { csv: '' });
});

app.post('/', upload.single('jsonFile'), (req, res, next) => {
  const json = req.body.jsonText === '' ? req.file.buffer.toString() : req.body.jsonText;
  const csv = utilities.JSONtoCSV(json);

  res.status(200);
  res.render('index', { csv });
});

app.post('/json', (req, res, next) => {
  const csv = utilities.JSONtoCSV(JSON.stringify(req.body));
  res.status(200);
  res.send(csv);
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});