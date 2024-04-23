
import { loadPage } from "./dom-manipulation.js";
import { makeTodoDiv } from "./make-todo-div.js";
import { Project } from "./project.js";

export const loadProjectsModule = (listenerObject,projectArray) => {
    
    const addNewProjectListItem = document.createElement('li');
    addNewProjectListItem.id = 'add-project-li';
    const projectDivNodeList = document.querySelectorAll('.project-item');
    const projectDivArray = Array.from(projectDivNodeList);
    const addProject = listenerObject.addProject[0];
    const confirmAddProjectDiv = document.createElement('div');
    confirmAddProjectDiv.setAttribute('id','add-project-pop-up');

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
        const para = document.createElement('p');
        const plusIcon = document.createElement('img');

        plusIcon.setAttribute('src', '../src/icons/plus.svg')
        para.textContent = 'Add project';

        projectList.appendChild(addNewProjectListItem);
        addNewProjectListItem.appendChild(para);
        addNewProjectListItem.appendChild(plusIcon);
    }

    const addNewProjectEventListener = (listenerObject) => {
        const addNewProjectListItem = document.querySelector('#add-project-li')
        addNewProjectListItem.addEventListener('click', () => addNewProjectPopUp(listenerObject));
    }

    const addNewProjectPopUp = (listenerObject) => {
        
        const contentArea = document.querySelector('#content-area');
        
        const para = document.createElement('p');
        const input = document.createElement('input');
        const buttonDiv = document.createElement('div');
        const confirmButton = document.createElement('button');
        const cancelButton = document.createElement('button');

        
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

        
        addNewProjectListItem.removeEventListener('click', addProject);
        removeChangeProjectListeners(listenerObject)
        makeTodoDiv().removeDeleteIconListeners(listenerObject);

        //make a confirm new project event listener
        cancelButton.addEventListener('click', () => cancelAddProject(listenerObject));
        confirmButton.addEventListener('click', () => confirmAddProject(listenerObject));
    }

    const cancelAddProject = (listenerObject) => {
        confirmAddProjectDiv.remove();
        addChangeProjectListeners(listenerObject);
        makeTodoDiv().addDeleteIconListeners(listenerObject);
        addNewProjectEventListener(listenerObject);
    }

    const confirmAddProject = (listenerObject) => {
        const newProjectNameInput = document.querySelector('.new-project-text-input');
        const newProjectName = newProjectNameInput.value;

        const newProject = new Project(newProjectName);
        projectArray.push(newProject);
        confirmAddProjectDiv.remove();
        addChangeProjectListeners(listenerObject);
        makeTodoDiv().addDeleteIconListeners(listenerObject);
        addNewProjectEventListener(listenerObject);
        console.log(projectArray);
        loadProject(projectArray);
        loadAddNewProjectListItem();
        
    }

    
    //for each project, generate a function reference of changeProjectOuter using that specific project
    //push each reference instance to an array which we can later use to both add and remove
    //event listeners 
    const pushChangeProjectInstances = (projectArray,projectsObject,listenerObject) => {
        
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
        
    
        projectDivArray.forEach((div) => {
            const index = projectDivArray.indexOf(div);
            const changeProject = listenerObject.projectDivs[index];

            div.addEventListener('click', changeProject)
        })
    }
    
    const removeChangeProjectListeners = (listenerObject) => {
        
    
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

