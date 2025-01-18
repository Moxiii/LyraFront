import React, {useState} from "react";
import {View, ImageBackground, Text, Alert, TouchableOpacity} from "react-native";
import {useUserData} from "../../../utils/Context/UserContext";
import {useProjectContext} from "../../../utils/Context/ProjectContext";
import backgroundImage from "../../../assets/img/Splash.jpg";
import globalStyles from "../../../utils/Styles/global";
import {useNavigation} from "@react-navigation/native";
import Header from "../../Components/Header";


export default function Projects() {
  const {userProject} = useUserData();
  const { addProjectToContext , deleteProjectToContext , updateProjectToContext } = useProjectContext()
  const navigation = useNavigation()
  const [modalVisible , setModalVisible] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject , setEditingProject] = useState(null)
  const [projectTitle, setProjectTitle] = useState("");

  const handleAddOrUpdateProjects = async () => {
    try {
      if(editingProject){
        const updatedProjects = {...editingProject , title: projectTitle}
        await updateProjectToContext(editingProject.id , updatedProjects)
        setEditingProject(null)
      }else{await addProjectToContext(projectTitle)}
      setProjectTitle("")
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue.");
    }
  };
  const openModal = (project) => {
    setSelectedProject(project)
    setModalVisible(true)
  }
  const closeModal = () => {
    setSelectedProject()
    setModalVisible(false)
  }

  return (
      <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={globalStyles.backgroundImage}
      >
    <View style={globalStyles.container}>
      <Header name={"Projects"}/>
    </View>
      </ImageBackground>
  );
}
