import React, { createContext, useContext, useState, useEffect } from "react";
import {fetchUserData} from "../Fetchs/userFetchs";
import {fetchUserProject} from "../Fetchs/projetFetch";
import {fetchUserTodo} from "../Fetchs/todoFetchs";

const UserContext = createContext();
const PPplaceholder = require("../../assets/img/ppplaceholder.png");
export function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const [userTodos, setUserTodos] = useState([]);
    const [userProjects, setUserProjects] = useState([]);

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
            value={{ userData, userTodos, userProjects, setUserData, setUserTodos, setUserProjects }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUserData() {
    return useContext(UserContext);
}
