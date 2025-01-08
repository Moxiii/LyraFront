import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
} from "react-native";
import { uploadProfilePic } from "../../utils/Fetchs/userFetchs";
import { launchImageLibrary } from "react-native-image-picker";

export default function Account() {
    const [file, setFile] = useState(null);
    const [previewUri, setPreviewUri] = useState(null);

    // Fonction pour choisir une image
    const handlePickImage = async () => {
        const result = await launchImageLibrary({
            mediaType: "photo",
            includeBase64 : false,
            quality : 1
        });
            if (result.didCancel) {
                Alert.alert("Opération annulée", "Aucune image sélectionnée.");
            } else if (result.errorCode) {
                Alert.alert("Erreur", "Erreur lors de la sélection de l'image.");
            } else {

                const selectedFile = result.assets[0];
                try {
                    const response = await fetch(selectedFile.uri);
                    const blob = await response.blob();
                    setFile({
                        uri: selectedFile.uri,
                        blob: blob,
                        name: selectedFile.fileName || "profile-pic.jpg",
                        type: selectedFile.type || "image/jpeg"
                    });
                    setPreviewUri(selectedFile.uri);
                } catch (error) {
                    console.error("Erreur lors de la récupération du Blob :", error);
                    Alert.alert("Erreur", "Une erreur est survenue lors de la sélection de l'image.");
                }
            }
    };
    const handleSubmitPic = async () => {
        if (!file) {
            Alert.alert("Erreur", "Veuillez sélectionner un fichier.");
            return;
        }
        try {

            const formData = new FormData();
            formData.append('file', {
                blob:file.blob
            });
            const response = await uploadProfilePic(formData);
            if (response.ok) {
                Alert.alert("Succès", "Image uploadée avec succès!");
            } else {
                Alert.alert("Erreur", "Échec de l'envoi de l'image.");
            }
        } catch (error) {
            Alert.alert("Erreur", "Une erreur est survenue lors de l'envoi.");
            console.error("Erreur :", error);
        }
    };

    return (
        <View style={styles.container}>
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
