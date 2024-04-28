import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";

const OpponentScore = () => {
  const socket = useContext(SocketContext);
  const [opponentScore, setOpponentScore] = useState(0);
  useEffect(() => {
    socket.on("game.players-infos.view-state", (data) => {
      setOpponentScore(data["opponentInfos"]["score"]);
    });
  }, []);
  return (
    <View style={styles.opponentScoreContainer}>
      <Text>Score: {opponentScore}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  opponentScoreContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OpponentScore;
