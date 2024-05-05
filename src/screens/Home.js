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
  const backgroundImage = require("../../assets/img/Splash.jpg");
  const invisibleGeorgesImage = require("../../assets/img/georgesinvisible.png");
  const CEO = require("../../assets/img/marting.png");

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
        <View style={styles.usercard}>
          <Image source={CEO} style={styles.profilepic} />
          <View style={styles.usertexts}>
            <Text style={styles.username}>@martindvt</Text>
            <Text style={styles.bio}>Incoming CEO of the world.</Text>
          </View>
          <Ionicons name="pencil" size={24} color="white" style={styles.icon} />
        </View>
        <View style={styles.chatcard}>
          <Image source={invisibleGeorgesImage} style={styles.chatGeorgesImg} />
          <Text style={styles.georgesmessage}>
            Bonjour Martin, grosse journée aujourd’hui, n’hésite pas à venir me
            voir !
          </Text>
        </View>

        <View style={styles.organisationcard}>
          <Text style={styles.georgesmessage}>Todo :</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  usercard: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10%",
    marginLeft: "5%",
  },
  profilepic: {
    marginBottom: "10%",
    width: 70,
    height: 70,
    borderRadius: "50%",
  },
  usertexts: {
    marginTop: "5%",
    marginLeft: "2%",
  },
  username: { color: "#fff" },
  bio: {
    color: "#fff",
  },

  chatcard: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(105, 105, 105, 0.16)",
    padding: "5%",
    margin: "2%",
    maxWidth: "100%",
    borderRadius: "15px",
  },
  chatGeorgesImg: {
    width: 50,
    height: 50,
    margin: 0,
    padding: 0,
    marginRight: "2%",
  },
  georgesmessage: {
    color: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
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
  georges: {
    flex: 1,
    marginTop: "30%",
    alignItems: "center",
  },
});
