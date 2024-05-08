import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { COLOR } from "../../../constants/color";

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
      <Text style={{ color: COLOR.WHITE }}>
        Pions restants: {opponentTokens}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  opponentTokensContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OpponentTokens;
