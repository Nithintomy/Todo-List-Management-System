// server.js
import express from 'express';
import todoRoutes from './routes/todoRoutes.js';
import connectDB from './connection/db.js';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const upload = multer({ dest: 'uploads/' });

app.use(express.json());

app.use(upload.single('file'));

app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
