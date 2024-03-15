const express = require('express');
const router = express.Router();
const {checkIsAuth} = require("../../config/jwtConfig");
const todoListController = require('../../controllers/todoList');


module.exports = (app) => {
    router.get('/lists', todoListController.getAllTodoLists);
    router.get('/list/:id', todoListController.getTodoListById);
    router.post('/list', checkIsAuth ,todoListController.createTodoList);
    router.put('/list/:id',checkIsAuth ,todoListController.updateTodoList);
    router.delete('/list/:id', checkIsAuth, todoListController.deleteTodoList);
    // app.use('/api/v1', authRoute)
    app.use(router)
}
