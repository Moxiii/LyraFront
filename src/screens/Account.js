import React, {useEffect, useState} from "react";
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
import {Platform} from "react-native";
import {useUserData} from "../../utils/Context/UserContext";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

export default function Account() {
    const navigation = useNavigation()
    const { setUserData } = useUserData();
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
    useEffect(() => {
        if (file) {
            console.log("file:", file);
        }
    }, [file]);
    const handleSubmitPic = async () => {
        if (!file) {
            Alert.alert("Erreur", "Veuillez sélectionner un fichier.");
            return;
        }
        try {

            const response = await uploadProfilePic(file ,setUserData);
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
            <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <Ionicons
                    name="arrow-back"
                    size={30}
                    color="white"
                    style={styles.backIcon}
                />
            </TouchableOpacity>
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
