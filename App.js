import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useFonts } from "expo-font";
import React ,{useState , useEffect}from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthenticatedRoutes, UnauthenticatedRoutes} from "./routes/homeStack";
import {UserProvider} from "./utils/Context/UserContext";


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

    checkAuth(); // Call the function to check auth status
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
      <View style={styles.root}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name="AuthenticatedRoutes" >
                  {()=>(
                  <UserProvider>
                    <AuthenticatedRoutes/>
                  </UserProvider>
                )}
                </Stack.Screen>
            ) : (
                <Stack.Screen name="UnauthenticatedRoutes">
                  {(props) => <UnauthenticatedRoutes {...props} onLoginSuccess={handleLoginSuccess} />}
                </Stack.Screen>
            )}
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
