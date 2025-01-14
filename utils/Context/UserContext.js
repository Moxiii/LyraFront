import React, { createContext, useContext, useState, useEffect } from "react";
import {fetchUserData} from "../Fetchs/userFetchs";
import {fetchUserProject} from "../Fetchs/projetFetch";
import {fetchUserTodo, addUserTodo, addTaskToTodo, deleteTasktoTodo, deleteUserTodo} from "../Fetchs/todoFetchs";

const UserContext = createContext();
const PPplaceholder = require("../../assets/img/ppplaceholder.png");
export function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const [userTodos, setUserTodos] = useState([]);
    const [userProjects, setUserProjects] = useState([]);
    const deleteTaskToTodoToContext = async (todoID ,taskID)=>{
        try{
            const response = await deleteTasktoTodo(todoID , taskID)
            setUserTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === todoID
                        ? { ...todo, tasks: todo.tasks ? todo.tasks.filter((task) => task.id !== taskID) : [] }
                        : todo
                )
            );

        }
        catch (error){throw new Error(error)}
    }
    const deleteTodoToContext = async (todoID)=>{
        try{
            await deleteUserTodo(todoID);
            setUserTodos((prevTodos)=>{
                prevTodos.filter((todo)=> todo.id !== todoID)
            })
        }catch(error){throw new Error(error)}
    }
    const addTodoToContext = async (todoTitle)=>{
        try{
            const response = await addUserTodo(todoTitle)
            setUserTodos((prevTodos)=>[
                ...prevTodos,
                {id:response.id , title: response.title , tasks:response.tasks||[] }
                ]
            )
        }catch (error){throw new Error("Failed to add todo to context")}
    }
    const addTaskToTodoToContext = async(todoID , newTask)=>{
        try {
            const response = await addTaskToTodo(todoID , newTask)
            setUserTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === todoID
                        ? { ...todo, tasks: [...(todo.tasks || []), response] }
                        : todo
                )
            );
        }
        catch (error){throw new Error("Failled to add task")}
    }
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
                addTodoToContext,
                addTaskToTodoToContext,
                deleteTaskToTodoToContext,
                deleteTodoToContext,
        }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUserData() {
    return useContext(UserContext);
}
