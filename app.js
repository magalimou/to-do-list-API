const express = require('express');
const dotenv = require('dotenv');
const usuarioRoutes = require('./src/routes/usuarioRoutes')
const proyectoRoutes = require('./src/routes/proyectoRoutes')

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Para manejar JSON en las solicitudes

// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/proyecto', proyectoRoutes);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
