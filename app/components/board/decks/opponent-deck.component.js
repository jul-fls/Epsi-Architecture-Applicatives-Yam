import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import LottieView from "lottie-react-native";
import Dice from "./dice.component";
import { COLOR } from "../../../constants/color";
import { ANIMATION } from "../../../constants/asset";
import { DEFAULT_SET_TIMER } from "../../../constants/text";
const OpponentDeck = () => {
  const socket = useContext(SocketContext);
  const [displayOpponentDeck, setDisplayOpponentDeck] = useState(false);
  const [opponentDices, setOpponentDices] = useState(
    Array(5).fill({ value: "", locked: false })
  );

  useEffect(() => {
    socket.on("game.deck.view-state", (data) => {
      setDisplayOpponentDeck(data["displayOpponentDeck"]);
      if (data["displayOpponentDeck"]) {
        setTimeout(() => {
          setOpponentDices(data["dices"]);
        }, DEFAULT_SET_TIMER);
      }
    });
  }, []);

  return (
    <View style={styles.deckOpponentContainer}>
      {displayOpponentDeck ? (
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
