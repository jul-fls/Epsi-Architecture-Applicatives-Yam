import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { COLOR } from "../../../constants/color";

const PlayerTokens = () => {
  const socket = useContext(SocketContext);
  const [playerTokens, setPlayerTokens] = useState(0);
  useEffect(() => {
    socket.on("game.players-infos.view-state", (data) => {
      setPlayerTokens(data["playerInfos"]["tokens"]);
    });
  }, []);
  return (
    <View style={styles.playerTokensContainer}>
      <Text style={{ color: COLOR.WHITE }}>Pions restants: {playerTokens}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerTokensContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PlayerTokens;
