const cors = require("cors")
const express = require("express")
const dotenv = require("dotenv")
const path = require("path")

dotenv.config({ path: path.resolve(__dirname, '.env')})
require('./app/models/user')
require('./app/models/todoList')
require('./app/models/todoItem')
// require('./app/models/')
const sequelize = require("./app/config/db");

const app = express()

app.use(cors({
    origin: '*',
    method: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT']
}))

// encodade de l'url
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// require('./app/routes')(app)
const userRoutes = require('./app/routes/user');
const todoListRoutes = require('./app/routes/todoList');
const todoItemRoutes = require('./app/routes/todoItem');
const authRoutes = require('./app/routes/auth');

app.use(userRoutes);
app.use(todoListRoutes);
app.use(todoItemRoutes);
app.use(authRoutes);


app.get('/', (req, res) => {
    return res.status(200).send('Hello world')
})

app.use((req, res) => {
    return res.status(404).send('Not found')
})

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, async (err) => {
    if(err){
        console.log('Error in server setup')
    }
    else {
        console.log(`Server running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
        // update table if exist without delete
        //await sequelize.sync({ alter: true });
        // drop and create table
        // await sequelize.sync({ force: true });
        // create table if not exist
    //    await sequelize.sync();
    }
})

