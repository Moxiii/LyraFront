import {fetchWithAuth} from "./fetchWithAuth";
export const fetchUserProject =async () =>{
    const responseProject = await fetchWithAuth("http://localhost:8080/api/project/get",{
        method : "GET",
    });
    if(!responseProject.ok){
        throw new Error("Failed to fetch User")
    }
    return await responseProject.json();
};

