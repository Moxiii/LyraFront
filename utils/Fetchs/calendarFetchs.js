import {fetchWithAuth} from "./fetchWithAuth";


export const fetchUserCalendar =async () =>{
    const responseCalendar = await fetchWithAuth("calendar/get",{
        method : "GET",
    });
    if(!responseCalendar.ok){
        throw new Error("Failed to fetch User")
    }
    return await responseCalendar.json();
};


export const addUserCalendar = async ( id) => {
    const addCalendar = await fetchWithAuth("calendar/add" , {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({id})
    })
    if(!addCalendar.ok){throw new Error("Failed to add Calendar");}
    const result = await addCalendar.json();
    return result
}
export const updateCalendar = async ( updatedCalendar) =>{
    const updateCalendar = await fetchWithAuth(`calendar/update/` , {
        method:"put",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(updatedCalendar)
    })
    if(!updateCalendar.ok){throw new Error("Failed to update Calendar")}
    const result = await updateCalendar.json()
    return result
}
export const deleteUserCalendar = async ()=>{
    const deleteCalendar = await fetchWithAuth(`calendar/delete/`,{
        method:"DELETE"
    })
    if(!deleteCalendar.ok){throw new Error("Failed to delete Calendar")}
    return deleteCalendar
}
export const addEventToCalendar = async (events) => {
    const addEvents = await fetchWithAuth(`calendar/event/add`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify([events])
    })
    if(!addEvents.ok){throw new Error("Failed to add Calendar");}
    return await addEvents.json()
}
export const deleteEventToCalendar = async (eventID) =>{
    const deleteEvent = await fetchWithAuth(`calendar/event/${eventID}` , {
        method:"delete"
    })
    if(!deleteEvent.ok){throw new Error("failed to delete Calendar")}
    return deleteEvent;
}

export const updateCalendarEvent = async ( eventID , updatedEvent) =>{
    const updateCalendarEvent = await fetchWithAuth(`calendar/event/update/${eventID}` , {
        method:"put",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(updatedEvent)
    })
    if(!updateCalendarEvent.ok){throw new Error("Failed to update Calendar Event")}
    return await updateCalendarEvent.json()
}