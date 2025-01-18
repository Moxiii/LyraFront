import { useState } from "react";
import { FlatList, TouchableOpacity, View, StyleSheet, Image, Text } from "react-native";
import { useUserData } from "../../../utils/Context/UserContext";
import GeorgesImage from "../../../assets/img/georgesinvisible.png";
import Header from "../../Components/Header";
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
        navigation.navigate("Chat", { conversationID , conversationName , userData});
    };

    const renderConversation = ({ item }) => (
        <View style={styles.conversationItemContainer}>
            <TouchableOpacity
                style={styles.conversationItem}
                onPress={() => handleConversationClick(item.id , item.name)}
            >
                <Image source={item.profileImage} style={styles.profileImage} />
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
           <Header name={"Conversations"}/>
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
