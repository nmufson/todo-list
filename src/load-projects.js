export const loadProject = (projectBar, projectArray, projectDivArray) => {
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

    const projectItems = projectBar.querySelectorAll('.project-item');

    projectItems.forEach((item) => {
        projectDivArray.push(item);
    })
}