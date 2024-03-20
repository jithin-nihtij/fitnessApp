const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            

            const decoded = jwt.verify(token, process.env.key);
            

            req.user = decoded;
            next();
        } catch (error) {
            console.error('Error:', error.message);
            res.status(401).json({ error: 'Unauthorized - Invalid Token' });
        }
    } else {
        res.status(401).json({ error: 'No token provided' });
    }
};

module.exports = protect;
 