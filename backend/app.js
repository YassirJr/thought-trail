// call dotenv
require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require("passport")
var session = require("express-session")
const cors = require('cors');
const {createServer} = require("http");
const {v1} = require("./app/routes");


var app = express();
const server = createServer(app);


// call websockets
require('./app/io/index').socketServer(server);
require('./app/config/index').appConfig(app)

/*app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie : {
        secure: false ,
        httpOnly : true
    }
}));*/

/*require('./app/config/gemini.config')

// call database connection
require('./app/database/database.config')

// call web sockets
// call google auth
require("./app/config/google-auth.config")
// call github auth
require("./app/config/github-auth.config")*/

/*app.use(passport.initialize())
app.use(passport.session()*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/storage', express.static(path.join(__dirname, 'app/storage')));

/*const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));*/



app.use('/api/v1' , v1)
module.exports = {app, server };

