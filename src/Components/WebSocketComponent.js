import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import { Client } from "@stomp/stompjs";

const WebSocketComponent = ((props , ref) => {
    const [client, setClient] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: "ws://localhost:8080/ws",
            connectHeaders: {},
            debug: function (str) {
                console.log(str);
            },
            onConnect: () => {
                stompClient.subscribe("/topic/messages", (message) => {
                    setMessage(message.body);
                });
            },
            onDisconnect: () => {
                console.log("Disconnected from WebSocket server");
            },
        });
        stompClient.activate();

        setClient(stompClient);

        return () => {
            if (stompClient.connected) {
                stompClient.deactivate();
            }
        };
    }, []);

    const sendMessageToWebSocket = (message) => {
        if (client && client.connected) {
            client.publish({
                destination: "/app/sendMessage",
                body: JSON.stringify({ message }),
            });
        }
    };
React.useImperativeHandle(ref,()=>({
    sendMessage: sendMessageToWebSocket,
}))
    return (
        <View>
            <Button title="Envoyer un message" onPress={() => sendMessageToWebSocket(message)} />
            <Text>Message reçu: {message}</Text>
        </View>
    );
});

export default WebSocketComponent;
