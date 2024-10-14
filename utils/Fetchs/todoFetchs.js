export const fetchUserTodo =async () =>{
    const token = localStorage.getItem("jwtToken");
    const responseTodo = await fetch("http://localhost:8080/api/todo/get/todo",{
        method : "GET",
        headers : {
            Authorization: `Bearer ${token}`,
        },
    });
    if(!responseTodo.ok){
        throw new Error("Failed to fetch User")
    }
    return await responseTodo.json();
};

