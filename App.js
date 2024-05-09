// ./App.js

import React from "react";
import { LogBox, ImageBackground, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./app/screens/home.screen.js";
import { SocketContext, socket } from "./app/contexts/socket.context";
import OnlineGameScreen from "./app/screens/online-game.screen";
import VsBotGameScreen from "./app/screens/vs-bot-game.screen";
import { COLOR } from "./app/constants/color";

const Stack = createStackNavigator();
const backgroundTextureImage = require("./app/assets/background_texture.png");
LogBox.ignoreAllLogs(true);

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <ImageBackground
        source={backgroundTextureImage}
        resizeMode="cover"
        style={styles.background}
      >
        <NavigationContainer
          theme={{
            colors: {
              background: "transparent",
              border: COLOR.ZELDA_BLUE,
            },
          }}
        >
          <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Group screenOptions={{}}>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="OnlineGameScreen"
                component={OnlineGameScreen}
              />
              <Stack.Screen
                name="VsBotGameScreen"
                component={VsBotGameScreen}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </SocketContext.Provider>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
export default App;
