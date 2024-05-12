import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SocketContext } from "../../../../contexts/socket.context";
import { COLOR } from "../../../../constants/color";
import { IMAGE } from "../../../../constants/asset";
import { replaceString } from "../../../../assets/utils/utility";

const PlayerInfos = () => {
  const socket = useContext(SocketContext);
  const [playerInfos, setPlayerInfos] = useState({});

  useEffect(() => {
    socket.on("game.players-infos.view-state", (data) => {
      setPlayerInfos(data["playerInfos"]);
    });
  }, []);
  return (
    <View style={styles.playerInfosContainer}>
      <Image style={styles.playerImage} source={IMAGE.PLAYER} />
      <Text style={styles.playerInfosText}>
        {playerInfos.playerKey &&
          replaceString(playerInfos.playerKey, "player:", "joueur ")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerInfosContainer: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: COLOR.WHITE,
    backgroundColor: COLOR.ZELDA_SECONDARY,
  },
  playerImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  playerInfosText: {
    color: COLOR.WHITE,
    fontFamily: "Hylia-Serif",
    fontSize: 20,
  },
});

export default PlayerInfos;
