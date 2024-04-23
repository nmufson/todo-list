import { Todo } from "./create-todo";
import { addDeleteListener } from "./dom-manipulation";
import { loadProjectsModule } from "./load-projects";
import { parseISO, format } from 'date-fns';
const testDate = format(new Date(2014, 11, 11), "MM-dd-yyyy");
console.log(testDate);

export const makeTodoDiv = (projectArray,listenerObject) => {
    
    //make div a different color based on PRIORITY
    const makeDiv = (todo) => {
        const todoListDivContainer = document.querySelector('#todo-list-container');
        const todoDiv = document.createElement('div');
        const textDiv = document.createElement('div');
        const namePara = document.createElement('h3');
        const descriptionPara = document.createElement('p');
        const dueDateDiv = document.createElement('div');
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
        todoDiv.appendChild(textDiv);
        todoDiv.appendChild(dueDateDiv);
        todoDiv.appendChild(iconDiv);
        textDiv.appendChild(namePara);
        textDiv.appendChild(descriptionPara);
        iconDiv.appendChild(editIcon);
        iconDiv.appendChild(deleteIcon);
        
        namePara.textContent = todo.name;
        descriptionPara.textContent = todo.description;
        //will come back to this after finishing add task functionality 
        dueDateDiv.textContent = todo.dueDate;
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
            addNewTodoDiv.remove();
            loadNewTodoInputSmall(projectArray);
        })
    }

    const loadNewTodoInputSmall = (projectArray,projectsObject) => {
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
            
            console.log(projectDivNodeList);
            console.log(projectDivArray);
            console.log(currentProjectDiv);
            console.log(index);
            console.log(projectArray);
            console.log(currentProject.name);
            console.log(listenerObject);
            
            const name = nameInput.value;
            const description = descriptionInput.value;
            const dueDate = format(parseISO(dueDateInput.value), 'mm-dd-yyyy');
            const priority = priorityInput.value;
            const newTodo = new Todo(name,description,dueDate,priority,currentProject.name);
            currentProject.addTodo(newTodo);


            loadTodoItemOuter(currentProject);
            pushDeleteInstances(projectsObject,listenerObject);
            addDeleteIconListeners(listenerObject);
        })
    }



    //make this require arguments (input values), will ensure all fields
    //are entered
    const AddNewTodo = () => {
        //ensure all fields are entered
        //use fields as arguments for a new Todo instance
        //push the new Todo into current project's todoArray
        //reload todo items in current project


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
        
        loadProjectsModule(listenerObject).addChangeProjectListeners(listenerObject);
        addDeleteIconListeners(listenerObject);
    }
    
    const cancelDelete = (listenerObject) => {
        const confirmDiv = document.querySelector('.confirm-div');
        confirmDiv.remove();

        loadProjectsModule(listenerObject).addChangeProjectListeners(listenerObject);
        addDeleteIconListeners(listenerObject);
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
        loadProjectsModule(listenerObject).removeChangeProjectListeners(listenerObject);

        deleteButton.addEventListener('click', () => {
            confirmDelete(listenerObject,projectsObject,index);
            listenerObject.deleteIcons.splice(index,1)
        })
        cancelButton.addEventListener('click', () => cancelDelete(listenerObject));

    }

    return {makeDiv, loadTodoItemOuter, loadAddNewTodoDiv, pushDeleteInstances, addDeleteIconListeners, removeDeleteIconListeners }
}
