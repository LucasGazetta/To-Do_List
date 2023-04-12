const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbURI = 'mongodb://localhost:27017/todo_db';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
  });
  
  const Task = mongoose.model('Task', taskSchema);

// SELECT
  app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // INSERT
  app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
  
    try {
      const newTask = await task.save();
      res.status(201).json(newTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // UPDATE
  app.put('/tasks/:id', async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // DELETE
  app.delete('/tasks/:id', async (req, res) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      res.json(deletedTask);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  

  