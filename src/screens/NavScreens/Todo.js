import React, {useEffect, useState} from "react";
import { View, Text, Alert, TextInput, Button, TouchableOpacity, StyleSheet , ImageBackground } from "react-native";
import { useUserData } from "../../../utils/Context/UserContext";
import {useTodoContext} from "../../../utils/Context/TodoContext"
import globalStyles from "../../../utils/Styles/global";
import {theme} from "../../../utils/Styles/theme"

const backgroundImage = require("../../../assets/img/Splash.jpg");
export default function Todo() {

    const {addTodoToContext , addTaskToTodoToContext , deleteTaskToTodoToContext , deleteTodoToContext , updateTodoTaskToContext,updateTodoToContext} = useTodoContext()
    const { userTodos} = useUserData();
    const [todoTitle, setTodoTitle] = useState("");
    const [showTitles, setShowTitles] = useState(true);
    const [taskDescription , setTaskDescription] = useState("");
    const [taskContent, setTaskContent] = useState("");
    const [taskCompleted, setTaskCompleted] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [tasks , setTasks] = useState([null]);
    const [editingTodo , setEditingTodo] = useState(null)
    const [editingTask , setEditingTask] = useState(null)

    useEffect(() => {
        if(selectedTodo){
            const updatedTodo = userTodos.find((todo)=>todo.id === selectedTodo.id);
            setSelectedTodo(updatedTodo)
        }
    }, [userTodos]);
    const handleAddOrUpdateTodo = async () => {
        try {
            if(editingTodo){
                const updatedTodo = {...editingTodo , title: todoTitle}
                await updateTodoToContext(editingTodo.id , updatedTodo)
                setEditingTask(null)
                setEditingTodo(null)
                setTaskDescription("")
                setTaskContent("")
            }else{await addTodoToContext(todoTitle)}
           setTodoTitle("")
        } catch (error) {
            Alert.alert("Erreur", "Une erreur est survenue.");
        }
    };
const handleEditTodo = (todo) =>{
    setEditingTodo(todo)
    setTodoTitle(todo.title)
}
    const handleAddOrUpdateTaskToTodo = async () => {
        if (!taskDescription) {
            return Alert.alert("Erreur", "La description est requise.");
        }

        if (!selectedTodo) {
            return Alert.alert("Erreur", "Aucune todo sélectionnée.");
        }

        const newTask = { description: taskDescription, content: taskContent, completed: false };

        try {
            if(editingTask){
                await updateTodoTaskToContext(selectedTodo.id , editingTask.id , {
                    description: taskDescription,
                    content: taskContent,
                })
                setEditingTask(null)
            }else{await addTaskToTodoToContext(selectedTodo.id, newTask);}
            setTaskDescription("");
            setTaskContent("");
            Alert.alert("Succès", "Tâche ajoutée.");
        } catch (error) {
            Alert.alert("Erreur", "Impossible d'ajouter la tâche.");
        }
    };
const handleEditTask =  (task) =>{
    setEditingTask(task);
    setTaskDescription(task.description)
    setTaskContent(task.content)
}

    const handleDeleteTodo = async (todoID) => {
        try {
            await deleteTodoToContext(todoID);
            const updatedTodo = userTodos.find((todo) => todo.id === selectedTodo.id);
            setSelectedTodo(updatedTodo);
            Alert.alert("Succès", "La todo a été supprimée.");
        } catch (error) {
            Alert.alert("Erreur", "Impossible de supprimer la todo.");
        }
    };

    const handleDeleteTaskToTodo = async (todoId, taskId) => {
        try {
            await deleteTaskToTodoToContext(todoId,taskId);
            Alert.alert("Succès", "La tâche a été supprimée.");
        } catch (error) {
            Alert.alert("Erreur", "Impossible de supprimer la tâche.");
        }
    };


    return (
        <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            style={styles.root}
        >
        <View style={{ padding: 20 }}>
            <Text style={styles.text}>Hello from Todo</Text>
            <TextInput
                placeholder="Titre de la todo"
                value={todoTitle}
                onChangeText={setTodoTitle}
                style={styles.textInput}
            />
            <Button title={editingTodo? "Modifier Todo" : "Ajouter Todo"} onPress={handleAddOrUpdateTodo} />
            {showTitles ? (
                <>
                    <Text style={styles.cardTitle}>To do :</Text>
                    {userTodos?.map((todo) => (
                        <View key={todo.id}>
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedTodo(todo);
                                    setShowTitles(false);
                                }}
                                style={styles.card}
                            >
                                <Text style={styles.cardTitle}>{todo.title}</Text>
                                <Button
                                title="modifier"
                                onPress={()=> handleEditTodo(todo)}
                                color="blue"
                            />
                                <Button
                                    title="supprimer"
                                    onPress={()=> handleDeleteTodo(todo.id)}
                                    color="red"
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </>
            ) : (
                selectedTodo && (
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setShowTitles(true);
                                setSelectedTodo(null);
                            }}
                        >
                            <Text style={styles.cardTitle}>{selectedTodo.title}</Text>
                        </TouchableOpacity>
                        <TextInput
                            placeholder="Description de la tâche"
                            value={taskDescription}
                            onChangeText={setTaskDescription}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder="Contenu de la tâche"
                            value={taskContent}
                            onChangeText={setTaskContent}
                            style={styles.textInput}
                        />
                        <Button title={editingTask? "Modifier tache" : "Ajouter Tache" } onPress={handleAddOrUpdateTaskToTodo} />
                        {Array.isArray(selectedTodo.tasks) && selectedTodo.tasks?.length > 0 ? (
                            selectedTodo.tasks.map((task) => (
                                <View key={task.id}>
                                <Text  style={styles.cardContent}>
                                    • {task.description} {task.completed ? "✅" : "❌"}
                                </Text>
                                <Button
                                    title="modifier"
                                    onPress={()=> handleEditTask(task)}
                                    color="blue"
                                />
                                    <Button
                                    title="supprimer"
                                    onPress={()=> handleDeleteTaskToTodo(selectedTodo.id , task.id)}
                                    color="red"
                                />


                                </View>
                            ))
                        ) : (
                            <Text>Aucune tâche</Text>
                        )}
                    </View>
                )
            )}
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    textInput:{
        borderWidth:1,
        marginVertical: 10,
        padding: 8 ,
        color: "white" ,
        borderColor:"white",
    },
    text:{
        color:theme.colors.text,
        fontSize:theme.fontSize.normal
    },
    card: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#f9f9f9",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color:theme.colors.text,
    },
    cardContent: {
        color:"white",
        fontSize: 16,
        paddingLeft: 10,
    },
});
