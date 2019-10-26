const model = {
  // TODO: change this such that it doesn't modify its input ...
  addSquareToMovesList(list, square, diagonals, i) {
    if (list[square].moves.length === 0) {
      list[square].moves = [`${diagonals[i][0]},${diagonals[i][1]}`];
    } else if (list[square].moves.indexOf(`${diagonals[i][0]},${diagonals[i][1]}`) !== -1) {// there's probably a more efficient way to check if the list already contains the relevant diagonal coordinates ...
      // moves list already contains the diagonal coordinates
    } else {
      list[square].moves.push(`${diagonals[i][0]},${diagonals[i][1]}`);
    }
  },

    // TODO: is there a simpler way to handle this??
    // TODO: // change this so it doesn't modify list directly??
    // going to directly assign to list later, THEN call setState to replace the relevant property in setState when list is ready. decent workflow??
  determinePossibleMoves(currentTurn, list) {
    const otherPlayer = currentTurn === 'black' ? 'red' : 'black';
    let pieceX, pieceY, leftDiagonalX, leftDiagonalY, rightDiagonalX, rightDiagonalY, pieceColor;

    for (let square in list) {
      // only visit those that currently have the piece whose turn we're on
      if (list[square].current === currentTurn) {
        pieceX = Number(square[0]);
        pieceY = Number(square[2]);
        pieceColor = list[square].current // ie, 'red' or 'black'

        // for each immediate diagonal (below for black squares, above for red squares)
        leftDiagonalX = pieceX - 1;
        rightDiagonalX = pieceX + 1;

        if (pieceColor === 'black') {
          leftDiagonalY = pieceY + 1;
          rightDiagonalY = pieceY + 1;
        } else if (pieceColor === 'red') {
          leftDiagonalY = pieceY - 1;
          rightDiagonalY = pieceY - 1
        }

        let diagonals = [[leftDiagonalX, leftDiagonalY], [rightDiagonalX, rightDiagonalY]];

        for (let i = 0; i < 2; i++) {


          if (list[`${diagonals[i][0]},${diagonals[i][1]}`] === undefined) {
            // it's a diagonal that would be outside the board range, so skip this iteration entirely
            continue;

          // if this diagonal is empty
          } else if (list[`${diagonals[i][0]},${diagonals[i][1]}`].current === null) {
            // this square can be moved to

            // add this diagonal to the list of possible moves for this square
            model.addSquareToMovesList(list, square, diagonals, i);

          // else if this diagonal contains an enemy piece
          } else if (list[`${leftDiagonalX},${leftDiagonalY}`] === otherPlayer) {
            // leftDiagonal has an enemy piece on it

            let secondDiagonalY;
            let secondDiagonalX = leftDiagonalX - 1;

            if (pieceColor === 'red') {
              secondDiagonalY = leftDiagonalY - 1;
            } else {
              secondDiagonalY = leftDiagonalY + 1;
            }

            // if left diagonal from the enemy square is empty
            if (list[`${secondDiagonalX},${secondDiagonalY}`] === null) {
              // add that square to moves list
              model.addSquareToMovesList(list, square, [[secondDiagonalX, secondDiagonalY]], 0);
            }
          } else if (list[`${rightDiagonalX},${rightDiagonalY}`] === otherPlayer) {
            // rightDiagonal has an enemy piece on it
            let secondDiagonalY;
            let secondDiagonalX = rightDiagonalX + 1

            if (pieceColor === 'red') {
              secondDiagonalY = rightDiagonalY - 1;
            } else {
              secondDiagonalY = rightDiagonalY + 1;
            }

            // if right diagonal from the enemy square is empty
            if (list[`${secondDiagonalX},${secondDiagonalY}`] === null) {
              // add that square to moves list
              model.addSquareToMovesList(list, square, [[secondDiagonalX, secondDiagonalY]], 0);
            }
          }
          else {
            // this diagonal contains a friendly piece, so can't move here
          }
        }
      }
    }
    return list; // the function that accepts this list will call setState and update the React state
  }
};