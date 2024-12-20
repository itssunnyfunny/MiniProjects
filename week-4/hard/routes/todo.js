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
    const {id,title, description} = req.body;
    
    if (!title || !description) {
        return res.status(401).json({
            message : "provide all the credencials"
        })
    };

    const todo =  await Todo.create({id,title, description});
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

router.delete('/', adminMiddleware, async(req, res) => {
  try {
       
    const deleted = await Todo.deleteMany()
    if (!deleted) {
        return res.status(402).json({
            message : "can't delete the all the Todos"
        })
    };
    res.json({
        message : "todos are deleted successfully"
    })
  } catch (error) {
      console.error("error during the deletation of all todos")
      return res.status(500).json({
        message : "Internal server error"
      })
  }


});

router.delete('/:id', adminMiddleware, async(req, res) => {

    try {
        const todoId = req.params.id;

        if (!todoId) {
          return res.status(401).json({
              message: "Please provide id in the url"
          })
        };
       
        const deleteById  = await Todo.deleteOne({id: todoId})
  
        if (!deleteById) {
          return res.status(401).json({
              message : "error during the deletion of todo by Id"
          })
        };
  
        res.json({
          message : "todo deleted by given Id"
        })
    } catch (error) {
        console.error("Error durin the deletion todo by Id", error)
        return res.status(500).json({
            message: "Internal sever Error"
        })
    }

});


router.get('/', adminMiddleware, async(req, res) => {
   try {
      
    const todos = await Todo.find();
     if (!todos) {
        return res.status(404).json({
            message: "error during the getting all the todos"
        })
     };

     res.json({
        message: "gitting all the todos",
        todos
     })

   } catch (error) {
      console.error("error during getting all the todos ", error)
      return res.status (500).json({
        message : "Internal server Error"
      })
   }

});

router.get('/:id', adminMiddleware, async(req, res) => {
    try {
        const todoId = req.params.id;

        if (!todoId) {
           return res.status(401).json({
               message: "please provide the todo id"
           })
        };
   
        const todoById  = await Todo.findById({id: todoId});
   
        if (!todoById) {
           return res.status(401).json({
               message : " error during getting the todo by Id"
           })
        };
   
        res.json({
           todoById
        })
    } catch (error) {
        console.error("error during the getting todo by id", error);
        return res.status(500).json({
            message : "Internal server Error during the getting the todo by given Id"
        })
    }
});

module.exports = router;