let categories = []; // In-memory category storage

const getCategories = () => categories;

const addCategory = (category) => {
    categories.push(category);
};

const deleteCategory = (id) => {
    categories = categories.filter(cat => cat.id !== id);
};

module.exports = {
    getCategories,
    addCategory,
    deleteCategory,
};
