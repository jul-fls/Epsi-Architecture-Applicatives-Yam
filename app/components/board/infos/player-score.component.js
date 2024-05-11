import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { COLOR } from "../../../constants/color";

const PlayerScore = () => {
  const socket = useContext(SocketContext);
  const [playerScore, setPlayerScore] = useState(0);
  useEffect(() => {
    socket.on("game.players-infos.view-state", (data) => {
      setPlayerScore(data["playerInfos"]["score"]);
    });
  }, []);
  return (
    <View style={styles.playerScoreContainer}>
      <Text style={styles.playerScoreTitle}>SCORE</Text>
      <Text style={styles.playerScoreText}>{playerScore}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerScoreContainer: {
    marginTop: 4,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  playerScoreTitle: {
    fontSize: 15,
    fontFamily: "roboto",
    fontWeight: "bold",
    color: COLOR.WHITE,
  },
  playerScoreText: {
    fontSize: 15,
    color: COLOR.WHITE,
    fontFamily: "roboto",
  },
});

export default PlayerScore;
