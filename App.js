import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";

import Navbar from "./src/components/Navbar";
import Register from "./src/screens/Login";
import Login from "./src/screens/Login";
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
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
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
});
