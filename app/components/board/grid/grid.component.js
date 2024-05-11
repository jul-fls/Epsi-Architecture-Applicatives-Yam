import React, { useEffect, useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { COLOR } from "../../../constants/color";
import { IMAGE } from "../../../constants/asset";

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
                  cell.owner === myPlayerId,
                  cell.owner !== myPlayerId && cell.owner !== null,
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
                {cell.owner == null && (
                  <Text
                    style={[
                      styles.cellText,
                      cell.owner !== null && styles.cellPlayerOwnedText,
                    ]}
                  >
                    {cell.viewContent}
                  </Text>
                )}
                {cell.owner && (
                  <View>
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={
                        cell.owner === myPlayerId
                          ? IMAGE.PLAYER_TOKEN
                          : IMAGE.OPPONENT_TOKEN
                      }
                    />
                  </View>
                )}
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
    borderColor: COLOR.WHITE,
  },
  cellText: {
    color: COLOR.WHITE,
    fontFamily: "roboto",
    fontWeight: "bold",
    fontSize: 20,
  },
  cellPlayerOwnedText: {
    color: COLOR.ZELDA_PRIMARY,
  },
  canBeCheckedCell: {
    backgroundColor: COLOR.GRAY,
  },
  topBorder: {
    borderTopWidth: 1,
  },
  leftBorder: {
    borderLeftWidth: 1,
  },
});

export default Grid;
