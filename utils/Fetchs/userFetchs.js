import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchWithAuth} from "./fetchWithAuth";

export const uploadProfilePic = async (file) => {
    if (!file) {
        throw new Error('Aucun fichier sélectionné.');
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await fetchWithAuth(
            'user/upload/profilPic',
            {
                method: "POST",
                body: formData,
            });
        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Erreur lors de l\'upload :', errorMessage);
            throw new Error(`Erreur lors de l'envoi : ${errorMessage}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erreur lors de l\'upload de l\'image :', error.message);
        throw error;
    }
}
export const fetchUserData =async () =>{
    const responseUserData = await fetchWithAuth("user/me",{
      method : "GET",
    });
    if(!responseUserData.ok){
      throw new Error("Failed to fetch User")
    }
    return await responseUserData.json();
  };
export const handleLogout = async () => {
  try {
    await fetchWithAuth("auth/logout", {
      method: "DELETE",
    });

    await AsyncStorage.removeItem('jwtToken');
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
};

export const refreshToken = async ()=>{
    try {
      const response = await fetchWithAuth('auth/refresh-token', {
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

