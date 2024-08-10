const express = require('express');
const router = express.Router();
const { getGoals, addGoal, updateGoal, deleteGoal } = require('../data/goals');

router.post('/', (req, res) => {
    const { targetAmount, targetDate } = req.body;
    if (!req.session.user) return res.status(401).send('Unauthorized');
    const newGoal = { id: getGoals().length + 1, targetAmount, targetDate, userEmail: req.session.user.email };
    addGoal(newGoal);
    res.status(201).send('Goal added successfully');
});

router.get('/', (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    const userGoals = getGoals().filter(goal => goal.userEmail === req.session.user.email);
    res.json(userGoals);
});

router.put('/:id', (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    const { id } = req.params;
    const { targetAmount, targetDate } = req.body;
    let goal = getGoals().find(g => g.id === parseInt(id) && g.userEmail === req.session.user.email);
    if (!goal) return res.status(404).send('Goal not found');
    const updatedGoal = { ...goal, targetAmount, targetDate };
    updateGoal(parseInt(id), updatedGoal);
    res.send('Goal updated successfully');
});

router.delete('/:id', (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    const { id } = req.params;
    deleteGoal(parseInt(id));
    res.send('Goal deleted successfully');
});

module.exports = router;
