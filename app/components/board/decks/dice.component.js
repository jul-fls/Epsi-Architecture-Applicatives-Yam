import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Player } from "@lottiefiles/react-lottie-player";

const Dice = ({ index, locked, value, onPress, opponent, isAnimated }) => {
  const handlePress = () => {
    if (!opponent) {
      onPress(index);
    }
  };

  // const playerRef = useRef(Player);

  // if (isAnimated) {
  //   playerRef.current.play();
  // } else {
  //   playerRef.current.stop();
  // }

  return (
    <TouchableOpacity
      style={[styles.dice, locked && styles.lockedDice]}
      onPress={handlePress}
      disabled={opponent}
    >
      {value === "" ? (
        <Player
          src={require("../../../assets/dice.json")}
          className="dice"
          loop={false}
          autoplay={false}
          // ref={playerRef}
          // isStopped={!isAnimated}
          // isPaused={!isAnimated}
        />
      ) : (
        <>
          <Text style={styles.diceText}>{value}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dice: {
    width: 40,
    height: 40,
    backgroundColor: "lightblue",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  lockedDice: {
    backgroundColor: "gray",
  },
  diceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  opponentText: {
    fontSize: 12,
    color: "red",
  },
});

export default Dice;
