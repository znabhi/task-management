const taskService = require('../services/taskService');

class TaskController {
  async createTask(req, res, next) {
    try {
      const userId = req.userId;
      const taskData = req.body;
      
      const task = await taskService.createTask(userId, taskData);
      
      res.status(201).json({
        message: 'Task created successfully',
        task
      });
    } catch (error) {
      next(error);
    }
  }

  async getTasks(req, res, next) {
    try {
      const userId = req.userId;
      const filters = {
        page: req.query.page,
        limit: req.query.limit,
        status: req.query.status,
        search: req.query.search
      };
      
      const result = await taskService.getTasks(userId, filters);
      
      res.json({
        message: 'Tasks retrieved successfully',
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req, res, next) {
    try {
      const userId = req.userId;
      const taskId = parseInt(req.params.id);
      
      const task = await taskService.getTaskById(taskId, userId);
      
      res.json({
        message: 'Task retrieved successfully',
        task
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const userId = req.userId;
      const taskId = parseInt(req.params.id);
      const taskData = req.body;
      
      const task = await taskService.updateTask(taskId, userId, taskData);
      
      res.json({
        message: 'Task updated successfully',
        task
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const userId = req.userId;
      const taskId = parseInt(req.params.id);
      
      await taskService.deleteTask(taskId, userId);
      
      res.json({
        message: 'Task deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleTaskStatus(req, res, next) {
    try {
      const userId = req.userId;
      const taskId = parseInt(req.params.id);
      
      const task = await taskService.toggleTaskStatus(taskId, userId);
      
      res.json({
        message: 'Task status toggled successfully',
        task
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskController();