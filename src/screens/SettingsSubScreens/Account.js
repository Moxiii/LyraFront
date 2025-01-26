import React, {useState} from "react";
import {Alert, Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {launchImageLibrary} from "react-native-image-picker";
import {useUserData} from "../../../utils/Context/UserContext";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import backgroundImage from "../../../assets/img/Splash.jpg";
import Header from "../../Components/Header";
export default function Account() {
    const navigation = useNavigation()
    const { addProfilePicToContext } = useUserData();
    const [file, setFile] = useState(null);
    const [previewUri, setPreviewUri] = useState(null);
    const handlePickImage = async () => {
        if (Platform.OS === "web") {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (event) => {
                const selectedFile = event.target.files[0];
                if (selectedFile) {
                    setFile(selectedFile);
                    setPreviewUri(URL.createObjectURL(selectedFile));
                }
            };
            input.click();
        } else {
            const result = await launchImageLibrary({
                mediaType: "photo",
                includeBase64: false,
                quality: 1,
            });

            if (result.didCancel) {
                Alert.alert("Opération annulée", "Aucune image sélectionnée.");
            } else if (result.errorCode) {
                Alert.alert("Erreur", "Erreur lors de la sélection de l'image.");
            } else {
                const selectedFile = result.assets[0];
                setFile(selectedFile);
                setPreviewUri(selectedFile.uri);
            }
        }
    };

    const handleSubmitPic = async () => {
        if (!file) {
            Alert.alert("Erreur", "Veuillez sélectionner un fichier.");
            return;
        }
        try {
            await addProfilePicToContext(file);
        } catch (error) {
            Alert.alert("Erreur", "Une erreur est survenue lors de l'envoi.");
            console.error("Erreur :", error);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={backgroundImage}
                resizeMode="cover"
                style={styles.container}
            >
         <Header name={"Account"}/>

            <Text style={styles.title}>Télécharger votre photo de profil</Text>
            {previewUri && (
                <Image source={{ uri: previewUri }} style={styles.imagePreview} />
            )}
            <TouchableOpacity style={styles.button} onPress={handlePickImage}>
                <Text style={styles.buttonText}>Choisir une image</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmitPic}
            >
                <Text style={styles.buttonText}>Envoyer</Text>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color:"white"
    },
    imagePreview: {
        width: 150,
        height: 150,
        marginBottom: 20,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: "#ccc",
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: "#28a745",
    },
});
