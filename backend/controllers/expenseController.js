const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
  const expense = await Expense.create({
    ...req.body,
    userId: req.user
  });

  res.json(expense);
};

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find({
    userId: req.user
  });

  res.json(expenses);
};

exports.deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};