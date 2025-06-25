const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxlength: [100, 'El título no puede exceder 100 caracteres']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  startDate: {
    type: Date,
    required: [true, 'La fecha de inicio es obligatoria']
  },
  endDate: {
    type: Date,
    required: [true, 'La fecha de fin es obligatoria'],
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'La fecha de fin debe ser posterior a la fecha de inicio'
    }
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'La ubicación no puede exceder 100 caracteres']
  },
  category: {
    type: String,
    enum: ['trabajo', 'personal', 'reunión', 'cita', 'recordatorio', 'otro'],
    default: 'otro'
  },
  priority: {
    type: String,
    enum: ['baja', 'media', 'alta'],
    default: 'media'
  },
  isAllDay: {
    type: Boolean,
    default: false
  },
  attendees: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['pendiente', 'confirmado', 'cancelado', 'completado'],
    default: 'pendiente'
  }
}, {
  timestamps: true
});

// Índices para mejorar consultas
eventSchema.index({ startDate: 1 });
eventSchema.index({ endDate: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ status: 1 });

module.exports = mongoose.model('Event', eventSchema);