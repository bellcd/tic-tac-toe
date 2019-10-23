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

// TODO: modify interface to use the same tyle as updateRecord ...
function createRecord(name, email, password, callback) {
  debugger;
  connection.query(`INSERT INTO cart(name, email, password) VALUES(?, ?, ?)`, [name, email, password], (err, results, fields) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(results, null);
  });
}

// @param fieldToMatchOn - An object containing the field name & value for the record to update
// @param fieldsToUpdate - An object containing the field name(s) & value(s) to be updated
function updateRecord(fieldToMatchOnObject, fieldsToUpdateObject, callback) {
  const entries = Object.entries(fieldToMatchOnObject);
  const field = entries[0][0];
  const value = entries[0][1];

  const entriesToUpdate = Object.entries(fieldsToUpdateObject);

  const assignments = entriesToUpdate.reduce((acc, currentValue) => {
    if (currentValue[1] !== undefined) {
      acc.push(`${currentValue[0]}='${currentValue[1]}'`);
    }

    return acc;
  }, []);

  // const fieldsToUpdate = entriesToUpdate.map((entry) => {
  //   return `'${entry[0]}'`;
  // });

  // const valuesToInsert = entriesToUpdate.map((entry) => {
  //   return `'${entry[1]}'`;
  // });

  // TODO: get this escaping to work ...
  // let query = `INSERT INTO cart(${numOfFields.join(', ')}) VALUES(${numOfValues.join(', ')}) WHERE ? = ?`
  // let arr = [...fieldsToUpdate].concat([...valuesToInsert]).concat(field, value);

  const query = `UPDATE cart SET ${assignments.join(', ')} WHERE ${field} = '${value}'`;

  connection.query(query, (err, results, fields) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(results, null);
  })
}

module.exports = {
  connection,
  createRecord,
  updateRecord
};