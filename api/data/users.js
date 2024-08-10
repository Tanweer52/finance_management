// let users = []; // In-memory user storage

// const getUsers = () => users;

// const addUser = (user) => {
//     users.push(user);
// };

// const findUserByEmail = (email) => users.find(user => user.email === email);

// module.exports = {
//     getUsers,
//     addUser,
//     findUserByEmail,
// };

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'users.json');

const readData = () => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const getUsers = () => readData();

const addUser = (user) => {
    const users = readData();
    users.push(user);
    writeData(users);
};

const findUserByEmail = (email) => {
    const users = readData();
    return users.find(user => user.email === email);
};

module.exports = {
    getUsers,
    addUser,
    findUserByEmail,
};
