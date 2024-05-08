import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const Dice = ({
  index,
  locked,
  value,
  onPress,
  opponent,
  isAnimated,
  setIsAnimated,
}) => {
  const handlePress = () => {
    if (!opponent) {
      onPress(index);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.dice, locked && styles.lockedDice]}
      onPress={handlePress}
      disabled={opponent}
    >
      {isAnimated ? (
        <>
          <LottieView
            source={require("../../../assets/dice.json")}
            style={{ width: "100%", height: "100%" }}
            autoPlay
            onAnimationFinish={() => setIsAnimated(false)}
          />
        </>
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
