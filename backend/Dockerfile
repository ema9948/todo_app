# Usamos una imagen base de OpenJDK 17
FROM eclipse-temurin:17-jdk-alpine

# Directorio de la app
WORKDIR /app

# Copiamos los archivos de Gradle y código
COPY build.gradle settings.gradle gradlew ./
COPY gradle/ gradle/
COPY src/ src/

# Compilamos el proyecto
RUN ./gradlew build -x todoApp

# Exponemos el puerto 8080
EXPOSE 8080

# Comando para ejecutar la app
CMD ["java", "-jar", "build/libs/backend-0.0.1-SNAPSHOT.jar"]
