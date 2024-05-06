// routes/todoRoutes.js
import express from 'express';
import {
  addTodo,
  deleteTodo,
  downloadTodos,
  filterTodosByStatus,
  getAllTodos,
  getTodoById,
  updateTodo,
  uploadTodos,
} from '../controllers/todoControllers.js';

const router = express.Router();

router.get('/', getAllTodos);
router.get('/filter', filterTodosByStatus);
router.get('/:id', getTodoById);
router.post('/', addTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.post('/upload', upload.single('file'), uploadTodos);
router.get('/download', downloadTodos);

export default router;
