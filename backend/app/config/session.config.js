const session = require("express-session");
const passport = require("passport");


const sessionConfig = app => {
    app?.use(session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie : {
            secure: false ,
            httpOnly : true
        }
    }));
}


module.exports =
    {
        sessionConfig
    }