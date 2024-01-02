import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Header from "../components/Header";

export default function Conversations() {
  const backgroundImage = require("../../assets/img/GeorgesBG.jpeg");

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
        <Header title="Georges" showConversationIcon={true} />
        <Text>Home Screen</Text>
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
});
