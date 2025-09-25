# 🎯 Pretty Calculator

A beautiful, full-stack calculator application built with Spring Boot (backend) and React (frontend). This project demonstrates modern web development practices with clean architecture, REST API integration, and containerization.

## 📦 Features

- **Backend**: Spring Boot REST API with MVC pattern
  - Endpoints for add, subtract, multiply, divide operations
  - Proper error handling (e.g., division by zero)
  - Serves React frontend as static resources
- **Frontend**: React single-page application
  - Clean, modern UI with large buttons and centered layout
  - Real-time API calls to backend for calculations
  - Responsive design with soft color scheme and smooth animations
- **Deployment**: Multi-stage Docker build for optimal performance
  - Frontend built with Vite
  - Minimal production image using Alpine Linux

## 🚀 Getting Started

You can run this application either with Docker/Podman or locally. Choose the method that works best for you.

### 🐳 Method 1: Run with Docker or Podman (Recommended)

This is the easiest way to run the application. You don't need to install Java, Maven, or Node.js.

#### Prerequisites
- Docker **or** Podman installed on your system
- Port 8080 available on your machine

#### Steps

1. Clone this repository (if not already done)
   ```bash
   git clone https://github.com/your-username/pretty-calculator.git
   cd pretty-calculator
   ```

2. Build the Docker image (works with both Docker and Podman)
   ```bash
   docker build -t pretty-calculator .
   # OR with Podman:
   podman build -t pretty-calculator .
   ```

3. Run the container
   ```bash
   docker run -p 8080:8080 pretty-calculator
   # OR with Podman:
   podman run -p 8080:8080 pretty-calculator
   ```

4. Open your browser and navigate to:
   [http://localhost:8080](http://localhost:8080)

> The application will be ready when you see the message "Tomcat started on port(s): 8080" in the console.

### ⚙️ Method 2: Run Locally (Development Mode)

Use this method if you want to modify the code and see changes in real-time.

#### Backend Prerequisites
- Java 17 or higher
- Maven 3.6+

#### Frontend Prerequisites
- Node.js 18+
- npm or yarn

#### Steps

**1. Start the Spring Boot backend:**
```bash
cd backend
mvn spring-boot:run
```
This will start the server on port 8080.

**2. In a separate terminal, start the React frontend:**
```bash
cd frontend
npm install
npm run dev
```
This will start the Vite development server on port 3000 with auto-reload.

**3. Access the applications:**
- Development (React): [http://localhost:3000](http://localhost:3000)
- Production (Spring Boot serves React): [http://localhost:8080](http://localhost:8080)

> When running locally, the React dev server proxies API requests to the Spring Boot backend on port 8080.

## 🌐 API Endpoints

The backend exposes the following REST endpoints:

| Endpoint | Method | Parameters | Description |
|---------|--------|------------|-------------|
| `/api/add` | GET | `a`, `b` (numbers) | Returns sum of a and b |
| `/api/subtract` | GET | `a`, `b` (numbers) | Returns a minus b |
| `/api/multiply` | GET | `a`, `b` (numbers) | Returns a times b |
| `/api/divide` | GET | `a`, `b` (numbers) | Returns a divided by b |

### Error Handling
- Division by zero returns HTTP 400 Bad Request
- All operations return JSON response with the result

## 📁 Project Structure

```
pretty-calculator/
├── backend/                  # Spring Boot application
│   ├── src/main/java/com/example/calculator/
│   │   ├── CalculatorApplication.java    # Spring Boot main class
│   │   ├── CalculatorController.java     # REST API endpoints
│   │   └── CalculatorService.java        # Business logic
│   ├── src/main/resources/
│   │   └── application.properties        # Configuration
│   └── pom.xml                           # Maven dependencies
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── styles/             # CSS styles
│   │   ├── App.jsx             # Main application component
│   │   └── main.jsx            # Entry point
│   ├── public/                 # Static assets
│   ├── package.json           # Node.js dependencies
│   └── vite.config.js          # Vite configuration
├── Dockerfile                # Multi-stage build for production
└── README.md                 # This file
```

## 🛠️ Technology Stack

- **Backend**: Spring Boot 3, Java 17, Maven
- **Frontend**: React 18, Vite, JavaScript
- **Styling**: CSS Modules
- **Containerization**: Docker/Podman (multi-stage build)
- **Build Tools**: Maven, npm

## 📝 Notes

- The React frontend is built and served by Spring Boot in production (via the Docker build)
- Development workflow uses Vite's hot module replacement for fast iteration
- The application is responsive and works well on desktop browsers
- All API calls from the frontend are made to the same host (localhost:8080) in production

## 📎 License

This project is open source and available under the MIT License.