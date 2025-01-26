import {useState} from "react";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useUserData} from "../../../utils/Context/UserContext";
import GeorgesImage from "../../../assets/img/georgesinvisible.png";
import Header from "../../Components/Header";

const Conversations = ({ navigation }) => {
    const { userData , userConversation } = useUserData();


    const handleConversationClick = (participants , conversationName) => {
        navigation.navigate("Chat", { participants , conversationName , userData});
    };

    const renderConversation = ({ item }) => {
        const participants = item.participants.filter(p=> p !== userData.username)
        const lastMessage = item.lastMessage || "Aucun message"
        return(
                <View style={styles.conversationItemContainer}>
                    <TouchableOpacity
                        style={styles.conversationItem}
                        onPress={() => handleConversationClick(participants , participants.join(", "))}
                    >
                        <Image source={item.profileImage} style={styles.profileImage} />
                        <View style={styles.conversationDetails}>
                            <Text style={styles.conversationName}>{participants.join(", ")}</Text>
                            <Text style={styles.lastMessage}>{lastMessage}</Text>
                        </View>
                        <Text style={styles.lastMessageTime}>{item.lastMessageTime || "00.00"}</Text>
                    </TouchableOpacity>
                </View>
            )

};

    return (
        <View style={styles.container}>
           <Header name={"Conversations"}/>
            <FlatList
                data={userConversation}
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
