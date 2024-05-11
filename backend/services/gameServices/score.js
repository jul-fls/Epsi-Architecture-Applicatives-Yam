const victory = require("./victory");
const init = require("./init");

const score = {
    calculateScoreHorizontal: (gameState) => {
        let scoreToAdd = 0;
        for (let row = 0; row < gameState.grid.length; row++) {
            for (
            let col = 0;
            col < gameState.grid[row].length - (init.MINIMUM_ALIGNED_TOKENS() - 1);
            col++
            ) {
            // Check if the cell has an owner
            if (gameState.grid[row][col].owner) {
                // Check if the owner is player 1
                if (gameState.grid[row][col].owner === "player:1") {
                // Check if the row is at the end of the grid
                if (col === gameState.grid[row].length - init.MINIMUM_ALIGNED_TOKENS()) {
                    if (
                    // For example : [0,2], [0,3], [0,4]
                    gameState.grid[row][col].owner === gameState.grid[row][col + 1].owner &&
                    gameState.grid[row][col + 1].owner === gameState.grid[row][col + 2].owner
                    ) {
                    scoreToAdd = 1;
                    }
                } else {
                    if (
                    // For example : [0,0], [0,1], [0,2], [0,3] // [0,1], [0,2], [0,3], [0,4]
                    gameState.grid[row][col].owner === gameState.grid[row][col + 1].owner &&
                    gameState.grid[row][col + 1].owner === gameState.grid[row][col + 2].owner &&
                    gameState.grid[row][col + 2].owner === gameState.grid[row][col + 3].owner
                    ) {
                    scoreToAdd = 2;
                    break;
                    }
                    if (
                    // For example : [0,0], [0,1], [0,2] // [0,1], [0,2], [0,3]
                    gameState.grid[row][col].owner === gameState.grid[row][col + 1].owner &&
                    gameState.grid[row][col + 1].owner === gameState.grid[row][col + 2].owner
                    ) {
                    scoreToAdd = 1;
                    }
                }
                // Check if the owner is player 2
                } else {
                // Check if the row is at the end of the grid

                // In yam case, col == 2 (init.MINIMUM_ALIGNED_TOKENS() = 3)
                if (col === gameState.grid[row].length - init.MINIMUM_ALIGNED_TOKENS()) {
                    if (
                    // For example : [0,2], [0,3], [0,4]
                    gameState.grid[row][col].owner === gameState.grid[row][col + 1].owner &&
                    gameState.grid[row][col + 1].owner === gameState.grid[row][col + 2].owner
                    ) {
                    scoreToAdd = 1;
                    }
                } else {
                    // For example : [0,0], [0,1], [0,2], [0,3] // [0,1], [0,2], [0,3], [0,4]
                    if (
                    gameState.grid[row][col].owner === gameState.grid[row][col + 1].owner &&
                    gameState.grid[row][col + 1].owner === gameState.grid[row][col + 2].owner &&
                    gameState.grid[row][col + 2].owner === gameState.grid[row][col + 3].owner
                    ) {
                    scoreToAdd = 2;
                    break;
                    }
                    // For example : [0,0], [0,1], [0,2] // [0,1], [0,2], [0,3]
                    if (
                    gameState.grid[row][col].owner === gameState.grid[row][col + 1].owner &&
                    gameState.grid[row][col + 1].owner === gameState.grid[row][col + 2].owner
                    ) {
                    scoreToAdd = 1;
                    }
                }
                }
            }
            }
        }

        if(gameState.currentTurn === "player:1") {
            gameState.player1Score += scoreToAdd;
        } else {
            gameState.player2Score += scoreToAdd;
        }
        console.log("-----------------------------------------------------------------------------------------------");
        console.log("horizontal score to add to ", gameState.currentTurn, " : ", scoreToAdd);
        console.log("Global score of player 1 : ", gameState.player1Score);
        console.log("Global score of player 2 : ", gameState.player2Score);
    },
    calculateScoreVertical: (gameState) => {
        const gridColLength = gameState.grid[0].length;
        let scoreToAdd = 0;

        for (let col = 0; col < gridColLength; col++) {
            for (let row = 0; row < gameState.grid.length - (init.MINIMUM_ALIGNED_TOKENS() - 1); row++) {
            //  Check if the cell has an owner
            if (gameState.grid[row][col].owner) {
                // Check if the owner is player 1
                if (gameState.grid[row][col].owner === "player:1") {
                // Check if the row is at the end of the grid
                // In yam case, row == 2 (init.MINIMUM_ALIGNED_TOKENS() = 3)
                if (row === gameState.grid.length - init.MINIMUM_ALIGNED_TOKENS()) {
                    if (
                        // For example : [2,0], [3,0], [4,0]
                        gameState.grid[row][col].owner === gameState.grid[row + 1][col].owner &&
                        gameState.grid[row + 1][col].owner === gameState.grid[row + 2][col].owner
                    ) {
                    scoreToAdd = 1;
                    }
                } else {
                    if (
                        // For example : [0,0], [1,0], [2,0], [3,0] // [1,0], [2,0], [3,0], [4,0]
                        gameState.grid[row][col].owner === gameState.grid[row + 1][col].owner &&
                        gameState.grid[row + 1][col].owner === gameState.grid[row + 2][col].owner &&
                        gameState.grid[row + 2][col].owner === gameState.grid[row + 3][col].owner
                    ) {
                        scoreToAdd = 2;
                        break;
                    }
                    if (
                        // For example : [0,0], [1,0], [2,0] / [1,0], [2,0], [3,0]
                        gameState.grid[row][col].owner === gameState.grid[row + 1][col].owner &&
                        gameState.grid[row + 1][col].owner === gameState.grid[row + 2][col].owner
                    ) {
                        scoreToAdd = 1;
                    }
                }
                // Check if the owner is player 2
                } else {
                    // Check if the row is at the end of the grid
                    if (row === gameState.grid.length - init.MINIMUM_ALIGNED_TOKENS()) {
                        if (
                            // For example : [2,0], [3,0], [4,0]
                            gameState.grid[row][col].owner === gameState.grid[row + 1][col].owner &&
                            gameState.grid[row + 1][col].owner === gameState.grid[row + 2][col].owner
                        ) {
                            scoreToAdd = 1;
                        }
                    } else {
                        if (
                        // For example : [0,0], [1,0], [2,0], [3,0]
                            gameState.grid[row][col].owner === gameState.grid[row + 1][col].owner &&
                            gameState.grid[row + 1][col].owner === gameState.grid[row + 2][col].owner &&
                            gameState.grid[row + 2][col].owner === gameState.grid[row + 3][col].owner
                        ) {
                            scoreToAdd = 2;
                            break;
                        }
                        if (
                            // For example : [0,0], [1,0], [2,0] / [1,0], [2,0], [3,0]
                            gameState.grid[row][col].owner === gameState.grid[row + 1][col].owner &&
                            gameState.grid[row + 1][col].owner === gameState.grid[row + 2][col].owner
                        ) {
                            scoreToAdd = 1;
                        }
                    }
                }
            }
            }
        }

        if(gameState.currentTurn === "player:1") {
            gameState.player1Score += scoreToAdd;
        } else {
            gameState.player2Score += scoreToAdd;
        }
        console.log("-----------------------------------------------------------------------------------------------");
        console.log("vertical score to add to ", gameState.currentTurn, " : ", scoreToAdd);
        console.log("Global score of player 1 : ", gameState.player1Score);
        console.log("Global score of player 2 : ", gameState.player2Score);
    },
    calculateScoreDiagonal: (gameState, lastRowIndex, lastColIndex) => {
        const currentPlayer = gameState.currentTurn;
        let newDiagonalPoints = 0;

        // Get diagonals involving the newly placed cell
        const diagonalBLtoTR = score.gatherDiagonal(gameState, lastRowIndex, lastColIndex, 1, -1);
        const diagonalTLtoBR = score.gatherDiagonal(gameState, lastRowIndex, lastColIndex, 1, 1);

        // Calculate scores incrementally for both diagonals
        newDiagonalPoints += score.calculatePointsFromDiagonal(diagonalBLtoTR, currentPlayer);
        newDiagonalPoints += score.calculatePointsFromDiagonal(diagonalTLtoBR, currentPlayer);

        // Ensure only the positive difference is added
        if (newDiagonalPoints >= 0) {
            score.updatePlayerScore(gameState, newDiagonalPoints, "diagonal");
        }
    },
    // Calculate the score points based on the alignment count
    calculatePoints: (count) => {
        if (count >= 4) return 2;
        if (count >= 3) return 1;
        return 0;
    },

    // Calculate points from a diagonal array of cells
    calculatePointsFromDiagonal: (cells, currentPlayer) => {
        let count = 0;
        let points = 0;
        
        cells.forEach((cell) => {
            if (cell.owner === currentPlayer) {
                count++;
            } else {
                points += score.calculatePoints(count);
                count = 0; // Reset counter after a break
            }
        });
    
        // Add points from the final sequence
        points += score.calculatePoints(count);
        return points;
    },

    // Update the player's score
    updatePlayerScore: (gameState, additionalPoints, scoreType) => {
        if (gameState.currentTurn === "player:1") {
            gameState.player1Score += additionalPoints;
        } else {
            gameState.player2Score += additionalPoints;
        }
        
        console.log(`-----------------------------------------------------------------------------------------------`);
        console.log(`${scoreType} score to add to`, gameState.currentTurn, ":", additionalPoints);
        console.log("Global score of player 1:", gameState.player1Score);
        console.log("Global score of player 2:", gameState.player2Score);
    },

    detectAlignmentTypeAndScore: (gameState, lastRowIndex, lastColIndex) => {
        const currentPlayer = gameState.currentTurn;
        let isHorizontal = false;
        let isVertical = false;
        let isDiagonal = false;
        
        // Check horizontal alignment (row-based)
        const row = gameState.grid[lastRowIndex];
        if (
            score.checkAlignment(row.map(cell => cell.owner === currentPlayer), lastColIndex)
        ) {
            isHorizontal = true;
        }
        
        // Check vertical alignment (column-based)
        const column = gameState.grid.map(row => row[lastColIndex].owner === currentPlayer);
        if (score.checkAlignment(column, lastRowIndex)) {
            isVertical = true;
        }
        
        // Check diagonals (Top-left to Bottom-right)
        const diagonalTLtoBR = score.gatherDiagonal(gameState, lastRowIndex, lastColIndex, 1, 1);
        if (score.checkAlignment(diagonalTLtoBR.map(cell => cell.owner === currentPlayer), diagonalTLtoBR.findIndex(cell => cell.row === lastRowIndex && cell.col === lastColIndex))) {
            isDiagonal = true;
        }
        
        // Check diagonals (Bottom-left to Top-right)
        const diagonalBLtoTR = score.gatherDiagonal(gameState, lastRowIndex, lastColIndex, 1, -1);
        if (score.checkAlignment(diagonalBLtoTR.map(cell => cell.owner === currentPlayer), diagonalBLtoTR.findIndex(cell => cell.row === lastRowIndex && cell.col === lastColIndex))) {
            isDiagonal = true;
        }
        
        // Calculate score based on detected alignment type
        if (isHorizontal) {
            score.calculateScoreHorizontal(gameState);
        }
        if (isVertical) {
            score.calculateScoreVertical(gameState);
        }
        if (isDiagonal) {
            score.calculateScoreDiagonal(gameState, lastRowIndex, lastColIndex);
        }
    },
    
    // Helper function to check alignment in an array
    checkAlignment: (alignmentArray, centralIndex) => {    
        let left = centralIndex - 1;
        let right = centralIndex + 1;
        let count = 1;
        
        // Check consecutive tokens to the left
        while (left >= 0 && alignmentArray[left]) {
            count++;
            left--;
        }
        
        // Check consecutive tokens to the right
        while (right < alignmentArray.length && alignmentArray[right]) {
            count++;
            right++;
        }
        
        // Determine if the alignment matches the minimum requirement
        return count >= init.MINIMUM_ALIGNED_TOKENS();
    },
    
    // Helper function to gather diagonals based on an incremental direction
    gatherDiagonal: (gameState, startRow, startCol, rowIncrement, colIncrement) => {
        const diagonal = [];
        let row = startRow;
        let col = startCol;

        // Move backward to the start of the diagonal
        while (row >= 0 && col >= 0 && row < gameState.grid.length && col < gameState.grid[0].length) {
            diagonal.unshift({ row, col, owner: gameState.grid[row][col].owner });
            row -= rowIncrement;
            col -= colIncrement;
        }

        // Move forward to extend the diagonal
        row = startRow + rowIncrement;
        col = startCol + colIncrement;
        while (row >= 0 && col >= 0 && row < gameState.grid.length && col < gameState.grid[0].length) {
            diagonal.push({ row, col, owner: gameState.grid[row][col].owner });
            row += rowIncrement;
            col += colIncrement;
        }

        return diagonal;
    },
}

module.exports = score;