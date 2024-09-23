const express = require('express');
const dotenv = require('dotenv');
const db = require('./src/db');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Para manejar JSON en las solicitudes

// Rutas
app.get('/db-test', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT 1 + 1 AS solution');
      res.json({ message: `La solución es: ${rows[0].solution}` });
    } catch (error) {
      console.error('Error en la conexión a la base de datos:', error);
      res.status(500).json({ error: 'Error en la conexión a la base de datos' });
    }
});

app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
