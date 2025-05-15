import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList,
  Alert 
} from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useSpaceContext } from "../context/SpaceContext";

type SpaceListProps = {
  onAddNew?: () => void;
};

const SpaceList = ({ onAddNew }: SpaceListProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { spaces, setSelectedSpace, deleteSpace } = useSpaceContext();

  const confirmDelete = (spaceId: string, spaceName: string) => {
    Alert.alert(
      "Delete Space",
      `Are you sure you want to delete "${spaceName}"? All tasks in this space will also be deleted.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteSpace(spaceId) }
      ]
    );
  };

  return (
    <FlatList
      data={spaces}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={styles.spaceCard}>
          <TouchableOpacity
            style={styles.spaceButton}
            onPress={() => {
              setSelectedSpace(item);
              navigation.navigate("Space");
            }}
          >
            <Text style={styles.spaceText}>{item.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => confirmDelete(item.id, item.name)}
          >
            <Text style={styles.deleteText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No spaces added yet. Create your first space!</Text>
          {onAddNew && (
            <TouchableOpacity 
              style={styles.emptyAddButton}
              onPress={onAddNew}
            >
              <Text style={styles.emptyAddText}>Create Space</Text>
            </TouchableOpacity>
          )}
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 20,
  },
  spaceCard: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  spaceButton: {
    flex: 1,
    padding: 16,
    backgroundColor: "#e0aaff",
    borderRadius: 12,
  },
  spaceText: {
    fontSize: 18,
    color: "#3c096c",
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: "#FF6B6B",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
    marginBottom: 20,
  },
  emptyAddButton: {
    backgroundColor: "#CDB4DB",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  emptyAddText: {
    color: "#3c096c",
    fontWeight: "700",
    fontSize: 16,
  }
});

export default SpaceList;