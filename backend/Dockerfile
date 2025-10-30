# Usar una imagen base de Gradle para construir el proyecto
FROM gradle:8.3.3-jdk17 AS builder
WORKDIR /app

# Copiar archivos necesarios para la compilación
COPY build.gradle settings.gradle ./
COPY gradle ./gradle
COPY src ./src

# Construir el JAR de la aplicación
RUN gradle clean build -x test --no-daemon

# Usar una imagen más ligera de OpenJDK para ejecutar la app
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copiar el JAR compilado desde la etapa de construcción
COPY --from=builder /app/build/libs/*.jar app.jar

# Exponer el puerto de la app
EXPOSE 8080

# Comando para ejecutar la app
ENTRYPOINT ["java","-jar","app.jar"]
