const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.registerUser = async (req, res) => {
    const { email, password, firstName, lastName, motherLastName, phone } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ 
            email, 
            password: hashedPassword,
            firstName,
            lastName,
            motherLastName,
            phone
        });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering user' });
    }
};

// Inicio de sesión
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Crear el token JWT usando la clave secreta
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error logging in user' });
    }
};

// Obtener datos del usuario
exports.getUserData = async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password'] } // No devolver la contraseña
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: 'Invalid Token' });
    }
};

// Actualizar datos del usuario
exports.updateUserData = async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    const { firstName, lastName, motherLastName, phone, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (newPassword) {
            user.password = await bcrypt.hash(newPassword, 10); // Actualiza la contraseña si se proporciona
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.motherLastName = motherLastName || user.motherLastName;
        user.phone = phone || user.phone;

        await user.save();
        res.json({ message: 'User profile updated successfully', user });
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: 'Invalid Token' });
    }
};
