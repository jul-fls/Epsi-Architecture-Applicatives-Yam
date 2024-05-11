const victory = {
    checkVictoryHorizontal: (grid) => {
      const isPlayer1Winner = grid.some((row) =>
        row.every((cell) => cell.owner === "player:1")
      );

      const isPlayer2Winner = grid.some((row) =>
        row.every((cell) => cell.owner === "player:2")
      );

      if (isPlayer1Winner) {
        console.log("(Horizontal) player 1 is the winner");
        return;
      }

      if (isPlayer2Winner) {
        console.log("(Horizontal) player 2 is the winner");
        return;
      }
    },
    checkVictoryVertical: (grid) => {
      const isPlayer1Winner = grid[0]
        .map((_, col) => grid.every((row) => row[col].owner === "player:1"))
        .some(Boolean);

      const isPlayer2Winner = grid[0]
        .map((_, col) => grid.every((row) => row[col].owner === "player:2"))
        .some(Boolean);

      if (isPlayer1Winner) {
        console.log("(Vertical) player 1 is the winner");
        return;
      }

      if (isPlayer2Winner) {
        console.log("(Vertical) player 2 is the winner");
        return;
      }
    },
    checkVictoryDiagonal: (grid) => {
      // Check for diagonal from top left to bottom right
      const isPlayer1WinnerFirstDiagonal = grid
        .map((row, index) => row[index])
        .every((cell) => cell.owner === "player:1");
      const isPlayer2WinnerFirstDiagonal = grid
        .map((row, index) => row[index])
        .every((cell) => cell.owner === "player:2");

      if (isPlayer1WinnerFirstDiagonal) {
        console.log("(Diagonal) player 1 is the winner");
        return;
      }

      if (isPlayer2WinnerFirstDiagonal) {
        console.log("(Diagonal) player 2 is the winner");
        return;
      }

      // Check for diagonal from top right to bottom left
      const isPlayer1WinnerSecondDiagonal = grid
        .map((row, index) => row[grid.length - index - 1])
        .every((cell) => cell.owner === "player:1");
      const isPlayer2WinnerSecondDiagonal = grid
        .map((row, index) => row[grid.length - index - 1])
        .every((cell) => cell.owner === "player:2");

      if (isPlayer1WinnerSecondDiagonal) {
        console.log("player 1 is the winner");
        return;
      }

      if (isPlayer2WinnerSecondDiagonal) {
        console.log("player 2 is the winner");
        return;
      }
    },
}

module.exports = victory;