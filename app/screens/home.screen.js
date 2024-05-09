// app/screens/home.screen.js

import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Image,
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
        <View style={styles.wrapper}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>YAM MASTER</Text>
            <View style={styles.imageContainer}>
              <Image source={require("../assets/dices.png")} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("OnlineGameScreen")}
                style={styles.button}
              >
                <Image
                  style={{ marginRight: 10 }}
                  source={require("../assets/battle.png")}
                />
                <Text style={styles.buttonText}>Jouer en ligne</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("VsBotGameScreen")}
                style={styles.button}
              >
                <Image
                  style={{ marginRight: 10 }}
                  source={require("../assets/battle.png")}
                />
                <Text style={styles.buttonText}>Jouer contre le bot</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.imageContainer && styles.footerContainer}>
            <Image source={require("../assets/beasts.png")} />
          </View>
        </View>
        <Image
          style={{ position: "absolute", right: 0, bottom: 150 }}
          source={require("../assets/sword.png")}
        />
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.ZELDA_PRIMARY,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    position: "absolute",
    top: 100,
  },
  title: {
    color: COLOR.WHITE,
    fontFamily: "Hylia-Serif",
    fontSize: 60,
    marginBottom: 20,
  },
  footerContainer: {
    position: "absolute",
    bottom: 50,
  },
  imageContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLOR.ZELDA_BLUE,
    padding: 25,
    marginVertical: 5,
    width: 350,
  },
  buttonText: {
    fontSize: 25,
    fontFamily: "Hylia-Serif",
    color: COLOR.ZELDA_BLUE,
  },
  background: {
    flex: 1,
    width: null,
    height: "100%",
  },
});
