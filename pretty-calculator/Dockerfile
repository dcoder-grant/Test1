# Stage 1: Build React Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY ./frontend/package.json ./frontend/vite.config.js ./
RUN npm install
# Copy source files before public to ensure proper build order
COPY ./frontend/src ./src
COPY ./frontend/public ./public
# Copy index.html to root for Vite entry point
RUN cp public/index.html ./index.html
# Build the React application
RUN npm run build --workspaces=false

# Stage 2: Build Spring Boot Application and Package Everything
FROM maven:3.8-openjdk-17 AS backend-builder
WORKDIR /app
# Copy Maven pom.xml first for dependency caching
COPY ./backend/pom.xml ./
# Create the static resources directory structure
RUN mkdir -p /app/src/main/resources/static
# Copy the built React app into static resources
COPY --from=frontend-builder /app/dist/* /app/src/main/resources/static/
# Download dependencies before copying source code for better caching
RUN mvn dependency:go-offline
# Copy backend source code
COPY ./backend/src ./src
# Build the Spring Boot application with tests skipped
RUN mvn package -DskipTests

# Stage 3: Final Runtime Image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]