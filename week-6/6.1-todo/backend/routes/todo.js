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
    //  write here
}

export async function deleteTodo (req, res, next){
    //  write here
}

export async function deleteTodoById (req, res, next){
    //  write here
}