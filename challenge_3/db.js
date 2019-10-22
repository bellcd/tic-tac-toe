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

// TODO: this SQL syntax is not working ...
function createRecord(name, email, password, callback) {
  connection.query(`INSERT INTO cart (name, email, password) VALUES(${name}, ${email}, ${password})`, (err, results, fields) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(results, null);
  });
}

module.exports = {
  connection,
  createRecord
};