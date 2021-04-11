const Pool = require("pg").Pool;

const pool = new Pool({
  user: "express",
  host: "localhost",
  password: "faruq",
  port: 5432,
  database: "express",
});

module.exports = pool;
