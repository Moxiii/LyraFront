import React, {createContext, useContext, useState} from "react";
import {useUserData} from "./UserContext";
import {
    addUserConversation,
    deleteUserConversation,
    updateUserConversation,
} from "../Fetchs/ConversationFetch";

const  ConversationContext = createContext();

export  function ConversationProvider({children}){

    const {userConversation , setUserConversation} = useUserData();
    const [queueData , setQueueData ] = useState({
        queueName : "",
        conversationName: "",
    })
    const updateQueueData = (queueName , conversationName) =>{
        setQueueData({queueName, conversationName})
    }
const getConversationByID = (id) =>{
    try {
        const conversation = userConversation.find((conv) => conv.id === id);
        if (conversation) {
            return conversation;
        } else {
            throw new Error("Conversation introuvable");
        }
    } catch (error) {
        console.error("Erreur de récupération de la conversation:", error);
        throw error;
    }
}

    const addConversationToContext = async (conversation) => {
        try{
            const response = await addUserConversation(conversation);
            if(response.ok){
                setUserConversation((prevConv)=>[
                    ...prevConv,
                    response.data
                ])
            }else{throw new Error("Fail to add Conversation")}
        }catch (error){throw new Error(error)}
        }

    const updateConversationToContext = async (conversation, conversationID) => {
        try {
            const response = await updateUserConversation(conversation, conversationID);
            if (response.ok) {
                setUserConversation.map((conv) =>
                    conv.id === conversationID ? { ...conv, ...response.data } : conv
                );
            } else {
                throw new Error("Échec de la mise à jour de la conversation");
            }
        } catch (error) {
            console.error("Erreur de mise à jour:", error);
            throw error;
        }
    };

    const deleteConversationToContext = async (conversationID) => {
        try {
            const response = await deleteUserConversation(conversationID);
            if (response.ok) {
                setUserConversation.filter(
                    (conv) => conv.id !== conversationID
                );

            } else {
                throw new Error("Échec de la suppression de la conversation");
            }
        } catch (error) {
            console.error("Erreur de suppression:", error);
            throw error;
        }
    };

        return (
            <ConversationContext.Provider
                value={{
                    addConversationToContext,
                    updateConversationToContext,
                    deleteConversationToContext,
                    getConversationByID,
                    updateQueueData,
                    queueData,
            }}>
                {children}
            </ConversationContext.Provider>
        )
    }

export function useConversationContext (){
    return useContext(ConversationContext)
}