# TodoApp Backend

Backend desarrollado con Spring Boot que expone una API REST para gestionar usuarios y sus tareas pendientes.

## Tabla de contenidos

1. [Arquitectura general](#arquitectura-general)
2. [Stack tecnológico](#stack-tecnológico)
3. [Modelo de datos](#modelo-de-datos)
4. [Endpoints principales](#endpoints-principales)
5. [Manejo de errores](#manejo-de-errores)
6. [Configuración y variables](#configuración-y-variables)
7. [Ejecución local](#ejecución-local)
8. [Estrategia de pruebas](#estrategia-de-pruebas)

## Arquitectura general

La aplicación sigue una arquitectura en capas:

- **Controller** (`com.example.todoApp.controller`): expone los endpoints REST para autenticación y operaciones CRUD sobre tareas.
- **Service** (`com.example.todoApp.service`): implementa la lógica de negocio y las validaciones de pertenencia de tareas a usuarios.
- **Repository** (`com.example.todoApp.repository`): capa de acceso a datos basada en Spring Data JPA.
- **Modelos** (`com.example.todoApp.model`): entidades JPA que representan usuarios y tareas.
- **DTOs** (`com.example.todoApp.dto`): objetos de transferencia usados en las peticiones y respuestas.
- **Configuración global** (`com.example.todoApp.config`): manejo centralizado de excepciones y formato de respuestas de error.

## Stack tecnológico

- Java 17
- Spring Boot 3.5.6 (web, data-jpa, validation)
- H2 Database (en memoria, para desarrollo)
- Lombok para reducir código repetitivo
- Gradle como sistema de construcción

## Modelo de datos

### UserModel

- `id` (`Long`): identificador generado con estrategia `SEQUENCE`.
- `email` (`String`): único por usuario.
- `password` (`String`): contraseña persistida usando hash BCrypt.
- `taskSet` (`Set<TaskModel>`): relación uno-a-muchos con tareas.

### TaskModel

- `id` (`Long`): identificador generado con `SEQUENCE`.
- `status` (`Boolean`): estado de la tarea (realizada o pendiente).
- `task` (`String`): descripción de la tarea.
- `user` (`UserModel`): relación muchos-a-uno con el usuario propietario.

## Endpoints principales

Base URL por defecto: `http://localhost:8080`

### Autenticación (`/auth`)

| Método | Ruta                  | Descripción                           | Cuerpo esperado |
|--------|-----------------------|---------------------------------------|-----------------|
| POST   | `/auth/register`      | Crea un usuario nuevo si el email no existe. | `RegisterRequest { email, password }`
| POST   | `/auth/authentication`| Valida credenciales y retorna el `userId`.      | `LoginRequest { email, password }`

### Tareas (`/task`)

| Método | Ruta                        | Descripción                                      | Cuerpo esperado |
|--------|-----------------------------|--------------------------------------------------|-----------------|
| POST   | `/task/{userId}`            | Crea una tarea asociada al `userId`.             | `TaskDTO { task, status }`
| GET    | `/task/{userId}`            | Lista todas las tareas del usuario.              | — |
| GET    | `/task/{userId}/{taskId}`   | Obtiene el detalle de una tarea específica.      | — |
| PATCH  | `/task/{userId}`            | Actualiza parcialmente una tarea (id requerido). | `TaskDTO { id, task?, status? }`
| DELETE | `/task/{userId}/{taskId}`   | Elimina una tarea si pertenece al usuario.       | — |

## Manejo de errores

- **`ApiException`**: excepción controlada para errores de negocio. Produce respuesta con campos `timestamp`, `status`, `error`, `message` y `path`.
- **Errores de validación** (`MethodArgumentNotValidException`): devuelven estado `400` y un mapa `messages` con los campos inválidos.

## Configuración y variables

El archivo `src/main/resources/application.yml` define una base H2 en memoria:

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    username: sa
    password: password
```

Al iniciar el proyecto se recrea el esquema automáticamente (`spring.jpa.hibernate.ddl-auto=create`). Durante desarrollo puedes habilitar la consola H2 cambiando `spring.h2.console.enabled` a `true`.

## Ejecución local

1. **Requisitos previos**
   - JDK 17 instalado.
   - Acceso al wrapper de Gradle incluido (`gradlew` o `gradlew.bat`).

2. **Instalar dependencias y compilar**

   ```bash
   ./gradlew clean build
   ```

3. **Ejecutar la aplicación**

   ```bash
   ./gradlew bootRun
   ```

   La API quedará disponible en `http://localhost:8080`.

## Estrategia de pruebas

- Prueba de contexto (`TodoAppApplicationTests`) para verificar el arranque de Spring Boot.
- Para ejecutar todas las pruebas automatizadas:

  ```bash
  ./gradlew test
  ```
