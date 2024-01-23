function createProject() {
    const createProjectBtn = document.getElementById('createProjectBtn');
    const createProjectOverlay = document.getElementById('create-project');

    createProjectBtn.addEventListener('click', () => {
        createProjectOverlay.classList.remove('displayNone');
    });

    const closeProject = document.getElementById('closeProject');
    closeProject.addEventListener('click', () => {
        createProjectOverlay.classList.add('displayNone');
        clearProjectForm();
    });

    const projectForm = document.getElementById('create-project-form');
    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addProject();
        renderProjects();
        closeProjectForm();
    });

    function addProject() {
        const projectName = document.getElementById('project-name').value;
        // Add other project details as needed

        // Store the new project in local storage
        saveProjectToLocal(projectName);
    }

    function saveProjectToLocal(projectName) {
        // Retrieve existing projects from local storage
        const existingProjects = JSON.parse(localStorage.getItem('projects')) || [];

        // Add the new project to the array
        existingProjects.push(projectName);

        // Save the updated array back to local storage
        localStorage.setItem('projects', JSON.stringify(existingProjects));
    }

    function renderProjects() {
        // ... (add code to render projects as needed)
    }

    function clearProjectForm() {
        const projectForm = document.getElementById('create-project-form');
        projectForm.reset();
    }

    function closeProjectForm() {
        createProjectOverlay.classList.add('displayNone');
    }
}

export default createProject;