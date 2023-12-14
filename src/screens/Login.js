import { StatusBar } from "expo-status-bar";
import React from "react";

import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Inscrivez-vous avec votre mail</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.nom}>Nom</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput style={styles.input} secureTextEntry={true} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmation du mot de passe</Text>
        <TextInput style={styles.input} secureTextEntry={true} />
      </View>{" "}
      
   
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "top",
    paddingHorizontal: 35,
    paddingTop: 50,
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "top",
    paddingRight:30,
    paddingTop: 20,
  },
  nom: {
    color: "#3D4A7A",
    fontWeight: "bold",
    marginTop: 15,
  },
  button: {
    paddingTop:30,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginTop: 20,
    borderRadius: 30,
    width: "100%",
    overflow: "hidden",
  },
  buttonText: {
    paddingTop:10,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  titre: {
    fontSize: 22,
    color: "#3D4A7A",
    fontWeight: "bold",
    paddingTop: 40,
    paddingBottom: 40,
  },
  inputContainer: {
    marginTop: 20,
    width: "100%",
  },
  label: {
    color: "#3D4A7A",
    fontWeight: "bold",
  },
  input: {
    width: "90%",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CDD1D0",
    fontSize: 15,
    color: "black",
    outlineWidth: 0,
  },
});
