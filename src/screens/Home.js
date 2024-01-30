import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-web";
import { useNavigation } from "@react-navigation/native";
export default function Home() {
  const backgroundImage = require("../../assets/img/GeorgesBG.jpeg");
  const invisibleGeorgesImage = require("../../assets/img/georgesinvisible.png");
  const navigation = useNavigation();
  const goToConversations= () => {
    navigation.navigate("Conversations");
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
        <TouchableOpacity  onPress={goToConversations} style={styles.continueContainer}>
          <Text style={styles.continue}>
            Continuer
          </Text>
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
  continueContainer:{
    justifyContent:"center",
    alignItems: "center",
    width:"80%",
    backgroundColor: "#252D4A",
    borderRadius: 16,
    marginLeft: "20%",
    marginBottom:"20%",
    width: 244, 
    height: 44,
  },
  continue:{
    color: "white",
    fontSize:18,
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
    width: 400,
    height: 300,
  },
});
