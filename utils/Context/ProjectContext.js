import React, { createContext, useContext } from "react";
import {useUserData} from "./UserContext";
const ProjectContext = createContext();
export function ProjectProvider ({children}){
    const {setUserProjects , userProjects} = useUserData()
return(
    <ProjectContext.Provider
    value={{

    }}>
        {children}
    </ProjectContext.Provider>
)
}
export function useProjectContext() {
    return useContext(ProjectContext);
}