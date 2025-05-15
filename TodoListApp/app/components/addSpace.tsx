import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
  Alert
} from "react-native";
import { useSpaceContext } from "../context/SpaceContext";

type AddSpaceProps = {
  onClose: () => void;
};

const AddSpace = ({ onClose }: AddSpaceProps) => {
  const [newSpaceName, setNewSpaceName] = useState("");
  const { addSpace } = useSpaceContext();

  const handleAddSpace = () => {
    if (newSpaceName.trim()) {
      addSpace(newSpaceName);
      setNewSpaceName("");
      onClose();
    } else {
      Alert.alert("Space name cannot be empty");
    }
  };

  return (
    <View style={styles.addSpaceContainer}>
      <TextInput
        style={styles.input}
        value={newSpaceName}
        onChangeText={setNewSpaceName}
        placeholder="Enter space name..."
        placeholderTextColor="#999"
        autoFocus
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: "#BAE1FF" }]} 
          onPress={handleAddSpace}
        >
          <Text style={styles.actionText}>Add Space</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: "#FF6B6B" }]} 
          onPress={() => {
            onClose();
            setNewSpaceName("");
          }}
        >
          <Text style={styles.actionText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  addSpaceContainer: {
    backgroundColor: "#FFF0F6",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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

export default AddSpace;