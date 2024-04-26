
import { loadTodoFuncContainer } from "./load-divs-dom";


export const editFuncContainer = (projectArray,projectsObject) => {
    const clickEditIcon = (editIcon,editIconNodeList) => {
        loadTodoFuncContainer(projectArray,projectsObject,mainTodoArray).loadTodoItemOuter();
        const editIconArray = Array.from(editIconNodeList);
        const index = editIconArray.indexOf(editIcon);
        const currentProject = projectsObject.currentProject;
        const currentTodo = currentProject.todoArray[index];
        
        const nameH3 = document.querySelectorAll('.name-h3')[index];
        const descriptionPara = document.querySelectorAll('.description-para')[index];
        const dueDatePara = document.querySelectorAll('.due-date-para')[index];
        const priorityPara = document.querySelectorAll('.priority-para')[index];
        const bottomDiv = document.querySelectorAll('.bottom-div')[index];
    
        const bottomRightDiv = document.createElement('div');
        const saveButton = document.createElement('button');
        const cancelButton = document.createElement('button');
    
        bottomDiv.removeAttribute('class');
        bottomDiv.classList.add('bottom-div-edit');
        bottomRightDiv.classList.add('bottom-right-div');
    
        bottomDiv.appendChild(bottomRightDiv);
        bottomRightDiv.appendChild(saveButton);
        bottomRightDiv.appendChild(cancelButton);
    
        const parentNameH3 = nameH3.parentNode;
        const parentDescriptionPara = descriptionPara.parentNode;
        const parentdueDatePara = dueDatePara.parentNode;
        const parentpriorityPara = priorityPara.parentNode;
    
        const nameInput = document.createElement('input');
        const descriptionInput = document.createElement('input');
        const dueDateInput = document.createElement('input');
        const priorityInput = document.createElement('select');
        
        generatePriorityInput(priorityInput);
    
        nameInput.setAttribute('type','text');
        descriptionInput.setAttribute('type','text');
        dueDateInput.setAttribute('type','date');
    
        nameInput.value = currentTodo.name;
        descriptionInput.value = currentTodo.description;
        dueDateInput.value = currentTodo.dueDate;
        priorityInput.value = currentTodo.priority;
    
        saveButton.textContent = 'Save';
        cancelButton.textContent = 'Cancel';
    
        parentNameH3.replaceChild(nameInput, nameH3);
        parentDescriptionPara.replaceChild(descriptionInput, descriptionPara);
        parentdueDatePara.replaceChild(dueDateInput, dueDatePara);
        parentpriorityPara.replaceChild(priorityInput,priorityPara);
    
        saveButton.addEventListener('click', () => saveEditTodo(currentTodo,nameInput,descriptionInput,dueDateInput,priorityInput))
        cancelButton.addEventListener('click', loadTodoFuncContainer(projectArray,projectsObject,mainTodoArray).loadTodoItemOuter)
    };

    const saveEditTodo = (currentTodo,nameInput,descriptionInput,dueDateInput,priorityInput) => {
        const object = {
            name: nameInput.value,
            description: descriptionInput.value,
            dueDate: dueDateInput.value,
            priority: priorityInput.value,
        }
        currentTodo.editTodo(object);
        loadTodoFuncContainer(projectArray,projectsObject,mainTodoArray).loadTodoItemOuter();
    };

    const generatePriorityInput = (priorityInput) => {
        const blankPriorityOption = document.createElement('option');
        const highPriorityOption = document.createElement('option');
        const mediumPriorityOption = document.createElement('option');
        const lowPriorityOption = document.createElement('option');

        priorityInput.appendChild(blankPriorityOption);
        priorityInput.appendChild(highPriorityOption);
        priorityInput.appendChild(mediumPriorityOption);
        priorityInput.appendChild(lowPriorityOption);

        lowPriorityOption.textContent = 'Low';
        mediumPriorityOption.textContent = 'Medium';
        highPriorityOption.textContent = 'High';
    }

    return {clickEditIcon, saveEditTodo, generatePriorityInput}

}


