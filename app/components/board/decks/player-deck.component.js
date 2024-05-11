import React, { useState, useContext, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import Dice from "./dice.component";
import { COLOR } from "../../../constants/color";
import { IMAGE } from "../../../constants/asset";

const PlayerDeck = () => {
  const socket = useContext(SocketContext);
  const [displayPlayerDeck, setDisplayPlayerDeck] = useState(false);
  const [dices, setDices] = useState(Array(5).fill(false));
  const [displayRollButton, setDisplayRollButton] = useState(false);
  const [rollsCounter, setRollsCounter] = useState(0);
  const [rollsMaximum, setRollsMaximum] = useState(3);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    socket.on("game.deck.view-state", (data) => {
      setDisplayPlayerDeck(data["displayPlayerDeck"]);
      if (data["displayPlayerDeck"]) {
        setDisplayRollButton(data["displayRollButton"]);
        setRollsCounter(data["rollsCounter"]);
        setRollsMaximum(data["rollsMaximum"]);
        setDices(data["dices"]);
      }
    });
  }, []);

  const toggleDiceLock = (index) => {
    const newDices = [...dices];
    if (newDices[index].value !== "" && displayRollButton) {
      socket.emit("game.dices.lock", newDices[index].id);
      setIsAnimated(false);
    }
  };

  const rollDices = () => {
    if (rollsCounter <= rollsMaximum) {
      socket.emit("game.dices.roll");
      setIsAnimated(true);
    }
  };

  return (
    <View style={styles.deckPlayerContainer}>
      {displayPlayerDeck && (
        <>
          {displayRollButton && (
            <>
              <View style={styles.rollInfoContainer}>
                <Text style={styles.rollInfoText}>
                  Lancer{" "}
                  <Text style={{ fontWeight: "bold" }}>{rollsCounter}</Text> /{" "}
                  {rollsMaximum}
                </Text>
              </View>
            </>
          )}

          <View style={styles.diceContainer}>
            {dices.map((diceData, index) => (
              <Dice
                key={diceData.id}
                index={index}
                locked={diceData.locked}
                value={diceData.value}
                onPress={toggleDiceLock}
                isAnimated={isAnimated}
                setIsAnimated={setIsAnimated}
              />
            ))}
          </View>

          {displayRollButton && rollsCounter <= rollsMaximum && (
            <View style={styles.rollButtonContainer}>
              <TouchableOpacity style={styles.rollButton} onPress={rollDices}>
                <Image style={{ marginRight: 10 }} source={IMAGE.ARROW_RIGHT} />
                <Text style={styles.rollButtonText}>ROLL</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deckPlayerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: COLOR.WHITE,
  },
  diceContainer: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  rollInfoText: {
    color: COLOR.WHITE,
    fontFamily: "roboto",
    fontSize: 15,
    padding: 5,
    marginBottom: 5,
  },
  rollButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  rollButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.TRANSPARENT,
    padding: 5,
    borderWidth: 1,
    borderColor: COLOR.ZELDA_BLUE,
    borderRadius: 5,
    width: 150,
  },

  rollButtonText: {
    color: COLOR.ZELDA_BLUE,
    fontWeight: "bold",
    fontFamily: "Hylia-Serif",
    fontSize: 15,
    textAlign: "center",
  },
});

export default PlayerDeck;
