import renderTodosByCategory from './renderTodos';


        
    

function setupTabEventListeners() {
    const generalTab = document.getElementById('generalTitle');
    const todayTab = document.getElementById('todayTitle');
    const completedTab = document.getElementById('completedTitle');

    generalTab.addEventListener('click', () => {
        
        clearTab();
        clearUnderLine();
        renderTodosByCategory('General');
        updateMainCategoryTitle('General');
        addUnderLine('generalTitle')
        
    });

    todayTab.addEventListener('click', () => {
        clearTab();
        clearUnderLine();
        renderTodosByCategory('Today');
        updateMainCategoryTitle('Today');
        addUnderLine('todayTitle')
    });

    completedTab.addEventListener('click', () => {
        clearTab();
        clearUnderLine();
        renderTodosByCategory('Completed');
        updateMainCategoryTitle('Completed');
        addUnderLine('completedTitle')
    });
    const projectsTab = document.getElementById('projectsTitle');
    projectsTab.addEventListener('click', () => {
        clearTab();
        clearUnderLine();
        renderProjects();
    });
}

function clearTab() {
    const todoTaskContainer = document.getElementById('todoTask-container');
    todoTaskContainer.textContent = '';
}

function clearUnderLine() {
    const tab = document.querySelectorAll('.tab');
    tab.forEach((t) => {
        t.classList.remove('underline');
    });
}

function updateMainCategoryTitle(category) {
    const mainCategoryTitle = document.getElementById('mainCategoryTitle');
    mainCategoryTitle.textContent = category;
}
function addUnderLine(id) {
    const category = document.getElementById(id)
    category.classList.add('underline')
}

export default setupTabEventListeners;