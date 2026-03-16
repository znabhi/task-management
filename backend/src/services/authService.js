const userRepository = require('../repositories/userRepository');
const refreshTokenRepository = require('../repositories/refreshTokenRepository');
const { hashPassword, comparePassword } = require('../utils/hashUtils');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwtUtils');

class AuthService {
  async register(email, password) {
    // Check if user exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await userRepository.create({
      email,
      password: hashedPassword
    });

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Calculate expiry date (7 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Store refresh token
    await refreshTokenRepository.create(user.id, refreshToken, expiresAt);

    return { accessToken, refreshToken, user: { id: user.id, email: user.email } };
  }

  async login(email, password) {
    // Find user
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Calculate expiry date (7 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Delete old refresh tokens and store new one
    await refreshTokenRepository.deleteByUserId(user.id);
    await refreshTokenRepository.create(user.id, refreshToken, expiresAt);

    return { accessToken, refreshToken, user: { id: user.id, email: user.email } };
  }

  async refresh(refreshToken) {
    // Verify token
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new Error('Invalid refresh token');
    }

    // Check if token exists in database
    const storedToken = await refreshTokenRepository.findByToken(refreshToken);
    if (!storedToken) {
      throw new Error('Refresh token not found');
    }

    // Check if token is expired
    if (new Date() > storedToken.expires_at) {
      await refreshTokenRepository.deleteByToken(refreshToken);
      throw new Error('Refresh token expired');
    }

    // Generate new access token
    const accessToken = generateAccessToken(decoded.userId);

    return { accessToken };
  }

  async logout(refreshToken) {
    await refreshTokenRepository.deleteByToken(refreshToken);
  }
}

module.exports = new AuthService();