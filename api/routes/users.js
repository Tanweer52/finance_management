const express = require('express');
const router = express.Router();
const { getUsers, addUser, findUserByEmail } = require('../data/users');

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (findUserByEmail(email)) {
        return res.status(400).send('User already exists');
    }
    const newUser = { name, email, password };
    addUser(newUser);
    res.status(201).send('User registered successfully');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
        return res.status(401).send('Invalid credentials');
    }
    req.session.user = user;
    res.send('Login successful');
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Logout failed');
        res.send('Logout successful');
    });
});

// router.get('/', (req, res) => {
//     if (!req.session.user) return res.status(401).send('Unauthorized');
//     const users = getUsers();
//     res.json(users);
// });

module.exports = router;
