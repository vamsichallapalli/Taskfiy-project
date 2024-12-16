import React from 'react';
import { CheckCircle2, Clock, Trash2 } from 'lucide-react';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white rounded-lg shadow-md p-4 ${
            task.status === 'completed' ? 'opacity-75' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through' : ''}`}>
                {task.title}
              </h3>
              <p className="text-gray-600 mt-1">{task.description}</p>
              <div className="flex items-center mt-2 space-x-4">
                <span className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatDate(task.dueDate)}
                </span>
                <span className={`flex items-center text-sm ${getPriorityColor(task.priority)}`}>
                  Priority: {task.priority}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  onUpdateTask({
                    ...task,
                    status: task.status === 'completed' ? 'pending' : 'completed',
                  })
                }
                className={`p-2 rounded-full ${
                  task.status === 'completed'
                    ? 'text-green-600 hover:bg-green-100'
                    : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-2 text-red-600 rounded-full hover:bg-red-100"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tasks yet. Add your first task above!
        </div>
      )}
    </div>
  );
}