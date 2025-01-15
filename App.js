import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useFonts } from "expo-font";
import React ,{useState , useEffect}from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthenticatedRoutes, UnauthenticatedRoutes} from "./routes/homeStack";
import globalStyles from "./utils/styles";

import {View} from "react-native";
const Stack = createStackNavigator();

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        if(token){
          const response = await fetch("http://localhost:8080/api/auth/check-token",{
            method : "GET",
            headers:{
              Authorization:`Bearer ${token}`,
            }
          })
          if(response.ok){
            setIsAuthenticated(true)
          }else{
            setIsAuthenticated(false)
            await AsyncStorage.removeItem("jwtToken")
          }
        }

      } catch (error) {
        console.log("Failed to retrieve token:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };


  const [fontsLoaded] = useFonts({
    NATS: require("./assets/fonts/NATS-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLECLIENTID}>
      <View style={globalStyles.root}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name="AuthenticatedRoutes" >
                  {()=>(
                        <AuthenticatedRoutes/>
                )}
                </Stack.Screen>
            ) : (
                <Stack.Screen name="UnauthenticatedRoutes" screenOptions={{ headerShown: false }}>
                  {(props) => (
                      <UnauthenticatedRoutes
                          {...props}
                          onLoginSuccess={handleLoginSuccess}
                      />
                  )}
                </Stack.Screen>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </GoogleOAuthProvider>
  );
}


