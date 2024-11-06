const express = require('express');
const router = express.Router();
const { getTasks, createTask, getTaskById, updateTask, completeTask, deleteTask } = require('../controllers/taskController');

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.patch('/:id', completeTask);
router.delete('/:id', deleteTask);

module.exports = router;
