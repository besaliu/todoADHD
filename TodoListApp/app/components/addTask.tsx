import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types";
import uuid from "react-native-uuid";
import DateTimePicker from "@react-native-community/datetimepicker";

const PRIORITIES: Task["priority"][] = ["low", "medium", "high"];

type AddTaskProps = {
  onClose: () => void;
   spaceId: string;
};

const AddTask = ({ onClose, spaceId }: AddTaskProps) => {
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const { addTask } = useTaskContext();

  const handleAdd = () => {
    if (!title.trim() || !spaceId) return; // require spaceId!

    const newTask: Task = {
      id: uuid.v4().toString(),  
      title,
      completed: false,
      priority,
      dueDate: dueDate ? dueDate.toISOString() : undefined,
      spaceId, // <- assign the current spaceId here!
    };

    addTask(newTask);
    setTitle("");
    setPriority("medium");
    setDueDate(null);
    onClose();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter a task..."
        placeholderTextColor="#999"
        style={styles.input}
      />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityContainer}>
        {PRIORITIES.map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => setPriority(p)}
            style={[
              styles.priorityButton,
              priority === p && styles.prioritySelected,
            ]}
          >
            <Text style={priority === p ? styles.prioritySelectedText : styles.priorityText}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateButtonText}>
          {dueDate ? `📅 Due: ${dueDate.toDateString()}` : "Set Due Date"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === "ios");
            if (selectedDate) setDueDate(selectedDate);
          }}
        />
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#BAE1FF" }]} onPress={handleAdd}>
          <Text style={styles.actionText}>Add Task</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#FF6B6B" }]} onPress={onClose}>
          <Text style={styles.actionText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: "#FFF0F6",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2D1F9",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "white",
    color: "#333",
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    fontSize: 14,
    color: "#555",
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#999",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  prioritySelected: {
    backgroundColor: "#CDB4DB",
    borderColor: "#A36FAF",
  },
  priorityText: {
    color: "#444",
    fontWeight: "500",
  },
  prioritySelectedText: {
    color: "white",
    fontWeight: "700",
  },
  dateButton: {
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#E2D1F9",
    marginBottom: 16,
    alignItems: "center",
  },
  dateButtonText: {
    color: "#333",
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});

export default AddTask;
