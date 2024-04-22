import { start } from "./index.js";

export const loadProject = () => {
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

export const addChangeProjectListeners = (projectDivInstanceArray) => {
    const projectArray = start();
    const projectDivNodeList = document.querySelectorAll('.project-item');
    const projectDivArray = Array.from(projectDivNodeList);

    projectDivArray.forEach((div) => {
        const index = projectDivArray.indexOf(div);
        const changeProject = projectDivInstanceArray[index];
        div.addEventListener('click', changeProject)
    })
}

export const removeChangeProjectListeners = (projectDivInstanceArray) => {
    const projectArray = start();
    const projectDivNodeList = document.querySelectorAll('.project-item');
    const projectDivArray = Array.from(projectDivNodeList);

    projectDivArray.forEach((div) => {
        const index = projectDivArray.indexOf(div);
        const changeProject = projectDivInstanceArray[index];
        div.removeEventListener('click', changeProject)
    })
}