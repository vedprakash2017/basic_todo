const fs = require('fs');
const chalk =  require('chalk')

const addTask = (title,body,time)=>{
    const tasks = loadTask()
    const check = tasks.find((task)=>task.title === title)
    if( check=== undefined){
        tasks.push({
            title:title,
            body:body,
            time:time,
            completed:false
        })
        saveTask(tasks);
        console.log( chalk.green.bold.inverse('task added!'))
    }
    else{
        console.log( chalk.red.bold.inverse('task already added! '))
    }
}

const removeTask = (title)=>{
    const tasks = loadTask()
    const new_tasks = tasks.filter((task)=>task.title!=title)
    if( new_tasks.length < tasks.length)
    {
        saveTask(new_tasks)
        console.log( chalk.green.bold.inverse('Task removed!'))
    }
    else
    {
        console.log( chalk.red.bold.inverse('Task does\'t exist'))
    }
}

const done = (title)=>{
    var flag = 0 
    const tasks = loadTask()
    
    console.log(title)
    tasks.forEach((task)=> 
    {
        if(task.title === title)
        {
            task.completed = true
            flag = 1
        }
    }
    )

    if( flag == 0)
    {
        console.log( chalk.red.bold.inverse('Task does\'t exist'))
    }
    else
    {
        saveTask(tasks)
        console.log( chalk.green.bold.inverse('Task completed'))
    }
}


const listTask = ()=>{
    const tasks  = loadTask()
    console.log( chalk.green.bold('Tasks'+'\n'))

    tasks.forEach((task)=>{
        console.log(  chalk.white.bold('title: ' + task.title))
        console.log( 'details: '+ task.body)
        console.log( 'time: ' + task.time)
        console.log( 'status: '+ task.completed + '\n')

    })
}

const loadTask = ()=>{
    try{
        const databuffer = fs.readFileSync('tasks.json')
        const datajson = databuffer.toString()
        return JSON.parse(datajson);
    }
    catch(e)
    {
        return []
    }
}
const saveTask = ( tasks) =>{
    fs.writeFileSync('tasks.json' , JSON.stringify(tasks))
}

module.exports = {
    addTask:addTask,
    removeTask:removeTask,
    listTask:listTask,
    done:done
}