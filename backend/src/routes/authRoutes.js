const express = require('express');
const authController = require('../controllers/authController');
const validate = require('../middlewares/validationMiddleware');
const { registerValidator, loginValidator, refreshValidator } = require('../validators/authValidator');

const router = express.Router();

router.post('/register', validate(registerValidator), authController.register);
router.post('/login', validate(loginValidator), authController.login);
router.post('/refresh', validate(refreshValidator), authController.refresh);
router.post('/logout', validate(refreshValidator), authController.logout);

module.exports = router;