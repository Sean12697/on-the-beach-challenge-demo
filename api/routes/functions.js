const express = require('express');
const mongooseHandler = require('../../mongooseHandler');
const mongooseConnection = new mongooseHandler();
const router = express.Router();

router.get('test', (req, res, next => {
    mongooseConnection.insertTestTasks();
}));

router.get('/newUser', (req, res, next) => {
    mongooseConnection.insertNewUser(req.params.name, req.params.email).then(session => {
        res.status(200).json({
            session
        });    
    });
});

router.get('/getUser', (req, res, next) => {
    mongooseConnection.completeTask(req.params.session, req.params.id).then(result => {
        res.status(200).json({
            result
        });    
    });
});

router.get('/getTask', (req, res, next) => {
    mongooseConnection.getTask(req.params. id).then(task => {
        res.status(200).json({
            task
        });    
    });
});

router.get('/getCompleteTasks', (req, res, next) => {
    mongooseConnection.getCompleteTasks(req.params.session).then(tasks => {
        res.status(200).json({
            tasks
        });    
    });
});

router.get('/getOngoingTasks', (req, res, next) => {
    mongooseConnection.getCompleteTasks(req.params.session).then(tasks => {
        res.status(200).json({
            tasks
        });    
    });
});

// router.get('/', (req, res, next) => {
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