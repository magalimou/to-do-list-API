const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const proyectoRoutes = require('./src/routes/proyectoRoutes');
const tareaRoutes = require('./src/routes/tareaRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); 
app.use(cors());

// Rutas
app.use('/usuarios', usuarioRoutes);
app.use('/proyectos', proyectoRoutes);
app.use('/tareas', tareaRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de To-Do List version2!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
