// src/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require('./routes/loginRoutes');
const cors = require('cors'); // Import the 'cors' middleware

dotenv.config(); // Automatically loads .env from the root directory

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
app.use(cors());
app.use(express.json());

mongoose.connection.on("error", err => {
  console.error("Error connecting to MongoDB:", err);
});

app.use(express.json());

// Register user routes
app.use("/api/users", userRoutes);
// Register auth routes
app.use('/api/users', loginRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
