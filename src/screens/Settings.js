import React from "react";
import { View, Text } from "react-native";
import { GradientButtonThin, Input } from "../../utils/Wireframe";
import Header from "../components/Header";

export default function Settings() {
  return (
    <View>
      <Header title="Georges" showConversationIcon={true} />
      <Text>Settings Screen</Text>
      <GradientButtonThin label={"Test"} />
      <Input placeholder={"Username"} />
    </View>
  );
}
