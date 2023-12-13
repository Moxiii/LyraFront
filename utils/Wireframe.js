import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Bouton réutilisable
export const GradientButtonThin = ({ label, onPress }) => (
  <View>
    <LinearGradient
      colors={["#040141", "#090979", "#d45a00"]}
      style={styles.linearGradient}
    >
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </LinearGradient>
  </View>
);

// Champ de saisie réutilisable
export const Input = ({ placeholder, value, onChangeText }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
  />
);

// Styles
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: "100%",
    borderRadius: 5, // Ajout d'une bordure pour voir le composant
  },
  touchable: {
    width: "100%",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default styles;
