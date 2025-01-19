import {fetchWithAuth} from "./fetchWithAuth";
import {handleResponse} from "../handleReponse";

export const fetchUserCalendar =async () =>{
    const responseCalendar = await fetchWithAuth("calendar/get",{
        method : "GET",
    });
    return handleResponse(responseCalendar)
};

export const addUserCalendar = async ( id) => {
    const addCalendar = await fetchWithAuth("calendar/add" , {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({id})
    })
   return handleResponse(addCalendar)
}

export const deleteUserCalendar = async ()=>{
    const deleteCalendar = await fetchWithAuth(`calendar/delete/`,{
        method:"DELETE"
    })
   return handleResponse(deleteCalendar)
}
export const addEventToCalendar = async (events) => {
    const addEvents = await fetchWithAuth(`calendar/event/add`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify([events])
    })
    return handleResponse(addEvents)
}
export const deleteEventToCalendar = async (eventID) =>{
    const deleteEvent = await fetchWithAuth(`calendar/event/${eventID}` , {
        method:"delete"
    })
    return handleResponse(deleteEvent)
}

export const updateCalendarEvent = async ( eventID , updatedEvent) =>{
    const updateCalendarEvent = await fetchWithAuth(`calendar/event/update/${eventID}` , {
        method:"put",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(updatedEvent)
    })
   return handleResponse(updateCalendarEvent)
}