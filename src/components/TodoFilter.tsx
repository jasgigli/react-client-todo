interface TodoFilterProps {
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

const TodoFilter = ({ filter, onFilterChange }: TodoFilterProps) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 text-sm font-medium rounded-md ${
          filter === 'all'
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
        }`}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange('active')}
        className={`px-4 py-2 text-sm font-medium rounded-md ${
          filter === 'active'
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
        }`}
      >
        Active
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        className={`px-4 py-2 text-sm font-medium rounded-md ${
          filter === 'completed'
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default TodoFilter;
