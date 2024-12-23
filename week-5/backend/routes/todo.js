const {Router} = require('express');
const { Todo } = require('../db');
const middlewareJwt = require('../middleware/user')


const router = Router();
 router.use(middlewareJwt);

router.post('/',async (req, res) => {
    const payload = req.body;
    const userId = req.userId;
    if (!payload.title) {
        return res.status(400).json({
            message: "You sent the wrong inputs"
        })
    }

    try {
        const newTodo = Todo.create({
            title: payload.title,
            completed: false,
            userId: userId
        });

        res.status(201).json({
            message: "Todo created",
            todo: newTodo
        })
    } catch (error) {
        res.status(500).json({
            message: "error during todo",
            error: error.message
        })
    }

});

router.get('/',async (req, res) => {
    try {
        const todos = await Todo.find({userId: req.userId})

        res.json({
            todos: todos
        })
    } catch (error) {
        res.status(500).json({
            message: "Error fetching todos",
            error: error.message,
        })
    }
    
})


router.put('/:id',async (req, res) => {
    
})

module.exports = router