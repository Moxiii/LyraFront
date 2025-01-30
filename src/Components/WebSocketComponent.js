import React, {forwardRef, useEffect, useRef, useState} from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {v4 as uuidv4} from "uuid";
import {useConversationContext} from "../../utils/Context/ConversationContext";
const WebSocketComponent = forwardRef(({
                                           userData,
                                           setMessages ,
                                           participants,
                                           time ,
                                           conversationID ,
                                           onQueueNameReceived,
                                       },
                                       ref ) => {

    const clientRef = useRef(null);
    const { queueData } = useConversationContext();
    useEffect(() => {
        console.log("Initialisation du WebSocketComponent...");
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = Stomp.over(socket);
        stompClient.connect(
            {},
            (frame) => {
                        clientRef.current = stompClient;
                stompClient.subscribe(`/user/queue/${userData.username}`, (message) => {
                    try {
                        const parsedMessage = JSON.parse(message.body);
                        console.log("🔹 Message reçu sur /user/queue : ", parsedMessage);

                        if (parsedMessage.queueName && parsedMessage.conversationName) {
                            console.log("✅ Mise à jour du contexte avec queueName et conversationName");
                            if (onQueueNameReceived) {
                                onQueueNameReceived(parsedMessage);
                            }
                        } else {
                            console.warn("⚠️ Données manquantes dans le message WebSocket :", parsedMessage);
                        }
                    } catch (error) {
                        console.error("❌ Erreur lors du parsing du message WebSocket :", error);
                    }
                });
                        if(participants.length > 2){
                            stompClient.subscribe(`/topic/${queueData.conversationName}/${queueData.queueName}` , function (msg){
                                handleIncommingMessage(msg)
                            })
                        }else{
                            stompClient.subscribe(`/user/${userData.username}/messages/${queueData.queueName}`, function (msg) {
                                handleIncommingMessage(msg);
                            });
                        }
                });

            (error) => {
                console.error("STOMP Error: " + error);
            };


        stompClient.activate();

        return () => {
            console.log("Nettoyage du composant et déconnexion STOMP...");
            stompClient.deactivate();
        };
    }, [queueData.queueName , queueData.conversationName]);


    const sendMessageToWebSocket = (message) => {
        if (clientRef.current && clientRef.current.connected && queueData) {
            clientRef.current.publish({
                destination: `/app/chat/${queueData.queueName}/${conversationID}`,
                body: JSON.stringify(message),
            });

        }else {
            console.warn(
                "Impossible d'envoyer le message : client non connecté ou queueId manquant.",
                { clientConnected: clientRef.current?.connected, queueData }
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
            getQueueName: (conversationID) => {
                if (clientRef.current && clientRef.current.connected) {
                    clientRef.current.send("/app/queue_name", {}, JSON.stringify({ConversationID: conversationID}));
                } else {console.warn("Impossible d'envoyer : WebSocket non connecté.");
                }}}));
    return null;
});

export default WebSocketComponent;
