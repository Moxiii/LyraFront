import React, { createContext, useContext } from "react";
import {
    addTaskToTodo,
    addUserTodo,
    deleteTasktoTodo,
    deleteUserTodo,
    updateTodo,
    updateTodoTask
} from "../Fetchs/todoFetchs";
import {useUserData} from "./UserContext";
const TodoContext = createContext();
export function TodoProvider ({children}){
    const {setUserTodos , userTodos} = useUserData()
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
        catch (error){throw new Error("Failed to add task")}
    }

    const updateTodoToContext = async (todoID)=>{
        try {
            const response = await updateTodo(todoID);
        }
        catch (error){throw new Error("Failed to update todo")}
    }
    const updateTodoTaskToContext = async (todoID , taskID)=>{
        try {
            const response = await updateTodoTask(todoID , taskID);
        }
        catch (error){throw new Error("Failed to update todo task")}
    }
    return(
        <TodoContext.Provider
            value={{
                addTodoToContext,
                addTaskToTodoToContext,
                deleteTaskToTodoToContext,
                deleteTodoToContext,
                updateTodoTaskToContext,
                updateTodoToContext,
            }}>
            {children}
        </TodoContext.Provider>
    )
}
export function useTodoContext() {
    return useContext(TodoContext);
}