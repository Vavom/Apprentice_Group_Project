const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const {ProjectBoard, List, User, Task, sequelize} = require('./models')

const users = []

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.get('/projectboards', async(req, res) => {
    const projectboards = await ProjectBoard.findAll({
        include : [
            {model: List , as: 'lists'}
        ]
    })
    res.render('projectboards', {projectboards})
})

// app.get('/projectboards/:id', async(req, res) => {
//     const projectboard = await ProjectBoard.findByPk(req.params.id)
//     const lists = await projectboard.getLists({
//         include : ['lists']
//     })
//     res.render('lists', {projectboard, lists})
// })

//add Projectboard
app.post('/projectboards', async(req, res) => {
    await ProjectBoard.create(req.body)
    res.redirect('/projectboards')
})
app.post('/projectboards/:id', async(req, res) => {
    const projectboard = await ProjectBoard.findByPk(req.params.id)
    await projectboard.createList(req.body)
    res.redirect(`/projectboards/${projectboard.id}`)
})

//managerUsers and addUser
app.get('/manageUsers', async(req, res) => {
    const users = await User.findAll()
    res.render('manageUsers', {users})
})

app.post('/manageUsers', async(req, res) => {
    await User.create(req.body)
    res.redirect('manageUsers')
})

app.get('/manageUsers/:id', async(req, res) => {
    const user = await User.findByPk(req.params.id)
    const tasks = await user.getTasks({
        include : ['tasks']
    })
    res.render('tasks', {user, tasks})
})

app.listen(3000, async() => {
    await sequelize.sync()
    console.log("Web server is running on 3000")
})

// //addUser
// app.get('/users', (req, res) => {
//     res.send(users)
// })
// app.post('/users', async(req, res) => {
//     const user = await User.create(req.body)
//     console.log(user);
//     users.push(user)
//     res.send(users)
// })

app.get('/', (req, res) => {
    res.render('addUser')
})
app.post('/addUser', async(req, res) => {
    const user = await User.create(req.body)
    console.log(user);
})

app.get('/', (req, res) => {
    res.render('addUser')
})
app.post('/addUser', async(req, res) => {
    const user = await User.create(req.body)
    console.log(user);
    res.render('addUser')
})
app.post('/addManageUser', async(req, res) => {
    const user = await User.create(req.body)
    console.log(user);
    res.redirect('/manageUsers')
})