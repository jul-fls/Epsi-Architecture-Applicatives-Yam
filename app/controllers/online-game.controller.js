// <app/controller / online - game.controller.js

import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { SocketContext } from "../contexts/socket.context";
import Board from "../components/board/board.component";
import LottieView from "lottie-react-native";
import { COLOR } from "../constants/color";

const backgroundImage = require("../assets/background.png");
const diceLoadingAnimation = require("../assets/lottie/dice_loading.json");

export default function OnlineGameController() {
  const socket = useContext(SocketContext);
  const [inQueue, setInQueue] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [idOpponent, setIdOpponent] = useState(null);
  useEffect(() => {
    socket.emit("queue.join");
    setInQueue(false);
    setInGame(false);

    socket.on("queue.added", (data) => {
      setInQueue(data["inQueue"]);
      setInGame(data["inGame"]);
    });
    socket.on("game.start", (data) => {
      setInQueue(data["inQueue"]);
      setInGame(data["inGame"]);
      setIdOpponent(data["idOpponent"]); // player1 id or player2 id
    });
  }, []);
  return (
    <View style={styles.container}>
      {!inQueue && !inGame && (
        <>
          <Text style={styles.paragraph}>Waiting for server datas...</Text>
        </>
      )}
      {inQueue && (
        <>
          <ImageBackground
            source={backgroundImage}
            resizeMode="stretch"
            style={styles.background}
          >
            <View style={styles.informationContainer}>
              <View>
                <Text style={styles.paragraph}>
                  En attendant un autre joueur ...
                </Text>
              </View>
              <View>
                <LottieView source={diceLoadingAnimation} autoPlay loop />
              </View>
              <View style={styles.tipsContainer}>
                <Text style={styles.tips}>
                  Saviez-vous que le jeu de Yam's a été créé par Milton Bradley
                </Text>
              </View>
            </View>
          </ImageBackground>
        </>
      )}
      {inGame && (
        <>
          <Board idOpponent={idOpponent} />
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.ZELDA_PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  informationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
  paragraph: {
    fontSize: 20,
    color: COLOR.WHITE,
    fontFamily: "Roboto",
    marginBottom: 10,
  },
  tipsContainer: {
    borderWidth: 1,
    borderColor: COLOR.WHITE,
    borderRadius: 5,
    padding: 5,
    backgroundColor: COLOR.TRANSPARENT,
    width: "100%",
    marginTop: 30,
  },
  tips: {
    fontSize: 15,
    color: COLOR.WHITE,
    fontFamily: "Roboto",
    textAlign: "center",
  },
});
