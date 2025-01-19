import React, { createContext, useContext } from "react";
import {
    addTaskToTodo,
    addUserTodo,
    deleteTaskToTodo,
    deleteUserTodo,
    updateTodo,
    updateTodoTask
} from "../Fetchs/todoFetchs";
import {useUserData} from "./UserContext";
const TodoContext = createContext();
export function TodoProvider ({children}){
    const {userTodos,setUserTodos} = useUserData()
    const deleteTaskToTodoToContext = async (todoID ,taskID)=>{
        try{
            const response = await deleteTaskToTodo(todoID , taskID)
            if(response.ok){
                setUserTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo.id === todoID
                            ? { ...todo, tasks: todo.tasks ? todo.tasks.filter((task) => task.id !== taskID) : [] }
                            : todo
                    )
                );
            }
            throw new Error("Fail to delete task")
        }
        catch (error){throw new Error(error)}
    }
    const deleteTodoToContext = async (todoID) => {
        try {
            const response = await deleteUserTodo(todoID);
            if (response.ok) {
                setUserTodos((prevTodos) =>
                    prevTodos.filter((todo) => todo.id !== todoID)
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    const addTodoToContext = async (todoTitle)=>{
        try{
            const response = await addUserTodo(todoTitle)
            setUserTodos((prevTodos)=>[
                    ...prevTodos,
                    {id:response.id , title: response.title , tasks:response.tasks || [] }
                ]
            )
        }catch (error){throw new Error(error)}
    }
    const addTaskToTodoToContext = async(todoID , newTask)=>{
        try {
            const response = await addTaskToTodo(todoID , newTask)
            setUserTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === todoID
                        ? {
                    ...todo,
                            tasks:[...todo.tasks , ...response] }
                        : todo
                )
            );
        }
        catch (error){throw new Error(error)}
    }

    const updateTodoToContext = async (todoID , updatedTodo)=>{
        try {
            const response = await updateTodo(todoID , updatedTodo);
            setUserTodos((prevTodos) =>
                prevTodos.map((todo)=>
                    todo.id === todoID
                    ?
                        {...todo ,
                            ...(response.title && { title: response.title }),
                            ...(response.tasks && { tasks: response.task }),
                        }
        : todo
                )
            )
        }
        catch (error){throw new Error(error)}
    }
    const updateTodoTaskToContext = async (todoID , taskID , updatedTask)=>{
        try {
            const response = await updateTodoTask(todoID , taskID , updatedTask);
            setUserTodos((prevTodos)=>
                prevTodos.map((todo)=>
                    todo.id === todoID
                    ?
                        {
                            ...todo,
                            tasks:todo.tasks.map((task)=>
                                task.id === taskID ?
                                    {
                                        ...task,...response
                                    }
                                    :task
                            )} : todo
                )
            )
        }
        catch (error){throw new Error(error)}
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