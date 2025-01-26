import React, {createContext, useContext, useEffect, useState} from "react";
import { uploadProfilePic} from "../Fetchs/userFetchs";
import {TodoProvider} from "./TodoContext";
import {ProjectProvider} from "./ProjectContext";
import {CalendarProvider} from "./CalendarContext";
import {ContactProvider} from "./ContactContext";
import {ConversationProvider} from "./ConversationContext";
import {userService} from "../Service/UserService";

const UserContext = createContext();
const PPplaceholder = require("../../assets/img/ppplaceholder.png");
export function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const [userTodos, setUserTodos] = useState([]);
    const [userProjects, setUserProjects] = useState([]);
    const [userCalendar,setUserCalendar]=useState([])
    const [userContact,setUserContact]=useState([])
    const [userConversation,setUserConversation]=useState([])

    const addProfilePicToContext = async (file) => {
        try {
            const response = await uploadProfilePic(file);
            if (response.profileImage) {
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    profileImage: `data:image/png;base64,${response.profileImage}`,
                }));
            } else {
                console.error("Erreur côté serveur :", response);
            }
        } catch (error) {
            console.error("Erreur lors de l'upload de l'image :", error);
        }
    };
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const [userData, todos, projects, calendar, contact, conversation] =
                    await Promise.all([
                        userService.loadUserData(),
                        userService.loadUserTodos(),
                        userService.loadUserProjects(),
                        userService.loadUserCalendar(),
                        userService.loadUserContact(),
                        userService.loadUserConversation(),
                    ]);

                setUserData(userData);
                setUserTodos(todos);
                setUserProjects(projects);
                setUserCalendar(calendar);
                setUserContact(contact);
                setUserConversation(conversation);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };

        loadUserData();
    }, []);

    return (
        <UserContext.Provider
            value={{
                userData,
                userTodos,
                userProjects,
                userCalendar,
                userContact,
                userConversation,
                setUserData,
                setUserTodos,
                setUserProjects ,
                setUserCalendar,
                setUserContact,
                setUserConversation,
                addProfilePicToContext,
        }}
        >

            <TodoProvider>
               <ProjectProvider>
                   <CalendarProvider>
                       <ConversationProvider>
                          <ContactProvider>
                            {children}
                       </ContactProvider>
                   </ConversationProvider>
                   </CalendarProvider>
               </ProjectProvider>
            </TodoProvider>

        </UserContext.Provider>
    );
}

export function useUserData() {
    return useContext(UserContext);
}
