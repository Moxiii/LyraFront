// Header.js
import React from "react";
import { View, Text, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = ({ title, showConversationIcon, userAvatar }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "right",
        padding: 20,
        backgroundColor: "#ffffff",
      }}
    >
      {userAvatar && (
        <Image
          source={{ uri: userAvatar }}
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
          }}
        />
      )}
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{title}</Text>
      {showConversationIcon && (
        <Ionicons name="chatbubbles-outline" size={24} />
      )}
    </View>
  );
};

export default Header;
