const TodoItem = require('../../models/todoItem');


const getAllTodoItems = async (req, res) => {
    try {
        const todoItems = await TodoItem.findAll();
        res.status(200).json(todoItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTodoItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const todoItem = await TodoItem.findByPk(id);
        if (todoItem) {
            res.status(200).json(todoItem);
        } else {
            res.status(404).json({ message: "TodoItem not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTodoItem = async (req, res) => {
    const { task, completed, todoListId } = req.body;
    try {
        const todoItem = await TodoItem.create({ task, completed, todoListId });
        res.status(201).json(todoItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTodoItem = async (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;
    try {
        const todoItem = await TodoItem.findByPk(id);
        if (todoItem) {
            await todoItem.update({ task, completed });
            res.status(200).json(todoItem);
        } else {
            res.status(404).json({ message: "TodoItem not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deleteTodoItem = async (req, res) => {
    const { id } = req.params;
    try {
        const todoItem = await TodoItem.findByPk(id);
        if (todoItem) {
            await todoItem.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ message: "TodoItem not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTodoItems,
    getTodoItemById,
    createTodoItem,
    updateTodoItem,
    deleteTodoItem
};
