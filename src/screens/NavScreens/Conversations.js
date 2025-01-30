
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useUserData} from "../../../utils/Context/UserContext";
import Header from "../../Components/Header";
import {useConversationContext} from "../../../utils/Context/ConversationContext";
import {useRef, useState} from "react";
import WebSocketComponent from "../../Components/WebSocketComponent";
const Conversations = ({ navigation }) => {
    const { userData  , userConversation} = useUserData();
    const { queueData , updateQueueData , getConversationByID} = useConversationContext();
        const websocketRef = useRef(null);

    const handleConversationClick = async (conversationID) => {
        try {
            const conversation = getConversationByID(conversationID);
            const messages = conversation.messages || [];
            const participants = conversation.participants;
            console.log("Participants : " + participants)
            if(websocketRef.current){
                websocketRef.current.getQueueName(conversationID);
            }
            let attempts = 0;
            while ((!queueData.queueName || !queueData.conversationName) && attempts < 10) {
                await new Promise(resolve => setTimeout(resolve, 150));
                attempts++;
            }
            console.log("QueueName: "+queueData.queueName)
            console.log("ConversationName: "+queueData.conversationName)
            if (queueData.queueName && queueData.conversationName) {

                navigation.navigate("Chat", {
                    participants,
                    conversationName: queueData.conversationName,
                    userData,
                    messages,
                    conversationID,
                    queueName: queueData.queueName });
            } else {
                throw new Error("Conversation name : " + queueData.conversationName );
                throw new Error("queue name : " + queueData.queueName );
            }
        } catch (error) {
            console.error("Erreur fetchConversationByID:", error);
            throw error;
        }
    };
    const onQueueNameReceived = ({ queueName, conversationName }) => {
        if (queueName && conversationName) {
            updateQueueData(queueName, conversationName);
        } else {
            console.error("Erreur : queueName ou conversationName manquant");
        }
    };

    const renderConversation = ({ item }) => {
        const lastMessage = item.lastMessage || "Aucun message"
        return(
                <View style={styles.conversationItemContainer}>
                    <WebSocketComponent
                        ref={websocketRef}
                        userData={userData}
                        participants={item.participants}
                        onQueueNameReceived={onQueueNameReceived}
                        conversationID={item.id}
                    />
                    <TouchableOpacity
                        style={styles.conversationItem}
                        onPress={() => handleConversationClick(item.id )}
                    >
                        <Image source={item.profileImage} style={styles.profileImage} />
                        <View style={styles.conversationDetails}>
                            <Text style={styles.conversationName}>{item.name || item.participants.filter(p => p !== userData.username)}</Text>
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
