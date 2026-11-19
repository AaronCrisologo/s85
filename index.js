const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Port Number
const port = process.env.PORT || 4000;

// Server
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);

// Monitor the status of the db connection
let db = mongoose.connection;

db.on("error", () => console.error("Connection to the db failed"));
db.once("open", () => console.log("Now connected to MongoDB Atlas."));

// Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`API is now online on port ${port}`);
  });
}

module.exports = { app, mongoose };