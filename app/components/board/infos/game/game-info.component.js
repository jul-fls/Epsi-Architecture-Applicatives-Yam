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
  const [isModalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    socket.on("game.game-over", (data) => {
      setGameInfos(data["gameInfos"]);
    });
  }, []);

  console.log("gameInfos :: ", gameInfos);

  return (
    <View style={isGameInfosExist ? { flex: 1, position: "absolute" } : {}}>
      <Modal
        style={styles.gameReviewModal}
        isVisible={
          // isGameInfosExist
          true
        }
      >
        <View style={styles.gameReviewModalWrapper}>
          <View style={styles.gameReviewInfo}></View>
          <Text style={{ color: COLOR.WHITE }}>Revenir au menu</Text>

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
  gameRevieContainer: {},
  gameReviewModal: {
    borderRadius: 10,
  },
  gameReviewModalWrapper: {
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
});

export default GameInfo;
