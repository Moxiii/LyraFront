import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import Conversations from "../screens/Conversations";
import Projects from "../screens/Projects";
import Contacts from "../screens/Contacts";
import Settings from "../screens/Settings";
import Splash from "../screens/Splash";
import Home from "../screens/Home";

import { Button } from "react-native-paper";

const Tab = createMaterialBottomTabNavigator();

export default function Navbar() {
  const route = useRoute();
  const invisibleSpeakButtonImage = require("../../assets/img/voicebutton256.png");

  console.log(route.name);
  const getTabBarStyle = () => {
    if (route.name === "LoginRegister" || route.name === "Settings") {
      return styles.tabBar;
    } else {
      return styles.tabBarTransparent;
    }
  };
  return (
    <Tab.Navigator
      initialRouteName="Calendar"
      barStyle={getTabBarStyle()}
      activeColor="#3D4A7A"
      inactiveColor="#A1A7B3"
      labeled={false}
    >
      <Tab.Screen
        name="Calendar"
        component={Splash}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="InvisibleSpeakButton"
        component={Home} // Vous pouvez utiliser n'importe quel composant ici, car il sera remplacé par le bouton
        options={{
          tabBarIcon: () => (
            <Image
              source={invisibleSpeakButtonImage}
              style={styles.invisibleSpeakButtonImage}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // e.preventDefault(); // Empêche le changement d'onglet
            // Ajoutez ici le code à exécuter lorsque l'image est pressée
          },
        })}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarTransparent: {
    height: 80,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    position: "absolute",
  },
  tabBar: {
    height: 80,
    backgroundColor: "white",
    borderTopWidth: 0,
    position: "absolute",
  },
  invisibleSpeakButtonImage: {
    marginBottom: "10%",
    width: 70,
    height: 70,
    position: "absolute",
    top: -30,
  },
});
