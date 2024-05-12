// bot.js

const io = require("socket.io-client");
let socket = null;
var data2;

var currentTurn;
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
    });

    socket.on("game.change-turn", (gameState) => {
        if (gameState.currentTurn === "player:2") {
            console.log("Bot's turn to play");
            currentTurn = gameState.currentTurn;
            performBotActions(gameState);
        }
    });

    socket.onAny((eventName, ...args) => {
        console.log("Bot received message:", eventName, args);
    });

    socket.on("game.choices.view-state", (data) => {
        if(currentTurn === "player:2"){
            console.log("Bot received game.choices.view-state", data);
            decideAction(data);
        }
    });

    socket.on("game.grid-view-state", (data) => {
        
        data2 = data;
        console.log("Bot received game.grid-view-state", data);
        // select the first cell that is "canbechecked" : true and owner is null
        const grid = data2.grid;
        let selectedCell = null;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j].canbechecked && grid[i][j].owner === null) {
                    selectedCell = grid[i][j];
                    break;
                }
            }
        }
        // i need to send this 42["game.grid.selected",{"cellId":"brelan5","rowIndex":4,"cellIndex":3}]
        socket.emit("game.grid.selected", {
            cellId: selectedCell.id,
            rowIndex: selectedCell.rowIndex,
            cellIndex: selectedCell.cellIndex,
        });
    });

        

    return socket;
}

function stopBot() {
    if (socket) {
        socket.disconnect();
        console.log("Bot disconnected");
    }
}

function performBotActions() {
    setTimeout(() => {
    console.log("Bot is rolling dices");
    socket.emit("game.dices.roll");
    }, 3000);
}

function decideAction(data) {
    console.log("Bot is deciding the next move, current gameState :", data);
    // Bot will always choose the first choice that has property "enabled: true"
    // here is an example 42["game.choices.view-state",{"displayChoices":true,"canMakeChoice":true,"idSelectedChoice":null,"availableChoices":[]}]
    const enabledChoices = data.availableChoices.filter((choice) => choice.enabled);
    if (enabledChoices.length > 0) {
        console.log("Bot is choosing the first enabled choice", enabledChoices[0]);
        socket.emit("game.choices.selected", enabledChoices[0].id);
    } else {
        console.log("No choices available for the bot");
        // socket.emit("game.dices.roll");
    }

}

module.exports = { startBot, stopBot };
