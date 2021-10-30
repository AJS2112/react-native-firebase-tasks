import React, { useState, useEffect } from "react";
import {
    SafeAreaView, View, Text, TouchableOpacity, FlatList
} from "react-native";
import database from "../../config/firebaseconfig";
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore/lite';
import { FontAwesome } from "@expo/vector-icons";
import styles from "./style";

export default function Task({ navigation }) {
    const [tasks, setTasks] = useState([]);

    async function deleteTask(id) {
        console.log('lets delete');
        try {
            await deleteDoc(doc(database, 'Tasks', id));
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        async function getTasks(database) {
            let lista = []
            const tasksCol = collection(database, 'Tasks');
            try {
                const taskSnapshot = await getDocs(tasksCol);
                //const taskList = taskSnapshot.docs.map(doc => doc.data());
                taskSnapshot.docs.forEach((doc) => {
                    lista.push({ ...doc.data(), id: doc.id })
                })
                setTasks(lista);
                return lista;
            } catch (err) {
                return [];
            }
        }
        getTasks(database);
        //console.log({ tasks })
    }, [tasks]);

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={tasks}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.Tasks}>
                            <TouchableOpacity
                                style={styles.deleteTask}
                                onPress={() => { deleteTask(item.id) }}>
                                <FontAwesome
                                    name="star"
                                    size={23}
                                    color="#F92e6A"
                                >

                                </FontAwesome>
                            </TouchableOpacity>
                            <Text
                                style={styles.DescriptionTask}
                                onPress={() => {
                                    navigation.navigate("Details", {
                                        id: item.id,
                                        description: item.description
                                    })
                                }}
                            >{item.description}</Text>
                        </View>
                    )
                }}
            />
            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => navigation.navigate("NewTask")}>
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>
        </View>
    )
};