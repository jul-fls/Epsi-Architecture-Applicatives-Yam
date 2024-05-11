const init = require('./init');

const choices = {
    findCombinations: (dices, isDefi, isFirstRoll) => {
      const allCombinations = init.allCombinations();
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
        { value: "Brelan 6", id: "brelan6" },
        { value: "Sec", id: "sec" },
        { value: "Brelan 3", id: "brelan3"},
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
}

module.exports = choices;