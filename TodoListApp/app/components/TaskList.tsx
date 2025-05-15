import React from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTaskContext } from "../context/TaskContext";

const TaskList = () => {
  const { tasks, toggleTask, deleteTask } = useTaskContext();

  if (tasks.length === 0) {
    return <Text style={styles.emptyText}>No tasks added yet ✨</Text>;
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 20 }}
      renderItem={({ item }) => (
        <View style={styles.taskCard}>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.taskTitle,
                item.completed && styles.completedText,
              ]}
            >
              {item.title}
            </Text>
            {item.dueDate && (
              <Text style={styles.dueDate}>
                Due: {new Date(item.dueDate).toDateString()}
              </Text>
            )}
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={() => toggleTask(item.id)}
              style={[
                styles.actionButton,
                { backgroundColor: item.completed ? "#FFB6C1" : "#BAE1FF" },
              ]}
            >
              <Text style={styles.buttonText}>
                {item.completed ? "Undo" : "Done"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => deleteTask(item.id)}
              style={[styles.actionButton, { backgroundColor: "#FF6B6B" }]}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
  taskCard: {
    backgroundColor: "#FFF0F6",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  dueDate: {
    fontSize: 12,
    color: "#A36FAF",
    marginTop: 4,
  },
  buttonGroup: {
    flexDirection: "row",
    marginLeft: 10,
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default TaskList;
