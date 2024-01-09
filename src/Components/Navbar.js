// Navbar.js
import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Ionicons from "@expo/vector-icons/Ionicons";

import Conversations from "../Screens/Conversations";
import Projects from "../screens/Projects";
import Contacts from "../screens/Contacts";
import Settings from "../screens/Settings";
import Home from "../Screens/Home";

const Tab = createMaterialBottomTabNavigator();

export default function Navbar() {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      barStyle={{ backgroundColor: '#fff' }} 
      color="#3D4A7A"
      activeColor="#3D4A7A"
      inactiveColor="#797C7B"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={24} />
            
          ),
          tabBarIconStyle: {  borderRadius: 5 },
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
