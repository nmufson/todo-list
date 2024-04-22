
import { loadPage } from "./dom-manipulation.js";
import { makeTodoDiv } from "./make-todo-div.js";

export const loadProjectsModule = () => {
    
    const loadProject = (projectArray) => {
        const projectBar = document.querySelector('#project-bar');
        projectBar.innerHTML = '';
            
        document.body.appendChild(projectBar);
        
        const projectList = document.createElement('ul');
        projectList.setAttribute('id','project-list');
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

    const loadAddNewProjectListItem = () => {
        const projectList = document.querySelector('#project-list');
        const addNewProjectListItem = document.createElement('li');
        const para = document.createElement('p');
        const plusIcon = document.createElement('img');

        addNewProjectListItem.id = 'add-project-li';

        plusIcon.setAttribute('src', '../src/icons/plus.svg')
        para.textContent = 'Add project';



        projectList.appendChild(addNewProjectListItem);
        addNewProjectListItem.appendChild(para);
        addNewProjectListItem.appendChild(plusIcon);
    }

    const addNewProjectEventListener = (listenerObject) => {
        const addProjectListItem = document.querySelector('#add-project-li');
        const addProject = listenerObject.addProject[0];

        addProjectListItem.addEventListener('click', addProject);
    }

    const addNewProjectPopUp = (listenerObject) => {
        
        const contentArea = document.querySelector('#content-area');
        const div = document.createElement('div');
        const para = document.createElement('p');
        const input = document.createElement('input');
        const buttonDiv = document.createElement('div');
        const addButton = document.createElement('button');
        const cancelButton = document.createElement('button');

        div.setAttribute('id','add-project-pop-up');
        input.setAttribute('type','text');


        addButton.id = 'add-button';
        cancelButton.id = 'cancel-button';

        para.textContent = 'Enter project name';
        addButton.textContent = 'Add';
        cancelButton.textContent = 'Cancel';

        contentArea.appendChild(div);
        div.appendChild(para);
        div.appendChild(input);
        div.appendChild(buttonDiv);
        buttonDiv.appendChild(addButton);
        buttonDiv.appendChild(cancelButton);

        removeAddNewProjectListener(listenerObject);
        removeChangeProjectListeners(listenerObject);
        makeTodoDiv().removeDeleteIconListeners(listenerObject);
    }

    

    const removeAddNewProjectListener = (listenerObject) => {
        const addNewProjectListItem = document.querySelector('#add-project-li');
        const addProject = listenerObject.addProject[0];
        addNewProjectListItem.removeEventListener('click', addProject);
    }
    
    //for each project, generate a function reference of changeProjectOuter using that specific project
    //push each reference instance to an array which we can later use to both add and remove
    //event listeners 
    const pushChangeProjectInstances = (projectArray,projectsObject,listenerObject) => {
        const projectDivNodeList = document.querySelectorAll('.project-item');
        const projectDivArray = Array.from(projectDivNodeList);
        listenerObject.projectDivs.splice(0)

        projectDivArray.forEach((element) => {
            const index = projectDivArray.indexOf(element);
            //creates function definition of changeProjectOuter with project's index passed as an argument
            //pushes each function definition into our array
            const changeProject = () => changeProjectOuter(projectArray,projectsObject,index,listenerObject);
            listenerObject.projectDivs.push(changeProject);
        })

        const addProject = () => addNewProjectPopUp(listenerObject);
        listenerObject.addProject.push(addProject);
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
    const changeProjectOuter = (projectArray,projectsObject,index,listenerObject) => {
        projectsObject.currentProject = projectArray[index];

        makeTodoDiv().loadTodoItemOuter(projectsObject);
        makeTodoDiv().pushDeleteInstances(projectsObject,listenerObject);
        makeTodoDiv().addDeleteIconListeners(listenerObject);
    };

    return { loadProject, pushChangeProjectInstances, addChangeProjectListeners, removeChangeProjectListeners, loadAddNewProjectListItem, addNewProjectEventListener }
}

