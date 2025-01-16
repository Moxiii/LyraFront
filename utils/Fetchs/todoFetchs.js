import {fetchWithAuth} from "./fetchWithAuth";


export const fetchUserTodo =async () =>{
    const responseTodo = await fetchWithAuth("http://localhost:8080/api/todo/get",{
        method : "GET",
    });
    if(!responseTodo.ok){
        throw new Error("Failed to fetch User")
    }
    return await responseTodo.json();
};
export const getTodoById = async (todoID) =>{
    const getTodoByID = await fetchWithAuth(`http://localhost:8080/api/todo/${todoID}`)
    if(!getTodoByID().ok){throw new Error("Failed to retrieve ToDo w/ " +  todoID +  "ID");}
    return getTodoByID.json()
}

export const addUserTodo = async ( title) => {
    const addTodo = await fetchWithAuth("http://localhost:8080/api/todo/add" , {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({title})
    })
    if(!addTodo.ok){throw new Error("Failed to add ToDo");}
    const result = await addTodo.json();
    return result
}
export const updateTodo = async (todoID, updatedTodo) =>{
    const updateTodo = await fetchWithAuth(`http://localhost:8080/api/todo/update/${todoID}` , {
        method:"put",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(updatedTodo)
    })
    if(!updateTodo.ok){throw new Error("Failed to update Todo")}
    const result = await updateTodo.json()
    return result
}
export const deleteUserTodo = async (todoID)=>{
    const deleteTodo = await fetchWithAuth(`http://localhost:8080/api/todo/delete/${todoID}`,{
        method:"DELETE"
    })
    if(!deleteTodo.ok){throw new Error("Failed to delete Todo")}
    return deleteTodo
}
export const addTaskToTodo = async ( todoID , tasks) => {
    const addTasks = await fetchWithAuth(`http://localhost:8080/api/todo/add/task/${todoID}`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify([tasks])
    })
    if(!addTasks.ok){throw new Error("Failed to add ToDo");}
    return await addTasks.json()
}
export const deleteTasktoTodo = async (todoID , taskID) =>{
    const deleteTask = await fetchWithAuth(`http://localhost:8080/api/todo/delete/task/${todoID}/${taskID}` , {
        method:"delete"
    })
    if(!deleteTask.ok){throw new Error("failed to delete todo")}
    return deleteTask;
}

export const updateTodoTask = async (todoID , taskID , updatedTask) =>{
    const updateTodoTask = await fetchWithAuth(`http://localhost:8080/api/todo/update/task/${todoID}/${taskID}` , {
        method:"put",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(updatedTask)
    })
    if(!updateTodoTask.ok){throw new Error("Failed to update Todo task")}
    return await updateTodoTask.json()
}