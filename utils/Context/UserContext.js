import React, {createContext, useContext, useEffect, useState} from "react";
import {fetchUserData, uploadProfilePic} from "../Fetchs/userFetchs";
import {fetchUserProject} from "../Fetchs/projetFetch";
import {fetchUserTodo} from "../Fetchs/todoFetchs";
import {TodoProvider} from "./TodoContext";
import {ProjectProvider} from "./ProjectContext";
import {CalendarProvider} from "./CalendarContext";

const UserContext = createContext();
const PPplaceholder = require("../../assets/img/ppplaceholder.png");
export function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const [userTodos, setUserTodos] = useState([]);
    const [userProjects, setUserProjects] = useState([]);
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
                const data = await fetchUserData();
                const formattedData = {
                    ...data,
                    profileImage: data.profileImage
                        ? `data:image/png;base64,${data.profileImage}`
                        : PPplaceholder,
                };
                setUserData(formattedData);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };

        const loadUserTodos = async () => {
            try {
                const todos = await fetchUserTodo();
                setUserTodos(todos);
            } catch (error) {
                console.error("Failed to fetch user todos", error);
            }
        };

        const loadUserProjects = async () => {
            try {
                const projects = await fetchUserProject();
                setUserProjects(projects);
            } catch (error) {
                console.error("Failed to fetch user projects", error);
            }
        };

        loadUserData();
        loadUserTodos();
        loadUserProjects();
    }, []);

    return (
        <UserContext.Provider
            value={{ userData,
                userTodos,
                userProjects,
                setUserData,
                setUserTodos,
                setUserProjects ,
                addProfilePicToContext,
        }}
        >

            <TodoProvider>
               <ProjectProvider>
                   <CalendarProvider>
                   {children}
                   </CalendarProvider>
               </ProjectProvider>
            </TodoProvider>

        </UserContext.Provider>
    );
}

export function useUserData() {
    return useContext(UserContext);
}
