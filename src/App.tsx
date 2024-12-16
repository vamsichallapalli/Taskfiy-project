import React, { useState, useEffect } from 'react';
import { CheckSquare } from 'lucide-react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { Task } from './types/task';
import { getTasks, saveTask, updateTask as updateStoredTask, deleteTask as deleteStoredTask } from './utils/localStorage';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleAddTask = (task: Task) => {
    saveTask(task);
    setTasks(getTasks());
  };

  const handleUpdateTask = (task: Task) => {
    updateStoredTask(task);
    setTasks(getTasks());
  };

  const handleDeleteTask = (taskId: string) => {
    deleteStoredTask(taskId);
    setTasks(getTasks());
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CheckSquare className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Taskify</h1>
          <p className="mt-2 text-gray-600">Manage your tasks efficiently</p>
        </div>

        <TaskForm onSubmit={handleAddTask} />
        
        <TaskFilter
          status={statusFilter}
          priority={priorityFilter}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
        />

        <TaskList
          tasks={filteredTasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
}

export default App;