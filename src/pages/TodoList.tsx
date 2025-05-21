import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todosAPI } from "../services/api";
import { Todo, CreateTodoInput, UpdateTodoInput } from "../types";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";
import TodoFilter from "../components/TodoFilter";

const TodoList = () => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const queryClient = useQueryClient();

  // Fetch todos
  const {
    data: todos = [],
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: todosAPI.getAll,
    retry: 1,
    staleTime: 30000, // 30 seconds
  });

  // Refetch on component mount to ensure fresh data
  useEffect(() => {
    refetch();
  }, [refetch]);

  // State for mutation errors
  const [mutationError, setMutationError] = useState<string | null>(null);

  // Create todo mutation
  const createTodoMutation = useMutation({
    mutationFn: todosAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setMutationError(null);
    },
    onError: (error: Error) => {
      setMutationError(`Failed to create todo: ${error.message}`);
      console.error("Create todo error:", error);
    },
  });

  // Update todo mutation
  const updateTodoMutation = useMutation({
    mutationFn: ({ id, todo }: { id: number; todo: UpdateTodoInput }) =>
      todosAPI.update(id, todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setEditingTodo(null);
      setMutationError(null);
    },
    onError: (error: Error) => {
      setMutationError(`Failed to update todo: ${error.message}`);
      console.error("Update todo error:", error);
    },
  });

  // Delete todo mutation
  const deleteTodoMutation = useMutation({
    mutationFn: todosAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setMutationError(null);
    },
    onError: (error: Error) => {
      setMutationError(`Failed to delete todo: ${error.message}`);
      console.error("Delete todo error:", error);
    },
  });

  // Handle create todo
  const handleCreateTodo = async (values: CreateTodoInput) => {
    await createTodoMutation.mutateAsync(values);
  };

  // Handle update todo
  const handleUpdateTodo = async (values: UpdateTodoInput) => {
    if (editingTodo) {
      await updateTodoMutation.mutateAsync({
        id: editingTodo.id,
        todo: values,
      });
    }
  };

  // Handle toggle complete
  const handleToggleComplete = async (id: number, completed: boolean) => {
    await updateTodoMutation.mutateAsync({ id, todo: { completed } });
  };

  // Handle delete todo
  const handleDeleteTodo = async (id: number) => {
    await deleteTodoMutation.mutateAsync(id);
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingTodo ? "Edit Todo" : "Add New Todo"}
        </h2>

        {mutationError && (
          <div
            className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {mutationError}</span>
            <button
              onClick={() => setMutationError(null)}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <span className="sr-only">Dismiss</span>
              <svg
                className="h-6 w-6 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        <TodoForm
          onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
          initialValues={editingTodo || undefined}
          onCancel={editingTodo ? () => setEditingTodo(null) : undefined}
          isEditing={!!editingTodo}
        />
      </div>

      <div className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Todos</h2>
          <TodoFilter filter={filter} onFilterChange={setFilter} />
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading todos...</p>
          </div>
        ) : isError ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">
              {" "}
              Failed to load todos. Please try again.
            </span>
            <button
              onClick={() => refetch()}
              className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Retry
            </button>
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">
              {filter === "all"
                ? "No todos yet. Create one above!"
                : filter === "active"
                ? "No active todos."
                : "No completed todos."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTodo}
                onEdit={setEditingTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
