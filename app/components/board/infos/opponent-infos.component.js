import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { COLOR } from "../../../constants/color";

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
      <Text style={{ color: COLOR.WHITE }}>{opponentInfos.playerKey}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  opponentInfosContainer: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: COLOR.WHITE,
    backgroundColor: COLOR.DARK_GREEN,
  },
});

export default OpponentInfos;
