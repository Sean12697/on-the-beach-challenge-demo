const express = require('express');
const mongooseHandler = require('../../mongooseHandler');
const mongooseConnection = new mongooseHandler();
const router = express.Router();

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