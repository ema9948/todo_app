FROM eclipse-temurin:17-jdk-alpine AS backend-build

WORKDIR /app/backend

COPY backend/build.gradle backend/settings.gradle backend/gradlew ./
COPY backend/gradle/ backend/gradle/
COPY backend/src/ backend/src/

RUN chmod +x gradlew

RUN ./gradlew build -x test
