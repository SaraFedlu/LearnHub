// backend/server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const adminRoutes = require('./routes/admin');

// Connect to the database
const connectDB = require('./db');
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Admin routes
app.use('/api/admin', adminRoutes);

// User authentication routes
app.use('/api/users', authRoutes);

// Quiz routes
app.use('/api/quizzes', quizRoutes);

// Test route
app.get('/', (req, res) => res.send('Server is running'));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));