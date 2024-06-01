const cors = require("cors");

const corsConfig = (app) => {
    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    };

    app.use(cors(corsOptions));
}

module.exports =
    {
        corsConfig
    }