import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { COLOR } from "../../../constants/color";
import { IMAGE } from "../../../constants/asset";

const OpponentTokens = () => {
  const socket = useContext(SocketContext);
  const [opponentTokens, setOpponentTokens] = useState(0);
  useEffect(() => {
    socket.on("game.players-infos.view-state", (data) => {
      setOpponentTokens(data["opponentInfos"]["tokens"]);
    });
  }, []);
  return (
    <View style={styles.opponentTokensContainer}>
      <Image style={{ width: 22, height: 22 }} source={IMAGE.OPPONENT_TOKEN} />
      <Text style={styles.opponentTokensText}>{opponentTokens}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  opponentTokensContainer: {
    marginTop: 6,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  opponentTokensText: {
    fontSize: 15,
    color: COLOR.WHITE,
    fontFamily: "roboto",
  },
});

export default OpponentTokens;
