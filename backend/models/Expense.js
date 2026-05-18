const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  type: String,
  date: String
});

module.exports = mongoose.model('Expense', expenseSchema);