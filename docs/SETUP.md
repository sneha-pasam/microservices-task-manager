# Detailed Setup and Troubleshooting Guide

## Complete Installation Guide

### Prerequisites Setup

#### Windows

1. **Install Docker Desktop**
   - Download from https://www.docker.com/products/docker-desktop
   - Run installer
   - Restart computer
   - Open Docker Desktop and wait for it to start
   - Verify: `docker --version`

2. **Install Git**
   - Download from https://git-scm.com/download/win
   - Run installer (keep default options)
   - Verify: `git --version`

#### Mac

1. **Install Docker Desktop**
   - Download for Mac (Intel or Apple Silicon)
   - Drag to Applications
   - Open Docker
   - Verify: `docker --version`

2. **Install Git**
```bash
   brew install git
   # Or download from git-scm.com
```

#### Linux (Ubuntu/Debian)
```bash
# Install Docker
sudo apt-get update
sudo apt-get install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker

# Install Git
sudo apt-get install git

# Add user to docker group
sudo usermod -aG docker $USER
# Log out and back in
```

### Running the Application

#### First Time Setup
```bash
# Clone repository
git clone https://github.com/sneha-pasam/microservices-task-manager.git
cd microservices-task-manager

# Build and start
docker-compose up --build
```

Wait for these messages:
```
✅ MongoDB Connected
🚀 Backend server running on port 5000
ready for start up
```

#### Subsequent Runs
```bash
# Just start (no rebuild needed)
docker-compose up

# Or in background
docker-compose up -d
```

## Detailed Troubleshooting

### Issue: Port Already in Use

**Symptom:**
```
Error: bind: address already in use
```

**Solution:**

**Windows:**
```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Find process
lsof -i :3000

# Kill it
kill -9 <PID>
```

**Or change ports in `docker-compose.yml`:**
```yaml
frontend:
  ports:
    - "8080:80"  # Changed from 3000
```

### Issue: Docker Not Starting

**Solution:**
1. Open Docker Desktop
2. Wait for "Docker Desktop is running"
3. Try command again

### Issue: Permission Denied (Linux)

**Solution:**
```bash
sudo usermod -aG docker $USER
# Log out and log back in
```

### Issue: Cannot Connect to Backend

**Check:**
```bash
# Is backend running?
docker ps

# Check backend logs
docker logs taskmanager-backend

# Test backend directly
curl http://localhost:5000/health
```

### Issue: Database Not Connecting

**Solution:**
```bash
# Stop everything
docker-compose down -v

# Remove volumes
docker volume prune

# Rebuild
docker-compose up --build
```

## Advanced Usage

### Accessing Containers
```bash
# Backend shell
docker exec -it taskmanager-backend sh

# MongoDB shell
docker exec -it taskmanager-db mongosh

# View files in frontend
docker exec -it taskmanager-frontend ls /usr/share/nginx/html
```

### Viewing Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend

# Last 50 lines
docker-compose logs --tail=50 backend
```

### Database Operations
```bash
# Connect to MongoDB
docker exec -it taskmanager-db mongosh

# Inside MongoDB shell:
use taskdb
db.tasks.find()  # View all tasks
db.tasks.countDocuments()  # Count tasks
db.tasks.deleteMany({})  # Delete all tasks
```

### Cleaning Up
```bash
# Stop containers
docker-compose down

# Remove volumes (deletes data)
docker-compose down -v

# Remove all unused images
docker image prune -a

# Remove everything Docker
docker system prune -a --volumes
```

## Development Workflow

### Making Changes

1. **Modify code in VS Code**
2. **Stop containers:** `Ctrl+C`
3. **Rebuild:** `docker-compose up --build`
4. **Test changes**

### Backend Development
```javascript
// backend/server.js
// Make your changes
// Add console.log for debugging
console.log('My debug message');
```

Rebuild:
```bash
docker-compose up --build backend
```

### Frontend Development

Frontend changes reflect immediately - just refresh browser!

For major changes:
```bash
docker-compose restart frontend
```

## Performance Tips

### Speed Up Builds

Create `.dockerignore` in project root:
```
node_modules
.git
*.log
.env
```

### Use Docker BuildKit
```bash
# Windows PowerShell
$env:DOCKER_BUILDKIT=1
docker-compose up --build

# Mac/Linux
DOCKER_BUILDKIT=1 docker-compose up --build
```

### Reduce Image Size

Already optimized with `node:18-alpine` (small base image)

## Security Best Practices

1. **Don't commit sensitive data**
   - API keys
   - Passwords
   - Connection strings

2. **Use environment variables**
```yaml
   environment:
     - DB_PASSWORD=${DB_PASSWORD}
```

3. **Enable MongoDB authentication** (production)
```yaml
   environment:
     - MONGO_INITDB_ROOT_USERNAME=admin
     - MONGO_INITDB_ROOT_PASSWORD=secret
```

## Monitoring

### Check Container Health
```bash
# Container status
docker ps

# Resource usage
docker stats

# Inspect container
docker inspect taskmanager-backend
```

### Application Health
```bash
# Backend health
curl http://localhost:5000/health

# MongoDB connection
docker exec taskmanager-db mongosh --eval "db.adminCommand('ping')"
```

## Backup and Restore

### Backup Database
```bash
# Create backup
docker exec taskmanager-db mongodump --out /backup

# Copy to host
docker cp taskmanager-db:/backup ./backup
```

### Restore Database
```bash
# Copy backup to container
docker cp ./backup taskmanager-db:/backup

# Restore
docker exec taskmanager-db mongorestore /backup
```

## FAQ

**Q: Do I need Node.js installed?**
A: No! Docker handles everything.

**Q: Can I use this in production?**
A: Add authentication, use environment secrets, enable HTTPS.

**Q: How do I deploy online?**
A: Use AWS ECS, Google Cloud Run, or DigitalOcean App Platform.

**Q: Data disappears on restart?**
A: Use `docker-compose down` not `docker-compose down -v`

**Q: Can I change the database?**
A: Yes! Replace MongoDB service in docker-compose.yml

## Getting Help

1. **Check logs:** `docker-compose logs`
2. **Search GitHub Issues**
3. **Create new issue with:**
   - Error message
   - Steps to reproduce
   - System info (Windows/Mac/Linux)
   - Docker version

---

**Need more help? Open an issue on GitHub!**