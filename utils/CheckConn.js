import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {fetchUserData, handleLogout, refreshToken} from "./Fetchs/userFetchs";

const AuthLoading = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('jwtToken');
            if (token) {
                try{
                    const response = await fetchUserData();
                    if(response.status !== 200){
                        await handleLogout();
                        navigation.navigate('Login');
                    }else{
                        navigation.navigate('Main')
                    }
                }catch (error){
                    console.error('Erreur lors de la vérification du token:', error);
                    try {
                        const newToken = await refreshToken();
                        if (newToken) {
                            navigation.navigate('Main');
                        } else {
                            await AsyncStorage.removeItem('jwtToken');
                            navigation.navigate('Login');
                        }
                    } catch (error) {
                        await AsyncStorage.removeItem('jwtToken');
                        navigation.navigate('Login');
                    }
                }
            } else {
                navigation.navigate('Splash');
            }
        };

        checkAuth();
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

export default AuthLoading;
