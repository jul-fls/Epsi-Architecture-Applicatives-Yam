import { useContext, useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SocketContext } from "../../../../contexts/socket.context";
import Modal from "react-native-modal";
import { COLOR } from "../../../../constants/color";
import { IMAGE } from "../../../../constants/asset";
import NavigationButton from "../../../navigation-button.component";

const GameInfo = () => {
  const socket = useContext(SocketContext);
  const [gameInfos, setGameInfos] = useState({});
  const isGameInfosExist = Object.keys(gameInfos).length !== 0;
  const [isGameDraw, setIsGameDraw] = useState(false);

  useEffect(() => {
    socket.on("game.game-over", (data) => {
      setGameInfos(data["gameInfos"]);
      setIsGameDraw(data["gameInfos"].winner === "draw");
    });
  }, []);

  console.log("gameInfos :: ", gameInfos);
  return (
    <View style={isGameInfosExist ? { flex: 1, position: "absolute" } : {}}>
      <Modal
        style={styles.gameInfoModal}
        isVisible={
          isGameInfosExist
          // true
        }
      >
        <View style={styles.gameInfoModalWrapper}>
          <Text style={styles.gameInfoTitle}>Résumé de la partie</Text>
          <View style={styles.gameInfoContainer}>
            {isGameDraw && (
              <View style={styles.gameInfoSemiTitleContainer}>
                <Image style={{ width: 35, height: 35 }} source={IMAGE.E} />
                <Text style={[styles.gameInfoSemiTitle, { marginBottom: 10 }]}>
                  galité
                </Text>
              </View>
            )}
            <View
              style={[
                styles.gameInfoPlayers,
                {
                  borderBottomWidth: 1,
                  borderColor: COLOR.WHITE,
                  paddingBottom: 10,
                },
              ]}
            >
              <View
                style={[
                  styles.gameInfo,
                  { borderRightWidth: 1, borderColor: COLOR.WHITE },
                ]}
              >
                {!isGameDraw && (
                  <View style={styles.gameInfoSemiTitleContainer}>
                    <Image style={{ width: 35, height: 35 }} source={IMAGE.V} />
                    <Text style={styles.gameInfoSemiTitle}>ainqueur</Text>
                  </View>
                )}
                <View style={styles.gameInfoDetailTitleContainer}>
                  <Text style={styles.detailTitle}>
                    Joueur{" "}
                    {gameInfos.winner === "draw" ? "1" : gameInfos.winner}
                  </Text>
                </View>
                <View style={styles.gameInfoDetailTitleContainer}>
                  <Text style={styles.detailTitle}>Pion(s) utilisé(s)</Text>
                  <Text style={styles.detailStatText}>
                    {gameInfos.winnerUsedTokens}
                  </Text>
                </View>
                {gameInfos.winnerScore !== null && (
                  <View style={styles.gameInfoDetailTitleContainer}>
                    <Text style={styles.detailTitle}>Score</Text>
                    <Text style={styles.detailStatText}>
                      {gameInfos.winnerScore}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.gameInfo}>
                {!isGameDraw && (
                  <View style={styles.gameInfoSemiTitleContainer}>
                    <Image style={{ width: 35, height: 35 }} source={IMAGE.P} />
                    <Text style={styles.gameInfoSemiTitle}>erdant</Text>
                  </View>
                )}
                <View style={styles.gameInfoDetailTitleContainer}>
                  <Text style={styles.detailTitle}>
                    Joueur {gameInfos.loser === "draw" ? "2" : gameInfos.loser}
                  </Text>
                </View>
                <View style={styles.gameInfoDetailTitleContainer}>
                  <Text style={styles.detailTitle}>Pion(s) utilisé(s)</Text>
                  <Text style={styles.detailStatText}>
                    {gameInfos.loserUsedTokens}
                  </Text>
                </View>
                {gameInfos.loserScore !== null && (
                  <View style={styles.gameInfoDetailTitleContainer}>
                    <Text style={styles.detailTitle}>Score</Text>
                    <Text style={styles.detailStatText}>
                      {gameInfos.loserScore}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.gameInfoGlobal}>
              <View style={{ width: "50%" }}>
                <Text style={styles.gameInfoSemiTitle}>Durée</Text>
                <Text style={styles.globalInfoText}>
                  {gameInfos.gameDuration}
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text
                  style={[
                    styles.gameInfoSemiTitle,
                    { fontSize: 21, letterSpacing: 0 },
                  ]}
                >
                  Type de victoire
                </Text>
                <Text style={styles.globalInfoText}>
                  {isGameDraw ? "-" : gameInfos.victoryType}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={[
                  styles.gameInfoSemiTitle,
                  { fontSize: 21, letterSpacing: 0 },
                ]}
              >
                Type de jeu
              </Text>

              <Text style={styles.gameInfoSemiTitle}>{gameInfos.gameType}</Text>
            </View>
          </View>
          <NavigationButton
            navigation={navigation}
            navigationMenu={"Yam Master"}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  gameInfoContainer: {},
  gameInfoModal: {
    borderRadius: 10,
  },
  gameInfoModalWrapper: {
    flex: 1,
    backgroundColor: COLOR.ZELDA_SECONDARY,
    shadowColor: COLOR.WHITE,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minHeight: 300,
  },

  gameInfoTitle: {
    fontSize: 35,
    padding: 10,
    textAlign: "center",
    color: COLOR.WHITE,
    fontFamily: "Hylia-Serif",
  },

  gameInfoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    padding: 5,
    height: "100%",
    borderWidth: 1,
    borderColor: COLOR.WHITE,
  },
  gameInfoPlayers: {
    flex: 2,
    flexDirection: "row",
    width: "100%",
  },
  gameInfoSemiTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  gameInfoSemiTitle: {
    textAlign: "center",
    fontSize: 21,
    color: COLOR.WHITE,
    letterSpacing: 2,
  },
  gameInfo: {
    flex: 1,
    justifyContent: "space-between",
    width: "50%",
    color: COLOR.WHITE,
    textAlign: "center",
  },
  gameInfoDetailTitleContainer: {
    alignItems: "center",
  },
  detailTitle: {
    fontFamily: "roboto",
    fontSize: 18,
    color: COLOR.WHITE,
  },
  detailStatText: {
    fontFamily: "roboto",
    fontSize: 18,
    color: COLOR.WHITE,
  },
  gameInfoGlobal: {
    flex: 1,
    flexDirection: "row",
    color: COLOR.WHITE,
    width: "100%",
    color: COLOR.WHITE,
    marginTop: 10,
  },
  globalInfoText: {
    height: "100%",
    alignContent: "center",
    textAlign: "center",
    fontSize: 20,
    color: COLOR.WHITE,
  },
});

export default GameInfo;
