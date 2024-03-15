const express = require('express');
const router = express.Router();
const todoItemController = require('../../controllers/todoItem');
const {checkIsAuth} = require("../../config/jwtConfig");


module.exports = (app) => {
    router.get('/todos', todoItemController.getAllTodoItems);
    router.get('/todo/:id', todoItemController.getTodoItemById);
    router.post('/todo', checkIsAuth, todoItemController.createTodoItem);
    router.put('/todo/:id', checkIsAuth, todoItemController.updateTodoItem);
    router.delete('/todo/:id', checkIsAuth, todoItemController.deleteTodoItem);
    // app.use('/api/v1', authRoute)
    app.use(router)
}