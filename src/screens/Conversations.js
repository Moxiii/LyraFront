import React from "react";
import { View, Text, Button } from "react-native";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";

export default function Conversations() {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <View>
      <Header
        title="Georges"
        showConversationIcon={true}
        userAvatar="url_de_votre_avatar"
      />
      <Text>Conversations Screen</Text>
      <Button title="Se connecter" onPress={goToLogin} />
    </View>
  );
}
