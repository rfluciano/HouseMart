const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Create a new transaction
router.post('/transactions', transactionController.createTransaction);

// Get all transactions
router.get('/transactions', transactionController.getAllTransactions);

// Get a single transaction by ID
router.get('/transactions/:id', transactionController.getTransactionById);

// Update a transaction by ID
router.put('/transactions/:id', transactionController.updateTransaction);

// Delete a transaction by ID
router.delete('/transactions/:id', transactionController.deleteTransaction);

module.exports = router;
