import React, { useEffect, useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";

const Grid = () => {
  const socket = useContext(SocketContext);

  const [displayGrid, setDisplayGrid] = useState(true);
  const [canSelectCells, setCanSelectCells] = useState(false);
  const [grid, setGrid] = useState([]);
  const [currentTurn, setCurrentTurn] = useState("");

  const [socketIdPlayer1, setSocketIdPlayer1] = useState("");
  const [socketIdPlayer2, setSocketIdPlayer2] = useState("");
  let myPlayerId = "";

  const handleSelectCell = (cellId, rowIndex, cellIndex) => {
    if (canSelectCells) {
      socket.emit("game.grid.selected", { cellId, rowIndex, cellIndex });
    }
  };

  useEffect(() => {
    socket.on("game.grid.view-state", (data) => {
      setDisplayGrid(data["displayGrid"]);
      setCanSelectCells(data["canSelectCells"]);
      setGrid(data["grid"]);
      setCurrentTurn(data["currentTurn"]);
      setSocketIdPlayer1(data["socketIdPlayer1"]);
      setSocketIdPlayer2(data["socketIdPlayer2"]);
    });
  }, []);

  if (socketIdPlayer1 === socket.id) {
    myPlayerId = "player:1";
  } else {
    myPlayerId = "player:2";
  }

  return (
    <View style={styles.gridContainer}>
      {displayGrid &&
        grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <TouchableOpacity
                key={cell.id + rowIndex}
                style={[
                  styles.cell,
                  cell.owner === myPlayerId && styles.playerOwnedCell,
                  cell.owner !== myPlayerId &&
                    cell.owner !== null &&
                    styles.opponentOwnedCell,
                  cell.canBeChecked &&
                    !(cell.owner === "player:1") &&
                    !(cell.owner === "player:2") &&
                    styles.canBeCheckedCell,
                  rowIndex !== 0 && styles.topBorder,
                  cellIndex !== 0 && styles.leftBorder,
                ]}
                onPress={() => handleSelectCell(cell.id, rowIndex, cellIndex)}
                disabled={!cell.canBeChecked}
              >
                <Text style={styles.cellText}>
                  [viewContent : {cell.viewContent}, id : {cell.id}, owner :{" "}
                  {cell.owner}, canBeChecked:{" "}
                  {cell.canBeChecked ? "true" : "false"}]
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    flexDirection: "row",
    flex: 2,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "blue",
  },
  cellText: {
    fontSize: 11,
  },
  playerOwnedCell: {
    backgroundColor: "lightgreen",
    opacity: 0.9,
  },
  opponentOwnedCell: {
    backgroundColor: "lightcoral",
    opacity: 0.9,
  },
  canBeCheckedCell: {
    backgroundColor: "lightblue",
  },
  topBorder: {
    borderTopWidth: 1,
  },
  leftBorder: {
    borderLeftWidth: 1,
  },
});

export default Grid;
