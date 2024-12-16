import React, { useState, useEffect } from 'react';
import { CheckSquare } from 'lucide-react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskCard from './components/TaskCard/TaskCard';
import TaskFilter from './components/TaskFilter/TaskFilter';
import { getTasks, saveTask, updateTask, deleteTask } from './utils/localStorage';

function App() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleAddTask = (task) => {
    saveTask(task);
    setTasks(getTasks());
  };

  const handleUpdateTask = (task) => {
    updateTask(task);
    setTasks(getTasks());
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    setTasks(getTasks());
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <CheckSquare className="w-16 h-16 text-indigo-600" />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Taskify</h1>
          <p className="text-xl text-gray-600">Streamline your productivity with elegant task management</p>
        </div>

        <TaskForm onSubmit={handleAddTask} />
        
        <TaskFilter
          status={statusFilter}
          priority={priorityFilter}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
        />

        <div className="space-y-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
          {filteredTasks.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600">Start by creating your first task above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;