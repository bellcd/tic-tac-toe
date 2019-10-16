
// TODO: is this a decent approach to waiting for everything to load before running this script??
document.addEventListener('DOMContentLoaded', () => {
  window.game = {
    player1: 0,
    player2: 0,
    move: 0,
    // boardRep: [null, null, null, null, null, null, null, null, null]
    boardRep: [[null, null, null], [null, null, null], [null, null, null]],
    boardRepTemplate: [[null, null, null], [null, null, null], [null, null, null]]
  }

  // representation of the board
  // const boardRep = [[null, null, null], [null, null, null], [null, null, null]];

  function boardClick(e) {
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    const piece = game.move % 2 === 0 ? 'X' : 'O';

    // looks at the representation of the board

    // if the spot clicked on is null
    if (game.boardRep[row][col] === null) {
      // set spot to either O OR X (depending on what turn we're on)
      game.boardRep[row][col] = piece;

      // update DOM element
      e.target.innerHTML = piece;
      ++game.move;
    } else {
      return; // because the click happened on a square that already has a piece in it ...
    }

    // there's definitely a better way to check for winning tic tac toe patterns ...

    // [[null, null, null], [null, null, null], [null, null, null]];
    let rowMatch;
    let columnMatch;
    let diagonalMatch;

    rowMatch = game.boardRep.some((row) => {
      return row.every((gamePiece) => {
        return piece === gamePiece;
      });
    });

    const everyMatch = [];
    for (let j = 0; j < 3; j++) {
      const match = [];
      for (let i = 0; i < 3; i++) {
        match.push(game.boardRep[i][j]);
      }
      everyMatch.push(match.every((gamePiece) => gamePiece === piece));
    }
    columnMatch = everyMatch.some((match) => match);


    if (game.boardRep[0][0] === piece && game.boardRep[1][1] === piece && game.boardRep[2][2] === piece) {
      // left diagonal match
      diagonalMatch = true;
    } else if (game.boardRep[0][2] === piece && game.boardRep[1][1] === piece && game.boardRep[2][0] === piece) {
      // right diagonal match
      diagonalMatch = true;
    }

    // check if someone won OR tie
      // if yes
        // display relevant message and update scores
        // enable reset button AND disable board ??
    if (rowMatch) {
      console.log('rowMatch');
    } else if (columnMatch) {
      console.log('columnMatch');
    } else if (diagonalMatch) {
      console.log('diagonalMatch');
    } else if (game.move === 9) {
      console.log('tied');
    }

  }

  function handleReset(e) {
    // remove any HTML content from each of the .tile's
    document.querySelectorAll('.tile')
      .forEach((tile) => {
        tile.innerHTML = '';
      });

    // change game.boardRep back to being filled with null
    game.boardRep = game.boardRepTemplate.map((row) => {
      return row.slice();
    });

    // change game.move back to 0
    game.move = 0;
  }

  // event listeners
  // board
  window.board = document.querySelector('.board');
  board.addEventListener('click', boardClick);

  // reset button
  window.resetBtn = document.querySelector('#reset');
  resetBtn.addEventListener('click', handleReset);

});