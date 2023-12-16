import React from "react";
import { View, Text } from "react-native";
import { GradientButtonThin, Input } from "../../utils/Wireframe";
import Header from "../Components/Header";

export default function Settings() {
  return (
    <View>
      <Header
        title="Georges"
        showConversationIcon={true}
        userAvatar="url_de_votre_avatar"
      />
      <Text>Settings Screen</Text>
      <GradientButtonThin label={"Test"} />
      <Input placeholder={"Username"} />
    </View>
  );
}
