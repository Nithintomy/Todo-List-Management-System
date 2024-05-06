import mongoose from 'mongoose'

const connectDB = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/todo_list');
          console.log("MongoDB connected")
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
        
    }
}


export default connectDB