import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View
} from "react-native";
import AddSpace from "../components/addSpace";
import SpaceList from "../components/SpaceList";
import { landingScreenStyles as styles } from "../styles/components";

export default function LandingScreen() {
  const [adding, setAdding] = useState(false);

  if (adding) {
    return <AddSpace onClose={() => setAdding(false)} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Spaces</Text>
      
      <SpaceList />
      
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setAdding(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}