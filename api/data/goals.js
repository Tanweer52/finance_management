// let goals = []; // In-memory goal storage

// const getGoals = () => goals;

// const addGoal = (goal) => {
//     goals.push(goal);
// };

// const updateGoal = (id, updatedGoal) => {
//     goals = goals.map(goal => goal.id === id ? updatedGoal : goal);
// };

// const deleteGoal = (id) => {
//     goals = goals.filter(goal => goal.id !== id);
// };

// module.exports = {
//     getGoals,
//     addGoal,
//     updateGoal,
//     deleteGoal,
// };


const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'goals.json');

const readData = () => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const getGoals = () => readData();

const addGoal = (goal) => {
    const goals = readData();
    goals.push(goal);
    writeData(goals);
};

const updateGoal = (id, updatedGoal) => {
    const goals = readData();
    const updatedGoals = goals.map(goal => goal.id === id ? updatedGoal : goal);
    writeData(updatedGoals);
};

const deleteGoal = (id) => {
    const goals = readData();
    const updatedGoals = goals.filter(goal => goal.id !== id);
    writeData(updatedGoals);
};

module.exports = {
    getGoals,
    addGoal,
    updateGoal,
    deleteGoal,
};
