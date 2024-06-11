import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useFonts } from "expo-font";
import React from "react";
import { useEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

// import Navbar from "./src/components/Navbar.js";
import Conversations from "./src/screens/Conversations";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    NATS: require("./assets/fonts/NATS-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <View />;
  }

  


  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLECLIENTID}>
      <View style={styles.root}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="Navbar" component={Navbar} /> */}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Conversation" component={Conversations} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </GoogleOAuthProvider>
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
