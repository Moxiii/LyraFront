import {StyleSheet} from "react-native";
//Todo refactor all styles to found redundant styles and apply them with globalStyles
const globalStyles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    root: {
        flex: 1,
        justifyContent: "center",
        fontFamily: "Poppins",
    },
    profilepic: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    username: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    bio: {
        color: "#fff",
        marginTop: 3,
    },
    cardTitle: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 5,
    },
    cardContent: {
        fontSize: 14,
        color: "#fff",
        paddingLeft: 10,
        marginBottom: 3,
    },
    organisationcard: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
        width: "100%",
    },
    background: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "column",
    },
    backIcon: {
        marginTop: "20%",
        marginLeft: "10%",
    },
});
export default globalStyles