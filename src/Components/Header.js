
import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";

const Header = ({name}) => {
    const navigation = useNavigation()
  return (
      <SafeAreaView style={styles.wrapper}>
          <View style={styles.container}>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                  <Ionicons name="arrow-back" size={30} color="white" style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.headerText}>{name}</Text>
          </View>
      </SafeAreaView>
  )
};
export const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#282828",
        paddingTop: 50,
    },
    container: {
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#282828",
        alignItems: "center",
        justifyContent: "center",
        position:"absolute",
        top:0,
        width:"100%",
        zIndex:10,
    },
    backIcon: {
        left:2,
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
