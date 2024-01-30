import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";

export default function Home() {
  const backgroundImage = require("../../assets/img/GeorgesBG.jpeg");
  const invisibleGeorgesImage = require("../../assets/img/georgesinvisible.png");

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
            Connecte Georges à toutes tes applications. Et il fera le reste
          </Text>
        </View>
        <View style={styles.invisibleGeorgesContainer}>
          <Image
            source={invisibleGeorgesImage}
            style={styles.invisibleGeorgesImage}
          />
        </View>
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
  invisibleGeorgesContainer: {
    paddingBottom:"40%"
  },
  invisibleGeorgesImage: {
    width: 400,
    height: 300,
  },
});
