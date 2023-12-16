import React from "react";
import { View, Text } from "react-native";
import Header from "../Components/Header";

export default function Conversations() {
  return (
    <View>
      <Header
        title="Georges"
        showConversationIcon={true}
        userAvatar="url_de_votre_avatar"
      />
      <Text>Conversations Screen</Text>
    </View>
  );
}
