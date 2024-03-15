module.exports = (app) => {
    require('./user')(app)
    require('./auth')(app)
    require('./todoList')(app)
    require('./todoItem')(app)
}