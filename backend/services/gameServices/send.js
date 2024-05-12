const grid = require("./grid");

const send = {
  forPlayer: {
    // Return conditionnaly gameState custom objet for player views
    gameViewState: (playerKey, game) => {
      return {
        inQueue: false,
        inGame: true,
        idPlayer:
          playerKey === "player:1"
            ? game.player1Socket.id
            : game.player2Socket.id,
        idOpponent:
          playerKey === "player:1"
            ? game.player2Socket.id
            : game.player1Socket.id,
      };
    },

    choicesViewState: (playerKey, gameState) => {
      const chociesViewState = {
        displayChoices: true,
        canMakeChoice: playerKey === gameState.currentTurn,
        idSelectedChoice: gameState.choices.idSelectedChoice,
        availableChoices: gameState.choices.availableChoices,
      };
      return chociesViewState;
    },

    gridViewState: (playerKey, game) => {
      // set canBeChecked to true to cells that has owner to null and the id matches the selected choice
      const updatedGrid = grid.updateGridAfterSelectingChoice(
        game.gameState.choices.idSelectedChoice,
        game.gameState.grid
      );

      return {
        displayGrid: true,
        canSelectCells:
          playerKey === game.gameState.currentTurn &&
          game.gameState.choices.availableChoices.length > 0,
        grid: updatedGrid,
        // use this findPlayerIdBySocketId to get the player key by socket id
        socketIdPlayer1: game.player1Socket.id,
        socketIdPlayer2: game.player2Socket.id,
      };
    },
    viewQueueState: () => {
      return {
        inQueue: true,
        inGame: false,
      };
    },
    gameTimer: (playerKey, gameState) => {
      // Selon la clé du joueur on adapte la réponse (player / opponent)
      const playerTimer =
        gameState.currentTurn === playerKey ? gameState.timer : 0;
      const opponentTimer =
        gameState.currentTurn === playerKey ? 0 : gameState.timer;
      return { playerTimer: playerTimer, opponentTimer: opponentTimer };
    },
    deckViewState: (playerKey, gameState) => {
      const deckViewState = {
        displayPlayerDeck: gameState.currentTurn === playerKey,
        displayOpponentDeck: gameState.currentTurn !== playerKey,
        displayRollButton:
          gameState.deck.rollsCounter <= gameState.deck.rollsMaximum,
        rollsCounter: gameState.deck.rollsCounter,
        rollsMaximum: gameState.deck.rollsMaximum,
        dices: gameState.deck.dices,
      };
      return deckViewState;
    },
    choicesViewState: (playerKey, gameState) => {
      const choicesViewState = {
        displayChoices: true,
        canMakeChoice: playerKey === gameState.currentTurn,
        idSelectedChoice: gameState.choices.idSelectedChoice,
        availableChoices: gameState.choices.availableChoices,
      };
      return choicesViewState;
    },

    playerAndOppnonentInfosState: (playerKey, gameState) => {
      // i want to return the player and opponent infos about score and remaining tokens
      const playerInfos = {
        score:
          playerKey === "player:1"
            ? gameState.player1Score
            : gameState.player2Score,
        tokens:
          playerKey === "player:1"
            ? gameState.player1Tokens
            : gameState.player2Tokens,
        playerKey: playerKey,
      };
      const opponentInfos = {
        score:
          playerKey === "player:1"
            ? gameState.player2Score
            : gameState.player1Score,
        tokens:
          playerKey === "player:1"
            ? gameState.player2Tokens
            : gameState.player1Tokens,
        playerKey: playerKey === "player:1" ? "player:2" : "player:1",
      };
      return { playerInfos: playerInfos, opponentInfos: opponentInfos };
    },

    victoryState: (gameResult) => {
      console.log("gameResult", gameResult);
      // return a json object "gameInfos" with all the inside infos of GameResult
      const gameInfos = {
        gameDuration: gameResult.gameDuration,
        winner: gameResult.winner,
        loser: gameResult.loser,
        gameType: gameResult.gameType,
        winnerUsedTokens: gameResult.winnerUsedTokens,
        loserUsedTokens: gameResult.loserUsedTokens,
        winnerScore: gameResult.winnerScore,
        loserScore: gameResult.loserScore,
        victoryType: gameResult.victoryType,
      };
      return { gameInfos: gameInfos };
    },
  },
};

module.exports = send;
