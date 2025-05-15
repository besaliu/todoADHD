import React, { createContext, useContext, useState } from "react";
import { Space } from "../types";
import uuid from "react-native-uuid"; // Assuming you've switched to react-native-uuid

interface SpaceContextType {
  spaces: Space[];
  selectedSpace: Space | null;
  setSelectedSpace: (space: Space) => void;
  addSpace: (name: string) => void;
  deleteSpace: (id: string) => void; // Added this method
}

const SpaceContext = createContext<SpaceContextType | undefined>(undefined);

export const SpaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [spaces, setSpaces] = useState<Space[]>([
    
  ]);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

  const addSpace = (name: string) => {
    const newSpace = { id: uuid.v4().toString(), name };
    setSpaces((prev) => [...prev, newSpace]);
  };

  // Add the delete space functionality
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
      setSelectedSpace, 
      addSpace,
      deleteSpace // Add the new method to the context
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