import {fetchWithAuth} from "./fetchWithAuth";
import {handleResponse} from "../handleReponse";

export const fetchUserProject =async () =>{
    const get = await fetchWithAuth("project/get",{
        method : "GET",
    });
  return handleResponse(get);
};

 export const addUserProject = async (addedProject) =>{
     const add = await fetchWithAuth("project/add" , {
         method:"POST",
         headers: {
             "Content-Type": "application/json",
         },
         body:JSON.stringify(addedProject)
     });
     const result = handleResponse(add)
     if(addedProject.file){
         await uploadProjectPicture(addedProject.file , result.id)
     }
     return result
 }

 export const updateUserProject = async (projectID , updatedProject)  =>{

     const put = await fetchWithAuth(`project/update/${projectID}`,{
         method:"PUT",
         headers: {
             "Content-Type": "application/json",
         },
         body:JSON.stringify(updatedProject)
     })
     const result = handleResponse(put)
     if (updatedProject.file){
         await uploadProjectPicture(updatedProject.file , projectID)
     }
    return result
 }

export const deleteUserProject = async (projectID) =>{
     const del = await fetchWithAuth(`project/delete/${projectID}`,{
         method:"DELETE"
     })
   return  handleResponse(del)
}
export const uploadProjectPicture = async (file , projectID) =>{
     const formData = new FormData();
     formData.append("file" , file)
     const response = await fetchWithAuth(`/upload/project/picture/${projectID}`,{
         method:"POST",
         body:formData
    })
   return handleResponse(response);
}