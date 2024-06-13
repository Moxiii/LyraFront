import React, { useState } from "react";
import MistralClient from "@mistralai/mistralai";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";
import Modal from "react-native-modal";

const Conversations = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [image, setImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const route = useRoute();

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      handleSend(result.uri);
    }
  };

  const sendMessageToMistral = async (inputText) => {
    const apiKey = "jnzFCjsg2DbZYfQtNOHM6tihOXEkUX2h";
    const client = new MistralClient(apiKey);

    try {
      const chatResponse = await client.chat({
        model: "mistral-tiny",
        messages: [{ role: "user", content: inputText }],
      });
      return chatResponse.choices[0].message.content;
    } catch (error) {
      throw new Error(
        "Failed to communicate with Mistral API: " + error.message
      );
    }
  };

  const handleSend = async (imageUri = null) => {
    if (inputText.trim() === "" && !imageUri) {
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      time: getCurrentTime(),
      image: imageUri,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setInputText("");
    setImage(null);

    try {
      const responseText = await sendMessageToMistral(newMessage.text);
      const newResponseMessage = {
        id: messages.length + 2,
        text: responseText,
        sender: "georges",
        time: getCurrentTime(),
        image: null,
      };
      setMessages((prevMessages) => [...prevMessages, newResponseMessage]);
    } catch (error) {
      console.error("Failed to send message to Mistral:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons
            name="arrow-back"
            size={30}
            color="white"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.leftHeader}>
          <Image
            style={styles.image}
            source={require("../../assets/img/marting.png")}
          />
          <Text style={styles.username}>@martindvt</Text>
          <Text style={styles.tagline}>Incoming CEO of the world.</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.openModalButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.openModalButtonText}>Clique pour chatter !</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageContainer,
                  {
                    flexDirection:
                      item.sender === "user" ? "row-reverse" : "row",
                  },
                ]}
              >
                {item.sender === "user" && (
                  <Image
                    source={require("../../assets/img/marting.png")}
                    style={styles.profileImage}
                  />
                )}
                <View
                  style={[
                    styles.messageBubble,
                    {
                      backgroundColor:
                        item.sender === "user" ? "#3D4A7A" : "#282828",
                    },
                  ]}
                >
                  <Text style={{ color: "#fff" }}>{item.text}</Text>
                  {item.image && (
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: 200, height: 200, marginTop: 5 }}
                    />
                  )}
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </View>
            )}
          />

          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={pickImage}>
              <Ionicons
                name="image-outline"
                size={24}
                color="#797C7B"
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage}>
              <Ionicons
                name="document-outline"
                size={24}
                color="#797C7B"
                style={styles.icon}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Écrivez votre message..."
              placeholderTextColor="#999"
              value={inputText}
              onChangeText={(text) => setInputText(text)}
            />
            <TouchableOpacity onPress={() => handleSend()}>
              <Ionicons name="send" size={24} color="#3D4A7A" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#282828",
  },
  backIcon: {
    marginTop: "20%",
    marginLeft: "10%",
  },
  leftHeader: {
    marginLeft: "8%",
  },
  rightHeader: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: "10%",
    alignItems: "flex-start",
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 60,
    borderRadius: 40,
    height: 60,
  },
  username: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  tagline: {
    color: "#999",
    fontSize: 12,
  },
  openModalButton: {
    backgroundColor: "#3D4A7A",
    padding: 10,
    margin: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  openModalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#282828",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282828",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  input: {
    backgroundColor: "#444",
    color: "white",
    flex: 1,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  timeText: {
    marginTop: 5,
    color: "#ccc",
    fontSize: 10,
    alignSelf: "flex-end",
  },
});

export default Conversations;
