import { start } from "./index.js";


export const loadPage = () => {
    const contentArea = document.createElement('div');
    contentArea.id = 'content-area';

    const projectBar = document.createElement('div');
    projectBar.id = 'project-bar';

    const todoListDivContainer = document.createElement('div');
    todoListDivContainer.id = 'todo-list-container';
    
    const projectArray = start();

    let projectDivArray;
    
    const loadProjects = () => {
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

        projectDivArray = projectBar.querySelectorAll('.project-item');
    };
    

    
    
    
    

  
    
    
   
    
    const loadTodoItems = (projectDiv = projectDivArray[0]) => {
        todoListDivContainer.innerHTML = '';

        document.body.appendChild(contentArea);
        contentArea.appendChild(todoListDivContainer);

        const projectId = projectDiv.id;
        const projectIndex = projectId.substring(12);
        const projectTodoList = projectArray[projectIndex].todoArray;

        projectTodoList.forEach((todo) => makeTodoDiv(todo))
    }
    
    const addProjectDivListener = () => {
        projectDivArray.forEach((div) => {
            div.addEventListener('click', () => loadTodoItems(div))
        })
    }
    
    const makeTodoDiv = (todo) => {
        const todoDiv = document.createElement('div');
        const todoTextDiv = document.createElement('div');
        const iconDiv = document.createElement('div');
        const todoHeader = document.createElement('h3');
        const todoP = document.createElement('p');
        todoDiv.classList.add('todo-item');
        
        
        todoListDivContainer.appendChild(todoDiv);
        todoDiv.appendChild(todoTextDiv);
        todoDiv.appendChild(iconDiv);
        todoTextDiv.appendChild(todoHeader);
        todoTextDiv.appendChild(todoP);
        
        
        todoHeader.textContent = todo.title;
        todoP.textContent = todo.description;
    }
    
    
    return {loadProjects, loadTodoItems, addProjectDivListener, todoListDivContainer}    
}



