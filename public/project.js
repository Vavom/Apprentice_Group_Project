

class Task  {
    constructor(data) {
        this.name = data.get('name')
        this.description = data.get('description')
        this.status = 'available'
        this.urgency = 'Normal'
    }
}


const view = (state) => `
        <div class="body-contents">
        <div class="topNav">
            <a class ="navButton" href="/projectboards">Manage Projects</a>
            <div class="statusContainer">
                <div class="statusAvailable" id="Normal" draggable="true" ondragstart="app.run('onDrag', event)">Normal</div>
                <div class="statusInProgress" id="Important"  draggable="true" ondragstart="app.run('onDrag', event)">Important</div>
                <div class="statusUrgent" id="Urgent"  draggable="true" ondragstart="app.run('onDrag', event)">Urgent</div>
            </div>
        </div>
        <div class="projectBoard">
            <div class="header">${state.projectBoard.name}</div>
            <div class="userContainer">${state.users.map(user => `
            <div class="userLabel" id="${user.id}" draggable="true" ondragstart="app.run('onDragUser', event)"><div  class="user-image"  style="background-image: url(${user.image});"></div><div>${user.name}</div></div> `).join("")}</div>
            <div class= "projectContents">
                    <div class ="listCard" ondragover="event.preventDefault()" id="available" ondrop="app.run('onDropTask', event, this)">
                        <div class="listHeader">To Do</div>
                        <div class="taskContainer" id="container" >
                            ${state.tasks.filter(task => task.status == 'available').map(task => `
                            <div class="taskMaster" >
                            <div class="taskCardContainer${task.urgency}" ondrop="app.run('onDropStatusTag', event, ${task.id})" >
                                <div  class="taskCard${task.urgency}" id="${task.id} "draggable="true" ondragstart="app.run('onDrag', event)" ondragover="event.preventDefault()">
                                <div class="taskHeader">${task.name}</div>
                                </div>
                                <div class="arrowContainer" ondragover="event.preventDefault()" >
                                <div class="arrow down" onclick="app.run('openTask', ${task.id})"></div>
                                <div class="userLabel" ondrop="app.run('onDropUser', event, ${task.id})">
                                        <div class= "user-image" style="background-image: url(${state.users.filter(user => user.id == task.UserId).map(user => user.image)});">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="details" style="
                            display: ${task.showDetails};
                            align-items: center;
                            background-color: rgb(230, 230, 230);
                            border-radius: 20px;
                            margin:10px;
                            border-color:  rgb(230, 230, 230);
                            border-width: 2px;
                            border-style: solid;
                            ">${task.description}</div>
                            </div>
                            `).join("")}
                            <div class="taskCardNormal" ondrop="app.run('onDropUser', event)">
                                <form class="form-style-1" onsubmit="app.run('add', this);return false;">
                                    <label>Add Task</label>
                                    <input name="name" type="text" placeholder="Task Name" required> <br>
                                    <textarea class="field-textarea" name="description" type="text" placeholder="Details" required></textarea> <br>
                                    <input name="status" value="available" type="hidden">
                                    <input name="showDetails" value="none" type="hidden">
                                    <button class='submit2'>submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class ="listCard" ondragover="event.preventDefault()" id="inProgress" ondrop="app.run('onDropTask', event, this)">
                        <div class="listHeader">In Progress</div>
                        <div class="taskContainer" id="container" >
                        ${state.tasks.filter(task => task.status == 'inProgress').map(task => `
                        <div class="taskMaster" >
                        <div class="taskCardContainer${task.urgency}" ondrop="app.run('onDropStatusTag', event, ${task.id})" >
                                <div  class="taskCard${task.urgency}" id="${task.id} "draggable="true" ondragstart="app.run('onDrag', event)" ondragover="event.preventDefault()">
                                <div class="taskHeader">${task.name}</div>
                                </div>
                                <div class="arrowContainer" ondragover="event.preventDefault()" >
                                <div class="arrow down" onclick="app.run('openTask', ${task.id})"></div>
                                    <div class="userLabel" ondrop="app.run('onDropUser', event, ${task.id})">
                                        <div class= "user-image" style="background-image: url(${state.users.filter(user => user.id == task.UserId).map(user => user.image)});">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="details" style="
                            display: ${task.showDetails}; 
                            align-items: center;
                            background-color: rgb(230, 230, 230);
                            border-radius: 20px;
                            margin:10px;
                            border-color:  rgb(230, 230, 230);
                            border-width: 2px;
                            border-style: solid;">${task.description}</div>
                            </div>
                            `).join("")}    
                        </div>
                    </div>
                    <div class ="listCard" ondragover="event.preventDefault()" id="complete" ondrop="app.run('onDropTask', event, this)">
                        <div class="listHeader">Done
                        
                        </div>
                        <div class="taskContainer" id="container">
                        ${state.tasks.filter(task => task.status == 'complete').map(task => `
                        <div class="taskMaster">
                                <div class="taskCardContainer${task.urgency}" ondrop="app.run('onDropStatusTag', event, ${task.id})" >
                                <div  class="taskCard${task.urgency}" id="${task.id} "draggable="true" ondragstart="app.run('onDrag', event)" ondragover="event.preventDefault()">
                                <div class="taskHeader">${task.name}</div>
                                </div>
                                <div class="arrowContainer" ondragover="event.preventDefault()" >
                                <div class="arrow down" onclick="app.run('openTask', ${task.id})"></div>
                                <div class="userLabel" ondrop="app.run('onDropUser', event, ${task.id})">
                                        <div class= "user-image" style="background-image: url(${state.users.filter(user => user.id == task.UserId).map(user => user.image)});">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="details" style="
                            display: ${task.showDetails}; 
                            align-items: center;
                            background-color: rgb(230, 230, 230);
                            border-radius: 20px;
                            margin:10px;
                            border-color:  rgb(230, 230, 230);
                            border-width: 2px;
                            border-style: solid;">${task.description}</div>
                            </div>
                            <button onclick="app.run('delete',${task.id})">Delete</button>
                            `).join("")}
                        </div>
                    </div>
            </div>
        </div>
        </div>
`

const update = {
    add: async (state, form) => {
        const data = new FormData(form)
        const task = new Task(data)
        const postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }
        fetch(`/addTask/${state.projectBoard.id}`, postRequest).then(() => app.run('getTasks'))
        return state
    },
    
    delete: (state, id) => {
        console.log("fl hhlck euzcukehclzfekuhclzkfucsucfhzukheslcku")
        const taskIndex = state.tasks.findIndex(task => task.id == id)
        state.tasks[taskIndex].status = 'history'
        const task = state.tasks[taskIndex]
        task.status = 'history'
        const postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task),
                
        }
        fetch('/taskDelete', postRequest).then(() => app.run('getTasks'))
        return state
    },

    onDrag: (state, event) => {
        event.dataTransfer.setData('text', event.target.id)
        return state
    },

    onDragUser: (state, event) => {
        const user = JSON.stringify(event.target.id)
        event.dataTransfer.setData('text', user)
    },

    onDropTask: (state, event, statusName) => {
        event.preventDefault()
        const id = event.dataTransfer.getData('text')
        const object = JSON.parse(id)
        if(object.image == undefined) {
        const index = state.tasks.findIndex(task => task.id == id)
        console.log(index)
        state.tasks[index].status = statusName.id.toString()
        const task = state.tasks[index]
        task.showDetails = "none"
        // state.taskList = state.tasks.filter(task => task.status == statusName.id)
        statusName = statusName.id
        const postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task),
                
        }
        fetch('/taskUpdate', postRequest).then(() => app.run('getTasks'))
        // app.run('taskComplete', task)
        app.run('getTasks')
    }
        
        return state
    },
    onDropUser:(state, event, taskId) =>{
        event.preventDefault()
        
        const userString = event.dataTransfer.getData('text')
        const id = JSON.parse(userString)
        const index = state.users.findIndex(user => user.id == id)
        const user = state.users[index]
        const taskIndex = state.tasks.findIndex(task => task.id == taskId)
        const task = state.tasks[taskIndex]
        task.UserId = user.id
        user.TaskId = task.id
        const postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        }
        
        
        fetch('/assignUserTask', postRequest).then(() => app.run('getTasks'))
        task.showDetails = "none"
        return state
    },

    onDropStatusTag: (state, event, data) => {
        const taskId = data
        const id = event.dataTransfer.getData('text')
        if(id == 'Normal' || id == 'Important'|| id == 'Urgent') {
        const taskIndex = state.tasks.findIndex(element => element.id === taskId)
        console.log(id)
        state.tasks[taskIndex].urgency = id
        const postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state.tasks[taskIndex])
        }
        fetch('/taskUpdateUrgency', postRequest).then(() => app.run('getTasks'))

    }
        return state

    },

    openTask: (state, id) => {
        const taskIndex = state.tasks.findIndex(task => task.id == id)
        const task = state.tasks[taskIndex]
        console.log(details)
        if(task.showDetails == "none") {
            task.showDetails = "block"
        } else {
            task.showDetails = "none"
        }
        return state
    },

    getTasks: async (state) => {
        const result = await fetch(`/fetchTaskList/${state.projectBoard.id}`).then(res => res.json())
        state.tasks = result[1]
        for (let i = 0; i < state.tasks.length;i++) {
            state.tasks[i].showDetails = "none"
        }
        state.projectBoard = result[0]
        return state
    }
}
app.start('project',state,view,update)
app.run('getTasks')