import { addDeleteListener } from "./dom-manipulation";
import { loadProjectsModule } from "./load-projects";

export const makeTodoDiv = () => {
    
    const makeDiv = (todo) => {
        const todoListDivContainer = document.querySelector('#todo-list-container');
        const todoDiv = document.createElement('div');
        const TextDiv = document.createElement('div');
        const Header = document.createElement('h3');
        const para = document.createElement('p');
        const iconDiv = document.createElement('div');
        const checkBoxIcon = document.createElement('img');
        const editIcon = document.createElement('img');
        const deleteIcon = document.createElement('img');
    
        todoDiv.classList.add('todo-item');
        checkBoxIcon.classList.add('check-box-icon');
        editIcon.classList.add('edit-icon');
        deleteIcon.classList.add('delete-icon');
    
        todoListDivContainer.appendChild(todoDiv);
        todoDiv.appendChild(checkBoxIcon);
        todoDiv.appendChild(TextDiv);
        todoDiv.appendChild(iconDiv);
        TextDiv.appendChild(Header);
        TextDiv.appendChild(para);
        iconDiv.appendChild(editIcon);
        iconDiv.appendChild(deleteIcon);
        
        
        Header.textContent = todo.title;
        para.textContent = todo.description;
        checkBoxIcon.setAttribute('src', '../src/icons/square.svg')
        editIcon.setAttribute('src', '../src/icons/pencil.svg');
        deleteIcon.setAttribute('src','../src/icons/delete.svg')
    }
    
    const loadTodoItemOuter = (projectsObject) => {
        const todoListDivContainer = document.querySelector('#todo-list-container');
        todoListDivContainer.innerHTML = '';
    
        const currentProject = projectsObject.currentProject;
    
        const TodoList = currentProject.todoArray;
        TodoList.forEach((todo) => makeDiv(todo))
    }
    
    const confirmDeletePopUp = (index,projectsObject,listenerObject) => {
        const contentArea = document.querySelector('#content-area');
        
        const confirmDiv = document.createElement('div');
        const confirmPara = document.createElement('p');
        const buttonDiv = document.createElement('div');
        const deleteButton = document.createElement('button');
        const cancelButton = document.createElement('button');
    
        confirmDiv.classList.add('confirm-div');
    
        contentArea.appendChild(confirmDiv);
        confirmDiv.appendChild(confirmPara);
        confirmDiv.appendChild(buttonDiv);
        buttonDiv.appendChild(deleteButton);
        buttonDiv.appendChild(cancelButton);
    
        confirmPara.textContent = 'Delete To-do?';
        deleteButton.textContent = 'Delete';
        cancelButton.textContent = 'Cancel';

        removeDeleteIconListeners(listenerObject);
        loadProjectsModule().removeChangeProjectListeners(listenerObject);

        deleteButton.addEventListener('click', () => {
            confirmDelete(listenerObject,projectsObject,index);
            listenerObject.deleteIcons.splice(index,1)
        })

    }

    const pushDeleteInstances = (projectsObject,listenerObject) => {
        const deleteIconNodeList = document.querySelectorAll('.delete-icon');
        const deleteIconArray = Array.from(deleteIconNodeList);
        
        listenerObject.deleteIcons.splice(0)
        deleteIconArray.forEach((icon) => {
            const index = deleteIconArray.indexOf(icon);
            //creates function definition of deleteIconOuter with icon's index passed as an argument
            //pushes each function definition into our array
            const deleteIcon = () => confirmDeletePopUp(index,projectsObject,listenerObject);
            listenerObject.deleteIcons.push(deleteIcon);
        })
    }

    const addDeleteIconListeners = (listenerObject) => {
        const deleteIconNodeList = document.querySelectorAll('.delete-icon');
        const deleteIconArray = Array.from(deleteIconNodeList);
    
        deleteIconArray.forEach((icon) => {
            const index = deleteIconArray.indexOf(icon);
            const confirmDeletePopUp = listenerObject.deleteIcons[index];
            icon.addEventListener('click', confirmDeletePopUp)
        })
    }
    
    const removeDeleteIconListeners = (listenerObject) => {
        const deleteIconNodeList = document.querySelectorAll('.delete-icon');
        const deleteIconArray = Array.from(deleteIconNodeList);
    
        deleteIconArray.forEach((icon) => {
            const index = deleteIconArray.indexOf(icon);
            const confirmDeletePopUp = listenerObject.deleteIcons[index];
            icon.removeEventListener('click', confirmDeletePopUp)
        })
    }

    const confirmDelete = (listenerObject,projectsObject,index) => {
        const todoDivNodeList = document.querySelectorAll('.todo-item');
        const confirmDiv = document.querySelector('.confirm-div');
        const currentProject = projectsObject.currentProject;
        currentProject.removeTodo(currentProject.todoArray[index]);
    
        confirmDiv.remove();
        todoDivNodeList[index].remove();
        
        
        
        loadProjectsModule().addChangeProjectListeners(listenerObject);
    }
    
    const cancelDelete = () => {
        const confirmDiv = document.querySelector('.confirm-div');
        confirmDiv.remove();
    }

    return {makeDiv, loadTodoItemOuter, pushDeleteInstances, addDeleteIconListeners, removeDeleteIconListeners }
}
