
// TODO: is this a decent approach to waiting for everything to load before running this script??
document.addEventListener('DOMContentLoaded', () => {

  // MODEL
  window.game = {
    players: {
      whoGoesFirst: 'X',
      X: {
        score: 0,
        name: null,
        piece: 'X'
      },
      O: {
        score: 0,
        name: null,
        piece: 'O'
      },
    },
    move: 0,
    boardRep: [[null, null, null], [null, null, null], [null, null, null]],
    boardRepTemplate: [[null, null, null], [null, null, null], [null, null, null]],
    getTile: function(row, col) {
      return game.boardRep[row][col];
    },
    setTile: function(row, col, piece) {
      game.boardRep[row][col] = piece;
    },
    resetBoardRep: function() {
      game.boardRep = game.boardRepTemplate.map((row) => {
        return row.slice();
      });
    },
    // TODO: there's definitely a better way to check for winning tic tac toe patterns ...
    isRowWin: function(piece) {
      return game.boardRep.some((row) => {
        return row.every((gamePiece) => {
          return piece === gamePiece;
        });
      });
    },
    isColumnWin: function(piece) {
      const everyMatch = [];
      for (let j = 0; j < 3; j++) {
        const match = [];
        for (let i = 0; i < 3; i++) {
          match.push(game.boardRep[i][j]);
        }
        everyMatch.push(match.every((gamePiece) => gamePiece === piece));
      }
      return everyMatch.some((match) => match);
    },
    isDiagonalWin: function(piece) {
      if (game.boardRep[0][0] === piece && game.boardRep[1][1] === piece && game.boardRep[2][2] === piece) {
        // left diagonal match
        return true;
      } else if (game.boardRep[0][2] === piece && game.boardRep[1][1] === piece && game.boardRep[2][0] === piece) {
        // right diagonal match
        return true;
      } else {
        return false;
      }
    },
    updateScores: function(pieceOfPlayerWhoWon) {
      if (pieceOfPlayerWhoWon === 'X') {
        game.players.playerWhoWon = 'X';
        game.players.X.score++;
      } else {
        game.players.playerWhoWon = 'O';
        game.players.O.score++;
      }
      displayNewScores();
    }
  }

  // VIEW
  function displayMessage(message) {
    window.messageDiv.innerHTML = message;
  }

  function handleReset(e) {
    // remove any HTML content from
      // each of the .tile's
    document.querySelectorAll('.tile')
      .forEach((tile) => {
        tile.innerHTML = '';
      });

      // the messageDiv
      window.messageDiv.innerHTML = '';
    // change game.boardRep back to being filled with null
    game.resetBoardRep();

    // change game.move back to 0
    game.move = 0;
  }

  function displayNewScores() {
    document.querySelector('#player-one-score').innerHTML = game.players.X.score;
    document.querySelector('#player-two-score').innerHTML = game.players.O.score;
  }

   // CONTROLLER
   function boardClick(e) {
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    const piece = game.move % 2 === 0 ? 'X' : 'O';

    // looks at the representation of the board
    // if the spot clicked on is null
    if (game.getTile(row, col) === null) {
      // set spot to either X OR O (depending on what turn we're on)
      game.setTile(row, col, piece);

      // update DOM element
      e.target.innerHTML = piece;
      ++game.move;
    } else {
      return; // because the click happened on a square that already has a piece in it ...
      // TODO: add popup type thing that informs the user they can't change an alredy placed piece
    }

    let message;
    let gameIsFinished = false;

    // TODO: there's definitely a better way to handle this ... far too WET
    // check if someone won OR tied
    if (game.isRowWin(piece)) {
      console.log('rowMatch');
      message = `${piece} wins`;
      gameIsFinished = true;
    } else if (game.isColumnWin(piece)) {
      console.log('columnMatch');
      message = `${piece} wins`;
      gameIsFinished = true;
    } else if (game.isDiagonalWin(piece)) {
      console.log('diagonalMatch');
      message = `${piece} wins`;
      gameIsFinished = true;
    } else if (game.move === 9) {
      console.log('tied');
      message = `It's a tie`;
      gameIsFinished = true;
    }

    // TODO: after winning / tie-ing , disable click functionality on tiles
    if (gameIsFinished) {
      // if yes
        // display relevant message
      displayMessage(message);

      // and update scores
      game.updateScores(piece);
    }
  }

  // event listeners
  // board
  window.board = document.querySelector('.board');
  board.addEventListener('click', boardClick);

  // reset button
  window.resetBtn = document.querySelector('#reset');
  resetBtn.addEventListener('click', handleReset);

  // message div
  window.messageDiv = document.querySelector('.message');
});