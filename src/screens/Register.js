import React from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const navigation = useNavigation();

  const goToLoginPage = () => {
    navigation.navigate("Login");
  };
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
          <Text style={styles.buttonText}>Créer un compte</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLoginPage}>
        <Text style={{ color: "#3D4A7A", marginTop: 10 }}>
          Vous avez déjà un compte ?
        </Text>
      </TouchableOpacity>
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
  nom: {
    color: "#3D4A7A",
    fontWeight: "bold",
    marginTop: 15,
  },
  button: {
    paddingTop: 25,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 30,
    height: 95,
    overflow: "hidden",
  },
  buttonText: {
    paddingTop: 4,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  titre: {
    fontSize: 21,
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
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
