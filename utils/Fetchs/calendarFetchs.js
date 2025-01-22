import {fetchWithAuth} from "./fetchWithAuth";
import {handleResponse} from "../handleReponse";

export const fetchUserCalendar =async () =>{
    const responseCalendar = await fetchWithAuth("calendar/get",{
        method : "GET",
    });
    return handleResponse(responseCalendar)
};
export const getEventByWeek = async (week) =>{
    const getByWeek = await fetchWithAuth("/getByWeek",{
        method: "GET",
        body:week
        })
    return handleResponse(getEventByWeek())
}
export const getEventByMonth = async (month) =>{
    const getByWeek = await fetchWithAuth("/getByMonth",{
        method: "GET",
        body:month
        })
    return handleResponse(getByWeek)
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