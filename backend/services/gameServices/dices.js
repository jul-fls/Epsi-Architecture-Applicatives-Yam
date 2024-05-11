const dices = {
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
}

module.exports = dices;