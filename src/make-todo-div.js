import { Todo } from "./create-todo";
import { addDeleteListener } from "./dom-manipulation";
import { loadProjectsModule, listenerFlags } from "./load-projects";
import { parseISO, format } from 'date-fns';

export const makeTodoDiv = (projectArray,projectsObject) => {
    
    //make div a different color based on PRIORITY
    const makeDiv = (todo) => {
        const todoListDivContainer = document.querySelector('#todo-list-container');
        const todoDiv = document.createElement('div');
        const middleDiv = document.createElement('div');
        const topDiv = document.createElement('div');
        const topLeftDiv = document.createElement('div');
        const bottomDiv = document.createElement('div');
        const bottomLeftDiv = document.createElement('div');
        const checkBoxDiv = document.createElement('div');
        const topRightDiv = document.createElement('div');
        const iconDiv = document.createElement('div');
        const dueDateDiv = document.createElement('div');
        const priorityDiv = document.createElement('div');
        
        const nameH3 = document.createElement('h3');
        const descriptionPara = document.createElement('p');
        const dueDatePara = document.createElement('p');
        const priorityPara = document.createElement('p');

       
        
        const checkBoxIcon = document.createElement('img');
        const editIcon = document.createElement('img');
        const deleteIcon = document.createElement('img');
        const xMarkIcon = document.createElement('img');
    
        todoDiv.classList.add('todo-item');
        checkBoxDiv.classList.add('check-box-div');
        middleDiv.classList.add('middle-div');
        topDiv.classList.add('top-div');
        topLeftDiv.classList.add('top-left-div');
        topRightDiv.classList.add('top-right-div');
        bottomDiv.classList.add('bottom-div');
        bottomLeftDiv.classList.add('bottom-left-div');
        dueDateDiv.classList.add('due-date-div');
        priorityDiv.classList.add('priority-div');
        iconDiv.classList.add('icon-div');
        checkBoxIcon.classList.add('check-box-icon');
        nameH3.classList.add('name-h3');
        descriptionPara.classList.add('description-para');
        dueDatePara.classList.add('due-date-para');
        priorityPara.classList.add('priority-para');
        editIcon.classList.add('edit-icon');
        deleteIcon.classList.add('delete-icon');
        
    
        todoListDivContainer.appendChild(todoDiv);
        todoDiv.appendChild(checkBoxDiv);
        todoDiv.appendChild(middleDiv);
        todoDiv.appendChild(iconDiv);

        checkBoxDiv.appendChild(checkBoxIcon);

        middleDiv.appendChild(topDiv);
        middleDiv.appendChild(bottomDiv);

        topDiv.appendChild(topLeftDiv);
        topDiv.appendChild(topRightDiv);

        topLeftDiv.appendChild(nameH3);

        bottomDiv.appendChild(bottomLeftDiv);
        bottomLeftDiv.appendChild(descriptionPara);
        
        topRightDiv.appendChild(dueDateDiv);
        topRightDiv.appendChild(priorityDiv);

        dueDateDiv.appendChild(dueDatePara);
        priorityDiv.appendChild(priorityPara);

        iconDiv.appendChild(editIcon);
        iconDiv.appendChild(deleteIcon);

        nameH3.textContent = todo.name;
        descriptionPara.textContent = todo.description;
        priorityPara.textContent = `${todo.priority} priority`;
        //will come back to this after finishing add task functionality 
        const date = todo.dueDate;
        const newDate = new Date(date.slice(0,4),date.slice(5,7)-1,date.slice(8,10));
        dueDatePara.textContent = format(newDate, 'MMM dd');




        checkBoxIcon.setAttribute('src', '../src/icons/square.svg');
        editIcon.setAttribute('src', '../src/icons/pencil.svg');
        deleteIcon.setAttribute('src','../src/icons/delete.svg');
    }
    
    const loadTodoItemOuter = () => {
        const todoListDivContainer = document.querySelector('#todo-list-container');
        todoListDivContainer.innerHTML = '';
    
        const projectDivNodeList = document.querySelectorAll('.project-item');
        const projectDivArray = Array.from(projectDivNodeList);
        const currentProjectDiv = document.querySelector('#selected-project-div');
        const index = projectDivArray.indexOf(currentProjectDiv);
        const currentProject = projectArray[index];
    
        const TodoList = currentProject.todoArray;
        TodoList.forEach((todo) => makeDiv(todo))
        loadAddNewTodoDiv();
        addDeleteIconListeners();
        addCheckBoxListeners();
        addEditIconListeners();
        loadXMarks();


    }

    const addEditIconListeners = () => {
        const editIconNodeList = document.querySelectorAll('.edit-icon');
        editIconNodeList.forEach((editIcon) => {
            editIcon.addEventListener('click', () => clickEditIcon(editIcon,editIconNodeList))
        })
    }
    
    const clickEditIcon = (editIcon,editIconNodeList) => {
        loadTodoItemOuter();
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
        cancelButton.addEventListener('click', loadTodoItemOuter)
    }

    const saveEditTodo = (currentTodo,nameInput,descriptionInput,dueDateInput,priorityInput) => {
        const object = {
            name: nameInput.value,
            description: descriptionInput.value,
            dueDate: dueDateInput.value,
            priority: priorityInput.value,
        }
        currentTodo.editTodo(object);
        loadTodoItemOuter();
    }

    

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

    const loadNewTodoInputSmall = (projectArray) => {
        loadTodoItemOuter();
        const todoListDivContainer = document.querySelector('#todo-list-container');
        const addNewTodoDiv = document.createElement('div');
        addNewTodoDiv.classList.add('add-new-todo-input');
       
        
        const nameInput = document.createElement('input');
        const descriptionInput = document.createElement('input');
        const dueDateInput = document.createElement('input');
        const priorityInput = document.createElement('select');
        const buttonDiv = document.createElement('div');
        const addButton = document.createElement('button');
        const cancelButton = document.createElement('button');

        generatePriorityInput(priorityInput);

        nameInput.setAttribute('type','text');
        nameInput.setAttribute('placeholder','Task Name');
        descriptionInput.setAttribute('type','text');
        descriptionInput.setAttribute('placeholder','Description');
        dueDateInput.setAttribute('type','date');

        todoListDivContainer.appendChild(addNewTodoDiv);
        addNewTodoDiv.appendChild(nameInput);
        addNewTodoDiv.appendChild(descriptionInput);
        addNewTodoDiv.appendChild(dueDateInput);
        addNewTodoDiv.appendChild(priorityInput);
        addNewTodoDiv.appendChild(buttonDiv);
        buttonDiv.appendChild(addButton);
        buttonDiv.appendChild(cancelButton);
        
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
        const newTodo = new Todo(name,description,date,priority,currentProject.name);
        currentProject.addTodo(newTodo);

        loadTodoItemOuter();
    }


    const addCheckBoxListeners = () => {
        const checkBoxIconNodeList = document.querySelectorAll('.check-box-icon');
        checkBoxIconNodeList.forEach((checkBoxIcon) => {
            checkBoxIcon.addEventListener('click', () => alterCheckBox(checkBoxIcon,checkBoxIconNodeList));
        })
    }

    const loadXMarks = () => {
        const checkBoxDivNodeList = document.querySelectorAll('.check-box-div');
        const checkBoxDivArray = Array.from(checkBoxDivNodeList);
        const checkBoxIconNodeList = document.querySelectorAll('.check-box-icon')
        const xMarkNodeList = document.querySelectorAll('.xMark-icon');
        const xMarkArray = Array.from(xMarkNodeList);
        xMarkArray.forEach((xMark) => xMark.remove());
        checkBoxDivArray.forEach((div) => {
            const index = checkBoxDivArray.indexOf(div);
            const currentProject = projectsObject.currentProject;
            const currentTodo = currentProject.todoArray[index];
            const status = currentTodo.complete;
            console.log(status)
            if (status === 'yes') {
                const xMarkIcon = document.createElement('img');
                xMarkIcon.classList.add('xMark-icon');
                xMarkIcon.setAttribute('src', '../src/icons/x-mark.svg')
                div.appendChild(xMarkIcon);
            }
            const xMark = div.querySelector('.xMark-icon');
            const checkBoxIcon = div.querySelector('.check-box-icon');
            if (xMark) {
                
                xMark.addEventListener('click',() => alterCheckBox(checkBoxIcon,checkBoxIconNodeList))
            }
        })
    }

    const alterCheckBox = (checkBoxIcon,checkBoxIconNodeList) => {
        if (!listenerFlags.checkBoxShouldRun) return;
        const checkBoxIconArray = Array.from(checkBoxIconNodeList);
        const index = checkBoxIconArray.indexOf(checkBoxIcon);
        const currentProject = projectsObject.currentProject;
        const currentTodo = currentProject.todoArray[index];
        if (currentTodo.complete === 'no') {
            currentTodo.complete = 'yes';
        } else {
            currentTodo.complete = 'no'
        };
        loadXMarks();
    }

    const addDeleteIconListeners = () => {
        const deleteIconNodeList = document.querySelectorAll('.delete-icon');
        deleteIconNodeList.forEach((icon) => {
            icon.addEventListener('click', confirmDeletePopUp)
        })
    }


    const confirmDelete = (index) => {
        const todoDivNodeList = document.querySelectorAll('.todo-item');
        const todoDivArray = Array.from(todoDivNodeList);
        const confirmDiv = document.querySelector('.confirm-div');
        const currentProject = projectsObject.currentProject;
        currentProject.removeTodo(currentProject.todoArray[index]);

        confirmDiv.remove();
        todoDivArray[index].remove();

        loadProjectsModule().turnFlagsTrue();
    }
    
    const cancelDelete = () => {
        const confirmDiv = document.querySelector('.confirm-div');
        confirmDiv.remove();
        loadProjectsModule().turnFlagsTrue();

    }

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

    return {makeDiv, loadTodoItemOuter, loadAddNewTodoDiv, addDeleteIconListeners }
}
