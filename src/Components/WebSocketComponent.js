import React, { forwardRef, useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WebSocketComponent = forwardRef(({ userData, setMessages }, ref) => {
    const [client, setClient] = useState(null);
    const [queueId, setQueueId] = useState("testing");

    useEffect(() => {
        console.log("Initialisation du WebSocketComponent...");
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
                    console.log("Message reçu pour queueId :", message.body);
                    setQueueId(queueID || "testing");
                    console.log("queueID:", queueID);
                    stompClient.subscribe(`/queue/messages/${queueID}`, function (message)  {
                        console.log("Message brut reçu :", message.body);
                        handleIncommingMessage(message)
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
            console.log("Nettoyage du composant et déconnexion STOMP...");
            if (stompClient.connected) {
                stompClient.deactivate();
            }
        };
    }, [userData.username]);

    const sendMessageToWebSocket = (message) => {
        console.log("Etat de la connexion :" , {ClientConnected : client.connected , queueId:queueId})
        if (client && client.connected && queueId) {
            console.log("Etat de la connexion :" , {ClientConnected : client.connected , queueId:queueId} )
            client.publish({
                destination: `/app/chat/${queueId}`,
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
                id: parsedMessage.id,
                text: parsedMessage.text || parsedMessage.message,
                sender: parsedMessage.sender,
                time: parsedMessage.time || new Date().toLocaleTimeString(),
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
    }));

    return null;
});

export default WebSocketComponent;
