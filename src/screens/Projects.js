import React from "react";
import { View, Text } from "react-native";
import Header from "../Components/Header";

export default function Projects() {
  return (
    <View>
      <Header
        title="Georges"
        showConversationIcon={true}
        userAvatar="url_de_votre_avatar"
      />
      <Text>Projects Screen</Text>
    </View>
  );
}
