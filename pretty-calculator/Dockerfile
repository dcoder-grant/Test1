# Stage 1: Build React Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY ./frontend/package.json ./frontend/vite.config.js ./
COPY ./frontend/src ./src
COPY ./frontend/public ./public
RUN npm install
RUN npm run build --workspaces=false

# Stage 2: Build Spring Boot Application and Package Everything
FROM maven:3.8-openjdk-17 AS backend-builder
WORKDIR /app
COPY ./backend/pom.xml ./
COPY --from=frontend-builder /app/dist /app/src/main/resources/static
RUN mvn dependency:go-offline
COPY ./backend/src ./src
RUN mvn package -DskipTests

# Stage 3: Final Runtime Image
FROM openjdk:17-jre-alpine
WORKDIR /app
COPY --from=backend-builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]