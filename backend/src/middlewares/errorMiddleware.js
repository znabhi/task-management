const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  // Handle known errors
  if (err.message) {
    // Authentication errors
    if (err.message.includes('Invalid credentials') || 
        err.message.includes('Invalid refresh token') ||
        err.message.includes('Refresh token not found') ||
        err.message.includes('Refresh token expired')) {
      return res.status(401).json({ message: err.message });
    }

    // User exists error
    if (err.message.includes('User already exists')) {
      return res.status(409).json({ message: err.message });
    }

    // Task errors
    if (err.message.includes('Task not found')) {
      return res.status(404).json({ message: err.message });
    }

    if (err.message.includes('Unauthorized access')) {
      return res.status(403).json({ message: err.message });
    }
  }

  // Default error
  return res.status(500).json({ 
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
};

module.exports = errorMiddleware;