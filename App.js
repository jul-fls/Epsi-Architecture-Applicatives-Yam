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
import { IMAGE } from "./app/constants/asset.js";
const Stack = createStackNavigator();
LogBox.ignoreAllLogs(true);

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <ImageBackground
        source={IMAGE.BACKGROUND_TEXTURE}
        resizeMode="cover"
        style={styles.background}
      >
        <NavigationContainer
          theme={{
            colors: {
              text: COLOR.WHITE,
              background: "transparent",
            },
          }}
        >
          <Stack.Navigator initialRouteName="Yam Master">
            <Stack.Group screenOptions={{}}>
              <Stack.Screen
                name="Yam Master"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Jouer en ligne"
                component={OnlineGameScreen}
                options={{
                  headerLeft: () => null,
                  title: "Jouer En Ligne",
                  headerTitleAlign: "center",
                }} // This hides the back arrow
              />
              <Stack.Screen
                name="Jouer contre le bot"
                component={VsBotGameScreen}
                options={{
                  headerLeft: () => null,
                  title: "Jouer contre le bot",
                  headerTitleAlign: "center",
                }} // This hides the back arrow
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
    width: "100%",
  },
});
export default App;
