import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Conversations from "../screens/NavScreens/Conversations";
import Home from "../screens/NavScreens/Home";
import Calendrier from "../screens/NavScreens/Calendar";
import Projects from "../screens/NavScreens/Projects";
import Todo from "../screens/NavScreens/Todo";
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
          route.name === "Calendar" ? "calendar"
            : route.name === "Conversations" ? "chatbubble"
            : route.name === "Todo" ? "reader"
            : route.name === "Projects" ? "desktop"
            :"";

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
        initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Calendar"
        component={Calendrier}
        options={{ tabBarLabel: "Calendar" }}
      />
        <Tab.Screen
            name="Todo"
            component={Todo}
            options={{ tabBarLabel: "Todo" }}
        />
      <Tab.Screen
        name="Home"
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
        <Tab.Screen
            name="Projects"
            component={Projects}
            options={{ tabBarLabel: "Projects" }}
        />
    </Tab.Navigator>
  );
}
