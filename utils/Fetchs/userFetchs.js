
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

export const handleLogout = async () => {
  try {
    const token = localStorage.getItem("jwtToken"); // Récupérer le token actuel
    await fetch("http://localhost:8080/api/auth/logout", {
      method: "DELETE",
      headers : {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("jwtToken");
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
};

