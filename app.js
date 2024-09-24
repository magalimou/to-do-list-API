const express = require('express');
const dotenv = require('dotenv');
const usuarioRoutes = require('./src/routes/usuarioRoutes')

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Para manejar JSON en las solicitudes

// Rutas
app.use('/usuario', usuarioRoutes);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
