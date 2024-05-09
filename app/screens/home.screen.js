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
import { IMAGE } from "../constants/asset";

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Hylia-Serif": require("../assets/fonts/HyliaSerif.ttf"),
    Roboto: require("../assets/fonts/Roboto.ttf"),
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGE.BACKGROUND}
        resizeMode="stretch"
        style={styles.background}
      >
        <View style={styles.wrapper}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>YAM MASTER</Text>
            <View style={styles.imageContainer}>
              <Image source={IMAGE.DICES} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.symbolFrameContainer}>
              <Image source={IMAGE.SYMBOL_FRAME} />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("OnlineGameScreen")}
                style={styles.button}
              >
                <Image style={{ marginRight: 10 }} source={IMAGE.BATTLE} />
                <Text style={styles.buttonText}>Jouer en ligne</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("VsBotGameScreen")}
                style={styles.button}
              >
                <Image style={{ marginRight: 10 }} source={IMAGE.BATTLE} />
                <Text style={styles.buttonText}>Jouer contre le bot</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.symbolFrameContainer}>
              <Image source={IMAGE.SYMBOL_FRAME} />
            </View>
          </View>
          <View style={styles.imageContainer && styles.footerContainer}>
            <Image source={IMAGE.BEASTS} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  symbolFrameContainer: {
    alignSelf: "center",
    marginVertical: 10,
  },
  titleContainer: {
    marginTop: 70,
  },
  title: {
    textAlign: "center",
    color: COLOR.WHITE,
    fontFamily: "Hylia-Serif",
    fontSize: 50,
    marginBottom: 20,
  },
  footerContainer: {
    marginBottom: 30,
  },
  imageContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLOR.ZELDA_BLUE,
    padding: 25,
    marginVertical: 5,
    width: "100%",
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
