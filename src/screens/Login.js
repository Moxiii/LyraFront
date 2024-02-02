import React from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const goToRegisterPage = () => {
    navigation.navigate("Register");
  };
  const handleClick = (e) => {
    e.preventDefault();
    const student = { pseudo, email, motdepasse };
    console.log(student);
    fetch("http://localhost:8033/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("Utilisateur connecté");
    });
  };

  const invisibleGeorgesImage = require("../../assets/img/georgesinvisible.png");
  return (
    <View style={styles.container}>
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
        <Text style={[styles.label, styles.defaultText]}>Email</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, styles.defaultText]}>Mot de passe</Text>
        <TextInput style={[styles.input]} secureTextEntry={true} />
      </View>
      <TouchableOpacity style={styles.button}>
        <LinearGradient
          style={{
            ...styles.gradient,
            borderRadius: 16,
            width: 327,
            height: 50,
            textAlign: "center",
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#040141", "#090979", "#d45a00"]}
        >
          <Text style={[styles.buttonText, styles.defaultText]}>
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
  );
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "NATS",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "top",
    paddingHorizontal: 35,
    paddingTop: 80,
  },
  nom: {
    color: "#3D4A7A",
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 20,
  },
  button: {
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
    borderRadius: 30,
    height: 95,
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
    width: "90%",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CDD1D0",
    fontSize: 18,
    color: "black",
    outlineWidth: 0,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
