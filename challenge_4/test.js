// TODO: how does this command ./node_modules/mocha/bin/mocha run from the terminal know to run this file?? (test.js)
  // how does mocha make the describe method available??

const expect = require('chai').expect;
const model = require('./client/src/model.js');

const winningRowBoard = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, 1, 1, 1, 1, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null]
];

const winningColBoard = [
  [null, 1, null, null, null, null, null],
  [null, 1, null, null, null, null, null],
  [null, 1, null, null, null, null, null],
  [null, 1, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null]
];

const winningDiagonalBoard = [
  [1, null, null, null, null, null, null],
  [null, 1, null, null, null, null, null],
  [null, null, 1, null, null, null, null],
  [null, null, null, 1, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null]
];

const winningEverythingBoard = [
  [null, 1, null, null, null, null, 0],
  [null, 1, null, null, null, 0, null],
  [null, 1, null, null, 0, null, null],
  [null, 1, null, 0, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, 0, 0, 0, 0, null],
];

const noWinsBoard = [
  [null, 1, 0, 0, 0, null, 0],
  [null, null, null, null, null, 1, null],
  [null, 1, null, null, 0, null, null],
  [1, 1, 1, 0, null, null, null],
  [1, null, null, 1, 0, 1, 1],
  [1, null, 0, 0, null, 0, null],
];

describe("Model", () => {
  describe('isLineWin()', () => {
    it('Should return true for a win', () => {
      expect(model.isLineWin([1, 1, 1, 1, null, null, null])).to.be.true;
      expect(model.isLineWin([null, 0, 0, 0, 0, null, null])).to.be.true;
      expect(model.isLineWin([null, null, 1, 1, 1, 1, null])).to.be.true;
      expect(model.isLineWin([null, null, null, 0, 0, 0, 0])).to.be.true;
    });

    it('Should return false for no win', () => {
      expect(model.isLineWin([])).to.be.false;
      expect(model.isLineWin([null])).to.be.false;
      expect(model.isLineWin([null, null])).to.be.false;
      expect(model.isLineWin([null, 0, 1, null])).to.be.false;
      expect(model.isLineWin([null, 0, 1, null, 0, 0, 0])).to.be.false;
      expect(model.isLineWin([1, 1, 1, 0, 1, null, 0])).to.be.false;
      expect(model.isLineWin([1, 1, 1, 0, 1, 1, 1])).to.be.false;
    })
  });

  describe('hasRowWin()', () =>{
    it('Should return true for a row win', () => {
      expect(model.hasRowWin(winningRowBoard)).to.be.true;
      expect(model.hasRowWin(winningEverythingBoard)).to.be.true;
    });

    it('Should return false for no row win', () => {
      expect(model.hasRowWin(winningColBoard)).to.be.false;
      expect(model.hasRowWin(winningDiagonalBoard)).to.be.false;
      expect(model.hasRowWin(noWinsBoard)).to.be.false;
    })
  });

  describe('hasColWin()', () => {
    it('Should return true for a col win', () => {
      expect(model.hasColWin(winningColBoard)).to.be.true;
      expect(model.hasColWin(winningEverythingBoard)).to.be.true;
    });

    it('Should return false for no col win', () => {
      expect(model.hasColWin(winningRowBoard)).to.be.false;
      expect(model.hasColWin(winningDiagonalBoard)).to.be.false;
      expect(model.hasColWin(noWinsBoard)).to.be.false;
    });
  });

  describe('hasDiagonalWin()', () => {
    it('Should return true for a diagonal win', () => {
      expect(model.hasDiagonalWin(winningDiagonalBoard)).to.be.true;
      expect(model.hasDiagonalWin(winningEverythingBoard)).to.be.true;
    });

    it('Should return false for no diagonal win', () => {
      expect(model.hasDiagonalWin(winningRowBoard)).to.be.false;
      expect(model.hasDiagonalWin(winningColBoard)).to.be.false;
      expect(model.hasDiagonalWin(noWinsBoard)).to.be.false;
    });
  });
});