import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { COLOR } from "../../../constants/color";

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
      <Text style={styles.opponentScoreTitle}>SCORE</Text>

      <Text style={styles.opponentScoreText}>{opponentScore}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  opponentScoreContainer: {
    marginTop: 4,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  opponentScoreTitle: {
    fontSize: 15,
    fontFamily: "roboto",
    fontWeight: "bold",
    color: COLOR.ZELDA_YELLOW,
  },
  opponentScoreText: {
    marginTop: 5,
    fontSize: 15,
    color: COLOR.WHITE,
    fontFamily: "roboto",
  },
});

export default OpponentScore;
