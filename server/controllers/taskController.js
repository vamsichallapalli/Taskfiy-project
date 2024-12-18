const Task = require('../models/Task');
const { validateTask } = require('../utils/validation');

const taskController = {
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.getAll();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  },

  async getTaskById(req, res) {
    try {
      const task = await Task.getById(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  },

  async createTask(req, res) {
    try {
      const validation = validateTask(req.body);
      console.log(validation,"validations")
      if (!validation.isValid) {
        return res.status(400).json({ errors: validation.errors });
      }

      const task = await Task.create(req.body);
      res.status(201).json(task);
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ error: 'Failed to create task' });
    }
  },

  async updateTask(req, res) {
    try {
      const validation = validateTask(req.body);
      if (!validation.isValid) {
        return res.status(400).json({ errors: validation.errors });
      }

      const task = await Task.update(req.params.id, req.body);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  },

  async deleteTask(req, res) {
    try {
      const task = await Task.delete(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }
};
module.exports = taskController;