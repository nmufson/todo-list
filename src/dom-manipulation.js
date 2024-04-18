import { start } from "./index.js";

export const loadPage = () => {
    const projectBar = document.createElement('div');
    projectBar.id = 'project-bar';

    const contentArea = document.createElement('div');
    contentArea.id = 'content-area';

    document.body.appendChild(projectBar);
    document.body.appendChild(contentArea);

    const projectArray = start();
    const projectList = document.createElement('ul');
    projectBar.appendChild(projectList);

    projectArray.forEach((project) => {
        const projectListItem = document.createElement('li');
        projectListItem.id = `project-${projectArray.indexOf(project)}`;
        projectListItem.textContent = project.name;

        projectList.appendChild(projectListItem);

    })

}