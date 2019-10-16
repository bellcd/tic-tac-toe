
// TODO: is this a decent approach to waiting for everything to load before running this script??
document.addEventListener('DOMContentLoaded', () => {
  const game = {
    player1: 0,
    player2: 0,
    move: 0
  }

  // representation of the board
  // const boardRep = [[null, null, null], [null, null, null], [null, null, null]];
  const boardRep = [null, null, null, null, null, null, null, null, null];

  function boardClick(e) {
    const gameSquare = e.target.dataset.i;
    const piece = game.move % 2 === 0 ? 'X' : 'O';

    // looks at the representation of the board

    // if the spot clicked on is null
    if (boardRep[gameSquare] === null) {
      // set spot to either O OR X (depending on what turn we're on)
      boardRep[gameSquare] = piece;

      // update DOM element
      e.target.innerHTML = piece;
      ++game.move;
    } else {
      return; // because the click happened on a square that already has a piece in it ...
    }

    // check if someone won OR tie
      // if yes
        // display relevant message and update scores
        // enable reset button AND disable board ??
  }

  // event listener on the board
  const board = document.querySelector('.board');

  board.addEventListener('click', boardClick);

});