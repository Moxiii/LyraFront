import {fetchWithAuth} from "./fetchWithAuth";
export const fetchUserTodo =async () =>{
    const responseTodo = await fetchWithAuth("http://localhost:8080/api/todo/get/todo",{
        method : "GET",
    });
    if(!responseTodo.ok){
        throw new Error("Failed to fetch User")
    }
    return await responseTodo.json();
};

