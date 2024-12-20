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

router.put('/', adminMiddleware, (req, res) => {
    // Implement update todo  logic
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