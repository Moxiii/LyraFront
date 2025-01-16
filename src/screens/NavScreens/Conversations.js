import { useState } from "react";
import { FlatList, TouchableOpacity, View, StyleSheet, Image, Text } from "react-native";
import { useUserData } from "../../../utils/Context/UserContext";
import GeorgesImage from "../../../assets/img/georgesinvisible.png";
import { Ionicons } from "@expo/vector-icons";

const Conversations = ({ navigation }) => {
    const { userData } = useUserData();
    const [conversations] = useState([
        {
            id: "Georges",
            name: "Chattez avec Georges",
            profileImage: `${GeorgesImage}`,
            lastMessage: "Salut, comment ça va ?",
            lastMessageTime: "10:32 AM",
        },
        {
            id: "Websocket",
            name: "Connect to WebSocket",
            profileImage: `${userData.profileImage}`,
            lastMessage: "Connexion établie.",
            lastMessageTime: "10:33 AM",
        },
    ]);

    const handleConversationClick = (conversationID , conversationName) => {
        navigation.navigate("Chat", { conversationID , conversationName});
    };

    const renderConversation = ({ item }) => (
        <View style={styles.conversationItemContainer}>
            <TouchableOpacity
                style={styles.conversationItem}
                onPress={() => handleConversationClick(item.id , item.name)}
            >
                <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                <View style={styles.conversationDetails}>
                    <Text style={styles.conversationName}>{item.name}</Text>
                    <Text style={styles.lastMessage}>{item.lastMessage}</Text>
                </View>
                <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Ionicons name="arrow-back" size={30} color="white" style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Conversations</Text>
            </View>
            <FlatList
                data={conversations}
                renderItem={renderConversation}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.conversationsList}
            />
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
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#282828",
        alignItems: "center",
        justifyContent: "space-between",
    },
    backIcon: {
        marginTop: "10%",
    },
    headerText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
    },
    conversationsList: {
        padding: 10,
    },
    conversationItemContainer: {
        marginBottom: 10,
    },
    conversationItem: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "#2b2b2b",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "space-between",
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    conversationDetails: {
        flex: 1,
        marginLeft: 10,
    },
    conversationName: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 16,
    },
    lastMessage: {
        color: "#ccc",
        fontSize: 14,
    },
    lastMessageTime: {
        color: "#888",
        fontSize: 12,
    },
});

export default Conversations;
