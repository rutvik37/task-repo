const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./services/cache");
require("./models/Book");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Use MONGO_URL from environment variables, fallback to keys.mongoURI
const MONGO_URI = process.env.MONGO_URL || keys.mongoURI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Default route to check if app is running
app.get("/", (req, res) => {
  res.send("Hello! Your Node.js app is running.");
});

// Import and use bookRoutes
require("./routes/bookRoutes")(app);

// Use PORT from environment variables or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
