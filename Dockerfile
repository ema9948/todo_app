# Etapa 1: Backend
FROM eclipse-temurin:17-jdk-alpine AS backend-build

WORKDIR /app/backend

COPY backend/build.gradle backend/settings.gradle backend/gradlew ./
COPY backend/gradle/ backend/gradle/
COPY backend/src/ backend/src/

RUN ./gradlew build -x test

# Etapa 2: Frontend
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
COPY frontend/vite.config.js ./
COPY frontend/src/ src/
COPY frontend/public/ public/

RUN npm install
RUN npm run build

# Etapa 3: Servir todo junto con Nginx
FROM nginx:alpine

# Copiamos el frontend construido
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

# Copiamos el backend construido
COPY --from=backend-build /app/backend/build/libs/backend-0.0.1-SNAPSHOT.jar /app/backend.jar

# Configuración básica de Nginx para SPA
RUN rm /etc/nginx/conf.d/default.conf
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puertos
EXPOSE 80 8080

# Comando para ejecutar backend + nginx
CMD sh -c "java -jar /app/backend.jar & nginx -g 'daemon off;'"
