import {fetchWithAuth} from "./fetchWithAuth";
import {handleResponse} from "../handleReponse";
const BASE_URL = "todo/"
export const fetchUserTodo =async () =>{
    const getTodos = await fetchWithAuth(BASE_URL+"get",{
        method : "GET",
    });
    return handleResponse(getTodos)
};
export const getTodoById = async (todoID) =>{
    const getByID = await fetchWithAuth(BASE_URL+`${todoID}`)
    return handleResponse(getByID)
}

export const addUserTodo = async ( title) => {
    const addTodo = await fetchWithAuth(BASE_URL+"add" , {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({title})
    })
    return handleResponse(addTodo)
}
export const updateTodo = async (todoID, updatedTodo) =>{
    const updateTodo = await fetchWithAuth(BASE_URL+`update/${todoID}` , {
        method:"put",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(updatedTodo)
    })
    return handleResponse(updateTodo)
}
export const deleteUserTodo = async (todoID)=>{
    const del = await fetchWithAuth(BASE_URL+`delete/${todoID}`,{
        method:"DELETE"
    })
    return handleResponse(del);
}
export const addTaskToTodo = async ( todoID , tasks) => {
    const addTasks = await fetchWithAuth(BASE_URL+`add/task/${todoID}`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify([tasks])
    })
    return handleResponse(addTasks)
}
export const deleteTaskToTodo = async (todoID , taskID) =>{
    const deleteTask = await fetchWithAuth(BASE_URL+`delete/task/${todoID}/${taskID}` , {
        method:"delete"
    })
    return handleResponse(deleteTask)
}

export const updateTodoTask = async (todoID , taskID , updatedTask) =>{
    const updateTodoTask = await fetchWithAuth(BASE_URL+`update/task/${todoID}/${taskID}` , {
        method:"put",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(updatedTask)
    })
   return handleResponse(updateTodoTask)
}