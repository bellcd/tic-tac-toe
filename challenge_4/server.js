const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('client/dist'));

// app.get('/dist/main.js', (req, res, next) => {

// })

app.listen(port, () => console.log(`Server is running on port ${port}`));

