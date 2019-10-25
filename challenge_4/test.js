
// TODO: how does this command
// ./node_modules/mocha/bin/mocha
// run from the terminal know to run this file?? (test.js)

const expect = require('chai').expect;

describe('Array', () => {
  describe('#indexOf', () => {
    it('Should return -1 when the value is not present', () => {
      expect([1, 2, 3].indexOf(4)).to.equal(-1);
    })
  });
})