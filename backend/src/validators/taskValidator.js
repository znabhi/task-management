const { body } = require('express-validator');

const createTaskValidator = [
  body('title')
    .notEmpty()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Title is required and must be less than 255 characters'),
  body('description')
    .optional()
    .trim(),
  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Status must be either pending or completed')
];

const updateTaskValidator = [
  body('title')
    .optional()
    .notEmpty()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Title must be less than 255 characters'),
  body('description')
    .optional()
    .trim(),
  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Status must be either pending or completed')
];

module.exports = {
  createTaskValidator,
  updateTaskValidator
};