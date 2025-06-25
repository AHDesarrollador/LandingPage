const Event = require('../models/Event');
const { validateEvent, validateEventUpdate } = require('../validations/eventValidation');
const dayjs = require('dayjs');

// Crear un nuevo evento
const createEvent = async (req, res) => {
  try {
    const { error, value } = validateEvent(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: error.details.map(detail => detail.message)
      });
    }

    const event = new Event(value);
    await event.save();

    res.status(201).json({
      success: true,
      message: 'Evento creado exitosamente',
      data: event
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// Obtener todos los eventos o filtrados por fecha
const getEvents = async (req, res) => {
  try {
    const { 
      startDate, 
      endDate, 
      category, 
      status, 
      page = 1, 
      limit = 10 
    } = req.query;

    let filter = {};

    // Filtro por rango de fechas
    if (startDate || endDate) {
      filter.startDate = {};
      if (startDate) {
        filter.startDate.$gte = dayjs(startDate).startOf('day').toDate();
      }
      if (endDate) {
        filter.startDate.$lte = dayjs(endDate).endOf('day').toDate();
      }
    }

    // Filtros adicionales
    if (category) filter.category = category;
    if (status) filter.status = status;

    const options = {
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      sort: { startDate: 1 }
    };

    const events = await Event.find(filter, null, options);
    const total = await Event.countDocuments(filter);

    res.json({
      success: true,
      data: events,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalEvents: total,
        hasNextPage: parseInt(page) < Math.ceil(total / parseInt(limit)),
        hasPrevPage: parseInt(page) > 1
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener eventos',
      error: error.message
    });
  }
};

// Obtener un evento por ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }

    res.json({
      success: true,
      data: event
    });

  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de evento inválido'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al obtener el evento',
      error: error.message
    });
  }
};

// Actualizar un evento
const updateEvent = async (req, res) => {
  try {
    const { error, value } = validateEventUpdate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: error.details.map(detail => detail.message)
      });
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Evento actualizado exitosamente',
      data: event
    });

  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de evento inválido'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al actualizar el evento',
      error: error.message
    });
  }
};

// Eliminar un evento
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Evento eliminado exitosamente',
      data: event
    });

  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de evento inválido'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al eliminar el evento',
      error: error.message
    });
  }
};

// Obtener eventos de hoy
const getTodayEvents = async (req, res) => {
  try {
    const today = dayjs().startOf('day');
    const tomorrow = dayjs().add(1, 'day').startOf('day');

    const events = await Event.find({
      startDate: {
        $gte: today.toDate(),
        $lt: tomorrow.toDate()
      }
    }).sort({ startDate: 1 });

    res.json({
      success: true,
      message: `Eventos de hoy (${today.format('DD/MM/YYYY')})`,
      data: events,
      count: events.length
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener eventos de hoy',
      error: error.message
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getTodayEvents
};