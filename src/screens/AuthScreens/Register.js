import React, {useState} from "react";
import {StatusBar} from "expo-status-bar";
import {LinearGradient} from "expo-linear-gradient";
import {Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const goToLoginPage = () => {
    navigation.navigate("Login");
  };

  const [email, setEmail] = useState("");
  const [password, setMotDePasse] = useState("");
  const [username, setPseudo] = useState("");
  const [name, setNom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password, name, username };
    console.log(user);
    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        console.log("Utilisateur added");
        if(res.status===201){
          goToLoginPage()
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement :", error);
      });
  };

  const invisibleGeorgesImage = require("../../../assets/img/georgesinvisible.png");

  return (
    <View style={styles.container}>
      <View style={styles.invisibleGeorgesContainer}>
        <Image
          source={invisibleGeorgesImage}
          style={styles.invisibleGeorgesImage}
        />
      </View>
      <Text style={[styles.titre, styles.defaultText]}>
        Enregistrez-vous à Georges
      </Text>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, styles.defaultText]}>Email</Text>
        <input
          type="email"  
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, styles.defaultText]}>
          Nom d'utilisateur
        </Text>
        <input
          type="pseudo"
          value={username}
          onChange={(e) => setPseudo(e.target.value)}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, styles.defaultText]}>Nom</Text>
        <input
          type="nom"
          value={name}
          onChange={(e) => setNom(e.target.value)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, styles.defaultText]}>Mot de passe</Text>
        <input
          type="password"
          value={password}
          onChange={(e) => setMotDePasse(e.target.value)}
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
            S'enregistrer
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLoginPage}>
        <Text style={{ color: "#3D4A7A", marginTop: 20, marginBottom: 10 }}>
          Vous avez déjà un compte ?
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
    paddingTop: 20,
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
    paddingBottom: 10,
  },
  inputContainer: {
    marginTop: 5,
    width: "100%",
    marginBottom: 15,
  },
  label: {
    color: "#3D4A7A",
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    width: "90%",
    height: 40,
    borderBottomColor: "#CDD1D0",
    fontSize: 18,
    color: "black",
    outlineWidth: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
