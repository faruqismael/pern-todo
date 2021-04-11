const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const PORT = 6001;

// middleware
app.use(cors());
app.use(express.json());

// routes

// create a todo

app.post("/todos", async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      // "SELECT * FROM todo;"
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM todo;");
    let todos = allTodo.rows;
    res.json(todos);
  } catch (err) {
    console.log(err.message);
  }
});

// get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const singleTodo = await pool.query(
      `SELECT * FROM todo WHERE todo_id = ${req.params.id}`
    );
    res.json(singleTodo.rows);
    console.log(req.params);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    console.log(description);
    const updateTodo = await pool.query(
      `UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *`,
      [description, id]
    );
    res.send(updateTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("deleteTodo");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
