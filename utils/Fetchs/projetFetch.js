import {fetchWithAuth} from "./fetchWithAuth";

export const fetchUserProject =async () =>{

    const get = await fetchWithAuth("project/get",{
        method : "GET",
    });
    if(!get.ok){
        throw new Error("Failed to fetch User")
    }
    return await get.json();
};
 const add = await fetchWithAuth("project/add")
