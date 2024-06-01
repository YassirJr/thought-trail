const cors = require("cors");

const corsConfig = (app) => {
    const corsOptions = {
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    };

    app.use(cors(corsOptions));
}

module.exports =
    {
        corsConfig
    }