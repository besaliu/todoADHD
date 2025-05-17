import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import uuid from "react-native-uuid";
import { useTaskContext } from "../context/TaskContext";
import { addTaskStyles as styles } from '../styles/components';
import { requestNotificationsPermissions, scheduleTaskNotifications } from "../utils/notifications";
import { RecurrencePattern, Task } from "../utils/types";

const PRIORITIES: Task["priority"][] = ["low", "medium", "high"];
const RECURRENCE_OPTIONS: RecurrencePattern[] = ["none", "daily", "weekly", "monthly"];

type AddTaskProps = {
  onClose: () => void;
  spaceId: string;
};

const AddTask = ({ onClose, spaceId }: AddTaskProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [dueDate, setDueDate] = useState<Date>(() => {
    const now = new Date();
    // Round to the nearest hour
    now.setMinutes(0, 0, 0);
    now.setHours(now.getHours() + 1);
    return now;
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [recurrence, setRecurrence] = useState<RecurrencePattern>("none");
  const { addTask } = useTaskContext();

  useEffect(() => {
    requestNotificationsPermissions();
  }, []);

  const handleAdd = async () => {
    if (!title.trim() || !spaceId) return;

    // Validate that the due date is not in the past
    if (dueDate < new Date()) {
      Alert.alert(
        "Invalid Date",
        "Due date cannot be in the past. Please select a future date and time.",
        [{ text: "OK" }]
      );
      return;
    }

    const newTask: Task = {
      id: uuid.v4().toString(),
      title,
      completed: false,
      priority,
      dueDate: dueDate.toISOString(),
      spaceId,
      recurrence,
      notificationsEnabled,
      nextNotification: undefined,
    };

    addTask(newTask);

    if (notificationsEnabled) {
      await scheduleTaskNotifications(newTask);
    }

    setTitle("");
    setPriority("medium");
    setDueDate(new Date());
    setRecurrence("none");
    setNotificationsEnabled(true);
    onClose();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      const newDate = new Date(dueDate);
      newDate.setFullYear(selectedDate.getFullYear());
      newDate.setMonth(selectedDate.getMonth());
      newDate.setDate(selectedDate.getDate());
      setDueDate(newDate);

      // On Android, show time picker after date is selected
      if (Platform.OS === 'android') {
        setTimeout(() => setShowTimePicker(true), 500);
      }
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }

    if (selectedTime) {
      const newDate = new Date(dueDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDueDate(newDate);
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: 'numeric',
      minute: '2-digit',
    });
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

      <Text style={styles.label}>Due Date</Text>
      <View style={styles.dueDateContainer}>
        <TouchableOpacity 
          style={[styles.dueDateButton]} 
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dueDateButtonText}>
            📅 {formatDate(dueDate)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.dueDateButton]} 
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.dueDateButtonText}>
            ⏰ {formatTime(dueDate)}
          </Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={dueDate}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

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


      <View style={styles.notificationContainer}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: "#767577", true: "#E2D1F9" }}
          thumbColor={notificationsEnabled ? "#5a189a" : "#f4f3f4"}
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: "#BAE1FF" }]} 
          onPress={handleAdd}
        >
          <Text style={styles.actionText}>Add Task</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: "#FF6B6B" }]} 
          onPress={onClose}
        >
          <Text style={styles.actionText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTask;
