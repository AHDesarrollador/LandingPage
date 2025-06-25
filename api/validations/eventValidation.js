const Joi = require('joi');

const eventValidationSchema = Joi.object({
  title: Joi.string()
    .required()
    .trim()
    .max(100)
    .messages({
      'string.empty': 'El título es obligatorio',
      'string.max': 'El título no puede exceder 100 caracteres',
      'any.required': 'El título es obligatorio'
    }),
  
  description: Joi.string()
    .trim()
    .max(500)
    .allow('')
    .messages({
      'string.max': 'La descripción no puede exceder 500 caracteres'
    }),
  
  startDate: Joi.date()
    .required()
    .messages({
      'date.base': 'La fecha de inicio debe ser una fecha válida',
      'any.required': 'La fecha de inicio es obligatoria'
    }),
  
  endDate: Joi.date()
    .required()
    .greater(Joi.ref('startDate'))
    .messages({
      'date.base': 'La fecha de fin debe ser una fecha válida',
      'date.greater': 'La fecha de fin debe ser posterior a la fecha de inicio',
      'any.required': 'La fecha de fin es obligatoria'
    }),
  
  location: Joi.string()
    .trim()
    .max(100)
    .allow('')
    .messages({
      'string.max': 'La ubicación no puede exceder 100 caracteres'
    }),
  
  category: Joi.string()
    .valid('trabajo', 'personal', 'reunión', 'cita', 'recordatorio', 'otro')
    .default('otro')
    .messages({
      'any.only': 'La categoría debe ser: trabajo, personal, reunión, cita, recordatorio u otro'
    }),
  
  priority: Joi.string()
    .valid('baja', 'media', 'alta')
    .default('media')
    .messages({
      'any.only': 'La prioridad debe ser: baja, media o alta'
    }),
  
  isAllDay: Joi.boolean()
    .default(false),
  
  attendees: Joi.array()
    .items(Joi.string().trim())
    .default([]),
  
  status: Joi.string()
    .valid('pendiente', 'confirmado', 'cancelado', 'completado')
    .default('pendiente')
    .messages({
      'any.only': 'El estado debe ser: pendiente, confirmado, cancelado o completado'
    })
});

const validateEvent = (eventData) => {
  return eventValidationSchema.validate(eventData, { abortEarly: false });
};

const eventUpdateValidationSchema = eventValidationSchema.fork([
  'title',
  'startDate', 
  'endDate'
], (schema) => schema.optional());

const validateEventUpdate = (eventData) => {
  return eventUpdateValidationSchema.validate(eventData, { abortEarly: false });
};

module.exports = {
  validateEvent,
  validateEventUpdate
};