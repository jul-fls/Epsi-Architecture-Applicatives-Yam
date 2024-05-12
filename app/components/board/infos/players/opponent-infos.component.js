import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SocketContext } from "../../../../contexts/socket.context";
import { COLOR } from "../../../../constants/color";
import { IMAGE } from "../../../../constants/asset";
import { replaceString } from "../../../../assets/utils/utility";
const OpponentInfos = () => {
  const socket = useContext(SocketContext);
  const [opponentInfos, setOpponentInfos] = useState({});
  const [gameType, setGameType] = useState("");

  useEffect(() => {
    socket.on("game.players-infos.view-state", (data) => {
      setOpponentInfos(data["opponentInfos"]);
      setGameType(data["opponentInfos"]["gameType"]);
    });
  }, []);

  return (
    <View style={styles.opponentInfosContainer}>
      {gameType === "bot" ? (
        <>
          <Image
            style={[styles.opponentImage, { width: 35, height: 35 }]}
            source={IMAGE.ROBOT}
          />
          <Text style={styles.opponentInfosText}>Bot</Text>
        </>
      ) : (
        <>
          <Image style={styles.opponentImage} source={IMAGE.OPPONENT} />
          <Text style={styles.opponentInfosText}>
            {opponentInfos.playerKey &&
              replaceString(opponentInfos.playerKey, "player:", "joueur ")}
          </Text>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  opponentInfosContainer: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: COLOR.WHITE,
    backgroundColor: COLOR.ZELDA_SECONDARY,
  },
  opponentImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  opponentInfosText: {
    color: COLOR.WHITE,
    fontFamily: "Hylia-Serif",
    fontSize: 20,
  },
});

export default OpponentInfos;
