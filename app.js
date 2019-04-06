const express = require('express');
const app = express();
const morgan = require('morgan'); // dev
const bodyParser = require('body-parser');

const functionsRouters = require("./api/routes/functions");

// Makes life easier
app.use(morgan('dev')); // For console logging calls
app.use(bodyParser.urlencoded({ extended: false })); // Needed to encode a responses body
app.use(bodyParser.json());

// DAMN CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return res.status(200).json({});
    } next();
});

// Route handlers
app.use("/functions", functionsRouters);

// Further Error Handling
app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status(404);
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.message
    });
});

module.exports = app;