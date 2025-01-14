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
export const deleteUserTodo = async (todoID)=>{
    const deleteTodo = await fetchWithAuth(`http://localhost:8080/api/todo/delete/${todoID}`,{
        method:"DELETE"
    })
    if(!deleteTodo.ok){throw new Error("Failed to delete Todo")}
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
}
export const deleteTasktoTodo = async (todoID , taskID) =>{
    const deleteTask = await fetchWithAuth(`http://localhost:8080/api/todo/delete/task/${todoID}/${taskID}` , {
        method:"delete"
    })
    if(!deleteTask.ok){throw new Error("failed to delete todo")}
}