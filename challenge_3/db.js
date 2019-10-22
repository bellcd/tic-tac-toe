const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'checkout'
});

connection.connect((err) => {
  if (err) {
    console.error(`Error connecting ${err.stack}`);
    return;
  }
  console.log(`Connected to database as id ${connection.threadId}`)
});

module.exports = {
  connection
};