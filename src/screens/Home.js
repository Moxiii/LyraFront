import React from "react";
import { View, Text, ImageBackground } from "react-native";
import Header from "../Components/Header";

export default function Conversations() {
  return (
    <View>
      <Header
        title="Georges"
        showConversationIcon={true}
        userAvatar="url_de_votre_avatar"
      />
      <Text>Home Screen</Text>
    </View>
  );
}
