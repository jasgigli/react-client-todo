import type { Todo } from "./types";

// Mock data for testing
export const mockTodos: Todo[] = [
  {
    id: 1,
    title: "Learn React",
    description: "Study React fundamentals and hooks",
    completed: true,
    createdAt: new Date(2023, 0, 15).toISOString(),
    updatedAt: new Date(2023, 0, 20).toISOString(),
  },
  {
    id: 2,
    title: "Build Todo App",
    description: "Create a todo app with React and TypeScript",
    completed: false,
    createdAt: new Date(2023, 1, 5).toISOString(),
    updatedAt: new Date(2023, 1, 5).toISOString(),
  },
  {
    id: 3,
    title: "Learn NestJS",
    description: "Study NestJS for backend development",
    completed: false,
    createdAt: new Date(2023, 1, 10).toISOString(),
    updatedAt: new Date(2023, 1, 10).toISOString(),
  },
];
