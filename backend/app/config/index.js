const {corsConfig} = require('./cors.config')
const {sessionConfig} = require('./session.config')
const {passportConfig} = require('./passport.config')


const appConfig = (app) => {
    corsConfig(app)
    sessionConfig(app)
    passportConfig(app)
    require('./database.config')
    require('./github-auth.config')
    require('./google-auth.config')
    require('./gemini.config')
}

module.exports =
    {
        appConfig
    }