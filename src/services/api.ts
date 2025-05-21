import axios, { AxiosError } from "axios";
import type { Todo, CreateTodoInput, UpdateTodoInput } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Todos API
export const todosAPI = {
  getAll: async (): Promise<Todo[]> => {
    try {
      const response = await api.get("/todos");
      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
  },

  getById: async (id: number): Promise<Todo | null> => {
    try {
      const response = await api.get(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching todo ${id}:`, error);
      if (error instanceof AxiosError && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  create: async (todo: CreateTodoInput): Promise<Todo | null> => {
    try {
      const response = await api.post("/todos", todo);
      return response.data;
    } catch (error) {
      console.error("Error creating todo:", error);
      if (error instanceof AxiosError && error.response?.status === 400) {
        throw new Error("Invalid todo data. Please check your input.");
      }
      throw new Error("Failed to create todo. Please try again.");
    }
  },

  update: async (id: number, todo: UpdateTodoInput): Promise<Todo | null> => {
    try {
      const response = await api.patch(`/todos/${id}`, todo);
      return response.data;
    } catch (error) {
      console.error(`Error updating todo ${id}:`, error);
      if (error instanceof AxiosError && error.response?.status === 404) {
        throw new Error("Todo not found.");
      }
      throw new Error("Failed to update todo. Please try again.");
    }
  },

  delete: async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/todos/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting todo ${id}:`, error);
      if (error instanceof AxiosError && error.response?.status === 404) {
        throw new Error("Todo not found.");
      }
      throw new Error("Failed to delete todo. Please try again.");
    }
  },
};

export default api;
