import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Conversations from "../screens/Conversations";
import Projects from "../screens/Projects";
import Contacts from "../screens/Contacts";
import Settings from "../screens/Settings";
import Home from "../screens/Home";

const Tab = createMaterialBottomTabNavigator();

export default function Navbar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={styles.tabBarTransparent}
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
});
