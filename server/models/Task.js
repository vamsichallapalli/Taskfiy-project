const db = require('../config/database');

class Task {
  static async getAll() {
    const query = `
      SELECT * FROM tasks 
      ORDER BY created_at DESC
    `;
    const { rows } = await db.query(query);
    return rows;
  }

  static async getById(id) {
    const query = `
      SELECT * FROM tasks 
      WHERE id = $1
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async create(task) {
    const query = `
      INSERT INTO tasks (title, description, due_date, priority, status, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *
    `;
    const values = [
      task.title,
      task.description,
      task.dueDate,
      task.priority,
      task.status
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async update(id, task) {
    const query = `
      UPDATE tasks 
      SET title = $1, description = $2, due_date = $3, priority = $4, status = $5
      WHERE id = $6
      RETURNING *
    `;
    const values = [
      task.title,
      task.description,
      task.dueDate,
      task.priority,
      task.status,
      id
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async delete(id) {
    const query = `
      DELETE FROM tasks 
      WHERE id = $1
      RETURNING *
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}