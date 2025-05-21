import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Todo, CreateTodoInput } from "../types";

interface TodoFormProps {
  onSubmit: (values: CreateTodoInput) => Promise<void>;
  initialValues?: Todo;
  onCancel?: () => void;
  isEditing?: boolean;
}

const TodoForm = ({
  onSubmit,
  initialValues,
  onCancel,
  isEditing = false,
}: TodoFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      completed: initialValues?.completed || false,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string(),
      completed: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
        if (!isEditing) {
          formik.resetForm();
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="What needs to be done?"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.title}</div>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Add details about this task..."
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      {isEditing && (
        <div className="flex items-center">
          <input
            id="completed"
            name="completed"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            checked={formik.values.completed}
            onChange={formik.handleChange}
          />
          <label
            htmlFor="completed"
            className="ml-2 block text-sm text-gray-700"
          >
            Mark as completed
          </label>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || !formik.isValid || !formik.dirty}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 min-w-[100px]"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
              Saving...
            </span>
          ) : isEditing ? (
            "Update Todo"
          ) : (
            "Add Todo"
          )}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
