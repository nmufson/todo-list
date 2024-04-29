

import { loadProjectsModule } from "./load-projects.js";
import { Project } from './project.js';
import { Todo } from './create-todo.js';
import { loadTodoFuncContainer } from "./load-divs-dom.js";
import { listenerFlags } from "./load-projects.js";




export const loadPage = () => {
    const contentArea = document.createElement('div');
    const projectBar = document.createElement('div');
    const todoListDivContainer = document.createElement('div');
    contentArea.id = 'content-area';
    projectBar.id = 'project-bar';
    todoListDivContainer.id = 'todo-list-container';

    document.body.appendChild(projectBar);
    document.body.appendChild(contentArea);
    contentArea.appendChild(todoListDivContainer);

    let projectArray;

    const retrieveStorage = () => {
        if (!localStorage.getItem('projects')) return;
        if (!localStorage.getItem('todos')) return;

        const retrievedProjects = localStorage.getItem('projects');
        const retrievedTodos = localStorage.getItem('todos');

        //converts JSON strings into javascript objects 
        const projectsData = JSON.parse(retrievedProjects);
        const todosData = JSON.parse(retrievedTodos);

        projectArray = [];
        
        projectsData.forEach((project) => {
            if (project.projectName) {
            const projectInstance = new Project(project.projectName)
            projectArray.push(projectInstance);
            }
        });

        todosData.forEach((todo) => {
            if (todo.todoName) {
                console.log(todo.todoComplete);
                const todoInstance = new Todo(todo.todoName, 
                    todo.todoDescription, 
                    todo.todoDueDate,
                    todo.todoPriority,
                    todo.todoProject,
                    todo.todoComplete
                );
                //find which object in an array has a certain property
                const projectName = todoInstance.project;
                const projectInstance = projectArray.find((e) => e.name === projectName);
                projectInstance.todoArray.push(todoInstance);
            } 
        });

        if ((projectArray.length === 0) || (!projectArray.length)) {
            const generalProject = new Project('general');
            projectArray.push(generalProject);
        }
        console.log(projectArray);
    };

    document.addEventListener('click', () => console.log(listenerFlags))

    const mainTodoArray = [];

    retrieveStorage();

    const projectsObject = { 
        currentProject: projectArray[0]
    }

    const loadProjects = () => {
        loadProjectsModule(projectArray,projectsObject,mainTodoArray).loadProject(projectArray);

    }

    const loadTodoItems = () => {
        loadTodoFuncContainer(projectArray,projectsObject,mainTodoArray).loadTodoItemOuter();
    }

    return {loadProjects, loadTodoItems, projectsObject, projectArray }    
}






















