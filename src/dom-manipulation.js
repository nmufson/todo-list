import { start } from "./index.js";
import { makeDiv } from "./make-todo-div.js";
import { loadProject, addChangeProjectListeners, removeChangeProjectListeners } from "./load-projects.js";
import { Project } from './project.js'


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
    

    const projectArray = start();
    const projectDivInstanceArray = [];
    
    const projectsObject = { currentProject: projectArray[0] }


    
    const loadProjects = () => {
        loadProject();
        pushInstances(projectsObject,projectDivInstanceArray);
        console.log(projectDivInstanceArray);
        addChangeProjectListeners(projectDivInstanceArray);
    }

    const loadTodoItems = () => {
        loadTodoItemOuter(projectsObject)
        // addDeleteListener(currentProject);
    }



    
    
    document.addEventListener('click', () => console.log(projectsObject.currentProject));

    

    const addDeleteListener = () => addDeleteListenerOuter(contentArea, currentProject, projectListener);
    
    
    
    
    
    return {loadProjects, loadTodoItems}    
}


const pushInstances = (projectsObject,projectDivInstanceArray) => {
    const projectDivNodeList = document.querySelectorAll('.project-item');
    const projectDivArray = Array.from(projectDivNodeList);
    projectDivArray.forEach((element) => {
        const index = projectDivArray.indexOf(element);
        //creates function definition of changeProjectOuter with project's index passed as an argument
        //pushes each function definition into our array
        const changeProject = () => changeProjectOuter(projectsObject,index);
        projectDivInstanceArray.push(changeProject);
    })
}





//make this change the todos we see and also change the currentProject variable so we know which project to add/delete todos to
export const changeProjectOuter = (projectsObject,index) => {
    const projectArray = start();
    projectsObject.currentProject = projectArray[index];
    loadTodoItemOuter(projectsObject);
    
};




const loadTodoItemOuter = (projectsObject) => {
    const todoListDivContainer = document.querySelector('#todo-list-container');
    todoListDivContainer.innerHTML = '';

    const currentProject = projectsObject.currentProject;

    const TodoList = currentProject.todoArray;
    TodoList.forEach((todo) => makeDiv(todo))
}

export const addDeleteListenerOuter = (contentArea,currentProject,projectListener) => {
    const deleteIconNodeList = document.querySelectorAll('.delete-icon');
    const deleteIconArray = Array.from(deleteIconNodeList);
    const projectDivNodeList = document.querySelectorAll('.project-item');
    const projectDivArray = Array.from(projectDivNodeList);
    
    deleteIconArray.forEach((icon) => {
        const iconIndex = deleteIconArray.indexOf(icon);
        icon.addEventListener('click', () => confirmDeletePopUp(iconIndex,currentProject,projectListener));
        icon.addEventListener('click',() => {
            projectDivArray.forEach((div) => {
                div.removeEventListener('click',projectListener);
            })
        });
        icon.addEventListener('click', removeListeners);
    })
}

const removeAllEventListeners = (nodeList) => {
    nodeList.forEach((node) => {
        const clone = node.cloneNode(true);
        node.parentNode.replaceChild(clone, node);
    })
    
} 

const addProjectDivListener = (projectDivNodeList) => {
    projectDivNodeList.forEach((div) => {
        div.addEventListener('click', () => {
            projectListenerOuter(projectIndex,todoListDivContainer,contentArea,projectArray,makeTodoDiv,currentProject,addDeleteListener)
        });
    })
}

const confirmDeletePopUp = (iconIndex,currentProject,projectListener) => {
    const contentArea = document.querySelector('#content-area');
    const projectDivNodeList = document.querySelectorAll('.project-item');
    projectDivNodeList.forEach((div) => {
        div.removeEventListener('click', projectListener);
    })
    
    const confirmDiv = document.createElement('div');
    const confirmPara = document.createElement('p');
    const buttonDiv = document.createElement('div');
    const deleteButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    confirmDiv.classList.add('confirm-div');

    contentArea.appendChild(confirmDiv);
    confirmDiv.appendChild(confirmPara);
    confirmDiv.appendChild(buttonDiv);
    buttonDiv.appendChild(deleteButton);
    buttonDiv.appendChild(cancelButton);

    confirmPara.textContent = 'Delete To-do?';
    deleteButton.textContent = 'Delete';
    cancelButton.textContent = 'Cancel';

    deleteButton.addEventListener('click', () => {
        confirmDelete(iconIndex,currentProject)
        addProjectDivListener(projectDivNodeList)
    })
}



const removeListeners = () => {
    const deleteIconNodeList = document.querySelectorAll('.delete-icon');
    const deleteIconArray = Array.from(deleteIconNodeList);
    deleteIconArray.forEach((icon) => icon.removeEventListener('click', confirmDeletePopUp))

    const projectDivNodeList = document.querySelectorAll('.project-item');
    projectDivNodeList.forEach((node) => {
        const clone = node.cloneNode(true);
        node.parentNode.replaceChild(clone, node);
    })
}


const confirmDelete = (iconIndex,currentProject) => {
    const todoDivNodeList = document.querySelectorAll('.todo-item');
    const confirmDiv = document.querySelector('.confirm-div');
    currentProject.removeTodo(currentProject.todoArray[iconIndex]);

    confirmDiv.remove();
    todoDivNodeList[iconIndex].remove();
}

const cancelDelete = () => {
    const confirmDiv = document.querySelector('.confirm-div');
    confirmDiv.remove();
}

