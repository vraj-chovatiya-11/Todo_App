const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/auth', require('./src/api/routes/authRoutes'));
app.use('/api/todos', require('./src/api/routes/todoRoutes'));

app.get("/", (req, res) => {
  res.send({ message: "API running..." });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Application is running on ${PORT}`));
