const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { connectDB } = require('./config/db');
require("dotenv").config();

// Initialize express app
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Serve static files (for images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);

// Server listen
const PORT = process.env.PORT||5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
