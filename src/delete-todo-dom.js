import { makeTodoDiv } from "./make-todo-div";
import { loadProjectsModule } from "./load-projects";
import { listenerFlags } from "./load-projects";
import { loadTodoFuncContainer } from "./load-divs-dom";

export const deleteTodoFuncContainer = (projectArray,projectsObject) => {
    const confirmDeletePopUp = (event) => {
        if (!listenerFlags.deleteIconShouldRun) return;
        loadProjectsModule().turnFlagsFalse();
    
        const nodeList = document.querySelectorAll('.delete-icon');
        const nodeArray = Array.from(nodeList);
        const element = event.target;
        const index  = nodeArray.indexOf(element);
        
        const contentArea = document.querySelector('#content-area');
        const confirmDiv = document.createElement('div');
        const confirmPara = document.createElement('p');
        const buttonDiv = document.createElement('div');
        const deleteButton = document.createElement('button');
        const cancelButton = document.createElement('button');
    
        contentArea.appendChild(confirmDiv);
        confirmDiv.appendChild(confirmPara);
        confirmDiv.appendChild(buttonDiv);
        buttonDiv.appendChild(deleteButton);
        buttonDiv.appendChild(cancelButton);
    
        confirmDiv.classList.add('confirm-div');
    
        confirmPara.textContent = 'Delete To-do?';
        deleteButton.textContent = 'Delete';
        cancelButton.textContent = 'Cancel';
    
        deleteButton.addEventListener('click', () => confirmDelete(index))
        cancelButton.addEventListener('click', cancelDelete);
    
    }

    const confirmDelete = (index) => {
        const todoDivNodeList = document.querySelectorAll('.todo-item');
        const todoDivArray = Array.from(todoDivNodeList);
        const confirmDiv = document.querySelector('.confirm-div');
        const currentProject = projectsObject.currentProject;
        currentProject.removeTodo(currentProject.todoArray[index]);
    
        confirmDiv.remove();
        
        loadTodoFuncContainer(projectArray,projectsObject).loadTodoItemOuter();
        loadProjectsModule().turnFlagsTrue();
    }

    const cancelDelete = () => {
        const confirmDiv = document.querySelector('.confirm-div');
        confirmDiv.remove();
        loadProjectsModule().turnFlagsTrue();
    
    }

    return {confirmDeletePopUp, confirmDelete, cancelDelete}
}






