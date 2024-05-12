import React, { useContext } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { COLOR } from "../../../constants/color";
import { ANIMATION, IMAGE } from "../../../constants/asset";
import { DiceContext } from "../../../contexts/dice.context";

const Dice = ({
  index,
  locked,
  value,
  onPress,
  opponent,
  // isDiceAnimated,
  // setIsDiceAnimated,
  isPlayer,
}) => {
  const handlePress = () => {
    if (!opponent) {
      onPress(index);
    }
  };
  const { isDiceAnimated, setIsDiceAnimated } = useContext(DiceContext);

  const diceImages = {
    1: IMAGE.DICE_1,
    2: IMAGE.DICE_2,
    3: IMAGE.DICE_3,
    4: IMAGE.DICE_4,
    5: IMAGE.DICE_5,
    6: IMAGE.DICE_6,
  };

  const handleAnimationFinish = () => {
    setIsDiceAnimated(false);
  };
  return (
    <TouchableOpacity
      style={[
        styles.dice,
        isPlayer
          ? {
              backgroundColor: COLOR.ZELDA_BLUE,
              borderColor: COLOR.ZELDA_BLUE,
            }
          : {
              backgroundColor: COLOR.ZELDA_YELLOW,
              borderColor: COLOR.ZELDA_YELLOW,
            },
        locked && styles.lockedDice,
      ]}
      onPress={handlePress}
      disabled={opponent}
    >
      {isDiceAnimated && !locked ? (
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
            <View>
              <Image
                style={{ width: 30, height: 30 }}
                source={diceImages[value]}
              />
              {locked && <Text style={styles.lockIndicator}>🔒</Text>}
            </View>
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
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  lockedDice: {
    backgroundColor: COLOR.GRAY,
    borderWidth: 2,
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
  lockIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: -20,
    fontSize: 15,
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
