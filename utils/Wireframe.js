import * as React from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

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


export const Input = ({ placeholder, value, onChangeText }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
  />
);


const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: "100%",
    borderRadius: 5, 
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
