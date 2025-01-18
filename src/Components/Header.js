
import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";

const Header = ({name}) => {
    const navigation = useNavigation()
  return (
          <View style={styles.container}>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                  <Ionicons name="arrow-back" size={30} color="white" style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.headerText}>{name}</Text>
          </View>

  )
};
export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#282828",
        alignItems: "center",
        justifyContent: "space-between",
    },
    backIcon: {
        marginTop: "10%",
    },
    headerText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
    },
})
export default Header;
