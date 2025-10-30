# Etapa de build usando Gradle Wrapper
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app

# Copiar archivos de Gradle y código fuente
COPY gradlew .
COPY gradle ./gradle
COPY build.gradle settings.gradle ./
COPY src ./src

# Construir el JAR sin ejecutar tests
RUN ./gradlew clean build -x test

# Etapa final: imagen más ligera solo para correr el JAR
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copiar el JAR construido
COPY --from=builder /app/build/libs/*.jar app.jar

# Exponer puerto
EXPOSE 8080

# Ejecutar la aplicación
ENTRYPOINT ["java","-jar","app.jar"]
