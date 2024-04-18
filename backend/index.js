const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
var uniqid = require("uniqid");
const GameService = require("./services/game.services");

// ---------------------------------------------------
// -------- CONSTANTS AND GLOBAL VARIABLES -----------
// ---------------------------------------------------

let queue = [];
let games = [];

// ---------------------------------
// -------- GAME METHODS -----------
// ---------------------------------

const emitGameStart = (game) => {
  game.player1Socket.emit(
    "game.start",
    GameService.send.forPlayer.gameViewState("player:1", game)
  );
  game.player2Socket.emit(
    "game.start",
    GameService.send.forPlayer.gameViewState("player:2", game)
  );
};

const updateClientViewTimers = (game) => {
  game.player1Socket.emit(
    "game.timer",
    GameService.send.forPlayer.gameTimer("player:1", game.gameState)
  );
  game.player2Socket.emit(
    "game.timer",
    GameService.send.forPlayer.gameTimer("player:2", game.gameState)
  );
};

const updateClientViewDecks = (game) => {
  setTimeout(() => {
    game.player1Socket.emit(
      "game.deck.view-state",
      GameService.send.forPlayer.deckViewState("player:1", game.gameState)
    );
    console.log("game.gameState: ", game.gameState);
    game.player2Socket.emit(
      "game.deck.view-state",
      GameService.send.forPlayer.deckViewState("player:2", game.gameState)
    );
  }, 200);
};

const updateGameInterval = (game) => {
  game.gameState.timer--;

  // Si le timer tombe à zéro
  if (game.gameState.timer === 0) {
    // On change de tour en inversant le clé dans 'currentTurn'
    game.gameState.currentTurn =
      game.gameState.currentTurn === "player:1" ? "player:2" : "player:1";

    // Méthode du service qui renvoie la constante 'TURN_DURATION'
    game.gameState.timer = GameService.timer.getTurnDuration();

    // On remet le compteur de lancer de dés à zéro
    game.gameState.deck = GameService.init.deck();
    updateClientViewDecks(game);
  }

  // On notifie finalement les clients que les données sont mises à jour.
  updateClientViewTimers(game);
};

const newPlayerInQueue = (socket) => {
  queue.push(socket);

  // Queue management
  if (queue.length >= 2) {
    const player1Socket = queue.shift();
    const player2Socket = queue.shift();
    createGame(player1Socket, player2Socket);
  } else {
    socket.emit("queue.added", GameService.send.forPlayer.viewQueueState());
  }
};

const createGame = (player1Socket, player2Socket) => {
  const newGame = GameService.init.gameState();
  newGame["idGame"] = uniqid();
  newGame["player1Socket"] = player1Socket;
  newGame["player2Socket"] = player2Socket;

  games.push(newGame);

  const gameIndex = GameService.utils.findGameIndexById(games, newGame.idGame);
  const game = games[gameIndex];

  // On execute une fonction toutes les secondes (1000 ms)
  const gameInterval = setInterval(() => updateGameInterval(game), 1000);

  // Send game start event to players
  emitGameStart(game);
  updateClientViewDecks(game);

  // On prévoit de couper l'horloge
  // pour le moment uniquement quand le socket se déconnecte
  player1Socket.on("disconnect", () => {
    clearInterval(gameInterval);
  });

  player2Socket.on("disconnect", () => {
    clearInterval(gameInterval);
  });
};

const leaveQueue = (socket) => {
  console.log("queue before: ", queue);
  const index = queue.indexOf(socket);
  if (index > -1) {
    queue.splice(index, 1);
  }
  console.log("queue after: ", queue);

  socket.emit("queue.removed", GameService.send.forPlayer.viewQueueState());
};

// ---------------------------------------
// -------- SOCKETS MANAGEMENT -----------
// ---------------------------------------

io.on("connection", (socket) => {
  console.log(`[${socket.id}] socket connected`);

  socket.on("queue.join", () => {
    console.log(`[${socket.id}] new player in queue `);
    newPlayerInQueue(socket);
  });

  socket.on("queue.leave", () => {
    console.log(`[${socket.id}] player leave the queue`);
    leaveQueue(socket);
  });

  socket.on("game.dices.roll", () => {
    const gameIndex = GameService.utils.findGameIndexBySocketId(
      games,
      socket.id
    );

    let rollsCounter = games[gameIndex].gameState.deck.rollsCounter;
    let rollsMaximum = games[gameIndex].gameState.deck.rollsMaximum;
    let oldDices = games[gameIndex].gameState.deck.dices;

    games[gameIndex].gameState.deck.dices = GameService.dices.roll(oldDices);
    games[gameIndex].gameState.deck.rollsCounter++;

    if (rollsCounter === rollsMaximum) {
      games[gameIndex].gameState.deck.lockedDices =
        GameService.dices.lockEveryDice(oldDices);

      games[gameIndex].gameState.timer = 5;
    }
    updateClientViewDecks(games[gameIndex]);
  });

  socket.on("game.dices.lock", (idDice) => {
    const gameIndex = GameService.utils.findGameIndexBySocketId(
      games,
      socket.id
    );
    const diceIndex = GameService.utils.findDiceIndexByDiceId(
      games[gameIndex].gameState.deck.dices,
      idDice
    );

    games[gameIndex].gameState.deck.dices[diceIndex].locked =
      !games[gameIndex].gameState.deck.dices[diceIndex].locked;

    updateClientViewDecks(games[gameIndex]);
  });

  socket.on("disconnect", (reason) => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
  });
});

// -----------------------------------
// -------- SERVER METHODS -----------
// -----------------------------------

app.get("/", (req, res) => res.sendFile("index.html"));

http.listen(3000, function () {
  console.log("listening on *:3000");
});
