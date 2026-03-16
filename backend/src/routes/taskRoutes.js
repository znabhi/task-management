const express = require('express');
const taskController = require('../controllers/taskController');
const authenticate = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { createTaskValidator, updateTaskValidator } = require('../validators/taskValidator');

const router = express.Router();

// All task routes require authentication
router.use(authenticate);

router.get('/', taskController.getTasks);
router.post('/', validate(createTaskValidator), taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.patch('/:id', validate(updateTaskValidator), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id/toggle', taskController.toggleTaskStatus);

module.exports = router;