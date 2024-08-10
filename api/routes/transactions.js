const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, updateTransaction, deleteTransaction } = require('../data/transactions');

router.post('/', (req, res) => {
    const { amount, date, category, description } = req.body;
    if (!req.session.user) return res.status(401).send('Unauthorized');
    const newTransaction = { id: getTransactions().length + 1, amount, date, category, description, userEmail: req.session.user.email };
    addTransaction(newTransaction);
    res.status(201).send('Transaction added successfully');
});

router.get('/', (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    const userTransactions = getTransactions().filter(tx => tx.userEmail === req.session.user.email);
    res.json(userTransactions);
});

router.put('/:id', (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    const { id } = req.params;
    const { amount, date, category, description } = req.body;
    let transaction = getTransactions().find(tx => tx.id === parseInt(id) && tx.userEmail === req.session.user.email);
    if (!transaction) return res.status(404).send('Transaction not found');
    const updatedTransaction = { ...transaction, amount, date, category, description };
    updateTransaction(parseInt(id), updatedTransaction);
    res.send('Transaction updated successfully');
});

router.delete('/:id', (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    const { id } = req.params;
    deleteTransaction(parseInt(id));
    res.send('Transaction deleted successfully');
});

module.exports = router;
