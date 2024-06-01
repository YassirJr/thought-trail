const jwt = require('jsonwebtoken');


const isLoggedIn = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token ) {
        if(!req.isAuthenticated()){
            return res.status(401).json({ message: 'Authentication failed: No token provided' });
        }
        // else return res.status(401).json({ message: 'Authentication failed' });
    }
    
    try {
        if(!req.user){
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded.user; // Attach the user object to the request
        }
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token ' });
    }
};

module.exports = {isLoggedIn};
