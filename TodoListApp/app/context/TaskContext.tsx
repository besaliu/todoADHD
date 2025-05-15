import React, { createContext, useContext, useState } from "react";
import { Task } from "../types";
import { useSpaceContext } from "./SpaceContext";

interface TaskContextType {
  tasks: Task[];
  allTasks: Task[]; // Add access to all tasks
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  deleteTasksBySpaceId: (spaceId: string) => void; // Add method to delete all tasks in a space
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const { selectedSpace } = useSpaceContext();

  const tasks = allTasks.filter(task => task.spaceId === selectedSpace?.id);

  const addTask = (task: Task) => {
    setAllTasks((prev) => [...prev, task]);
  };

  const toggleTask = (id: string) => {
    setAllTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const deleteTask = (id: string) => {
    setAllTasks((prev) => prev.filter((task) => task.id !== id));
  };
  
  // Add method to delete all tasks associated with a space
  const deleteTasksBySpaceId = (spaceId: string) => {
    setAllTasks((prev) => prev.filter((task) => task.spaceId !== spaceId));
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      allTasks, 
      addTask, 
      toggleTask, 
      deleteTask,
      deleteTasksBySpaceId 
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTaskContext must be used within a TaskProvider");
  return context;
};