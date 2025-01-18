import {fetchWithAuth} from "./fetchWithAuth";

export const fetchUserProject =async () =>{
    const get = await fetchWithAuth("project/get",{
        method : "GET",
    });
    if(!get.ok){
        throw new Error("Failed to fetch project")
    }
    return await get.json();
};

 export const addUserProject = async (addedProject) =>{
     const formData = new FormData();
     formData.append("name", addedProject.name);
     formData.append("description", addedProject.description || "");
     formData.append("links", JSON.stringify(addedProject.links || []));
     formData.append("username", JSON.stringify(addedProject.username || []));
     if (addedProject.file) {
         formData.append("file", addedProject.file);
     }
     const add = await fetchWithAuth("project/add" , {
         method:"POST",
         headers: {
             "Content-Type": "application/json",
         },
         body:formData
     });
     if(!add.ok){throw new Error("Failed to add project")}
     return await add.json()
 }

 export const updateUserProject = async (projectID , updatedProject)  =>{
     const formData = new FormData();
     formData.append("name", updatedProject.name);
     formData.append("description", updatedProject.description || "");
     formData.append("links", JSON.stringify(updatedProject.links || []));
     formData.append("username", JSON.stringify(updatedProject.username || []));

     if (updatedProject.file) {
         formData.append("file", updatedProject.file);
     }
     const put = await fetchWithAuth(`project/update/${projectID}`,{
         method:"PUT",
         headers: {
             "Content-Type": "application/json",
         },
         body:formData
     })
     if(!put.ok){throw new Error("Failed to put project")}
     return await put.json()
 }

export const deleteUserProject = async (projectID) =>{
     const del = await fetchWithAuth(`project/delete/${projectID}`,{
         method:"DELETE"
     })
    if(!del.ok){throw new Error("Failed to delete project")}
    return await del.json()
}