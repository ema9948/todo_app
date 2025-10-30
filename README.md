# TodoApp - Sistema Completo de Gestión de Tareas

Aplicación full-stack para gestión de usuarios y tareas.

## 🏗️ Arquitectura
TodoApp/
├── backend/ (Spring Boot - Puerto 8080)
└── frontend/ (React + Vite - Puerto 5173)

## 📋 Stack Tecnológico
### Backend
- Java 17 + Spring Boot 3.5.6
- Spring Data JPA + H2 Database
- Gradle + Lombok
- BCrypt para passwords

### Frontend
- React 18.x + Vite
- Tailwind CSS 3.4.17
- React Router DOM 6.x
- Axios 1.x

## 🗄️ Modelo de Datos
### UserModel
- id (Long) - Identificador
- email (String) - Único
- password (String) - Hash BCrypt
- taskSet (Set<TaskModel>) - Tareas

### TaskModel
- id (Long) - Identificador
- status (Boolean) - Estado
- task (String) - Descripción
- user (UserModel) - Propietario

## 🔌 API Endpoints
### Autenticación
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /auth/register | Registrar usuario |
| POST | /auth/authentication | Login |

### Tareas
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /task/{userId} | Listar tareas |
| POST | /task/{userId} | Crear tarea |
| GET | /task/{userId}/{taskId} | Obtener tarea |
| PATCH | /task/{userId} | Actualizar tarea |
| DELETE | /task/{userId}/{taskId} | Eliminar tarea |

## 🎯 Funcionalidades Frontend
- Registro e inicio de sesión
- CRUD completo de tareas
- Diseño responsivo con Tailwind
- Rutas protegidas
- Estado local con hooks React

## 🚀 Ejecución
### Backend
cd backend
./gradlew bootRun

### Frontend
cd frontend
npm install
npm run dev

## 📁 Estructura de Proyectos
### Backend
src/
├── controller/
├── service/
├── repository/
├── model/
└── config/

### Frontend
src/
├── components/
├── pages/
├── services/
├── utils/
└── hooks/

## ⚙️ Configuración
### Backend (application.yml)
spring:
  datasource:
    url: jdbc:h2:mem:testdb
  jpa:
    hibernate:
      ddl-auto: create

### Frontend (.env)
VITE_API_BASE=http://localhost:8080
VITE_APP_NAME=TodoApp

---

**Desarrollado con ❤️ - 2025-10-30**
