// <app/controller / online - game.controller.js

import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { SocketContext } from "../contexts/socket.context";
import Board from "../components/board/board.component";
import LottieView from "lottie-react-native";
import { COLOR } from "../constants/color";
import { DID_YOU_KNOW } from "../constants/text";
import { IMAGE, ANIMATION } from "../constants/asset";

export default function OnlineGameController() {
  const socket = useContext(SocketContext);
  const [inQueue, setInQueue] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [idOpponent, setIdOpponent] = useState(null);

  const randomIndex = Math.floor(Math.random() * 11);
  const [tipText, setTipText] = useState(DID_YOU_KNOW[randomIndex]);

  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * 11);
    setTipText(DID_YOU_KNOW[randomIndex]);
  }, 20000),
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
            source={IMAGE.BACKGROUND}
            resizeMode="stretch"
            style={styles.background}
          >
            <View style={styles.informationContainer}>
              <View style={{ width: 100 }}>
                <LottieView source={ANIMATION.BORED} autoPlay loop />
              </View>
              <View>
                <Text style={styles.paragraph}>
                  En attendant un autre joueur ...
                </Text>
              </View>
              <View>
                <LottieView source={ANIMATION.DICE_LOADING} autoPlay loop />
              </View>
              <View style={styles.tipsContainer}>
                <Text style={styles.tipsTitle}>LE SAVIEZ-VOUS ?</Text>
                <Text style={[styles.tips, styles.tipsQuestion]}>
                  QUESTION : {tipText.QUESTION}
                </Text>
                <Text style={[styles.tips, styles.tipsResponse]}>
                  RESPONSE : {tipText.RESPONSE}
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
    textAlign: "center",
    marginTop: 30,
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
    textAlign: "left",
  },
  tipsTitle: {
    fontSize: 20,
    color: COLOR.ZELDA_BLUE,
    fontFamily: "Hylia-Serif",
    textAlign: "center",
  },
  tipsQuestion: {
    paddingTop: 10,
    paddingBottom: 5,
    fontWeight: "bold",
  },
  tipsResponse: {
    paddingTop: 5,
    paddingBottom: 10,
    fontWeight: "normal",
    fontStyle: "italic",
  },
});
