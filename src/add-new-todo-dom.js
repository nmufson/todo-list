import { loadTodoFuncContainer } from "./load-divs-dom";
import { listenerFlags } from "./load-projects";
import { editFuncContainer } from "./edit-todo-dom";
import { Todo } from "./create-todo";

export const addNewTodoFuncContainer = (projectArray,projectsObject,mainTodoArray) => {
    const loadAddNewTodoDiv = () => {
        
        const todoListDivContainer = document.querySelector('#todo-list-container');
        const addNewTodoDiv = document.createElement('div');
        addNewTodoDiv.classList.add('add-new-todo-div-small');
        const para = document.createElement('p');
        const plusIcon = document.createElement('img');
        
        plusIcon.setAttribute('src', '../src/icons/plus.svg')
        para.textContent = 'Add Task';

        todoListDivContainer.appendChild(addNewTodoDiv);
        addNewTodoDiv.appendChild(plusIcon);
        addNewTodoDiv.appendChild(para);

        addNewTodoDiv.addEventListener('click', () => {
            if (!listenerFlags.deleteIconShouldRun) return;
            addNewTodoDiv.remove();
            loadNewTodoInputSmall(projectArray);
        })
    }

    const loadNewTodoInputSmall = () => {
        loadTodoFuncContainer(projectArray,projectsObject,mainTodoArray).loadTodoItemOuter();
        const todoListDivContainer = document.querySelector('#todo-list-container');
        const addNewTodoDivSmall = document.querySelector('.add-new-todo-div-small');
        addNewTodoDivSmall.remove();
        const addNewTodoDiv = document.createElement('div');
        addNewTodoDiv.classList.add('add-new-todo-input');
       
        const nameInput = document.createElement('input');
        const descriptionInput = document.createElement('input');
        const dueDateInput = document.createElement('input');
        const priorityInput = document.createElement('select');
        const leftDiv = document.createElement('div');
        const middleDiv = document.createElement('div');
        const rightDiv = document.createElement('div');
        const addButton = document.createElement('button');
        const cancelButton = document.createElement('button');

        editFuncContainer(projectArray,projectsObject).generatePriorityInput(priorityInput);

        nameInput.setAttribute('type','text');
        nameInput.setAttribute('placeholder','Task Name');
        descriptionInput.setAttribute('type','text');
        descriptionInput.setAttribute('placeholder','Description');
        dueDateInput.setAttribute('type','date');

        
        leftDiv.classList.add('left-div-add');
        middleDiv.classList.add('middle-div-add');
        rightDiv.classList.add('right-div-add');
        

        todoListDivContainer.appendChild(addNewTodoDiv);

        addNewTodoDiv.appendChild(leftDiv);
        addNewTodoDiv.appendChild(middleDiv);
        addNewTodoDiv.appendChild(rightDiv);
       
        leftDiv.appendChild(nameInput);
        leftDiv.appendChild(descriptionInput);
        middleDiv.appendChild(dueDateInput);
        middleDiv.appendChild(priorityInput);
        rightDiv.appendChild(addButton);
        rightDiv.appendChild(cancelButton);
    
        addButton.textContent = 'Add';
        cancelButton.textContent = 'Cancel';

        addButton.addEventListener('click', () => confirmNewTodoInput(descriptionInput,nameInput,dueDateInput,priorityInput));
        cancelButton.addEventListener('click', () => {
            addNewTodoDiv.remove();
            loadAddNewTodoDiv();
        })
    }

    const confirmNewTodoInput = (descriptionInput,nameInput,dueDateInput,priorityInput) => {
        const projectDivNodeList = document.querySelectorAll('.project-item');
        const projectDivArray = Array.from(projectDivNodeList);
        const currentProjectDiv = document.querySelector('#selected-project-div');
        const index = projectDivArray.indexOf(currentProjectDiv);
        const currentProject = projectArray[index];
        
        const name = nameInput.value;
        const description = descriptionInput.value;
        const date = dueDateInput.value;
        const priority = priorityInput.value;
        if (name ==='') return;

        const newTodo = new Todo(name,description,date,priority,currentProject.name);
        currentProject.addTodo(newTodo);

        loadTodoFuncContainer(projectArray,projectsObject,mainTodoArray).loadTodoItemOuter();
        loadTodoFuncContainer(projectArray,projectsObject,mainTodoArray).populateStorage();
    }

    return {loadAddNewTodoDiv, loadNewTodoInputSmall, confirmNewTodoInput}
}