const API_URL = 'http://localhost:5000/api/tasks';

// Load tasks on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// Load all tasks
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        
        displayTasks(tasks);
        updateStats(tasks);
    } catch (error) {
        document.getElementById('tasksContainer').innerHTML = 
            '<p class="loading">❌ Error loading tasks. Make sure backend is running!</p>';
        console.error('Error:', error);
    }
}

// Display tasks
function displayTasks(tasks) {
    const container = document.getElementById('tasksContainer');
    
    if (tasks.length === 0) {
        container.innerHTML = '<p class="loading">No tasks yet. Add one above! ✨</p>';
        return;
    }
    
    container.innerHTML = tasks.map(task => `
        <div class="task-card ${task.status === 'completed' ? 'completed' : ''}">
            <div class="task-header">
                <h3 class="task-title ${task.status === 'completed' ? 'completed' : ''}">
                    ${task.title}
                </h3>
            </div>
            ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
            <div class="task-actions">
                ${task.status !== 'completed' ? 
                    `<button class="complete-btn" onclick="completeTask('${task._id}')">✓ Complete</button>` : 
                    '<span style="color: #4caf50; font-weight: bold;">✓ Completed</span>'
                }
                <button class="delete-btn" onclick="deleteTask('${task._id}')">🗑 Delete</button>
            </div>
            <div class="task-meta">
                Created: ${new Date(task.createdAt).toLocaleString()}
            </div>
        </div>
    `).join('');
}

// Update statistics
function updateStats(tasks) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = total - completed;
    
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
}

// Add new task
async function addTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    
    if (!title) {
        alert('Please enter a task title!');
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description })
        });
        
        if (response.ok) {
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDescription').value = '';
            loadTasks();
        }
    } catch (error) {
        alert('Error adding task: ' + error.message);
    }
}

// Complete task
async function completeTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'completed' })
        });
        loadTasks();
    } catch (error) {
        alert('Error completing task: ' + error.message);
    }
}

// Delete task
async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }
    
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        loadTasks();
    } catch (error) {
        alert('Error deleting task: ' + error.message);
    }
}