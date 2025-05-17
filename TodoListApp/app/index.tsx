import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./utils/types"; // adjust path
import LandingScreen from "./screens/LandingScreen";
import DashboardScreen from "./screens/SpaceScreen";
import { SpaceProvider } from "./context/SpaceContext";
import { TaskProvider } from "./context/TaskContext";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SpaceProvider>
      <TaskProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Space" component={DashboardScreen} />
          </Stack.Navigator>
      </TaskProvider>
    </SpaceProvider>
  );
}
