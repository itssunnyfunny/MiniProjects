
const mongoose = require('mongoose');
require('dotenv').config()

 const connectToDatabase = async () => {
      try {
    await  mongoose.connect( process.env.MONGO_URI) 
      console.log("MongoDB connected");
      
      } catch (error) {
        console.error("Error during connecting DB",error)
        process.exit(1);
      }
 }

 const Schema = mongoose.Schema;
 const ObjectId = Schema.ObjectId;

 const UserSchema = new Schema({
    username : String,
    password: String
 });

 const TodoSchema = new Schema({
    userId : ObjectId,
    title: String,
    description: String
 })

 const User  = mongoose.model('User',UserSchema);
 const Todo  = mongoose.model('Todo', TodoSchema);

module.exports({
    connectToDatabase,
    User,
    Todo
})

