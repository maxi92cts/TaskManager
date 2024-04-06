// Función para agregar una tarea
document.getElementById('addTaskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const taskDate = new Date(document.getElementById('taskDate').value).toISOString(); // Convertir fecha a formato ISO
    fetch('http://localhost:8080/tasks/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: taskName, date: taskDate }),
    })
    .then(response => response.json())
    .then(data => {
        listTasks(); // Listar todas las tareas después de agregar una nueva
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
        data.forEach((task, index) => { // Añadir el índice como argumento
            addTaskToList(task, index); // Pasar el índice a la función addTaskToList
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Función para agregar una tarea a la lista
function addTaskToList(task, index) { // Añadir el índice como parámetro
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');

    // Crear un elemento de entrada tipo checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed; // Marcar la casilla si la tarea está completada
    checkbox.addEventListener('change', function() {
        // Lógica para manejar el cambio de estado de la tarea
        task.completed = checkbox.checked;
        updateTaskStatus(task);
    });

    // Agregar el número de la tarea junto al recuadro de verificación
    const taskNumber = document.createElement('span');
    taskNumber.textContent = index + 1 + '. ';

    // Agregar el nombre de la tarea junto al recuadro de verificación
    const taskNameElement = document.createElement('span');
    taskNameElement.textContent = task.name;

    // Agregar el recuadro de verificación, el número y el nombre de la tarea al elemento de lista
    listItem.appendChild(taskNumber);
    listItem.appendChild(checkbox);
    listItem.appendChild(taskNameElement);

    // Agregar el botón de eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() { deleteTask(task.id); };
    listItem.appendChild(deleteBtn);

    // Agregar el elemento de lista completo a la lista de tareas
    taskList.appendChild(listItem);
}

// Función para actualizar el estado de una tarea
function updateTaskStatus(task) {
    fetch('http://localhost:8080/tasks/update/' + task.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
    .then(() => {
        listTasks(); // Actualizar la lista después de modificar el estado de la tarea
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Función para eliminar una tarea
function deleteTask(id) {
    fetch('http://localhost:8080/tasks/delete/' + id, {
        method: 'DELETE',
    })
    .then(() => {
        listTasks(); // Actualizar la lista después de eliminar la tarea
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Llamar a listTasks al cargar la página
document.addEventListener('DOMContentLoaded', listTasks);
