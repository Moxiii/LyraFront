import React, { forwardRef, useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WebSocketComponent = forwardRef(({ userData, setMessages }, ref) => {
    const [client, setClient] = useState(null);
    const [queueId, setQueueId] = useState(null);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = Stomp.over(socket);
        stompClient.connect(
            {},
            (frame) => {
                console.log("Connected: " + frame);
                const clientID = JSON.stringify({ ClientID: userData.username });
                stompClient.send("/app/queue_name", {}, clientID);

                stompClient.subscribe(`/user/queue/${userData.username}`, (message) => {
                    const queueID = message.body;
                    setQueueId(queueID);
                    console.log("queueID:", queueID);
                    stompClient.subscribe(`/queue/messages/${queueID}`, (message) => {
                        const newMessage = {
                            id: Date.now(),
                            text: message.body,
                            sender: "Server",
                            time: new Date().toLocaleTimeString(),
                            image: null,
                        };
                        setMessages((prevMessages) => [...prevMessages, newMessage]);
                    });
                });
            },
            (error) => {
                console.error("STOMP Error: " + error);
            }
        );

        stompClient.activate();

        setClient(stompClient);

        return () => {
            if (stompClient.connected) {
                stompClient.deactivate();
            }
        };
    }, [userData.username]);

    const sendMessageToWebSocket = (message) => {
        if (client && client.connected && queueId) {
            client.publish({
                destination: `/app/chat/${queueId}`,
                body: JSON.stringify({ message }),
            });
        }
    };

    React.useImperativeHandle(ref, () => ({
        sendMessage: sendMessageToWebSocket,
    }));

    return null;
});

export default WebSocketComponent;
