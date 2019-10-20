
// TODO: is this a decent approach to waiting for everything to load before running this script??
document.addEventListener('DOMContentLoaded', () => {
  // MODEL
  window.game = {
    players: {
      whoGoesNext: 'X',
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
    message: '',
    updateMessage(newMessage) {
      game.message = newMessage;
      displayMessage();
    },
    nextPiece: 'X',
    // move: 0,
    boardRep: [[null, null, null], [null, null, null], [null, null, null]],
    rotatedBoardRep: [[null, null, null], [null, null, null], [null, null, null]],
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
        game.players.whoGoesNext = 'X';
        game.players.X.score++;
        game.nextPiece = 'X';
      } else {
        game.players.whoGoesNext = 'O';
        game.players.O.score++;
        game.nextPiece = 'O';
      }
      displayNewScores();
      displayWhoGoesNext();
    },
    alternateNextPiece: function() {
      if (game.nextPiece === 'X') {
        game.nextPiece = 'O';
      } else if (game.nextPiece === 'O') {
        game.nextPiece = 'X';
      }
    }
  }

  // rotate the board
  function boardRepRotation() {
    debugger;
    // loop through the array (ie, starting from the bottom rows UP)
    for (let i = 0; i < 3; i++) {
      // sort each subArray (so that the null elements will be at the end, which is becoming the top row in a moment...)
      game.boardRep[i].sort();
      // loop forwards through each subarray
      for (let j = 0; j < 3; j++) {
        // main array index (currently row) -> sub array index (becoming column)
        // sub array index (currently column) -> main array index (becoming row)
        game.rotatedBoardRep[Math.abs(j - (game.boardRep[i].length - 1))][i] = game.boardRep[i][j];
                         // ^^ // should be the absolute value of the sub array index (currently the column) - the last index in the sub array
      }
    }
  }

  // VIEW
  function displayMessage() {
    window.messageDiv.innerHTML = game.message;
  }

  function displayWhoGoesNext() {
    document.querySelector('#goes-first').textContent = game.players[game.players.whoGoesNext].name;
  }

  function handleReset(e) {
    // remove any HTML content from
      // each of the .tile-piece's
    document.querySelectorAll('.tile-piece')
      .forEach((tilePiece) => {
        tilePiece.innerHTML = '';
      });

      // the messageDiv
      window.messageDiv.innerHTML = '';
    // change game.boardRep back to being filled with null
    game.resetBoardRep();

    // change game.move back to 0
    game.move = 0;
  }

  function displayNewScores() {
    document.querySelector('#score-X').textContent = game.players.X.score;
    document.querySelector('#score-O').textContent = game.players.O.score;
  }

  function displayNames() {
    document.querySelector('#name-X').textContent = game.players.X.name;
    document.querySelector('#name-O').textContent = game.players.O.name;
  }

   // CONTROLLER
   function boardClick(e) {
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    // const piece = game.move % 2 === 0 ? 'X' : 'O';

    const piece = game.nextPiece;
    game.alternateNextPiece();

    // looks at the representation of the board
    // if the spot clicked on is null
    if (game.getTile(row, col) === null) {
      // set spot to either X OR O (depending on what turn we're on)
      game.setTile(row, col, piece);

      // update DOM element
      e.target.childNodes[0].textContent = piece;
      ++game.move;

      boardRepRotation();
    } else {
      return; // because the click happened on a square that already has a piece in it ...
      // TODO: add popup type thing that informs the user they can't change an already placed piece
    }

    let message;
    let gameIsFinished = false;

    // TODO: there's definitely a better way to handle this ... far too WET
    // check if someone won OR tied
    if (game.isRowWin(piece) || game.isColumnWin(piece) || game.isDiagonalWin(piece)) {
      debugger;
      message = `${game.players[piece].name} wins`;
      gameIsFinished = true;
    } else if (game.move === 9) {
      message = `It's a tie`;
      gameIsFinished = true;
    }

    // TODO: after winning / tie-ing , disable click functionality on tiles
    if (gameIsFinished) {
      // if yes, update scores
      game.updateScores(piece);

      // update message
      game.updateMessage(message);
    }
  }

  window.initialize = function() {
    // TODO: where to put this logic??
    game.players.X.name = prompt('Player X, enter your name: ');
    game.players.O.name = prompt('Player O, enter your name: ');
    displayNames();
    displayWhoGoesNext();

    // event listeners
    // board
    window.board = document.querySelector('.board');
    board.addEventListener('click', boardClick);

    // reset button
    window.resetBtn = document.querySelector('#reset');
    resetBtn.addEventListener('click', handleReset);

    // message div
    window.messageDiv = document.querySelector('.message');
  }

  initialize();
});