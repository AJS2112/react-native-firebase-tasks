import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import database from '../../config/firebaseconfig';
import styles from './style'
import { collection, addDoc } from 'firebase/firestore/lite';
import { NavigationContainer } from "@react-navigation/native";


export default function NewTask({ navigation }) {
    const [description, setDescription] = useState(null);

    async function addTask() {
        try {
            const docRef = await addDoc(collection(database, "Tasks"), {
                description: description,
                status: false
            });
            console.log("Document written with ID: ", docRef.id);
            navigation.navigate("Task");
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.inputText}
                placeholder="estudar"
                onChangeText={setDescription}
                value={description}
            />
            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => addTask()}>
                <Text style={styles.iconButton}>Save</Text>
            </TouchableOpacity>
        </View>
    )
};