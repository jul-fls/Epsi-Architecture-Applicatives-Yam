import React, { useState, useContext, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";
import { SocketContext } from "../../../contexts/socket.context";
import Dice from "./dice.component";
import { COLOR } from "../../../constants/color";
import { IMAGE, ANIMATION } from "../../../constants/asset";
import { DiceContext } from "../../../contexts/dice.context";

const PlayerDeck = () => {
  const socket = useContext(SocketContext);
  const [displayPlayerDeck, setDisplayPlayerDeck] = useState(false);
  const [dices, setDices] = useState(Array(5).fill(false));
  const [displayRollButton, setDisplayRollButton] = useState(false);
  const [rollsCounter, setRollsCounter] = useState(1);
  const [rollsMaximum, setRollsMaximum] = useState(3);
  const { isDiceAnimated, setIsDiceAnimated } = useContext(DiceContext);

  useEffect(() => {
    socket.on("game.deck.view-state", (data) => {
      setDisplayPlayerDeck(data["displayPlayerDeck"]);
      if (data["displayPlayerDeck"]) {
        setDisplayRollButton(data["displayRollButton"]);
        setRollsMaximum(data["rollsMaximum"]);
        setDices(data["dices"]);
        setRollsCounter(data["rollsCounter"]);
      }
    });
  }, []);

  const toggleDiceLock = (index) => {
    const newDices = [...dices];
    if (newDices[index].value !== "" && displayRollButton) {
      socket.emit("game.dices.lock", newDices[index].id);
      setIsDiceAnimated(false);
    }
  };

  const rollDices = () => {
    if (rollsCounter === rollsMaximum) {
      setIsDiceAnimated(true);
      setTimeout(() => {
        socket.emit("game.dices.roll");
      }, 2900);
      return;
    }

    if (rollsCounter < rollsMaximum) {
      socket.emit("game.dices.roll");
      setIsDiceAnimated(true);
    }
  };

  return (
    <View style={styles.deckPlayerContainer}>
      {displayPlayerDeck ? (
        <>
          <>
            <View style={styles.rollInfoContainer}>
              {displayRollButton && (
                <Text style={styles.rollInfoText}>
                  Lancer
                  <Text style={{ fontWeight: "bold", marginLeft: 5 }}>
                    {rollsCounter}
                  </Text>
                  /{rollsMaximum}
                </Text>
              )}
            </View>
          </>
          <View style={styles.diceContainer}>
            {dices.map((diceData, index) => (
              <Dice
                key={diceData.id}
                index={index}
                locked={diceData.locked}
                value={diceData.value}
                onPress={toggleDiceLock}
                isDiceAnimated={isDiceAnimated}
                setIsDiceAnimated={setIsDiceAnimated}
                isPlayer={true}
              />
            ))}
          </View>
          <View style={styles.rollButtonContainer}>
            {displayRollButton && rollsCounter <= rollsMaximum && (
              <View>
                <TouchableOpacity
                  style={[
                    styles.rollButton,
                    isDiceAnimated && { display: "none", opacity: 0.5 },
                  ]}
                  onPress={rollDices}
                >
                  <Image
                    style={{ marginRight: 10 }}
                    source={IMAGE.ARROW_RIGHT}
                  />
                  <Text style={styles.rollButtonText}>LANCER</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>
      ) : (
        <>
          <View>
            <View style={{ width: 100, margin: "auto" }}>
              <LottieView source={ANIMATION.WAITING} autoPlay loop />
            </View>
            <View style={{ width: "100%" }}>
              <Text style={styles.waitOpponentText}>
                En attente de l'adversaire
              </Text>
            </View>
          </View>
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
    borderWidth: 1,
    borderBottomColor: COLOR.WHITE,
  },
  diceContainer: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  rollInfoContainer: {
    height: 30,
    padding: 5,
    marginBottom: 5,
  },
  rollInfoText: {
    color: COLOR.WHITE,
    fontFamily: "roboto",
    fontSize: 15,
    paddingRight: 4,
  },
  rollButtonContainer: {
    marginVertical: 5,
    height: 50,
    width: "100%",
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
    marginHorizontal: 10,
  },
  rollButtonText: {
    color: COLOR.ZELDA_BLUE,
    fontWeight: "bold",
    fontFamily: "Hylia-Serif",
    fontSize: 15,
    textAlign: "center",
  },
  waitOpponentText: {
    color: COLOR.WHITE,
    fontFamily: "roboto",
    fontSize: 15,
  },
});

export default PlayerDeck;
