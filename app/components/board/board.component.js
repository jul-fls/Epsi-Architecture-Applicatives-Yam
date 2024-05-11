import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import PlayerTimer from "./infos/timers/player-timer.component";
import OpponentTimer from "./infos/timers/opponent-timer.component";
import PlayerDeck from "./decks/player-deck.component";
import OpponentDeck from "./decks/opponent-deck.component";
import Choices from "./choices/choices.component";
import Grid from "./grid/grid.component";
import PlayerInfos from "./infos/players/player-infos.component";
import OpponentInfos from "./infos/players/opponent-infos.component";
import PlayerScore from "./infos/scores/player-score.component";
import OpponentScore from "./infos/scores/opponent-score.component";
import PlayerTokens from "./infos/tokens/player-tokens.component";
import OpponentTokens from "./infos/tokens/opponent-tokens.component";
import { COLOR } from "../../constants/color";
import { IMAGE } from "../../constants/asset";
import { SocketContext } from "../../contexts/socket.context";

const Board = ({ gameViewState }) => {
  const socket = useContext(SocketContext);
  const [gameInfos, setGameInfos] = useState({});

  useEffect(() => {
    socket.on("game.game-over", (data) => {
      setGameInfos(data["gameInfos"]);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={IMAGE.BACKGROUND_TEXTURE}
        resizeMode="cover"
      >
        <View style={[styles.row, { height: "8%" }]}>
          <OpponentInfos />
          <View style={styles.opponentTimerScoreTokenContainer}>
            <OpponentScore />
            <OpponentTokens />
            <OpponentTimer />
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
          <View style={styles.playerTimerScoreTokenContainer}>
            <PlayerScore />
            <PlayerTokens />
            <PlayerTimer />
          </View>
        </View>
      </ImageBackground>
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
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: COLOR.ZELDA_SECONDARY,
  },
  opponentTimerScoreTokenContainer: {
    flex: 5, // increased flex to provide more space
    flexDirection: "row",
    justifyContent: "space-around", // changed from center to space-around for better distribution
    alignItems: "center",
    backgroundColor: COLOR.ZELDA_SECONDARY,
  },
  playerTimerScoreTokenContainer: {
    flex: 5, // increased flex to provide more space
    flexDirection: "row",
    justifyContent: "space-around", // changed from center to space-around for better distribution
    alignItems: "center",
    backgroundColor: COLOR.ZELDA_SECONDARY,
  },
});

export default Board;
