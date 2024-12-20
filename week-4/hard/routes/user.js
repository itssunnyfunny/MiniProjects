const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {Todo, User} = require('../database/index');
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

router.post('/login', async(req, res) => {

  try {
    const {email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({message: "provide all the cradencials"})
    };
     
 
    const isUser = await User.findOne({email});
    if (!isUser) {
     return res.status(404).json({message: "user doesn't exits in our resistry"})
 
    }
   
     const userId = isUser._id
 
    const token = jwt({id:userId}, JWT_PASSWORD);
 
    res.json({message: "user successfully logged in",
     userId,
      token
    });

  } catch (error) {
     console.error("Error during the user loging", error)
   return  res.status(500).json({message: "Internal Sever Error"})
  }
 
});

router.get('/todos', userMiddleware, async(req, res) => { 

    const userId = req.id;
    if (!userId) {
      return res.status(401).json({
        message: "userId is not Provided"
      })
    }

    const todos = await Todo.find({userId});
    if (!todos) {
      return res.status(404).json({
        message: "todos are not found for the given userId"
      })
    }

    res.json(todos)
     
});

router.post('/logout', userMiddleware, async(req, res) => {

});

module.exports = router