const TURN_DURATION = 30;

const GAME_INIT = {
  gameState: {
    currentTurn: "player:1",
    timer: TURN_DURATION,
    player1Score: 0,
    player2Score: 0,
    grid: [],
    choices: {},
    deck: {},
  },
};

const GameService = {
  init: {
    // Init first level of structure of 'gameState' object
    gameState: () => {
      return GAME_INIT;
    },
  },
  send: {
    forPlayer: {
      // Return conditionnaly gameState custom objet for player views
      viewGameState: (playerKey, game) => {
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
    },
  },
  timer: {
    getTurnDuration: () => {
      return TURN_DURATION;
    },
  },
  utils: {
    // Return game index in global games array by id
    findGameIndexById: (games, idGame) => {
      for (let i = 0; i < games.length; i++) {
        if (games[i].idGame === idGame) {
          return i; // Retourne l'index du jeu si le socket est trouvé
        }
      }
      return -1;
    },
  },
};
module.exports = GameService;
