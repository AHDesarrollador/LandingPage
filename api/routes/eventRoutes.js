const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getTodayEvents
} = require('../controllers/eventController');

// Rutas para eventos
router.post('/', createEvent);           // POST /api/events - Crear evento
router.get('/', getEvents);              // GET /api/events - Obtener todos los eventos (con filtros opcionales)
router.get('/today', getTodayEvents);    // GET /api/events/today - Eventos de hoy
router.get('/:id', getEventById);        // GET /api/events/:id - Obtener evento por ID
router.put('/:id', updateEvent);         // PUT /api/events/:id - Actualizar evento
router.delete('/:id', deleteEvent);      // DELETE /api/events/:id - Eliminar evento

module.exports = router;