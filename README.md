# 🚀 Microservices Task Manager

A full-stack task management application built with microservices architecture using Docker, Node.js, Express, MongoDB, and vanilla JavaScript.

![Task Manager Demo](https://img.shields.io/badge/Status-Working-success)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as completed
- ✅ Real-time task statistics (Total, Pending, Completed)
- ✅ Beautiful responsive design with gradient UI
- ✅ Microservices architecture
- ✅ Fully containerized with Docker
- ✅ MongoDB for data persistence
- ✅ RESTful API backend
- ✅ No external dependencies - runs entirely locally

## 🏗️ Architecture

This application follows a microservices architecture with three main services:
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│  Frontend   │────▶│   Backend   │────▶│  MongoDB    │
│  (Nginx)    │     │  (Node.js)  │     │ (Database)  │
│  Port 3000  │     │  Port 5000  │     │ Port 27017  │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Service Communication:**
- Frontend serves static HTML/CSS/JS via Nginx
- Frontend makes API calls to Backend (REST API)
- Backend communicates with MongoDB for data storage
- All services run in isolated Docker containers
- Services communicate through Docker network

## 🛠️ Technologies Used

### Backend
- **Node.js** (v18) - JavaScript runtime
- **Express.js** - Web framework for API
- **MongoDB** (v7.0) - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with gradients and animations
- **JavaScript (ES6+)** - Client-side functionality
- **Nginx** - Web server for static files

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📦 Prerequisites

Before running this project, make sure you have:

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 1.29 or higher)
- [Git](https://git-scm.com/downloads)

**Note:** You don't need Node.js or MongoDB installed locally - Docker handles everything!

## 🚀 Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/sneha-pasam/microservices-task-manager.git
cd microservices-task-manager
```

### Step 2: Build and Run with Docker Compose
```bash
docker-compose up --build
```

### Step 3: Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **MongoDB:** localhost:27017

**That's it!** 🎉 The application is now running.

## 💻 Usage

### Starting the Application
```bash
# Start all services
docker-compose up

# Start in detached mode (background)
docker-compose up -d

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
```

### Stopping the Application
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (deletes all data)
docker-compose down -v
```

### Rebuilding After Changes
```bash
# Rebuild containers
docker-compose up --build

# Rebuild specific service
docker-compose up --build backend
```

### Common Docker Commands
```bash
# List running containers
docker ps

# Access backend container shell
docker exec -it taskmanager-backend sh

# Access MongoDB shell
docker exec -it taskmanager-db mongosh

# View container logs
docker logs taskmanager-backend

# Remove all stopped containers
docker-compose down --remove-orphans
```

## 📡 API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/tasks` | Get all tasks | - |
| POST | `/api/tasks` | Create a new task | `{ "title": "string", "description": "string" }` |
| PUT | `/api/tasks/:id` | Update a task | `{ "status": "completed" }` or `{ "title": "string" }` |
| DELETE | `/api/tasks/:id` | Delete a task | - |
| GET | `/health` | Health check | - |

### Example API Requests

**Create a task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Docker","description":"Complete microservices tutorial"}'
```

**Get all tasks:**
```bash
curl http://localhost:5000/api/tasks
```

**Update task status:**
```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID
```

**Health check:**
```bash
curl http://localhost:5000/health
```

## 📁 Project Structure
```
microservices-task-manager/
│
├── backend/                    # Backend API service
│   ├── server.js              # Express server and routes
│   ├── package.json           # Node.js dependencies
│   ├── Dockerfile             # Backend container config
│   └── .dockerignore          # Files to exclude from build
│
├── frontend/                   # Frontend service
│   ├── index.html             # Main HTML file
│   ├── style.css              # Styling
│   └── app.js                 # Frontend JavaScript
│
├── docs/                       # Documentation
│   └── SETUP.md              # Detailed setup guide
│
├── docker-compose.yml         # Multi-container orchestration
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## 📸 Screenshots

### Main Interface
![Task Manager Interface](screenshots/main-interface.png)

### Adding a Task
![Adding Task](screenshots/add-task.png)

### Completed Tasks
![Completed Tasks](screenshots/completed-tasks.png)

## 🎯 Features Walkthrough

### Creating Tasks
1. Enter task title in the first input field
2. Optionally add a description in the second field
3. Click "➕ Add Task" button
4. Task appears instantly in the list below

### Managing Tasks
- **Complete:** Click "✓ Complete" to mark as done
- **Delete:** Click "🗑 Delete" to remove the task
- **Statistics:** Watch real-time updates of Total/Pending/Completed counts

### Data Persistence
- All tasks are stored in MongoDB
- Data persists even after stopping/restarting containers
- Use `docker-compose down -v` to completely reset data

## 🔧 Configuration

### Port Configuration
Edit `docker-compose.yml` to change ports:
```yaml
services:
  frontend:
    ports:
      - "8080:80"  # Change 3000 to 8080
  
  backend:
    ports:
      - "4000:5000"  # Change 5000 to 4000
```

### Environment Variables
Backend accepts these environment variables:
```yaml
environment:
  - MONGO_URL=mongodb://database:27017/taskdb
  - PORT=5000
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
netstat -ano | findstr :3000  # Windows
lsof -i :3000  # Mac/Linux

# Change port in docker-compose.yml
```

### Container Won't Start
```bash
# Check logs
docker-compose logs backend

# Restart containers
docker-compose restart

# Rebuild from scratch
docker-compose down -v
docker-compose up --build
```

### Database Connection Issues
```bash
# Remove old volumes
docker-compose down -v

# Rebuild everything
docker-compose up --build
```

### Frontend Can't Connect to Backend
- Ensure all containers are running: `docker ps`
- Check backend health: `curl http://localhost:5000/health`
- Verify CORS is enabled in backend

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute

1. Fork the project
2. Create your feature branch
```bash
   git checkout -b feature/AmazingFeature
```
3. Commit your changes
```bash
   git commit -m 'Add some AmazingFeature'
```
4. Push to the branch
```bash
   git push origin feature/AmazingFeature
```
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Sneha Pasam**
- GitHub: [@sneha-pasam](https://github.com/sneha-pasam)
- Project: [microservices-task-manager](https://github.com/sneha-pasam/microservices-task-manager)

## 🙏 Acknowledgments

- Docker for containerization platform
- MongoDB for the database
- Express.js community
- Node.js community
- All contributors and supporters

## 📚 Learning Resources

This project demonstrates:
- **Microservices Architecture** - Breaking apps into independent services
- **Docker Containerization** - Packaging apps with dependencies
- **REST API Design** - Building scalable APIs
- **Full-Stack Development** - Frontend + Backend + Database
- **DevOps Practices** - Infrastructure as Code

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Search and filter functionality
- [ ] Dark mode theme
- [ ] Task priority levels
- [ ] Collaborative features (multiple users)
- [ ] Export tasks to CSV/PDF
- [ ] Mobile app version
- [ ] Real-time updates with WebSockets

## 💡 What I Learned

- Setting up microservices architecture
- Docker containerization and Docker Compose
- Building REST APIs with Express.js
- MongoDB database design
- Frontend-backend communication
- Container orchestration
- Version control with Git

---

**Built with ❤️ using Docker Microservices Architecture**

**⭐ If you found this project helpful, please give it a star!**