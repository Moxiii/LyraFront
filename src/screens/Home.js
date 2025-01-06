import React ,{useEffect , useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {fetchWithAuth} from "../../utils/Fetchs/fetchWithAuth";
import {fetchUserData} from "../../utils/Fetchs/userFetchs";
import {fetchUserTodo} from "../../utils/Fetchs/todoFetchs";
import {fetchUserProject} from "../../utils/Fetchs/projetFetch";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const backgroundImage = require("../../assets/img/Splash.jpg"); // Background Image
  const invisibleGeorgesImage = require("../../assets/img/georgesinvisible.png");
  const CEO = require("../../assets/img/marting.png");

  const navigation = useNavigation();
  const route = useRoute();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const [projects, setProjects]=useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [todos, setTodos]=useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showTitles, setShowTitles] = useState(true);
  const [showTasks, setShowTasks] = useState(false);
  const linkToChat = () => {
    navigation.navigate("Conversations");
  };
  const linkToSettings = () => {
    navigation.navigate("Settings");
  };
  useEffect(() => {
    const getUserData =async () =>{
      try{
        const userData = await fetchUserData();
        console.log(userData)
        setUsername(userData.username);
        setBio(userData.description);
      }catch (error){
        console.error("Failed to fetch user " ,error);
      }
    }
    getUserData();
  }, []);
  const data2 = {
    labels: [
      "Work",
      "Personnal",
      "Wishlist",
      "Pas de catégories",
      "Birthday",
      "Business",
    ],
    datasets: [
      {
        cutout: "80%",
        label: "# of Votes",
        data: [20, 10, 10, 10, 10, 10],
        backgroundColor: [
          "#FFFFFF",
          "#777E99",
          "#404040",
          "#9E9E9E",
          "#A1A1C1",
          "#EAEAEA",
        ],
      },
    ],
  };
  useEffect(() => {
    const getUserTodo =async ()=>{
      try {
        const userTodo = await fetchUserTodo();
        setTodos(userTodo)
      }catch (error){
        console.error("Failed to fetch user todo" ,error)
      }
    }
    getUserTodo();
  }, []);
  useEffect(() => {
    const getUserProject =async ()=>{
      try {
        const userProject = await fetchUserProject();
        setProjects(userProject)
      }catch (error){
        console.error("Failed to fetch user Project" ,error)
      }
    }
    getUserProject();
  }, []);
const toggleView = () =>{
  setShowTitles(!showTitles);
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
          <Text style={styles.username}>@{username}</Text>
          <Text style={styles.bio}>{bio}</Text>
        </View>
        <TouchableOpacity
          style={styles.icon}
          onPress={linkToSettings}
        >
          <Ionicons name="settings" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.chatcard} onPress={linkToChat}>
          <Image source={invisibleGeorgesImage} style={styles.chatGeorgesImg} />
          <Text style={styles.georgesmessage}>
            Bonjour {username}, n’hésite pas à venir me voir au besoin !
          </Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <View style={styles.card}>
            {showTitles ? (
                <>
                  <Text style={styles.cardTitle}>To do :</Text>
                  {todos.map((todo) => (
                      <TouchableOpacity
                          key={todo.id}
                          onPress={() => {
                            setSelectedTodo(todo);
                            setShowTitles(false); // Bascule vers l'affichage des tâches
                          }}
                          style={styles.card}
                      >
                        <Text style={styles.cardTitle}>{todo.title}</Text>
                      </TouchableOpacity>
                  ))}
                </>
            ) : (
                // Affichage des tâches de la To-Do sélectionnée
                selectedTodo && (
                    <View>
                      {/* Titre de la To-Do avec un onPress pour revenir à la liste */}
                      <TouchableOpacity onPress={() => {
                        setShowTitles(true); // Revient à l'affichage des To-Dos
                        setSelectedTodo(null); // Réinitialise la To-Do sélectionnée
                      }}>
                        <Text style={styles.cardTitle}>{selectedTodo.title}</Text>
                      </TouchableOpacity>
                      {selectedTodo.task.map((task) => (
                          <Text key={task.id} style={styles.cardContent}>
                            • {task.description} {task.completed ? '✅' : '❌'}
                          </Text>
                      ))}
                    </View>
                )
            )}
          </View>
          <View style={styles.card}>
            {showTitles ? (
                <>
                  <Text style={styles.cardTitle}>Vos projets :</Text>
                  {projects.map((projet) => (
                      <TouchableOpacity
                          key={projet.id}
                          onPress={() => {
                            setSelectedProject(projet);
                            setShowTitles(false);
                          }}
                          style={styles.card}
                      >
                        <Text style={styles.cardTitle}>{projet.name}</Text>
                      </TouchableOpacity>
                  ))}
                </>
            ) : (
                selectedProject && (
                    <View>

                      <TouchableOpacity
                          onPress={() => {
                            setShowTitles(true);
                            setSelectedProject(null);
                          }}
                      >
                        <Text style={styles.cardTitle}>{selectedProject.name}</Text>
                      </TouchableOpacity>

                      {/* Description du projet */}
                      <Text style={styles.cardContent}>{selectedProject.description}</Text>

                      {/* Liens associés au projet */}
                      <Text style={styles.cardSubtitle}>Liens:</Text>
                      {selectedProject.links.map((link, index) => (
                          <Text key={index} style={styles.cardContent}>
                            • {link}
                          </Text>
                      ))}

                      {/* Utilisateurs associés au projet */}
                      <Text style={styles.cardSubtitle}>Utilisateurs:</Text>
                      {selectedProject.users.map((user, index) => (
                          <Text key={index} style={styles.cardContent}>
                            • {user}
                          </Text>
                      ))}
                    </View>
                )
            )}
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

                  color: "white",
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
    fontSize: 15,
    marginTop: 30,
    marginBottom: 20,
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
    padding: 10,
  },
  row: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
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
  georgesTitle: {
    color: "#fff",
    fontSize: 17,
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
