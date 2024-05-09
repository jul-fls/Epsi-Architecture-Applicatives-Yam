const grid = {
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
}

module.exports = grid;