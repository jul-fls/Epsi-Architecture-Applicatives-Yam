const init = require("./init");
const tokens = require("./tokens");

const victory = {
    checkVictory: (gameState) => {
      let horizontalWinner = victory.checkVictoryHorizontal(gameState.grid);
      let verticalWinner = victory.checkVictoryVertical(gameState.grid);
      let diagonalWinner = victory.checkVictoryDiagonal(gameState.grid);
      // to check if the victory type is alignment, one of the three checks must return a winner different than null
      let victoryType = null;
      if ((horizontalWinner != null) || (verticalWinner != null) || (diagonalWinner != null)) {
        victoryType = "alignment";
      }
      let winner;
      if (victoryType === "alignment") {
        winner = horizontalWinner || verticalWinner || diagonalWinner;
        console.log("The winner is: ", winner);
      }
      const playersHaveRemainingTokens = tokens.checkAvailablePlayerTokens(gameState);
      if (!playersHaveRemainingTokens) {
        console.log("The game is over, no more tokens available");
        victoryType = "score";
        let scoreWinner = victory.checkScores(gameState);
        console.log("winner (in checkVictory): ", scoreWinner);
        winner = scoreWinner;
      }

      if (winner != null) {
        if(winner !== "draw"){
          winner = winner.split(":")[1];
          gameState.gameEndTime = Date.now();
          gameDurationTimestamp = gameState.gameEndTime - gameState.gameStartTime;
          gameDuration = new Date(gameDurationTimestamp).toISOString().substr(11, 8);
          console.log("Game duration (in victory.js): ", gameDuration);
          loser = winner === "1" ? "2" : "1";
          gameType = gameState.gameType;
          winnerUsedTokens = init.MAX_TOKENS() - gameState[`player${winner}Tokens`];
          loserUsedTokens = init.MAX_TOKENS() - gameState[`player${loser}Tokens`];
          winnerScore = gameState[`player${winner}Score`];
          loserScore = gameState[`player${loser}Score`];
          if (victoryType === "alignment") {
            winnerScore = null;
            loserScore = null;
          }
          const gameResult = {
            gameType,
            gameDuration,
            winner,
            loser,
            winnerUsedTokens,
            loserUsedTokens,
            winnerScore,
            loserScore,
            victoryType,
          };
          return gameResult;
        }else if(winner === "draw"){
          winner = "draw",
          gameState.gameEndTime = Date.now();
          gameDurationTimestamp = gameState.gameEndTime - gameState.gameStartTime;
          gameDuration = new Date(gameDurationTimestamp).toISOString().substr(11, 8);
          loser = "draw";
          gameType = gameState.gameType;
          winnerUsedTokens = init.MAX_TOKENS() - gameState[`player1Tokens`];
          loserUsedTokens = init.MAX_TOKENS() - gameState[`player2Tokens`];
          winnerScore = gameState[`player1Score`];
          loserScore = gameState[`player2Score`];
          if (victoryType === "alignment") {
            winnerScore = null;
            loserScore = null;
          }

          const gameResult = {
            gameType,
            gameDuration,
            winner,
            loser,
            winnerUsedTokens,
            loserUsedTokens,
            winnerScore,
            loserScore,
            victoryType
          };
          return gameResult;
        }
        }else{
          const gameResult = {
            gameType: null,
            gameDuration: null,
            winner: null,
            loser: null,
            winnerUsedTokens: null,
            loserUsedTokens: null,
            winnerScore: null,
            loserScore: null,
            victoryType: null,
          };
          return gameResult;
      }
    },
    checkScores: (gameState) => {
      let player1Score = gameState.player1Score;
      let player2Score = gameState.player2Score;
      let winner = null;
      if (player1Score > player2Score) {
        winner = "player:1";
        console.log("The winner is player 1");
      } else if (player1Score < player2Score) {
        winner = "player:2";
        console.log("The winner is player 2");
      } else {
        winner = "draw";
        console.log("It's a draw");
      }
      console.log("winner (in checkScores): ", winner)
      return winner;
    },
    checkVictoryHorizontal: (grid) => {
      let winner = null;
      const isPlayer1Winner = grid.some((row) =>
        row.every((cell) => cell.owner === "player:1")
      );

      const isPlayer2Winner = grid.some((row) =>
        row.every((cell) => cell.owner === "player:2")
      );
      
      if (isPlayer1Winner) {
        console.log("(Horizontal) player 1 is the winner");
        winner = "player:1";
        return winner;
      }

      if (isPlayer2Winner) {
        console.log("(Horizontal) player 2 is the winner");
        winner = "player:2";
        return winner;
      }
    },
    checkVictoryVertical: (grid) => {
      let winner = null;
      const isPlayer1Winner = grid[0]
        .map((_, col) => grid.every((row) => row[col].owner === "player:1"))
        .some(Boolean);

      const isPlayer2Winner = grid[0]
        .map((_, col) => grid.every((row) => row[col].owner === "player:2"))
        .some(Boolean);

      if (isPlayer1Winner) {
        console.log("(Vertical) player 1 is the winner");
        winner = "player:1";
        return winner;
      }

      if (isPlayer2Winner) {
        console.log("(Vertical) player 2 is the winner");
        winner = "player:2";
      }
    },
    checkVictoryDiagonal: (grid) => {
      let winner = null;
      // Check for diagonal from top left to bottom right
      const isPlayer1WinnerFirstDiagonal = grid
        .map((row, index) => row[index])
        .every((cell) => cell.owner === "player:1");
      const isPlayer2WinnerFirstDiagonal = grid
        .map((row, index) => row[index])
        .every((cell) => cell.owner === "player:2");

      if (isPlayer1WinnerFirstDiagonal) {
        console.log("(Diagonal) player 1 is the winner");
        winner = "player:1";
        return winner;
      }

      if (isPlayer2WinnerFirstDiagonal) {
        console.log("(Diagonal) player 2 is the winner");
        winner = "player:2";
        return winner;
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
        winner = "player:1";
        return winner;
      }

      if (isPlayer2WinnerSecondDiagonal) {
        console.log("player 2 is the winner");
        winner = "player:2";
        return winner;
      }
    },
}

module.exports = victory;