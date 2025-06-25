import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/NodejsAPI.css';

function NodejsAPI() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    startDate: '',
    endDate: ''
  });

  const titleRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    category: 'otro',
    priority: 'media',
    status: 'pendiente',
    isAllDay: false,
    attendees: []
  });

  const [apiStatus, setApiStatus] = useState({
    connected: false,
    message: 'Verificando conexión...'
  });

  useEffect(() => {
    // Scroll al inicio
    window.scrollTo(0, 0);

    // Animaciones iniciales
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(statsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 }
    );

    // Verificar estado de la API y cargar eventos
    checkApiStatus();
    fetchEvents();
  }, []);

  const checkApiStatus = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/health');
      if (response.ok) {
        setApiStatus({
          connected: true,
          message: 'API conectada y funcionando'
        });
      } else {
        throw new Error('API no responde');
      }
    } catch (error) {
      setApiStatus({
        connected: false,
        message: 'API no disponible. Asegúrate de que el servidor esté ejecutándose en puerto 5000'
      });
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:5001/api/events?';
      
      // Agregar filtros a la URL
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          url += `${key}=${filters[key]}&`;
        }
      });

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setEvents(data.data);
        // Animar tarjetas cuando se cargan
        gsap.fromTo(cardsRef.current,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
        );
      }
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingEvent 
        ? `http://localhost:5001/api/events/${editingEvent._id}`
        : 'http://localhost:5001/api/events';
        
      const method = editingEvent ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        setShowForm(false);
        setEditingEvent(null);
        resetForm();
        fetchEvents();
        
        // Mostrar notificación de éxito
        showNotification(editingEvent ? 'Evento actualizado' : 'Evento creado', 'success');
      } else {
        showNotification(data.message || 'Error al guardar evento', 'error');
      }
    } catch (error) {
      showNotification('Error de conexión', 'error');
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      startDate: new Date(event.startDate).toISOString().slice(0, 16),
      endDate: new Date(event.endDate).toISOString().slice(0, 16),
      location: event.location || '',
      category: event.category,
      priority: event.priority,
      status: event.status,
      isAllDay: event.isAllDay,
      attendees: event.attendees
    });
    setShowForm(true);
  };

  const handleDelete = async (eventId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este evento?')) return;
    
    try {
      const response = await fetch(`http://localhost:5001/api/events/${eventId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      
      if (data.success) {
        fetchEvents();
        showNotification('Evento eliminado', 'success');
      } else {
        showNotification(data.message || 'Error al eliminar evento', 'error');
      }
    } catch (error) {
      showNotification('Error de conexión', 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      category: 'otro',
      priority: 'media',
      status: 'pendiente',
      isAllDay: false,
      attendees: []
    });
  };

  const showNotification = (message, type) => {
    // Implementación simple de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 2rem;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      z-index: 1000;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
    `;
    
    document.body.appendChild(notification);
    
    gsap.fromTo(notification,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );

    setTimeout(() => {
      gsap.to(notification, {
        x: 100,
        opacity: 0,
        duration: 0.3,
        onComplete: () => notification.remove()
      });
    }, 3000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      trabajo: '#3b82f6',
      personal: '#10b981',
      reunión: '#f59e0b',
      cita: '#ef4444',
      recordatorio: '#8b5cf6',
      otro: '#6b7280'
    };
    return colors[category] || colors.otro;
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      baja: '🟢',
      media: '🟡',
      alta: '🔴'
    };
    return icons[priority] || icons.media;
  };

  return (
    <div className="nodejs-api-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 ref={titleRef} className="hero-title">
            <span className="gradient-text">Node.js</span> Events API
          </h1>
          <p className="hero-subtitle">
            API completa para gestión de eventos con Node.js, Express y MongoDB
          </p>
          
          <div ref={statsRef} className="api-status">
            <div className={`status-indicator ${apiStatus.connected ? 'connected' : 'disconnected'}`}>
              <span className="status-dot"></span>
              {apiStatus.message}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content">
        <div className="container">
          {/* Controls */}
          <div className="controls-section">
            <button 
              className="btn-primary"
              onClick={() => {
                setShowForm(!showForm);
                setEditingEvent(null);
                resetForm();
              }}
            >
              {showForm ? 'Cancelar' : '+ Nuevo Evento'}
            </button>

            <div className="filters">
              <select 
                value={filters.category} 
                onChange={(e) => setFilters({...filters, category: e.target.value})}
              >
                <option value="">Todas las categorías</option>
                <option value="trabajo">Trabajo</option>
                <option value="personal">Personal</option>
                <option value="reunión">Reunión</option>
                <option value="cita">Cita</option>
                <option value="recordatorio">Recordatorio</option>
                <option value="otro">Otro</option>
              </select>

              <select 
                value={filters.status} 
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="confirmado">Confirmado</option>
                <option value="cancelado">Cancelado</option>
                <option value="completado">Completado</option>
              </select>

              <button 
                className="btn-secondary"
                onClick={fetchEvents}
              >
                Filtrar
              </button>
            </div>
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>{editingEvent ? 'Editar Evento' : 'Nuevo Evento'}</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Título del evento"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <textarea
                      placeholder="Descripción"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows="3"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-col">
                      <label>Fecha inicio</label>
                      <input
                        type="datetime-local"
                        value={formData.startDate}
                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-col">
                      <label>Fecha fin</label>
                      <input
                        type="datetime-local"
                        value={formData.endDate}
                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Ubicación"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-col">
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        <option value="trabajo">Trabajo</option>
                        <option value="personal">Personal</option>
                        <option value="reunión">Reunión</option>
                        <option value="cita">Cita</option>
                        <option value="recordatorio">Recordatorio</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                    <div className="form-col">
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      >
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                      </select>
                    </div>
                    <div className="form-col">
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmado">Confirmado</option>
                        <option value="cancelado">Cancelado</option>
                        <option value="completado">Completado</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                      {editingEvent ? 'Actualizar' : 'Crear'} Evento
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Events List */}
          <div className="events-section">
            <h2>Eventos ({events.length})</h2>
            
            {loading ? (
              <div className="loading">Cargando eventos...</div>
            ) : events.length === 0 ? (
              <div className="empty-state">
                <h3>No hay eventos</h3>
                <p>Crea tu primer evento para comenzar</p>
              </div>
            ) : (
              <div className="events-grid">
                {events.map((event, index) => (
                  <div 
                    key={event._id} 
                    ref={el => cardsRef.current[index] = el}
                    className="event-card"
                    style={{ '--category-color': getCategoryColor(event.category) }}
                  >
                    <div className="event-header">
                      <h3>{event.title}</h3>
                      <div className="event-actions">
                        <button onClick={() => handleEdit(event)} className="btn-edit">
                          ✏️
                        </button>
                        <button onClick={() => handleDelete(event._id)} className="btn-delete">
                          🗑️
                        </button>
                      </div>
                    </div>
                    
                    {event.description && (
                      <p className="event-description">{event.description}</p>
                    )}
                    
                    <div className="event-details">
                      <div className="event-date">
                        📅 {formatDate(event.startDate)}
                      </div>
                      {event.location && (
                        <div className="event-location">
                          📍 {event.location}
                        </div>
                      )}
                    </div>
                    
                    <div className="event-meta">
                      <span className="event-category" style={{ backgroundColor: getCategoryColor(event.category) }}>
                        {event.category}
                      </span>
                      <span className="event-priority">
                        {getPriorityIcon(event.priority)} {event.priority}
                      </span>
                      <span className={`event-status status-${event.status}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* API Info */}
          <div className="api-info">
            <h2>Información de la API</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>🚀 Tecnologías</h3>
                <ul>
                  <li>Node.js + Express</li>
                  <li>MongoDB + Mongoose</li>
                  <li>Joi para validaciones</li>
                  <li>Day.js para fechas</li>
                </ul>
              </div>
              <div className="info-card">
                <h3>📋 Funcionalidades</h3>
                <ul>
                  <li>CRUD completo de eventos</li>
                  <li>Filtros por fecha y categoría</li>
                  <li>Validaciones robustas</li>
                  <li>Paginación automática</li>
                </ul>
              </div>
              <div className="info-card">
                <h3>🔗 Endpoints</h3>
                <ul>
                  <li>GET /api/events</li>
                  <li>POST /api/events</li>
                  <li>PUT /api/events/:id</li>
                  <li>DELETE /api/events/:id</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NodejsAPI;