import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";

const OpponentInfos = () => {
  const socket = useContext(SocketContext);
  const [opponentInfos, setOpponentInfos] = useState({});
  useEffect(() => {
    socket.on("game.players-infos.view-state", (data) => {
      setOpponentInfos(data["opponentInfos"]);
    });
  }, []);
  return (
    <View style={styles.opponentInfosContainer}>
      <Text>{opponentInfos.playerKey}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  opponentInfosContainer: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "black",
    backgroundColor: "lightgrey",
  },
});

export default OpponentInfos;
