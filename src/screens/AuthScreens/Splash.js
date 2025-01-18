import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleLogin } from "@react-oauth/google";

export default function Splash() {
  const backgroundImage = require("../../../assets/img/Splash.jpg");
  const invisibleGeorgesImage = require("../../../assets/img/georgesinvisible.png");
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate("Login");
  };
  const goToRegister = () => {
    navigation.navigate("Register");
  };

  const handleGoogleLogin = async (res) => {
    const googleToken = res.credential;
    try {
      const response = await fetch("http://localhost:8080/api/oauth2/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: googleToken }),
      });
      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem("jwtToken", data.accessToken);
      } else {
        throw new Error("Erreur lors de la connexion google");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion google : ", error);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Échec de la connexion Google :", error);
  };

  return (
      <View style={styles.root}>
        <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            style={styles.container}
        >
          <View style={styles.content}>
            <View style={styles.georges}>
              <Text style={styles.title}>Georges</Text>
              <Text style={styles.subtitle}>
                Connecte Georges à toutes tes applications. Il fera le reste !
              </Text>
            </View>
            <Image
                source={invisibleGeorgesImage}
                style={styles.invisibleGeorgesImage}
            />
            <View style={styles.iconContainer}>
              <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onFailure={handleGoogleLoginFailure}
                  client_id="465032956776-hod020he9c10cbvpikor1t5uq1fohaij.apps.googleusercontent.com"
                  useOneTap
              />
            </View>

            {/* Email Registration */}
            <TouchableOpacity
                onPress={goToRegister}
                style={styles.continueContainer}
            >
              <Text style={styles.continue}>S'enregister avec l'email</Text>
            </TouchableOpacity>

            {/* Login */}
            <TouchableOpacity onPress={goToLogin}>
              <Text style={styles.connecter}>Déjà un compte ? Se connecter</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height:height,
    width:width,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  georges: {
    alignItems: "center",
  },
  title: {
    fontSize: width * 0.1,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: width * 0.045,
    color: "white",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  invisibleGeorgesImage: {
    width: width * 0.8,
    height: height * 0.3,
    resizeMode: "contain",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  continueContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#252D4A",
    borderRadius: 16,
    height: 44,
  },
  continue: {
    color: "white",
    fontSize: 18,
  },
  connecter: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
  },
});
