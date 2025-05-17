import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage keys
export const SPACES_STORAGE_KEY = "@taskapp_spaces";
export const SELECTED_SPACE_KEY = "@taskapp_selected_space";
export const TASKS_STORAGE_KEY = "@taskapp_tasks";

// Generic function to store data
export const storeData = async (key: string, value: any): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error(`Error storing data for key ${key}:`, error);
    return false;
  }
};

// Generic function to retrieve data
export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error retrieving data for key ${key}:`, error);
    return null;
  }
};

// Function to remove data
export const removeData = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing data for key ${key}:`, error);
    return false;
  }
};

// Function to clear all app data (useful for debugging or reset functionality)
export const clearAllData = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing all data:", error);
    return false;
  }
};