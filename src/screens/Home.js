import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function Home() {
  const backgroundImage = require("../../assets/img/GeorgesBG.jpeg");
  const invisibleGeorgesImage = require("../../assets/img/georgesinvisible.png");
  const navigation = useNavigation();
  const route = useRoute();

  console.log(route.name);
  const goToLogin = () => {
    navigation.navigate("Login");
  };
  const goToRegister = () => {
    navigation.navigate("Register");
  };

  if (!backgroundImage) {
    return <View />;
  }

  return (
    <View style={styles.root}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.container}
      >
        <View style={styles.georges}>
          <Text style={styles.title}>Georges</Text>
          <Text style={styles.subtitle}>
            Connecte Georges à toutes tes applications. Il fera le reste
          </Text>
        </View>
        <View style={styles.invisibleGeorgesContainer}>
          <Image
            source={invisibleGeorgesImage}
            style={styles.invisibleGeorgesImage}
          />
        </View>
        <View style={styles.iconContainer}>
          <Ionicons
            name="logo-google"
            size={24}
            color="white"
            style={styles.icon}
          />
          <Ionicons
            name="logo-facebook"
            size={24}
            color="white"
            style={styles.icon}
          />
          <Ionicons
            name="logo-apple"
            size={24}
            color="white"
            style={styles.icon}
          />
        </View>

        <TouchableOpacity
          onPress={goToRegister}
          style={styles.continueContainer}
        >
          <Text style={styles.continue}>S'enregister avec l'email</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.connecter}>Déjà un compte ? Se connecter</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  connecter: {
    fontSize: 15,
    color: "#fff",
    marginLeft: "25%",
    marginBottom: "28%",
  },
  continueContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#252D4A",
    borderRadius: 16,
    marginLeft: "20%",
    marginBottom: "10%",
    width: 244,
    height: 44,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  icon: {
    marginBottom: 18,
    marginHorizontal: 10,
  },
  continue: {
    color: "white",
    fontSize: 18,
  },
  georges: {
    flex: 1,
    marginTop: "30%",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  invisibleGeorgesImage: {
    marginBottom: "10%",
    width: 400,
    height: 250,
  },
});
