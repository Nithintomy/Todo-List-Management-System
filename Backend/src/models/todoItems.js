
import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
});

const TodoItem = mongoose.model('TodoItem', TodoSchema);

export default TodoItem;
