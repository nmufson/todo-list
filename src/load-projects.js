
import { loadPage } from "./dom-manipulation.js";
import { makeTodoDiv } from "./make-todo-div.js";
import { Project } from "./project.js";


export let listenerFlags = {
    changeProjectShouldRun: true,
    deleteIconShouldRun: true,
    addNewProjectShouldRun: true,
    newTodoInputShouldRun: true,
    checkBoxShouldRun: true,
    editTodoIconShouldRun: true,
}

export const loadProjectsModule = (projectArray,projectsObject) => {
    
    

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
        const projectDivNodeList = document.querySelectorAll('.project-item');
        const currentProject = projectsObject.currentProject;
        const index = projectArray.indexOf(currentProject); 
        projectDivNodeList[index].setAttribute('id','selected-project-div');

        addChangeProjectListeners();
        loadAddNewProjectListItem();
        addNewProjectEventListener();
    }

    const loadAddNewProjectListItem = () => {
        const addNewProjectListItem = document.createElement('li');
        addNewProjectListItem.id = 'add-project-li';
        const projectList = document.querySelector('#project-list');
        const para = document.createElement('p');
        const plusIcon = document.createElement('img');

        plusIcon.setAttribute('src', '../src/icons/plus.svg')
        para.textContent = 'Add project';

        projectList.appendChild(addNewProjectListItem);
        addNewProjectListItem.appendChild(para);
        addNewProjectListItem.appendChild(plusIcon);
    }

    const addNewProjectEventListener = () => {
        const addNewProjectListItem = document.querySelector('#add-project-li');
        addNewProjectListItem.addEventListener('click', addNewProjectPopUp);
    }

    const turnFlagsFalse = () => {
        Object.keys(listenerFlags).forEach((key) => {
            listenerFlags[key] = false;
        })
    }
    const turnFlagsTrue = () => {
        Object.keys(listenerFlags).forEach((key) => {
            listenerFlags[key] = true;
        })
    }
    
    const addNewProjectPopUp = () => {
        if (!listenerFlags.addNewProjectShouldRun) return;
       turnFlagsFalse();
        
        
        const contentArea = document.querySelector('#content-area');

        const confirmAddProjectDiv = document.createElement('div');
        const para = document.createElement('p');
        const input = document.createElement('input');
        const buttonDiv = document.createElement('div');
        const confirmButton = document.createElement('button');
        const cancelButton = document.createElement('button');

        confirmAddProjectDiv.setAttribute('id','add-project-pop-up');
        input.setAttribute('type','text');
        input.setAttribute('class','new-project-text-input');


        confirmButton.id = 'add-button';
        cancelButton.id = 'cancel-button';

        para.textContent = 'Enter project name';
        confirmButton.textContent = 'Add';
        cancelButton.textContent = 'Cancel';

        contentArea.appendChild(confirmAddProjectDiv);
        confirmAddProjectDiv.appendChild(para);
        confirmAddProjectDiv.appendChild(input);
        confirmAddProjectDiv.appendChild(buttonDiv);
        buttonDiv.appendChild(confirmButton);
        buttonDiv.appendChild(cancelButton);

        //make a confirm new project event listener
        cancelButton.addEventListener('click', () => cancelAddProject());
        confirmButton.addEventListener('click', () => confirmAddProject());
    }
    
    const cancelAddProject = () => {
        const confirmAddProjectDiv = document.querySelector('#add-project-pop-up');
        confirmAddProjectDiv.remove();
        turnFlagsTrue();
    }

    const confirmAddProject = () => {
        const newProjectNameInput = document.querySelector('.new-project-text-input');
        const confirmAddProjectDiv = document.querySelector('#add-project-pop-up');
        const newProjectName = newProjectNameInput.value;
        if (!newProjectName) return;

        const newProject = new Project(newProjectName);
        projectArray.push(newProject);
        confirmAddProjectDiv.remove();
        loadProject(projectArray);

        turnFlagsTrue();
    }
    
    const addChangeProjectListeners = () => {
        const projectDivNodeList = document.querySelectorAll('.project-item');
        projectDivNodeList.forEach((div) => {
            div.addEventListener('click', changeProjectOuter)
        })
    }
    
    const removeChangeProjectListeners = () => {
        const projects = document.querySelectorAll('.project-item');
        projects.forEach((project) => {
            project.removeEventListener('click', changeProjectOuter)
        })
    }
    
    //make this change the todos we see and also change the currentProject variable so we know which project to add/delete todos to
    const changeProjectOuter = (event) => {
        if (!listenerFlags.changeProjectShouldRun) return;
        const selectedProjectDiv = document.querySelector('#selected-project-div');
        if (selectedProjectDiv) selectedProjectDiv.removeAttribute('id');

        const projectDivNodeList = document.querySelectorAll('.project-item');
        const projectDivArray = Array.from(projectDivNodeList);
        const clickedElement = event.target;
        console.log(clickedElement);
        const index = projectDivArray.indexOf(clickedElement);
        console.log(index);
        
        projectsObject.currentProject = projectArray[index];
        clickedElement.setAttribute('id','selected-project-div');
        
        

        makeTodoDiv(projectArray,projectsObject).loadTodoItemOuter();
        
    };

    return { loadProject, addChangeProjectListeners, loadAddNewProjectListItem, addNewProjectEventListener, turnFlagsFalse, turnFlagsTrue }
}

