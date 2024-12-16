const validateTask = (task) => {
  const errors = [];

  if (!task.title || task.title.trim() === '') {
    errors.push('Title is required');
  }

  if (!task.dueDate) {
    errors.push('Due date is required');
  }

  if (!['low', 'medium', 'high'].includes(task.priority)) {
    errors.push('Invalid priority level');
  }

  if (!['pending', 'completed'].includes(task.status)) {
    errors.push('Invalid status');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateTask
};