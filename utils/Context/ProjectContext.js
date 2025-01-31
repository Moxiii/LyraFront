import React, {createContext, useContext} from "react";
import {useUserData} from "./UserContext";
import {addUserProject, deleteUserProject, updateUserProject} from "../Fetchs/projetFetch";


const ProjectContext = createContext();

export function ProjectProvider ({children}){
    const {userProjects,setUserProjects } = useUserData()

    const addProjectToContext = async (project)=>{
        try{
            const response = await addUserProject(project);
            if(response.name){
                setUserProjects((prevProjects)=>
                    [...prevProjects,
                        {
                            id:response.id ,
                            name:response.name ,
                            description:response.description || "",
                            projectPicture: `data:image/png;base64,${response.projectPicture}` || null ,
                            links:[response.links] || [] ,
                            users:[response.users] || []
                        }
                    ]
                )
            }
        }catch(error){throw new Error(error)}
    }

    const deleteProjectToContext = async (projectID)=>{
        try{
            const response = await deleteUserProject(projectID);
            if(response.ok){
                setUserProjects((prevProjects)=>
                    prevProjects.filter((project)=>
                        project.id !== projectID
                    ))
            }

        }catch(error){throw new Error(error)}
    }

    const updateProjectToContext = async (projectID, updatedProject)=>{
        try{
            const response = await updateUserProject(projectID,updatedProject)
            if(response.name){
                setUserProjects((prevProjects) =>
                    prevProjects.map((project) =>
                        project.id === projectID
                            ? {
                                ...project,
                                name: response.name,
                                description: response.description || "",
                                projectPicture: `data:image/png;base64,${response.projectPicture}` || null,
                                links: response.links || [],
                                users: response.users || []
                            }
                            : project
                    )
                );
            }
        }catch(error){throw new Error(error)}
    }

return(
    <ProjectContext.Provider
    value={{
        addProjectToContext,
        deleteProjectToContext,
        updateProjectToContext,
    }}>
        {children}
    </ProjectContext.Provider>
)
}
export function useProjectContext() {
    return useContext(ProjectContext);
}