import React, {createContext, useContext} from "react";
import {useUserData} from "./UserContext";
import {addUserConversation , deleteUserConversation , updateUserConversation , fetchUserConversationByID} from "../Fetchs/ConversationFetch";

const  ConversationContext = createContext();

export  function ConversationProvider({children}){

    const {userConversation , setUserConversation} = useUserData();

    const fetchConversationByID = async (id) => {
        try {
            const response = await fetchUserConversationByID(id);
            setUserConversation(response);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const addConversationToContext = async (conversation) => {
        try{
            const response = await addUserConversation(conversation);
            if(response.ok){
                //Todo add conv ect
            }throw new Error("Fail to add Contact")
        }catch (error){throw new Error(error)}
        }

    const updateConversationToContext = async (conversation , conversationID) => {
        try{
            const response = await addUserConversation(conversation , conversationID);
            if(response.ok){
                //Todo update conv ect
            }throw new Error("Fail to add Contact")
        }catch (error){throw new Error(error)}
        }

    const deleteConversationToContext = async (conversationID) => {
        try{
            const response = await addUserConversation(conversationID);
            if(response.ok){
                //Todo add conv ect
            }throw new Error("Fail to add Contact")
        }catch (error){throw new Error(error)}
        }

        return (
            <ConversationContext.Provider
                value={{
                addConversationToContext,updateConversationToContext,deleteConversationToContext,fetchConversationByID
            }}>
                {children}
            </ConversationContext.Provider>
        )
    }

export function useConversationContext (){
    return useContext(ConversationContext)
}