// bot.js

const io = require("socket.io-client");
let socket = null;

function startBot() {
    socket = io("http://localhost:3000", {
        autoConnect: true,
    });

    socket.on("connect", () => {
        console.log("Bot connected as Player 2 with ID:", socket.id);
        // socket.emit("queue.join", "bot");
        socket.emit(
            "test-bot",
            "Hello, I am a bot. I am ready to play!"
        )
    });

    socket.on("game.start", (gameViewState) => {
        console.log("Game started", gameViewState);
        console.log("Bot is in game with Player 1:", gameViewState.idOpponent);
        // performBotActions(); // Adjust function to manage actions
    });

    function performBotActions() {
        setTimeout(() => {
        console.log("Bot is rolling dices");
        socket.emit("game.dices.roll");
        }, 3000);
    }

    socket.on("game.change-turn", (gameState) => {
        if (gameState.currentTurn === "player:2") {
            console.log("Bot's turn to play");
            performBotActions(gameState);
        }
    });

    function decideAction(gameState) {
        console.log("Bot is deciding the next move, current gameState :", gameState);
    }

    socket.onAny((eventName, ...args) => {
        console.log("Bot received message:", eventName, args);
    });

    return socket;
}

function stopBot() {
    if (socket) {
        socket.disconnect();
        console.log("Bot disconnected");
    }
}

module.exports = { startBot, stopBot };
