const jwt = require('jsonwebtoken');
require('dotenv').config()

const SECRET = process.env.JWT_SECRET;

const authenticateJwt = async (req, res, next) => {
    const authHeader =  req.hearders.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET,(err, user)=>{
            if (err) {
                return res.status(403).json({message: "Forbidden: Invalid Token"})
            }
            req.userId = user.userId
            next()
        })

    } else {
       res.status(401).json({message: "Unauthorized: token is not Provided"})
    }
}

module.exports = authenticateJwt;