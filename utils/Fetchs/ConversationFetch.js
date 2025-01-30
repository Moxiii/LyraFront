import {fetchWithAuth} from "./fetchWithAuth";
import {handleResponse} from "../handleReponse";
const BASE_URL = "conversation/"

export const fetchUserConversation = async ()=>{
    const response = await fetchWithAuth(BASE_URL+ "get" , {
        method:"GET",
    });
    return handleResponse(response);
}
export const fetchUserConversationByID = async (id)=>{
    const response = await fetchWithAuth(BASE_URL+ `get/${id}` , {
        method:"GET",
    });
    return handleResponse(response);
}

export const addUserConversation  =async (conversation)=>{
    const response = await fetchWithAuth(BASE_URL+"add",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(conversation)
    })
    return handleResponse(response)
}

export const updateUserConversation  =async (updatedConversation , conversationID)=>{
    const response = await fetchWithAuth(BASE_URL+`update/${conversationID}`,{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(updatedConversation)
    })
    return handleResponse(response)
}

export const deleteUserConversation  =async (conversation , conversationID)=>{
    const response = await fetchWithAuth(BASE_URL+`delete/${conversationID}`,{
        method:"DELETE",
    })
    return handleResponse(response)
}

