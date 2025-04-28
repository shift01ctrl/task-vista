
import React, { createContext, useState, useContext, useEffect } from "react";
import { Task } from "@/types/task";
import { useToast } from "@/components/ui/use-toast";

// Helper function to generate a random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Default tasks
const defaultTasks: Task[] = [
  {
    id: generateId(),
    title: "Complete project proposal",
    description: "Write and submit the project proposal for client review.",
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    priority: "high",
    status: "in-progress",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Weekly team meeting",
    description: "Discuss progress and upcoming tasks with the development team.",
    dueDate: new Date(Date.now() + 86400000 * 1).toISOString(), // 1 day from now
    priority: "medium",
    status: "todo",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Update documentation",
    description: "Update the user guide with new feature information.",
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
    priority: "low",
    status: "todo",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Fix login page bug",
    description: "Address the authentication issue on the login page.",
    dueDate: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago (overdue)
    priority: "high",
    status: "todo",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Client presentation",
    description: "Prepare slides and demo for the client presentation.",
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    priority: "high",
    status: "todo",
    createdAt: new Date().toISOString(),
  },
];

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  getTaskById: (taskId: string) => Task | undefined;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const { toast } = useToast();

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Failed to parse stored tasks", error);
        // Fallback to default tasks if parsing fails
        setTasks(defaultTasks);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast({
      title: "Task added",
      description: `"${task.title}" has been added to your tasks.`,
    });
  };

  const updateTask = (taskId: string, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    });
  };

  const deleteTask = (taskId: string) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    
    if (taskToDelete) {
      toast({
        title: "Task deleted",
        description: `"${taskToDelete.title}" has been removed.`,
        variant: "destructive",
      });
    }
  };

  const getTaskById = (taskId: string) => {
    return tasks.find((task) => task.id === taskId);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, getTaskById }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
