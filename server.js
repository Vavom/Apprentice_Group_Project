const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const {ProjectBoard, User, Task, sequelize} = require('./models')


const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.get('/taskHistory', async(req, res) => {
    const tasks = await Task.findAll({where: {status: "history"}})
    console.log(tasks)
    res.render('taskHistory', {tasks})
})
app.get('/projectboards', async(req, res) => {
    const projectboards = await ProjectBoard.findAll({
        include : [
            {model: Task , as: 'tasks'}
        ]
    })
    res.render('projectboards', {projectboards})
})

app.get('/projectboards/:id', async(req, res) => {
    const projectboard = await ProjectBoard.findByPk(req.params.id)
    const tasks = await projectboard.getTasks({
        include : ['tasks']
    })
    res.render('tasks', {projectboard, tasks})
})

app.post('/taskDelete', async (req, res) => {
    const task = await Task.findByPk(req.body.id)
    await task.update({status: 'history', UserId: null, ProjectBoardId: null})
})

app.post('/projectboards', async(req, res) => {
    await ProjectBoard.create(req.body)
    
    res.redirect('/projectboards')
})

app.get('/', (req, res) => {
    res.render('addUser')
})
app.post('/addUser', async(req, res) => {
    console.log(req.body + "------------------------------------------")
    const user = await User.create(req.body)
    res.render('addUser')
})

app.post('/addManageUser', async(req, res) => {
    const user = await User.create(req.body)
    console.log(user);
    res.redirect('/manageUsers')
})
//User
app.get('/manageUsers', async(req, res) => {
    const users = await User.findAll()
    res.render('manageUsers', {users})
})
app.get('/manageUsers/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    const tasks = await Task.findAll({where: {UserId: user.id}})
    res.render('userPage', {user, tasks})
})

app.post('/taskUpdate', async (req, res) => {
    const task = await Task.findByPk(req.body.id)
    await task.update({status: req.body.status.toString()})
    console.log(req.body.status.toString())
    res.send()
})


app.get('/projectBoard/:id', async (req, res) => {
    const users = await User.findAll()
    const projectBoard = await ProjectBoard.findByPk(req.params.id)
    const tasks = await Task.findAll({where: {ProjectBoardId: projectBoard.id}})
    // const tasks = await Task.findAll({where: {ListId: lists.id}})
    res.render('project', {projectBoard: JSON.stringify(projectBoard), tasks: JSON.stringify(tasks), users: JSON.stringify(users)})
})

app.get('/fetchTaskList/:id', async (req, res) => {
    const projectBoard = await ProjectBoard.findByPk(req.params.id)
    const tasks = await Task.findAll({where: {ProjectBoardId: projectBoard.id}})
    const array = [projectBoard, tasks]
    res.send(array)
})

app.post('/assignUserTask', async (req, res) => {
    console.log(req)
    const user = await User.findByPk(req.body.id)
    const task = await Task.findByPk(req.body.TaskId)
    await task.update({UserId: user.id})
    res.send()
})

app.post('/addTask/:id', async (req, res) => {
    const projectBoard = await ProjectBoard.findByPk(req.params.id)
    const task = await Task.create(req.body)
    await projectBoard.addTask(task)
    // res.redirect(`/projectBoard/${req.body.id}`)
    res.send()
})

app.get('/task/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id)
    console.log(task)
    console.log(res)
    res.render('task', {task})
})

app.post('/taskUpdateUrgency', async (req, res) => {
    const task = await Task.findByPk(req.body.id)
    console.log(req.body)
    await task.update({urgency: req.body.urgency})
    res.send()
})

app.listen(process.env.PORT, () => {
    sequelize.sync(() => {
        console.log('Kanban app running on port', process.env.PORT)
    })
})