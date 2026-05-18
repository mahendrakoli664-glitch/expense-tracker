require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Expense Routes
app.use('/api/expense', require('./routes/expenseRoutes'));

// Auth Routes  ← ye missing tha
app.use('/api/auth', require('./routes/authRoutes'));

app.listen(5000, () => {
  console.log('Server running on 5000');
});