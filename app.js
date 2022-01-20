const yargs = require("yargs");
const tasks = require("./tasks");

yargs.command({
    command:'add',
    describe:'adding a new task',
    builder:{
        title:{
            describe:'title of the task',
            type: 'string',
            demandOption:true
        },
        body:{
            describe:'details about task',
            type: 'string',
            demandOption:true
        },
        time:{
            describe:' time to sumbit the task',
            type: 'string',
            demandOption:true
        }
    },
    handler(argv)
    {
        tasks.addTask(argv.title, argv.body, argv.time)
    }
})

yargs.command({
    command:'remove',
    describe:'Remove a task',
    builder:{
        title:{
            describe:'title of the task ',
            type:'string',
            demandOption:true
        }
    },
    handler(argv)
    {
        tasks.removeTask(argv.title);
    }
})

yargs.command({
    command:'done',
    describe:'completed the task',
    builder:{
        title:{
            describe:'title of the task',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv)
    {
        tasks.done(argv.title);
    }
})


yargs.command({
    command:'list',
    describe:'list all with there status tasks',
    handler()
    {
        tasks.listTask();
    }
})


yargs.parse()