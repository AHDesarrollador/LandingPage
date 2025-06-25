const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const eventRoutes = require('./routes/eventRoutes');

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tu-dominio.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'], // Vite y Create React App
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas principales
app.use('/api/events', eventRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API de Gestión de Eventos funcionando correctamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: '🎉 API de Gestión de Eventos/Calendario',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      events: '/api/events',
      todayEvents: '/api/events/today'
    },
    documentation: {
      postman: 'Importa la colección de Postman para probar los endpoints',
      swagger: 'En desarrollo'
    }
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    path: req.originalUrl
  });
});

// Middleware para manejo de errores
app.use((error, req, res, next) => {
  console.error('Error capturado:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
🚀 Servidor ejecutándose en puerto ${PORT}
🌍 Entorno: ${process.env.NODE_ENV || 'development'}
📊 API Base URL: http://localhost:${PORT}
📝 Health Check: http://localhost:${PORT}/api/health
📅 Events API: http://localhost:${PORT}/api/events
  `);
});

module.exports = app;