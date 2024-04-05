// Función para agregar una tarea
document.getElementById('addTaskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const taskDate = document.getElementById('taskDate').value;
    fetch('http://localhost:8080/tasks/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: taskName, date: taskDate }),
    })
    .then(response => response.json())
    .then(data => {
        addTaskToList(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Función para listar todas las tareas
function listTasks() {
    fetch('http://localhost:8080/tasks/list')
    .then(response => response.json())
    .then(data => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Limpiar la lista
        data.forEach(task => {
            addTaskToList(task);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Función para agregar una tarea a la lista
function addTaskToList(task) {
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    listItem.textContent = task.name + ' - ' + task.date;
    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Actualizar';
    updateBtn.className = 'update-btn';
    updateBtn.onclick = function() { updateTask(task.id); };
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() { deleteTask(task.id); };
    listItem.appendChild(updateBtn);
    listItem.appendChild(deleteBtn);
    taskList.appendChild(listItem);
}

// Función para actualizar una tarea
function updateTask(id) {
    // Implementar la lógica para actualizar una tarea
}

// Función para eliminar una tarea
function deleteTask(id) {
    fetch('http://localhost:8080/tasks/delete/' + id, {
        method: 'DELETE',
    })
    .then(() => {
        listTasks(); // Actualizar la lista después de eliminar
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Función para marcar tareas como realizadas
function markTasksDone() {
    // Implementar la lógica para marcar tareas como realizadas
}

// Evento para el botón de ver tareas
document.getElementById('viewTasks').addEventListener('click', listTasks);

// Evento para el botón de eliminar tareas
document.getElementById('deleteTasks').addEventListener('click', function() {
    // Implementar la lógica para eliminar tareas
});

// Evento para el botón de marcar tareas como realizadas
document.getElementById('markTasksDone').addEventListener('click', markTasksDone);

// Evento para el campo de búsqueda
document.getElementById('search').addEventListener('input', function(event) {
    const searchValue = event.target.value.toLowerCase();
    const taskListItems = document.querySelectorAll('#taskList li');
    taskListItems.forEach(item => {
        const taskName = item.textContent.toLowerCase();
        if (taskName.includes(searchValue)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});

// Llamar a listTasks al cargar la página
document.addEventListener('DOMContentLoaded', listTasks);
