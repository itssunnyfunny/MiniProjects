const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const router = Router();
const {Todo} = require('../database/index')

// toughts
// don't try to over engineer it
//  just build what is asked

// todo Routes

router.post('/', async(req, res) => {

  try {
    const {title, description} = req.body;
    
    if (!title || !description) {
        return res.status(401).json({
            message : "provide all the credencials"
        })
    };

    const todo =  await Todo.create({title, description});
    res.json({
        message: "todo is created",
        todo
    })
  } catch (error) {
     console.error("Error in creating Todo", error)
     return res.status(500).json({
        message: "Internal sever error during todo creation"
     })
  }
});

router.put('/', adminMiddleware, async(req, res) => {
   try {
     
    const updatedData  = req.body;

    if (!updatedData) {
        return res.status(401).json({
            message: "provide the upated data"
        })
    }

    const update = await Todo.updateOne({updatedData});

    if (!update) {
        return res.status(404).json({
            message: "Error during the upadation of data"
        })
    }

    res.json({
        message: "todo is updated successfully",
        update
    })
   } catch (error) {
     console.error("error during updating the Todo",error)
     return res.status(500).json({
        message: "Internal server Error"
     })
   }

});

router.delete('/', adminMiddleware, (req, res) => {
    // Implement delete todo logic
});

router.delete('/:id', adminMiddleware, (req, res) => {
    // Implement delete todo by id logic
});


router.get('/', adminMiddleware, (req, res) => {
    // Implement fetching all todo logic
});

router.get('/:id', adminMiddleware, (req, res) => {
    // Implement fetching todo by id logic
});

module.exports = router;