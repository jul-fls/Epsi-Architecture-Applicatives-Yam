// <app/controller / online - game.controller.js

import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SocketContext } from "../contexts/socket.context";
import Board from "../components/board/board.component";
import { COLOR } from "../constants/color";

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
          <Text style={styles.paragraph}>Waiting for another player...</Text>
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
    backgroundColor: COLOR.BEIGE_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  paragraph: {
    fontSize: 16,
  },
});
