// <app/controller / online - game.controller.js

import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SocketContext } from "../contexts/socket.context";
import Board from "../components/board/board.component";

export default function OnlineGameController() {
  const socket = useContext(SocketContext);
  const [inQueue, setInQueue] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [idOpponent, setIdOpponent] = useState(null);
  useEffect(() => {
    console.log("[emit][queue.join]:", socket.id);
    // -----------------------------------
    // socket.emit("queue.join") :
    // newPlayerInQueue(socket);
    // --> queue.push(socket)
    // -----------------------------------
    socket.emit("queue.join");
    setInQueue(false);
    setInGame(false);

    socket.on("queue.added", (data) => {
      console.log("[listen][queue.added]:", data);
      // -----------------------------------
      // socket.on("queue.added") :
      // viewQueueState: () => {}
      // --> { inQueue: true, inGame: false }
      setInQueue(data["inQueue"]);
      setInGame(data["inGame"]);
    });
    socket.on("game.start", (data) => {
      console.log("[listen][game.start]:", data);
      // -----------------------------------
      // socket.on("game.start") :
      // gameViewState: (playerKey, game) => {}
      // --> { inQueue: false, inGame: true, idPlayer: player1 id, idOpponent: player2 id }
      // -----------------------------------
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  paragraph: {
    fontSize: 16,
  },
});