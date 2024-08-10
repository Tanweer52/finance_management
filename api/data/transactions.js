let transactions = []; // In-memory transaction storage

const getTransactions = () => transactions;

const addTransaction = (transaction) => {
    transactions.push(transaction);
};

const updateTransaction = (id, updatedTransaction) => {
    transactions = transactions.map(tx => tx.id === id ? updatedTransaction : tx);
};

const deleteTransaction = (id) => {
    transactions = transactions.filter(tx => tx.id !== id);
};

module.exports = {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
};
