const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserData, updateUserData } = require('../controllers/userController');

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.get('/me', getUserData); // Ruta para obtener los datos del usuario
router.put('/me', updateUserData); // Ruta para actualizar los datos del usuario

module.exports = router;
