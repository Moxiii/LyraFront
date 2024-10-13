import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Conversations from "../screens/Conversations";
import Splash from "../screens/Splash";
import Home from "../screens/Home";
import Calendar from "../screens/Calendar";

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "rgba(43, 43, 43, 0.5)",
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderTopWidth: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const color = isFocused
          ? "rgba(255, 255, 255, 1)"
          : "rgba(255, 255, 255, 0.8)";
        const iconName =
          route.name === "Calendar"
            ? "calendar"
            : route.name === "Conversations"
            ? "chatbubble"
            : "";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {iconName !== "" && (
              <Ionicons name={iconName} size={24} color={color} />
            )}
            {iconName === "" && (
              <View style={{ position: "relative" }}>
                <View
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 50,
                    backgroundColor: "rgba(33, 33, 33, 0.9)",
                    position: "absolute",
                    top: -60,
                    right: -45,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/img/voicebutton256.png")}
                    style={{ width: 50, height: 50 }}
                  />
                </View>
              </View>
            )}
            {label !== "" && (
              <Text style={{ color: color, fontSize: 12, marginTop: 5 }}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{ tabBarLabel: "Calendrier" }}
      />
      <Tab.Screen
        name="InvisibleSpeakButton"
        component={Home}
        options={{ tabBarLabel: "" }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            /* TODO: Enregistreur vocal */
          },
        })}
      />
      <Tab.Screen
        name="Conversations"
        component={Conversations}
        options={{ tabBarLabel: "Messages" }}
      />
    </Tab.Navigator>
  );
}
