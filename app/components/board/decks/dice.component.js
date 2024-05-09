import React, { useRef, useState } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { COLOR } from "../../../constants/color";
import { ANIMATION, IMAGE } from "../../../constants/asset";

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

  const diceImages = {
    1: IMAGE.DICE_1,
    2: IMAGE.DICE_2,
    3: IMAGE.DICE_3,
    4: IMAGE.DICE_4,
    5: IMAGE.DICE_5,
    6: IMAGE.DICE_6,
  };

  const handleAnimationFinish = () => {
    console.log("hello");
    setIsAnimated(false);
  };
  return (
    <TouchableOpacity
      style={[styles.dice, locked && styles.lockedDice]}
      onPress={handlePress}
      disabled={opponent}
    >
      {isAnimated && !locked ? (
        <View style={styles.diceAnimationContainer}>
          <LottieView
            source={ANIMATION.DICE}
            styles={styles.diceAnimation}
            autoPlay
            onAnimationFinish={() => handleAnimationFinish()}
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
    backgroundColor: COLOR.ZELDA_BLUE,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  lockedDice: {
    backgroundColor: COLOR.LOCKED,
    borderWidth: 1,
    borderColor: COLOR.WHITE,
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
