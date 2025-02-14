require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const connectDB = require("../utils/db");
const authRoutes = require("../routes/auth");

const app = express();

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/.netlify/functions/api/auth", authRoutes);

module.exports.handler = serverless(app);
