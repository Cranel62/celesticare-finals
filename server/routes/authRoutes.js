const express = require('express');
const router = express.Router();
const { register, verifyEmail, login } = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, register); // Apply brute-force protection[cite: 10]
router.get('/verify/:token', verifyEmail);
router.post('/login', authLimiter, login); 

module.exports = router;