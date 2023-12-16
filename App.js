import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ImageBackground, StyleSheet } from "react-native";

import Navbar from "./src/Components/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    NATS: require("./assets/fonts/NATS-Regular.ttf"),
  });

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("./assets/img/GeorgesBG.jpeg")}
        resizeMode="cover"
        style={{ flex: 1, height: "100%" }}
      >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Navbar"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="Navbar"
              component={Navbar}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
});
