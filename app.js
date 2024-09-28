const express = require('express');
const dotenv = require('dotenv');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const proyectoRoutes = require('./src/routes/proyectoRoutes');
const categoriaRoutes = require('./src/routes/categoriaRoutes');
const tareaRoutes = require('./src/routes/tareaRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); 

// Rutas
app.use('/usuarios', usuarioRoutes);
app.use('/proyectos', proyectoRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/tareas', tareaRoutes);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
