import {fetchWithAuth} from "./fetchWithAuth";
import {handleResponse} from "../handleReponse";

export const fetchUserTodo =async () =>{
    const getTodos = await fetchWithAuth("todo/get",{
        method : "GET",
    });
    return handleResponse(getTodos)
};
export const getTodoById = async (todoID) =>{
    const getByID = await fetchWithAuth(`todo/${todoID}`)
    return handleResponse(getByID)
}

export const addUserTodo = async ( title) => {
    const addTodo = await fetchWithAuth("todo/add" , {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({title})
    })
    return handleResponse(addTodo)
}
export const updateTodo = async (todoID, updatedTodo) =>{
    const updateTodo = await fetchWithAuth(`todo/update/${todoID}` , {
        method:"put",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(updatedTodo)
    })
    return handleResponse(updateTodo)
}
export const deleteUserTodo = async (todoID)=>{
    const del = await fetchWithAuth(`todo/delete/${todoID}`,{
        method:"DELETE"
    })
    return handleResponse(del);
}
export const addTaskToTodo = async ( todoID , tasks) => {
    const addTasks = await fetchWithAuth(`todo/add/task/${todoID}`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify([tasks])
    })
    return handleResponse(addTasks)
}
export const deleteTaskToTodo = async (todoID , taskID) =>{
    const deleteTask = await fetchWithAuth(`todo/delete/task/${todoID}/${taskID}` , {
        method:"delete"
    })
    return handleResponse(deleteTask)
}

export const updateTodoTask = async (todoID , taskID , updatedTask) =>{
    const updateTodoTask = await fetchWithAuth(`todo/update/task/${todoID}/${taskID}` , {
        method:"put",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(updatedTask)
    })
   return handleResponse(updateTodoTask)
}