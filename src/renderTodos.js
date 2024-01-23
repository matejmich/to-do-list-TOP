function renderTodos() {
    const todoTaskContainer = document.getElementById('todoTask-container');
    todoTaskContainer.innerHTML = '';

    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    todos.forEach((todo) => {
        const todoTask = document.createElement('div');
        todoTask.classList.add('todoTask');
        todoTask.textContent = todo.name;
        todoTaskContainer.appendChild(todoTask);
    });
}

export default renderTodos;