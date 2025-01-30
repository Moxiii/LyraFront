import React, { forwardRef, useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {v4 as uuidv4} from "uuid";
const WebSocketComponent = forwardRef(({
                                           userData,
                                           setMessages ,
                                           participants,
                                           time ,
                                           conversationID ,
                                           conversationName,
                                           onQueueNameReceived,
                                       },
                                       ref ) => {
    const [client, setClient] = useState(null);
    const [queueId, setQueueId] = useState();


    useEffect(() => {
        console.log("Initialisation du WebSocketComponent...");
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = Stomp.over(socket);
        stompClient.connect(
            {},
            (frame) => {
                console.log("Connected: " + frame);
                stompClient.subscribe(`/user/queue/${userData.username}`, (message) => {
                        console.log("QUEUE NAME RECEIVED : " + message.body)
                        const QUEUEID = message.body;
                        const sanitizeQueue = QUEUEID.replace(/"/g, '')
                        setQueueId(sanitizeQueue);
                        if(onQueueNameReceived){
                            onQueueNameReceived({
                                queueName: sanitizeQueue,
                                conversationName:conversationName
                            })
                        }
                        if(participants.length > 2){
                            stompClient.subscribe(`/topic/${conversationName}/${sanitizeQueue}` , function (msg){
                                handleIncommingMessage(msg)
                            })
                        }else{
                            stompClient.subscribe(`/user/${userData.username}/messages/${sanitizeQueue}`, function (msg) {
                                handleIncommingMessage(msg);
                            });
                        }

                });
            },
            (error) => {
                console.error("STOMP Error: " + error);
            }
        );

        stompClient.activate();
        setClient(stompClient);

        return () => {
            console.log("Nettoyage du composant et déconnexion STOMP...");
            stompClient.deactivate();
        };
    }, [userData.username , conversationID]);


    const sendMessageToWebSocket = (message) => {
        if (client && client.connected && queueId) {
            client.publish({
                destination: `/app/chat/${queueId}/${conversationID}`,
                body: JSON.stringify(message),
            });

        }else {
            console.warn(
                "Impossible d'envoyer le message : client non connecté ou queueId manquant.",
                { clientConnected: client?.connected, queueId }
            );
        }
    };

    const handleIncommingMessage = (message)=>{
        console.log("Réception du message dans la ref :", message);
        try{
            const parsedMessage = JSON.parse(message.body);
            console.log("Message parsé :", parsedMessage);
            const newMessage = {
                id: uuidv4(),
                content: parsedMessage.content || parsedMessage.message,
                sender: parsedMessage.sender,
                time: parsedMessage.time || time,
                image: parsedMessage.image || null,
            };
            console.log("Ajout du nouveau message :", newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);

        }catch(error){
            console.error("Erreur lors du parsing du message :", error);
        }
    }

    React.useImperativeHandle(ref, () => ({
            sendMessage: sendMessageToWebSocket,
            getQueueName: () => {
                if (client && client.connected) {
                    client.send("/app/queue_name", {}, JSON.stringify({ConversationID: conversationID}));
                } else {console.warn("Impossible d'envoyer : WebSocket non connecté.");
                }}}));
    return null;
});

export default WebSocketComponent;
