const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo')

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/healthy", (req, res)=> res.send("I am Healthy"));

app.use('/user',userRouter)
app.use('/todo',todoRouter)

//  start writing your routes here

app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`));

