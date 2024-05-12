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

  console.log("gameInfos :: ", gameInfos);

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
            <View style={styles.gameInfoPlayers}>
              <View style={styles.gameInfoWrapper}>
                <View>
                  <Text style={styles.gameInfoSemiTitle}>Vainqueur</Text>
                  <View style={styles.gameInfoPlayersDetailContainer}>
                    <Text>Info Vainqueur</Text>
                  </View>
                </View>
              </View>
              <View style={styles.gameInfoLoser}>
                <View>
                  <Text style={styles.gameInfoSemiTitle}>Perdent</Text>
                  <View style={styles.gameInfoPlayersDetailContainer}>
                    <Text>Info Perdent</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.gameInfoGlobal}>
              <View style={styles.gameInfoWrapper}>
                <View>
                  <Text style={styles.gameInfoSemiTitle}>Duration</Text>
                </View>
              </View>
              <View style={styles.gameInfoLoser}>
                <View>
                  <Text style={styles.gameInfoSemiTitle}>Victory Type</Text>
                </View>
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
    height: 300,
    backgroundColor: COLOR.ZELDA_SECONDARY,
    shadowColor: COLOR.WHITE,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  gameInfoTitle: {
    padding: 10,
    textAlign: "center",
    color: COLOR.WHITE,
    fontSize: 30,
    fontFamily: "Hylia-Serif",
  },
  gameInfoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: COLOR.WHITE,
  },
  gameInfoPlayers: {
    flex: 2,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLOR.WHITE,
    width: "100%",
    height: "70%",
    color: COLOR.WHITE,
  },
  gameInfoSemiTitle: {
    flex: 1,
    textAlign: "center",
  },
  gameInfoWrapper: {
    flex: 1,
    backgroundColor: COLOR.DARK_GREEN,
    color: COLOR.WHITE,
    textAlign: "center",
  },
  gameInfoLoser: {
    flex: 1,
    backgroundColor: COLOR.DARK_RED,
    color: COLOR.WHITE,
    textAlign: "center",
  },
  gameInfoPlayersDetailContainer: {
    backgroundColor: COLOR.WHITE,
    height: "100%",
  },
  gameInfoGlobal: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLOR.LIGHT_GREEN,
    color: COLOR.WHITE,
    borderWidth: 1,
    borderColor: COLOR.WHITE,
    width: "100%",
    height: "30%",

    color: COLOR.WHITE,
  },
});

export default GameInfo;
