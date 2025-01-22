import React, {createContext, useContext} from "react";
import {
    addEventToCalendar,
    deleteEventToCalendar,
    updateCalendarEvent,
} from "../Fetchs/calendarFetchs";
import {useUserData} from "./UserContext";

const CalendarContext = createContext();

export function CalendarProvider ({children}){
    const {userCalendar,setUserCalendar} = useUserData()
    const deleteEventToCalendarToContext = async (calendarID ,eventID)=>{
        try{
            const response = await deleteEventToCalendar(calendarID , eventID)
            if(response.ok){
                setUserCalendar((prevCalendar) =>
                    prevCalendar.map((calendar) =>
                        calendar.id === calendarID
                            ? { ...calendar, events: calendar.events ? calendar.events.filter((event) => event.id !== eventID) : [] }
                            : calendar
                    )
                );
            }
            throw new Error("Fail to delete Event")
        }
        catch (error){throw new Error(error)}
    }
    const addEventToCalendarToContext = async(calendarID , newEvent)=>{
        try {
            const response = await addEventToCalendar(calendarID , newEvent)
            setUserCalendar((prevCalendar) =>
                prevCalendar.map((calendar) =>
                    calendar.id === calendarID
                        ? {
                            ...calendar,
                            events:[...calendar.events , ...response] }
                        : calendar
                )
            );
        }
        catch (error){throw new Error(error)}
    }

    const updateCalendarEventToContext = async ( calendarID , eventID , updatedEvent)=>{
        try {
            const response = await updateCalendarEvent( eventID , updatedEvent);
            setUserCalendar((prevCalendar)=>
                prevCalendar.map((calendar)=>
                    calendar.id === calendarID
                        ?
                        {
                            ...calendar,
                            events:calendar.events.map((event)=>
                                event.id === eventID ?
                                    {
                                        ...event,...response
                                    }
                                    :event
                            )} : calendar
                )
            )
        }
        catch (error){throw new Error(error)}
    }
    return(
        <CalendarContext.Provider
            value={{
                addEventToCalendarToContext,
                deleteEventToCalendarToContext,
                updateCalendarEventToContext,
            }}>
            {children}
        </CalendarContext.Provider>
    )
}
export function useCalendarContext() {
    return useContext(CalendarContext);
}