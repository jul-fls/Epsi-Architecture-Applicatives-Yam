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
import { IMAGE } from "../constants/asset";
import NavigationButton from "../components/navigation-button.component";

export default function OnlineGameScreen({ navigation }) {
  const socket = useContext(SocketContext);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGE.BACKGROUND_TEXTURE}
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
            <NavigationButton
              navigation={navigation}
              navigationMenu={"Yam Master"}
            />
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
});
