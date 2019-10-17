// handles converting the JSON data into CSV data
// converts the input JSON object into a matrix of parallel arrays, with the first array holding the field names, and each subsequent array holding a record
function JSONtoCSV (json) {
  // create an object with the key names and their indexes in the parallel arrays ie,
    // {
      // firstName: 0,
      // lastName: 1,
      // etc ...
      // nextIndex: starts at 0
    // }

  const indexOrder = {
    nextIndex: 0
  };

  function recursiveFn(arrayOfPersonElements) {
    // reduce through array of JSON, can be depth-first
    return arrayOfPersonElements.reduce((acc, person) => {
      // remove the children (if any) property from the person element, so we can guarantee to do that step last
      let children;
      if (person.children) {
        children = person.children;
        delete person.children;
      }

      const record = [];
      for (propertyName in person) {
        if (indexOrder[propertyName] === undefined) {
          // this is the first time we've encountered this property name, so we need to add it to the object that we will eventually use to create our column names

          // declare an index for that property name
          indexOrder[propertyName] = indexOrder.nextIndex;

          // increment counter
          indexOrder.nextIndex = ++indexOrder.nextIndex;
        }

        // set the appropriate index in this person's array to be the appropriate value
        record[indexOrder[propertyName]] = person[propertyName]
      }

      // at this point, record should be an array with the structure of the record we want
      // ie, ['firstName', 'lastName', 'county', 'city', 'role', 'sales']

      // add this record to the acc
      let result = acc.concat([record]);

      // if children is NOT undefined,
      // base case
      if (children === undefined) {
        // continue with the next person at this level, if any
        return result;

      // recursive case
      } else {
        // else, there are children elements we need to recurse through
        return result.concat(recursiveFn(children)) // TODO: double check that concat is the right method here??
      }
    }, []);
  }

  const records = recursiveFn([JSON.parse(json)]);

  // make a 'title' row for the csv, ie of column names
  const titleRow = [];

  for (columnName in indexOrder) {
    if (columnName !== 'nextIndex') {
      titleRow[indexOrder[columnName]] = columnName;
    }
  }

  // set titleRow as the first array in records
  records.unshift(titleRow);


  // map records to an array of strings
  const arrayOfStrings = records.map((record) => {
    return record.join(',');
  });

  const csv = arrayOfStrings.join('\n');
  // console.log('csv inside JSONtoCSV: ', csv);
  return csv;
}

module.exports.JSONtoCSV = JSONtoCSV;

// The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line of CSV report (see included sample output), where the keys of the JSON objects will be the columns of the CSV report.

// You may assume the JSON data has a regular structure and hierarchy (see included sample file). In other words, all sibling records at a particular level of the hierarchy will have the same set of properties, but child objects might not contain the same properties.

// In all cases, every property you encounter must be present in the final CSV output. You may also assume that child records in the JSON will always be in a property called `children`.