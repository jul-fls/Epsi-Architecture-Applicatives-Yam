import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import { SocketContext } from "../../../contexts/socket.context";
import { COLOR } from "../../../constants/color";

const PlayerTimer = () => {
  const socket = useContext(SocketContext);
  const [playerTimer, setPlayerTimer] = useState(0);

  useEffect(() => {
    socket.on("game.timer", (data) => {
      setPlayerTimer(data["playerTimer"]);
    });
  }, []);

  return (
    <View style={styles.playerTimerContainer}>
      <Text style={{ color: COLOR.WHITE }}>Timer : {playerTimer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerTimerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlayerTimer;
