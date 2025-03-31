require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Redis = require("ioredis");
const User = require("./userModel");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const redis = new Redis(); // Redis client initialized here

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Save username and email to DB
app.post("/save", async (req, res) => {
  const { username, email } = req.body;

  try {
    const newUser = new User({ username, email });
    await newUser.save();
    res.status(201).json({ message: "User saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save user" });
  }
});

// Get username and email from DB
app.get("/get/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Get application status
app.get("/status", (req, res) => {
  res.status(200).json({ status: "Application is running" });
});

// Save username and email to cache and DB, and send cache response info
app.post("/cache-save", async (req, res) => {
  const { username, email } = req.body;

  try {
    // Save to MongoDB
    const newUser = new User({ username, email });
    await newUser.save();

    // Save to Redis using ioredis set method
    redis.set(username, JSON.stringify({ username, email }), "EX", 3600); // Set with expiration time (3600 seconds)

    res.status(201).json({
      message: "User saved successfully",
      source: "DB and Cache",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to save user" });
  }
});

// Get user data with cache check
app.get("/get-cache/:username", async (req, res) => {
  const { username } = req.params;

  // Check Redis cache first
  redis.get(username, async (err, cachedData) => {
    if (err) {
      return res.status(500).json({ error: "Redis error" });
    }

    if (cachedData) {
      // Data found in cache
      return res.status(200).json({
        source: "Cache",
        data: JSON.parse(cachedData),
      });
    }

    // If not in cache, get data from DB
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Save user in cache for future requests
      redis.set(username, JSON.stringify(user), "EX", 3600); // Save user in cache with expiration time

      res.status(200).json({
        source: "DB",
        data: user,
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
