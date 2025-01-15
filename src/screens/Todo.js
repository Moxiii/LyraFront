import React, { useState } from "react";
import { View, Text, Alert, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useUserData } from "../../utils/Context/UserContext";
import {useTodoContext} from "../../utils/Context/TodoContext"

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

    const handleAddTodo = async () => {
        try {
            await addTodoToContext(todoTitle)
           setTodoTitle("")
        } catch (error) {
            Alert.alert("Erreur", "Une erreur est survenue.");
        }
    };


    const handleAddTaskToTodo = async () => {
        if (!taskDescription) {
            return Alert.alert("Erreur", "La description est requise.");
        }

        if (!selectedTodo) {
            return Alert.alert("Erreur", "Aucune todo sélectionnée.");
        }

        const newTask = { description: taskDescription, content: taskContent, completed: false };

        try {
            await addTaskToTodoToContext(selectedTodo.id, newTask);
            setTaskDescription("");
            setTaskContent("");
            Alert.alert("Succès", "Tâche ajoutée.");
        } catch (error) {
            Alert.alert("Erreur", "Impossible d'ajouter la tâche.");
        }
    };
    const handleUpdateTodo = async (todoID) =>{
        try{
         await updateTodoToContext(todoID)
        }catch (error) {
            Alert.alert("Erreur", "Impossible de supprimer la todo.");
        }
    }
    const handleDeleteTodo = async (todoID) => {
        try {
            await deleteTodoToContext(todoID);
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
        <View style={{ padding: 20 }}>
            <Text>Hello from Todo</Text>
            <TextInput
                placeholder="Titre de la todo"
                value={todoTitle}
                onChangeText={setTodoTitle}
                style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
            />
            <Button title="Ajouter Todo" onPress={handleAddTodo} />
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
                            style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
                        />
                        <TextInput
                            placeholder="Contenu de la tâche"
                            value={taskContent}
                            onChangeText={setTaskContent}
                            style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
                        />
                        <Button title="Ajouter Tâche" onPress={handleAddTaskToTodo} />
                        {selectedTodo.task?.length > 0 ? (
                            selectedTodo.task.map((task) => (
                                <View key={task.id}>
                                <Text  style={styles.cardContent}>
                                    • {task.description} {task.completed ? "✅" : "❌"}
                                </Text>
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
    );
}

const styles = StyleSheet.create({
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
    },
    cardContent: {
        fontSize: 16,
        paddingLeft: 10,
    },
});
