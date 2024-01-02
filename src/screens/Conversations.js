import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChatTemplate = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSend = () => {
    if (inputText.trim() === "") {
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      time: getCurrentTime(),
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };
  return (
   
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                {
                  alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor: item.sender === "user" ? "#3D4A7A" : "#008CBA",
                },
              ]}
            >
              <Text style={{ color: "#fff" }}>{item.text}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="camera" size={24} color="#797C7B" style={styles.icon} />
        <Ionicons name="mic" size={24} color="#797C7B" style={styles.icon} />

        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />

        <Ionicons name="send" size={24} color="#3D4A7A" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  messageContainer: {
    flex: 1,
  },
  messageBubble: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  timeText: {
    marginLeft: 10,
    color: "#ccc",
  },
});

export default ChatTemplate;
