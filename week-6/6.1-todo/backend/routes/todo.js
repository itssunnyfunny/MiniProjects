let todos = []; 
let currentIndex;

export async function getAllTodo (req, res, next){
     res.json(todos);
}

export async function createTodo (req, res, next){
    const task = req.body;
    if (!task) {
        return res.status(401).json({message: "provide task "})
    }
    const newTodo = {id:currentIndex++, task};
    todos.push(newTodo);
    res.json(newTodo);
}

export async function updateTodo (req, res, next){
    const {id} = req.params;
    const task = req.body;
    if (!task) {
        return  res.json({message: "please provide task"});
    }

    const todoIndex = todos.findIndex(todo => todo.id === id)
    if (todoIndex !== -1) {
        todos[todoIndex] = {...todos[todoIndex], task};
       res.json(todos[todoIndex]);
    } else {
        res.json({message: "todo is not found"});
    }
}

export async function deleteTodo (req, res, next){
    todos = [];
    res.json({message : "all todo deleted !"})
}

export async function deleteTodoById (req, res, next){
    const {id} = req.params;
    if (!id) {
        return res.status(401).json({message: "provide id for deletion"})
    };
    const todoIndex = todos.findIndex(todo => todo.id == id);

    if (todoIndex !== -1) {
        todos.splice(todoIndex,1);
        res.json({message : "tod is deleted"})
    } else {
        res.status(404).json({message : "todo not found"})
    }
}