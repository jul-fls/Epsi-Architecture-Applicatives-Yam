const init = require('./init');

const tokens = {
    checkAvailablePlayerTokens: (gameState) => {
      TokensOnGridForPlayers = {
        player1: 0,
        player2: 0,
      };

      TokensOnGridForPlayers.player1 = gameState.grid.reduce((acc, row) => {
        return acc + row.filter((cell) => cell.owner === "player:1").length;
      }, 0);

      TokensOnGridForPlayers.player2 = gameState.grid.reduce((acc, row) => {
        return acc + row.filter((cell) => cell.owner === "player:2").length;
      }, 0);

      AvailableTokensForPlayers = {
        player1: init.MAX_TOKENS() - TokensOnGridForPlayers.player1,
        player2: init.MAX_TOKENS() - TokensOnGridForPlayers.player2,
      };
      gameState.player1Tokens = AvailableTokensForPlayers.player1;
      gameState.player2Tokens = AvailableTokensForPlayers.player2;
      if (
        AvailableTokensForPlayers.player1 === 0 ||
        AvailableTokensForPlayers.player2 === 0
      ) {
        return false;
      } else {
        return true;
      }
    },
}

module.exports = tokens;