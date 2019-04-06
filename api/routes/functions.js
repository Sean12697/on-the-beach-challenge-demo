const express = require('express');
const mongooseHandler = require('../../mongooseHandler');
const mongooseConnection = new mongooseHandler();
const router = express.Router();

router.post('/newUser', (req, res, next) => {
    mongooseConnection.insertNewUser(req.body.name, req.body.email).then(session => {
        res.status(200).json({
            session
        });    
    });
})

router.post('/getUser', (req, res, next) => {
    mongooseConnection.completeTask(req.body.session, req.body.id).then(result => {
        res.status(200).json({
            result
        });    
    });
});

router.post('/getTask', (req, res, next) => {
    mongooseConnection.getTask(id).then(task => {
        res.status(200).json({
            task
        });    
    });
});

router.post('/getCompleteTasks', (req, res, next) => {
    mongooseConnection.getCompleteTasks(req.body.session).then(tasks => {
        res.status(200).json({
            tasks
        });    
    });
});

router.post('/getOngoingTasks', (req, res, next) => {
    mongooseConnection.getCompleteTasks(req.body.session).then(tasks => {
        res.status(200).json({
            tasks
        });    
    });
});

// router.post('/', (req, res, next) => {
//     mongooseConnection.func();
//     res.status(200).json({
//         test
//     });
// });

// router.get('/', (req, res, next) => {
//     mongooseConnection.func().then(test => {
//         res.status(200).json({
//             test
//         });
//     })
// });

module.exports = router;