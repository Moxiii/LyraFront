import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function Home() {
  const backgroundImage = require("../../assets/img/Splash.jpg");
  const invisibleGeorgesImage = require("../../assets/img/georgesinvisible.png");
  const CEO = require("../../assets/img/marting.png");

  const navigation = useNavigation();
  const route = useRoute();

  console.log(route.name);

  const linkToChat = () => {
    navigation.navigate("Conversation");
  };
  const chartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Couleur des barres
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 1,
    propsForLabels: {
      fontSize: 11, // Taille du texte
      color: "#fff", // Couleur du texte
      fontFamily: "Arial", // Police du texte
    },
    propsForBackgroundLines: {
      stroke: "#ccc",
    },
    propsForVerticalLabels: {
      fontSize: 10,
      color: "#fff", // Couleur du texte vertical
      fontFamily: "Arial", // Police du texte vertical
    },
    propsForHorizontalLabels: {
      fontSize: 10,
      color: "#fff", // Couleur du texte horizontal
      fontFamily: "Arial", // Police du texte horizontal
    },
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };
  const data = {
    labels: ["Travail", "Personnel", "0 catégories"],
    data: [0.2, 0.6, 0.8],
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.container}
      >
        <View style={styles.usercard}>
          <Image source={CEO} style={styles.profilepic} />
          <View style={styles.usertexts}>
            <Text style={styles.username}>@martindvt</Text>
            <Text style={styles.bio}>Incoming CEO of the world.</Text>
          </View>
          <Ionicons name="pencil" size={24} color="white" style={styles.icon} />
        </View>

        <TouchableOpacity style={styles.chatcard} onPress={linkToChat}>
          <Image source={invisibleGeorgesImage} style={styles.chatGeorgesImg} />
          <Text style={styles.georgesmessage}>
            Bonjour Martin, n’hésite pas à venir me voir !
          </Text>
        </TouchableOpacity>

        <View style={styles.organisationcard}>
          <Text style={styles.georgesmessage}>Georges propose:</Text>
          <Text style={styles.suggestion}>- Planifier la réunion de 10h</Text>
          <Text style={styles.suggestion}>- Appeler le fournisseur</Text>
          <Text style={styles.suggestion}>- Vérifier les emails</Text>
        </View>

        <View style={styles.chartcard}>
          <Text style={styles.georgesmessage}>Catégories des TODO:</Text>
          <View
            style={{ alignItems: "center", marginTop: 20, marginRight: 90 }}
          >
            <ProgressChart
              data={data}
              width={410}
              height={221}
              strokeWidth={10}
              radius={22}
              chartConfig={chartConfig}
              hideLegend={false}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  usercard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  profilepic: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  usertexts: {
    marginLeft: 15,
  },
  username: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  bio: {
    color: "#fff",
    marginTop: 5,
  },
  icon: {
    marginLeft: "auto",
    marginRight: 20,
  },
  chatcard: {
    flexDirection: "row",
    backgroundColor: "rgba(105, 105, 105, 0.16)",
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  chatGeorgesImg: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  georgesmessage: {
    color: "#fff",
    flex: 1,
    flexWrap: "wrap",
  },
  organisationcard: {
    backgroundColor: "rgba(105, 105, 105, 0.16)",
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
  },
  suggestion: {
    color: "#fff",
    marginTop: 5,
  },
  chartcard: {
    backgroundColor: "rgba(105, 105, 105, 0.16)",
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  chart: {
    marginTop: 10,
  },
  chartText: {
    color: "#fff",
    textAlign: "center",
  },
});
