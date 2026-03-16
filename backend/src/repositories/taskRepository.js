const prisma = require('../config/database');

class TaskRepository {
  async create(taskData) {
    return prisma.tbl_tasks.create({
      data: taskData
    });
  }

  async findById(id) {
    return prisma.tbl_tasks.findUnique({
      where: { id }
    });
  }

  async findAllByUserId(userId, filters = {}) {
    const { page = 1, limit = 10, status, search } = filters;
    const skip = (page - 1) * limit;
    
    const where = {
      user_id: userId,
      ...(status && { status }),
      ...(search && {
        title: {
          contains: search
        }
      })
    };

    const [tasks, total] = await Promise.all([
      prisma.tbl_tasks.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { created_at: 'desc' }
      }),
      prisma.tbl_tasks.count({ where })
    ]);

    return {
      data: tasks,
      total,
      page: parseInt(page),
      limit: parseInt(limit)
    };
  }

  async update(id, taskData) {
    return prisma.tbl_tasks.update({
      where: { id },
      data: taskData
    });
  }

  async delete(id) {
    return prisma.tbl_tasks.delete({
      where: { id }
    });
  }

  async toggleStatus(id, status) {
    return prisma.tbl_tasks.update({
      where: { id },
      data: { status }
    });
  }
}

module.exports = new TaskRepository();