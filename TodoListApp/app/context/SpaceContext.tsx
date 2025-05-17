import React, { createContext, useContext, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { getData, SELECTED_SPACE_KEY, SPACES_STORAGE_KEY, storeData } from "../utils/storage";
import { Space } from "../utils/types";

interface SpaceContextType {
  spaces: Space[];
  selectedSpace: Space | null;
  setSelectedSpace: (space: Space) => void;
  addSpace: (name: string, imageUri?: string) => void;
  deleteSpace: (id: string) => void;
  updateSpaceImage: (id: string, imageUri: string) => void;
  // No need to expose the Task deletion functionality directly
}

const SpaceContext = createContext<SpaceContextType | undefined>(undefined);

// No need to define storage keys here as they're imported from storage.ts

export const SpaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // We'll handle the task delete in SpaceScreen to avoid circular dependencies

  // Load spaces from AsyncStorage when component mounts
  useEffect(() => {
    const loadSpaces = async () => {
      try {
        // Load spaces
        const storedSpaces = await getData<Space[]>(SPACES_STORAGE_KEY);
        if (storedSpaces) {
          setSpaces(storedSpaces);
        }

        // Load selected space
        const storedSelectedSpace = await getData<Space>(SELECTED_SPACE_KEY);
        if (storedSelectedSpace) {
          setSelectedSpace(storedSelectedSpace);
        }
        
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load spaces from storage", error);
        setIsLoaded(true);
      }
    };

    loadSpaces();
  }, []);

  // Save spaces to AsyncStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      storeData(SPACES_STORAGE_KEY, spaces);
    }
  }, [spaces, isLoaded]);

  // Save selected space to AsyncStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      if (selectedSpace) {
        storeData(SELECTED_SPACE_KEY, selectedSpace);
      } else {
        import("../utils/storage").then(storage => {
          storage.removeData(SELECTED_SPACE_KEY);
        });
      }
    }
  }, [selectedSpace, isLoaded]);

  const handleSetSelectedSpace = (space: Space) => {
    setSelectedSpace(space);
  };

  const addSpace = (name: string, imageUri?: string) => {
    const newSpace = { id: uuid.v4().toString(), name, imageUri };
    setSpaces((prev) => [...prev, newSpace]);
  };

  const updateSpaceImage = (id: string, imageUri: string) => {
    setSpaces((prev) =>
      prev.map((space) =>
        space.id === id ? { ...space, imageUri } : space
      )
    );
    
    // If this is the selected space, update it too
    if (selectedSpace?.id === id) {
      setSelectedSpace({ ...selectedSpace, imageUri });
    }
  };

  const deleteSpace = (id: string) => {
    setSpaces((prev) => prev.filter((space) => space.id !== id));
    
    // If the deleted space was selected, reset selectedSpace to null
    if (selectedSpace && selectedSpace.id === id) {
      setSelectedSpace(null);
    }
  };

  return (
    <SpaceContext.Provider value={{ 
      spaces, 
      selectedSpace, 
      setSelectedSpace: handleSetSelectedSpace, 
      addSpace,
      deleteSpace,
      updateSpaceImage
    }}>
      {children}
    </SpaceContext.Provider>
  );
};

export const useSpaceContext = () => {
  const context = useContext(SpaceContext);
  if (!context) throw new Error("useSpaceContext must be used within a SpaceProvider");
  return context;
};

export default SpaceProvider;