// app/screens/home.screen.js

import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { COLOR } from "../constants/color";
import { useFonts } from "expo-font";

const backgroundImage = require("../assets/background.png");

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Hylia-Serif": require("../assets/fonts/HyliaSerif.ttf"),
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="stretch"
        style={styles.background}
      >
        <View style={styles.buttonContainer}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("OnlineGameScreen")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Jouer en ligne</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("VsBotGameScreen")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Jouer contre le bot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.ZELDA_PRIMARY,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: COLOR.ZELDA_BLUE,
    padding: 15,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Hylia-Serif",
    color: COLOR.ZELDA_BLUE,
  },
  background: {
    flex: 1,
    width: null,
    height: "100%",
  },
});
