import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import LottieView from "lottie-react-native";
import { SocketContext, socket } from "../../../contexts/socket.context";
import { COLOR } from "../../../constants/color";
import { ANIMATION } from "../../../constants/asset";

const OpponentTimer = () => {
  const socket = useContext(SocketContext);
  const [opponentTimer, setOpponentTimer] = useState(0);

  useEffect(() => {
    socket.on("game.timer", (data) => {
      setOpponentTimer(data["opponentTimer"]);
    });
  }, []);
  return (
    <View style={styles.opponentTimerContainer}>
      {opponentTimer !== 0 ? (
        <View>
          <View style={{ marginTop: 5 }}>
            <CountdownCircleTimer
              isPlaying={true}
              size={20}
              strokeWidth={5}
              trailStrokeWidth={5}
              duration={30}
              colors={[COLOR.ZELDA_YELLOW, COLOR.GRAY, COLOR.DARK_RED]}
              colorsTime={[10, 6, 1]}
              onComplete={() => ({
                shouldRepeat: true,
                delay: 1,
              })}
            />
          </View>
          <Text
            style={[
              styles.opponentTimerText,
              opponentTimer < 20 && { color: COLOR.ZELDA_YELLOW },
              opponentTimer < 10 && { color: COLOR.LIGHT_RED },
            ]}
          >
            {opponentTimer} ⏳
          </Text>
        </View>
      ) : (
        <View>
          <View style={styles.animationContainer}>
            <LottieView source={ANIMATION.SAND_CLOCK_YELLOW} autoPlay loop />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  opponentTimerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  opponentTimerText: {
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

export default OpponentTimer;
