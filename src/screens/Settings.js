import React from "react";
import { View, Text } from "react-native";
import { GradientButtonThin, Input } from "../../utils/Wireframe";

export default function Settings() {
  return (
    <View>
      <Text>Settings Screen</Text>
      <GradientButtonThin label={"Test"} />
      <Input placeholder={"Username"} />
    </View>
  );
}
