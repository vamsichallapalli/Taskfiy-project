import React from 'react';
import { Filter, ListFilter, Flag } from 'lucide-react';

export default function TaskFilter({ status, priority, onStatusChange, onPriorityChange }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-6">
        <Filter className="w-6 h-6 text-indigo-500" />
        <div className="flex-1 grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="status" className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <ListFilter className="w-5 h-5" />
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="mt-2 block w-full px-4 py-3 rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-200"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Flag className="w-5 h-5" />
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => onPriorityChange(e.target.value)}
              className="mt-2 block w-full px-4 py-3 rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-200"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}