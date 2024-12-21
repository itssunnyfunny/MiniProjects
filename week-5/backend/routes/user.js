const {Router} = require('express');
const {User}  = require('../db/index');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

const router = Router();


router.post('/signup',async (req, res) => {
    const {username, password} = req.body;
    try {
         const user = await User.findOne({username})
         if (user) {
            return res.status(403).json({message: "user already exists"});
         }
         const newUser = new User({username, password})
         await newUser();

         const token = jwt.sign({userId : newUser._id},SECRET, {expiresIn:'1h'})

         res.json({message : "user created successfully"},token)
    } catch (error) {
        res.json(500).send('Server Error during signup',error)
    }
    
})

router.post('/signin',async (req, res) => {
    
})


module.exports = router;