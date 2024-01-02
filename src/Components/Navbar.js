// Navbar.js
import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Ionicons from "@expo/vector-icons/Ionicons";

import Conversations from "../Screens/Conversations";
import Projects from "../Screens/Projects";
import Contacts from "../Screens/Contacts";
import Settings from "../Screens/Settings";
import Home from "../Screens/Home";

const Tab = createMaterialBottomTabNavigator();

export default function Navbar() {
  return (
    <Tab.Navigator
      initialRouteName="Conversations"
      barStyle={{ backgroundColor: "#181818", opacity: "0.2" }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Conversations"
        component={Conversations}
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubbles-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Projects"
        component={Projects}
        options={{
          tabBarLabel: "Projects",
          tabBarIcon: ({ color }) => (
            <Ionicons name="briefcase-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarLabel: "Contacts",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cog-outline" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
