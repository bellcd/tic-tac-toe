const express = require('express');
const app = express();
const port = 3000;

const connection = require('./db.js').connection;

app.listen(port, () => { console.log(`App is listening on port ${port}`) });