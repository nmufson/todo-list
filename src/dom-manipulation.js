import { start } from "./index.js";
import { makeDiv } from "./make-todo-div.js";
import { loadProject } from "./load-projects.js";
import { Project } from './project.js'


export const loadPage = () => {
    const contentArea = document.createElement('div');
    const projectBar = document.createElement('div');
    const todoListDivContainer = document.createElement('div');
    contentArea.id = 'content-area';
    projectBar.id = 'project-bar';
    todoListDivContainer.id = 'todo-list-container';
    
    const projectArray = start();
    let projectDivArray = [];
    let currentProject = projectArray[0];
    let projectIndex = projectArray.indexOf(currentProject);
    
    
    const loadProjects = () => loadProject(projectBar, projectArray, projectDivArray);

    const loadTodoItems = () => {
        loadTodoItemOuter(todoListDivContainer,contentArea,projectIndex,projectArray,makeTodoDiv)
        addDeleteListener(currentProject);
    }

    const projectListener = () => projectListenerOuter(projectIndex,todoListDivContainer,contentArea,projectArray,makeTodoDiv,currentProject,addDeleteListener)
    
    const addListeners = () => {
        projectDivArray.forEach((div) => {
            div.addEventListener('click', () => {
                const divIndex = projectDivArray.indexOf(div);
                currentProject = projectArray[divIndex];
            })
            div.addEventListener('click', projectListener)
            
        });
        
    }

    const addDeleteListener = () => addDeleteListenerOuter(contentArea, currentProject);
    
    const makeTodoDiv = (todo) => makeDiv(todo,todoListDivContainer);
    
    
    
    return {loadProjects, loadTodoItems, addListeners}    
}

const projectListenerOuter = (projectIndex,todoListDivContainer,contentArea,projectArray,makeTodoDiv,currentProject,addDeleteListener) => {
    projectIndex = projectArray.indexOf(currentProject);
    loadTodoItemOuter(todoListDivContainer,contentArea,projectIndex,projectArray,makeTodoDiv);
    currentProject = projectArray[projectIndex];
    addDeleteListener(currentProject);
};


const loadTodoItemOuter = (todoListDivContainer,contentArea,projectIndex,projectArray,makeTodoDiv) => {
    todoListDivContainer.innerHTML = '';

    document.body.appendChild(contentArea);
    contentArea.appendChild(todoListDivContainer);

    const projectTodoList = projectArray[projectIndex].todoArray;

    projectTodoList.forEach((todo) => makeTodoDiv(todo))
}

export const addDeleteListenerOuter = (contentArea,currentProject) => {
    const deleteIconNodeList = document.querySelectorAll('.delete-icon');
    const deleteIconArray = Array.from(deleteIconNodeList);

    const todoDivNodeList = document.querySelectorAll('.todo-item');
    const confirmDeletePopUp = () => {
        const projectDivNodeList = document.querySelectorAll('.project-item');
        projectDivNodeList.forEach((div) => {
            div.removeEventListener
        })
        
        const confirmDiv = document.createElement('div');
        const confirmText = document.createElement('p');
        const buttonDiv = document.createElement('div');
        const confirmButton = document.createElement('button');
        const cancelButton = document.createElement('button');
    
        confirmDiv.classList.add('confirm-div');
    
        contentArea.appendChild(confirmDiv);
        confirmDiv.appendChild(confirmText);
        confirmDiv.appendChild(buttonDiv);
        buttonDiv.appendChild(confirmButton);
        buttonDiv.appendChild(cancelButton);
        
    
        // currentProject.removeTodo(currentProject.todoArray[iconIndex]);
        // todoDivNodeList[iconIndex].remove();
        currentProject.todoArray.forEach(todo => console.log(todo));
        deleteIconArray.forEach((icon) => icon.removeEventListener('click', confirmDeletePopUp))
    }

    deleteIconArray.forEach((icon) => {
        const iconIndex = deleteIconArray.indexOf(icon);
        icon.addEventListener('click', confirmDeletePopUp);
    })
}


