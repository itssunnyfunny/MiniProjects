const mongoose = require('mongoose');

// Connect to MongoDB
 mongoose.connect('mongodb://localhost:27017/todoApp');

// Define schemas

const UserSchema = new mongoose.Schema({
   email:{
    type: String,
    required: true,
    unique: true
   },
   password: {
    type: String,
    required: true
   },
   username: {
    type: String,
    required: true
   }
});

const TodoSchema = new mongoose.Schema({
      userId : String,
      title: String,
      description: String,
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
}