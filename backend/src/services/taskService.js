const taskRepository = require('../repositories/taskRepository');

class TaskService {
  async createTask(userId, taskData) {
    return taskRepository.create({
      ...taskData,
      user_id: userId
    });
  }

  async getTasks(userId, filters) {
    return taskRepository.findAllByUserId(userId, filters);
  }

  async getTaskById(id, userId) {
    const task = await taskRepository.findById(id);
    
    if (!task) {
      throw new Error('Task not found');
    }

    if (task.user_id !== userId) {
      throw new Error('Unauthorized access to task');
    }

    return task;
  }

  async updateTask(id, userId, taskData) {
    const task = await this.getTaskById(id, userId);
    return taskRepository.update(id, taskData);
  }

  async deleteTask(id, userId) {
    const task = await this.getTaskById(id, userId);
    return taskRepository.delete(id);
  }

  async toggleTaskStatus(id, userId) {
    const task = await this.getTaskById(id, userId);
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    return taskRepository.toggleStatus(id, newStatus);
  }
}

module.exports = new TaskService();