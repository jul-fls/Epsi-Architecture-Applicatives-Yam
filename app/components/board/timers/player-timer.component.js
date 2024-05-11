import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import LottieView from "lottie-react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { COLOR } from "../../../constants/color";
import { ANIMATION } from "../../../constants/asset";
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
              size={20}
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
          <Text
            style={[
              styles.playerTimerText,
              playerTimer < 20 && { color: COLOR.ZELDA_YELLOW },
              playerTimer < 10 && { color: COLOR.LIGHT_RED },
            ]}
          >
            {playerTimer} ⏳
          </Text>
        </View>
      ) : (
        <View>
          <View style={styles.animationContainer}>
            <LottieView source={ANIMATION.SAND_CLOCK_BLUE} autoPlay loop />
          </View>
        </View>
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
  playerTimerText: {
    fontSize: 15,
    color: COLOR.WHITE,
    fontFamily: "roboto",
    width: 50,
  },
  animationContainer: {
    width: 53,
    alignSelf: "center",
  },
});

export default PlayerTimer;
