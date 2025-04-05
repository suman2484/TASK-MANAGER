document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
        saveTasks();
    }
});

function addTask(taskText) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button onclick="toggleComplete(this)">Complete</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    taskList.appendChild(li);
}

function toggleComplete(button) {
    const li = button.parentElement.parentElement;
    li.classList.toggle('completed');
    saveTasks();
}

function deleteTask(button) {
    const li = button.parentElement.parentElement;
    li.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(task => {
        tasks.push({
            text: task.querySelector('span').textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text);
        if (task.completed) {
            const lastTask = document.querySelector('#task-list li:last-child');
            lastTask.classList.add('completed');
        }
    });
}

// Load tasks when the page loads
window.onload = loadTasks;