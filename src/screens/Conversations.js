import React, { useState } from "react";
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

const Conversations = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [image, setImage] = useState(null);

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
      handleSend();
    }
  };

  const handleSend = () => {
    if (inputText.trim() === "" && !image) {
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      time: getCurrentTime(),
      image: image,
    };

    setMessages([...messages, newMessage]);
    setInputText("");
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons
            name="arrow-back"
            size={30}
            color="black"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.leftHeader}>
          <Image
            style={styles.image}
            source={require("../../assets/img/georges.png")}
          />
        </View>
        <View style={styles.rightHeader}>
          <Text style={styles.headerText}>Georges</Text>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              {
                alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
              },
            ]}
          >
            <Text style={{ color: "#fff" }}>{item.text}</Text>
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={{ width: 200, height: 200 }}
              />
            )}
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
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
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />

        <Ionicons name="send" size={20} color="#3D4A7A" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: 20,
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
    flexDirection: "row",
    paddingLeft: "10%",
    alignItems: "center",
  },
  headerText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 60,
    borderRadius: 40,
    height: 60,
  },
  messageBubble: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: "80%",
    backgroundColor: "#3D4A7A",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 25,
    paddingBottom: 70,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: "rgba(0, 0, 5, 5)",
    borderTopColor: "#EEFAF8",
  },
  input: {
    backgroundColor: "#F3F6F6",
    color: "black",
    flex: 1,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  timeText: {
    marginLeft: 10,
    color: "#ccc",
  },
});

export default Conversations;
