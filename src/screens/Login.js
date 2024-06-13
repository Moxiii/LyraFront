import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from '@react-oauth/google';
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const clientId = "1047364862184-5ht68ioumb1cnjmpivurtmvtnb7fkr4s.apps.googleusercontent.com";



export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  
  const goToRegisterPage = () => {
    navigation.navigate("Register");
  };

  const goToHomePage = () => {
    navigation.navigate("Home");
  }


  const handleClick = (e) => {
    e.preventDefault();

    // Vérifier si loginId est un e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(loginId);

    // Vérifier si loginId est un numéro de téléphone français
    const phoneRegex = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/;
    const isPhone = phoneRegex.test(loginId);

    // Créer l'objet JSON en fonction du type de loginId
    let jsonBody;
    if (isEmail) {
      jsonBody = JSON.stringify({ email: loginId, password: password });
    } else if (isPhone) {
      jsonBody = JSON.stringify({ phonenumber: loginId, password: password });
    } else {
      jsonBody = JSON.stringify({ username: loginId, password: password });
    }

    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonBody,
    }).then(() => {
      console.log("Utilisateur connecté");
      goToHomePage();
    })
  };



  const invisibleGeorgesImage = require("../../assets/img/georgesinvisible.png");

  // Get screen dimensions
  const { width, height } = Dimensions.get("window");

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container, { paddingTop: height * 0.1 }]}>
          <View style={styles.invisibleGeorgesContainer}>
            <Image
              source={invisibleGeorgesImage}
              style={styles.invisibleGeorgesImage}
            />
          </View>
          <Text style={[styles.titre, styles.defaultText]}>
            Connectez-vous à Georges
          </Text>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, styles.defaultText]}>
              Pseudo, numéro de téléphone ou mail
            </Text>
            <TextInput
              style={styles.input}
              value={loginId}
              onChangeText={setLoginId}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, styles.defaultText]}>Mot de passe</Text>
            <TextInput
              style={[styles.input]}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleClick}>
            <LinearGradient
              style={{
                ...styles.gradient,
                borderRadius: 16,
                width: width * 0.8,
                height: 50,
                textAlign: "center",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#040141", "#090979", "#d45a00"]}
            >
              <Text
                style={[styles.buttonText, styles.defaultText]}
                onPress={handleClick}
              >
                Se connecter
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToRegisterPage}>
            <Text style={{ color: "#3D4A7A", marginTop: 20, marginBottom: 10 }}>
              Vous n'avez pas de compte ?
            </Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
        </LinearGradient>
      </TouchableOpacity>

      {/* //Google login button */}
      <GoogleLogin
        onSuccess={ credentialResponse => {
          console.log('login success:', credentialResponse);
          const token = credentialResponse.credential;

          // Send the credentialResponse to backend to authenticate the user
          // Send token to backend
        fetch('http://localhost:8080/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })
        .then((res) => res.json())
        .then((data) => {
          console.log('User data:', data);
          // Redirect to home page
          goToHomePage();
        })
        .catch((error) => {
          console.error('Error parsing JSON:', error);
          });
        }
        
      }

        onError={(error) => {
          console.log('Login Failed', error);
        }}
        shape="pill"
      />  

      {/* <MyCustomButton onClick={() => glogin()}>Sign in with Google 🚀</MyCustomButton> */}

      <TouchableOpacity onPress={goToRegisterPage}>
        <Text style={{ color: "#3D4A7A", marginTop: 20, marginBottom: 10 }}>
          Vous n'avez pas de compte ?
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  defaultText: {
    fontFamily: "NATS",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 35,
  },
  nom: {
    color: "#3D4A7A",
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 20,
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
    height: 95,
    borderRadius: 30,
    overflow: "hidden",
  },
  invisibleGeorgesImage: {
    width: 200,
    height: 200,
  },
  buttonText: {
    paddingTop: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  titre: {
    fontSize: 25,
    color: "#3D4A7A",
    fontWeight: "bold",
    paddingBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 10,
    width: "100%",
    marginBottom: 40,
  },
  label: {
    color: "#3D4A7A",
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CDD1D0",
    fontSize: 18,
    color: "black",
    outlineWidth: 0,
    marginTop: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
