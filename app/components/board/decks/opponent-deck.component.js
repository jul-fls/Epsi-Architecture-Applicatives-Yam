import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { DiceContext } from "../../../contexts/dice.context";
import LottieView from "lottie-react-native";
import Dice from "./dice.component";
import { COLOR } from "../../../constants/color";
import { ANIMATION } from "../../../constants/asset";
const OpponentDeck = () => {
  const socket = useContext(SocketContext);
  const { isDiceAnimated } = useContext(DiceContext);

  const [displayOpponentDeck, setDisplayOpponentDeck] = useState(false);
  const [opponentDices, setOpponentDices] = useState(
    Array(5).fill({ value: "", locked: false })
  );

  useEffect(() => {
    socket.on("game.deck.view-state", (data) => {
      setDisplayOpponentDeck(data["displayOpponentDeck"]);
      if (data["displayOpponentDeck"]) {
        setOpponentDices(data["dices"]);
      }
    });
  }, []);

  return (
    <View style={styles.deckOpponentContainer}>
      {displayOpponentDeck && !isDiceAnimated ? (
        <View style={styles.diceContainer}>
          {opponentDices.map((diceData, index) => (
            <Dice
              key={index}
              locked={diceData.locked}
              value={diceData.value}
              opponent={true}
              isPlayer={false}
            />
          ))}
        </View>
      ) : (
        <>
          <View>
            <View style={{ width: 100, margin: "auto" }}>
              <LottieView source={ANIMATION.SPY} autoPlay loop />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deckOpponentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderTopColor: COLOR.WHITE,
  },
  diceContainer: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default OpponentDeck;
