// app/screens/home.screen.js

import { StyleSheet, View, Button } from "react-native";
import { COLOR } from "../constants/color";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Button
          color={COLOR.DARK_GREEN}
          title="Jouer en ligne"
          onPress={() => navigation.navigate("OnlineGameScreen")}
        />
      </View>
      <View>
        <Button
          color={COLOR.DARK_GREEN}
          title="Jouer contre le bot"
          onPress={() => navigation.navigate("VsBotGameScreen")}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BEIGE_LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
});
