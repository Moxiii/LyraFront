import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const backgroundImage = require("../../assets/img/Splash.jpg"); // Background Image
  const invisibleGeorgesImage = require("../../assets/img/georgesinvisible.png");
  const CEO = require("../../assets/img/marting.png");

  const navigation = useNavigation();
  const route = useRoute();

  console.log(route.name);

  const linkToChat = () => {
    navigation.navigate("Conversation");
  };

  const data2 = {
    labels: ["Work", "Personnal", "Wishlist", "Pas de catégories","Birthday","Business"],
    datasets: [
      {
        cutout:'80%',
        label: "# of Votes",
        data: [20, 10, 10, 10, 10,10],
        backgroundColor: ["#FFFFFF", "#777E99", "#404040", "#9E9E9E","#A1A1C1","#EAEAEA"],
      },
    ],
  };

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.root}
    >
      <View style={styles.header}>
        <Image source={CEO} style={styles.profilepic} />
        <View style={styles.usertexts}>
          <Text style={styles.username}>@martindvt</Text>
          <Text style={styles.bio}>CEO of Georges</Text>
        </View>

        <Ionicons name="pencil" size={24} color="white" style={styles.icon} />
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.chatcard} onPress={linkToChat}>
          <Image source={invisibleGeorgesImage} style={styles.chatGeorgesImg} />
          <Text style={styles.georgesmessage}>
            Bonjour Martin, n’hésite pas à venir me voir au besoin !
          </Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>To do :</Text>
            <Text style={styles.cardContent}>• Lessive</Text>
            <Text style={styles.cardContent}>• Vaisselle</Text>
            <Text style={styles.cardContent}>• Les ongles 💅</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Vos projets :</Text>
            <Text style={styles.cardContent}>• Wive</Text>
          </View>
        </View>

        <View style={styles.organisationcard}>
          <Text style={styles.georgesTitle}>Georges propose :</Text>
          <Text style={styles.suggestion}>
            Ajouter votre billet pour l'opening night de Wive à votre Wallet.
          </Text>
          <View style={styles.proposeActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="checkmark" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.chartcard}>
  <View style={styles.chartContainer}>
    <View style={styles.chartWrapper}>
      <Doughnut
        data={data2}
        options={{  
          maintainAspectRatio: false,
          cutoutPercentage: 90, 
          
          color:"white",
          plugins: {
            legend: {
              position: "right",
              labels: {
                usePointStyle: true, 
              },
            },
          },
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
        }}
      />
    </View>
  </View>


        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    fontFamily: "Poppins",
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 20,
    width: "100%",
  },
  profilepic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  usertexts: {
    marginLeft: 10,
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
  icon: {
    marginLeft: "auto",
  },
  chatcard: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    width: "100%",
  },
  chatGeorgesImg: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  georgesmessage: {
    color: "#fff",
    flex: 1,
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardContent: {
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
  georgesTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  suggestion: {
    color: "#fff",
    marginBottom: 5,
  },
  proposeActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  actionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  chartcard: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  chartContainer: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  chartWrapper: {
    width: "100%",
    alignItems: "center",
  },
});
