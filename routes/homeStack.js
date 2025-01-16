import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Settings from "../src/screens/Settings";
import Login from "../src/screens/AuthScreens/Login";
import Register from "../src/screens/AuthScreens/Register";
import Splash from "../src/screens/AuthScreens/Splash";
import Navbar from "../src/Components/Navbar";
import Account from "../src/screens/SettingsSubScreens/Account";
import Todo from "../src/screens/NavScreens/Todo"
import Projects from "../src/screens/NavScreens/Projects";
import Help from "../src/screens/SettingsSubScreens/Help";
import Invit from "../src/screens/SettingsSubScreens/Invit";
import Notification from "../src/screens/SettingsSubScreens/Notification";
import {UserProvider} from "../utils/Context/UserContext";
import {TodoProvider} from "../utils/Context/TodoContext";
import {ProjectProvider} from "../utils/Context/ProjectContext";
import Conversations from "../src/screens/NavScreens/Conversations";
import Chat from "../src/screens/Chat"
const Stack = createStackNavigator();

export const AuthenticatedRoutes = () => (
    <UserProvider>
        <TodoProvider>
            <ProjectProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }} >
                    <Stack.Screen name="Main" component={Navbar} />
                    <Stack.Screen name="Settings" component={Settings} />
                    <Stack.Screen name="Todo" component={Todo}/>
                    <Stack.Screen name="Projects" component={Projects}/>
                    <Stack.Screen name="Conversations" component={Conversations}/>
                    <Stack.Screen name="Chat" component={Chat}/>
                    {/* SubScreens of settings*/}
                    <Stack.Screen name="Account" component={Account}/>
                    <Stack.Screen name="Help" component={Help}/>
                    <Stack.Screen name="Invit" component={Invit}/>
                    <Stack.Screen name="Notification" component={Notification}/>
                </Stack.Navigator>
            </ProjectProvider>
        </TodoProvider>
    </UserProvider>

);

export const UnauthenticatedRoutes = ({onLoginSuccess}) => {

    return(
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login">
                {(props) => <Login {...props} onLoginSuccess={onLoginSuccess} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );};
