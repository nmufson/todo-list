import { start } from "./index.js";
import { loadPage } from "./dom-manipulation.js";
import { makeTodoDiv } from "./make-todo-div.js";

export const loadProjectsModule = () => {
    
    const loadProject = () => {
        const projectArray = start();
        const projectBar = document.querySelector('#project-bar');
        projectBar.innerHTML = '';
            
        document.body.appendChild(projectBar);
        
        const projectList = document.createElement('ul');
        projectBar.appendChild(projectList);
    
        projectArray.forEach((project) => {
            const projectListItem = document.createElement('li');
            const projectItemDiv = document.createElement('div');
    
            projectItemDiv.id = `project-div-${projectArray.indexOf(project)}`;
            projectItemDiv.classList.add('project-item');
            projectItemDiv.textContent = project.name;
    
            projectList.appendChild(projectListItem);
            projectListItem.appendChild(projectItemDiv);
        })
    
    
    }
    
    //for each project, generate a function reference of changeProjectOuter using that specific project
    //push each reference instance to an array which we can later use to both add and remove
    //event listeners 
    const pushChangeProjectInstances = (projectsObject,listenerObject) => {
        const projectDivNodeList = document.querySelectorAll('.project-item');
        const projectDivArray = Array.from(projectDivNodeList);
        listenerObject.projectDivs.splice(0)

        projectDivArray.forEach((element) => {
            const index = projectDivArray.indexOf(element);
            //creates function definition of changeProjectOuter with project's index passed as an argument
            //pushes each function definition into our array
            const changeProject = () => changeProjectOuter(projectsObject,index,listenerObject);
            listenerObject.projectDivs.push(changeProject);
        })
    }
    
    const addChangeProjectListeners = (listenerObject) => {
        const projectDivNodeList = document.querySelectorAll('.project-item');
        const projectDivArray = Array.from(projectDivNodeList);
    
        projectDivArray.forEach((div) => {
            const index = projectDivArray.indexOf(div);
            const changeProject = listenerObject.projectDivs[index];
            
            div.addEventListener('click', changeProject)
        })
    }
    
    const removeChangeProjectListeners = (listenerObject) => {
        const projectDivNodeList = document.querySelectorAll('.project-item');
        const projectDivArray = Array.from(projectDivNodeList);
    
        projectDivArray.forEach((div) => {
            const index = projectDivArray.indexOf(div);
            const changeProject = listenerObject.projectDivs[index];
            div.removeEventListener('click', changeProject)
        })
    }
    
    //make this change the todos we see and also change the currentProject variable so we know which project to add/delete todos to
    const changeProjectOuter = (projectsObject,index,listenerObject) => {
        const projectArray = start();
        projectsObject.currentProject = projectArray[index];

        makeTodoDiv().loadTodoItemOuter(projectsObject);
        makeTodoDiv().pushDeleteInstances(projectsObject,listenerObject);
        makeTodoDiv().addDeleteIconListeners(listenerObject);
    };

    return { loadProject, pushChangeProjectInstances, addChangeProjectListeners, removeChangeProjectListeners }
}

