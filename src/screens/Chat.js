import React, { useState } from "react";
import { sendMessageToMistral } from "../../utils/mistral";
import WebSocketComponent from "../Components/WebSocketComponent";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUserData } from "../../utils/Context/UserContext";
const Chat = ({ route }) => {
    const { conversationID , conversationName} = route.params;
    const { userData } = useUserData();
    const navigation = useNavigation();
    const [messages, setMessages] = useState([])
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
            handleSend(result.uri);
        }
    };

    const handleSend = async (imageUri = null) => {
        if (inputText.trim() === "" && !imageUri) {
            return;
        }

        const newMessage = {
            id: messages.length + 1,
            text: inputText,
            sender: `${userData.username}`,
            time: getCurrentTime(),
            image: imageUri,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputText("");
        setImage(null);

        if (conversationID === "Georges") {
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
        } else if (conversationID === "Websocket") {
            WebSocketComponent.sendMessageToWebSocket(newMessage.text)
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Conversations")}>
                    <Ionicons name="arrow-back" size={30} color="white" style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>{conversationName}</Text>
            </View>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.messageContainer,
                            {
                                flexDirection: item.sender === userData.username ? "row-reverse" : "row",
                            },
                        ]}
                    >
                        {item.sender !== userData.username && (
                            <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
                        )}
                        <View
                            style={[
                                styles.messageBubble,
                                {
                                    backgroundColor: item.sender === userData.username ? "#3D4A7A" : "#282828",
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

            {/* Input pour saisir le message */}
            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <Ionicons name="image-outline" size={24} color="#797C7B" style={styles.icon} />
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
    headerText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
    },
    leftHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
    image: {
        width: 60,
        borderRadius: 30,
        height: 60,
    },
    username: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
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
    timeText: {
        marginTop: 5,
        color: "#ccc",
        fontSize: 10,
        alignSelf: "flex-end",
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
});

export default Chat;
