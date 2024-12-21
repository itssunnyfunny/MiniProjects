const express = require('express')
const cors  =  require('cors');
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');
const {connectToDatabase} = require('./db/index')
require('dotenv').config();

const app  = express();

app.use(cors());
app.use(express.json());


app.use('/user',userRouter);
app.use('/todo', todoRouter);


connectToDatabase().then(()=>{
 const PORT =    process.env.PORT || 3000;
  app.listen(PORT,()=> console.log(`Server is running on ${PORT}`));
})



