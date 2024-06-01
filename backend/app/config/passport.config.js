const passport = require("passport");

const passportConfig = app => {
    app?.use(passport.initialize())
    app?.use(passport.session())
}

module.exports =
    {
        passportConfig
    }
