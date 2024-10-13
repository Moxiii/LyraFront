import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../src/screens/Home";
import Calendar from "../src/screens/Calendar";
import Settings from "../src/screens/Settings";
import Conversations from "../src/screens/Conversations";
import Login from "../src/screens/Login";
import Register from "../src/screens/Register";
import Splash from "../src/screens/Splash";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export const AuthenticatedRoutes = () => (
    <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Calendar" component={Calendar} />
        <Tab.Screen name="Settings" component={Settings} />
        <Tab.Screen name="Conversations" component={Conversations} />
    </Tab.Navigator>
);

export const UnauthenticatedRoutes = () => (
    <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
);
