import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchWithAuth} from "./fetchWithAuth";
import {useNavigation} from "@react-navigation/native";
export const fetchUserData =async () =>{
    const responseUserData = await fetchWithAuth("http://localhost:8080/api/user/me",{
      method : "GET",
    });
    if(!responseUserData.ok){
      throw new Error("Failed to fetch User")
    }
    return await responseUserData.json();
  };
export const handleLogout = async () => {
  try {
    await fetchWithAuth("http://localhost:8080/api/auth/logout", {
      method: "DELETE",
    });

    await AsyncStorage.removeItem('jwtToken');
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
};

export const refreshToken = async ()=>{
    try {
      const response = await fetchWithAuth('http://localhost:8080/api/auth/refresh-token', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        const newToken = data.accessToken;
        await AsyncStorage.setItem('jwtToken', newToken);
        return newToken;
      } else {
        throw new Error('Unable to refresh token');
        await AsyncStorage.removeItem('jwtToken');
      }
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      throw error;
    }
  };

