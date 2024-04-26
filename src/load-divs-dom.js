import { parseISO, format } from 'date-fns';
import { addNewTodoFuncContainer } from './add-new-todo-dom';
import { deleteTodoFuncContainer } from './delete-todo-dom';
import { editFuncContainer } from './edit-todo-dom';
import { listenerFlags } from './load-projects';
import { Project } from './project';
import { Todo } from './create-todo';

export const loadTodoFuncContainer = (projectArray,projectsObject,mainTodoArray) => {
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

        if ((todo.description).length > 30) {
            descriptionPara.textContent = (todo.description).slice(0,30) + '...';
        } else {
            descriptionPara.textContent = todo.description;
        }
    
        if (todo.priority) {
            priorityPara.textContent = `${todo.priority} priority`;
        }
        nameH3.textContent = todo.name;

        //will come back to this after finishing add task functionality 
        const date = todo.dueDate;
        if (date) {
            const newDate = new Date(date.slice(0,4),date.slice(5,7)-1,date.slice(8,10));
            dueDatePara.textContent = format(newDate, 'MMM dd');
        }
        
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
        addNewTodoFuncContainer(projectArray,projectsObject,mainTodoArray).loadAddNewTodoDiv();
        addDeleteIconListeners();
        addCheckBoxListeners();
        addEditIconListeners();
        loadXMarks();
        
        
        
    }

    const addDeleteIconListeners = () => {
        const deleteIconNodeList = document.querySelectorAll('.delete-icon');
        deleteIconNodeList.forEach((icon) => {
            icon.addEventListener('click', deleteTodoFuncContainer(projectArray,projectsObject).confirmDeletePopUp)
        })
    }

    const addCheckBoxListeners = () => {
        const checkBoxIconNodeList = document.querySelectorAll('.check-box-icon');
        checkBoxIconNodeList.forEach((checkBoxIcon) => {
            checkBoxIcon.addEventListener('click', () => alterCheckBox(checkBoxIcon,checkBoxIconNodeList));
        })
    }

    const addEditIconListeners = () => {
        const editIconNodeList = document.querySelectorAll('.edit-icon');
        editIconNodeList.forEach((editIcon) => {
            editIcon.addEventListener('click', () => editFuncContainer(projectArray,projectsObject).clickEditIcon(editIcon,editIconNodeList))
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

    const groupAllTodos = () => {
        const length = mainTodoArray.length;
        mainTodoArray.splice(0,length);
        projectArray.forEach((project) => {    
            const array = project.todoArray;
            array.forEach((todo) => {
                mainTodoArray.push(todo);
                
            })
            
        })
    }
    
    const populateStorage = () => {
        groupAllTodos();

        const serializedProjects = JSON.stringify(projectArray.map((project) => ({
            projectName: project.name,
        })));
        
        const sertializedTodos = JSON.stringify(mainTodoArray.map((todo) => ({
            todoName: todo.name,
            todoDescription: todo.description,
            todoDueDate: todo.dueDate,
            todoPriority: todo.priority,
            todoProject: todo.project,
            todoComplete: todo.complete
        })));

        // localStorage.setItem('projects',serializedProjects);
        // localStorage.setItem('todos',sertializedTodos);
    }

    const retrieveStorage = () => {
        if (!localStorage.getItem('projects')) return;
        if (!localStorage.getItem('todos')) return;

        const retrievedProjects = localStorage.getItem('projects');
        const retrievedTodos = localStorage.getItem('todos');

        //converts JSON strings into javascript objects 
        const projectsData = JSON.parse(retrievedProjects);
        const todosData = JSON.parse(retrievedTodos);

        projectsData.forEach((project) => {
            if (project.name) {
            const projectInstance = new Project(project.name)
            projectArray.push(projectInstance);
            }
            
        });

        todosData.forEach((todo) => {
            if (todo.name) {
                const todoInstance = new Todo(todo.name, 
                    todo.description, 
                    todo.dueDate,
                    todo.priority,
                    todo.project,
                    todo.complete
                );
                //find which object in an array has a certain property
                const projectName = todoInstance.project;
                const projectInstance = projectArray.find((e) => e.name === projectName);
                projectInstance.todoArray.push(todoInstance);
            }
        });
    };

    return { makeDiv, loadTodoItemOuter, populateStorage,retrieveStorage};
}