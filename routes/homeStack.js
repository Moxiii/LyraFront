import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Settings from "../src/screens/Settings";
import Login from "../src/screens/Login";
import Register from "../src/screens/Register";
import Splash from "../src/screens/Splash";
import Navbar from "../src/Components/Navbar";
import Account from "../src/screens/Account";
import Todo from "../src/screens/Todo"
import Projects from "../src/screens/Projects";
import {UserProvider} from "../utils/Context/UserContext";
import {TodoProvider} from "../utils/Context/TodoContext";
import {ProjectProvider} from "../utils/Context/ProjectContext";

const Stack = createStackNavigator();

export const AuthenticatedRoutes = () => (
    <UserProvider>
        <TodoProvider>
            <ProjectProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }} >
                    <Stack.Screen name="Main" component={Navbar} />
                    <Stack.Screen name="Settings" component={Settings} />
                    <Stack.Screen name="Account" component={Account}/>
                    <Stack.Screen name="Todo" component={Todo}/>
                    <Stack.Screen name="Projects" component={Projects}/>
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
