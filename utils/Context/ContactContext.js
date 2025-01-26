import React, {createContext, useContext} from "react";
import {useUserData} from "./UserContext";
import {addUserContact , muteContact,blockContact,deleteUserContact,updateUserContact, acceptContact} from "../Fetchs/ContactFetch";

const ContactContext = createContext()

export function ContactProvider({children}){

    const{userContact , setUserContact}= useUserData();

    const addContactToContext = async () =>{
        try{
            const response = await addUserContact();
            if(response.ok){
                //Todo add contact ect
            }throw new Error("Fail to add Contact")
        }catch (error){throw new Error(error)}
    };

   const updateContactToContext = async (contactID , updatedContact) =>{
        try{
            const response = await updatedContact(contactID , updatedContact);
            if(response.ok){
                //Todo add contact ect
            }throw new Error("Fail to update Contact")
        }catch (error){throw new Error(error)}
    };

   const delContactToContext = async (contactID) =>{
        try{
            const response = await deleteUserContact(contactID);
            if(response.ok){
                //Todo add contact ect
            }throw new Error("Fail to delete Contact")
        }catch (error){throw new Error(error)}
    };

    return(

        <ContactContext.Provider
            value={{
                addContactToContext,
                delContactToContext,
                updateContactToContext,
            }}>
            {children}
        </ContactContext.Provider>
    )}

export function useContactContext(){
    return useContext(ContactContext);
}