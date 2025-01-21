import React from "react";
import {Text, View} from "react-native";
import Header from "../components/Header";

export default function Contacts() {
  return (
    <View>
      <Header title="Georges" showConversationIcon={true} />
      <Text>Contacts Screen</Text>
    </View>
  );
}
