import renderTodos from './renderTodos';

class Todo {
    constructor(name, important, date) {
        this.name = name;
        this.important = important;
        this.date = date;
        this.completed = false;
    }
}

function createTodo() {
    const createTodoBtn = document.getElementById('createTodoBtn');
    const createTodoOverlay = document.getElementById('create-todo');

    createTodoBtn.addEventListener('click', () => {
        createTodoOverlay.classList.remove('displayNone');
    });

    const closeTodo = document.getElementById('closeTodo');
    closeTodo.addEventListener('click', () => {
        createTodoOverlay.classList.add('displayNone');
        clearForm();
    });

    const todoForm = document.getElementById('create-todo-form');
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addTodo();
        renderTodos();
        closeForm();
        clearForm();
    });

    function addTodo() {
        const name = document.getElementById('todo-name').value;
        const important = document.getElementById('todo-important').checked;
        const date = document.getElementById('todo-date').value;

        const newTodo = new Todo(name, important, date);
        saveTodoToLocal(newTodo);
    }

    function saveTodoToLocal(todo) {
        const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];
        existingTodos.push(todo);
        localStorage.setItem('todos', JSON.stringify(existingTodos));
    }

    function clearForm() {
        const todoForm = document.getElementById('create-todo-form');
        todoForm.reset();
    }

    function closeForm() {
        createTodoOverlay.classList.add('displayNone');
    }
}

export default createTodo;