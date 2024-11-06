const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/signup', registerUser); // Esta línea debe estar presente
router.post('/signin', loginUser);

module.exports = router;
