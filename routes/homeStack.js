import React ,{useState , useEffect}from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import Settings from "../src/screens/Settings";
import Login from "../src/screens/Login";
import Register from "../src/screens/Register";
import Splash from "../src/screens/Splash";
import Navbar from "../src/Components/Navbar";
import Account from "../src/screens/Account";
import Todo from "../src/screens/Todo"
import Projects from "../src/screens/Projects";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export const AuthenticatedRoutes = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Main" component={Navbar} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Account" component={Account}/>
        <Stack.Screen name="Todo" component={Todo}/>
        <Stack.Screen name="Projects" component={Projects}/>
    </Stack.Navigator>
);

export const UnauthenticatedRoutes = ({onLoginSuccess}) => {

    return(
    <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login">
            {(props) => <Login {...props} onLoginSuccess={onLoginSuccess} />}
        </Stack.Screen>
        <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
);};
