//  TODO: Can you create backend with standard folder structure like: week-4/hard ???
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json());

const secret = process.env.JWT_SECRERT;  // This should be in an environment variable in a real application
const port = process.env.PORT;

// Define mongoose schemas
const userSchema = new mongoose.Schema({
   username :String,
   password: String,
   purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] 
});

const adminSchema = new mongoose.Schema({
  username: String,
  password : String

});

const courseSchema = new mongoose.Schema({
    courseId: Number,
   title: String,
   description: String,
   price: Number,
   imageLink: String,
   competed: Boolean,
   createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'}
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

const authMiddleware = (req, res, next) => {
//  authMiddleware logic here 
};

// Connect to MongoDB
mongoose.connect('<YourMongoDbConnectionString>'); 


// Admin routes
app.post('/admin/signup', async(req, res) => {

   try {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(401).json({
            message: "please provide both username and password"
        })
        return;
    }

    const isExists = await Admin.findOne({username});

    if (isExists) {
        res.status(403).json({
            message: "Admin exist with this email"
        })
        return;
    }

    const newAdmin = await Admin.create({username: username, password: password});

    const token = jwt.sign({id: newAdmin._id},secret,{expiresIn: '1h'});

    res.json({
        message: "Admin created successfully",
        token : `Bearer ${token}`
    })
   } catch (error) {
      console.error("Error during the Admin signUP",error)
      res.status(500).json({
        message: "Internal Server Error"
      })
      return;
   }
});

app.post('/admin/login', async(req, res) => {
      try {
        
     const {username, password} = req.body;

     if (!username || !password) {
        res.status(401).json({
            message: "please provide full cradencials username and password"
        });
        return;
     }

     const isExists = await Admin.findOne({username: username, password: password});

     if (!isExists) {
        res.status(404).json({
            message: "Admin not found or wrong password"
        });
        return;
     }
      const token = jwt.sign({id: isExists._id},secret, {expiresIn: '1h'});

      res.json({
        message: "Admin successfully loggedIn",
        token: `Bearer ${token}`
      });
      } catch (error) {
        console.error("Error during the Admin Logging",error)
        res.status(500).json({
            message: "Internal Server Error"
        })
        return;
      }

});

app.post('/admin/courses', async(req, res) => {
   try {
    let courseId =1;
    const {title, description, price, imageLink, published} = req.body;
    if (!title || !description || !price || !imageLink || !published) {
        res.status(401).json({
            message: "please provide all the credentials"
        })
    };

    const course = await Course.create({
        courseId,
        title,
        description,
        price,
        imageLink,
        published
    });
    
    courseId++;
    res.json({
        message: "Course created successfully",
        courseId: course.courseId
    })
   } catch (error) {
      res.status(500).json({
        message : "Internal server error"
      });
      console.error("Error during creating a new course",error)
      return;
   }

});

app.put('/admin/courses/:courseId', async(req, res) => {
    const courseId = req.params;
    const payload   = req.body;

   if (!courseId) {
        res.status(404).json({
            message: "please provide courseId as a param"
        })
        return;
    }

    if(!payload){
        res.status(404).json({
            message: "please provide updated payload"
        })
        return;
    }
  try {
     
    const updatedCourse = await Course.updateOne({courseId:courseId},{payload},{new: true})
    
    if (!updatedCourse) {
        res.status(400).json({
            message: "course not updated"
        })
    }
    res.json({
        message: "Course updated successfully"
    })
  } catch (error) {
    res.status(500).json({
        message: "Internal server Error",

    });
    console.error("Error during updating course",error)
    return;
  }
});

app.get('/admin/courses', async(req, res) => {

   try {
    const courses  = await Course.find();

    if (!courses) {
        res.json(404).json({
            message: "courses are not available"
        })
    }

    res.json({
        courses
    })
   } catch (error) {
     res.status(500).json({
        message: "Internal Server Error"
     })
     console.error("Error when getting courses at admin route",error)
   }

});

// User routes
app.post('/users/signup', async(req, res) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            res.status(401).json({
                message: "please provide both username and password"
            })
            return;
        }
    
        const isUser = await User.findOne({username});
    
        if (isUser) {
            res.status(401).json({
                message: "user exists with the provided username"
            })
            return;
        }
    
        const user = await User.create({username: username, password: password});
    
        const token = jwt.sign({id: user._id}, secret, {expiresIn: '1h'});
    
        res.json({
            message: "user is created successfully",
            token: `Bearer ${token}`
        })
    } catch (error) {
        console.error("error during user signup",error)
        res.status(500).json({
            message: "Internal Server Error"
        })
        return;
    }
});

app.post('/users/login', async(req, res) => {
     try {
        const {username, password} = req.body;

        if (!username || !password) {
            res.status(403).json({
                message: "please provide full credincials username, password"
            })
            return;
        };

        const isExists = await User.findOne({username: username, password: password});

        if (!isExists) {
            res.status(404).json({
                message: "user don't exists or wrong password"
            })
            return;
        }

        const token = jwt.sign({id: isExists._id},secret, {expiresIn: '1h'});

        res.json({
            message: "user is successfully logged in",
            token: `Bearer ${token}`
        })
     } catch (error) {
         console.error("error during user signin",error)
         res.status(500).json({
            message: "Internal Server Error"
         })
         return;
     }
});

app.get('/users/courses', (req, res) => {
    // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
    // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
    // logic to view purchased courses
});

app.listen(port, () => {
    console.log('Server is listening on port 3000');
});