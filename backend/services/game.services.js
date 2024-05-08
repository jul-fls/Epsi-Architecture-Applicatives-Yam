const TURN_DURATION = 30;
const MAX_TOKENS = 30;
const DECK_INIT = {
  dices: [
    { id: 1, value: "", locked: true },
    { id: 2, value: "", locked: true },
    { id: 3, value: "", locked: true },
    { id: 4, value: "", locked: true },
    { id: 5, value: "", locked: true },
  ],
  rollsCounter: 1,
  rollsMaximum: 3,
};

const GAME_INIT = {
  gameState: {
    currentTurn: "player:1",
    timer: TURN_DURATION,
    player1Count: 0,
    player2Count: 0,
    player1Score: 0,
    player2Score: 0,
    player1Tokens: MAX_TOKENS,
    player2Tokens: MAX_TOKENS,
    grid: [],
    choices: {},
    deck: {},
  },
};

const CHOICES_INIT = {
  isDefi: false,
  isSec: false,
  idSelectedChoice: null,
  availableChoices: [],
};

const ALL_COMBINATIONS = [
  { value: "Brelan 1", id: "brelan1" },
  { value: "Brelan 2", id: "brelan2" },
  { value: "Brelan 3", id: "brelan3" },
  { value: "Brelan 4", id: "brelan4" },
  { value: "Brelan 5", id: "brelan5" },
  { value: "Brelan 6", id: "brelan6" },
  { value: "Full", id: "full" },
  { value: "Carré", id: "carre" },
  { value: "Yam", id: "yam" },
  { value: "Suite", id: "suite" },
  { value: "≤8", id: "moinshuit" },
  { value: "Sec", id: "sec" },
  { value: "Défi", id: "defi" },
];

const GRID_INIT = [
  [
    { viewContent: "1", id: "brelan1", owner: null, canBeChecked: false },
    { viewContent: "3", id: "brelan3", owner: null, canBeChecked: false },
    { viewContent: "Défi", id: "defi", owner: null, canBeChecked: false },
    { viewContent: "4", id: "brelan4", owner: null, canBeChecked: false },
    { viewContent: "6", id: "brelan6", owner: null, canBeChecked: false },
  ],
  [
    { viewContent: "2", id: "brelan2", owner: null, canBeChecked: false },
    { viewContent: "Carré", id: "carre", owner: null, canBeChecked: false },
    { viewContent: "Sec", id: "sec", owner: null, canBeChecked: false },
    { viewContent: "Full", id: "full", owner: null, canBeChecked: false },
    { viewContent: "5", id: "brelan5", owner: null, canBeChecked: false },
  ],
  [
    { viewContent: "≤8", id: "moinshuit", owner: null, canBeChecked: false },
    { viewContent: "Full", id: "full", owner: null, canBeChecked: false },
    { viewContent: "Yam", id: "yam", owner: null, canBeChecked: false },
    { viewContent: "Défi", id: "defi", owner: null, canBeChecked: false },
    { viewContent: "Suite", id: "suite", owner: null, canBeChecked: false },
  ],
  [
    { viewContent: "6", id: "brelan6", owner: null, canBeChecked: false },
    { viewContent: "Sec", id: "sec", owner: null, canBeChecked: false },
    { viewContent: "Suite", id: "suite", owner: null, canBeChecked: false },
    { viewContent: "≤8", id: "moinshuit", owner: null, canBeChecked: false },
    { viewContent: "1", id: "brelan1", owner: null, canBeChecked: false },
  ],
  [
    { viewContent: "3", id: "brelan3", owner: null, canBeChecked: false },
    { viewContent: "2", id: "brelan2", owner: null, canBeChecked: false },
    { viewContent: "Carré", id: "carre", owner: null, canBeChecked: false },
    { viewContent: "5", id: "brelan5", owner: null, canBeChecked: false },
    { viewContent: "4", id: "brelan4", owner: null, canBeChecked: false },
  ],
];

const GameService = {
  init: {
    // Init first level of structure of 'gameState' object
    gameState: () => {
      const game = { ...GAME_INIT };
      game["gameState"]["timer"] = TURN_DURATION;
      game["gameState"]["deck"] = { ...DECK_INIT };
      game["gameState"]["choices"] = { ...CHOICES_INIT };
      game["gameState"]["grid"] = [...GRID_INIT];
      return game;
    },
    grid: () => {
      return { ...GRID_INIT };
    },
    deck: () => {
      return { ...DECK_INIT };
    },
    choices: () => {
      return { ...CHOICES_INIT };
    },
  },

  timer: {
    getTurnDuration: () => {
      return TURN_DURATION;
    },
  },

  dices: {
    roll: (dicesToRoll) => {
      const rolledDices = dicesToRoll.map((dice) => {
        if (dice.value === "") {
          // Si la valeur du dé est vide, alors on le lance en mettant le flag locked à false
          const newValue = String(Math.floor(Math.random() * 6) + 1);
          return {
            id: dice.id,
            value: newValue,
            locked: false,
          };
        } else if (!dice.locked) {
          // Si le dé n'est pas verrouillé et possède déjà une valeur, alors on le relance
          const newValue = String(Math.floor(Math.random() * 6) + 1);
          return {
            ...dice,
            value: newValue,
          };
        } else {
          // Si le dé est verrouillé ou a déjà une valeur mais le flag locked est true, on le laisse tel quel
          return dice;
        }
      });
      return rolledDices;
    },
    lockEveryDice: (dicesToLock) => {
      const lockedDices = dicesToLock.map((dice) => ({
        ...dice,
        locked: true,
      }));
      return lockedDices;
    },
  },

  send: {
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
        const updatedGrid = GameService.grid.updateGridAfterSelectingChoice(
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
    },
  },

  choices: {
    findCombinations: (dices, isDefi, isFirstRoll) => {
      const allCombinations = ALL_COMBINATIONS;
      const availableCombinations = [];
      const counts = Array(7).fill(0); // Counts for dice values from 1 to 6
      let sum = 0;

      // Count dice values and calculate the total sum
      dices.forEach((dice) => {
        const value = parseInt(dice.value);
        counts[value]++;
        sum += value;
      });

      // -------------------------------- //
      // CHECK Combination -------------- //
      // -------------------------------- //

      // -------------------------------- //
      // (1) Brelan
      // -------------------------------- //
      const hasThreeOfAKind = counts.some((count) => count === 3);

      // -------------------------------- //
      // (2) Pairs (Not used in the game but in full)
      // -------------------------------- //
      const hasPair = counts.some((count) => count === 2);

      // -------------------------------- //
      // (3) Carré
      // -------------------------------- //
      const hasFourOfAKind = counts.some((count) => count >= 4);

      // -------------------------------- //
      // (4) Yam
      // -------------------------------- //
      const yam = counts.some((count) => count === 5);

      // -------------------------------- //
      // (5) Suite
      // -------------------------------- //
      const hasStraight =
        counts.slice(1, 6).every((count) => count >= 1) ||
        counts.slice(2, 7).every((count) => count >= 1); // Check for sequences 1-2-3-4-5 or 2-3-4-5-6

      // -------------------------------- //
      // (6) ≤8
      // -------------------------------- //
      const isLessThanEqual8 = sum <= 8;

      // -------------------------------- //
      // (7) Full
      // -------------------------------- //
      let full = false;
      if (hasThreeOfAKind && hasPair) {
        const threeOfAKindValue = counts.findIndex((count) => count === 3);
        const pairValue = counts.findIndex((count) => count === 2);
        full = threeOfAKindValue !== pairValue;
      }

      // Determine available combinations based on the current state of the dices
      allCombinations.forEach((combination) => {
        if (
          (combination.id.startsWith("brelan") &&
            counts[parseInt(combination.id.slice(-1))] >= 3) ||
          (combination.id === "full" && full) ||
          (combination.id === "carre" && hasFourOfAKind) ||
          (combination.id === "yam" && yam) ||
          (combination.id === "suite" && hasStraight) ||
          (combination.id === "moinshuit" && isLessThanEqual8) ||
          (combination.id === "defi" && isDefi)
        ) {
          availableCombinations.push(combination);
        }
      });

      // -------------------------------- //
      // (8) Sec
      // -------------------------------- //
      if (isFirstRoll) {
        const nonBrelanCombinations = availableCombinations.filter(
          (combination) => !combination.id.startsWith("brelan")
        );
        if (nonBrelanCombinations.length > 0) {
          availableCombinations.push({ id: "sec", value: "Sec" });
        }
      }

      // return availableCombinations;
      return [
        { value: "Yam", id: "yam" },
        { value: "≤8", id: "moinshuit" },
        { value: "Brelan 1", id: "brelan1" },
        { value: "Brelan 2", id: "brelan2" },
        { value: "Full", id: "full" },
        { value: "Suite", id: "suite" },
        { value: "Brelan 4", id: "brelan4" },
        { value: "Brelan 5", id: "brelan5" },
        { value: "Carré", id: "carre" },
      ];
      // return [
      //   { value: "Brelan 1", id: "brelan1" },
      //   { value: "Brelan 3", id: "brelan3" },
      //   { value: "Défi", id: "defi" },
      //   { value: "Brelan 4", id: "brelan4" },
      //   { value: "Brelan 6", id: "brelan6" },
      // ];
    },

    filterChoicesEnabler: (grid, combinations) => {
      combinations.map((combination) => {
        // Check if any row has at least one cell that can use this combination
        const isCombinationUsable = grid.some((row, rowIndex) => {
          return row.some((cell) => {
            return cell.id === combination.id && cell.owner === null;
          });
        });

        // Set the combination enabled property based on the result
        combination.enabled = isCombinationUsable;
      });
      return combinations;
    },
  },

  grid: {
    resetcanBeCheckedCells: (grid) => {
      const updatedGrid = grid.map((row) =>
        row.map((cell) => ({ ...cell, canBeChecked: false }))
      );

      return updatedGrid;
    },

    updateGridAfterSelectingChoice: (idSelectedChoice, grid) => {
      const updatedGrid = grid.map((row) =>
        row.map((cell) =>
          cell.id === idSelectedChoice && cell.owner === null
            ? { ...cell, canBeChecked: true }
            : cell
        )
      );
      return updatedGrid;
    },

    selectCell: (idCell, rowIndex, cellIndex, currentTurn, grid) => {
      const updatedGrid = grid.map((row, rowIndexGrid) =>
        row.map((cell, cellIndexGrid) =>
          rowIndexGrid === rowIndex && cellIndexGrid === cellIndex
            ? { ...cell, owner: currentTurn }
            : cell
        )
      );

      return updatedGrid;
    },
  },

  tokens: {
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
        player1: MAX_TOKENS - TokensOnGridForPlayers.player1,
        player2: MAX_TOKENS - TokensOnGridForPlayers.player2,
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
  },

  score: {
    // TODO : Implement the score calculation (total)
    // calculateScoreTotal: (scoreHorizontal, scoreVertical, scoreDiagnol) => {
    //   // Calculate the total score for each player
    //   const totalScore = {
    //     "player:1":
    //       scoreHorizontal["player:1"] +
    //       scoreVertical["player:1"] +
    //       scoreDiagnol["player:1"],
    //     "player:2":
    //       scoreHorizontal["player:2"] +
    //       scoreVertical["player:2"] +
    //       scoreDiagnol["player:2"],
    //   };

    //   console.log("total score : ", totalScore);
    // },

    calculateScoreHorizontal: (gameState, grid, consecutiveNeeded) => {
      // Initialize consecutive counts with gameState values
      let consecutiveCount = {
        "player:1": gameState.player1Count,
        "player:2": gameState.player2Count,
      };

      GameService.victory.checkVictoryHorizontal(grid);

      for (let row = 0; row < grid.length; row++) {
        for (
          let col = 0;
          col < grid[row].length - (consecutiveNeeded - 1);
          col++
        ) {
          // Check if the cell has an owner
          if (grid[row][col].owner) {
            // Check if the owner is player 1
            if (grid[row][col].owner === "player:1") {
              // Check if the row is at the end of the grid
              if (col === grid[row].length - consecutiveNeeded) {
                if (
                  // For example : [0,2], [0,3], [0,4]
                  grid[row][col].owner === grid[row][col + 1].owner &&
                  grid[row][col + 1].owner === grid[row][col + 2].owner
                ) {
                  consecutiveCount["player:1"] = 1;
                }
              } else {
                if (
                  // For example : [0,0], [0,1], [0,2], [0,3] // [0,1], [0,2], [0,3], [0,4]
                  grid[row][col].owner === grid[row][col + 1].owner &&
                  grid[row][col + 1].owner === grid[row][col + 2].owner &&
                  grid[row][col + 2].owner === grid[row][col + 3].owner
                ) {
                  consecutiveCount["player:1"] = 2;
                  break;
                }
                if (
                  // For example : [0,0], [0,1], [0,2] // [0,1], [0,2], [0,3]
                  grid[row][col].owner === grid[row][col + 1].owner &&
                  grid[row][col + 1].owner === grid[row][col + 2].owner
                ) {
                  consecutiveCount["player:1"] = 1;
                }
              }
              // Check if the owner is player 2
            } else {
              // Check if the row is at the end of the grid

              // In yam case, col == 2 (consecutiveNeeded = 3)
              if (col === grid[row].length - consecutiveNeeded) {
                if (
                  // For example : [0,2], [0,3], [0,4]
                  grid[row][col].owner === grid[row][col + 1].owner &&
                  grid[row][col + 1].owner === grid[row][col + 2].owner
                ) {
                  consecutiveCount["player:2"] = 1;
                }
              } else {
                // For example : [0,0], [0,1], [0,2], [0,3] // [0,1], [0,2], [0,3], [0,4]
                if (
                  grid[row][col].owner === grid[row][col + 1].owner &&
                  grid[row][col + 1].owner === grid[row][col + 2].owner &&
                  grid[row][col + 2].owner === grid[row][col + 3].owner
                ) {
                  consecutiveCount["player:2"] = 2;
                  break;
                }
                // For example : [0,0], [0,1], [0,2] // [0,1], [0,2], [0,3]
                if (
                  grid[row][col].owner === grid[row][col + 1].owner &&
                  grid[row][col + 1].owner === grid[row][col + 2].owner
                ) {
                  consecutiveCount["player:2"] = 1;
                }
              }
            }
          }
        }
      }

      console.log("horizontal score : ", consecutiveCount);
    },
    calculateScoreVertical: (gameState, grid, consecutiveNeeded) => {
      let consecutiveCount = {
        "player:1": gameState.player1Count,
        "player:2": gameState.player2Count,
      };
      const gridColLength = grid[0].length;

      GameService.victory.checkVictoryVertical(grid);

      for (let col = 0; col < gridColLength; col++) {
        for (let row = 0; row < grid.length - (consecutiveNeeded - 1); row++) {
          //  Check if the cell has an owner
          if (grid[row][col].owner) {
            // Check if the owner is player 1
            if (grid[row][col].owner === "player:1") {
              // Check if the row is at the end of the grid
              // In yam case, row == 2 (consecutiveNeeded = 3)
              if (row === grid.length - consecutiveNeeded) {
                if (
                  // For example : [2,0], [3,0], [4,0]
                  grid[row][col].owner === grid[row + 1][col].owner &&
                  grid[row + 1][col].owner === grid[row + 2][col].owner
                ) {
                  consecutiveCount["player:1"] = 1;
                }
              } else {
                if (
                  // For example : [0,0], [1,0], [2,0], [3,0] // [1,0], [2,0], [3,0], [4,0]
                  grid[row][col].owner === grid[row + 1][col].owner &&
                  grid[row + 1][col].owner === grid[row + 2][col].owner &&
                  grid[row + 2][col].owner === grid[row + 3][col].owner
                ) {
                  consecutiveCount["player:1"] = 2;
                  break;
                }
                if (
                  // For example : [0,0], [1,0], [2,0] / [1,0], [2,0], [3,0]
                  grid[row][col].owner === grid[row + 1][col].owner &&
                  grid[row + 1][col].owner === grid[row + 2][col].owner
                ) {
                  consecutiveCount["player:1"] = 1;
                }
              }
              // Check if the owner is player 2
            } else {
              // Check if the row is at the end of the grid
              if (row === grid.length - consecutiveNeeded) {
                if (
                  // For example : [2,0], [3,0], [4,0]
                  grid[row][col].owner === grid[row + 1][col].owner &&
                  grid[row + 1][col].owner === grid[row + 2][col].owner
                ) {
                  consecutiveCount["player:2"] = 1;
                }
              } else {
                if (
                  // For example : [0,0], [1,0], [2,0], [3,0]
                  grid[row][col].owner === grid[row + 1][col].owner &&
                  grid[row + 1][col].owner === grid[row + 2][col].owner &&
                  grid[row + 2][col].owner === grid[row + 3][col].owner
                ) {
                  consecutiveCount["player:2"] = 2;
                  break;
                }
                if (
                  // For example : [0,0], [1,0], [2,0] / [1,0], [2,0], [3,0]
                  grid[row][col].owner === grid[row + 1][col].owner &&
                  grid[row + 1][col].owner === grid[row + 2][col].owner
                ) {
                  consecutiveCount["player:2"] = 1;
                }
              }
            }
          }
        }
      }

      console.log("vertical score : ", consecutiveCount);
    },
    calculateScoreDiagonal: (gameState, grid, consecutiveNeeded) => {
      let consecutiveCount = {
        "player:1": gameState.player1Count,
        "player:2": gameState.player2Count,
      };
      const gridColLength = grid[0].length;

      GameService.victory.checkVictoryDiagonal(grid);

      // 2) Check for diagonal from top right to bottom left
      console.log("diagonal score : ", consecutiveCount);
    },
  },

  victory: {
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

    findGameIndexBySocketId: (games, socketId) => {
      for (let i = 0; i < games.length; i++) {
        if (
          games[i].player1Socket.id === socketId ||
          games[i].player2Socket.id === socketId
        ) {
          return i; // Retourne l'index du jeu si le socket est trouvé
        }
      }
      return -1;
    },

    findDiceIndexByDiceId: (dices, idDice) => {
      for (let i = 0; i < dices.length; i++) {
        if (dices[i].id === idDice) {
          return i; // Retourne l'index du jeu si le socket est trouvé
        }
      }
      return -1;
    },
  },
};

module.exports = GameService;
