import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { COLOR } from "../constants/color";
import { IMAGE } from "../constants/asset";

export default function NavigationButton({ navigation, navigationMenu }) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate(navigationMenu)}
        style={styles.button}
      >
        <Image style={{ marginRight: 10 }} source={IMAGE.BUTTON_ACCESSORY} />
        <Text style={styles.buttonText}>Revenir au menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 15,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
