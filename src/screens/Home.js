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
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 10,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForLabels: {
      fontSize: 12,
      color: "#fff",
      fontFamily: "Arial",
    },
    propsForBackgroundLines: {
      stroke: "#ccc",
    },
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
          <Text style={styles.cardTitle}>Georges propose:</Text>
          <Text style={styles.suggestion}>- Planifier la réunion de 10h</Text>
          <Text style={styles.suggestion}>- Appeler le fournisseur</Text>
          <Text style={styles.suggestion}>- Vérifier les emails</Text>
        </View>

        <View style={styles.chartcard}>
          <Text style={styles.cardTitle}>Catégories des TODO:</Text>
          <View style={styles.chartContainer}>
            <ProgressChart
              data={data}
              width={300}
              height={200}
              strokeWidth={16}
              radius={32}
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
    paddingHorizontal: 20,
  },
  usercard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 10,
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
  },
  chatcard: {
    flexDirection: "row",
    backgroundColor: "rgba(105, 105, 105, 0.3)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
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
    backgroundColor: "rgba(105, 105, 105, 0.3)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  suggestion: {
    color: "#fff",
    marginTop: 5,
  },
  chartcard: {
    backgroundColor: "rgba(105, 105, 105, 0.3)",
    padding: 15,
    borderRadius: 10,
  },
  chartContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});
