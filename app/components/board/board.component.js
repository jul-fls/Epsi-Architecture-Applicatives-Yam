import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import PlayerTimer from "./timers/player-timer.component";
import OpponentTimer from "./timers/opponent-timer.component";
import PlayerDeck from "./decks/player-deck.component";
import OpponentDeck from "./decks/opponent-deck.component";
import Choices from "./choices/choices.component";
import Grid from "./grid/grid.component";
import PlayerInfos from "./infos/player-infos.component";
import OpponentInfos from "./infos/opponent-infos.component";
import { SocketContext } from "../../contexts/socket.context";

const OpponentScore = () => {
  const socket = useContext(SocketContext);
  const [opponentScore, setOpponentScore] = useState(0);
  useEffect(() => {
    socket.on("game.players-infos.view-state", (data) => {
      setOpponentScore(data["opponentInfos"]["score"]);
    });
  }, []);
  return (
    <View style={styles.opponentScoreContainer}>
      <Text>Score: {opponentScore}</Text>
    </View>
  );
};

const PlayerScore = () => {
  const socket = useContext(SocketContext);
  const [playerScore, setPlayerScore] = useState(0);
  useEffect(() => {
    socket.on("game.players-infos.view-state", (data) => {
      setPlayerScore(data["playerInfos"]["score"]);
    });
  }, []);
  return (
    <View style={styles.playerScoreContainer}>
      <Text>Score: {playerScore}</Text>
    </View>
  );
};

const PlayerTokens = () => {
  const socket = useContext(SocketContext);
  const [playerTokens, setPlayerTokens] = useState(0);
  useEffect(() => {
    socket.on("game.players-infos.view-state", (data) => {
      setPlayerTokens(data["playerInfos"]["tokens"]);
    });
  }, []);
  return (
    <View style={styles.playerTokensContainer}>
      <Text>Pions restants: {playerTokens}</Text>
    </View>
  );
};

const OpponentTokens = () => {
  const socket = useContext(SocketContext);
  const [opponentTokens, setOpponentTokens] = useState(0);
  useEffect(() => {
    socket.on("game.players-infos.view-state", (data) => {
      setOpponentTokens(data["opponentInfos"]["tokens"]);
    });
  }, []);
  return (
    <View style={styles.opponentTokensContainer}>
      <Text>Pions restants: {opponentTokens}</Text>
    </View>
  );
};

const Board = ({ gameViewState }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.row, { height: "8%" }]}>
        <OpponentInfos />
        <View style={styles.opponentTimerScoreContainer}>
          <OpponentTimer />
          <OpponentScore />
          <OpponentTokens />
        </View>
      </View>
      <View style={[styles.row, { height: "25%" }]}>
        <OpponentDeck />
      </View>
      <View style={[styles.row, { height: "34%" }]}>
        <Grid />
        <Choices />
      </View>
      <View style={[styles.row, { height: "25%" }]}>
        <PlayerDeck />
      </View>
      <View style={[styles.row, { height: "8%" }]}>
        <PlayerInfos />
        <View style={styles.playerTimerScoreContainer}>
          <PlayerTimer />
          <PlayerScore />
          <PlayerTokens />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "black",
  },
  opponentTimerScoreContainer: {
    flex: 4, // increased flex to provide more space
    flexDirection: "column",
    justifyContent: "space-around", // changed from center to space-around for better distribution
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
  opponentTimerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  opponentScoreContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  opponentTokensContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playerTimerScoreContainer: {
    flex: 4, // increased flex to provide more space
    flexDirection: "column",
    justifyContent: "space-around", // changed from center to space-around for better distribution
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
  playerTimerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
  playerScoreContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playerTokensContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Board;
