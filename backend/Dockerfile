# Etapa 1: construir la aplicación
FROM gradle:8.4-jdk17 AS builder

WORKDIR /app

# Copia archivos de configuración de Gradle para aprovechar cache
COPY build.gradle settings.gradle gradle.properties ./
COPY gradle ./gradle

# Copia el resto del proyecto
COPY src ./src

# Construye el jar en modo release
RUN gradle clean bootJar --no-daemon

# Etapa 2: ejecutar la aplicación
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copia el jar construido desde la etapa anterior
COPY --from=builder /app/build/libs/*.jar app.jar

# Expone el puerto donde Spring Boot corre
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
