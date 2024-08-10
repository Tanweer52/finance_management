const express = require('express');
const router = express.Router();
const { getCategories, addCategory, deleteCategory } = require('../data/categories');

router.post('/', (req, res) => {
    const { name } = req.body;
    if (!req.session.user) return res.status(401).send('Unauthorized');
    if (getCategories().find(cat => cat.name === name)) {
        return res.status(400).send('Category already exists');
    }
    const newCategory = { id: getCategories().length + 1, name, userEmail: req.session.user.email };
    addCategory(newCategory);
    res.status(201).send('Category added successfully');
});

router.get('/', (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    const userCategories = getCategories().filter(cat => cat.userEmail === req.session.user.email);
    res.json(userCategories);
});

router.delete('/:id', (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    const { id } = req.params;
    deleteCategory(parseInt(id));
    res.send('Category deleted successfully');
});

module.exports = router;
