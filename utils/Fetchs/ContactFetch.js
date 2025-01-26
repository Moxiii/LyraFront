import {fetchWithAuth} from "./fetchWithAuth";
import {handleResponse} from "../handleReponse";
const BASE_URL = "user/friends/"
export const fetchUserContact = async ()=>{
   const ContactRes =  await fetchWithAuth(BASE_URL , {
        method:"GET",
    })
    return handleResponse(ContactRes);
}
export const addUserContact = async(username)=>{
    const add = await fetchWithAuth(BASE_URL+"add" , {
        methode:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(username)
    })
    return handleResponse(add)
}
export const updateUserContact = async(updatedContact , contactID)=>{
    const update = await fetchWithAuth(BASE_URL+`update/${contactID}` , {
        methode:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(updatedContact)
    })
    return handleResponse(update)
}
export const deleteUserContact = async (contactID) =>{
    const del = await fetchWithAuth(BASE_URL+`${contactID}`,{
        method:"DELETE",
    })
    return handleResponse(del);
}
export const acceptContact = async (contactID)=>{
    const accept = await fetchWithAuth(BASE_URL+`accept/${contactID}`,{
        method:"PUT"
    })
    return handleResponse(accept);
}
export const muteContact = async (contactID)=>{
    const mute = await fetchWithAuth(BASE_URL+`mute/${contactID}`,{
        method:"PUT"
    })
    return handleResponse(mute);
}
export const blockContact = async (contactID)=>{
    const block = await fetchWithAuth(BASE_URL+`block/${contactID}`,{
        method:"PUT"
    })
    return handleResponse(block);
}
