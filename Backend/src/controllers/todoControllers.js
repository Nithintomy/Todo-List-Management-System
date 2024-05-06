import TodoItem from "../models/todoItems.js";
import fs from 'fs'
import csv from 'csv-parser'
import json2csv from 'json2csv'

export const getAllTudos = async (req, res) => {
  try {
    const todos = await TodoItem.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTudoById = async (req, res) => {
  try {
    const todo = await TodoItem.findById(req.params.id);
    console.log(req.params.id,"heehehe")

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTudo = async (req, res) => {
  const todo = new TodoItem({
    description: req.body.description,
    status: req.body.status,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTudo = async (req, res) => {
  try {
    const todo = await TodoItem.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.description = req.body.description || todo.description;
    todo.status = req.body.status || todo.status;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTudo = async (req, res) => {
  
  try {
    const todo = await TodoItem.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todo.deleteOne();

    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Upload todo items from a CSV file
export const uploadTodos = async (req, res) => {
  try {
    if (!req.file || Object.keys(req.file).length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    const todoItems = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        const todo = new TodoItem({
          description: data.description,
          status: data.status,
        });
        todoItems.push(todo); 
        console.log(todoItems,"itens")
      })
      .on('end', async () => {
        await TodoItem.insertMany(todoItems);
        fs.unlinkSync(req.file.path);
        res.status(201).json({ message: 'Todo items uploaded successfully.' });
      });

  } catch (error) {
 
    res.status(500).json({ message: error.message });
  }
};

export const downloadTodos = async (req, res) => {

  try {
    const todos = await TodoItem.find();
    

    if (!todos || todos.length === 0) {
      return res.status(404).json({ message: 'No todo items found.' });
    }

    const fields = ['_id', 'description', 'status']; 

    const csvData = json2csv.parse(todos, { fields });

    res.header('Content-Type', 'text/csv');
    res.attachment('todo_list.csv');
    res.status(200).send(csvData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 };


export const filterTodosByStatus =async(req,res)=>{

    const status = req.query.status;

    try {
      const filteredTudos = await TodoItem.find({status})
      res.json(filteredTudos)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

 } 