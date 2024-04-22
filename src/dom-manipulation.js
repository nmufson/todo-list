import { start } from "./index.js";
import { makeTodoDiv } from "./make-todo-div.js";
import { loadProjectsModule } from "./load-projects.js";
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

    const listenerObject = {
        projectDivs: [],
        deleteIcons: [],
        editIcons: []
    }
    
    const projectsObject = { currentProject: projectArray[0] }


    
    const loadProjects = () => {
        loadProjectsModule().loadProject();
        loadProjectsModule().pushChangeProjectInstances(projectsObject,listenerObject);
        console.log(listenerObject.projectDivs);
        loadProjectsModule().addChangeProjectListeners(listenerObject);
    }

    const loadTodoItems = () => {
        makeTodoDiv().loadTodoItemOuter(projectsObject);
        makeTodoDiv().pushDeleteInstances(projectsObject,listenerObject);
        makeTodoDiv().addDeleteIconListeners(listenerObject);
    }



    
    
    document.addEventListener('click', () => {
        console.log(projectsObject.currentProject.name);
        console.log(listenerObject.projectDivs);
        console.log(listenerObject.deleteIcons);
    });

    
    
    
    
    
    
    return {loadProjects, loadTodoItems}    
}










const removeAllEventListeners = (nodeList) => {
    nodeList.forEach((node) => {
        const clone = node.cloneNode(true);
        node.parentNode.replaceChild(clone, node);
    })
    
} 











