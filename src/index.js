function initializePage() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    renderProjects(projects);

    const createProjectBtn = document.getElementById('createProjectBtn');
    createProjectBtn.addEventListener('click', createProject);

    const createTodoBtn = document.getElementById('createTodoBtn');
    createTodoBtn.addEventListener('click', createTodo);

    const closeTodo = document.getElementById('closeTodo');
    closeTodo.addEventListener('click', closeCreateTodoForm);

    const createTodoForm = document.getElementById('create-todo-form');
    createTodoForm.addEventListener('submit', submitTodoForm);

    const closeProject = document.getElementById('closeProject');
    closeProject.addEventListener('click', closeCreateProjectForm);

    const createProjectForm = document.getElementById('create-project-form');
    createProjectForm.addEventListener('submit', submitProjectForm);

    const homeContainer = document.getElementById('home-container'); 
    homeContainer.addEventListener('click', handleTabClick);

    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.addEventListener('click', handleProjectClick);

    renderTodosByCategory('General');

    
    projectsContainer.addEventListener('click', (event) => {
        const deleteButton = event.target.closest('.delete-project-btn');
        if (deleteButton) {
            const projectId = deleteButton.getAttribute('data-project-id');
            handleDeleteProject(projectId);
        }
    });
}

function renderProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';

    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('clickable', 'tab', 'project-tab');
        projectDiv.setAttribute('data-category', project.id);
        projectDiv.textContent = project.name;

        
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&times;';
        deleteButton.classList.add('delete-project-btn');
        deleteButton.setAttribute('data-project-id', project.id);

        projectDiv.appendChild(deleteButton);

        projectsContainer.appendChild(projectDiv);
    });
}
function handleDeleteProject(projectId) {
    const existingProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const updatedProjects = existingProjects.filter(project => project.id !== projectId);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    deleteTodosByProjectId(projectId);

    renderProjects(updatedProjects);

    if (getSelectedProject() === projectId) {
        markSelectedTab('General');
    }
}

function deleteTodosByProjectId(projectId) {
    const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const updatedTodos = existingTodos.filter(todo => todo.projectId !== projectId);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    const selectedProject = getSelectedProject();
    renderTodosByCategory(selectedProject);
}

function handleTabClick(event) {
    const targetTab = event.target.closest('.tab');
    if (targetTab) {
        const tabId = targetTab.getAttribute('data-category');
        renderTodosByCategory(tabId);
        markSelectedTab(tabId);
        markSelectedProject(null);
    }
}

function handleProjectClick(event) {
    const targetProject = event.target.closest('.project-tab');
    if (targetProject) {
        const projectId = targetProject.getAttribute('data-category');
        renderTodosByCategory(projectId);
        markSelectedTab(null);
        markSelectedProject(projectId);
    }
}

function markSelectedTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('underline');
    });

    const selectedTab = document.querySelector(`.tab[data-category="${tabId}"]`);
    if (selectedTab) {
        selectedTab.classList.add('underline');
    }
}

function markSelectedProject(projectId) {
    const projectTabs = document.querySelectorAll('.project-tab');
    projectTabs.forEach(tab => {
        tab.classList.remove('underline');
        if (tab.getAttribute('data-category') === projectId) {
            tab.classList.add('underline');
        }
    });
}
function renderTodosByCategory(category) {
    const todoTaskContainer = document.getElementById('todoTask-container');
    todoTaskContainer.innerHTML = '';

    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    todos.forEach(todo => {
        if (
            (category === 'General') ||
            (category === 'Today' && todo.date === getCurrentDate()) ||
            (todo.projectId && category === todo.projectId)
        ) {
            const todoTask = document.createElement('div');
            todoTask.classList.add('todoTask');
            todoTask.textContent = todo.name;

            if (todo.date) {
                const daysLeft = calculateDaysLeft(todo.date);
                const daysLeftSpan = document.createElement('span');
                daysLeftSpan.textContent = `${daysLeft} days`;
                daysLeftSpan.classList.add('daysLeft')
                todoTask.appendChild(daysLeftSpan);
            }

            if (todo.important) {
                todoTask.classList.add('importantTodo');
            }

           
            
            

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => handleDeleteTodo(todo));

            
            todoTask.appendChild(deleteButton);

            todoTaskContainer.appendChild(todoTask);
        }
    });

  
}

function handleDeleteTodo(todo) {
    const selectedProject = getSelectedProject();
    const selectedTab = getSelectedTab();
    const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];

    const updatedTodos = existingTodos.filter(existingTodo => existingTodo.id !== todo.id);

    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    renderTodosByCategory(selectedProject);

    markSelectedTab(selectedTab);
    markSelectedProject(selectedProject);
}

function getSelectedTab() {
    const selectedTab = document.querySelector('.tab.underline');
    return selectedTab ? selectedTab.getAttribute('data-category') : 'General';
}

function handleTodoCompletion(todo) {
    const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];

    const updatedTodos = existingTodos.map(existingTodo =>
        existingTodo === todo ? { ...existingTodo } : existingTodo
    );

    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    const selectedProject = getSelectedProject();
    renderTodosByCategory(selectedProject);
}

function findTodoById(todoId) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    return todos.find(todo => todo.id === todoId);
}

function moveTodoToCategory(todo, category) {
    todo.projectId = category;

    const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];

    const updatedTodos = existingTodos.map(existingTodo =>
        existingTodo === todo ? { ...existingTodo, projectId: category } : existingTodo
    );

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}

function getSelectedProject() {
    const selectedProject = document.querySelector('.project-tab.underline');
    return selectedProject ? selectedProject.getAttribute('data-category') : 'General';
}

function clearForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function calculateDaysLeft(targetDate) {
    const currentDate = getCurrentDate();
    const timeDifference = new Date(targetDate) - new Date(currentDate);
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysLeft;
}

function createProject() {
    const createProjectOverlay = document.getElementById('create-project');
    createProjectOverlay.classList.remove('displayNone');
}

function closeCreateProjectForm() {
    const createProjectOverlay = document.getElementById('create-project');
    createProjectOverlay.classList.add('displayNone');
    clearForm('create-project-form');
}

function submitProjectForm(event) {
    event.preventDefault();

    const projectName = document.getElementById('project-name').value;

    if (projectName) {
        const projectId = Date.now().toString();
        const newProject = { id: projectId, name: projectName };

        const existingProjects = JSON.parse(localStorage.getItem('projects')) || [];
        existingProjects.push(newProject);

        localStorage.setItem('projects', JSON.stringify(existingProjects));

        renderProjects(existingProjects);

        markSelectedTab(projectId)

        closeCreateProjectForm();
    }
}

function submitTodoForm(event) {
    event.preventDefault();

    const todoName = document.getElementById('todo-name').value;
    const important = document.getElementById('todo-important').checked;
    const date = document.getElementById('todo-date').value;
    const selectedProject = getSelectedProject();

    if (todoName && date) {
        const newTodo = {
            id: Date.now(),
            name: todoName,
            important: important,
            date: date,
            projectId: selectedProject,
        };

        const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];
        existingTodos.push(newTodo);

        localStorage.setItem('todos', JSON.stringify(existingTodos));

        renderTodosByCategory(selectedProject);

        closeCreateTodoForm();
    }
}

function createTodo() {
    const createTodoOverlay = document.getElementById('create-todo');
    createTodoOverlay.classList.remove('displayNone');
}

function closeCreateTodoForm() {
    const createTodoOverlay = document.getElementById('create-todo');
    createTodoOverlay.classList.add('displayNone');
    clearForm('create-todo-form');
}

document.addEventListener('DOMContentLoaded', () => {
    initializePage();
});
