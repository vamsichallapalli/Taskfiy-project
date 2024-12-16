const { Pool } = require('pg');

const pool = new Pool({
  // These values should be replaced with your actual database configuration
  user: 'postgres',
  host: 'localhost',
  database: 'taskify',
  password: 'infodba',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};