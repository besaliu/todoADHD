import React, { createContext, useContext, useEffect, useState } from "react";
import { cancelTaskNotifications, getNextRecurrence, scheduleTaskNotifications } from "../utils/notifications";
import { getData, storeData, TASKS_STORAGE_KEY } from "../utils/storage";
import { Task } from "../utils/types";
import { useSpaceContext } from "./SpaceContext";

interface TaskContextType {
  tasks: Task[];
  allTasks: Task[];
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  deleteTasksBySpaceId: (spaceId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// No need to define storage keys here as they're imported from storage.ts

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { selectedSpace } = useSpaceContext();

  const tasks = allTasks.filter(task => task.spaceId === selectedSpace?.id);

  // Load tasks from AsyncStorage when component mounts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await getData<Task[]>(TASKS_STORAGE_KEY);
        if (storedTasks) {
          setAllTasks(storedTasks);
        }
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load tasks from storage", error);
        setIsLoaded(true);
      }
    };

    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      storeData(TASKS_STORAGE_KEY, allTasks);
    }
  }, [allTasks, isLoaded]);

  const addTask = (task: Task) => {
    setAllTasks((prev) => [...prev, task]);
  };

  const toggleTask = async (id: string) => {
    setAllTasks((prev) => {
      const newTasks = prev.map((task) => {
        if (task.id === id) {
          // If task is completed and has recurrence, create next occurrence
          if (!task.completed && task.recurrence !== 'none') {
            const currentDueDate = task.dueDate ? new Date(task.dueDate) : new Date();
            const nextDueDate = getNextRecurrence(currentDueDate, task.recurrence);
            
            if (nextDueDate) {
              const nextTask: Task = {
                ...task,
                id: Math.random().toString(),
                dueDate: nextDueDate.toISOString(),
                completed: false,
              };
              
              // Schedule notifications for the new task
              if (nextTask.notificationsEnabled) {
                scheduleTaskNotifications(nextTask);
              }
              
              // Add the new task
              setAllTasks(tasks => [...tasks, nextTask]);
            }
          }
          
          // Cancel notifications for the completed task
          if (!task.completed && task.notificationsEnabled) {
            cancelTaskNotifications(task.id);
          }
          
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      return newTasks;
    });
  };

  const deleteTask = async (id: string) => {
    const task = allTasks.find(t => t.id === id);
    if (task?.notificationsEnabled) {
      await cancelTaskNotifications(id);
    }
    setAllTasks((prev) => prev.filter((task) => task.id !== id));
  };
  
  // Delete all tasks associated with a space
  const deleteTasksBySpaceId = async (spaceId: string) => {
    const tasksToDelete = allTasks.filter(task => task.spaceId === spaceId);
    for (const task of tasksToDelete) {
      if (task.notificationsEnabled) {
        await cancelTaskNotifications(task.id);
      }
    }
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