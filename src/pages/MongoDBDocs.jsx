import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/MongoDBDocs.css';

function MongoDBDocs() {
  const titleRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Scroll al inicio
    window.scrollTo(0, 0);

    // Animaciones iniciales
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Animar secciones
    gsap.fromTo(sectionsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  const addToSectionsRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="mongodb-docs-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 ref={titleRef} className="hero-title">
            <span className="gradient-text">MongoDB</span> Atlas Setup
          </h1>
          <p className="hero-subtitle">
            Guía completa para configurar MongoDB Atlas y conectar tu API de Node.js
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content">
        <div className="container">
          
          {/* Índice */}
          <div ref={addToSectionsRef} className="table-of-contents">
            <h2>📋 Contenido</h2>
            <ul>
              <li><a href="#create-account">1. Crear cuenta en MongoDB Atlas</a></li>
              <li><a href="#create-cluster">2. Crear un Cluster</a></li>
              <li><a href="#database-setup">3. Configurar base de datos</a></li>
              <li><a href="#connection-string">4. Obtener cadena de conexión</a></li>
              <li><a href="#api-connection">5. Conectar con la API</a></li>
              <li><a href="#security">6. Configuración de seguridad</a></li>
              <li><a href="#troubleshooting">7. Solución de problemas</a></li>
            </ul>
          </div>

          {/* Sección 1: Crear cuenta */}
          <div ref={addToSectionsRef} id="create-account" className="doc-section">
            <h2>🚀 1. Crear cuenta en MongoDB Atlas</h2>
            <div className="step">
              <h3>Paso 1: Registro</h3>
              <ol>
                <li>Ve a <a href="https://www.mongodb.com/cloud/atlas" target="_blank" rel="noopener noreferrer">MongoDB Atlas</a></li>
                <li>Click en "Try Free" o "Start Free"</li>
                <li>Completa el formulario de registro con tu email</li>
                <li>Verifica tu email</li>
              </ol>
              <div className="code-block">
                <pre>
{`✅ Email verificado
✅ Cuenta creada exitosamente
✅ Listo para crear tu primer cluster`}
                </pre>
              </div>
            </div>
          </div>

          {/* Sección 2: Crear Cluster */}
          <div ref={addToSectionsRef} id="create-cluster" className="doc-section">
            <h2>🏗️ 2. Crear un Cluster</h2>
            <div className="step">
              <h3>Configuración recomendada (GRATIS)</h3>
              <ul>
                <li><strong>Cloud Provider:</strong> AWS, Google Cloud, o Azure</li>
                <li><strong>Region:</strong> Selecciona la más cercana a tu ubicación</li>
                <li><strong>Cluster Tier:</strong> M0 Sandbox (GRATIS)</li>
                <li><strong>Cluster Name:</strong> Por ejemplo: "Cluster0"</li>
              </ul>
              
              <div className="warning-box">
                <h4>⚠️ Importante</h4>
                <p>El tier M0 es completamente gratuito y perfecto para desarrollo. Incluye:</p>
                <ul>
                  <li>512 MB de almacenamiento</li>
                  <li>Compartido entre múltiples usuarios</li>
                  <li>Sin tiempo límite</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sección 3: Base de datos */}
          <div ref={addToSectionsRef} id="database-setup" className="doc-section">
            <h2>🗄️ 3. Configurar base de datos</h2>
            <div className="step">
              <h3>Crear database y collections</h3>
              <p>Para nuestra API de eventos necesitaremos:</p>
              
              <div className="code-block">
                <h4>Estructura de la base de datos:</h4>
                <pre>
{`📦 events_calendar (Database)
 └── 📄 events (Collection)
     ├── _id: ObjectId
     ├── title: String
     ├── description: String
     ├── startDate: Date
     ├── endDate: Date
     ├── location: String
     ├── category: String
     ├── priority: String
     ├── status: String
     ├── isAllDay: Boolean
     ├── attendees: Array
     ├── createdAt: Date
     └── updatedAt: Date`}
                </pre>
              </div>

              <div className="info-box">
                <h4>💡 Nota</h4>
                <p>MongoDB y Mongoose crearán automáticamente la database y collection cuando insertes el primer documento. No necesitas crearlas manualmente.</p>
              </div>
            </div>
          </div>

          {/* Sección 4: Connection String */}
          <div ref={addToSectionsRef} id="connection-string" className="doc-section">
            <h2>🔗 4. Obtener cadena de conexión</h2>
            <div className="step">
              <h3>Pasos para obtener la URI de conexión:</h3>
              <ol>
                <li>En tu cluster, click en "Connect"</li>
                <li>Selecciona "Connect your application"</li>
                <li>Elige "Node.js" como driver</li>
                <li>Copia la connection string</li>
              </ol>

              <div className="code-block">
                <h4>Formato de la cadena de conexión:</h4>
                <pre>
{`mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`}
                </pre>
              </div>

              <div className="code-block">
                <h4>Para nuestra API (con database específica):</h4>
                <pre>
{`mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/events_calendar?retryWrites=true&w=majority`}
                </pre>
              </div>
            </div>
          </div>

          {/* Sección 5: API Connection */}
          <div ref={addToSectionsRef} id="api-connection" className="doc-section">
            <h2>⚙️ 5. Conectar con la API</h2>
            <div className="step">
              <h3>Configuración en tu proyecto Node.js</h3>
              
              <div className="code-block">
                <h4>📄 Archivo .env</h4>
                <pre>
{`# Configuración del servidor
PORT=5001

# MongoDB Atlas connection string
MONGODB_URI=Enlace de mongo DB ATLAS con usuario y contraseña

# Entorno de desarrollo
NODE_ENV=development`}
                </pre>
              </div>

              <div className="code-block">
                <h4>📄 config/database.js</h4>
                <pre>
{`const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(\`MongoDB conectado: \${conn.connection.host}\`);
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;`}
                </pre>
              </div>

              <div className="code-block">
                <h4>📄 server.js</h4>
                <pre>
{`const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(\`Servidor ejecutándose en puerto \${PORT}\`);
});`}
                </pre>
              </div>
            </div>
          </div>

          {/* Sección 6: Seguridad */}
          <div ref={addToSectionsRef} id="security" className="doc-section">
            <h2>🔐 6. Configuración de seguridad</h2>
            <div className="step">
              <h3>Configurar acceso a la base de datos</h3>
              
              <h4>A. Crear usuario de base de datos:</h4>
              <ol>
                <li>Ve a "Database Access" en el sidebar</li>
                <li>Click "Add New Database User"</li>
                <li>Selecciona "Password" como método de autenticación</li>
                <li>Crea un username y password seguros</li>
                <li>Asigna el rol "Read and write to any database"</li>
              </ol>

              <h4>B. Configurar Network Access:</h4>
              <ol>
                <li>Ve a "Network Access" en el sidebar</li>
                <li>Click "Add IP Address"</li>
                <li>Para desarrollo: selecciona "Allow Access from Anywhere" (0.0.0.0/0)</li>
                <li>Para producción: agrega solo las IPs específicas de tu servidor</li>
              </ol>

              <div className="warning-box">
                <h4>⚠️ Seguridad en Producción</h4>
                <ul>
                  <li>Nunca hardcodees credenciales en tu código</li>
                  <li>Usa variables de entorno (.env)</li>
                  <li>Restringe el acceso por IP en producción</li>
                  <li>Usa usuarios con permisos mínimos necesarios</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sección 7: Troubleshooting */}
          <div ref={addToSectionsRef} id="troubleshooting" className="doc-section">
            <h2>🛠️ 7. Solución de problemas</h2>
            <div className="step">
              <h3>Problemas comunes y soluciones</h3>
              
              <div className="problem-solution">
                <h4>❌ Error: "MongoNetworkError"</h4>
                <p><strong>Causa:</strong> IP no autorizada o configuración de red</p>
                <p><strong>Solución:</strong></p>
                <ul>
                  <li>Verifica que tu IP esté en Network Access</li>
                  <li>Temporalmente permite 0.0.0.0/0 para pruebas</li>
                  <li>Verifica tu conexión a internet</li>
                </ul>
              </div>

              <div className="problem-solution">
                <h4>❌ Error: "Authentication failed"</h4>
                <p><strong>Causa:</strong> Credenciales incorrectas</p>
                <p><strong>Solución:</strong></p>
                <ul>
                  <li>Verifica username y password en la URI</li>
                  <li>Asegúrate de que el usuario tenga permisos</li>
                  <li>Escapa caracteres especiales en la password</li>
                </ul>
              </div>

              <div className="problem-solution">
                <h4>❌ Error: "Connection timeout"</h4>
                <p><strong>Causa:</strong> Problemas de conectividad</p>
                <p><strong>Solución:</strong></p>
                <ul>
                  <li>Verifica la cadena de conexión</li>
                  <li>Comprueba que el cluster esté activo</li>
                  <li>Intenta con diferentes regiones</li>
                </ul>
              </div>

              <div className="code-block">
                <h4>🧪 Test de conexión</h4>
                <pre>
{`// Agregar al final de config/database.js para testing
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Error de conexión MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose desconectado de MongoDB');
});`}
                </pre>
              </div>
            </div>
          </div>

          {/* Comandos útiles */}
          <div ref={addToSectionsRef} className="doc-section">
            <h2>📋 Comandos útiles</h2>
            <div className="step">
              <div className="code-block">
                <h4>Comandos para development:</h4>
                <pre>
{`# Instalar dependencias
npm install mongoose dotenv

# Iniciar servidor de desarrollo
npm run dev

# Ver logs de conexión
npm start

# Verificar variables de entorno
echo $MONGODB_URI

# Test de conexión desde terminal
curl http://localhost:5001/api/health`}
                </pre>
              </div>
            </div>
          </div>

          {/* Enlaces útiles */}
          <div ref={addToSectionsRef} className="doc-section">
            <h2>🔗 Enlaces útiles</h2>
            <div className="step">
              <div className="links-grid">
                <a href="https://cloud.mongodb.com/" target="_blank" rel="noopener noreferrer" className="link-card">
                  <h4>MongoDB Atlas</h4>
                  <p>Plataforma cloud de MongoDB</p>
                </a>
                <a href="https://docs.mongodb.com/manual/" target="_blank" rel="noopener noreferrer" className="link-card">
                  <h4>MongoDB Docs</h4>
                  <p>Documentación oficial</p>
                </a>
                <a href="https://mongoosejs.com/" target="_blank" rel="noopener noreferrer" className="link-card">
                  <h4>Mongoose</h4>
                  <p>ODM para MongoDB y Node.js</p>
                </a>
                <a href="https://docs.mongodb.com/compass/" target="_blank" rel="noopener noreferrer" className="link-card">
                  <h4>MongoDB Compass</h4>
                  <p>GUI para explorar datos</p>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default MongoDBDocs;
