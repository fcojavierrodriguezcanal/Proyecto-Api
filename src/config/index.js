// src/config/index.js

require('dotenv').config('');

const config = {
    server: {
        port: process.env.SERVER_PORT,
        token: process.env.TOKEN_KEY
    },
};

module.exports = config;

;