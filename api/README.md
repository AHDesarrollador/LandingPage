# API de Gestión de Eventos/Calendario

Una API RESTful completa para gestionar eventos y calendarios, construida con Node.js, Express y MongoDB.

## 🚀 Características

- ✅ **CRUD completo** para eventos (Crear, Leer, Actualizar, Eliminar)
- 📅 **Filtros avanzados** por fecha, categoría y estado
- ✨ **Validaciones robustas** con Joi
- 📊 **Paginación** automática
- 🔍 **Búsqueda** por múltiples criterios
- 📱 **CORS** configurado para frontend
- 🛡️ **Manejo de errores** centralizado

## 📋 Tecnologías Utilizadas

- **Node.js** - Servidor backend
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Joi** - Validación de esquemas
- **Day.js** - Manejo de fechas
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Variables de entorno

## 🛠️ Instalación

1. **Instalar dependencias:**
   ```bash
   cd api
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` con tus datos:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://TuUsuario:password@cluster.mongodb.net/TuBDD
   NODE_ENV=development
   ```

3. **Iniciar el servidor:**
   ```bash
   # Desarrollo (con nodemon)
   npm run dev
   
   # Producción
   npm start
   ```

## 📚 Endpoints de la API

### Base URL: `http://localhost:5000/api`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Estado de la API |
| POST | `/events` | Crear nuevo evento |
| GET | `/events` | Obtener todos los eventos |
| GET | `/events/today` | Eventos de hoy |
| GET | `/events/:id` | Obtener evento por ID |
| PUT | `/events/:id` | Actualizar evento |
| DELETE | `/events/:id` | Eliminar evento |

### 📝 Ejemplos de Uso

#### Crear Evento
```bash
POST /api/events
Content-Type: application/json

{
  "title": "Reunión de equipo",
  "description": "Reunión semanal del equipo de desarrollo",
  "startDate": "2024-01-15T10:00:00Z",
  "endDate": "2024-01-15T11:00:00Z",
  "location": "Sala de conferencias",
  "category": "trabajo",
  "priority": "alta",
  "attendees": ["juan@email.com", "maria@email.com"]
}
```

#### Obtener Eventos con Filtros
```bash
GET /api/events?startDate=2024-01-01&endDate=2024-01-31&category=trabajo&page=1&limit=10
```

#### Actualizar Evento
```bash
PUT /api/events/60d5ecb54b24a12f8c8e4b2a
Content-Type: application/json

{
  "title": "Reunión de equipo - ACTUALIZADA",
  "status": "confirmado"
}
```

## 📊 Estructura del Evento

```javascript
{
  "_id": "ObjectId",
  "title": "String (requerido, máx 100 caracteres)",
  "description": "String (máx 500 caracteres)",
  "startDate": "Date (requerido)",
  "endDate": "Date (requerido, posterior a startDate)",
  "location": "String (máx 100 caracteres)",
  "category": "String (trabajo|personal|reunión|cita|recordatorio|otro)",
  "priority": "String (baja|media|alta)",
  "isAllDay": "Boolean",
  "attendees": ["String"],
  "status": "String (pendiente|confirmado|cancelado|completado)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## 🔍 Filtros Disponibles

- **startDate**: Fecha de inicio (formato ISO)
- **endDate**: Fecha de fin (formato ISO)
- **category**: Categoría del evento
- **status**: Estado del evento
- **page**: Número de página (paginación)
- **limit**: Elementos por página (default: 10)

## ⚡ Respuestas de la API

### Respuesta Exitosa
```json
{
  "success": true,
  "message": "Evento creado exitosamente",
  "data": { ... }
}
```

### Respuesta con Error
```json
{
  "success": false,
  "message": "Error de validación",
  "errors": ["El título es obligatorio"]
}
```

## 🧪 Testing

Puedes probar la API usando:

1. **Postman** - Importa la colección de endpoints
2. **cURL** - Comandos de línea
3. **Thunder Client** - Extensión de VS Code
4. **Frontend React** - Interfaz visual (incluida)

## 🔧 Configuración de MongoDB Atlas

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un nuevo cluster
3. Configura un usuario de base de datos
4. Obtén la cadena de conexión
5. Reemplaza en el archivo `.env`

## 🚦 Estados del Servidor

- **Desarrollo**: `http://localhost:5000`
- **Health Check**: `http://localhost:5000/api/health`

## 📄 Licencia

MIT License - puedes usar este código libremente.
