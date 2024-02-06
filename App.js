import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet, ImageBackground } from "react-native";

import Navbar from "./src/components/Navbar";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    NATS: require("./assets/fonts/NATS-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <View />;
  }
  return (
    <View style={styles.root}>
      <NavigationContainer>
        <ImageBackground
          source={require("./assets/img/GeorgesBG.jpeg")}
          style={styles.backgroundImage}
        >
          <Navbar />
        </ImageBackground>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});
