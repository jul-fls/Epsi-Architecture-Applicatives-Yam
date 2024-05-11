import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { COLOR } from "../../../constants/color";
import { IMAGE } from "../../../constants/asset";

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
      <Image style={{ width: 20, height: 20 }} source={IMAGE.PLAYER_TOKEN} />
      <Text style={styles.playerTokensText}>{playerTokens}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerTokensContainer: {
    marginTop: 4,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  playerTokensText: {
    fontSize: 15,
    color: COLOR.WHITE,
    fontFamily: "roboto",
  },
});
export default PlayerTokens;
