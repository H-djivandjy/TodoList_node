const authRoute = require('express').Router()
const authController = require('../../controllers/auth');

module.exports = (app) => {
    authRoute.post('/sign-in', authController.signIn)
    authRoute.post('/sign-up', authController.signUp)
    // app.use('/api/v1', authRoute)
    app.use(authRoute)
}