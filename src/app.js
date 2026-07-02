const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("passport");
const rateLimit = require("express-rate-limit");
const connectDB = require("@config/db");

// Load environment variables
require("dotenv").config();

// Initialize Passport configuration
require("@config/passport");

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// Rate limiting — 200 req / 15 min per IP on public API; stricter on auth routes
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts, please try again later." },
});

// Middleware
app.use(express.json({ limit: "2mb" }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(publicLimiter);       // applies to all routes
app.use("/auth/", authLimiter); // stricter limit on login/register

// Initialize Passport
app.use(passport.initialize());

// Routes
const routes = require('./routes');
routes(app);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Something went wrong.";
  res.status(status).json({ status: false, message });
});

module.exports = app;