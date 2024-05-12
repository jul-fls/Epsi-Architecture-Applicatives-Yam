// app/screens/online-game.screen.js

import React, { useContext, useEffect } from "react";
import OnlineGameController from "../controllers/online-game.controller";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { SocketContext } from "../contexts/socket.context";
import { COLOR } from "../constants/color";
import { IMAGE } from "../constants/asset";

export default function OnlineGameScreen() {
  const socket = useContext(SocketContext);
  const navigation = useNavigation();

  useEffect(() => {

    const handleGameCancel = () => {
      console.log("Game cancelled by the other player.");
      navigation.navigate("Yam Master"); // Assuming "Yam Master" is your home screen
    };

    // Add event listener for game cancellation
    socket.on('game.reset', handleGameCancel);


    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Prevent the default back behavior
      e.preventDefault();

      // Notify the server that the user is navigating away from the game
      socket.emit('game.cancel', { reason: 'user navigated back' });

      // Continue with the original navigation action
      navigation.dispatch(e.data.action);
    });

    return () => {
      unsubscribe();
    };
  }, [navigation, socket]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGE.BACKGROUND_TEXTURE}
        resizeMode="cover"
        style={styles.background}
      >
        {socket ? (
          <>
            <OnlineGameController />
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