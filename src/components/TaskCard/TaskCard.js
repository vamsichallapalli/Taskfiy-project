import React from 'react';
import { CheckCircle2, Clock, Trash2, AlertCircle } from 'lucide-react';
import { formatDate, isOverdue } from '../../utils/dateUtils';

export default function TaskCard({ task, onUpdateTask, onDeleteTask }) {
  const getPriorityStyles = (priority) => {
    const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    switch (priority) {
      case 'high':
        return `${baseStyles} bg-red-100 text-red-800`;
      case 'medium':
        return `${baseStyles} bg-yellow-100 text-yellow-800`;
      case 'low':
        return `${baseStyles} bg-green-100 text-green-800`;
      default:
        return `${baseStyles} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 transform transition-all duration-200 hover:shadow-xl ${
        task.status === 'completed' ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 
              className={`text-xl font-bold ${
                task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>
            <span className={getPriorityStyles(task.priority)}>
              {task.priority}
            </span>
          </div>
          
          <p className="text-gray-600 text-base mb-4">{task.description}</p>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {formatDate(task.dueDate)}
            </span>
            
            {!task.status === 'completed' && isOverdue(task.dueDate) && (
              <span className="flex items-center text-sm text-red-500">
                <AlertCircle className="w-4 h-4 mr-1" />
                Overdue
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              onUpdateTask({
                ...task,
                status: task.status === 'completed' ? 'pending' : 'completed',
              })
            }
            className={`p-2 rounded-full transition-colors duration-200 ${
              task.status === 'completed'
                ? 'text-green-500 hover:bg-green-50'
                : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <CheckCircle2 className="w-6 h-6" />
          </button>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="p-2 text-red-500 rounded-full hover:bg-red-50 transition-colors duration-200"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}