import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken , handleLogout } from "./userFetchs";


export const fetchWithAuth = async (url, options = {}, onError) => {
    try {
        // Ajoute automatiquement le token JWT si disponible
        const token = await AsyncStorage.getItem('jwtToken');
        const headers = {
            ...options.headers,
            Authorization: token ? `Bearer ${token}` : undefined,
        };
        const response = await fetch(url, { ...options, headers });

        // Vérifie si l'utilisateur est autorisé (401 ou 403)
        if (response.status === 401 || response.status === 403) {
            console.warn('Token invalide ou expiré, tentative de rafraîchissement');
            const newToken = await refreshToken();

            if (newToken) {
                // Réessaie la requête avec le nouveau token
                const retryHeaders = {
                    ...options.headers,
                    Authorization: `Bearer ${newToken}`,
                };
                const retryResponse = await fetch(url, { ...options, headers: retryHeaders });

                if (!retryResponse.ok) {
                    throw new Error(`Échec de la requête après rafraîchissement : ${retryResponse.statusText}`);
                }

                return retryResponse;
            } else {
                console.warn('Rafraîchissement échoué, déconnexion de l\'utilisateur');
                await handleLogout();
                await AsyncStorage.removeItem('jwtToken');
                throw new Error('Déconnecté : le token est expiré ou invalide');
            }
        }
        if (!response.ok) {
            throw new Error(`Erreur lors de la requête : ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error('Erreur dans fetchWithAuth:', error);
        if (onError) {
            onError(error);
        }
        throw error;
    }
};
