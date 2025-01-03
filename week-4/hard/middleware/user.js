const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();

const JWT_PASSWORD = process.env.JWT_PASSWORD;

function userMiddleware(req, res, next) {

 try {
    const authHeader = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
          message: "token not provided"
      })
    };
  
  
    const verify = jwt.verify({token},JWT_PASSWORD);
  
    if (!verify) {
      return res.status(401).json({
          message: "token is not verified"
      })
    } 
// returning the id so i can user it in the routes with req.id
    req.id= verify.id;
    next()
     
 } catch (error) {
    console.error("Error duing user authorization", error)
   return res.status(500).json({
    message: "Internal server Error During Authorizations"
   })
 }

}

module.exports = userMiddleware;