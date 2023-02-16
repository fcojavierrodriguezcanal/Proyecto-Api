// src/index.js

const chalk = require('chalk');
const express = require('express');
const script_routes = require('../routes/user'); 
const bodyParser = require('body-parser');
const logger = require('./config/logger');
const app = express();

app.use('/api', script_routes); // api ó app ???? .... definir

app.get('/',(req,res) => {   //.........................definimos rutas 
    res.send("Single-Api");
    logger.info("Server Sent A Single-Api");
})

// no route found handler
app.use((req, res, next) => {
    const message = chalk.red('Route not found');
    const statusCode = 404;
        
    logger.warn(message);

    res.status(statusCode);
    res.json({
        message,
    });
});

// error handler
app.use((err, req, res, next) => {
    const {statusCode = 500, message} = err;
    
    logger.error(message);

    res.status(statusCode);
    res.json({
        message,
    });
});


module.exports = app;
