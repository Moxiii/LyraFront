import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Navbar from "./src/Components/Navbar";
import Register from "./src/screens/Register"; 
import Login from "./src/screens/Login"; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Navbar"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Navbar" component={Navbar} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
