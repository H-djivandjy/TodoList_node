const userRoute = require('express').Router();
const userController = require('../../controllers/user');
const {checkIsAuth} = require("../../config/jwtConfig");

module.exports = (app) => {
    userRoute.get('/users',  userController.getAll)
    userRoute.get('/user/:uuid', userController.getById)
    userRoute.post('/user',checkIsAuth, userController.create)
    userRoute.put('/user/:uuid',checkIsAuth, userController.update)
    userRoute.delete('/user/:uuid', checkIsAuth, userController.delete)
    // app.use('/api/v1', userRoute)
    app.use(userRoute)
}