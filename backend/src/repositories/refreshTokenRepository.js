const prisma = require('../config/database');

class RefreshTokenRepository {
  async create(userId, token, expiresAt) {
    return prisma.tbl_refresh_tokens.create({
      data: {
        user_id: userId,
        token,
        expires_at: expiresAt
      }
    });
  }

  async findByToken(token) {
    return prisma.tbl_refresh_tokens.findUnique({
      where: { token }
    });
  }

  async deleteByToken(token) {
    return prisma.tbl_refresh_tokens.delete({
      where: { token }
    });
  }

  async deleteByUserId(userId) {
    return prisma.tbl_refresh_tokens.deleteMany({
      where: { user_id: userId }
    });
  }
}

module.exports = new RefreshTokenRepository();