import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useSpaceContext } from "../context/SpaceContext";
import AddTask from "../components/addTask";
import TaskList from "../components/TaskList";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

export default function DashboardScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [adding, setAdding] = useState(false);
  const { selectedSpace } = useSpaceContext();

  if (!selectedSpace) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>{selectedSpace.name} Tasks</Text>
        {!adding && <Button title="Add Task" onPress={() => setAdding(true)} />}
        {adding && <AddTask onClose={() => setAdding(false)} spaceId={selectedSpace?.id} />}
        <TaskList />
      </View>
      <View style={styles.bottomButton}>
        <Button title="Back" onPress={() => navigation.navigate("Landing")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fdfbff",
    justifyContent: "space-between", // ensures bottom button sits at the bottom
  },
  content: {
    flex: 1, // takes remaining space above button
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#5a189a",
  },
  bottomButton: {
    marginTop: 20,
  },
});
