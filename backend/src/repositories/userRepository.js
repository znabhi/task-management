const prisma = require('../config/database');

class UserRepository {
  async create(userData) {
    return prisma.tbl_users.create({
      data: userData
    });
  }

  async findByEmail(email) {
    return prisma.tbl_users.findUnique({
      where: { email }
    });
  }

  async findById(id) {
    return prisma.tbl_users.findUnique({
      where: { id }
    });
  }
}

module.exports = new UserRepository();