const utils = {
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

    generateCombinationsFromArray: (array, combinationLength) => {
      const result = [];

      const combine = (startIndex, combination) => {
        if (combination.length === combinationLength) {
          result.push([...combination]);
          return;
        }

        for (let i = startIndex; i < array.length; i++) {
          combination.push(array[i]);
          combine(i + 1, combination);
          combination.pop();
        }
      };

      combine(0, []);
      return result;
    },
}

module.exports = utils;