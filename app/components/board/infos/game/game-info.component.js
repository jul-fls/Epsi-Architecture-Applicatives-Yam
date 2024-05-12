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
import NavigationButton from "../../../navigation-button.component";

const GameInfo = () => {
  const socket = useContext(SocketContext);
  const [gameInfos, setGameInfos] = useState({});
  const isGameInfosExist = Object.keys(gameInfos).length !== 0;

  useEffect(() => {
    socket.on("game.game-over", (data) => {
      setGameInfos(data["gameInfos"]);
    });
  }, []);

  return (
    <View style={isGameInfosExist ? { flex: 1, position: "absolute" } : {}}>
      <Modal
        style={styles.gameInfoModal}
        isVisible={
          // isGameInfosExist
          true
        }
      >
        <View style={styles.gameInfoModalWrapper}>
          <Text style={styles.gameInfoTitle}>Résumé de la partie</Text>
          <View style={styles.gameInfoContainer}>
            <Text style={[styles.gameInfoSemiTitle, { marginBottom: 10 }]}>
              Egalité
            </Text>
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
                <Text style={styles.gameInfoSemiTitle}>Vainqueur</Text>
                <View style={styles.gameInfoDetailTitleContainer}>
                  <Text style={styles.detailTitle}>joueur1</Text>
                </View>
                <View style={styles.gameInfoDetailTitleContainer}>
                  <Text style={styles.detailTitle}>Title (Token)</Text>
                  <Text style={styles.detailStatText}>10</Text>
                </View>
                <View style={styles.gameInfoDetailTitleContainer}>
                  <Text style={styles.detailTitle}>Title (Score)</Text>
                  <Text style={styles.detailStatText}>10</Text>
                </View>
              </View>
              <View style={styles.gameInfo}>
                <Text style={styles.gameInfoSemiTitle}>Perdent</Text>
                <View style={styles.gameInfoDetailTitleContainer}>
                  <Text style={styles.detailTitle}>joueur 2</Text>
                </View>
                <View style={styles.gameInfoDetailTitleContainer}>
                  <Text style={styles.detailTitle}>Title (Token)</Text>
                  <Text style={styles.detailStatText}>10</Text>
                </View>
                <View style={styles.gameInfoDetailTitleContainer}>
                  <Text style={styles.detailTitle}>Title (Score)</Text>
                  <Text style={styles.detailStatText}>10</Text>
                </View>
              </View>
            </View>
            <View style={styles.gameInfoGlobal}>
              <View style={{ width: "50%" }}>
                <Text style={styles.gameInfoSemiTitle}>Duration</Text>
                <Text style={styles.globalInfoText}>01:02:03</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={styles.gameInfoSemiTitle}>Victory Type</Text>
                <Text style={styles.globalInfoText}>Alignement</Text>
              </View>
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
    padding: 10,
    height: "100%",
    borderWidth: 1,
    borderColor: COLOR.WHITE,
  },
  gameInfoPlayers: {
    flex: 2,
    flexDirection: "row",
    width: "100%",
  },
  gameInfoSemiTitle: {
    textAlign: "center",
    fontSize: 27,
    color: COLOR.WHITE,
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
    fontWeight: "bold",
    fontSize: 15,
    color: COLOR.WHITE,
  },
  detailStatText: {
    fontSize: 15,
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
