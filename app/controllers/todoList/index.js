const TodoList = require('../../models/todoList');


const getAllTodoLists = async (req, res) => {
    try {
        const todoLists = await TodoList.findAll();
        res.status(200).json(todoLists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getTodoListById = async (req, res) => {
    const { id } = req.params;
    try {
        const todoList = await TodoList.findByPk(id);
        if (todoList) {
            res.status(200).json(todoList);
        } else {
            res.status(404).json({ message: "TodoList not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createTodoList = async (req, res) => {
    const { title } = req.body;
    try {
        const todoList = await TodoList.create({ title });
        res.status(201).json(todoList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const updateTodoList = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const todoList = await TodoList.findByPk(id);
        if (todoList) {
            await todoList.update({ title });
            res.status(200).json(todoList);
        } else {
            res.status(404).json({ message: "TodoList not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deleteTodoList = async (req, res) => {
    const { id } = req.params;
    try {
        const todoList = await TodoList.findByPk(id);
        if (todoList) {
            await todoList.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ message: "TodoList not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllTodoLists,
    getTodoListById,
    createTodoList,
    updateTodoList,
    deleteTodoList
};
