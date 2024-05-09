import React, { useRef, useState } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { COLOR } from "../../../constants/color";

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

  const diceAnimation = require("../../../assets/lottie/dice.json");
  const diceImages = {
    1: require("../../../assets/dice_1.png"),
    2: require("../../../assets/dice_2.png"),
    3: require("../../../assets/dice_3.png"),
    4: require("../../../assets/dice_4.png"),
    5: require("../../../assets/dice_5.png"),
    6: require("../../../assets/dice_6.png"),
  };

  return (
    <TouchableOpacity
      style={[styles.dice, locked && styles.lockedDice]}
      onPress={handlePress}
      disabled={opponent}
    >
      {isAnimated ? (
        <View style={styles.diceAnimationContainer}>
          <LottieView
            source={diceAnimation}
            styles={styles.diceAnimation}
            autoPlay
            onAnimationFinish={() => setIsAnimated(false)}
          />
        </View>
      ) : (
        <View>
          {value !== "" && (
            <Image
              style={{ width: 30, height: 30 }}
              source={diceImages[value]}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dice: {
    width: 40,
    height: 40,
    backgroundColor: COLOR.DARK_GREEN,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  lockedDice: {
    backgroundColor: COLOR.WHITE,
    borderWidth: 1,
    borderColor: COLOR.DARK_GREEN,
  },
  diceAnimationContainer: {
    paddingBottom: 10,
  },
  diceAnimation: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
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
