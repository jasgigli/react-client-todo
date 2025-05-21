import { useState } from "react";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

const TodoItem = ({
  todo,
  onToggleComplete,
  onDelete,
  onEdit,
}: TodoItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleComplete = async () => {
    setIsToggling(true);
    try {
      await onToggleComplete(todo.id, !todo.completed);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(todo.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm hover:shadow-md transition-shadow ${
        isDeleting ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="relative">
            {isToggling && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-indigo-600 border-r-transparent"></div>
              </div>
            )}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleComplete}
              disabled={isToggling}
              className={`h-5 w-5 mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${
                isToggling ? "opacity-0" : ""
              }`}
            />
          </div>
          <div className="flex-1">
            <h3
              className={`text-lg font-medium ${
                todo.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p
                className={`mt-1 text-sm ${
                  todo.completed ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {todo.description}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-400">
              <span>Created: {new Date(todo.createdAt).toLocaleString()}</span>
              <span>•</span>
              <span>Updated: {new Date(todo.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(todo)}
            disabled={isDeleting || isToggling}
            className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting || isToggling}
            className="text-sm px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded disabled:opacity-50 min-w-[80px] text-center"
          >
            {isDeleting ? (
              <span className="flex items-center justify-center">
                <div className="h-3 w-3 mr-1 animate-spin rounded-full border-2 border-solid border-red-600 border-r-transparent"></div>
                Deleting
              </span>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
