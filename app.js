require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Conectar a la base de datos y empezar el servidor
sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log('Server running on http://localhost:4000');
    });
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});
