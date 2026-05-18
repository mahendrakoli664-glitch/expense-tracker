const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get all
router.get('/', async (req, res) => {
  const data = await Expense.find();
  res.json(data);
});

// Add
router.post('/', async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const expense = new Expense(req.body);
    await expense.save();

    console.log("Saved:", expense);

    res.status(201).json(expense);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Update
router.put('/:id', async (req, res) => {
  await Expense.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Updated' });
});

module.exports = router;