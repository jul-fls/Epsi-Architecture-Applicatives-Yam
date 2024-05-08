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
      <Text style={{ color: COLOR.WHITE }}>Score: {playerScore}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerScoreContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlayerScore;
