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
    move: 0,
    message: '',
    updateMessage(newMessage) {
      game.message = newMessage;
      displayMessage();
    },
    nextPiece: 'X',
    boardRep: [[null, null, null], [null, null, null], [null, null, null]],
    boardRepTemplate: [[null, null, null], [null, null, null], [null, null, null]],
    useRotation: true,
    useGravity: true,
    // TODO: there's definitely a better way to do deep copy ...
    copyBoard: function(board) {
      const copy = [];
      for (let i = 0; i < board.length; i++) {
        copy[i] = board[i].slice();
      }
      return copy;
    },
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
    },
    boardRepRotation: function(boardRep) {
      const boardRepCopy = game.copyBoard(boardRep);
      const rotatedBoardRepCopy = [[], [], []];

      // loop through the array (ie, starting from the bottom rows UP)
      for (let i = 0; i < 3; i++) {
        // sort each subArray (so that the null elements will be at the end, which is becoming the top row in a moment...)
        // loop forwards through each subarray
        for (let j = 0; j < 3; j++) {
          // main array index (currently row) -> sub array index (becoming column)
          // sub array index (currently column) -> main array index (becoming row)
          rotatedBoardRepCopy[Math.abs(j - (boardRepCopy[i].length - 1))][i] = boardRepCopy[i][j];
                            // ^^ // should be the absolute value of the sub array index (currently the column) - the last index in the sub array
        }
      }
      return rotatedBoardRepCopy;
    },
    applyGravity: function(boardRep) {
      const boardRepCopy = game.copyBoard(boardRep);
      const columns = [[], [], []];
      const afterGravity = [[null, null, null], [null, null, null], [null, null, null]];
      // iterate through the boardRepCopy, column first
      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
          let piece = boardRepCopy[i][j];

          // only add the piece to columns if it's not null
          if (piece !== null) {
            columns[j].push(piece);
          }
        }
      }

      // walk backwards through afterGravity, column first
      for (let j = 2; j > -1; j--) {
        for (let i = 2; i > -1; i--) {
          // if there are more pieces in this column
          if (columns[j].length > 0) {
            // stack them on top of what's already in this column
            afterGravity[i][j] = columns[j].pop();
          }
        }
      }
      return afterGravity;
    },
    reAssignDataDashAttributes: function() {
      const tiles = document.querySelectorAll('.tile');
      tiles.forEach(tile => {
        let temp = tile.dataset.col;

        // set col index equal to current row index
        tile.dataset.col = tile.dataset.row;

        // set row index equal to Math.abs(col index - ((length of board, ie 3) - 1))
        tile.dataset.row = Math.abs(temp - 2);
      });
    },
    resetDataDashAttributes: function() {
      const tiles = document.querySelectorAll('.tile');
      let count = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          tiles[count].dataset.row = i;
          tiles[count].dataset.col = j;
          count++;
        }
      }
    }
  }

  // VIEW
  function displayMessage() {
    window.messageDiv.classList.remove('message-hide');
    // window.messageDiv.classList.add('message-show');
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
      // window.messageDiv.classList.remove('message-show');
      window.messageDiv.classList.add('message-hide');
      window.messageDiv.innerHTML = '';

    // change game.boardRep back to being filled with null
    game.resetBoardRep();

    // change game.move back to 0
    game.move = 0;

    // reset board rotation back to 0
    document.querySelector('.board').style.transform = '';

    // reset the board DOM data-* to initial values
    game.resetDataDashAttributes();
  }

  function displayNewScores() {
    document.querySelector('#score-X').textContent = game.players.X.score;
    document.querySelector('#score-O').textContent = game.players.O.score;
  }

  function displayNames() {
    document.querySelector('#name-X').textContent = game.players.X.name;
    document.querySelector('#name-O').textContent = game.players.O.name;
  }

  function rotateBoard() {
    const board = document.querySelector('.board');
    const rotationText = board.style.transform;

    if (rotationText === '') {
      board.style.transform = `rotate(-90deg)`;
    } else {
      const alreadyRotatedAmount = parseInt(rotationText.slice(rotationText.indexOf('(') + 1, -4));
      board.style.transform = `rotate(${alreadyRotatedAmount + -90}deg)`;
    }
  }

  function applyGravityToBoard() {
    // TODO: need a CSS way to represent what has an x VS o ...
    const tiles = document.querySelectorAll('.tile-piece');
    let count = 0;

    // iterate through the tiles nodeList
    tiles.forEach(tile => {
      const row = tile.parentNode.dataset.row;
      const col = tile.parentNode.dataset.col;

      // access the boardRep array at the position of the dataset attributes on that node
      // set that piece in the element
      tile.textContent = game.boardRep[row][col];
    });
  }

  function displayGravityButton() {
    document.querySelector('#gravity-setting').textContent = game.useGravity ? 'On' : 'Off';
  }

  function displayRotationButton() {
    document.querySelector('#rotation-setting').textContent = game.useRotation ? 'On' : 'Off';
  }

   // CONTROLLER
   function boardClick(e) {
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    const piece = game.nextPiece;
    game.alternateNextPiece();

    // looks at the representation of the board, if the spot clicked on is null
    if (game.getTile(row, col) === null) {
      // increment move
      game.move++;

      // set spot to either X OR O (depending on what turn we're on)
      game.setTile(row, col, piece);

      // set the piece in the DOM
      e.target.childNodes[0].textContent = piece;

      // TODO: there's probably a better way to handle this if logic ...
      if (game.useRotation) {
        // rotate the board rep
        game.boardRep = game.boardRepRotation(game.boardRep);

        // trigger the visual rotation
        rotateBoard();

        // align the data-* attributes with the new board rotation
        game.reAssignDataDashAttributes();
      }

      if (game.useGravity) {
        // apply gravity to the board rep
        game.boardRep = game.copyBoard(game.applyGravity(game.boardRep));

        if (game.useRotation === false) {
          applyGravityToBoard();
        } else {
          // there's an event listener that listens for 'transitionend' from the rotation trasform, and then fires the method applyGravityToBoard()
        }
      }
    } else {
      return; // because the click happened on a square that already has a piece in it ...
      // TODO: add popup type thing that informs the user they can't change an already placed piece
    }

    let message;
    let gameIsFinished = false;

    // TODO: move this logic to the MODEL, and call the exposed interface
    // check if someone won OR tied
    if (game.isRowWin(piece) || game.isColumnWin(piece) || game.isDiagonalWin(piece)) {
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

  function toggleRotation() {
    game.useRotation = !game.useRotation;
    displayRotationButton();
  }

  function toggleGravity() {
    game.useGravity = !game.useGravity;
    displayGravityButton();
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

    board.addEventListener('transitionend', () => {
      applyGravityToBoard();
    });

    document.querySelector('#gravity').addEventListener('click', toggleGravity);
    document.querySelector('#rotation').addEventListener('click', toggleRotation);
  }

  initialize();
});