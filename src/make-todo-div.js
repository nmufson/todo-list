import { Todo } from "./create-todo";
import { addDeleteListener } from "./dom-manipulation";
import { loadProjectsModule, listenerFlags } from "./load-projects";
import { parseISO, format } from 'date-fns';

export const makeTodoDiv = (projectArray,projectsObject) => {
    
    //make div a different color based on PRIORITY
    const makeDiv = (todo) => {
        const todoListDivContainer = document.querySelector('#todo-list-container');
        const todoDiv = document.createElement('div');
        const textDiv = document.createElement('div');
        const middleDiv = document.createElement('div');
        const topDiv = document.createElement('div');
        
        const namePara = document.createElement('h3');
        const descriptionPara = document.createElement('p');
        const infoDiv = document.createElement('div');
        const iconDiv = document.createElement('div');

        const dueDate = document.createElement('div');
        const priority = document.createElement('div');
        
        const checkBoxIcon = document.createElement('img');
        const editIcon = document.createElement('img');
        const deleteIcon = document.createElement('img');
    
        todoDiv.classList.add('todo-item');
        topDiv
        checkBoxIcon.classList.add('check-box-icon');
        editIcon.classList.add('edit-icon');
        deleteIcon.classList.add('delete-icon');
    
        todoListDivContainer.appendChild(todoDiv);
        todoDiv.appendChild(checkBoxIcon);
        todoDiv.appendChild(middleDiv);
        todoDiv.appendChild(iconDiv);

        middleDiv.appendChild(topDiv);
        middleDiv.appendChild(descriptionPara);

        topDiv.appendChild(namePara);
        topDiv.appendChild(infoDiv);
        
        infoDiv.appendChild(dueDate);
        infoDiv.appendChild(priority);

        iconDiv.appendChild(editIcon);
        iconDiv.appendChild(deleteIcon);

        

        
        


        
        namePara.textContent = todo.name;
        descriptionPara.textContent = todo.description;
        priority.textContent = `${todo.priority} priority`;
        //will come back to this after finishing add task functionality 
        const date = todo.dueDate;
        const newDate = new Date(date.slice(0,4),date.slice(5,7)-1,date.slice(8,10));
        dueDate.textContent = format(newDate, 'MMM dd');


        checkBoxIcon.setAttribute('src', '../src/icons/square.svg')
        editIcon.setAttribute('src', '../src/icons/pencil.svg');
        deleteIcon.setAttribute('src','../src/icons/delete.svg')
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

    const loadNewTodoInputSmall = (projectArray) => {
        
        const todoListDivContainer = document.querySelector('#todo-list-container');
        const addNewTodoDiv = document.createElement('div');
        addNewTodoDiv.classList.add('add-new-todo-input');
       
        
        const nameInput = document.createElement('input');
        const descriptionInput = document.createElement('input');
        const dueDateInput = document.createElement('input');
        const priorityInput = document.createElement('select');
        const blankPriorityOption = document.createElement('option');
        const highPriorityOption = document.createElement('option');
        const mediumPriorityOption = document.createElement('option');
        const lowPriorityOption = document.createElement('option');
        const buttonDiv = document.createElement('div');
        const addButton = document.createElement('button');
        const cancelButton = document.createElement('button');

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
        priorityInput.appendChild(blankPriorityOption);
        priorityInput.appendChild(highPriorityOption);
        priorityInput.appendChild(mediumPriorityOption);
        priorityInput.appendChild(lowPriorityOption);
        buttonDiv.appendChild(addButton);
        buttonDiv.appendChild(cancelButton);
        
        addButton.textContent = 'Add';
        cancelButton.textContent = 'Cancel';

        lowPriorityOption.textContent = 'Low';
        mediumPriorityOption.textContent = 'Medium';
        highPriorityOption.textContent = 'High';

        addButton.addEventListener('click', () => {
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
        })
    }

    


    //insert this as the event listener function 
    // const AddNewTodo = () => {

    // }

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
