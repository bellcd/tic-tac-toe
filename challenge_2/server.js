const express = require('express');
const utilities = require('./utilities.js');
const multer = require('multer');
const upload = multer();

// { dest: 'uploads/' }


const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.static('client'));

app.get('/', (req, res, next) => {
  console.log('here');
});

// upload.any()

app.post('/', upload.single('jsonFile'), (req, res, next) => {
  console.log('req: ', req);
  console.log('req.file: ', req.file);
  console.log('req.files: ', req.files);
  console.log('req.body.jsonText: ', req.body.jsonText);
  console.log('req.body.jsonFile: ', req.body.jsonFile);

  const json = req.body.jsonFile;
  const csv = utilities.JSONtoCSV(json);

  // console.log('csv: ', csv);


  // TODO: change this to use templates instead of repeating the code from index.html
  const html = `<!DOCTYPE html>
  <html>
    <head>

    </head>
    <body>
      <form action="http://127.0.0.1:3000" method="post">
        <div>
          <label for="json">JSON data</label>
          <textarea id="json" name="jsonText"></textarea>
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