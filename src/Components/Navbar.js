import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Conversations from "../Screens/Conversations";
import Projects from "../screens/Projects";
import Contacts from "../screens/Contacts";
import Settings from "../screens/Settings";
import Home from "../Screens/Home";

const Tab = createMaterialBottomTabNavigator();

export default function Navbar() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/img/GeorgesBG.jpeg")}
        style={styles.backgroundImage}
      >
        <Tab.Navigator
          initialRouteName="Home"
          barStyle={styles.tabBar}
          activeColor="#3D4A7A"
          inactiveColor="#A1A7B3"
          labeled={false}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Conversations"
            component={Conversations}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="chatbubbles" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Projects"
            component={Projects}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="briefcase" size={24} color={color} />
              ),
            }}
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  tabBar: {
    height: 80,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    position: "absolute",
  },
});
