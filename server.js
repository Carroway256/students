const express = require("express");
const sqlite3 = require("sqlite3").verbose();
var cors = require('cors')
// Create a new Express application
const app = express();
app.use(express.json());
// Create a new SQLite database connection
const db = new sqlite3.Database("mydatabase.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Define routes and middleware here

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.use(cors())
app.get("/createStudendsTable", (req, res) => {
  const createStudentsTableQuery = `
    CREATE TABLE students (
      id INTEGER PRIMARY KEY,
      name TEXT,
      surname TEXT,
      role TEXT
    )
  `;
  db.run(createStudentsTableQuery, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Db set up.");
      res.sendStatus(201);
    }
  });
});

app.get("/students", (req, res) => {
  db.all("SELECT * FROM students", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
});

app.post("/students", (req, res) => {
  const { name, surname, role } = req.body; // Assuming you're using a JSON body parser middleware

  if (!name || !surname || !role) {
    res.status(400).send("Missing required fields");
    return;
  }

  const query = "INSERT INTO students (name, surname, role) VALUES (?, ?, ?)";

  const values = [name, surname, role];

  db.run(query, values, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    } else {
      res.sendStatus(201);
    }
  });
});
