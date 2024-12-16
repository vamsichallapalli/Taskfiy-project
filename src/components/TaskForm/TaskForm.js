import React, { useState } from 'react';
import { PlusCircle, Calendar, Flag } from 'lucide-react';

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      dueDate,
      priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    onSubmit(newTask);
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Task</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="text-base font-semibold text-gray-900">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-2 block w-full px-4 py-3 rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-200"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label htmlFor="description" className="text-base font-semibold text-gray-900">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-2 block w-full px-4 py-3 rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-200"
            placeholder="Enter task description"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="dueDate" className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-3 rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-200"
            />
          </div>

          <div>
            <label htmlFor="priority" className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Flag className="w-5 h-5" />
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-2 block w-full px-4 py-3 rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-6 py-4 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <PlusCircle className="w-6 h-6 mr-2" />
          Create Task
        </button>
      </div>
    </form>
  );
}