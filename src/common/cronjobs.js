var cron = require('node-cron');

cron.schedule('* * * * * *', () => {
    console.log('running a task every minute');
});

var task = cron.schedule('* * * * *', () =>  {
    console.log('stoped task');
}, {
    scheduled: false
});

task.start();

setTimeout( ()=> {
    task.stop();
}, 5000)