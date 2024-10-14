import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthLoading = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('jwtToken');
            if (token) {
                navigation.navigate('Main');
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
