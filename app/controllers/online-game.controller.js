// <app/controller / online - game.controller.js

import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
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
      socket.emit("queue.join","online");
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
          <Text style={styles.waitingTitle}>Waiting for server datas...</Text>
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
              <View></View>
              <View>
                <Text style={styles.waitingTitle}>
                  En attendant un autre joueur
                </Text>
              </View>
              <View style={{ width: 150 }}>
                <LottieView source={ANIMATION.DICE_LOADING} autoPlay loop />
              </View>
              <View style={styles.tipsContainer}>
                <View>
                  <Image
                    style={{ alignSelf: "center" }}
                    source={IMAGE.TEXT_FRAME}
                  />
                  <Text style={styles.tipsTitle}>LE SAVIEZ-VOUS ?</Text>
                  <Image
                    style={{ alignSelf: "center" }}
                    source={IMAGE.TEXT_FRAME}
                  />
                </View>
                <Text style={[styles.tips, styles.tipsQuestion]}>
                  {tipText.QUESTION}
                </Text>
                <Text style={[styles.tips, styles.tipsResponse]}>
                  {tipText.RESPONSE}
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
    height: "100%",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  informationContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginBottom: 30,
  },
  waitingTitle: {
    marginTop: 40,
    fontSize: 25,
    color: COLOR.WHITE,
    fontFamily: "Roboto",
    textAlign: "center",
  },
  tipsContainer: {
    borderRadius: 5,
    padding: 5,
    backgroundColor: COLOR.TRANSPARENT,
    width: "100%",
  },
  tipsTitle: {
    fontSize: 20,
    color: COLOR.ZELDA_BLUE,
    fontFamily: "Hylia-Serif",
    textAlign: "center",
  },
  tips: {
    color: COLOR.WHITE,
    fontFamily: "Roboto",
    textAlign: "left",
  },
  tipsQuestion: {
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 5,
    fontWeight: "bold",
  },
  tipsResponse: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 10,
    fontWeight: "normal",
    fontStyle: "italic",
  },
});
