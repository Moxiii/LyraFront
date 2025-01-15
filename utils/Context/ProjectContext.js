import React, { createContext, useContext } from "react";
import {useUserData} from "./UserContext";
const ProjectContext = createContext();
export function ProjectProvider ({children}){
    const {userProjects,setUserProjects } = useUserData()
    const addProjectToContext = async (ProjectTitle)=>{
        try{
            
        }catch(error){throw new Error(error)}
    }    
    const deleteProjectToContext = async (ProjectTitle)=>{
        try{
            
        }catch(error){throw new Error(error)}
    }    
    const updateProjectToContext = async (ProjectTitle)=>{
        try{
            
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