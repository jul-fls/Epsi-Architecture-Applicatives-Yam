import { View, StyleSheet, ImageBackground } from "react-native";
import PlayerTimer from "./timers/player-timer.component";
import OpponentTimer from "./timers/opponent-timer.component";
import PlayerDeck from "./decks/player-deck.component";
import OpponentDeck from "./decks/opponent-deck.component";
import Choices from "./choices/choices.component";
import Grid from "./grid/grid.component";
import PlayerInfos from "./infos/player-infos.component";
import OpponentInfos from "./infos/opponent-infos.component";
import PlayerScore from "./infos/player-score.component";
import OpponentScore from "./infos/opponent-score.component";
import PlayerTokens from "./infos/player-tokens.component";
import OpponentTokens from "./infos/opponent-tokens.component";
import { COLOR } from "../../constants/color";
import { IMAGE } from "../../constants/asset";

const Board = ({ gameViewState }) => {
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
