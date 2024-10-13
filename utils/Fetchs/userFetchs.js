
  export const fetchUserData =async () =>{
    const token = localStorage.getItem("jwtToken");
    const responseUserData = await fetch("http://localhost:8080/api/user/me",{
      method : "GET",
      headers : {
        Authorization: `Bearer ${token}`,
      },
    });
    if(!responseUserData.ok){
      throw new Error("Failed to fetch User")
    }
    return await responseUserData.json();
  };

