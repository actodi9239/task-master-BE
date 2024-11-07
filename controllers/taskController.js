const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

exports.getTasks = async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verificado:', decoded);

        const tasks = await Task.findAll({ where: { userId: decoded.id } });
        res.json(tasks);
    } catch (err) {
        console.error('Error al verificar el token:', err);
        return res.status(403).json({ message: 'Invalid Token' });
    }
};

exports.createTask = async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { title, description, date, important } = req.body; 
        
      
        const taskDate = new Date(date); 
        const utcDate = taskDate.toISOString().split('T')[0]; 

        const newTask = await Task.create({
            title,
            description,
            userId: decoded.id,
            date: utcDate, 
            important: important || false 
        });
        res.status(201).json(newTask);
    } catch (err) {
        console.error('Error al crear la tarea:', err);
        return res.status(403).json({ message: 'Invalid Token' });
    }
};

exports.getTaskById = async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verificado:', decoded);

        const task = await Task.findByPk(req.params.id);
        if (!task || task.userId !== decoded.id) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        console.error('Error al verificar el token:', err);
        return res.status(403).json({ message: 'Invalid Token' });
    }
};


exports.updateTask = async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const task = await Task.findByPk(req.params.id);
        if (!task || task.userId !== decoded.id) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.update(req.body); 
        res.json({ message: 'Task updated successfully' });
    } catch (err) {
        console.error('Error al verificar el token:', err);
        return res.status(403).json({ message: 'Invalid Token' });
    }
};


exports.completeTask = async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verificado:', decoded);

        const task = await Task.findByPk(req.params.id);
        if (!task || task.userId !== decoded.id) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.update({ datecompleted: new Date() });
        res.json({ message: 'Task marked as completed' });
    } catch (err) {
        console.error('Error al verificar el token:', err);
        return res.status(403).json({ message: 'Invalid Token' });
    }
};

exports.deleteTask = async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verificado:', decoded);

        const task = await Task.findByPk(req.params.id);
        if (!task || task.userId !== decoded.id) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Error al verificar el token:', err);
        return res.status(403).json({ message: 'Invalid Token' });
    }
};
