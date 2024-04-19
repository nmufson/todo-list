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
        
        loadTodoItem(todoListDivContainer,contentArea,projectIndex,projectArray,makeTodoDiv)
        addDeleteListener(currentProject);
    }
    
    const addListeners = () => {
        projectDivArray.forEach((div) => {
            
            div.addEventListener('click', () => {
                projectIndex = projectDivArray.indexOf(div);
                loadTodoItem(todoListDivContainer,contentArea,projectIndex,projectArray,makeTodoDiv);
                currentProject = projectArray[projectIndex];
                addDeleteListener(currentProject);
            })
        })

    }

    const addDeleteListener = () => addDeleteListenerOuter(currentProject);
    
    const makeTodoDiv = (todo) => makeDiv(todo,todoListDivContainer);
    
    
    
    return {loadProjects, loadTodoItems, addListeners}    
}





const loadTodoItem = (todoListDivContainer,contentArea,projectIndex,projectArray,makeTodoDiv) => {
    todoListDivContainer.innerHTML = '';

    document.body.appendChild(contentArea);
    contentArea.appendChild(todoListDivContainer);

    const projectTodoList = projectArray[projectIndex].todoArray;

    projectTodoList.forEach((todo) => makeTodoDiv(todo))
}

export const addDeleteListenerOuter = (currentProject) => {
    const deleteIconNodeList = document.querySelectorAll('.delete-icon');
    const deleteIconArray = Array.from(deleteIconNodeList);

    const todoDivNodeList = document.querySelectorAll('.todo-item');
    

    deleteIconArray.forEach((icon) => {
        const iconIndex = deleteIconArray.indexOf(icon);
        icon.addEventListener('click', () => {
            
            currentProject.removeTodo(currentProject.todoArray[iconIndex]);
            todoDivNodeList[iconIndex].remove();
            currentProject.todoArray.forEach(todo => console.log(todo));
        })
    })
}


// const loadTodoItem = (todoListDivContainer,contentArea,projectDiv,projectArray,makeTodoDiv) => {
//     todoListDivContainer.innerHTML = '';

//     document.body.appendChild(contentArea);
//     contentArea.appendChild(todoListDivContainer);

//     const projectIndex = projectArray.indexOf(currentProject);

//     const projectId = projectDiv.id;
//     const projectIndex = projectId.substring(12);
//     const projectTodoList = projectArray[projectIndex].todoArray;

//     projectTodoList.forEach((todo) => makeTodoDiv(todo))
// }