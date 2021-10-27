import React, { useState, useEffect } from "react";
import {
    SafeAreaView, View, Text, TouchableOpacity, FlatList
} from "react-native";
import database from "../../config/firebaseconfig";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./style";

export default function Task({ navigation }) {
    const [tasks, setTasks] = useState([]);

    async function getTasks(database) {
        const tasksCol = collection(db, 'Tasks');
        const taskSnapshot = await getDocs(tasksCol);
        const taskList = taskSnapshot.docs.map(doc => doc.data());
        return taskList;
    }

    useEffect(() => {
        /*database.collection("Tasks").onSnapshot((query) => {
            const list = []
            query.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id })
            })
            setTasks(list)
        })*/
        let list = []
        list = getTasks(database);
        setTasks(list);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList />
            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => navigation.navigate("NewTask")}>
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>
        </View>
    )
};