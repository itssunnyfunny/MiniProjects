const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {TOdo, User} = require('../database/index');
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();


const JWT_PASSWORD = process.env.JWT_PASSWORD;
// User Routes
router.post('/signup', async(req, res) => {
  try {
    const {username, email , password} =  req.body

    console.log(username, email, password);
    
 if (!username ||!email ||!password) {
   return   res.status(400).json({message: "Provide all cadatials properly"})
 }

 const isUser =await User.findOne({email})

 if (isUser) {
     return res.status(401).json({
         message: "user exist! Try to login"
     })
 }

 const user = await User.create({email: email, password: password, username: username})

 if (!user) {
     return res.status(501).json({
         message: "Error during creating user"
     })
 }


const  userId = user._id

const token = jwt.sign({id: userId},JWT_PASSWORD);

res.json({
 message: "user created Successfully",
 userId,
 token: token
})

  } catch (error) {
    console.error("Error in /signup route:", error)
    res.status(500).json({message: "Internal server Error"})
  }
   
});

router.post('/login', (req, res) => {
     // Implement user login logic
});

router.get('/todos', userMiddleware, (req, res) => {
    // Implement logic for getting todos for a user
});

router.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic
});

module.exports = router