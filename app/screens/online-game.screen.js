// app/screens/online-game.screen.js

import React, { useContext } from "react";
import OnlineGameController from "../controllers/online-game.controller";
import { StyleSheet, View, Button, Text } from "react-native";
import { SocketContext } from '../contexts/socket.context';

export default function OnlineGameScreen({ navigation }) {
    const socket = useContext(SocketContext);
    return (
        <View style={styles.container}>
            {!socket && (
                <>
                    <Text style={styles.paragraph}>
                        No connection with server...
                    </Text>
                    <Text style={styles.footnote}>
                        Restart the app and wait for the server to be back again.
                    </Text>
                </>
            )}
            {socket && (
                <><OnlineGameController /><>
                    <Text style={styles.paragraph}>
                        Online Game Interface
                    </Text>
                    <Text style={styles.footnote}>
                        My socket id is: {socket.id}
                    </Text>
                    <Button
                        title="Revenir au menu"
                        onPress={() => navigation.navigate('HomeScreen')} />
                </></>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    }
});