import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useFonts } from "expo-font";
import React ,{useState,useEffect} from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import {AuthenticatedRoutes , UnauthenticatedRoutes} from "./routes/homeStack";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    NATS: require("./assets/fonts/NATS-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <View />;
  }
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const checkAuth = async ()=>{
      try{
        const token = await AsyncStorage.getItem("jwtToken");
        setIsAuthenticated(!!token);
      }catch(error){
      console.log("Failed to retrieve token:", error);
    }
    }
    checkAuth();
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLECLIENTID}>
      <View style={styles.root}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated? <AuthenticatedRoutes/> : <UnauthenticatedRoutes/>}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </GoogleOAuthProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});
