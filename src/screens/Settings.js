import React ,{useEffect , useState} from "react";
import {View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const backgroundImage = require("../../assets/img/fondsettings.png");
const martin = require("../../assets/img/marting.png");
import {fetchUserData} from "../../utils/Fetchs/userFetchs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  useEffect(() => {
    const getUserData =async () =>{
     try{
       const userData = await fetchUserData();
       setUsername(userData.username);
       setBio(userData.description);
     }catch (error){
       console.error(error);
     }
    }
    getUserData();
  }, []);
  return (
    <View style={styles.body}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.background}
      >
        <Text style={styles.settings}>Settings</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Ionicons
              name="arrow-back"
              size={30}
              color="white"
              style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Image source={martin} style={styles.pp} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>@{username}</Text>
              <Text style={styles.subtile}>{bio}</Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.iconBackground}>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={24}
                color="black"
                style={styles.icon}
              />
            </View>
            <Text style={styles.itemText}>Chat</Text>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.iconBackground}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="black"
                style={styles.icon}
              />
            </View>
            <Text style={styles.itemText}>Notification</Text>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.iconBackground}>
              <Ionicons
                name="key-outline"
                size={24}
                color="black"
                style={styles.icon}
              />
            </View>
            <Text style={styles.itemText}>Compte</Text>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.iconBackground}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color="black"
                style={styles.icon}
              />
            </View>
            <Text style={styles.itemText}>Aide</Text>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.iconBackground}>
              <Ionicons
                name="people-outline"
                size={24}
                color="black"
                style={styles.icon}
              />
            </View>
            <Text style={styles.itemText}>Invite un ami</Text>
          </View>
          <Text
            style={{
              color: "#3D4A7A",
              marginBottom: 10,
              fontSize: 15,
              marginLeft: "36%",
            }}
          >
            Déconnexion
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#007bff",
  },
  subtile: {
    color: "#797C7B",
  },
  settings: {
    fontSize: 23,
    fontWeight: "semibold",
    color: "white",
    textAlign: "center",
    marginBottom: 40,
  },
  pp: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 10,
  },
  textContainer: {
    marginLeft: 10,
  },

  subtile: {
    color: "#797C7B",
    fontSize: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#D2D2D2",
  },

  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  container: {
    width: "100%",
    height: "85%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 40,
  },
  iconBackground: {
    opacity: "70%",
    backgroundColor: "#DEEBFF",
    borderRadius: 50,
    padding: 8,
    marginRight: 10,
  },
  icon: {
    color: "#797C7B",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Settings;
