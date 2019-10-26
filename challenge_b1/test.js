const expect = chai.expect;

const piecesPossibleMoves = {
  '1,0': { current: 'black', moves: [] },
  '3,0': { current: 'black', moves: [] },
  '5,0': { current: 'black', moves: [] },
  '7,0': { current: 'black', moves: [] },

  '0,1': { current: 'black', moves: [] },
  '2,1': { current: 'black', moves: [] },
  '4,1': { current: 'black', moves: [] },
  '6,1': { current: 'black', moves: [] },

  '1,2': { current: 'black', moves: [] },
  '3,2': { current: 'black', moves: [] },
  '5,2': { current: 'black', moves: [] },
  '7,2': { current: 'black', moves: [] },

  '0,3': { current: null, moves: [] },
  '2,3': { current: null, moves: [] },
  '4,3': { current: null, moves: [] },
  '6,3': { current: null, moves: [] },

  '1,4': { current: null, moves: [] },
  '3,4': { current: null, moves: [] },
  '5,4': { current: null, moves: [] },
  '7,4': { current: null, moves: [] },

  '0,5': { current: 'red', moves: [] },
  '2,5': { current: 'red', moves: [] },
  '4,5': { current: 'red', moves: [] },
  '6,5': { current: 'red', moves: [] },

  '1,6': { current: 'red', moves: [] },
  '3,6': { current: 'red', moves: [] },
  '5,6': { current: 'red', moves: [] },
  '7,6': { current: 'red', moves: [] },

  '0,7': { current: 'red', moves: [] },
  '2,7': { current: 'red', moves: [] },
  '4,7': { current: 'red', moves: [] },
  '6,7': { current: 'red', moves: [] },
}

const piecesStartPossibleMoves = {
  '1,0': { current: 'black', moves: [] },
  '3,0': { current: 'black', moves: [] },
  '5,0': { current: 'black', moves: [] },
  '7,0': { current: 'black', moves: [] },

  '0,1': { current: 'black', moves: [] },
  '2,1': { current: 'black', moves: [] },
  '4,1': { current: 'black', moves: [] },
  '6,1': { current: 'black', moves: [] },

  '1,2': { current: 'black', moves: ['0,3', '2,3'] },
  '3,2': { current: 'black', moves: ['2,3', '4,3'] },
  '5,2': { current: 'black', moves: ['4,3', '6,3'] },
  '7,2': { current: 'black', moves: ['6,3'] },

  '0,3': { current: null, moves: [] },
  '2,3': { current: null, moves: [] },
  '4,3': { current: null, moves: [] },
  '6,3': { current: null, moves: [] },

  '1,4': { current: null, moves: [] },
  '3,4': { current: null, moves: [] },
  '5,4': { current: null, moves: [] },
  '7,4': { current: null, moves: [] },

  '0,5': { current: 'red', moves: ['1,4'] },
  '2,5': { current: 'red', moves: ['1,4', '3,4'] },
  '4,5': { current: 'red', moves: ['3,4', '5,4'] },
  '6,5': { current: 'red', moves: ['5,4', '7,4'] },

  '1,6': { current: 'red', moves: [] },
  '3,6': { current: 'red', moves: [] },
  '5,6': { current: 'red', moves: [] },
  '7,6': { current: 'red', moves: [] },

  '0,7': { current: 'red', moves: [] },
  '2,7': { current: 'red', moves: [] },
  '4,7': { current: 'red', moves: [] },
  '6,7': { current: 'red', moves: [] },
}

describe('Board', () => {
  describe('Possible Moves', () => {
    it('Should calculate initial possible moves correctly', () => {
      let list = model.determinePossibleMoves('black', piecesPossibleMoves);
      list = model.determinePossibleMoves('red', list);
      expect(list).to.deep.equal(piecesStartPossibleMoves);
    });
  });
});