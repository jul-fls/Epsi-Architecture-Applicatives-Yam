// app/screens/online-game.screen.js

import React, { useContext } from "react";
import OnlineGameController from "../controllers/online-game.controller";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { SocketContext } from "../contexts/socket.context";
import { COLOR } from "../constants/color";

const backgroundTextureImage = require("../assets/background_texture.png");

export default function OnlineGameScreen({ navigation }) {
  const socket = useContext(SocketContext);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundTextureImage}
        resizeMode="cover"
        style={styles.background}
      >
        {!socket && (
          <>
            <Text style={styles.paragraph}>No connection with server...</Text>
            <Text style={styles.footnote}>
              Restart the app and wait for the server to be back again.
            </Text>
          </>
        )}
        {socket && (
          <>
            <OnlineGameController />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}
                style={styles.button}
              >
                <Image
                  style={{ marginRight: 10 }}
                  source={require("../assets/battle.png")}
                />
                <Text style={styles.buttonText}>Revenir au menu</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.ZELDA_PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 15,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLOR.ZELDA_BLUE,
    paddingVertical: 10,
    width: "100%",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Hylia-Serif",
    color: COLOR.ZELDA_BLUE,
  },
});
