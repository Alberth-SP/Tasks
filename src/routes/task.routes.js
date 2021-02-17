const express = require('express');
const Task = require('../models/task');
const router = express.Router();

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
})

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({title, description});
    await task.save();
    res.json("tarea guardadad");
    
})

router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    const newTask = { title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Task Updated'});
})

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({satus: 'Task deleted'});
})

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
})

module.exports = router;