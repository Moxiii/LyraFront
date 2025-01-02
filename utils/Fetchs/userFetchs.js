import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUserData =async () =>{
  const token = await AsyncStorage.getItem('jwtToken');
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
    const token = await AsyncStorage.getItem('jwtToken');
    await fetch("http://localhost:8080/api/auth/logout", {
      method: "DELETE",
      headers : {
        Authorization: `Bearer ${token}`,
      },
    });

    await AsyncStorage.removeItem('jwtToken');
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
};

export const refreshToken = async ()=>{
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const response = await fetch('http://localhost:8080/api/auth/refresh-token', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const newToken = data.accessToken;
        await AsyncStorage.setItem('jwtToken', newToken);
        return newToken;
      } else {
        throw new Error('Unable to refresh token');
      }
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      throw error;
    }
  };

