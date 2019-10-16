const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res, next) => {
  // response goes here
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})