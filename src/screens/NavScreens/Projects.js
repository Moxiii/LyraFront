import React, {useEffect, useState} from "react";
import {
  View,
  ImageBackground,
  Text,
  Alert,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput, Button, Modal
} from "react-native";
import {useUserData} from "../../../utils/Context/UserContext";
import {useProjectContext} from "../../../utils/Context/ProjectContext";
import backgroundImage from "../../../assets/img/Splash.jpg";
import globalStyles from "../../../utils/Styles/global";
import {useNavigation} from "@react-navigation/native";
import Header from "../../Components/Header";


export default function Projects() {
  const {userProjects} = useUserData();
  const { addProjectToContext , deleteProjectToContext , updateProjectToContext } = useProjectContext()
  const navigation = useNavigation()
  const [modalVisible , setModalVisible] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject , setEditingProject] = useState(null)
  const [projectName, setProjectName] = useState("");
  useEffect(() => {
    if(selectedProject){
      const updatedProject = userProjects.find((project)=>project.id === selectedProject.id);
      setSelectedProject(updatedProject)
    }
  }, [userProjects]);
  const handleAddOrUpdateProjects = async () => {
    try {
      if(editingProject){
        const updatedProjects = {
          ...editingProject ,
          name: projectName || editingProject.name,
          description: editingProject.description || "",
          links: editingProject.links || [],
          username: editingProject.username || [],
        }
        await updateProjectToContext(editingProject.id , updatedProjects)
        setEditingProject(null)
      }else{
        const newProject = {
          name: projectName,
          description: "",
          links: [],
          username: [],
        };
        await addProjectToContext(newProject)}
      setProjectName("")
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue.");
    }
  };
  const openModal = (project) => {
    setSelectedProject(project);
    setModalVisible(true);
  }
  const closeModal = () => {
    setSelectedProject()
    setModalVisible(false)
  }
const renderProject = ({ item })=>(
  <View style={styles.projectItemContainer}>
    <TouchableOpacity
        style={styles.projectItem}
        onPress={()=> openModal(item)}
    >
      <View style={styles.projectDetails}>
        <Text style={styles.projectName}>{item.name}</Text>
        <Text style={styles.projectDescription}>{item.description||"pas de description"}</Text>
      </View>
    </TouchableOpacity>
  </View>
)
  return (
      <ImageBackground source={backgroundImage} resizeMode="cover" style={globalStyles.backgroundImage}>
    <View style={globalStyles.container}>
      <Header name={"Projects"}/>
      <TextInput
          placeholder="Nom du projet"
          value={projectName}
          onChangeText={setProjectName}
          style={styles.textInput}
      />
      <Button title={editingProject? "Modifier Project" : "Ajouter Project"} onPress={handleAddOrUpdateProjects} />
      <FlatList
      data={userProjects}
      renderItem={renderProject}
      keyExtractor={(item)=>item.id}
      contentContainerStyle={styles.projectList}
      />

      <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProject && (
                <>
                  <Text style={styles.modalTitle}>{selectedProject.name}</Text>
                  <Text style={styles.modalDescription}>
                    {selectedProject.description || "Pas de description"}
                  </Text>
                </>
            )}
            <Button title="Fermer" onPress={closeModal} />
          </View>
        </View>
      </Modal>

    </View>
      </ImageBackground>
  );
}
const styles = StyleSheet.create({
  projectList: {
    padding: 10,
  },
  projectItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  projectName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  projectDescription: {
    fontSize: 14,
    color: "#ccc",
  },
  textInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
});