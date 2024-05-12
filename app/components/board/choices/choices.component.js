import React, { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { COLOR } from "../../../constants/color";
import { DiceContext } from "../../../contexts/dice.context";
const Choices = () => {
  const socket = useContext(SocketContext);
  const { isDiceRolled } = useContext(DiceContext);
  const [displayChoices, setDisplayChoices] = useState(false);
  const [canMakeChoice, setCanMakeChoice] = useState(false);
  const [idSelectedChoice, setIdSelectedChoice] = useState(null);
  const [availableChoices, setAvailableChoices] = useState([]);

  useEffect(() => {
    socket.on("game.choices.view-state", (data) => {
      setDisplayChoices(data["displayChoices"]);
      setCanMakeChoice(data["canMakeChoice"]);
      setIdSelectedChoice(data["idSelectedChoice"]);
      setAvailableChoices(data["availableChoices"]);
    });
  }, []);

  const handleSelectChoice = (choiceId) => {
    if (canMakeChoice) {
      setIdSelectedChoice(choiceId);
      socket.emit("game.choices.selected", { choiceId });
    }
  };

  return (
    <View style={styles.choicesContainer}>
      {displayChoices &&
        !isDiceRolled &&
        availableChoices.map((choice) => (
          <TouchableOpacity
            key={choice.id}
            style={[
              styles.choiceButton,
              idSelectedChoice === choice.id && styles.selectedChoice,
              !canMakeChoice && styles.disabledChoice,
              !choice.enabled && styles.disabledChoice,
            ]}
            onPress={() => handleSelectChoice(choice.id)}
            disabled={!canMakeChoice || !choice.enabled}
          >
            <Text
              style={[
                styles.choiceText,
                idSelectedChoice === choice.id
                  ? { color: COLOR.ZELDA_SECONDARY }
                  : { color: COLOR.WHITE },
              ]}
            >
              {choice.value}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  choicesContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: COLOR.ZELDA_SECONDARY,
    backgroundColor: COLOR.ZELDA_SECONDARY,
    borderWidth: 1,
    borderTopColor: COLOR.WHITE,
    borderBottomColor: COLOR.WHITE,
  },
  choiceButton: {
    borderWidth: 1,
    borderColor: COLOR.WHITE,
    backgroundColor: COLOR.ZELDA_PRIMARY,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "13%",

    marginVertical: 3,
  },
  selectedChoice: {
    backgroundColor: COLOR.ZELDA_BLUE,
  },
  choiceText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  disabledChoice: {
    opacity: 0.3,
  },
});

export default Choices;
