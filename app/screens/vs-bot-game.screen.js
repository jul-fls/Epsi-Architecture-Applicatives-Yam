// app/screens/vs-bot-game.screen.js

import React, { useContext, useEffect } from "react";
import BotGameController from "../controllers/bot-game.controller";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet } from "react-native";
import { SocketContext } from "../contexts/socket.context";
import { COLOR } from "../constants/color";
import { IMAGE } from "../constants/asset";


export default function VsBotGameScreen() {
  const socket = useContext(SocketContext);
  const navigation = useNavigation();

  useEffect(() => {
    // Listener to handle back press on Android or navigation stack manipulation
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Prevent default back behavior
      e.preventDefault();

      // Notify the server to reset the game once
      socket.emit('game.cancel', { reason: 'user navigated back' });

      // After ensuring the server has been notified, continue with back navigation
      navigation.dispatch(e.data.action);
    });

    return () => {
      unsubscribe();
    };
  }, [navigation, socket]); // Dependencies that ensure the listener is added only once per socket and navigation instance

  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGE.BACKGROUND_TEXTURE}
        resizeMode="cover"
        style={styles.background}
      >
        {socket ? (
          <>
            <BotGameController />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  socket.emit('game.cancel', { reason: 'user pressed back button' });
                  navigation.navigate("Yam Master");
                }}
                style={styles.button}
              >
                <Image
                  style={{ marginRight: 10 }}
                  source={IMAGE.BUTTON_ACCESSORY}
                />
                <Text style={styles.buttonText}>Revenir au menu</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.paragraph}>No connection with server...</Text>
            <Text style={styles.footnote}>
              Restart the app and wait for the server to be back again.
            </Text>
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
    flexDirection: "row",
    alignItems: "center",
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
