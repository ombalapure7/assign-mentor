const express = require("express");
const app = express();
require("dotenv").config();
require("./db/connection");

// Routes
const mentors = require("./routes/mentors");
const students = require("./routes/students");

// Database connection
const connectDb = require("./db/connection");
// Port no.
const PORT = process.env.PORT || 5000;
// JSON body parser
app.use(express.json());

/* =============================================== */
/* Home page */
/* =============================================== */
app.get("/", (req, res) => {
  res.send(`
      <h1>Mentor and Students API</h1>
      <dl style="font-size: 20px;">
        <dt><b>Mentor API Endpoints</b></dt>
        <dd><b>Get students under a mentor:</b> /api/v1/students/:id (GET)</dd>
        <dd><b>Create a mentor:</b> /api/v1/mentors (POST)</dd>
        <dd><b>Assign a student from a mentor:</b> /api/v1/mentors/assign/:id (PATCH)</dd>
        <dd><b>Unassing a student from a mentor:</b> /api/v1/mentors/unassign/:id (PATCH)</dd>

        <dt><b>Student API Endpoints</b></dt>
        <dd><b>Get a student:</b> /api/v1/students/:id (GET)</dd>
        <dd><b>Create a student:</b> /api/v1/students/:id (POST)</dd>
        <dd><b>Assign a student to a mentor:</b> /api/v1/students/assign/:id (PATCH)</dd>
      </dl>
    `);
});

/* =============================================== */
/* Mentor and Student API Endpoints */
/* =============================================== */
app.use("/api/v1/mentors", mentors);
app.use("/api/v1/students", students);

/* =============================================== */
/* Server */
/* =============================================== */
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server listening on port ${PORT}...`));
  } catch (errror) {
    console.log("DB CONNECTION FAILED :(", errror);
  }
};

// Start the server only if the database is up and running
start();
