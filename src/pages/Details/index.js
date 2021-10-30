import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from './style'
import database from '../../config/firebaseconfig';
import { collection, doc, updateDoc } from 'firebase/firestore/lite';

export default function Details({ navigation, route }) {
    const [descriptionEdit, setDescriptionEdit] = useState(route.params.description);
    const idTask = route.params.id;

    async function editTask(description, id) {
        const TaskRef = doc(database, 'Tasks', id);
        try {
            await updateDoc(TaskRef, {
                description: descriptionEdit
            });
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
                onChangeText={setDescriptionEdit}
                value={descriptionEdit}
            />
            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => editTask(descriptionEdit, idTask)}>
                <Text style={styles.iconButton}>Save</Text>
            </TouchableOpacity>
        </View>
    )
};