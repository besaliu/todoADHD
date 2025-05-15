import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Button
} from "react-native";
import AddSpace from "../components/addSpace";
import SpaceList from "../components/SpaceList";

export default function LandingScreen() {
  const [adding, setAdding] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Spaces</Text>
      
      {!adding ? (
        <Button 
          title="Add New Space" 
          onPress={() => setAdding(true)} 
          color="#5a189a"
        />
      ) : (
        <AddSpace onClose={() => setAdding(false)} />
      )}
      
      <SpaceList onAddNew={!adding ? () => setAdding(true) : undefined} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 60,
    backgroundColor: "#fdfbff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#5a189a",
  }
});