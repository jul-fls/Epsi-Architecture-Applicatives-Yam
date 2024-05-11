import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

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
      {playerTimer !== 0 ? (
        <View>
          <View style={{ marginTop: 5 }}>
            <CountdownCircleTimer
              isPlaying={playerTimer !== 0 ? true : false}
              size={23}
              strokeWidth={5}
              trailStrokeWidth={5}
              duration={30}
              colors={[
                COLOR.ZELDA_BLUE,
                COLOR.GRAY,
                COLOR.ZELDA_YELLOW,
                COLOR.DARK_RED,
              ]}
              colorsTime={[10, 6, 3, 0]}
              onComplete={() => ({
                shouldRepeat: true,
                delay: 1,
              })}
            />
          </View>
          <Text style={{ color: COLOR.WHITE }}>{playerTimer} ⏳</Text>
        </View>
      ) : (
        <Text style={{ color: COLOR.WHITE }}>0 ⏳</Text>
      )}
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
