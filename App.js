// ./App.js

import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./app/screens/home.screen.js";
import { SocketContext, socket } from "./app/contexts/socket.context";
import OnlineGameScreen from "./app/screens/online-game.screen";
import VsBotGameScreen from "./app/screens/vs-bot-game.screen";
import { COLOR } from "./app/constants/color";

const Stack = createStackNavigator();

LogBox.ignoreAllLogs(true);

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <NavigationContainer
        theme={{
          colors: { background: COLOR.BEIGE_LIGHT, border: COLOR.DARK_GREEN },
        }}
      >
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="OnlineGameScreen" component={OnlineGameScreen} />
          <Stack.Screen name="VsBotGameScreen" component={VsBotGameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SocketContext.Provider>
  );
}

export default App;
