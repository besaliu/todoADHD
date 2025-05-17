import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { Alert, Button, Modal, Text, TouchableOpacity, View } from "react-native";
import AddTask from "../components/addTask";
import TaskList from "../components/TaskList";
import { useSpaceContext } from "../context/SpaceContext";
import { useTaskContext } from "../context/TaskContext";
import { spaceScreenStyles as styles } from '../styles/components';
import { RootStackParamList } from '../utils/types';

export default function SpaceScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [adding, setAdding] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { selectedSpace, deleteSpace, updateSpaceImage } = useSpaceContext();
  const { deleteTasksBySpaceId } = useTaskContext();

  if (!selectedSpace) return null;

  const handleDeleteSpace = () => {
    Alert.alert(
      "Delete Space",
      `Are you sure you want to delete "${selectedSpace.name}"? All tasks in this space will also be deleted.`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            deleteTasksBySpaceId(selectedSpace.id);
            deleteSpace(selectedSpace.id);
            navigation.navigate("Landing");
          } 
        }
      ]
    );
  };

  const handleChangeBackground = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });

    if (!result.canceled) {
      updateSpaceImage(selectedSpace.id, result.assets[0].uri);
    }
    setShowSettings(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{selectedSpace.name} Tasks</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setShowSettings(true)}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {!adding && <Button title="Add Task" onPress={() => setAdding(true)} />}
        {adding && <AddTask onClose={() => setAdding(false)} spaceId={selectedSpace?.id} />}
        <TaskList />
      </View>

      <Modal
        visible={showSettings}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSettings(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Space Settings</Text>
            
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={handleChangeBackground}
            >
              <Text style={styles.modalButtonText}>Change Background Image</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.modalButton, styles.deleteButton]}
              onPress={handleDeleteSpace}
            >
              <Text style={[styles.modalButtonText, styles.deleteText]}>Delete Space</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowSettings(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomButton}>
        <Button title="Back" onPress={() => navigation.navigate("Landing")} />
      </View>
    </View>
  );
}
