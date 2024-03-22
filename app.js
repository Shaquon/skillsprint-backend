const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const ticketRoutes = require("./routes/ticketRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to CodeFreshman Backend");
});

//error handling middleware
// executes if any code in front of it errors out
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.send({ message: error.message || "An unkonwn error occured" });
});

module.exports = app;
