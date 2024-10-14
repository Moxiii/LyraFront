export const fetchUserProject =async () =>{
    const token = localStorage.getItem("jwtToken");
    const responseProject = await fetch("http://localhost:8080/api/project/get",{
        method : "GET",
        headers : {
            Authorization: `Bearer ${token}`,
        },
    });
    if(!responseProject.ok){
        throw new Error("Failed to fetch User")
    }
    return await responseProject.json();
};

